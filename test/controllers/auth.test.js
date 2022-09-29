/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const { app, server } = require('../../src/app');

describe('Authentication routes', () => {
  const user = {
    username: 'superuser',
    password: 'password'
  };
  before(async () => {

  });
  after(() => {
    server.close();
  });

  it('Created, register new user', (done) => {
    request(app)
      .post('/api/v1/auth/register')
      .send(user)
      .expect(201)
      .then((res) => {
        const { body } = res;
        expect(body.data).to.contain.property('token');
        expect(body.status).to.equal('success');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, duplicate User', (done) => {
    request(app)
      .post('/api/v1/auth/register')
      .send(user)
      .expect(400)
      .then((res) => {
        const { body } = res;
        // eslint-disable-next-line quotes
        expect(body.error).to.equals(`username already exists`);
        expect(body.status).to.equal('failed');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, login registed user', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.data).to.contain.property('token');
        expect(body.status).to.equal('success');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, invalid login(username)', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'qwerty', password: user.password })
      .expect(400)
      .then((res) => {
        const { body } = res;
        expect(body.error).to.equals('username or password incorrect');
        expect(body.status).to.equal('failed');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, invalid login(password)', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ username: user.username, password: 'secret' })
      .expect(400)
      .then((res) => {
        const { body } = res;
        expect(body.error).to.equals('username or password incorrect');
        expect(body.status).to.equal('failed');
        done();
      })
      .catch((err) => done(err));
  });
});
