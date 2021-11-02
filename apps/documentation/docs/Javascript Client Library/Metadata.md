---
sidebar_position: 3
---

# Metadata

## Metadata fetch
```ts
import Video from 'amplify-video.js';
import awsVideoConfig from './aws-video-exports';

const vodAssetId = 'rand-uuid-4242-4242-4242';

const { data } = await Video.metadata(vodAssetId);
```

## Metadata update

```ts
import Video from 'amplify-video.js';
import awsVideoConfig from './aws-video-exports';

const vodAssetId = 'rand-uuid-4242-4242-4242';
const metadata = {
  title: 'This is a new title',
  description: 'And a new awesome description',
};
```