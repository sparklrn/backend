process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const models = require('../models');
const db = require('../models/index');
require('./truncate');

const User = require('../models').user;
const Role = require('../models').role;
const hash = require('../config/hash');

let factory = require('factory-girl'); 
const adapter = new factory.SequelizeAdapter();
factory = factory.factory
factory.setAdapter(adapter);

const saltRounds = 10;
const bCrypt = require('bcrypt');

factory.define('user', User, {
    email: 'testuser@example.com',
    password: hash('secret')
});

chai.use(chaiHttp);

before(function(done) {
    User.sync({force:true}).then(() => {
        done(null);
    }).catch(err => {
        done(err);
    });

});

describe('a_user_can_sign_up', function(done) {
    it('should save a user to database and return token', function(done) {
        chai.request(server).post('/api/signup').send({
            'email':'newuser@example.com',
            'password':'secret',
            'password_confirmation':'secret'
        }).end(function(err, res) {
            console.log(res.error);
            res.should.be.json;
            res.should.have.status(200);
            res.headers['content-type'].should.equal('application/json; charset=utf-8');
            res.body.user.email.should.equal('newuser@example.com');
            res.body.should.have.property('token');
            chai.request(server).get('/api/profile')
                .set('Authorization', 'Bearer ' + res.body.token)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.an('object');
                    res.body.email.should.equal('newuser@example.com');
                });
            done();
        });
    });
});

describe('a user can login in', function(done) {
    it('should log in a user', function(done) {
        factory.create('user').then(user => {
        });
        chai.request(server).post('/api/login').send({
            'email':'testuser@example.com',
            'password':'secret'
        }).end(function(err, res) {
            console.log(res.error);
            res.should.be.json;
            res.should.have.status(200);
            res.headers['content-type'].should.equal('application/json; charset=utf-8');
            res.body.user.email.should.equal('testuser@example.com');
            res.body.should.have.property('token');
            done();
        });
    });
});

describe('a user can not login with invalid credentials', function(done) {
    it('should prevent user login with invalid credentials', function(done) {
        chai.request(server).post('/api/login').send({
            'email':'testuser@example.com',
            'password':'random_pass'
        }).end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            res.headers['content-type'].should.equal('application/json; charset=utf-8');
            res.body.message.should.equal('Sorry, Please recheck your username and password');
            res.body.should.not.have.property('token');
            done();
        });
    });
});

describe('a user can not sign up with exisiting email', function(done) {
    it('should prevent user sign up', function(done) {
        chai.request(server).post('/api/signup').send({
            'email':'newuser@example.com',
            'password':'secret',
            'password_confirmation':'secret'
        }).end(function(err, res) {
            res.should.be.json;
            res.should.have.status(400);
            res.headers['content-type'].should.equal('application/json; charset=utf-8');
            res.body.should.not.have.property('token');
            done();
        });
    });
});

