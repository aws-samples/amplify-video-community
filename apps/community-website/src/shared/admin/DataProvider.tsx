import {
    fetchMedias,
    fetchMedia,
    modifyMedia,
    uploadContent,
    removeMedia,
    updateThumbnail,
    fetchSections,
    fetchSection,
    modifySection,
    createNewSection,
    removeSection,
    fetchLivestream,
    modifyLivestream,
    createNewLivestream,
    removeLivestream,
    removeThumbnailFile,
} from '../api'
import { fetchLivestreamsWithThumbnail } from '../api/live-fetch'

const resourcesMap = {
    Videos: {
        getList: () =>
            fetchMedias().then(({ data }) => {
                if (!data || !data.listMedia || !data.listMedia.items)
                    return { data: [], total: 0 }
                const list = data.listMedia.items
                    .filter((item) => item.source !== 'LIVESTREAM_SELF')
                    .map((item) => ({ ...item, sections: [] }))
                return {
                    data: list,
                    total: list.length,
                }
                return ret
            }),
        getOne: (params) =>
            fetchMedia(params.id).then((response) => ({
                data: response,
            })),
        update: (params) => {
            const promiseList = []
            if (params.data.thumbnail.rawFile) {
                promiseList.push(
                    updateThumbnail(
                        params.previousData.thumbnail,
                        params.previousData.id,
                        params.data.thumbnail.rawFile
                    )
                )
            }
            promiseList.push(
                modifyMedia({
                    id: params.data.id,
                    title: params.data.title,
                    description: params.data.description,
                    highlighted: params.data.highlighted,
                    source: params.data.source,
                    author: params.data.author,
                    sections: params.data.sections,
                }).then(({ data }) =>
                    data && data.updateMedia
                        ? { data: data.updateMedia }
                        : { data: {} }
                )
            )
            return Promise.all(promiseList).then((res) => res.at(-1))
        },
        create: (params) => {
            let youtubeID = ''
            if (params.data.source === 'YOUTUBE') {
                const url = new URL(params.data.url)
                const urlParams = new URLSearchParams(url.search)
                youtubeID = urlParams.get('v')
            }
            return uploadContent(
                {
                    id: '',
                    title: params.data.title,
                    description: params.data.description
                        ? params.data.description
                        : '',
                    highlighted: params.data.highlighted
                        ? params.data.highlighted
                        : false,
                    author: params.data.author,
                },
                params.data.source,
                params.data.sections,
                params.data.source === 'YOUTUBE'
                    ? null
                    : params.data.thumbnail.rawFile,
                params.data.source === 'YOUTUBE'
                    ? null
                    : params.data.video.rawFile,
                params.data.source === 'YOUTUBE'
                    ? `https://youtube.com/embed/${youtubeID}`
                    : '',
                params.data.progress
            )
        },
        delete: (params) =>
            removeMedia({ id: params.id }, params.previousData).then(
                ({ data }) => ({
                    data: data?.deleteMedia,
                })
            ),
        deleteMany: (params) =>
            Promise.all(
                params.ids.map((id) =>
                    removeMedia({ id: id }).then(
                        ({ data }) => data?.deleteMedia
                    )
                )
            ).then((deletedVideos) => ({ data: deletedVideos })),
    },
    Sections: {
        getList: () =>
            fetchSections().then(({ data }) =>
                data && data.listSections && data.listSections.items
                    ? {
                          data: data.listSections.items,
                          total: data.listSections.items.length,
                      }
                    : { data: [], total: 0 }
            ),
        getOne: (params) =>
            fetchSection(params.id).then(({ data }) =>
                data && data.getSection
                    ? { data: data.getSection }
                    : { data: { id: params.id } }
            ),
        update: (params) =>
            modifySection({
                id: params.data.id,
                label: params.data.label,
                description: params.data.description,
            }).then(({ data }) =>
                data && data.updateSection
                    ? { data: data.updateSection }
                    : { data: {} }
            ),
        create: (params) =>
            createNewSection(params.data.label, params.data.description).then(
                ({ data }) =>
                    data && data.createSection
                        ? { data: data.createSection }
                        : { data: {} }
            ),
        delete: (params) =>
            removeSection(params.id).then(({ data }) => ({
                data: data?.deleteSection,
            })),
        deleteMany: (params) =>
            Promise.all(
                params.ids.map((id) =>
                    removeSection(id).then(({ data }) => data?.deleteSection)
                )
            ).then((deletedVideos) => ({ data: deletedVideos })),
    },
    Livestreams: {
        getList: () =>
            fetchLivestreamsWithThumbnail().then(({ data }) =>
                data && data.listLivestreams && data.listLivestreams.items
                    ? {
                          data: data.listLivestreams.items.map((item) => ({
                              ...item,
                              ...item.media,
                              media: undefined,
                          })),
                          total: data.listLivestreams.items.length,
                      }
                    : { data: [], total: 0 }
            ),
        getOne: (params) =>
            fetchLivestream(params.id).then(({ data }) =>
                data && data.getLivestream
                    ? {
                          data: {
                              ...data.getLivestream,
                              ...data.getLivestream.media,
                              media: undefined,
                          },
                      }
                    : { data: { id: params.id } }
            ),
        update: (params) => {
            const promiseList = []
            if (params.data.thumbnail.rawFile) {
                promiseList.push(
                    updateThumbnail(
                        params.previousData.thumbnail,
                        params.previousData.id,
                        params.data.thumbnail.rawFile
                    )
                )
            }
            promiseList.push(
                modifyMedia({
                    id: params.data.id,
                    title: params.data.title,
                    description: params.data.description,
                    highlighted: params.data.highlighted,
                    source: params.data.source,
                    author: params.data.author,
                }).then(({ data }) =>
                    data && data.updateMedia
                        ? { data: data.updateMedia }
                        : { data: {} }
                )
            )
            promiseList.push(
                modifyLivestream({
                    id: params.data.id,
                    url: 'https://c6d98e9ef5e7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.394125495069.channel.AriVnRGWVwdO.m3u8',
                    isLive: params.data.isLive,
                    livestreamMediaId: params.data.id,
                }).then(({ data }) => {
                    return data && data.updateLivestream
                        ? { data: data.updateLivestream }
                        : { data: {} }
                })
            )
            return Promise.all(promiseList).then((res) => res.at(-1))
        },
        create: (params) =>
            createNewLivestream(
                {
                    id: '',
                    title: params.data.title,
                    description: params.data.description,
                    highlighted: false,
                    author: params.data.author,
                },
                params.data.thumbnail.rawFile,
                'https://c6d98e9ef5e7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.394125495069.channel.AriVnRGWVwdO.m3u8',
                params.data.isLive
            ),
        delete: async (params) => {
            if (params.previousData) {
                await removeMedia({ id: params.previousData.id })
                await removeThumbnailFile(params.previousData.thumbnail)
            }
            return removeLivestream({ id: params.id })
        },
        deleteMany: (params) =>
            Promise.all(
                params.ids.map(async (id) => {
                    let removedLivestream
                    const live = await fetchLivestream(id)

                    try {
                        removedLivestream = await removeLivestream({
                            id: live.data?.getLivestream?.id,
                        })
                    } catch (error) {
                        console.error(
                            'DataProvider.tsx(deleteMany: removeLivestream): ',
                            error
                        )
                        return
                    }

                    try {
                        await removeMedia({
                            id: live.data?.getLivestream?.media?.id,
                        })
                    } catch (error) {
                        console.error(
                            'DataProvider.tsx(deleteMany: removeMedia): ',
                            error
                        )
                        return
                    }

                    try {
                        await removeThumbnailFile(
                            live.data?.getLivestream?.media?.thumbnail
                        )
                    } catch (error) {
                        console.error(
                            'DataProvider.tsx(deleteMany: removeThumbnailFile): ',
                            error
                        )
                        return
                    }

                    return new Promise((resolve) =>
                        resolve({ data: removedLivestream.data })
                    )
                })
            ).then((deletedLivestreams) => ({ data: deletedLivestreams })),
    },
}

export default {
    getList: (ressource) => resourcesMap[ressource].getList(),
    getOne: (ressource, params) => resourcesMap[ressource].getOne(params),
    update: (ressource, params) => resourcesMap[ressource].update(params),
    create: (ressource, params) => resourcesMap[ressource].create(params),
    delete: (ressource, params) => resourcesMap[ressource].delete(params),
    deleteMany: (ressource, params) =>
        resourcesMap[ressource].deleteMany(params),
}
