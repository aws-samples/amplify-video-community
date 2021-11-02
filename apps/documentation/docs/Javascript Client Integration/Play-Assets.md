---
sidebar_label: Playing Videos
sidebar_position: 1
---

To quickly test video playback you can use our [video test player](https://www.amplify-video.com/player). Provide the address to the .m3u8 manifest file stored in your S3 output bucket managed by Amplify Video.

To incorporate playback into your own application, we recommend using an open source player framework like video.js. You can follow their [ReactJS example](https://docs.videojs.com/tutorial-react.html)

## VOD Content Access Restrictions

If you add a Content Management API and CloudFront Distribution to your VOD Resource through Amplify Video, we implement an authorization scheme. Amplify Video creates an Auth and API resource in addition to the Video resource to authenticate users and authorize access to specific API endpoints that vend CloudFront Signed URLs and metadata.

To sign the URLs, Amplify Video requires the CloudFront Key Pair generated and stored on your local development machine where Amplify-CLI can access it during the creation of the Video Resource. This key is securely stored in AWS Secrets Manager after you push the Video resource and is then used by a Lambda Function to sign content URLs.

1. User Logs in via Cognito and Auth Component
2. Application presents VOD assets for playback by creating an access URL from aws-video-exports.js (.json)

https:// awsOutputVideo + /assetID/ + assetID + extension + token

`https://d2jyprsbv583cq.cloudfront.net/085feb2c-6e9f-5fb1-9c20-ead8479b4d5f/085feb2c-6e9f-5fb1-9c20-ead8479b4d5f.m3u8?Policy=foo&Key-Pair-Id=bar&Signature=foobar`

If you're using the signed URLs feature of Amplify Video, every file being retrieved needs to use a token (URL parameters). For HLS, this means that every manifest and chunk request requires us to append that token to the end of it. For VideoJS we take advantage of the `beforeRequest` functionality to add in the token. For an implementation example see this gist. [Example code from UnicornFlix](https://gist.github.com/wizage/1523dd1f6928e0d852042e6adbaf54cd)

