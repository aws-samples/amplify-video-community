import React, { useState } from 'react'
import styled from 'styled-components'
import Slider, { Settings } from 'react-slick'
import { NextArrow, PrevArrow } from './Arrows'
import VideoCard from './Card'
import { Livestream, Thumbnail } from '../../../../models'

type LiveSliderProps = {
    thumbnails: Array<{
        obj: Thumbnail | undefined
        url: string
    }>
    livestreams: Array<Livestream>
}

const StyledLiveSlider = styled.div`
    & .slick-track {
        height: calc(30vw * 1.5 * 9 / 16);
        padding-top: calc((30vw * 9 / 16) / 2);
        padding-left: calc(10vw / 6);
    }
    &:last-child {
        border-bottom: none;
    }
`

const LiveSlider = ({ livestreams, thumbnails }: LiveSliderProps) => {
    const [imageIndex, setImageIndex] = useState<number>(0)
    const slidesToShow = (slidesNumber: number) =>
        thumbnails.length >= slidesNumber ? slidesNumber : thumbnails.length

    const sliderSettings: Settings = {
        infinite: true,
        className: 'center',
        centerMode: true,
        lazyLoad: 'progressive',
        autoplay: false,
        autoplaySpeed: 3500,
        draggable: true,
        speed: 300,
        slidesToShow: slidesToShow(3),
        centerPadding: '0',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current: number, next: number) => setImageIndex(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: slidesToShow(1),
                },
            },
        ],
    }

    return (
        <StyledLiveSlider>
            <Slider {...sliderSettings} className="MainSliderClass">
                {thumbnails.map((thumbnail, idx) => {
                    const correspondingLivestream = livestreams.find(
                        (asset) =>
                            asset.media?.thumbnail?.id === thumbnail?.obj?.id
                    )
                    if (!correspondingLivestream) return

                    return (
                        <VideoCard
                            key={correspondingLivestream.id}
                            isActive={idx === imageIndex}
                            thumbnail={thumbnail}
                            vod={correspondingLivestream}
                        />
                    )
                })}
            </Slider>
        </StyledLiveSlider>
    )
}

export default LiveSlider
