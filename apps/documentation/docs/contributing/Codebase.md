## Understanding the codebase

The following is a description of the Amplify Video project structure.

### Root

`./index.js`

Contains the callback functions for amplify for pre/post push.

`./amplify-plugin.json`

Contains all supported plugin commands

### Provider Utilities and CloudFormation

`./provider-utils/supported-services.json`

Defines workflows that are supported by amplify video. Required files are:

* `alias` : What shows up in the question
* `serviceWalkthroughFilename` : What asks the questions for that specific service
* `cfnFilename` : The root template for the service
* `stackFolder` : Contains supporting templates for the service
* `defaultValuesFilename` : Contains default answers to the questions asked in `serviceWalkthroughFilename`
* `provider` : Define what provider you want to use. This maps to the containing folder for the rest of the files. (Right now the Amplify CLI only supports CloudFormation)


`./provider-utils/awscloudformation/index.js`

This file takes the info passed from the servicewalkthrough file and executes it. This file shouldn't be changed that often.

`./provider-utils/awscloudformation/utils/`

Contains all functions that are shared between all video services with respect to CloudFormation

`./provider-utils/awscloudformation/service-walkthroughs/`

Contains the service walkthrough file that is defined in the `supported-services.json`. These files prompt the user questions about the Video resource.

`./provider-utils/awscloudformation/obs-templates/`

The template for amplify video livestream to configure OBS

`./provider-utils/awscloudformation/default-values/`

Place your defaults value file here that you defined above in the supported-services.json

`./provider-utils/awscloudformation/cloudformation-templates/`

Place your root template here and your folder for your nested stack. You will notice that the templates that already exist for the root stack are .ejs files. EJS allows us to dynamically compile the CloudFormation to add or remove features and passing parameters generated from the CLI. Any folders inside of the nested stack folder will be zipped up and given the same name in .zip on pre push.

### Commands

`./commands/video.js`

Contains the help view for amplify video. Any new commands should show up here.

`./commands/video/`

Contains all supported commands defined in the amplify-plugin.json

### Tests

`./jest.config.js`

Contains the configuration for Jest.

`./tests/`

Contains all the test suites, unit tests should go to the root of `tests` directory.

`./tests/integration/`

Contains the integration tests.

`./scripts/headless`

Contains scripts used by Jest to provide and delete resources in the cloud.

Refer to this [section](tests) to learn how to write new scripts.

`./scripts/setup.js`

Is responsible to init a new amplify project (amplify init) then add the amplify-video resources thanks to the headless mode then the tests will start. It is used by `globalSetup` inside `jest.config.js`

`./scripts/teardown.js`

When the tests have been ran, it will be responsible to destroy all previously created resources, thanks to `globalTeardown` also inside `jest.config.js` file.

