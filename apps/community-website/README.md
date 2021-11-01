# Migration

## How to migrate the project to another AWS account

Before all make sure you are using the version of node specified in the `.nvmrc` file

```sh
npm install -g @aws-amplify/cli
amplify configure
```

The configure step will guide you through steps for creating a new IAM user. Select all default options.
If you already have the CLI configured, you do not need to run the configure command again.

```sh
amplify init --app https://github.com/trackit/amplify-video-community
```

The init command clones the GitHub repo, initializes the CLI, creates a ‘sampledev’ environment in CLI, detects and adds categories, provisions the backend, pushes the changes to the cloud, and starts the app.

If you already have an AWS profile set up on your local machine, choose “Yes” when prompted by the CLI and select the profile you would like to use.

The whole article can be found [here](https://aws.amazon.com/blogs/mobile/amplify-cli-adds-scaffolding-support-for-amplify-apps-and-authoring-plugins/)

--