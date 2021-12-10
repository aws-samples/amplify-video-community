import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import moment from 'moment'
import awsvideoconfig from '../../aws-video-exports'
import { fetchVodAsset } from '../../shared/api/vod-fetch'
import { fetchMediasSectionsFiltered } from '../../shared/api'
import Layout from '../../shared/components/Layout'
import VideoPlayerComponent from '../../shared/components/VideoPlayer'
import { VideoOnDemand, MediasSections } from '../../models'
import { useWindowDimensions } from '../../shared/hooks'
import { screenSizes } from '../../shared/constants'

import AmplifyLogo from '../../assets/logo/logo-light.svg'

type VideoPlayerProps = {
    video: VideoOnDemand | undefined
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `https://${awsvideoconfig.awsOutputVideo}/public/${video?.id}/${video?.id}.m3u8`,
                type: 'application/x-mpegURL',
            },
        ],
    }
    return <VideoPlayerComponent {...videoJsOptions} />
}

type IframeVideoPlayerProps = {
    asset: VideoOnDemand
}

const IFrameWrapper = styled.div`
    display: flex;
    background-color: black;
    justify-content: center;
`

const IframeVideoPlayer = ({ asset }: IframeVideoPlayerProps) => {
    const { width } = useWindowDimensions()

    return (
        <IFrameWrapper>
            <iframe
                width="100%"
                height={(9 * width) / 16}
                src={asset.src}
                title={asset.media?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </IFrameWrapper>
    )
}

const Card = styled.div`
    box-sizing: border-box;
`

const SectionAndDate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 20px;
`

const FormatedDate = styled.span`
    color: #666666;
    font-size: 16px;
`

const SectionName = styled.span`
    font-size: 16px;
    color: var(--amplify-primary-color);

    &:after {
        content: ' / ';
    }
`

const Title = styled.h1`
    margin-top: 25px;
    font-size: 26px;
    font-size: 44px;
    font-weight: bold;
    color: #000000;

    @media (max-width: ${screenSizes.xs}px) {
        font-size: 34px;
        flex-direction: column;
        align-items: flex-start;
    }
`

const Description = styled.p`
    margin-top: 50px;
    font-size: 22px;
    padding-bottom: 50px;
    color: #000000;
`

const AuthorAndViewCount = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: ${screenSizes.xs}px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

const Author = styled.span`
    display: flex;
    font-size: 22px;
    color: #000000;
    font-size: 30px;
    align-items: center;
    margin-bottom: 10px;

    @media (max-width: ${screenSizes.xs}px) {
        font-size: 24px;
    }
`

const AuthorImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px #000000;
    background-color: #ededed;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin-right: 15px;

    @media (max-width: ${screenSizes.xs}px) {
        width: 10vw;
        height: 10vw;
    }
`

const ViewCount = styled.span`
    color: #666666;
    font-size: 22px;
`

const VideoData = styled.div`
    padding: 0 100px;

    @media (max-width: ${screenSizes.s}px) {
        padding: 0 20px;
    }
`

const Container = styled.div``

const VideoPage = (props: PageProps) => {
    const id = props.params.id
    const [asset, setAsset] = useState<VideoOnDemand | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [mediaSections, setMediaSections] = useState<Array<MediasSections>>(
        []
    )

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodAsset(id)
                if (data?.getVideoOnDemand === null) {
                    console.error('object doesnt exist')
                } else {
                    setAsset(data?.getVideoOnDemand as VideoOnDemand)
                }
                setLoaded(true)
            } catch (error) {
                console.error('video/[id].tsx(fetchVodAsset)', error)
                setLoaded(false)
            }
        })()
    }, [fetchVodAsset])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchMediasSectionsFiltered({
                    mediaID: {
                        eq: id,
                    },
                })
                const items = data?.listMediasSections
                    ?.items as Array<MediasSections>
                setMediaSections(items)
            } catch (error) {
                console.error('video/[id].tsx(fetchMediaSections)', error)
            }
        })()
    }, [])

    return (
        <Layout>
            <Container>
                {asset === null ? (
                    <p>{loaded && 'Video Not Found'}</p>
                ) : (
                    <Card>
                        {asset.src === null ? (
                            <VideoPlayer video={asset} />
                        ) : (
                            <IframeVideoPlayer asset={asset} />
                        )}
                        <VideoData>
                            <SectionAndDate>
                                <div>
                                    {mediaSections?.map((ms) => {
                                        return (
                                            <SectionName key={ms.id}>
                                                {ms.section.label}
                                            </SectionName>
                                        )
                                    })}
                                </div>
                                <FormatedDate>
                                    {moment(asset.media?.createdAt).format(
                                        'MMM Do YYYY'
                                    )}
                                </FormatedDate>
                            </SectionAndDate>
                            <Title>{asset.media?.title}</Title>
                            <AuthorAndViewCount>
                                <Author>
                                    <AuthorImage>
                                        <AmplifyLogo width="60%" height="60%" />
                                    </AuthorImage>
                                    Author name
                                </Author>
                                <ViewCount>View count</ViewCount>
                            </AuthorAndViewCount>
                            <Description>
                                {asset.media?.description}
                            </Description>
                        </VideoData>
                    </Card>
                )}
            </Container>
        </Layout>
    )
}

export default VideoPage
