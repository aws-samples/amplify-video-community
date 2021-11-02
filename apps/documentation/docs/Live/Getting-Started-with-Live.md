---
sidebar_label: Getting Started with Live
sidebar_position: 1
---

If you're new to application development with AWS Amplify, we recommend starting by following the Amplify Getting Started guide for [Javascript](https://docs.amplify.aws/start/q/integration/js)

## Add a video resource

To add a Live Video Resource to your application, run the command and Follow the prompts. Use the default values as they will be sufficient for most users.

```
amplify add video
```


With the Video Resource configured in our project, simply push the project to deploy the AWS resources that back it.

```
amplify push
```

## Stream

If you don't have a live encoder already, you'll need one that can produce an RTMP stream to AWS. [Open Broadcast Software (OBS)](https://obsproject.com/) is a popular open source live encoder that can be automatically configured through Amplify video. Download OBS, make sure it's closed, and run the following command to configure an OBS profile to push to your Video resource.

```
amplify video setup-obs
```

Open OBS and click `Profile` in the menu and then select the name of the Video resource that you configured. For example, `myvideoresource`


To stream video, you need to add a Source to OBS. At the bottom of the window is a box called 'Sources'. Click on the + (or right click inside the box) and pick the source you want. Select Video Capture Device for a webcam or capture card.

Click 'Start Streaming' to publish a live stream to the AWS infrastructure backing the Video resource.

Run your react application locally and you should see a live stream published to it

```
npm start
```

## Test Playback

For a quick test of your Video Resource, you can test playback of your live streaming using our hosted application. Use the Output Url for your resource. You can access this information by running `amplify video get-info` and selecting the name of your live stream.

```
MediaStore
MediaStore Output Url: https://your-livestream-url/p/index.m3u8
```
Open the [Amplify Video Test Player ](https://www.amplify-video.com/player) and copy/pasta it in. You should see your OBS streaming!



## What Next?

Congratulations, you've built a resource that serves live video. Try creating your own application and adding other Amplify categories like Auth, API, or Analytics alongside your video stream or deploying your application to AWS for hosting using `amplify console`.

For a more detailed application development guide, check out our [UnicornTrivia Workshop](https://github.com/awslabs/aws-amplify-unicorntrivia-workshop) that will show you how to build interactivity alongside your video streams.

