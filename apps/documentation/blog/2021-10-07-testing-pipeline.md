---
slug: testing-pipeline
title: Building a reusable testing pipeline for AWS Amplify plugins
authors: [agez, przybilla]
tags:
  [
    Amazon CloudFront,
    Amplify Video,
    AWS Amplify,
    D2C & Streaming,
    direct-to-consumer and streaming,
    jest,
    TrackIt,
  ]
---

*Authored by Nathan Agez, a Software Engineer at TrackIt with master’s degrees in computer science from EPITECH France. Nathan has deep knowledge of the AWS Amplify ecosystem and also has extensive experience in building Serverless infrastructure for a variety of projects. He is passionate about open source, automation, travel, and loves playing his guitar when he’s not busy coding.*

## About AWS Amplify and AWS Amplify Video

AWS Amplify is a set of tools and cloud services that help front-end developers build scalable full-stack web and mobile applications powered by Amazon Web Services (AWS). Amplify tools can be used together or on their own, to develop applications with popular web frameworks including JavaScript, React, Angular, Vue, Next.js, and mobile platforms including Android, iOS, React Native, Ionic and Flutter.

<!--truncate-->

The Amplify Command Line Interface (CLI) is used within Amplify projects to configure, deploy, and manage backend resources for categories like Authentication, Storage, Application Programming Interface (API), and Analytics. These categories abstract away common AWS architecture patterns to increase velocity for developers and make it easier to focus on the truly unique features of your application.

The AWS M&E Solutions Architecture team recognized that the proliferation of streaming media applications would reveal a growing demand for an Amplify category focused on video. In April 2019, the team released an open-source plugin category for the Amplify CLI named AWS Amplify Video. Amplify Video helps developers implement and deploy video streaming without specialized engineering expertise. With Amplify Video, any developer can follow a set of Amplify CLI prompts to deploy their streaming backend with the same experience provided by the official AWS Amplify categories.

Fast forward to 2021 and project maintainers launched many new features like support for Amazon Interactive Video Service (Amazon IVS) and Video-on-Demand, but strive to balance new feature enhancements with community support as companies like Orangetheory Fitness use Amplify Video to launch entirely new services like Orangetheory At Home. The maintainers sought a better way to test the architectures deployed by the Amplify CLI and Amplify Video.

## Building a reusable testing pipeline for Amplify plugins

To improve feature velocity and supportability, Amplify Video maintainers collaborated with AWS Advanced Consulting Partner TrackIt to build a test pipeline for integration tests, unit tests, and end-to-end (E2E) tests to enable contributors to quickly test plugin enhancements. We also wanted an architecture that could be used by anyone interested in building and testing their own Amplify plugins.

![Amplify-video-testing-diagram-1](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2021/10/08/Amplify-video-testing-diagram-1.png)

The testing framework comprises three categories of tests: unit, integration, and end-to-end (E2E). The E2E tests remain in the planning stage. The unit and integration testing framework use Jest, a JavaScript Testing Framework designed to ensure correctness of any JavaScript codebase. Jest allows developers to write tests with a feature-rich API that provides results quickly, and it requires little configuration.

## Amplify CLI headless mode

Any user who calls the Amplify Video plugin on the Amplify CLI is provided with prompts to indicate the next steps to take. These prompts determine the infrastructure that is deployed as part of the Amplify project.

![CLI with prompt](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2021/10/06/Oct7_20212.png)

In order to automate the Amplify Video plugin testing process in the continuous integration and continuous delivery / continuous deployment (CI/CD) pipeline, we added a headless mode that automatically answers the Amplify CLI’s prompts.

```bash
#!/bin/bash
set -e
IFS='|'

VOD="{\
\"service\":\"video\",\
\"serviceType\":\"video-on-demand\",\
\"providerName\":\"awscloudformation\",\
\"resourceName\":\"vodTest\",\
\"enableCDN\":true,\
\"signedKey\":true,\
\"enableCMS\":false\
}"

amplify video add --payload $VOD
```
*Code snippet of the extra parameters and arguments in headless mode*

The Amplify CLI headless mode lets users enter parameters and arguments to save time and automate the testing process. You can learn how we implemented the Amplify CLI headless mode for Amplify Video by reading this pull request and the test documentation on the Github repository.

## Challenge: Identifying different infrastructure permutations

We realized that the more dependencies a specific infrastructure choice has, the more strenuous it becomes to manually write a script that takes all the permutations of answers (4000+) to CLI prompts into consideration. We had to find a more efficient way to leverage the Amplify CLI headless mode.

![Tree of choices for IVS](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2021/10/06/Oct7_20215.png)

*Tree of choices for IVS*

To address this challenge, we created a script that uses a graph data structure to automatically generate shell scripts for all of the possible infrastructure permutations that can be configured with Amplify Video.

The algorithm in the code snippet above goes through a specific file called ‘test-helper’ that contains the values, types, and relations between CLI prompts to create a tree of all the paths a user can take while answering the CLI’s questions. The tree is then used to recursively generate all the paths from the first node until there is no next node. These paths are then used to generate scripts containing the payload to run a specific permutation.

## Creating an integration testing workflow

For the CI/CD pipeline, we used GitHub Actions, which in this application lets users deploy the project inside an environment and run their tests.

For the integration testing, we added a new workflow that runs the different shell scripts and deploys the resources. The advantage of the framework is that it allows users to set up workflows before a test and shut them down after the test is complete. Once resources deploy without errors, the team can test different scenarios and once that is complete, deployed resources are immediately deleted to eliminate unnecessary infrastructure spending.

## Creating a dev-test mode to accelerate testing

The testing process involved deploying resources in the cloud to run tests and then deleting the resources once the tests completed. The TrackIt team realized that this process of constantly deploying and deleting resources can be tiresome and time-consuming.

To address this issue, we created a dev-test mode in the test framework that lets users leverage an already existing project locally and to run tests. The team added a condition NODE_ENV, shown in the following screenshots, that indicates the environment the user is in – dev or test.

```js
const fs = require('fs');
const path = require('path');
const { exec } = require('../provider-utils/awscloudformation/utils/headless-mode');

module.exports = async function setup() {
  if (process.env.NODE_ENV !== 'test') {
    const directoryPath = path.join(__dirname, `../${process.env.AMP_PATH}/amplify`);
    if (!fs.existsSync(directoryPath)) {
      throw new Error(`No amplify project found, make sure to set AMP_PATH with correct path.\nActual path: ${directoryPath}`);
    }
  } else {
    await executeScripts();
  }
};

async function executeScripts() {
  try {
    console.log('\namplify init');
    await exec('bash', ['./scripts/headless/init-new-project.sh']);
    console.log('\namplify add video');
    await exec('bash', ['./scripts/headless/add-ivs.sh']);
    await exec('bash', ['./scripts/headless/add-vod.sh']);
    console.log('\namplify push');
    await exec('bash', ['./scripts/headless/amplify-push.sh']);
  } catch (error) {
    await exec('bash', ['./scripts/headless/amplify-delete.sh']);
    throw (new Error(error));
  }
}
```

*Code snippet of a test for validating the AWS CloudFormation generated by Amplify Video*

This means that the main test pipeline is only used by GitHub Actions to initially deploy the resources. Users in the dev phase can thereafter run tests against a local project, making it easier to debug or test only the new tests they’ve added. Following is an example of a test running locally:

![prompt](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2021/10/06/Oct7_20217.png)

With this workflow setup, whenever a contributor wants to add new tests for a specific feature/branch/patch they must note the test directory’s architecture. It is composed of integration tests and unit tests.

Integration tests require resources to be deployed. For instance, testing an Amazon CloudFront distribution endpoint requires deploying and creating a CloudFront endpoint on the AWS console along with a private key to sign URLs. Unit tests, however, run against the code-base and do not require deployed resources.

All unit tests go into the “tests” directory whereas integration tests go into the “tests/integration” directory, shown below.

![directory hierarchy](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2021/10/06/Oct7_20218.png)

Users run local tests using a mode called “dev-test.” It performs tests on a local Amplify project instead of deploying resources each time the user runs a new integration test. To determine where the test is running – in the CI/CD pipeline (test) or on a local machine (dev-test) – we run a check:

```bash
process.env.NODE_ENV !== 'test' && process.env.AMP_PATH
```
If this check returns true, the tests are running on a local Amplify project on the user’s machine. Any new tests will likely need to fetch data inside a specific Amplify directory in a similar manner.

## Conclusion

The main goal for the testing pipeline was to create an easy-to-maintain solution that would enable Amplify users to quickly build and test their own plugins without having to deploy resources manually and execute laborious tests. Users willing to create and test their own plugins can do so in three simple steps by referencing this article:

Create plugins with the Amplify CLI headless mode
Set up a Jest testing framework
Write bash scripts for the headless mode that will deploy resources for the tests automatically
If you’re creating your own Amplify plugin and have questions about our approach to testing, take a look at the Amplify Video GitHub repository and create a discussion topic with any questions.

## About TrackIt
TrackIt is an AWS Advanced Consulting Partner specializing in cloud management, consulting, and software development solutions based in Venice, California.

TrackIt specializes in Modern Software Development, DevOps, Infrastructure-As-Code, Serverless, CI/CD, and Containerization with specialized expertise in Media & Entertainment workflows, High-Performance Computing environments, and data storage.

TrackIt’s forté is cutting-edge software design with deep expertise in containerization, serverless architectures, and innovative pipeline development. The TrackIt team can help you architect, design, build and deploy a customized solution tailored to your exact requirements.

In addition to providing cloud management, consulting, and modern software development services, TrackIt also provides an open-source AWS cost management tool that allows users to optimize their costs and resources on AWS.

Schedule a consultation with TrackIt

![trackit logo](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2021/10/07/trackit.png)