### Integration

Integration tests must be inside `./tests/integration` directory.

The following snippet will check that the generated template respect the CloudFormation syntax:

```js
const path = require('path');
const glob = require('glob');
const AWS = require('aws-sdk');
const fs = require('fs');

test('Should validate CloudFormation templates', async () => {
  const directoryPath = path.join(__dirname, '../../amplify/backend/video/**/build/**/*.template');
  const files = glob.sync(directoryPath);
  const cloudformation = new AWS.CloudFormation();

  await Promise.all(files.map(async (filePath) => {
    try {
      await cloudformation.validateTemplate({
        TemplateBody: fs.readFileSync(filePath,
          { encoding: 'utf8', flag: 'r' }),
      }).promise();
    } catch (error) {
      throw (new Error(`template path: ${filePath}\n${error}`));
    }
  }));
});
```


### Unit tests

Unit tests must be inside `./tests/` at root directory.

### Headless mode

Several commands in the Amplify CLI support arguments which could potentially be used in your CI/CD flows, you can see them [here](https://docs.amplify.aws/cli/usage/headless).

amplify-video also support a specific argument `(--payload)` to automatically build video resources.

`--payload` argument requires the following fields:

- service
- serviceType
- providerName

All other parameters are optionals and base on the service questions located in the `provider-utils` directory.

Example:

```sh
#!/bin/bash
set -e
IFS='|'

STD_LOW="{\
\"service\":\"video\",\
\"serviceType\":\"ivs\",\
\"providerName\":\"awscloudformation\",\

# Starting from here all parameters are optionals

\"resourceName\":\"std-low\",\
\"channelQuality\":\"STANDARD\",\
\"channelLatency\":\"LOW\"\
}"

amplify video add --payload $STD_LOW
```
