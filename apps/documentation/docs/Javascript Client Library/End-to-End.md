---
sidebar_label: End-to-End testing
sidebar_position: 7
---

# End-to-end testing
`amplify-video.js` is tested through `Cypress` for integration tests while `Jest` is used for unit-tests. 

# How to setup end-to-end tests locally

## Prerequies 
Since Cypress will perform tests on real resources you must have to fill `sample.cypress.env.json` file with correct values and copy it has `cypress.env.json`.

```json
{
  "username": "username",
  "password": "password",
  "aws_project_region": "region",
  "aws_cognito_identity_pool_id": "region:uuid",
  "aws_cognito_region": "region",
  "aws_user_pools_id": "region_uuid",
  "aws_user_pools_web_client_id": "uuid",
  "aws_appsync_graphqlEndpoint": "domain/graphql",
  "aws_appsync_region": "region",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "awsInputVideo": "bucket",
  "awsOutputVideo": "cloudfront/bucket"
}
```
If you want to read more about required resources go to TODO THIS SECTION

## Run end-to-end tests

```sh
$ npm test
```
It will trigger the `pretest` command in charge of installing dependencies and build React Application.

`pre-install.js` script is triggered when `npm install` is call, it will generate `aws-video-exports.js` & `aws-exports.js` files based on `sample.cypress.env.json` file.
Those files are used to configure Amplify and the client library, they are required.

Don't push cypress.env.json file on repository.

## Test in development
```
$ npm install
$ npm start && npm run cy:open
```