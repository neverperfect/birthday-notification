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
describe('## model APIs', () => {
    let id;
    const model = {
        name: 'test',
    };
    const newModel = {
        name: 'test2',
    };

    describe(`# GET ${apiVersionPath}/admin/model`, () => {
        test('should fail to return all models caused by unauthorized', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/model`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should return all models with pagination successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/model`)
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

        test('should return all models successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/model`)
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

    describe(`# POST ${apiVersionPath}/admin/model`, () => {
        test('should fail to create a model caused by unauthorized', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/model`)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a model caused by missing name', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/model`)
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

        test('should create a model successfully', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/model`)
                .set('Authorization', token)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.CREATED)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.CREATED);
                    id = res.body.response.id;
                    done();
                })
                .catch(done);
        });

        test('should fail to create a model caused by name exists', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin/model`)
                .set('Authorization', token)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.BAD_REQUEST);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/admin/model/:id`, () => {
        test('should fail to return a model caused by unauthorized', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/model/${id}`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to return a model caused by model id not found', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/model/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to return a model caused by wrong id parameter format', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/model/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should return a model successfully', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin/model/1`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# PUT ${apiVersionPath}/admin/model/:id`, () => {
        test('should fail to update a model caused by unauthorized', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/model/${id}`)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a model caused by missing name', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/model/${id}`)
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

        test('should fail to update a model caused by model id not found', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/model/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a model caused by wrong id parameter format', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/model/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should update a model', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/model/${id}`)
                .set('Authorization', token)
                .send({
                    name: newModel.name,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a model caused by name exists', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin/model/${id}`)
                .set('Authorization', token)
                .send({
                    name: 'admin',
                })
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.BAD_REQUEST);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# DELETE ${apiVersionPath}/admin/model/:id`, () => {
        test('should fail to delete a model caused by unauthorized', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/model/${id}`)
                .expect(httpStatus.FORBIDDEN)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.FORBIDDEN);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a model caused by model not found', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/model/0`)
                .set('Authorization', token)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a model caused by wrong id parameter format', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/model/a`)
                .set('Authorization', token)
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.code).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    expect(Array.isArray(res.body.error.message.errors)).toBe(true);
                    done();
                })
                .catch(done);
        });

        test('should delete a model', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin/model/${id}`)
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
