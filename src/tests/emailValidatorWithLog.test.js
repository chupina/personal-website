import { expect } from "chai";
import { describe, it, beforeEach, afterEach } from "mocha";
import * as sinon from "sinon";
import * as emailValidator from "../email-validator.js";

describe("test emailValidationWithLog function", () => {
  let validationStub;
  let consoleStub;
  beforeEach(() => {
    consoleStub = sinon.stub(console, "log");
    validationStub = sinon.stub(emailValidator, "validate");
  });
  afterEach(() => {
    consoleStub.restore();
    validationStub.restore();
  });
  it("should  log 'false' when passed invalid email", () => {
    validationStub.returns(false);
    emailValidator.validateWithLog("invalid email");
    expect(console.log.calledOnce).to.be.true;
    expect(console.log.calledWith(false)).to.be.true;
  });
  it("should  log 'true' when passed valid email", () => {
    validationStub.returns(true);
    emailValidator.validateWithLog("valid@gmail.com");
    expect(console.log.calledOnce).to.be.true;
    expect(console.log.calledWith(true)).to.be.true;
  });
});
