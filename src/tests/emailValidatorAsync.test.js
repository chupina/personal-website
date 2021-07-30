import { describe, it, afterEach } from "mocha";
import * as sinon from "sinon";
import * as chai from "chai";
import * as emailValidator from "../email-validator.js";

const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

describe("test emailValidationAsync function", () => {
  let stub;
  afterEach(() => {
    stub.restore();
  });
  it("should return false asynchronously when passed invalid email", () => {
    stub = sinon.stub(emailValidator, "validate");
    stub.returns(false);
    const expected = false;
    const actual = emailValidator.validateAsync("invalid.email");
    return actual.should.eventually.deep.equal(expected);
  });
  it("should return true asynchronously for valid emails", () => {
    stub = sinon.stub(emailValidator, "validate");
    stub.returns(true);
    const expected = true;
    const actual = emailValidator.validateAsync("my@gmail.com");
    return actual.should.eventually.deep.equal(expected);
  });
});
