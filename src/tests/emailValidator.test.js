import { describe, it } from "mocha";
import { expect } from "chai";
import { using } from "mocha-params";
import { validate } from "../email-validator.js";

describe("test emailValidator function", () => {
  it("should return false when passed an empty string", () => {
    const expected = false;
    const actual = validate("");
    expect(actual).to.deep.equal(expected);
  });

  it("should return false when does not contain @", () => {
    const expected = false;
    const actual = validate("my.gmail.com");
    expect(actual).to.deep.equal(expected);
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
    .it("should return false when contains invalid characters", (value) => {
      const expected = false;
      const actual = validate(value);
      expect(actual).to.deep.equal(expected);
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
      "should ignore whitespace in the beginning or the end of the input string",
      (value) => {
        const expected = true;
        const actual = validate(value);
        expect(actual).to.deep.equal(expected);
      },
    );
  using
    .cases("my@gmail.com", "my@yandex.ru", "my@outlook.com")
    .it("should return true for valid input endings", (value) => {
      const expected = true;
      const actual = validate(value);
      expect(actual).to.deep.equal(expected);
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
    .it("should return false for invalid input endings", (value) => {
      const expected = false;
      const actual = validate(value);
      expect(actual).to.deep.equal(expected);
    });
});
