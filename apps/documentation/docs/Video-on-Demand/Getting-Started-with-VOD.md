---
sidebar_label: Getting Started with VOD
sidebar_position: 1
---

If you're new to application development with AWS Amplify, we recommend starting by following the Amplify Getting Started guide for [Javascript](https://docs.amplify.aws/start/q/integration/js)

## Add a Video-on-Demand resource

To add a VOD Video Resource to your application, run `amplify add video` command and follow the prompts.


```
amplify add video
? Please select from one of the below mentioned services: Video-On-Demand
? Provide a friendly name for your resource to be used as a label for this category in the project: foovod
```

When prompted to specify an encoding template, you can use our default template or provide your own template by specifying a name to a template in the console

```
? Select a system-provided encoding template, specify an already-created template name:  Default HLS Adaptive Bitrate
```

The production environment prompt determines if your resource will deploy a CDN and to use signed-urls to tokenize content access.

```
? Is this a production enviroment? No
```

The next set of prompts will configure a GraphQL API for hosting content endpoints. If you don't need a CMS, simply select 'no' to continue, otherwise read on. The CMS is not required for Amplify Video to process your content.


```
? Do you want Amplify to create a new GraphQL API to manage your videos? (Beta) Yes
```

The GraphQL API Content Mangement System (CMS) configures the Amplify API and Auth categories on your behalf. It's a little clunky due to how Amplify-CLI works, so please take care when selecting the following prompts. As the output states you MUST select GraphQL for the API type and you MUST select Amazon Cognito User Pool as the authorization type.

```
Video On Demand only supports GraphQL right now.
If you want to only use API for CMS then choose the default ToDo and don't edit it until later.
? Please select from one of the below mentioned services: GraphQL
? Provide API name: vidcms
? Choose the default authorization type for the API Amazon Cognito User Pool
Using service: Cognito, provided by: awscloudformation
 
 The current configured provider is Amazon Cognito. 
 
 Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections. 
 How do you want users to be able to sign in? Username
 Do you want to configure advanced settings? No, I am done.
Successfully added auth resource
```

Next, you'll create the API schema. You can start with your own schema or use one of the Amplify provided templates. Amplify Video will allow you to either append to your template or override. Finally, you can see the entire schema before committing. Please DO NOT EDIT the lines below the comment statements, as these are necessary for Amplify Video to function.

```
? Do you want to configure advanced settings for the GraphQL API? No, I am done.
? Do you have an annotated GraphQL schema? No
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)

The following types do not have '@auth' enabled. Consider using @auth with @model
         - Todo
Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/directives#auth


GraphQL schema compiled successfully.

Edit your schema at ...
? Do you want to edit the schema now? No
Successfully added resource vidcms locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

? Define your permission schema Admins can only upload videos
? Do you want to override your GraphQL schema? Yes
? Do you want to edit your newly created model? Yes
Please edit the file in your editor: ...
? Press enter to continue 
```

With the Video Resource configured in our project, simply push the project to deploy the AWS resources that back it.

```
amplify push
```




## Test Transcoding

Navigate to the S3 console. Amplify Video has deployed a few buckets into your environment. Select the `input` bucket and upload a `.mp4` file you have stored locally on your computer.

Once the file has been successfully uploaded, navigate the the Mediaconvert Console to see your transcode job kicked off. This job takes the input file, transcodes it into the Apple HTTP Live Streaming Protocol (HLS), and outputs the segment files to the S3 bucket labeled `output`.

## Testing Media Playback

After the MediaConvert job has reached a completed state, navigate back to the S3 Console and locate the `output` bucket. When you step into the bucket you will see a folder with the name of the file you uploaded. Step into the folder and you will see the output files created by MediaConvert. Locate the HLS Manifest, the file with the `.m3u8` extension, and copy it's S3 object url to your clipboard. 

To test playback, navigate to an HLS native browser such as Safari and paste the link into the browser. If you are not on a Mac workstation, you can download the [Native HLS Playback](https://chrome.google.com/webstore/detail/native-hls-playback/emnphkkblegpebimobpbekeedfgemhof?hl=en-US) extension for chrome.

## What Next?

Congratulations, you've built a resource that serves live video. Try creating your own application and adding other Amplify categories like Auth, API, or Analytics alongside your video stream or deploying your application to AWS for hosting using `amplify console`.

For a more detailed application development guide, check out our [UnicornFlix Workshop](https://github.com/awslabs/unicornflix) that will show you how to build a content management API on top your video transcoding workflow.

