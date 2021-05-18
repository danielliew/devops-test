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
    it("it should GET hello world with status code 200", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal("Hello world");
          done();
        });
    });
    it("it should not GET borat", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.text.should.not.equal("borat");
          done();
        });
    });
  });

  describe("/GET /json", () => {
    it("it should GET hello world in JSON with status code 200", (done) => {
      chai
        .request(app)
        .get("/json")
        .end((err, res) => {
          console.log(res.body);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
