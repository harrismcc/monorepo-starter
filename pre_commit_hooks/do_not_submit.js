#! node

const { readFileSync } = require('fs');

/**
 * These words will be caught as being actionable on CI, but not locally.
 */
const CI_BAD_WORDS = ['DO NOT SUBMIT', 'FIXME', 'FIX ME'];

/**
 * These words will be caught as being actionable, bot locally and on CI.
 */
const LOCAL_BAD_WORDS = [
  '@memberof',
  '@module',
  "from 'lodash'",
  "from 'lodash/flatten'", // use .flat()
  '@returns -', // Just use `@returns My Comment`

  // importing from cypress package should use yarn workspace resolution @main/cypress/
  "from 'cypress/",

  // Temporary to prevent errors arising from https://github.com/transcend-io/main/pull/3338
  // and from https://github.com/transcend-io/main/issues/4138
  'client_id: clientID',
  'client_id: await clientID',
  // We do not want to match integrations based on statusCode of 404
  // 404 can mean file does not exist, or the route does not exist
  // we want to ensure that we get the former and don't accidentally verify that
  // we successfully deleted something if the integration partner happened to have
  // changed the route to something else
  'err.statusCode === 404)',
  "/envs'", // from https://github.com/transcend-io/main/pull/4168. Use "/args'"
  'BPromise.mapSeries', // use import { mapSeries } from 'bluebird'
  'context.only(',
  // outdated jsdoc
  // '@returns {', TODO @ts add back when sombra is ts
  // '@typedef TODO @ts
  // '@type TODO @ts
  // '@type TODO @property
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
    readFileSync(filename, 'utf8')
      .split('\n')
      .map((text, index) => ({ text, line: index + 1, filename }))
      .filter(
        ({ text }) => badWordSet.map((word) => text.includes(word)).length > 0,
      )
      .flatMap(({ text, line }) =>
        badWordSet
          .filter((word) => text.includes(word))
          .map((phrase) => `Found "${phrase}" on ${filename}:${line}`),
      ),
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
  if (process.env.CI === 'true' && ciIssues.length > 0) {
    ciIssues.forEach((error) => console.log(error));
    return 1;
  }

  return 0;
}

process.exit(main());
