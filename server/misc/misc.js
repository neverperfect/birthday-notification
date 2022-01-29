/* eslint-disable no-underscore-dangle */
const Sequelize = require('sequelize');

module.exports.simplePagination = (page, row) => {
    const pagination = { page, row };

    pagination.row = row;
    pagination.page = (page - 1) * pagination.row;

    return pagination;
};

module.exports.logCreateActivity = (target, options, sequelize) => {
    const message = `${options.decoded.name || options.decoded.username} created ${target.constructor.options.name.singular}(${target.dataValues.id})`;
    return sequelize.models.Model.findOne({
        where: {
            name: {
                [Sequelize.Op.iLike]: target.constructor.options.name.singular,
            },
        },
    }).then((model) => sequelize.models.Activity.create({
        user_id: options.decoded.user_id,
        target_id: target.dataValues.id,
        user_model_id: options.decoded.model_id,
        target_model_id: model.id,
        user_name: options.decoded.name || options.decoded.username,
        target_name: target.dataValues.name || target.dataValues.username,
        description: message,
    }));
};

module.exports.logDeleteActivity = (target, options, sequelize) => {
    const message = `${options.decoded.name || options.decoded.username} deleted ${target.constructor.options.name.singular}(${target.dataValues.id})`;
    return sequelize.models.Model.findOne({
        where: {
            name: {
                [Sequelize.Op.iLike]: target.constructor.options.name.singular,
            },
        },
    }).then((model) => sequelize.models.Activity.create({
        user_id: options.decoded.user_id,
        target_id: target.dataValues.id,
        user_model_id: options.decoded.model_id,
        target_model_id: model.id,
        user_name: options.decoded.name || options.decoded.username,
        target_name: target.dataValues.name || target.dataValues.username,
        description: message,
    }));
};

module.exports.logUpdateActivity = (target, options, sequelize) => {
    let message = `${options.decoded.name || options.decoded.username} changed ${target.constructor.options.name.singular}(${target.dataValues.id})'s `;
    const changed = [...target._changed];
    changed.forEach((str, index) => {
        switch (index) {
        case 0:
            message = message.concat(`${str}`);
            break;
        case changed.length - 1:
            message = message.concat(` and ${str}.`);
            break;
        default:
            message = message.concat(`, ${str}`);
            break;
        }
    });
    return sequelize.models.Model.findOne({
        where: {
            name: {
                [Sequelize.Op.iLike]: target.constructor.options.name.singular,
            },
        },
    }).then((model) => sequelize.models.Activity.create({
        user_id: options.decoded.user_id,
        target_id: target.dataValues.id,
        user_model_id: options.decoded.model_id,
        target_model_id: model.id,
        user_name: options.decoded.name || options.decoded.username,
        target_name: target.dataValues.name || target.dataValues.username,
        description: message,
    }));
};
