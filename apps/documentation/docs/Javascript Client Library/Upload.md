---
sidebar_position: 2
---

# Video Upload

```ts
import Video from 'amplify-video.js';
import awsvideoconfig from 'aws-video-exports';

const params = {
  bucket: awsvideoconfig.awsInputVideo,
};
const metadata = {
  title: 'amplify-video.js rocks!',
  description: 'Awesome description',
};

const { data } = await Video.upload(file, metadata, params);
```