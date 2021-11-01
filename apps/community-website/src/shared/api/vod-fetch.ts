import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { getVideoOnDemand } from '../../graphql/queries'
import * as APIt from '../../API'
import { getAuthMode } from './helper'

export const listVideoOnDemands = /* GraphQL */ `
    query ListVideoOnDemands(
        $filter: ModelVideoOnDemandFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listVideoOnDemands(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                src
                createdAt
                updatedAt
                media {
                    id
                    title
                    description
                    highlighted
                    source
                    thumbnail {
                        id
                        ext
                        src
                    }
                    sections {
                        items {
                            id
                            section {
                                id
                                label
                            }
                        }
                    }
                    createdAt
                    updatedAt
                }
            }
            nextToken
        }
    }
`

async function fetchVodFiles(nextToken: string | null) {
    if (nextToken !== null && nextToken !== '')
        return API.graphql({
            query: listVideoOnDemands,
            variables: {
                nextToken,
            },
            authMode: await getAuthMode(),
        }) as GraphQLResult<APIt.ListVideoOnDemandsQuery>
    else
        return API.graphql({
            query: listVideoOnDemands,
            authMode: await getAuthMode(),
        }) as GraphQLResult<APIt.ListVideoOnDemandsQuery>
}

async function fetchHighlightedVideos() {
    return API.graphql({
        query: listVideoOnDemands,
        variables: {
            filter: {
                highlighted: {
                    eq: true,
                },
            },
        },
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.GetVideoOnDemandQuery>
}

async function fetchVodAsset(id: string) {
    return API.graphql({
        query: getVideoOnDemand,
        variables: {
            id,
        },
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.GetVideoOnDemandQuery>
}

export const listVodSections = /* GraphQL */ `
    query GetVideoOnDemand($id: ID!) {
        getVideoOnDemand(id: $id) {
            id
            media {
                id
                title
                description
                highlighted
                source
                createdAt
                updatedAt
                thumbnail {
                    id
                    ext
                    createdAt
                    updatedAt
                }
                sections {
                    items {
                        id
                        section {
                            id
                            label
                            createdAt
                            updatedAt
                        }
                        createdAt
                        updatedAt
                    }
                    nextToken
                }
            }
            createdAt
            updatedAt
        }
    }
`

export type ListVodSections = {
    getVideoOnDemand: {
        id: string
        media: {
            title: string
            description: string
            highlighted: boolean
            sections: {
                items: Array<{
                    id: string
                    section: {
                        id: string
                        label: string
                        createdAt: string
                        updatedAt: string
                    }
                    createdAt: string
                    updatedAt: string
                }>
                nextToken: string
            }
        }
        createdAt: string
        updatedAt: string
    }
}

async function fetchVodSections(id: string) {
    return API.graphql({
        query: listVodSections,
        variables: {
            id: id,
        },
        authMode: await getAuthMode(),
    }) as GraphQLResult<ListVodSections>
}

export {
    fetchVodFiles,
    fetchHighlightedVideos,
    fetchVodAsset,
    fetchVodSections,
}
