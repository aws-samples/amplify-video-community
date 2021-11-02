---
sidebar_label: Uploading Assets
sidebar_position: 3
---

To upload content into your S3 input bucket and keep track of assets with the Amplify Video provided CMS, you'll need to accomplish the following steps within your application.

1. Configure the Storage Amplify JS library. Amplify Video maintains a `awsvideoconfig` file that can be imported into your app to provide the resource specific information. More info on that [here](Application-Config.md). 
1. Create a videoObject that contains a unique identifier for the video asset. UUIDv4 or equivalent.
1. Call the graphQL API using Amplify JS API class and the codegened createVideoObject method
1. Call the [Storage.put method](https://docs.amplify.aws/lib/storage/upload/q/platform/js) to upload files via your application.

When the object is uploaded, an S3 bucket event will create the MediaConvert job for processing.

```javascript
// Configure Storage to use input bucket
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

```javascript
// Create UUID 
const uuid = uuidv4();
const videoObject = {
  input: {
    id: uuid,
  },
};

// Call API and Upload Video
API.graphql(graphqlOperation(createVideoObject, videoObject)).then((response, error) => {
  if (error === undefined) {
    const {
      titleVal, descVal, file, fileName,
    } = this.state;
    const fileExtension = fileName.toLowerCase().split('.');
    const videoAsset = {
      input: {
        title: titleVal,
        description: descVal,
        vodAssetVideoId: uuid,
      },
    };
    API.graphql(graphqlOperation(createVodAsset, videoAsset));
    Storage.put(`${uuid}.${fileExtension[fileExtension.length - 1]}`, file, {
      progressCallback(progress) {
        const { loaded, total } = progress;
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
      contentType: 'video/*',
    })
      .then(() => console.log(`Successfully Uploaded: ${uuid}`))
      .catch((err) => console.log(`Error: ${err}`));
  }
});

```