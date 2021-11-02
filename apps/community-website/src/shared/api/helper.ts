import { Auth } from 'aws-amplify'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'

async function getAuthMode() {
    await refreshUserCredentials()

    return Auth.Credentials.getCredSource() !== 'userPool'
        ? GRAPHQL_AUTH_MODE.AWS_IAM
        : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
}

async function refreshUserCredentials() {
    await Auth.Credentials.get()
}

export { getAuthMode }
