import { API, graphqlOperation, Storage } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { createVideoOnDemand } from '../../graphql/mutations'
import {
    removeThumbnailFile,
    putThumbnailFile,
    setThumbnail,
    setMedia,
} from './mutate'
import awsvideoconfig from '../../aws-video-exports'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { Media, Thumbnail } from '../../models'

async function createVOD(payload: APIt.CreateVideoOnDemandInput) {
    return API.graphql(
        graphqlOperation(createVideoOnDemand, {
            input: payload,
        })
    ) as GraphQLResult<APIt.CreateVideoOnDemandMutation>
}

async function putVodFile(
    file: File,
    id: string,
    vodExtension: string[],
    progressCallback
) {
    return Storage.put(`${id}.${vodExtension[vodExtension.length - 1]}`, file, {
        bucket: awsvideoconfig.awsInputVideo,
        region: awsmobile.aws_project_region,
        progressCallback,
    })
}

const updateThumbnail = async (
    thumbnail: Thumbnail,
    id: string,
    thumbnailFile: File
) => {
    try {
        await removeThumbnailFile(thumbnail)
    } catch (error) {
        console.error('vod-mutate.ts(removeThumbnailFile): ', error)
        return
    }

    try {
        await putThumbnailFile(thumbnailFile, id)
    } catch (error) {
        console.error('vod-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        return await setThumbnail(id)
    } catch (error) {
        console.error('vod-mutate.tx(setThumbnail): ', error)
    }
}

const uploadSourceSelf = async (
    id: string,
    media: Media,
    thumbnailFile: File,
    vodFile: File,
    sectionsId: Array<string> | undefined,
    progressCallback?: (progress) => void
) => {
    const vodExtension = vodFile.name.toLowerCase().split('.')
    try {
        await putVodFile(
            vodFile,
            id,
            vodExtension,
            progressCallback
                ? progressCallback
                : () => {
                      return
                  }
        )
    } catch (error) {
        console.error('vod-mutate.ts(putVodFile): ', error)
        return
    }

    try {
        await putThumbnailFile(thumbnailFile, id)
    } catch (error) {
        console.error('vod-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        await setThumbnail(id)
    } catch (error) {
        console.error('vod-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        await setMedia({
            id,
            title: media.title,
            description: media.description,
            highlighted: media.highlighted,
            author: media.author,
            source: APIt.Source.SELF,
            mediaThumbnailId: id,
            sections: sectionsId,
        })
    } catch (error) {
        console.error('vod-mutate.tx(setMedia): ', error)
        return
    }

    try {
        await createVOD({
            id,
            videoOnDemandMediaId: id,
            src: null,
        })
    } catch (error) {
        console.error('vod-mutate.tx(createVOD): ', error)
        return
    }
}

const uploadSourceYoutube = async (
    id: string,
    media: Media,
    thumbnailFile: File | null,
    youtubeSrc: string,
    sectionsId: Array<string> | unefined
) => {
    if (thumbnailFile) {
        try {
            await putThumbnailFile(thumbnailFile, id)
        } catch (error) {
            console.error('vod-mutate.ts(putThumbnailFile): ', error)
            return
        }
    }
    try {
        await setThumbnail(
            id,
            thumbnailFile
                ? undefined
                : `https://img.youtube.com/vi/${youtubeSrc
                      .split('/')
                      .pop()}/maxresdefault.jpg`
        )
    } catch (error) {
        console.error('vod-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        await setMedia({
            id,
            title: media.title,
            description: media.description,
            author: media.author,
            highlighted: media.highlighted,
            source: APIt.Source.YOUTUBE,
            mediaThumbnailId: id,
            sections: sectionsId,
        })
    } catch (error) {
        console.error('vod-mutate.tx(setMedia): ', error)
        return
    }

    try {
        await createVOD({
            id,
            videoOnDemandMediaId: id,
            src: youtubeSrc,
        })
    } catch (error) {
        console.error('vod-mutate.tx(createVOD): ', error)
        return
    }
}

export { createVOD, uploadSourceSelf, uploadSourceYoutube, updateThumbnail }
