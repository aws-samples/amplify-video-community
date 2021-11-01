import { API, graphqlOperation } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import * as APIt from '../../API'
import { createLivestream, updateLivestream } from '../../graphql/mutations'
import { Media } from '../../models'
import { putThumbnailFile, setThumbnail, setMedia } from './mutate'

async function setLivestream(input: APIt.CreateLivestreamInput) {
    return API.graphql(
        graphqlOperation(createLivestream, {
            input,
        })
    )
}

async function modifyLivestream(input: APIt.UpdateLivestreamInput) {
    return API.graphql(
        graphqlOperation(updateLivestream, {
            input,
        })
    )
}

const createNewLivestream = async (
    media: Media,
    thumbnailFile: File,
    src: string,
    isLive: string
) => {
    const id: string = uuidv4()
    try {
        await putThumbnailFile(thumbnailFile, id)
    } catch (error) {
        console.error('live-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        await setThumbnail(id)
    } catch (error) {
        console.error('live-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        await setMedia({
            id,
            title: media.title,
            author: media.author,
            description: media.description,
            highlighted: media.highlighted,
            source: APIt.Source.LIVESTREAM_SELF,
            mediaThumbnailId: id,
        })
    } catch (error) {
        console.error('live-mutate.tx(setMedia): ', error)
        return
    }
    try {
        await setLivestream({
            id,
            url: src,
            isLive,
            livestreamMediaId: id,
        })
    } catch (error) {
        console.error('live-mutate.tx(setLivestream): ', error)
        return
    }
    return { data: { id } }
}

export { createNewLivestream, modifyLivestream }
