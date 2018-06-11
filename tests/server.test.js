const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');

describe('GET /user_profile/:username', () => {
  it('should return user detail if user exist', (done) => {
    request(app)
      .get(`/user_profile/ohsasa`)
      .expect(200)
      .expect((res) => {
      
        expect(res.body.instagram_id).toBe("13013766");
      })
      .end(done);
  });

  it('should return 404 if user not found', (done) => {

    request(app)
      .get(`/user_profile/kjhk`)
      .expect(404)
      .end(done);
  });

});

describe('GET /user_profile_continue/:username', () => {
  it('should return user detail if user exist', (done) => {
    request(app)
      .get(`/user_profile_continue/ohsasa`)
      .expect(200)
      .expect((res) => {
      
        expect(res.body.instagram_id).toBe("13013766");
      })
      .end(done);
  });

  it('should return 404 if user not found', (done) => {

    request(app)
      .get(`/user_profile_continue/kjhk`)
      .expect(404)
      .end(done);
  });

});