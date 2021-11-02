---
sidebar_position: 4
---

### Adding CloudWatch events to Mediaconvert
1. [Install and Configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
1. Open a terminal window and run the following command to get your account specific mediaconvert endpoint.
    * `aws mediaconvert describe-endpoints`
1. Next, you need to get your account sp
    * `aws mediaconvert get-queue --name Default --endpoint-url YOUR-ENDPOINT-URL-HERE`
1. Go to the IAM console and make a service role for cloudwatch.
1. Once created, click on the role in the name to enter the "Role Summary Page". From here click the blue **Attach Policies** button and attach the policy named "AWSElementalMediaConvertReadOnly".
1. Now that your role has been created and configured, create the CloudWatch Event rule by running the following command.
    * `aws events put-rule --name "TranscodeJobStateChanges" --event-pattern "{ \"source\": [ \"aws.mediaconvert\" ], \"detail-type\": [ \"MediaConvert Job State Change\" ], \"detail\": { \"queue\": [ \"YOUR_QUEUE_ARN\" ], \"status\": [ \"COMPLETE\", \"ERROR\" ] } }" --role-arn "CLOUDWATCH_EVENT_ROLE_ARN"`
### Notifications
1. If you want to recieve notifications from your Cloudwatch Event. Create an SNS topic in the SNS Console, then run the following command.
    * `aws events put-targets --rule TranscodeJobStateChanges --targets "Id"="1","Arn"="SNS_TOPIC_ARN"`



