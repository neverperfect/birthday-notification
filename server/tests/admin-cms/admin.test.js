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
describe('## Admin APIs', () => {
    let id;
    const admin = {
        role_id: 1,
        email: 'test@test.com',
        username: 'testtest',
        password: 'testtest',
    };
    // const newAdmin = {
    //     role_id: 2,
    //     email: 'test@test2.com',
    //     username: 'testtest2',
    //     password: 'testtest2',
    // };

    describe(`# GET ${apiVersionPath}/admin/admin`, () => {
        test('should fail to return all admins caused by unauthorized', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/admin`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should return all admins with pagination successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/admin`)
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

        test('should return all admins successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/admin`)
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

    describe(`# POST ${apiVersionPath}/admin/admin`, () => {
        test('should fail to create a admin caused by unauthorized', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/admin`)
                .send(admin)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a admin caused by missing role id', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/admin`)
                .set('Authorization', token)
                .send({
                    role_id: '',
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a admin caused by missing email', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: '',
                    username: admin.username,
                    password: admin.password,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a admin caused by missing username', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: '',
                    password: admin.password,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a admin caused by missing password', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: admin.username,
                    password: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should create a admin successfully', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/admin`)
                .set('Authorization', token)
                .send(admin)
                .expect(httpStatus.CREATED)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.CREATED);
                    id = res.body.response.id;
                    done();
                })
                .catch(done);
        });

        // test('should fail to create a admin caused by name exists', (done) => {
        //     request(app)
        //         .post(`${apiVersionPath}/admin/admin`)
        //         .set('Authorization', token)
        //         .send(admin)
        //         .expect(httpStatus.BAD_REQUEST)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.BAD_REQUEST);
        //             done();
        //         })
        //         .catch(done);
        // });
    });

    describe(`# GET ${apiVersionPath}/admin/admin/:id`, () => {
        test('should fail to return a admin caused by unauthorized', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/admin/${id}`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to return a admin caused by admin id not found', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/admin/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to return a admin caused by wrong id parameter format', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/admin/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should return a admin successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/admin/1`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# PUT ${apiVersionPath}/admin/admin/:id`, () => {
        // test('should fail to update a admin caused by unauthorized', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/${id}`)
        //         .send(newAdmin)
        //         .expect(httpStatus.FORBIDDEN)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should fail to update a admin caused by empty role id', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/${id}`)
        //         .set('Authorization', token)
        //         .send({
        //             role_id: '',
        //         })
        //         .expect(httpStatus.UNPROCESSABLE_ENTITY)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should fail to update a admin caused by empty email', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/${id}`)
        //         .set('Authorization', token)
        //         .send({
        //             email: '',
        //         })
        //         .expect(httpStatus.UNPROCESSABLE_ENTITY)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should fail to update a admin caused by empty username', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/${id}`)
        //         .set('Authorization', token)
        //         .send({
        //             username: '',
        //         })
        //         .expect(httpStatus.UNPROCESSABLE_ENTITY)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should fail to update a admin caused by empty password', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/${id}`)
        //         .set('Authorization', token)
        //         .send({
        //             password: '',
        //         })
        //         .expect(httpStatus.UNPROCESSABLE_ENTITY)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should fail to update a admin caused by admin id not found', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/0`)
        //         .set('Authorization', token)
        //         .expect(httpStatus.NOT_FOUND)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should fail to update a admin caused by wrong id parameter format', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/a`)
        //         .set('Authorization', token)
        //         .expect(httpStatus.UNPROCESSABLE_ENTITY)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should update a admin', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/${id}`)
        //         .set('Authorization', token)
        //         .send(newAdmin)
        //         .expect(httpStatus.OK)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.OK);
        //             done();
        //         })
        //         .catch(done);
        // });

        // test('should fail to update a admin caused by name exists', (done) => {
        //     request(app)
        //         .put(`${apiVersionPath}/admin/admin/${id}`)
        //         .set('Authorization', token)
        //         .send({
        //             name: newAdmin.name,
        //         })
        //         .expect(httpStatus.BAD_REQUEST)
        //         .then((res) => {
        //             expect(res.body.code).toEqual(httpStatus.BAD_REQUEST);
        //             done();
        //         })
        //         .catch(done);
        // });
    });

    describe(`# DELETE ${apiVersionPath}/admin/admin/:id`, () => {
        test('should fail to delete a admin caused by unauthorized', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/admin/${id}`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a admin caused by admin not found', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/admin/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a admin caused by wrong id parameter format', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/admin/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should delete a admin', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/admin/${id}`)
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
