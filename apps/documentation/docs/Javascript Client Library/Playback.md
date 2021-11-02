---
sidebar_position: 4
---

# Playback URL generation

```ts
import Video from 'amplify-video.js';
import awsVideoConfig from './aws-video-exports';

const vodAssetId = 'rand-uuid-4242-4242-4242';
const params = {
  awsOutputVideo: awsVideoConfig.awsOutputVideo,
};

const { data } = await Video.playback(vodAssetId, params);
```