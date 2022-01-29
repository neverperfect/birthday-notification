/* eslint-env jest */

import app from '../../../../index';
import '@babel/polyfill';

const request = require('supertest');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const config = require('../../../../config/config').default;

const apiVersionPath = `/api/v${config.apiVersion}`;
describe('## Auth APIs', () => {
    const email = 'superadmin@boilerplate.com';
    const password = 'Superadmin@boilerplate2020';

    describe(`# POST ${apiVersionPath}/admin/auth/login`, () => {
        test('should get valid JWT token', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/auth/login`)
                .send({
                    email,
                    password,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    jwt.verify(res.body.response, config.jwtSecret, (err, decoded) => {
                        expect(!err);
                        expect(decoded.email).toEqual(email);
                        done();
                    });
                })
                .catch(done);
        });
    });
});
