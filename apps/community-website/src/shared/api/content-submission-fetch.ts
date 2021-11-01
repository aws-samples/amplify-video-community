import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import * as APIt from '../../API'
import { listContentSubmissions } from '../../graphql/queries'
import { getAuthMode } from './helper'

async function fetchContentSubmissions() {
    return API.graphql({
        query: listContentSubmissions,
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.ListContentSubmissionsQuery>
}

export { fetchContentSubmissions }
