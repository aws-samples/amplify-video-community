import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import CSS from 'csstype'
import { VideoOnDemand, Thumbnail } from '../../../../models'
import {
    NextArrow,
    PrevArrow,
} from '../../Button/FloatingDirectionalArrowButtons'
import { useWindowDimensions } from '../../../hooks'
import RightArrowLogo from '../../../../assets/logo/right-arrow.svg'
import VideoCard from '../../Card/VideoCard'

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

type Props = {
    videoInfos: Array<VideoInfo>
    section?: {
        id: string
        label: string
    }
    padding?: number
    itemWidth?: number
    spaceBetweenItems?: number
    redirectTo?: null | string
}

const SlidingContainer = styled.div`
    display: flex;
    height: 340px;
    align-items: center;
    width: 100vw;
    transition: margin-left 500ms ease-out;
    margin-left: ${(props) => props.left}px;
`

const ListContainer = styled.div`
    display: flex;
    align-items: center;
    height: 360px;
    overflow: hidden;
    position: relative;
`

const SeeAllItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: ${(props) => props.width}px;
    width: ${(props) => props.width}px;
    min-height: 318px;
    height: 318px;
    border: 2px solid #ff9900;
    border-radius: 10px;
    box-sizing: border-box;
    transition: transform 200ms ease-out, box-shadow 200ms ease-out,
        background-color 200ms ease-out;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        transform: scale(1.05);
        background-color: #ffffff;
    }
`

const SeeAllItemText = styled.p`
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    color: #ff9900;
    text-align: center;
    margin-bottom: 50px;
`

const VideoCardList = ({
    videoInfos,
    section = undefined,
    padding = 50,
    itemWidth = 360,
    spaceBetweenItems = 40,
    redirectTo = null,
}: Props) => {
    const [scroll, setScroll] = useState(0)
    const { width } = useWindowDimensions()

    const itemTotalWidth = itemWidth + spaceBetweenItems
    const nbVideoPerSlide = Math.floor(
        (width - padding + spaceBetweenItems) / itemTotalWidth
    )

    useEffect(() => {
        setScroll(0)
    }, [width])

    return (
        <ListContainer padding={padding}>
            <SlidingContainer left={scroll * itemTotalWidth + padding}>
                {videoInfos.map((videoInfo, index: number) => (
                    <div
                        key={videoInfo.vod?.id + index}
                        style={{ marginRight: '40px' }}
                    >
                        <VideoCard video={videoInfo} redirectTo={redirectTo} />
                    </div>
                ))}
                {section && (
                    <SeeAllItem
                        width={itemWidth}
                        onClick={() => {
                            navigate(
                                redirectTo
                                    ? redirectTo
                                    : `/videos/section/${section.id}`
                            )
                        }}
                    >
                        <SeeAllItemText>
                            See all {videoInfos.length} {section.label} videos.
                        </SeeAllItemText>
                        <RightArrowLogo height={50} width={50} />
                    </SeeAllItem>
                )}
            </SlidingContainer>
            {scroll < 0 && (
                <PrevArrow
                    onClick={() => setScroll(scroll + nbVideoPerSlide)}
                />
            )}
            {-scroll < videoInfos.length + 1 - nbVideoPerSlide && (
                <NextArrow
                    onClick={() => setScroll(scroll - nbVideoPerSlide)}
                />
            )}
        </ListContainer>
    )
}

export default VideoCardList
