---
sidebar_position: 2
sidebar_label: CLI Reference
title: CLI Reference
---

## Usage

To use this plugin you just need to configure a project using `amplify init`.

Note: If you aren't developing a mobile or web app then it doesn't matter what language you choose.

### amplify video add

Command to configure the parameters for setting up a Video resource. The resource can be either for Live Streaming or Video-on-Demand. 

Run `amplify video push` or `amplify push` to create the resources in the cloud.

### amplify video update

Command to update your parameters for your video setup.

### amplify video start

Command to start your video stream. This only works with Live Streaming resources.

### amplify video stop

Command to stop your video stream. This only works with Live Streaming resources.

### amplify video build

Command to rebuild the entire CloudFormation stack in the Build/ folder. Do this if zipping fails.

### amplify video push

Command to push a specific video project.

### amplify video get-info

Command to return the CloudFormation outputs and to regenerate `aws-video-exports` file.

### amplify video setup-obs

Create and import a pre-configured profile into [OBS](https://obsproject.com/) for Live Streaming into your Video resource. This only works with Live Streaming resources. If this command fails it will place the OBS folder inside your project which you can use the OBS import functionality.

### amplify video setup-video-player

Create and import a pre-configured video player inside your project source directory.
It supports React, Vue, Ionic, Angular, Ember.
For more information about video player code generation, [click here](https://github.com/awslabs/amplify-video/wiki/Video-Player).

### amplify video remove

Command to remove a project that you have made. 

To remove from the cloud you must run `amplify video push` or `amplify push`