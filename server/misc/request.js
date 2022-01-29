import rp from 'request-promise-native';

const hookbinRequest = (path, options) => new Promise((resolve, reject) => {
    Object.assign(options, {
        resolveWithFullResponse: true,
    });
    return rp('https://hookb.in/oXnyJ7NzagUBnPZZnrwp', options).then((result) => resolve(result)).catch((error) => reject(error));
});

export default {
    hookbinRequest,
};
