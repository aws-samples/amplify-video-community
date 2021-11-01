/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia {
    onCreateMedia {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia {
    onUpdateMedia {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia {
    onDeleteMedia {
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
export const onCreateContentSubmission = /* GraphQL */ `
  subscription OnCreateContentSubmission {
    onCreateContentSubmission {
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
export const onUpdateContentSubmission = /* GraphQL */ `
  subscription OnUpdateContentSubmission {
    onUpdateContentSubmission {
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
export const onDeleteContentSubmission = /* GraphQL */ `
  subscription OnDeleteContentSubmission {
    onDeleteContentSubmission {
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
export const onCreateThumbnail = /* GraphQL */ `
  subscription OnCreateThumbnail {
    onCreateThumbnail {
      id
      ext
      src
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateThumbnail = /* GraphQL */ `
  subscription OnUpdateThumbnail {
    onUpdateThumbnail {
      id
      ext
      src
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteThumbnail = /* GraphQL */ `
  subscription OnDeleteThumbnail {
    onDeleteThumbnail {
      id
      ext
      src
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection {
    onCreateSection {
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
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
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
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
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
export const onCreateMediasSections = /* GraphQL */ `
  subscription OnCreateMediasSections {
    onCreateMediasSections {
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
export const onUpdateMediasSections = /* GraphQL */ `
  subscription OnUpdateMediasSections {
    onUpdateMediasSections {
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
export const onDeleteMediasSections = /* GraphQL */ `
  subscription OnDeleteMediasSections {
    onDeleteMediasSections {
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
export const onCreateVideoOnDemand = /* GraphQL */ `
  subscription OnCreateVideoOnDemand {
    onCreateVideoOnDemand {
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
export const onUpdateVideoOnDemand = /* GraphQL */ `
  subscription OnUpdateVideoOnDemand {
    onUpdateVideoOnDemand {
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
export const onDeleteVideoOnDemand = /* GraphQL */ `
  subscription OnDeleteVideoOnDemand {
    onDeleteVideoOnDemand {
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
export const onCreateLivestream = /* GraphQL */ `
  subscription OnCreateLivestream {
    onCreateLivestream {
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
export const onUpdateLivestream = /* GraphQL */ `
  subscription OnUpdateLivestream {
    onUpdateLivestream {
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
export const onDeleteLivestream = /* GraphQL */ `
  subscription OnDeleteLivestream {
    onDeleteLivestream {
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
