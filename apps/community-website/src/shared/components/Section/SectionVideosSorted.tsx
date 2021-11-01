import React from 'react'
import styled from 'styled-components'
import VideoCard from '../Card/VideoCard'

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
`

const SectionTitle = styled.span`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
`

const SectionContent = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
`

const Separator = styled.div`
    background-color: #ff9900;
    height: 2px;
    width: 100px;
    margin-bottom: 20px;
`

export const KEY_SORT_BY_MOST_VIEWED = 'Most Viewed'
export const KEY_SORT_BY_MOST_RECENT = 'Most Recent'

const SectionVideosSorted = ({
    videos,
    thumbnails,
    sortBy = KEY_SORT_BY_MOST_VIEWED,
}) => {
    return (
        <SectionContainer>
            <SectionTitle>
                {sortBy === KEY_SORT_BY_MOST_VIEWED
                    ? KEY_SORT_BY_MOST_VIEWED
                    : KEY_SORT_BY_MOST_RECENT}
            </SectionTitle>
            <Separator />
            <SectionContent>
                {sortBy === KEY_SORT_BY_MOST_VIEWED ? (
                    <>
                        {videos.slice(0, 4).map((asset) => {
                            const thumbnail = thumbnails.find(
                                (thumb) =>
                                    thumb.obj?.id === asset.media?.thumbnail?.id
                            )
                            const videoInfo = {
                                vod: asset,
                                thumbnail,
                            }
                            return (
                                <>
                                    <VideoCard
                                        key={asset.id}
                                        video={videoInfo}
                                        haveSubtitle
                                    />
                                </>
                            )
                        })}{' '}
                    </>
                ) : (
                    <>
                        {videos
                            .sort(
                                (a, b) =>
                                    +new Date(b.createdAt || '') -
                                    +new Date(a.createdAt || '')
                            )
                            .slice(0, 4)
                            .map((asset) => {
                                const thumbnail = thumbnails.find(
                                    (thumb) =>
                                        thumb.obj?.id ===
                                        asset.media?.thumbnail?.id
                                )
                                const videoInfo = {
                                    vod: asset,
                                    thumbnail,
                                }
                                return (
                                    <>
                                        <VideoCard
                                            key={asset.id}
                                            video={videoInfo}
                                            haveSubtitle
                                        />
                                    </>
                                )
                            })}
                    </>
                )}
            </SectionContent>
        </SectionContainer>
    )
}

export default SectionVideosSorted
