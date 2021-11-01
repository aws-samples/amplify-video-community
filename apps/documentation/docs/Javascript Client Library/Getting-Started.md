---
sidebar_label: Getting Started
sidebar_position: 1
---

# amplify-video.js

[amplify-video](https://github.com/trackit/amplify-video.js) client library that is purpose built for Amplify Video managed resources. It's a superset of the existing amplify.js libraries for video asset.

## Installation

TODO: Remove when first release

```sh
$ npm install --save amplify-video.js
```

### Configuration and registration

```javascript
import Amplify from 'aws-amplify';
import Video from 'amplify-video.js/dist';
import awsconfig from './aws-exports';
import awsvideoconfig from 'aws-video-exports';

Amplify.configure(awsconfig);
Amplify.register(Video);
```