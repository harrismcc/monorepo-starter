#! node

const { readFileSync } = require("fs");

/**
 * These words will be caught as being actionable on CI, but not locally.
 */
const CI_BAD_WORDS = ["DO NOT SUBMIT", "FIXME", "FIX ME"];

/**
 * These words will be caught as being actionable, bot locally and on CI.
 */
const LOCAL_BAD_WORDS = [
  "@memberof",
  "@module",
  "from 'lodash'",
  "from 'lodash/flatten'", // use .flat()
  "@returns -", // Just use `@returns My Comment`
];

/**
 * Finds a list of occurrences of a given set of bad words in all affected files
 *
 * @param badWordSet - The set of bad words to look for
 * @returns a list of issues
 */
function findIssues(badWordSet) {
  const filenames = process.argv.slice(2);

  return filenames.flatMap((filename) =>
    readFileSync(filename, "utf8")
      .split("\n")
      .map((text, index) => ({ text, line: index + 1, filename }))
      .filter(
        ({ text }) => badWordSet.map((word) => text.includes(word)).length > 0
      )
      .flatMap(({ text, line }) =>
        badWordSet
          .filter((word) => text.includes(word))
          .map((phrase) => `Found "${phrase}" on ${filename}:${line}`)
      )
  );
}

/**
 * Finds banned phrases in any changed file
 *
 * @returns non-zero when any changed file contains a banned phrase
 */
function main() {
  const localIssues = findIssues(LOCAL_BAD_WORDS);
  if (localIssues.length > 0) {
    localIssues.forEach((error) => console.log(error));
    return 1;
  }

  const ciIssues = findIssues(CI_BAD_WORDS);
  if (process.env.CI === "true" && ciIssues.length > 0) {
    ciIssues.forEach((error) => console.log(error));
    return 1;
  }

  return 0;
}

process.exit(main());
