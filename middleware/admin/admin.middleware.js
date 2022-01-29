import AdminHelper from '../../server/class/admin/adminHelper.class';
import Response from '../../server/class/util/response.class';
import constant from './constant';

export default {
    checkUsernameDuplicate: async (req, res, next) => {
        const { username } = req.body;
        const { adminId } = req.params;
        const response = new Response(res);
        if (username && await AdminHelper.isUsernameDuplicate(username, adminId)) {
            return response.contentFail(response.statusBadRequest, constant.DUPLICATE_ADMIN_USERNAME);
        }
        return next();
    },

    checkEmailDuplicate: async (req, res, next) => {
        const { email } = req.body;
        const { adminId } = req.params;
        const response = new Response(res);
        if (email && await AdminHelper.isEmailDuplicate(email, adminId)) {
            return response.contentFail(response.statusBadRequest, constant.DUPLICATE_ADMIN_EMAIL);
        }
        return next();
    },
};
