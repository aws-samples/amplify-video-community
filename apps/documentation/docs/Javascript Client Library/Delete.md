---
sidebar_position: 5
---

# Delete

```ts
import Video from 'amplify-video.js';
import awsVideoConfig from './aws-video-exports';

const params = {
  bucket: awsvideoconfig.awsInputVideo,
};
const vodAssetId = 'rand-uuid-4242-4242-4242';

const { data } = await Video.delete(vodAssetId, params);
```