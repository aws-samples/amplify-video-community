import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../shared/components/Layout'
import Loader from '../shared/components/Loader'
import VideoPlayerComponent from '../shared/components/VideoPlayer'
import { Livestream } from '../models'
import { fetchLivestreamsWithThumbnail } from '../shared/api/live-fetch'

type VideoPlayerProps = {
    source: string
}

const VideoPlayerWrapper = styled.div`
    background: black;
    margin: 20px 0;
`
const VideoPlayer = ({ source }: VideoPlayerProps) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `${source}`,
                type: 'application/x-mpegURL',
            },
        ],
    }
    return (
        <VideoPlayerWrapper>
            <VideoPlayerComponent {...videoJsOptions} />
        </VideoPlayerWrapper>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 50px 25px;
`

const LivestreamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const Message = styled.div`
    font-size: 2em;
    text-align: center;
`

const LivestreamTitle = styled.h1`
    font-size: 2em;
`

const LivestreamDescription = styled.h2`
    font-size: 1.3em;
`

const LivestreamManagement = () => {
    const [livestream, setLivestream] = useState<Livestream | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchLivestreamsWithThumbnail()
                if (
                    !data ||
                    !data.listLivestreams ||
                    !data.listLivestreams.items ||
                    data.listLivestreams.items.length === 0
                )
                    return
                setLivestream(data.listLivestreams.items[0] as Livestream)
            } catch (error) {
                console.error(
                    'admin/livestream/index.tsx(fetchLivestream):',
                    error
                )
            }
            setLoading(false)
        })()
    }, [])

    return (
        <Layout>
            {loading ? (
                <Loader />
            ) : (
                <Container>
                    {livestream && livestream.isLive ? (
                        <LivestreamContainer>
                            <LivestreamTitle>
                                {livestream.media?.title}
                            </LivestreamTitle>
                            <VideoPlayer source={livestream.url || ''} />
                            <LivestreamDescription>
                                {livestream.media?.description}
                            </LivestreamDescription>
                        </LivestreamContainer>
                    ) : (
                        <Message>Livestream has not started</Message>
                    )}
                </Container>
            )}
        </Layout>
    )
}

export default LivestreamManagement
