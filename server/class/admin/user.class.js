import { User as userModel } from '../../models/index';

class User {
    constructor(userId) {
        this.userId = userId;
    }

    async getDetail() {
        return userModel
            .scope([{ method: ['removeAttributes'] }])
            .findOne({
                where: {
                    user_id: this.user_id,
                },
            });
    }

    async update(data) {
        const userData = await this.getDetail();
        if (!userData) {
            return null;
        }
        const updatedRole = await userData.update(data, {
            returning: true,
            decoded: data.decoded,
            previous: userData.dataValues,
            newValue: data,
        });
        return updatedRole;
    }

    async delete() {
        const userData = await this.getDetail();
        if (!userData) {
            return null;
        }
        const deletedModel = await userData.destroy();
        return deletedModel;
    }
}

export default User;
