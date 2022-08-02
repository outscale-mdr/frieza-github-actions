const core = require('@actions/core');

const setup = require('./lib/frieza');

(async () => {
  try {
    const timeout = core.getInput('clean_timeout');
    const errorOnDirty = core.getInput('error_on_dirty');
    
    let needsClean = await setup.needsClean()

    if (needsClean) {
      await setup.cleanAccount(timeout)
    }

    await setup.removeCredentials()

    if (needsClean && errorOnDirty) {
      core.setFailed("The account was not clean");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();