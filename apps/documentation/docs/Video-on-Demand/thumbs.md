---
sidebar_label: Thumbnails
sidebar_position: 3
---

### Adding Thumbnails to the Job Template

**If this is your first time using Amplify Video**

Proceed with the following steps to launch your first Amplify Video resource. 

1. `mkdir thumbtest`
1. `cd thumbtest`
1. `amplify init`
1. `amplify video add` -- remember to select the video on demand option
    * When configuring the video resource, note down the name of the job template you select.

1. `amplify push` 

**If you have an existing video resource**
Figure out which job template your resource is using. If you don't remember you can go to the inputWatcher lambda function. Scroll down to the environment variables section and take a look at ARN_TEMPLATE. The value will be the name of the template that this resource is configured to use.
__________

Now that you have either set up a resource or had one previously deployed, now we have to add an output for Frame Capture to JPEG.

Open the browser and hop into the aws console and navigate to the Elemental MediaConvert Service. On the left hand side select **Job Templates**.

Then find the job template which your resource was configured with. Most likely something similar to `Amplify_Video_Ott_Ts_Hls_Ts_Avc_aac`.

Click on the name of the Amplify template to open the Job Details page.

Then at the very top of the screen you will see an **Update** button. Select it to begin altering the template.

Next we  need to customize the template to create thumbnails from frame capture. You can follow the process from this [blog post](https://aws.amazon.com/blogs/media/create-a-poster-frame-and-thumbnail-images-for-videos-using-aws-elemental-mediaconvert/) or continue onwards.

Click **Add** button under **Output groups** in the left menu bar, select **File group** option and click the **Select** button. Configure your **Custom group name**, **Destination**, **Name modifier**, and **Extension** for **Outputs**.

For **Destination** supply the name of the S3 output bucket that Amplify Video created. You can do something like `s3://myoutputbucket/thumbnails/`.

Next click **Output 1**, which leads you to Output settings as shown below.

To create frame capture, select No Container in Container dropdown box, and select Frame Capture to JPEG in Video codec dropdown box. The most important parameters are entered in the Framerate text field.

Here you’ll need to do some quick math to calculate what to use in the second Framerate field. The first text field in Framerate is still your video’s framerate – which is 30 in my example.

To calculate the second number, start with the duration. The video clip used in my example is a 5-minute video clip, which is a duration of 300 seconds (5 mins * 60 seconds). Next calculate the total frames in the video by multiplying this duration (in seconds) by the framerate (300 seconds * 30 FPS). This gives us 9,000 total frames. For thumbnail images distributed evenly throughout the video, use the total number of frames divided by the number of thumbnails required (we’ll use 10 in my example), so this calculation (9,000 / 10) gives us the value 900. So we can now enter 900 into the second text field in **Framerate** as shown below.
![architecture](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2018/10/05/MC03.png)

**Tip:** This configuration can be read as “capture a frame to a JPEG file every 900 frames, with video framerate of 30 FPS, for a maximum of 10 captured images”.

When the job finishes, here are all the frame captures in your S3 bucket:

![ar](https://d2908q01vomqb2.cloudfront.net/fb644351560d8296fe6da332236b1f8d61b2828a/2018/10/05/MC04-1.png)
### Want to add your own templates to Amplify Video?

If you are on a Unix machine and you installed amplify video with NPM using the -g global flag, you can place you own custom templates here: `
/usr/local/lib/node_modules/amplify-category-video/provider-utils/awscloudformation/templates/my_custom_template.json
`

Windows XP - `%USERPROFILE%\AppData\npm\node_modules\amplify-category-video\provider-utils\awscloudformation\templates\my_custom_template.json`
Windows 7, 8 and 10 - `%USERPROFILE%\AppData\Roaming\npm\node_modules\amplify-category-video\provider-utils\awscloudformation\templates\my_custom_template.json`
