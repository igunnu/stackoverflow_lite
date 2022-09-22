require('./questions.test');
const { expect } = require('chai');
const { response } = require('express');
const request = require('supertest');
const { token, token2 } = require('./questions.test');
const { app, server } = require('../../src/app');
const db = require('../../src/models/index');

describe('answer routes', () => {
  const seedAnswers = [
    {
      body: 'this is an answer',
      userId: 2,
      questionId: 3

    },
    {
      body: 'this is an answer',
      userId: 2,
      questionId: 3
    },
    {
      body: 'this is an answer',
      userId: 2,
      questionId: 4
    },
    {
      body: 'this is an answer',
      userId: 1,
      questionId: 3
    },
    {
      body: 'this is an answer',
      userId: 2,
      questionId: 4
    }
  ];
  const user = {
    username: 'superuser',
    password: 'password'
  };

  let token;
  before(async () => {
    const response = await request(app).post('/api/v1/auth/login').send(user);
    await db.answers.bulkCreate(seedAnswers);
    token = response._body.data.token;
  });

  // it('OK, get all question', (done) => {
  //   request(app)
  //     .get('/api/v1/questions')
  //     .expect(200)
  //     .then((res) => {
  //       const { body } = res;
  //       console.log(body.data)
  //       expect(body.status).to.equal('success');
  //       expect(body.data.message).to.equal('success');
  //       expect(body.data).to.contain.property('questions');
  //       expect(body.data.questions[0]).to.contain.property('id');
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  // it('OK, get all answers to question', (done) => {
  //   request(app)
  //     .get('/api/v1/questions/4/answers')
  //     .expect(200)
  //     .then((res) => {
  //       const { body } = res;
  //       console.log(body.data)
  //       expect(body.status).to.equal('success');
  //       expect(body.data.answers).to.have.lengthOf(1);
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  it('OK, accept answer', (done) => {
    request(app)
      .post('/api/v1/answers/2/accept')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: 3 })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('Answer accepted');
        done();
      })
      .catch((err) => done(err));
    });

  it('OK, vote answer(downvote)', (done) => {
    request(app)
      .get('/api/v1/answers/2/vote?type=downvote')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('downvote successfull');
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, vote answer(upvote)', (done) => {
    request(app)
      .get('/api/v1/answers/4/vote?type=upvote')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('upvote successfull');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, vote answer(duplicate Vote)', (done) => {
    request(app)
      .get('/api/v1/answers/4/vote?type=upvote')
      .set('Authorization', `Bearer ${token}`)
      // .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('failed');
        expect(body.error).to.equal('already voted');
        done();
      })
      .catch((err) => done(err));
  });

  it('created, accept answer', (done) => {
    request(app)
      .post('/api/v1/answers/2/comment')
      .set('Authorization', `Bearer ${token}`)
      .send({ body: 'this is a comment' })
      .expect(201)
      .then((res) => {
        const { body } = res;
        expect(body.status).to.equal('success');
        expect(body.data.message).to.equal('Comment submitted');
        done();
      })
      .catch((err) => done(err));
    });
  after(() => {
    server.close();
  });
});
