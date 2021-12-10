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
    return <VideoPlayerComponent {...videoJsOptions} />
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
    margin: 50px 0 10px 30px;
`

const LivestreamDescription = styled.h2`
    font-size: 1.3em;
    margin: 20px 0 50px 30px;
`

const LivestreamManagement = () => {
    const [livestream, setLivestream] = useState<Livestream | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                console.log('je lance')
                const { data } = await fetchLivestreamsWithThumbnail()
                console.log({ data })
                if (
                    !data ||
                    !data.listLivestreams ||
                    !data.listLivestreams.items ||
                    data.listLivestreams.items.length === 0
                )
                    return
                setLivestream(data.listLivestreams.items[0] as Livestream)
            } catch (error) {
                console.error('livestream/index.tsx(fetchLivestream):', error)
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
                            <VideoPlayer source={livestream.url || ''} />
                            <LivestreamTitle>
                                {livestream.media?.title}
                            </LivestreamTitle>
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
