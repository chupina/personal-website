import { expect } from "chai";
import { using } from "mocha-params";
import { describe, it } from "mocha";
import { validateWithThrow } from "../email-validator.js";

describe("test validationWithThrow function", () => {
  it("should  throw an Error 'Provided email is invalid' when passed an empty string", () => {
    expect(() => validateWithThrow("")).to.throw("Provided email is invalid");
  });

  it("should  throw an Error 'Provided email is invalid' when does not contain @", () => {
    expect(() => validateWithThrow("my.gmail.com")).to.throw("Provided email is invalid");
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
    .it("should  throw an Error 'Provided email is invalid' when contains invalid characters", (value) => {
      expect(() => validateWithThrow(value)).to.throw("Provided email is invalid");
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
        const expected = true;
        const actual = validateWithThrow(value);
        expect(actual).to.deep.equal(expected);
      },
    );
  using
    .cases("my@gmail.com", "my@yandex.ru", "my@outlook.com")
    .it(
      "should return true for valid input endings",
      (value) => {
        expect(validateWithThrow(value)).to.deep.equal(true);
      },
    );

  using
    .cases(
      "my@email.com",
      "my@yahoo.com",
      "my@mail.ru",
      "my@gmail.ru",
      "my@yandex.com",
      "my@outlook.by",
    )
    .it(
      "should throw an Error 'Provided email is invalid' for invalid input endings",
      (value) => {
        expect(() => validateWithThrow(value)).to.throw("Provided email is invalid");
      },
    );
});
