import { user as userModel } from '../../models/index';
import misc from '../../misc/misc';

const sequelize = require('sequelize');

class UserHelper {
    static async create(data) {
        return userModel.create({
            first_name: data.first_name,
            last_name: data.last_name,
            birthdate: data.birthdate,
            timezone: data.timezone,
        }, {
            returning: true,
            decoded: data.decoded,
        });
    }

    static async getListPagination(page = 1, row = 10, orderBy = 'user_id', orderType = 'ASC', param) {
        const pagination = misc.simplePagination(page, row);
        const option = {
            limit: pagination.row,
            offset: pagination.page,
            order: [[orderBy, orderType]],
            where: {},
        };
        return userModel
            .scope([{ method: ['removeAttributes'] }])
            .findAndCountAll(option);
    }

    static async getListAll(orderBy = 'user_id', orderType = 'ASC', param) {
        const option = {
            order: [[orderBy, orderType]],
            where: {},
        };
        return userModel
            .scope([{ method: ['removeAttributes'] }])
            .findAndCountAll(option);
    }
}

export default UserHelper;
