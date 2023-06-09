#!/usr/bin/env node
const argPromise = import('arg');
const chalkPromise = import('chalk');
require = require("esm")(module);
const pkgUp = require('pkg-up');

(async () => {
  const arg = await argPromise;
  const chalk = await chalkPromise;

  try {
    const args = arg.default({
      '--start': Boolean,
      '--build': Boolean,
    });

    if (args['--start']) {
      const pkgPath = pkgUp.sync({ cwd: process.cwd() });
      const pkg = require(pkgPath);
      if (pkg.tool) {
        console.log('Found configuration', pkg.tool);
        // TODO: do something with configuration
      } else {
        console.log(chalk.yellow('Could not find configuration, using default'));
        // TODO: get default configuration
      }
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
