require('dotenv').config()
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app');
var global_id = 10

describe('GET /v1/towers', () => {
    it('should respond with all towers', (done) => {
        chai.request(server)
            .get('/v1/towers')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);

                // there should be a 200 status code
                res.status.should.equal(200);

                // the response should be JSON
                res.type.should.equal('application/json');

                // the JSON response body should have a
                // key-value pair of {"status": 200}
                res.body.status.should.eql(200);

                // the first object in the data array should
                // have the right keys
                res.body.data[0].should.include.keys(
                    "id", "name", "location", "floorCount", "officeCount", "rating",
                    "longitude", "latitude", "createdAt", "updatedAt"
                );
                done();
            });
    });
});

describe('GET /v1/towers/:id', () => {
    it('should respond with all towers', (done) => {
        chai.request(server)
            .get('/v1/towers/1')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);

                // there should be a 200 status code
                res.status.should.equal(200);

                // the response should be JSON
                res.type.should.equal('application/json');

                // the JSON response body should have a
                // key-value pair of {"status": 200}
                res.body.status.should.eql(200);

                // the first object in the data array should
                // have the right keys
                res.body.data.should.include.keys(
                    "id", "name", "location", "floorCount", "officeCount", "rating",
                    "longitude", "latitude", "createdAt", "updatedAt"
                );
                done();
            });
    });
});

describe('POST /v1/towers/', () => {
    it('should respond with a success message along with a single tower that was added', (done) => {
        chai.request(server)
            .post('/v1/towers/')
            .set({ Authorization: "bearer "+process.env.TEMP_TOKEN })
            .send({
                "name": "tower_test",
                "location": "loc-test",
                "floorCount": 99,
                "officeCount": 199,
                "rating": "5",
                "latitude": "12.22",
                "longitude": "13.26"
            })
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);

                // there should be a 201 status code
                // (indicating that something was "created")
                res.status.should.equal(201);

                // the response should be JSON
                res.type.should.equal('application/json');

                // the JSON response body should have a
                // key-value pair of {"status": 201}
                res.body.status.should.eql(201);

                // the JSON response body should have a
                // key-value pair of {"data": 1 user object}
                res.body.data.should.include.keys(
                    "id", "name", "location", "floorCount", "officeCount", "rating",
                    "longitude", "latitude", "createdAt", "updatedAt"
                );

                // putting created data value in global_id for update and delete apis
                global_id = res.body.data.id;

                console.log("create body",res.body)
                done();
            });
    });
});

describe('PUT /v1/towers/:id', () => {
    it('should respond with a success message', (done) => {
        chai.request(server)
            .put('/v1/towers/'+global_id)
            .set({ Authorization: "bearer "+process.env.TEMP_TOKEN })
            .send({
                "name": "tower_test2",
                "location": "loc-test2",
                "floorCount": 99,
                "officeCount": 199,
                "rating": "5",
                "latitude": "12.22",
                "longitude": "13.26"
            })
            .end((err, res) => {
                console.log("update Body:", res.body)
                // there should be no errors
                should.not.exist(err);

                // there should be a 200 status code
                // (indicating that something was "created")
                res.status.should.equal(200);

                // the response should be JSON
                res.type.should.equal('application/json');

                // the JSON response body should have a
                // key-value pair of {"status": 200}
                res.body.status.should.eql(200);

                done();
            });
    });
});

describe('DELETE /v1/towers/:id', () => {
    it('should respond with a success message', (done) => {
        chai.request(server)
            .delete('/v1/towers/'+global_id)
            .set({ Authorization: "bearer "+process.env.TEMP_TOKEN })
            .send({
                "name": "tower_test2",
                "location": "loc-test2",
                "floorCount": 99,
                "officeCount": 199,
                "rating": "5",
                "latitude": "12.22",
                "longitude": "13.26"
            })
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err);

                // there should be a 200 status code
                // (indicating that something was "created")
                res.status.should.equal(200);

                // the response should be JSON
                res.type.should.equal('application/json');

                // the JSON response body should have a
                // key-value pair of {"status": 200}
                res.body.status.should.eql(200);

                console.log("delete Body:", res.body)
                done();
            });
    });
});


