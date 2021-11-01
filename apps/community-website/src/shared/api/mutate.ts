import { API, graphqlOperation } from 'aws-amplify'
import { Storage } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { v4 as uuidv4 } from 'uuid'
import Resizer from 'react-image-file-resizer'
import {
    createSection,
    deleteThumbnail,
    deleteMediasSections,
    deleteVideoOnDemand,
    deleteLivestream,
    updateSection,
} from '../../graphql/mutations'
import { manageResources } from '../../graphql/queries'
import { uploadSourceSelf, uploadSourceYoutube } from './vod-mutate'
import * as APIt from '../../API'
import { Media, Thumbnail } from '../../models'
import { createThumbnail } from '../../graphql/mutations'
import awsmobile from '../../aws-exports'

const thumbnailExtension = 'jpeg'

async function callManageResourcesLambda(query: string, params: unknown) {
    return API.graphql(
        graphqlOperation(manageResources, {
            input: {
                query,
                params: JSON.stringify(params),
            },
        })
    ).then((response) => {
        const jsonResponse = JSON.parse(response.data.manageResources)
        if (jsonResponse.statusCode !== 200) {
            throw new Error(jsonResponse.body)
        }
        return jsonResponse.body
    })
}

const createNewSection = async (label: string, description: string) => {
    return API.graphql(
        graphqlOperation(createSection, {
            input: {
                label,
                description,
            },
        })
    )
}

async function removeSection(id) {
    return callManageResourcesLambda('deleteSection', { id })
}

async function modifySection(input: APIt.UpdateSectionInput) {
    return API.graphql(
        graphqlOperation(updateSection, {
            input,
        })
    )
}

async function removeMediasSections(input: APIt.DeleteMediasSectionsInput) {
    return API.graphql(
        graphqlOperation(deleteMediasSections, {
            input,
        })
    ) as GraphQLResult<APIt.DeleteMediasSectionsInput>
}

async function removeThumbnailFile(thumbnail: Thumbnail | undefined) {
    if (!thumbnail) {
        return
    }
    await API.graphql(
        graphqlOperation(deleteThumbnail, {
            input: {
                id: thumbnail.id,
            },
        })
    )
    await Storage.remove(`thumbnails/${thumbnail.id}.${thumbnail.ext}`, {
        bucket: awsmobile.aws_user_files_s3_bucket,
        level: 'public',
    })
}

const resizeAndConvertThumbnail = (file: File) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            600,
            500,
            thumbnailExtension.toUpperCase(),
            100,
            0,
            (uri) => {
                resolve(uri)
            },
            'file'
        )
    })

async function putThumbnailFile(file: File, id: string) {
    const fileResized = await resizeAndConvertThumbnail(file)

    return Storage.put(`thumbnails/${id}.${thumbnailExtension}`, fileResized, {
        bucket: awsmobile.aws_user_files_s3_bucket,
        level: 'public',
        // eslint-disable-next-line
        progressCallback(progress: any) {
            console.log(
                `thumbnailFile Uploaded: ${progress.loaded}/${progress.total}`
            )
        },
    })
}

// eslint-disable-next-line
async function setThumbnail(id: string, src?: string) {
    return API.graphql(
        graphqlOperation(createThumbnail, {
            input: {
                id: id,
                ext: thumbnailExtension,
                src,
            },
        })
    )
}

async function setMedia(input: APIt.CreateMediaInput) {
    return callManageResourcesLambda('createMedia', { input })
}

async function removeVideoOnDemand(input: APIt.DeleteVideoOnDemandInput) {
    return API.graphql(
        graphqlOperation(deleteVideoOnDemand, {
            input,
        })
    )
}

async function removeLivestream(input: APIt.DeleteLivestreamInput) {
    return API.graphql(
        graphqlOperation(deleteLivestream, {
            input,
        })
    )
}

function removeMedia({ id }: APIt.DeleteMediaInput, mediaToDelete) {
    return callManageResourcesLambda('deleteMedia', { id }).then((result) => {
        removeVideoOnDemand({ id })
        if (mediaToDelete && mediaToDelete.thumbnail && mediaToDelete.id) {
            removeThumbnailFile(mediaToDelete.thumbnail)
        }
        return result
    })
}

async function modifyMedia(input) {
    return callManageResourcesLambda('updateMedia', { input })
}

const uploadContent = async (
    media: Media,
    source: APIt.Source,
    sectionsId: Array<string> | undefined,
    thumbnailFile: File,
    vodFile: File | null,
    youtubeSrc: string,
    progressCallback: (progress) => void
) => {
    const id: string = uuidv4()

    switch (source) {
        case APIt.Source.SELF:
            if (!vodFile) {
                break
            }
            await uploadSourceSelf(
                id,
                media,
                thumbnailFile,
                vodFile,
                sectionsId,
                progressCallback
            )
            break

        case APIt.Source.YOUTUBE:
            await uploadSourceYoutube(
                id,
                media,
                thumbnailFile,
                youtubeSrc,
                sectionsId
            )
            break

        default:
            break
    }

    return { data: { id } }
}

export {
    callManageResourcesLambda,
    uploadContent,
    createNewSection,
    putThumbnailFile,
    setMedia,
    setThumbnail,
    removeMedia,
    modifyMedia,
    removeThumbnailFile,
    removeMediasSections,
    removeVideoOnDemand,
    removeLivestream,
    removeSection,
    modifySection,
}
