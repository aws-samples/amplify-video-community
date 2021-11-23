export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "ampvideocommuwebaa182671": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "AdminGroupRole": "string"
        }
    },
    "api": {
        "ampVideoCommuWebAPI": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "ampVideoCommuWebAssets": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "resourcesManager": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}