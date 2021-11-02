const queries = {
    CreateMedia: /* GraphQL */ `
        mutation CreateMedia(
            $input: CreateMediaInput!
            $condition: ModelMediaConditionInput
        ) {
            createMedia(input: $input, condition: $condition) {
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
                sections {
                    items {
                        id
                        sectionID
                        mediaID
                        createdAt
                        updatedAt
                    }
                    nextToken
                }
            }
        }
    `,
    ListMediasSections: /* GraphQL */ `
        query ListMediasSections(
            $filter: ModelMediasSectionsFilterInput
            $limit: Int
            $nextToken: String
        ) {
            listMediasSections(
                filter: $filter
                limit: $limit
                nextToken: $nextToken
            ) {
                items {
                    id
                    sectionID
                    mediaID
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
                    }
                    section {
                        id
                        label
                        description
                        createdAt
                        updatedAt
                    }
                }
                nextToken
            }
        }
    `,
    GetMedia: /* GraphQL */ `
        query GetMedia($id: ID!) {
            getMedia(id: $id) {
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
                sections {
                    items {
                        id
                        sectionID
                        mediaID
                        createdAt
                        updatedAt
                    }
                    nextToken
                }
            }
        }
    `,
    CreateMediasSections: /* GraphQL */ `
        mutation CreateMediasSections(
            $input: CreateMediasSectionsInput!
            $condition: ModelMediasSectionsConditionInput
        ) {
            createMediasSections(input: $input, condition: $condition) {
                id
            }
        }
    `,
    DeleteMedia: /* GraphQL */ `
        mutation DeleteMedia(
            $input: DeleteMediaInput!
            $condition: ModelMediaConditionInput
        ) {
            deleteMedia(input: $input, condition: $condition) {
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
                sections {
                    items {
                        id
                        sectionID
                        mediaID
                        createdAt
                        updatedAt
                    }
                    nextToken
                }
            }
        }
    `,
    DeleteMediasSections: /* GraphQL */ `
        mutation DeleteMediasSections(
            $input: DeleteMediasSectionsInput!
            $condition: ModelMediasSectionsConditionInput
        ) {
            deleteMediasSections(input: $input, condition: $condition) {
                id
                sectionID
                mediaID
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
                    sections {
                        nextToken
                    }
                }
                section {
                    id
                    label
                    description
                    createdAt
                    updatedAt
                    medias {
                        nextToken
                    }
                }
            }
        }
    `,
    UpdateMedia: /* GraphQL */ `
        mutation UpdateMedia(
            $input: UpdateMediaInput!
            $condition: ModelMediaConditionInput
        ) {
            updateMedia(input: $input, condition: $condition) {
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
                sections {
                    items {
                        id
                        sectionID
                        mediaID
                        createdAt
                        updatedAt
                    }
                    nextToken
                }
            }
        }
    `,
    DeleteSection: /* GraphQL */ `
        mutation DeleteSection(
            $input: DeleteSectionInput!
            $condition: ModelSectionConditionInput
        ) {
            deleteSection(input: $input, condition: $condition) {
                id
                label
                description
                createdAt
                updatedAt
                medias {
                    items {
                        id
                        sectionID
                        mediaID
                        createdAt
                        updatedAt
                    }
                    nextToken
                }
            }
        }
    `,
    ListSections: /* GraphQL */ `
        query ListSections(
            $filter: ModelSectionFilterInput
            $limit: Int
            $nextToken: String
        ) {
            listSections(
                filter: $filter
                limit: $limit
                nextToken: $nextToken
            ) {
                items {
                    id
                    label
                    description
                    createdAt
                    updatedAt
                    medias {
                        nextToken
                    }
                }
                nextToken
            }
        }
    `,
    ListMedias: /* GraphQL */ `
        query ListMedias(
            $filter: ModelMediaFilterInput
            $limit: Int
            $nextToken: String
        ) {
            listMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
                items {
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
                nextToken
            }
        }
    `,
}

module.exports = queries
