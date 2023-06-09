#!/usr/bin/env node
const argPromise = import('arg');
const chalkPromise = import('chalk');
require = require("esm")(module);
const path = require('path');

(async () => {
  const arg = await argPromise;
  const chalk = await chalkPromise;

  try {
    const args = arg.default({
      '--start': Boolean,
      '--build': Boolean,
    });

    if (args['--start']) {
      const pkg = require(path.join(process.cwd(), 'package.json'));
    // TODO: do something with pkg
      console.log(chalk.default.bgCyanBright('starting the app'));
    }
  } catch (e) {
    console.log(chalk.default.yellow(e.message));
    console.log();
    usage();
  }
})();


function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}
