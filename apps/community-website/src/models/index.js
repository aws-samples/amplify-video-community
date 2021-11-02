// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Source = {
  "SELF": "SELF",
  "YOUTUBE": "YOUTUBE",
  "LIVESTREAM_SELF": "LIVESTREAM_SELF"
};

const { Media, MediasSections, Section, Thumbnail, ContentSubmission, VideoOnDemand, Livestream } = initSchema(schema);

export {
  Media,
  MediasSections,
  Section,
  Thumbnail,
  ContentSubmission,
  VideoOnDemand,
  Livestream,
  Source
};