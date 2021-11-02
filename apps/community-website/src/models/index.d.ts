import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Source {
  SELF = "SELF",
  YOUTUBE = "YOUTUBE",
  LIVESTREAM_SELF = "LIVESTREAM_SELF"
}



type MediaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MediasSectionsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SectionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ThumbnailMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ContentSubmissionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VideoOnDemandMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LivestreamMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Media {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly highlighted: boolean;
  readonly sections?: (MediasSections | null)[];
  readonly source?: Source | keyof typeof Source;
  readonly thumbnail?: Thumbnail;
  readonly author: string;
  readonly viewCount?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Media, MediaMetaData>);
  static copyOf(source: Media, mutator: (draft: MutableModel<Media, MediaMetaData>) => MutableModel<Media, MediaMetaData> | void): Media;
}

export declare class MediasSections {
  readonly id: string;
  readonly section: Section;
  readonly media: Media;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MediasSections, MediasSectionsMetaData>);
  static copyOf(source: MediasSections, mutator: (draft: MutableModel<MediasSections, MediasSectionsMetaData>) => MutableModel<MediasSections, MediasSectionsMetaData> | void): MediasSections;
}

export declare class Section {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly medias?: (MediasSections | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Section, SectionMetaData>);
  static copyOf(source: Section, mutator: (draft: MutableModel<Section, SectionMetaData>) => MutableModel<Section, SectionMetaData> | void): Section;
}

export declare class Thumbnail {
  readonly id: string;
  readonly ext: string;
  readonly src?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Thumbnail, ThumbnailMetaData>);
  static copyOf(source: Thumbnail, mutator: (draft: MutableModel<Thumbnail, ThumbnailMetaData>) => MutableModel<Thumbnail, ThumbnailMetaData> | void): Thumbnail;
}

export declare class ContentSubmission {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly comment?: string;
  readonly source?: Source | keyof typeof Source;
  readonly src?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ContentSubmission, ContentSubmissionMetaData>);
  static copyOf(source: ContentSubmission, mutator: (draft: MutableModel<ContentSubmission, ContentSubmissionMetaData>) => MutableModel<ContentSubmission, ContentSubmissionMetaData> | void): ContentSubmission;
}

export declare class VideoOnDemand {
  readonly id: string;
  readonly media?: Media;
  readonly src?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<VideoOnDemand, VideoOnDemandMetaData>);
  static copyOf(source: VideoOnDemand, mutator: (draft: MutableModel<VideoOnDemand, VideoOnDemandMetaData>) => MutableModel<VideoOnDemand, VideoOnDemandMetaData> | void): VideoOnDemand;
}

export declare class Livestream {
  readonly id: string;
  readonly media?: Media;
  readonly url?: string;
  readonly isLive?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Livestream, LivestreamMetaData>);
  static copyOf(source: Livestream, mutator: (draft: MutableModel<Livestream, LivestreamMetaData>) => MutableModel<Livestream, LivestreamMetaData> | void): Livestream;
}