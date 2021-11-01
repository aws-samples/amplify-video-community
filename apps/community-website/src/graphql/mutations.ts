/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMedia = /* GraphQL */ `
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
`;
export const updateMedia = /* GraphQL */ `
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
`;
export const deleteMedia = /* GraphQL */ `
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
`;
export const createContentSubmission = /* GraphQL */ `
  mutation CreateContentSubmission(
    $input: CreateContentSubmissionInput!
    $condition: ModelContentSubmissionConditionInput
  ) {
    createContentSubmission(input: $input, condition: $condition) {
      id
      title
      description
      comment
      source
      src
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateContentSubmission = /* GraphQL */ `
  mutation UpdateContentSubmission(
    $input: UpdateContentSubmissionInput!
    $condition: ModelContentSubmissionConditionInput
  ) {
    updateContentSubmission(input: $input, condition: $condition) {
      id
      title
      description
      comment
      source
      src
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteContentSubmission = /* GraphQL */ `
  mutation DeleteContentSubmission(
    $input: DeleteContentSubmissionInput!
    $condition: ModelContentSubmissionConditionInput
  ) {
    deleteContentSubmission(input: $input, condition: $condition) {
      id
      title
      description
      comment
      source
      src
      email
      createdAt
      updatedAt
    }
  }
`;
export const createThumbnail = /* GraphQL */ `
  mutation CreateThumbnail(
    $input: CreateThumbnailInput!
    $condition: ModelThumbnailConditionInput
  ) {
    createThumbnail(input: $input, condition: $condition) {
      id
      ext
      src
      createdAt
      updatedAt
    }
  }
`;
export const updateThumbnail = /* GraphQL */ `
  mutation UpdateThumbnail(
    $input: UpdateThumbnailInput!
    $condition: ModelThumbnailConditionInput
  ) {
    updateThumbnail(input: $input, condition: $condition) {
      id
      ext
      src
      createdAt
      updatedAt
    }
  }
`;
export const deleteThumbnail = /* GraphQL */ `
  mutation DeleteThumbnail(
    $input: DeleteThumbnailInput!
    $condition: ModelThumbnailConditionInput
  ) {
    deleteThumbnail(input: $input, condition: $condition) {
      id
      ext
      src
      createdAt
      updatedAt
    }
  }
`;
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
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
`;
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
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
`;
export const deleteSection = /* GraphQL */ `
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
`;
export const createMediasSections = /* GraphQL */ `
  mutation CreateMediasSections(
    $input: CreateMediasSectionsInput!
    $condition: ModelMediasSectionsConditionInput
  ) {
    createMediasSections(input: $input, condition: $condition) {
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
`;
export const updateMediasSections = /* GraphQL */ `
  mutation UpdateMediasSections(
    $input: UpdateMediasSectionsInput!
    $condition: ModelMediasSectionsConditionInput
  ) {
    updateMediasSections(input: $input, condition: $condition) {
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
`;
export const deleteMediasSections = /* GraphQL */ `
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
`;
export const createVideoOnDemand = /* GraphQL */ `
  mutation CreateVideoOnDemand(
    $input: CreateVideoOnDemandInput!
    $condition: ModelVideoOnDemandConditionInput
  ) {
    createVideoOnDemand(input: $input, condition: $condition) {
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
    }
  }
`;
export const updateVideoOnDemand = /* GraphQL */ `
  mutation UpdateVideoOnDemand(
    $input: UpdateVideoOnDemandInput!
    $condition: ModelVideoOnDemandConditionInput
  ) {
    updateVideoOnDemand(input: $input, condition: $condition) {
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
    }
  }
`;
export const deleteVideoOnDemand = /* GraphQL */ `
  mutation DeleteVideoOnDemand(
    $input: DeleteVideoOnDemandInput!
    $condition: ModelVideoOnDemandConditionInput
  ) {
    deleteVideoOnDemand(input: $input, condition: $condition) {
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
    }
  }
`;
export const createLivestream = /* GraphQL */ `
  mutation CreateLivestream(
    $input: CreateLivestreamInput!
    $condition: ModelLivestreamConditionInput
  ) {
    createLivestream(input: $input, condition: $condition) {
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
        sections {
          nextToken
        }
      }
    }
  }
`;
export const updateLivestream = /* GraphQL */ `
  mutation UpdateLivestream(
    $input: UpdateLivestreamInput!
    $condition: ModelLivestreamConditionInput
  ) {
    updateLivestream(input: $input, condition: $condition) {
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
        sections {
          nextToken
        }
      }
    }
  }
`;
export const deleteLivestream = /* GraphQL */ `
  mutation DeleteLivestream(
    $input: DeleteLivestreamInput!
    $condition: ModelLivestreamConditionInput
  ) {
    deleteLivestream(input: $input, condition: $condition) {
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
        sections {
          nextToken
        }
      }
    }
  }
`;
