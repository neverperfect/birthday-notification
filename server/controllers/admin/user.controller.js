import UserHelper from '../../class/admin/userHelper.class';
import Response from '../../class/util/response.class';
import constant from './constant';
import User from '../../class/admin/user.class';
import BdayNotifController from '../app/bdayNotif.controller';

export default {
    create: async (req, res) => {
        req.body.decoded = req.user;
        const userData = await UserHelper.create(req.body);
        const response = new Response(res);
        await BdayNotifController.taskStop();
        await BdayNotifController.birthdayScheduler();
        return response.contentSuccess(response.statusCreated, userData);
    },

    getDetail: async (req, res) => {
        const { userId } = req.params;

        const user = new User(userId);
        const response = new Response(res);
        const requestedUser = await user.getDetail();
        return requestedUser
            ? response.contentSuccess(response.statusOk, requestedUser)
            : response.contentFail(response.statusNotFound, constant.ADMIN_ID_404_ERROR);
    },

    getList: async (req, res) => {
        const {
            page, row, order_by: orderBy, order_type: orderType, pagination = 'true', search,
        } = req.query;

        const userData = pagination === 'true'
            ? await UserHelper.getListPagination(page, row, orderBy, orderType, search)
            : await UserHelper.getListAll(orderBy, orderType, search);
        const response = new Response(res);
        return response.contentSuccess(response.statusOk, userData);
    },

    update: async (req, res) => {
        const { userId } = req.params;

        const user = new User(userId);
        const response = new Response(res);
        const updatedUser = await user.update(req.body);
        await BdayNotifController.taskStop();
        await BdayNotifController.birthdayScheduler();
        return updatedUser
            ? response.contentSuccess(response.statusOk, updatedUser)
            : response.contentFail(response.statusNotFound, constant.ADMIN_ID_404_ERROR);
    },

    delete: async (req, res) => {
        const { userId } = req.params;
        const user = new User(userId);
        const response = new Response(res);
        const deletedUser = await user.delete(req.user);
        if (!deletedUser) {
            return response.contentFail(response.statusNotFound, constant.ADMIN_ID_404_ERROR);
        }
        return response.contentSuccess(response.statusOk, deletedUser);
    },
};
