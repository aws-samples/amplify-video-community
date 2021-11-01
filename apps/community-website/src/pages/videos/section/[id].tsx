import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import Layout from '../../../shared/components/Layout'
import Loader from '../../../shared/components/Loader'
import {
    fetchSection,
    fetchVodFiles,
    fetchThumbnail,
} from '../../../shared/api'
import { VideoOnDemand, Section, Thumbnail } from '../../../models'
import moment from 'moment'
import AmplifyLogo from '../../../assets/logo/logo-dark.svg'
import LinesEllipsis from 'react-lines-ellipsis'
import SearchBar from '../../../shared/components/SearchBar'
import SectionVideosSorted, {
    KEY_SORT_BY_MOST_RECENT,
    KEY_SORT_BY_MOST_VIEWED,
} from '../../../shared/components/Section/SectionVideosSorted'
import VideoCard from '../../../shared/components/Card/VideoCard'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    background-color: #f9f9f9;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 90px;
`

const Title = styled.h1`
    margin-top: 30px;
    font-size: 36px;
`

const Separator = styled.div`
    background-color: #ff9900;
    height: 2px;
    width: 100px;
    margin-bottom: 20px;
`

const Description = styled.h2`
    font-size: 14px;
`

const LoaderWrapper = styled.div`
    padding-top: 50px;
`

const SplitScreen = styled.div`
    display: flex;
    justify-content: space-between;
`

const SplitScreenContainer = styled.div`
    margin-left: 100px;
    margin-bottom: 50px;
    margin-right: 100px;
`

const LeftPanel = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const VideoCardContainer = styled.div`
    display: flex;
`

const LeftPanelItemContentTitle = styled.div`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 5px;
`

const LeftPanelItemContentAuthor = styled.div`
    font-size: 11px;
    font-weight: bold;
`

const LeftPanelItemContentCountDate = styled.div`
    font-size: 11px;
`

const RightPanel = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 750px;
`

const SearchBarContainer = styled.div`
    margin-bottom: 30px;
`

const ChannelLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #ffffff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: absolute;
    top: 20px;
    left: -20px;
`

const SectionPage = (props: PageProps) => {
    const id = props.params.id
    const [section, setSection] = useState<Section | null>(null)
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [thumbnails, setThumbnails] = useState<
        Array<{
            obj: Thumbnail | undefined
            url: string
        }>
    >([])

    useEffect(() => {
        ;(async () => {
            const { data } = await fetchSection(id)
            setSection(data?.getSection as Section)
        })()
    }, [id])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodFiles(null)
                const fetchedVodAssets = data?.listVideoOnDemands
                    ?.items as Array<VideoOnDemand>
                const assets = fetchedVodAssets.filter((asset) => {
                    let returnValue = false
                    // eslint-disable-next-line
                    asset.media?.sections?.items.forEach((item) => {
                        if (item?.section.id === section.id) {
                            returnValue = true
                        }
                    })
                    return returnValue
                })
                setVodAssets(assets)
                const thumbnailArr: Array<{
                    obj: Thumbnail | undefined
                    url: string
                }> = []
                await Promise.all(
                    assets.map(async (asset) => {
                        if (asset.media?.thumbnail?.src != null) {
                            thumbnailArr.push({
                                obj: asset.media.thumbnail,
                                url: asset.media.thumbnail.src,
                            })
                        } else {
                            const data = await fetchThumbnail(asset.media)
                            thumbnailArr.push({
                                obj: asset.media?.thumbnail,
                                url: data as string,
                            })
                        }
                    })
                )
                setThumbnails(thumbnailArr)
            } catch (error) {
                console.error('videos/section/[id].tsx(fetchVodFiles):', error)
            }
        })()
    }, [section])

    return (
        <Layout>
            {section ? (
                <Container>
                    <Header>
                        <Title>{section.label}</Title>
                        <Separator />
                        <Description>{section.description}</Description>
                    </Header>
                    <SplitScreenContainer>
                        <SplitScreen>
                            <LeftPanel>
                                {vodAssets.map((vod, index, arr) => {
                                    const thumbnail = thumbnails.find(
                                        (thumb) =>
                                            thumb.obj?.id ===
                                            vod.media?.thumbnail?.id
                                    )
                                    const video = {
                                        vod,
                                        thumbnail,
                                    }
                                    return (
                                        <VideoCardContainer
                                            key={vod.id}
                                            style={{
                                                marginBottom:
                                                    arr.length - 1 === index
                                                        ? '0px'
                                                        : '30px',
                                            }}
                                        >
                                            <VideoCard video={video}>
                                                <ChannelLogo>
                                                    <AmplifyLogo />
                                                </ChannelLogo>
                                                <div>
                                                    <LeftPanelItemContentTitle>
                                                        {vod.media?.title}
                                                    </LeftPanelItemContentTitle>
                                                    <LinesEllipsis
                                                        text={
                                                            vod.media
                                                                ?.description
                                                        }
                                                        maxLine="5"
                                                        ellipsis="..."
                                                        trimRight
                                                        style={{
                                                            fontSize: '14px',
                                                        }}
                                                        basedOn="letters"
                                                    />
                                                </div>
                                                <div>
                                                    <LeftPanelItemContentAuthor>
                                                        {vod.media?.author}
                                                    </LeftPanelItemContentAuthor>
                                                    <LeftPanelItemContentCountDate>
                                                        {vod.media?.viewCount ||
                                                            0}{' '}
                                                        views -{' '}
                                                        {moment(
                                                            vod.media?.createdAt
                                                        ).fromNow()}
                                                    </LeftPanelItemContentCountDate>
                                                </div>
                                            </VideoCard>
                                        </VideoCardContainer>
                                    )
                                })}
                            </LeftPanel>
                            <RightPanel>
                                <SearchBarContainer>
                                    <SearchBar />
                                </SearchBarContainer>
                                {[
                                    KEY_SORT_BY_MOST_VIEWED,
                                    KEY_SORT_BY_MOST_RECENT,
                                ].map((key, index) => (
                                    <SectionVideosSorted
                                        key={key + index}
                                        videos={vodAssets}
                                        thumbnails={thumbnails}
                                        sortBy={key}
                                    />
                                ))}
                            </RightPanel>
                        </SplitScreen>
                    </SplitScreenContainer>
                </Container>
            ) : (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            )}
        </Layout>
    )
}

export default SectionPage
