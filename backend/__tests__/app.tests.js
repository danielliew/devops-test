//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

//Our parent block
describe("App module tests", () => {
  describe("/GET /", () => {
    it("it should GET hello world", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body, res.text);
          done();
        });
    });
  });

  describe("/GET /json", () => {
    it("it should GET hello world", (done) => {
      chai
        .request(app)
        .get("/json")
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body, res.text);
          done();
        });
    });
  });
});
