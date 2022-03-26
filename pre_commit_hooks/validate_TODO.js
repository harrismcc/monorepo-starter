#! node

const fs = require('fs');

const SHOW_ALL = '--show-all';

/**
 * Ensure that all TODOs are in the correct format
 *
 * @returns non-zero when any changed file
 */
function main() {
  // get the files passed in from pre-commit
  const showAll = process.argv.includes(SHOW_ALL);
  const files = process.argv.slice(1).filter((arg) => arg !== SHOW_ALL);

  let filesChanged = false;
  const changeSummary = [];

  files.forEach((file) => {
    let status; // leave status undefined in skip case for better color highlighting
    try {
      // finds todos in non-standard formats
      const todoRegex =
        // eslint-disable-next-line max-len
        /((\/\/|\*)[ \t]*TODO)[:\-—]?[ \t]*\(?[ \t]*(https?:\/\/\S+(?<!([:\-—)])))[ \t]*\)?[ \t]*(:|[-—]+[ \t])?[ \t]*(.*?)[ \t]*(\*\/)?$/gm;
      const contents = fs.readFileSync(file).toString('utf-8');
      let matches = todoRegex.exec(contents);
      let replaced = contents;
      // keep track of the indices as they change
      let offset = 0;
      while (matches) {
        // indexes corresponding to parts of the regex
        const TODO_INDEX = 1;
        const LINK_INDEX = 3;
        const COMMENT_INDEX = 6;
        const CLOSE_COMMENT_INDEX = 7;

        const swappedTodo = [
          `${matches[TODO_INDEX]}:`,
          matches[LINK_INDEX],
          `${
            matches[COMMENT_INDEX].replace(/[-—]/g, '').trim()
              ? `- ${matches[COMMENT_INDEX]}`
              : ''
          }`,
          matches[CLOSE_COMMENT_INDEX],
        ]
          .filter((part) => part)
          .join(' ');

        replaced =
          replaced.substring(0, matches.index + offset) +
          swappedTodo +
          replaced.substring(matches.index + matches[0].length + offset);

        // update the offset with the change in length
        offset += swappedTodo.length - matches[0].length;

        matches = todoRegex.exec(contents);
      }

      if (contents !== replaced) {
        filesChanged = true;
        status = 'Changed';
        fs.writeFileSync(file, replaced);
      }
    } catch (e) {
      status = `Error: ${e.message}`;
      console.error(`Error evaluating "${file}":`, e);
    } finally {
      if (status || showAll) {
        changeSummary.push({ file, status });
      }
    }
  });

  if (filesChanged) {
    console.table(changeSummary);
  }

  // return non-zero if anything changed
  return filesChanged ? 1 : 0;
}

process.exit(main());
