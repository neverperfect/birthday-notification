/* eslint-env jest */

import app from '../../../../index';
import '@babel/polyfill';

const request = require('supertest');
const httpStatus = require('http-status');

const config = require('../../../../config/config').default;

const apiVersionPath = `/api/v${config.apiVersion}`;
describe('## Auth APIs', () => {
    const email = 'superadmin@boilerplate.com';
    const invalidAdminCredentials = {
        email,
        password: 'password',
    };

    describe(`# POST ${apiVersionPath}/admin/auth/login`, () => {
        test('should return Authentication error', (done) => {
            jest.mock('./success.test.js');
            request(app)
                .post(`${apiVersionPath}/admin/auth/login`)
                .send({
                    email: '',
                    password: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should return Authentication error', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/auth/login`)
                .send(invalidAdminCredentials)
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.BAD_REQUEST);
                    done();
                })
                .catch(done);
        });
    });
});
