import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import * as APIt from '../../API'
import { getAuthMode } from './helper'
import { listLivestreams, getLivestream } from '../../graphql/queries'

export const listLivestreamsWithThumbnails = /* GraphQL */ `
    query listLivestreamsWithThumbnails(
        $filter: ModelLivestreamFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listLivestreams(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                url
                isLive
                createdAt
                updatedAt
                media {
                    id
                    title
                    description
                    highlighted
                    source
                    author
                    viewCount
                    createdAt
                    updatedAt
                    thumbnail {
                        id
                        ext
                        src
                        createdAt
                        updatedAt
                    }
                }
            }
            nextToken
        }
    }
`

async function fetchLivestreams() {
    return API.graphql({
        query: listLivestreams,
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.ListLivestreamsQuery>
}

export type ListLivestreamsWithThumbnailQuery = {
    listLivestreams?: {
        __typename: 'ModelLivestreamConnection'
        items?: Array<{
            __typename: 'Livestream'
            id: string
            url?: string | null
            isLive?: boolean | null
            createdAt: string
            updatedAt: string
            media?: {
                __typename: 'Media'
                id: string
                title: string
                description: string
                highlighted: boolean
                source?: APIt.Source | null
                author: string
                viewCount?: number | null
                createdAt: string
                updatedAt: string
                thumbnail?: {
                    __typename: 'Thumbnail'
                    id: string
                    ext: string
                    src?: string | null
                    createdAt: string
                    updatedAt: string
                } | null
            } | null
        } | null> | null
        nextToken?: string | null
    } | null
}

async function fetchLivestreamsWithThumbnail() {
    return API.graphql({
        query: listLivestreamsWithThumbnails,
        authMode: await getAuthMode(),
    }) as GraphQLResult<ListLivestreamsWithThumbnailQuery>
}

async function fetchLivestream(id: string) {
    return API.graphql({
        query: getLivestream,
        authMode: await getAuthMode(),
        variables: { id },
    }) as GraphQLResult<APIt.GetLivestreamQuery>
}

export { fetchLivestreams, fetchLivestream, fetchLivestreamsWithThumbnail }
