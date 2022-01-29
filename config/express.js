import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import helmet from 'helmet';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import Backend from 'i18next-node-fs-backend';
import routes from '../server/routes/index.route';
import config from './config';

require('dotenv').config();

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: `${__dirname}/../server/locales/{{lng}}/{{ns}}.json`,
            addPath: `${__dirname}/../server/locales/{{lng}}/{{ns}}.missing.json`,
        },
        fallbackLng: 'id',
        preload: ['en', 'id'],
        saveMissing: true,
        interpolation: {
            format: (value, format) => {
                if (format === 'uppercase') return value.charAt(0).toUpperCase() + value.slice(1);
                return value;
            },
        },
    });

app.use(i18nextMiddleware.handle(i18next));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Get API Version from .env (or else assume 1.0)
const baseUrl = `/api/v${config.apiVersion}`;

// mount all routes on /api path
app.use(`${baseUrl}`, routes);

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(res.status(404).json({
    response: 404,
    result: {
        message: 'API Not Found',
    },
})));

// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {},
    });
});

export default app;
