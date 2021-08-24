import { expect } from "chai";
import { describe, it, afterEach } from "mocha";
import * as sinon from "sinon";
import * as emailValidator from "../email-validator.js";

describe("test validationWithThrow function", () => {
  let stub;
  afterEach(() => {
    stub.restore();
  });

  it("should  throw an Error 'Provided email is invalid' when passed invalid email", () => {
    stub = sinon.stub(emailValidator, "validate");
    stub.returns(false);
    expect(() => emailValidator.validateWithThrow("invalid input")).to.throw("Provided email is invalid");
  });

  it("should return true for valid input endings", () => {
    stub = sinon.stub(emailValidator, "validate");
    stub.returns(true);
    expect(emailValidator.validateWithThrow("valid@gmail.com")).to.deep.equal(true);
  });
});
