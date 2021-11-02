import React from 'react'
import styled from 'styled-components'
import LiveSlider from '../components/Sliders/LiveSlider'
import { Livestream, Thumbnail } from '../../models'

const Container = styled.div`
    background-color: #ffffff;
    padding: 100px 0;
`

const MainText = styled.h2`
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 0 50px;
`

const OrangeText = styled.span`
    color: #ff9900;
`

const livestreams: Array<Livestream> = [
    {
        id: '1',
        isLive: true,
        media: {
            id: '11',
            description: 'Media descrition',
            highlighted: true,
            title: 'Media Title',
            thumbnail: {
                id: '111',
                ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
            },
        },
    },
    {
        id: '2',
        isLive: true,
        media: {
            id: '22',
            description: 'Media descrition',
            highlighted: true,
            title: 'Media Title',
            thumbnail: {
                id: '222',
                ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
            },
        },
    },
    {
        id: '3',
        isLive: true,
        media: {
            id: '33',
            description: 'Media descrition',
            highlighted: true,
            title: 'Media Title',
            thumbnail: {
                id: '333',
                ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
            },
        },
    },
    {
        id: '4',
        isLive: true,
        media: {
            id: '44',
            description: 'Media descrition',
            highlighted: true,
            title: 'Media Title',
            thumbnail: {
                id: '444',
                ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
            },
        },
    },
    {
        id: '5',
        isLive: true,
        media: {
            id: '55',
            description: 'Media descrition',
            highlighted: true,
            title: 'Media Title',
            thumbnail: {
                id: '555',
                ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
            },
        },
    },
]

const thumbnails: Array<{
    obj: Thumbnail | undefined
    url: string
}> = [
    {
        obj: {
            id: '111',
            ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
        },
        url: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
    },
    {
        obj: {
            id: '222',
            ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
        },
        url: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
    },
    {
        obj: {
            id: '333',
            ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
        },
        url: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
    },
    {
        obj: {
            id: '444',
            ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
        },
        url: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
    },
    {
        obj: {
            id: '555',
            ext: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
        },
        url: 'https://img.youtube.com/vi/vM_YoZbLQQ0/maxresdefault.jpg',
    },
]

const StreamingContent = () => (
    <Container>
        <MainText>
            Watch <OrangeText>streamers</OrangeText> powered by{' '}
            <OrangeText>Amplify Video.</OrangeText>
        </MainText>
        <LiveSlider livestreams={livestreams} thumbnails={thumbnails} />
    </Container>
)

export default StreamingContent
