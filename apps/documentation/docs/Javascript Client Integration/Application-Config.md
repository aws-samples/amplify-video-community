---
sidebar_label: Video Exports
sidebar_position: 5
---

To access Amplify Video created resources within your application, we generate a file that stores environment information that can be easily imported and used. The extension depends on your Amplify project configuration.

**javascript**: aws-video-exports.js

**iOS, Android, or anything else**: aws-video-exports.json

This contents of this file depends on the type of Video resource that you've configured, it's always exported as an object called awsvideoconfig. For Example

```javacript
const awsvideoconfig = {
    "awsInputVideo": "unicornflix-dev-foo",
    "awsOutputVideo": "unicornflix-dev-foo"
};

export default awsvideoconfig;
```

## Live Streaming
* awsOutputLiveHLS: MediaPackage HLS URL
* awsOutputLiveDash: MediaPackageDASH URL
* awsOutputLiveMss: MediaPackage Smooth URL
* awsOutputLiveCmaf: MediaPackage CMAF URL
* awsOutputLiveLL: MediaStore HLS URL

## Video-on-Demand:
* awsInputVideo: S3 bucket for content uploads
* awsOutputVideo: S3 bucket for content hosting


