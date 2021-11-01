---
title: About Amplify Video
---

![icon](./aws-amplify-banner.png)

Amplify Video is an open source category for the [AWS Amplify Framework](https://docs.amplify.aws/) that simplifies the development of serverless video-enabled web applications. With [Amplify Video], application developers or I.T. administrators can build live streaming or video-on-demand integrated web applications in minutes.

Amplify Video allows anyone to compose, deploy, and maintain a live or file-based video streaming application through the Amplify Framework. It includes the following features:

## File-Based Streaming (VOD)

* File-Based Streaming with Media Services, S3, & Cloudfront
* Tokenization/AuthZ Playback
* Video Management System 
* Bring-your-own processing config
* SNS Notifications for Job Status
* Player Code Generation

## Live Streaming

* Live Streaming with AWS Elemental Media Services & Cloudfront
* Live Streaming with Amazon IVS
* Open Broadcaster System (OBS) Auto-Configuration
* Player Code Generation


## F.A.Q.


*Q: What are the goals of Amplify Video?*
A: To...

* Reduce the domain specific knowledge required to deliver highly available, high quality video over the web while increasing speed to market for streaming video applications
* Provide video-specific solutions not directly addressed through console-services, but composable through a combination of AWS services. For example - Video Analytics, Content Management, Content Protection, and client-side interactivity.
* Reduce the complexity required to integrate video into applications without obscuring the implementation details for power users
* Make Video a primitive in modern web application development through the AWS Amplify ecosystem


*Q: How can I get started?*
A: Getting started is easy. You can follow [this walkthrough guide](https://aws.amazon.com/blogs/media/introducing_aws_amplify_video/) on configuring you environment and creating your first project.

*Q: How much does it cost to use Amplify Video?*
A: There are no costs associated directly with using Amplify Video, however, there are pay-as-you-go charges for the cloud-based resources Amplify Video deploys to provide video streaming capabilities. 

*Q: Is Amplify Video supported by AWS Amplify?*
A: No, this is a 3rd party category to the AWS Amplify ecosystem maintained by AWS employees and the open source community.

*Q: How does Amplify Video differ from the AWS Solutions for Live Streaming and Video-on-Demand?*
A: Amplify Video resources are created and managed within your Amplify project enabling you to manage your backend and frontend within a single developer framework. Though developers can easily extend the Video category if necessary, it alleviates the need to dive deep into each service used to host video on AWS. Finally, Amplify Video is an active open source project participating in and taking contributions from the Amplify community. We work with infrastructure architects and developers from the community to codify best practices into the Amplify framework.

*Q: What’s the difference between Amplify Video and the AWS Media Services?*
A:  Amplify Video deploys AWS Media Services and other AWS services to provide a Video resource for live streaming or Video-on-Demand streaming.

*Q: Can Amplify Video be used outside of the AWS Amplify ecosystem?*
A: Yes and no. To get started and to generate the project templates you must have the Amplify CLI installed and configure a new Amplify project. After you configure the project you can then run amplify video add. This will create a video resource backed by CloudFormation that you can take outside the AWS Amplify ecosystem.

*Q: What kind of applications can you build with the features launched today?*
A: Live streaming and video-on-demand streaming applications can be launched in minutes with Amplify Video. There are open source workshops, UnicornTrivia and UnicornFlix, that demonstrate how to users can build a live streaming trivia application and subscription video-on-demand service using AWS Amplify and Amplify Video.

*Q: Who uses Amplify Video today?*
A: Amplify is targeted at mobile and web application developers. Amplify Video simplifies the deployment, management, and time-to-market for video streaming. Orangetheory Fitness uses Amplify Video for their OrangetheoryAtHome™ service.

*Q: How can I extend Amplify Video?*
A: Amplify video can be extended in a number of ways. Developers can customize their Amplify Video deployment by editing the provided CloudFormation template to fit the specifications of their use case. Additionally, developers have the flexibility to build new workflows that work in tandem with the resources deployed by Amplify Video.

*Q: How can I contribute to Amplify Video?*
A: The Amplify Video source code is available publicly on [Github](https://github.com/awslabs/amplify-video). Members of the open source developer community are encouraged to submit pull requests, cut issues, as well as document feature requests as a means of contributing to Amplify 
Video.

*Q: How long would it take an application developer to create something like Amplify video?*
A: To build an application from scratch with video streaming, authentication, content management, and analytics would easily take weeks to months without the Amplify framework and Amplify Video


