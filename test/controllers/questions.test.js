process.env.NODE_ENV = 'test';
require('./auth.test')
const { expect } = require('chai');
const request = require('supertest');
const { app, server } = require('../../src/app');
const db = require('../../src/models/index');

describe('Question routes', () => {
  const question = {
    title: 'noun is not define ',
    body: "I'm using node-mysql2 and receiving this error message when connecting"
  };
  const seedQuestions = [
    {
      title: 'difference between nouns and proniuns ',
      body: "I'm using node-mysql2 and receiving this error message when connecting",
      userId: 1
    },
    {
      title: 'what a day to be alive',
      body: "I'm using node-mysql2 and receiving this error message when connecting",
      userId: 1
    },
    {
      title: 'noun are not working',
      body: "I'm using node-mysql2 and receiving this error message when connecting",
      userId: 1
    },
    {
      title: 'question is not a question',
      body: "I'm using node-mysql2 and receiving this error message when connecting",
      userId: 1
    },
    {
      title: 'what is a noun',
      body: "I'm using node-mysql2 and receiving this error message when connecting",
      userId: 1
    }
  ];
  const user = {
    username: 'superuser',
    password: 'password'
  };

  const answer = {
    body: 'this is an answer'
  };

  let token;
  let token2;
  let questionId;

  before(async () => {
    const response = await request(app).post('/api/v1/auth/login').send(user);
    await db.questions.bulkCreate(seedQuestions);
    const user2 = await request(app).post('/api/v1/auth/register').send({ username: 'qwerty', password: 'secret' });
    token2 = user2._body.data.token;
    token = response._body.data.token;
  });

  it('Created, post new question', (done) => {
    request(app)
      .post('/api/v1/questions')
      .set('Authorization', `Bearer ${token}`)
      .send(question)
      .expect(201)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('question submitted');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, post new question (invalid Token)', (done) => {
    request(app)
      .post('/api/v1/questions')
      .set('Authorization', `Bearer s${token}`)
      .send(question)
      .expect(401)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('failed');
        expect(body.error).to.equal('invalid bearer token');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, post new question (unauthorized user)', (done) => {
    request(app)
      .post('/api/v1/questions')
      .send(question)
      .expect(401)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('failed');
        expect(body.error).to.equal('login required');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, get all question', (done) => {
    request(app)
      .get('/api/v1/questions')
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('success');
        expect(body.data).to.contain.property('questions');
        expect(body.data.questions[0]).to.contain.property('id');
        questionId = body.data.questions[0].id;
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, get  question', (done) => {
    request(app)
      .get(`/api/v1/questions/${questionId}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('success');
        expect(body.data).to.contain.property('question');
        expect(body.data.question).to.contain.property('id');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, get  question(invalid questionId)', (done) => {
    request(app)
      .get('/api/v1/questions/500')
      .expect(404)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('failed');
        expect(body.error).to.equal('not found');
        done();
      })
      .catch((err) => done(err));
  });

  it('Created, post new answer', (done) => {
    request(app)
      .post(`/api/v1/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${token}`)
      .send(answer)
      .expect(201)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('answer submitted');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, post new answer(no body)', (done) => {
    request(app)
      .post(`/api/v1/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('failed');
        expect(body.error).to.equal('body is required');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, get all answers to question', (done) => {
    request(app)
      .get(`/api/v1/questions/${questionId}/answers`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.answers).to.have.lengthOf(1);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, delete question', (done) => {
    request(app)
      .delete('/api/v1/questions/1')
      .set('Authorization', `Bearer ${token}`)
      .send(answer)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('question deleted');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, delete question(question does not belong to user)', (done) => {
    request(app)
      .delete('/api/v1/questions/2')
      .set('Authorization', `Bearer ${token2}`)
      .expect(401)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('failed');
        expect(body.error).to.equal('operation not permitted');
        done();
      })
      .catch((err) => done(err));
  });


  it('OK, get all users question', (done) => {
    request(app)
      .get('/api/v1/questions/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.questions).to.have.lengthOf(5);
        done();
      })
      .catch((err) => done(err));
  });


  it('OK, search question', (done) => {
    request(app)
      .post('/api/v1/questions/search')
      .send({ searchQuery: 'a noun is define' })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.questions).to.have.lengthOf(3);
        done();
      })
      .catch((err) => done(err));
  });
});
