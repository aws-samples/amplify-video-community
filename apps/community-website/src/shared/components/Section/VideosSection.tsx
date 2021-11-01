import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CSS from 'csstype'
import { VideoOnDemand, Section, Thumbnail } from '../../../models'
import VideoCardList from '../Sliders/VideoCardSlider'
import { navigate } from 'gatsby'
import RightArrowLogo from '../../../assets/logo/right-arrow.svg'

type SectionProps = {
    section: Section
    vodAssets: Array<VideoOnDemand>
    thumbnails: Array<{
        obj: Thumbnail | undefined
        url: string
    }>
}

type VideoInfo = {
    thumbnail:
        | {
              obj: Thumbnail | undefined
              url: string
          }
        | undefined
    vod: VideoOnDemand | undefined
    style?: CSS.Properties
    imgStyle?: CSS.Properties
}

const VideosSectionContainer = styled.div`
    margin-top: 100px;
    background-color: #f9f9f9;
    overflow: hidden;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.h2`
    font-weight: 600;
    font-size: 28px;
    margin: 0 0 0 50px;
`

const SeeAll = styled.div`
    display: flex;
    align-items: center;
    color: #ff9900;
    font-size: 22px;
    cursor: pointer;
    margin-right: 100px;
    line-height: 26px;
    font-weight: bold;
`

const StyledArrow = styled(RightArrowLogo)`
    margin-left: 10px;
`

const VideosSection = ({ section, vodAssets, thumbnails }: SectionProps) => {
    const [videoInfos, setVideoInfos] = useState<Array<VideoInfo>>([])

    useEffect(() => {
        const fAssets: Array<VideoInfo> = []
        const assets = vodAssets.filter((asset) => {
            let returnValue = false
            // eslint-disable-next-line
            asset.media?.sections?.items.forEach((item) => {
                if (item?.section.id === section.id) {
                    returnValue = true
                }
            })
            return returnValue
        })
        assets.forEach((a) => {
            fAssets.push({
                thumbnail: thumbnails.find(
                    (thumbnail) => a.media?.thumbnail?.id === thumbnail.obj?.id
                ),
                vod: a,
            })
        })
        setVideoInfos(fAssets)
    }, [])

    return videoInfos && videoInfos.length > 0 ? (
        <VideosSectionContainer>
            <Header>
                <Title>{section.label}</Title>
                <SeeAll
                    onClick={() => {
                        navigate(`/videos/section/${section.id}`)
                    }}
                >
                    See all
                    <StyledArrow />
                </SeeAll>
            </Header>
            <VideoCardList
                videoInfos={videoInfos}
                config={{
                    width: 480,
                    height: 270,
                }}
                section={section}
            />
        </VideosSectionContainer>
    ) : null
}

export default VideosSection
