const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const HttpStatus = require("http-status-codes");
const should = chai.should();
const expect = chai.expect;
const sinon = require("sinon");
const { readUser } = require("../controller/index");
const { logger } = require("../Logger/index");

chai.use(chaiHttp);

describe("Reading the user", () => {
  // API Call

  it("it should read the user with an actual api call", done => {
    chai
      .request(server)
      .get("/users/read/5da3165fe845ca13587b51ac")
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User Found");
        done();
      });
  });

  // SPIES and STUB

  it("it should read the user using stub and spies", done => {
    let req = {
      params: {
        id: "5da3165fe845ca13587b51ac"
      }
    };

    // Spying on send and status method of response object
    let res = {
      send: sinon.spy(),
      status: sinon.stub().returns({ json: sinon.spy() })
    };

    readUser(req, res, () => {
      // Testing Response Object
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.firstCall.args[0]).to.equal(HttpStatus.OK);
      done();
    });
  });

  // Testing CastError Exceptions

  it("it should test the CastError exception", done => {
    let req = {
      params: {
        id: "26t2vb2bet2ye" // Wrong Mongoose Id
      }
    };

    let res = {
      send: sinon.spy(),
      status: sinon.stub().returns({ json: sinon.spy() })
    };

    sinon.spy(logger, "error");

    readUser(req, res, () => {
      // Testing Logger
      expect(logger.error.calledOnce).to.be.true;
      expect(logger.error.firstCall.args[0]).to.equal("CastError");

      // Testing Response Object
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.firstCall.args[0]).to.equal(HttpStatus.NOT_FOUND);

      // Destroy or Restore the stub so that it can be used in other test cases
      sinon.restore();
      done();
    });
  });

  // Testing UserNotFoundException

  it("it should test the UserNotFound exception", done => {
    let req = {
      params: {
        id: "5da31647c80b26130a45713f" // Correct Mongoose Id but User is not actually present
      }
    };

    let res = {
      send: sinon.spy(),
      status: sinon.stub().returns({ json: sinon.spy() })
    };

    sinon.spy(logger, "error");

    readUser(req, res, () => {
      // Testing Logger
      expect(logger.error.calledOnce).to.be.true;
      expect(logger.error.firstCall.args[0]).to.equal("UserNotFoundException");

      // Testing Response Object
      expect(res.status.calledOnce).to.be.true;
      expect(res.status.firstCall.args[0]).to.equal(HttpStatus.NOT_FOUND);

      // Destroy or Restore the stub so that it can be used in other test cases
      sinon.restore();
      done();
    });
  });
});
