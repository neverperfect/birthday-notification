import { query, param } from 'express-validator';
import validator from '../validator';
import constant from './constant';

export default {
    pagination: () => [
        query('page').optional().isNumeric().withMessage(validator.errorBuilder(constant.PAGE, constant.NUMERIC)),
        query('row').optional().isNumeric().withMessage(validator.errorBuilder(constant.ROW, constant.NUMERIC)),
        query('pagination').optional().customSanitizer((value) => value.toLowerCase()).isIn(constant.PAGINATION_ENUM.split(','))
            .withMessage(validator.errorBuilder(constant.PAGINATION, constant.BOOLEAN)),
    ],
    numericParams: async (req, res, next, _, name) => {
        await param(name).notEmpty().withMessage(
            validator.errorBuilder(constant.PARAM, constant.REQUIRED),
        ).isNumeric()
            .withMessage(validator.errorBuilder(constant.PARAM, constant.NUMERIC))
            .run(req);
        return validator.validate(req, res, next);
    },
};
