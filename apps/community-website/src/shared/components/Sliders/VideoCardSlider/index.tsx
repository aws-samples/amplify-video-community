import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import CSS from 'csstype'
import { VideoOnDemand, Thumbnail } from '../../../../models'
import { defaultVideoCardProperties, screenSizes } from '../../../constants'
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
    spaceBetweenItems?: number
    redirectTo?: null | string
}

const SlidingContainer = styled.div`
    display: flex;
    height: ${({ height }) => height + 20}px;
    align-items: center;
    width: 100vw;
    transition: margin-left 500ms ease-out;
    margin-left: ${(props) => props.left}px;
    gap: ${({ spaceBetweenItems }) => spaceBetweenItems}px;
`

const ListContainer = styled.div`
    display: flex;
    align-items: center;
    height: ${({ height }) => height + 20}px;
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
    min-height: ${(props) => props.height}px;
    height: ${(props) => props.height}px;
    border: 2px solid #ff9900;
    border-radius: 10px;
    box-sizing: border-box;
    transition: transform 200ms ease-out, box-shadow 200ms ease-out,
        background-color 200ms ease-out;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        transform: scale(1.01);
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
    spaceBetweenItems = 20,
    redirectTo = null,
}: Props) => {
    const [scroll, setScroll] = useState(0)
    const [cardProperties, setCardProperties] = useState(
        defaultVideoCardProperties
    )
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (width < screenSizes.xs) {
            setCardProperties({
                width: width - 150,
                height: 220,
                infos: 'hide',
            })
        } else if (width < screenSizes.s) {
            setCardProperties({
                width: 200,
                height: 220,
                infos: 'hide',
            })
        } else {
            setCardProperties(defaultVideoCardProperties)
        }
        setScroll(0)
    }, [width])

    const itemTotalWidth = cardProperties.width + spaceBetweenItems
    const nbVideoPerSlide = Math.floor(
        (width - padding + spaceBetweenItems) / itemTotalWidth
    )

    return (
        <ListContainer
            padding={padding}
            height={
                cardProperties.infos === 'show'
                    ? cardProperties.height + 100
                    : cardProperties.height
            }
        >
            <SlidingContainer
                left={scroll * itemTotalWidth + padding}
                height={
                    cardProperties.infos === 'show'
                        ? cardProperties.height + 100
                        : cardProperties.height
                }
                spaceBetweenItems={spaceBetweenItems}
            >
                {videoInfos.map((videoInfo, index: number) => {
                    return (
                        <VideoCard
                            key={videoInfo.vod?.id + index}
                            video={videoInfo}
                            redirectTo={redirectTo}
                            cardWidth={cardProperties.width}
                            cardHeight={cardProperties.height}
                            videoInfos={cardProperties.infos}
                        />
                    )
                })}
                {section && (
                    <SeeAllItem
                        width={cardProperties.width}
                        height={
                            cardProperties.infos === 'show'
                                ? cardProperties.height + 100
                                : cardProperties.height
                        }
                        onClick={() => {
                            navigate(
                                redirectTo
                                    ? redirectTo
                                    : `/videos/section/${section.id}`
                            )
                        }}
                    >
                        {width > screenSizes.xs && (
                            <SeeAllItemText>
                                See all {videoInfos.length} {section.label}{' '}
                                videos.
                            </SeeAllItemText>
                        )}
                        <RightArrowLogo height={50} width={50} />
                    </SeeAllItem>
                )}
            </SlidingContainer>
            {scroll < 0 && (
                <PrevArrow
                    onClick={() => setScroll(scroll + nbVideoPerSlide)}
                />
            )}
            {-scroll < videoInfos.length - nbVideoPerSlide && (
                <NextArrow
                    onClick={() => setScroll(scroll - nbVideoPerSlide)}
                />
            )}
        </ListContainer>
    )
}

export default VideoCardList
