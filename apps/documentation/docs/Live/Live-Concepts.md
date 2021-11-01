---
sidebar_label: Live Concepts
sidebar_position: 2
---

### Live Resource

The Live Streaming resource will provide different origin architectures based on the configuration selected through the prompts. This is because there is a trade-off to be made with respect to latency and features. Essentially, if you need the lowest possible latency, MediaStore is a better choice. If you need advanced packaging features like filtering, multi-drm, and live-to-vod recordings, MediaPackage is necessary. This flexibility allows Amplify Video to compose the appropriate solution without too much input from the user.

![Amplify Live Diagram](https://www.amplify-video.com/docs/AmplifyVideoLivestreamDiagram.png)

Live Encoder -> MediaLive -> MediaStore and/or MediaPackage <-> CloudFront <-> Application

### Live Stream Security

Ingest into the Live Stream Resource is provided by a MediaLive Input Stream Key that is provided by Amplify-CLI when a new Video Resource is pushed or when you run 'amplify video get-info'. This key is used in the upstream encoder configuration, typically at the site of the live event. We automatically configure OBS with this key when you use 'amplify video setup-obs'

Currently there is no implementation of authentication or authorization to live streams managed by Amplify Video. You can use the Amplify Auth component for user authentication in conjunction with Cloudfront Signed Cookies for temporary endpoint access.   