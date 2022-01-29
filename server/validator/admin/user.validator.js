import { body } from 'express-validator';
import validator from '../validator';
import constant from './constant';

export default {
    create: () => [
        body('first_name').notEmpty().withMessage(validator.errorBuilder(constant.FIRSTNAME, constant.REQUIRED)),
        body('last_name').notEmpty().withMessage(validator.errorBuilder(constant.LASTNAME, constant.REQUIRED)),
        body('timezone').notEmpty().withMessage(validator.errorBuilder(constant.TIMEZONE, constant.REQUIRED)),
        body('birthdate').notEmpty().withMessage(validator.errorBuilder(constant.BIRTHDATE, constant.REQUIRED)),
    ],
    update: () => [
    ],
};
