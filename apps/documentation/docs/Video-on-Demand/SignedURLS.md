---
sidebar_label: Signed URLS
sidebar_position: 5
---

We now support the AWS best practice concerning the creation of signed URLs:
[Choosing between trusted key groups (recommended) and AWS accounts](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#choosing-key-groups-or-AWS-accounts)

## Why using signed URLs ?

Signed URLs are used to protect the access on ressources (on an S3 bucket for example). Using the best practice enable us to sign URLs without having to create a private/public key pair with a root AWS account.

## Behind the scene

When choosing the production environment option when setting up VOD, the CLI will create a private/public key pair (.pem file). The Private key will be stored with AWS Secrets Manager and the Public key will be added to the CloudFormation template.


## How URLs are signed ?

When creating a signed URL, we create a [Policy statement](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html#private-content-custom-policy-statement) that controls the access that a signed URL grants to a user; the [Signature](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html#private-content-custom-policy-creating-signature), a hashed, signed, and base64-encoded version of the JSON policy statement that uses the create Policy and the [Key-Pair-ID](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html), this public key must belong to a key group that is a trusted signer in the distribution


## How to create a signed URL 

As a part of the Amplify video deploy, a Lambda which can generate the signature for an URL is deployed and exposed via the GraphQL API as a part of the videoObject. The videoObject generating a token can be verified by reviewing the schema.graphql which contains the call to generate a token 

```javascript
#DO NOT EDIT
type videoObject @model
@auth(
  rules: [
    {allow: owner, ownerField: "owner", operations: [create, update, delete, read] },
    {allow: groups, groups:["Admin"], operations: [create, update, delete, read]},
    {allow: private, operations: [read]}
  ]
)
{
  id:ID!

  #indicates that a token will be returned as a part of the video object
  token: String @function(name: "eighttrial-prod-tokenGen")
}

```

Double check the graphql/queries.js to ensure that the token is being returned as a part of the call 

```javascript
export const getVodAsset = /* GraphQL */ `
  query GetVodAsset($id: ID!) {
    getVodAsset(id: $id) {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
        owner
        token /* <<<< indicates a token will be returned in the response >>>>*/
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listVodAssets = /* GraphQL */ `
  query ListVodAssets(
    $filter: ModelvodAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        video {
          id
          createdAt
          updatedAt
          owner
          token /* <<<< indicates a token will be returned in the response >>>>*/
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

```

The generated token needs to be appended to the CDN URL of the video. For example `https://d3sdhpxwi5ukf4.cloudfront.net/cd2b9016-f14b-448b-b602-a0372f429e06/cd2b9016-f14b-448b-b602-a0372f429e06.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM3NkaHB4d2k1dWtmNC5jbG91ZGZyb250Lm5ldC9jZDJiOTAxNi1mMTRiLTQ0OGItYjYwMi1hMDM3MmY0MjllMDYvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxOTczMTM5Nn19fV19&Key-Pair-Id=K1H5X7ZK6IID8W&Signature=QQ8j0-HUfvniarWzHISAad0iK0ShA7U3y5aB~yqMBr5PCHi17iJ4I2FtkFHTBpGGAxZEAIccNzoBtwP5Jrwk0yRkDS12j4z2kHdWjg8OsQm2~uL7rSUynTFpBJRD1Xv1jlLRATp-FK4tvktpTDv7Z2LdrFFRqJpmBqao-AS1nYO5FzwizmdtxqQwfJ1~md8P9VwUCqfnLBUgfMRNYzGTfrJn5yEqYW9AsVrkssijiepla1WH4oyCcJ-v62CmQ4QLM11iQ7vFX5omNPLajnIP3PDek1zn9CiNPCxiqRXcTkS1NjprqEk49syDL6HZZfldZTNO4HHofrQhvdo20CGdfA__`

where `https://d3sdhpxwi5ukf4.cloudfront.net/cd2b9016-f14b-448b-b602-a0372f429e06/cd2b9016-f14b-448b-b602-a0372f429e06.m3u8` is the CDN URL of the video and `?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM3NkaHB4d2k1dWtmNC5jbG91ZGZyb250Lm5ldC9jZDJiOTAxNi1mMTRiLTQ0OGItYjYwMi1hMDM3MmY0MjllMDYvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxOTczMTM5Nn19fV19&Key-Pair-Id=K1H5X7ZK6IID8W&Signature=QQ8j0-HUfvniarWzHISAad0iK0ShA7U3y5aB~yqMBr5PCHi17iJ4I2FtkFHTBpGGAxZEAIccNzoBtwP5Jrwk0yRkDS12j4z2kHdWjg8OsQm2~uL7rSUynTFpBJRD1Xv1jlLRATp-FK4tvktpTDv7Z2LdrFFRqJpmBqao-AS1nYO5FzwizmdtxqQwfJ1~md8P9VwUCqfnLBUgfMRNYzGTfrJn5yEqYW9AsVrkssijiepla1WH4oyCcJ-v62CmQ4QLM11iQ7vFX5omNPLajnIP3PDek1zn9CiNPCxiqRXcTkS1NjprqEk49syDL6HZZfldZTNO4HHofrQhvdo20CGdfA__` is the signature that is returned as a part of the GraphQL call 

Example code
```javascript
import React from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import {listVodAssets, getVodAsset} from '../../graphql/queries.js'
import awsmobile from '../../../../../../src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

class ListView extends React.Component {

	constructor(){
		super()
		this.state={ token : '', videoId: ''};
		this.videoAssetId = "b5122cc3-4b46-479e-a98b-78f312ef2664"
	}

	componentDidMount(){

		const videoObject = {
     	        id: this.videoAssetId
     	};

		API.graphql(graphqlOperation(getVodAsset, videoObject)).then((response, error) => {
					

					const token = response["data"]["getVodAsset"]["video"]["token"]
					const videoId = response["data"]["getVodAsset"]["video"]["id"]
					this.setState({
						token, videoId
					})
		});



	}

	render(){

		return <p>https://d3sdhpxwi5ukf4.cloudfront.net/{this.state.videoId}/{this.state.videoId}.m3u8{ this.state.token } </p>

	}

}


export default withAuthenticator(ListView, true);

```

Note that the signed URL is required for every file in the directory and not only for the initial manifest. Since the video player will first get the manifest and then download all the subsequent fragments to play the video - the video player will need to be modified to append the signature to every request for a fragment. The token is valid for all files in the directory, therefore the same initial token can be reused. Keep in mind that if the length of the content is greater than the token validity, there will need to be additional logic to refresh the token "behind the scenes" so that there is no interruption in playback. 


# Sources

- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#choosing-key-groups-or-AWS-accounts
