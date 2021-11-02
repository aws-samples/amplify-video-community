### Q: My deploy failed with :
<details>
<summary>Answer</summary>

* Using Amplify Admin UI - This will fail due to not having correct permissions. The ticket for tracking this is: [#239](https://github.com/awslabs/amplify-video/issues/239). Follow the steps below for Permission Denied
* Permission Denied - Update your IAM permissions for the role that is in the error message. The permissions needed are either Admin or found on the Permissions wiki page
* Failed due to template not found - Run `amplify video build` and then run `amplify push` again
* If you your error falls into none of these or these don't fix your issue. Please create a ticket!

</details>

### Q: Why do my resources fail to deploy?
<details>
<summary>Answer</summary>

* Check to make sure your account has proper permissions to deploy these CloudFormation templates. See [this](https://github.com/awslabs/amplify-video/wiki/IAM-Permissions) example IAM role to make sure you have proper permissions.
* Make sure your account is in good standing. MediaLive and MediaPackage can't be spun up in new accounts and accounts that are not in good standing with AWS. This error will show up in the CloudFormation as you don't have the proper limits for this account.
* Run `amplify video build` to try to re-build your resources and then run `amplify push` again.
* If all these dont fix it, cut an ticket to the repo with your amplify video version `amplify video -v`, any relevant CloudFormation logs and CloudWatch logs (if the resource deployed is MediaLive, MediaPackage, MediaStore).

</details>


### Q: My signed URLs aren't working. I keep seeing Access Denied.
<details>
<summary>Answer</summary>

First double check that your signed URL path is correct. You can easily do this by finding the output bucket in the S3 Console trying to find `/{item.video.id}/{item.video.id}.m3u8`. Note down the entire key (including anything before `/{item.video.id}` if any exists. Next take your token that was generated and find the Policy parameter, this is just a base64 encoded string so you can easily decode it using many different online tools like this [one](https://www.base64decode.org/). Compare the path with the one you noted before and ensure that both start with the exact same key.


1) If the path is doesn't match (i.e. the assets live in `public/{item.video.id}/{item.video.id}`) then we just to need to change how the assets are being upload to S3 or update the token Lambda to generate the right path.


   1) Setting Amplify Storage component to upload to the right path. Change your Storage config to contain a new parameter called [customPrefix](https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js#customize-object-key-path) and make it blank like this:
        ```js
        Storage.configure({
          AWSS3: {
            bucket: awsvideoconfig.awsInputVideo,
            region,
            customPrefix: {
              public: '',
            }
          },
        });
        ```
   1) Updating the token lambda to sign the right URL is easy and can enable you to add extra thing to the policy as well ([docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html#private-content-custom-policy-statement)) 
      1) Go your local project files and locate your `Amplify` folder. 
      1) Navigate to your video project inside the backend folder, it should be something like this: `Amplify/backend/video/{project_name}/`.
      1) Create a new folder at this root called `custom`, and then inside of that create a new folder called `vod-helpers` and then create a new folder inside of that one called `LambdaFunctions`. You should have a new path now that looks like: `Amplify/backend/video/{project_name}/custom/vod-helpers/LambdaFunctions/`. We can now copy from the build folder the Lambda function over to overwrite the build folder.
      1) Now copy the entire directory from `Amplify/backend/video/{project_name}/build/vod-helpers/LambdaFunctions/CloudFrontTokenGen` to `Amplify/backend/video/{project_name}/custom/vod-helpers/LambdaFunctions/CloudFrontTokenGen`
      1) Now that you have copied the folder over the custom directory you can now open up `Amplify/backend/video/{project_name}/custom/vod-helpers/LambdaFunctions/CloudFrontTokenGen/index.js` in your favorite code editor.
      1) Find the line that contains ```const videoPath = `${id}/*`;``` and modify it to whatever the path you found above. I.E. if you had public in your path you can just add it like so: ```const videoPath = `public/${id}/*`;```

1) If you path matches correctly and you are still seeing errors, check your EPOCH time sent with the policy and verify the token you are using isn't expired.
1) If none of these work/help cut and issue and we can help out.

</details>

### Q: I am seeing CORS issues when using CloudFront, or S3
<details>
<summary>Answer</summary>

1) Check to make sure that your object exists in the location you are trying to retrieve it from. Cloudfront & S3 both map back to the same key path in the output bucket. So double check that your object exists **EXACTLY** where you are trying to pull it from.

1) If you are using Signed URLS, check that signed URLS are working properly, drop the link to your asset in your browser and verify you can download/view the file. If it shows access denied jump to the question about how to solve that.

1) If both of these don't fix your issue cut a ticket.

</details>

### Q: My player isn't working with Signed URLS.
<details>
<summary>Answer</summary>

1) We are requiring that every file being retrieved needs to use a token (URL parameters). For HLS, this means that every manifest and chunk request requires us to append that token to the end of it. For VideoJS we take advantage of the `beforeRequest` functionality to add in the token. For an implementation example see this gist. [Example code](https://gist.github.com/wizage/1523dd1f6928e0d852042e6adbaf54cd)

</details>