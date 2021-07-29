import { expect } from "chai";
import { using } from "mocha-params";
import { describe, it, beforeEach, afterEach } from "mocha";
import { validateWithLog } from "../email-validator.js";

const sinon = require("sinon");

describe("test emailValidationWithLog function", () => {
  let stub;
  beforeEach(() => {
    stub = sinon.stub(console, "log");
  });
  afterEach(() => {
    stub.restore();
  });
  it("should  log 'false' when passed an empty string", () => {
    validateWithLog("");
    expect(console.log.calledOnce).to.be.true;
    expect(console.log.calledWith(false)).to.be.true;
  });
  it("should log false when does not contain @", () => {
    validateWithLog("");
    expect(console.log.calledOnce).to.be.true;
    expect(console.log.calledWith(false)).to.be.true;
  });
  using
    .cases(
      "@my@gmail.com",
      "my@@gmail.com",
      "my@gmail.com@",
      "my email@gmail.com",
      "my @gmail.com",
      "my@ gmail.com",
      "@@gmail.com",
      "my@gmail .com",
    )
    .it("should log false when contains invalid characters", (value) => {
      validateWithLog(value);
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(false)).to.be.true;
    });
  using
    .cases(
      " my@gmail.com",
      "my@gmail.com ",
      "  my@gmail.com",
      "my@gmail.com  ",
      " my@gmail.com ",
      "  my@gmail.com  ",
    )
    .it(
      "should ignore whitespace in the beginning or the end of an input value",
      (value) => {
        validateWithLog(value);
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(true)).to.be.true;
      },
    );
  using
    .cases("my@gmail.com", "my@yandex.ru", "my@outlook.com")
    .it("should log true for valid input endings", (value) => {
      validateWithLog(value);
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(true)).to.be.true;
    });
  using
    .cases(
      "my@email.com",
      "my@yahoo.com",
      "my@mail.ru",
      "my@gmail.ru",
      "my@yandex.com",
      "my@outlook.by",
    )
    .it("should log false for invalid input endings", (value) => {
      validateWithLog(value);
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith(false)).to.be.true;
    });
});
