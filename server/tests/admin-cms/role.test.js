/* eslint-env jest */

import app from '../../../index';
import '@babel/polyfill';

const request = require('supertest');
const httpStatus = require('http-status');

const config = require('../../../config/config').default;
const authHelper = require('../../class/admin/authHelper.class').default;

const apiVersionPath = `/api/v${config.apiVersion}`;

let token;

beforeAll(async () => {
    // Authenticate Admin
    const email = 'superadmin@boilerplate.com';
    const password = 'Superadmin@boilerplate2020';
    token = await authHelper.login(email, password);
});
describe('## Role APIs', () => {
    let id;
    const role = {
        name: 'test',
    };
    const newRole = {
        name: 'test2',
    };

    describe(`# GET ${apiVersionPath}/admin/role`, () => {
        test('should fail to return all roles caused by unauthorized', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/role`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should return all roles with pagination successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/role`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    expect(res.body.response.count).toEqual(expect.any(Number));
                    expect(Array.isArray(res.body.response.rows)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should return all roles successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/role`)
                .query({ pagination: false })
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    expect(res.body.response.count).toEqual(expect.any(Number));
                    expect(Array.isArray(res.body.response.rows)).toBe(true);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# POST ${apiVersionPath}/admin/role`, () => {
        test('should fail to create a role caused by unauthorized', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/role`)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a role caused by missing name', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/role`)
                .set('Authorization', token)
                .send({
                    name: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should create a role successfully', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/role`)
                .set('Authorization', token)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.CREATED)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.CREATED);
                    id = res.body.response.id;
                    done();
                })
                .catch(done);
        });

        test('should fail to create a role caused by name exists', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/role`)
                .set('Authorization', token)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.BAD_REQUEST);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/admin/role/:id`, () => {
        test('should fail to return a role caused by unauthorized', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/role/${id}`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to return a role caused by role id not found', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/role/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to return a role caused by wrong id parameter format', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/role/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should return a role successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/role/1`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# PUT ${apiVersionPath}/admin/role/:id`, () => {
        test('should fail to update a role caused by unauthorized', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/role/${id}`)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a role caused by missing name', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/role/${id}`)
                .set('Authorization', token)
                .send({
                    name: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a role caused by role id not found', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/role/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a role caused by wrong id parameter format', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/role/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should update a role', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/role/${id}`)
                .set('Authorization', token)
                .send({
                    name: newRole.name,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a role caused by name exists', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/role/${id}`)
                .set('Authorization', token)
                .send({
                    name: 'Admin',
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.BAD_REQUEST);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# DELETE ${apiVersionPath}/admin/role/:id`, () => {
        test('should fail to delete a role caused by unauthorized', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/role/${id}`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a role caused by role not found', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/role/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a role caused by wrong id parameter format', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/role/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should delete a role', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/role/${id}`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });
    });
});
