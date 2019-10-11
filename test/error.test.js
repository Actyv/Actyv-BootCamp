const User = require("../schema/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const request = require("supertest");
const HttpStatus = require("http-status-codes");
chai.use(chaiHttp);

/**
 * It should throw an 400 status while creating the new user.
 */
describe("Creating the  User", () => {
  it("it should throw the error to  create the user", done => {
    let man = {
      firstname: "john",
      lastname: "snow",
      age: 40
    };
    request(server)
      .post("/users/create")
      .send(man)
      .expect(HttpStatus.BAD_REQUEST, done);
  });
});

/**
 * It should throw an error while reading the user from the database.
 */
describe("Reading the user", () => {
  it("it should throw an error while reading the user", done => {
    let id = "5d657890hjsd778";
    request(server)
      .get(`/users/read/${id}`)
      .expect(HttpStatus.NOT_FOUND, done);
  });
});

/**
 * It should throw an 400 status while  updating the user.
 */
describe("Create an error while updating the user", () => {
  it("it should throw error while updating the user", done => {
    let id = "55ii53932783782";
    request(server)
      .put(`/users/update/${id}`)
      .expect(HttpStatus.BAD_REQUEST, done);
  });
});

/**
 * It should  throw an 404 error while deleting the user
 */
describe("Deleting the user", () => {
  it("it should throw error while deleting", done => {
    let id = "5d0099jjds848889";
    request(server)
      .put(`/users/delete/${id}`)
      .expect(HttpStatus.NOT_FOUND, done);
  });
});
