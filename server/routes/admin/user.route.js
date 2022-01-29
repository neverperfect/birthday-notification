import express from 'express';
import userController from '../../controllers/admin/user.controller';
import userValidator from '../../validator/admin/user.validator';
import miscValidator from '../../validator/admin/misc.validator';
import validator from '../../validator/validator';

const router = express.Router();

router.get('/', [miscValidator.pagination(), validator.validate, userController.getList]);
router.post('/', [userValidator.create(), validator.validate, userController.create]);

router.delete('/:userId', [userController.delete]);
router.get('/:userId', [userController.getDetail]);
router.put('/:userId', [userValidator.update(), validator.validate, userController.update]);

router.param('userId', miscValidator.numericParams);

export default router;
