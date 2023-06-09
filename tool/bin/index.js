#!/usr/bin/env node
const argPromise = import('arg');
const chalkPromise = import('chalk');
require = require("esm")(module);
const getConfig = require('../src/config/config-mgr');
const start = require('../src/commands/start');

(async () => {
  const arg = await argPromise;
  const chalk = await chalkPromise;

  try {
    const args = arg.default({
      '--start': Boolean,
      '--build': Boolean,
    });

    if (args['--start']) {
      const config = getConfig();
      start(config);
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
