---
sidebar_label: Video Player
sidebar_position: 2
---

## Video player code generation

Amplify video provides a command `amplify video setup-video-player` that will create and import a pre-configured video player inside your project source directory.
It supports React, Vue, Ionic, Angular & Ember. 

`setup-video-player` command will configure the end component depending of your project settings. It is based on `video.js` video player, amplify video will detect if `video.js` dependency is installed or not and will do the necessary if needed. 
Once the command ran successfully, the CLI will display you the component declaration to import inside your project.

### Video demo
Here we have a React application, we have used the `setup-video-player` command to configure a video player for our IVS project.

OBS has been configured previously for the purpose of the demo with the `setup-obs` command.

![](https://github.com/awslabs/amplify-video/wiki/images/video-player-demo.gif)