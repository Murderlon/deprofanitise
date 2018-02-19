const readline = require('readline');
const ncp = require('copy-paste');
const chalk = require('chalk');
const cuss = require('cuss');

const fck = require('./lib/f-ck');

let selectedOption;
const prompt = `${chalk.red('$')} `;
const log = console.log;
const options = '\n1. butt > b*tt\n2. butt > b**t\n3. butt > @#$%\n';
const deprofanitise = str =>
  str
    .split(' ')
    .map(
      word =>
        word in cuss && cuss[word] >= 1 ? fck[selectedOption](word) : word
    )
    .join(' ');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Clear the console.
process.stdout.write('\u001b[2J\u001b[0;0H');

rl.question(
  `${chalk.black.bgWhite(
    'How do you want to clean up your profanities? (e.g "1")\n'
  )} ${options}\n${prompt}`,
  answer => {
    switch (answer) {
      case '1':
        selectedOption = 'vowel';
        break;
      case '2':
        selectedOption = 'inner';
        break;
      case '3':
        selectedOption = 'grawlix';
        break;
      default:
        selectedOption = 'vowel';
        log('That\'s not a valid option, selected "1" for you.');
        break;
    }

    rl.question(
      `${chalk.black.bgWhite('Copy or write your input')}\n${prompt}`,
      input => {
        ncp.copy(deprofanitise(input), () => {
          log('✅ Copied result to clipboard.');
          process.exit();
        });
      }
    );
  }
);
