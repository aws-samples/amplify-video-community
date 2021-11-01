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

type VideoPlayerProps = {
    video: VideoOnDemand | undefined
}

const VideoPlayerWrapper = styled.div`
    background: black;
`

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
    return (
        <VideoPlayerWrapper>
            {<VideoPlayerComponent {...videoJsOptions} />}
        </VideoPlayerWrapper>
    )
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
    return (
        <IFrameWrapper>
            <iframe
                width="1280"
                height="720"
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

const BreadCrumb = styled.div`
    padding-top: 20px;
    padding-bottom: 13px;
    font-size: 14px;
    color: #000000;
    &:first-child {
        color: #666666;
    }
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
    color: #ff9900;

    &:after {
        content: ' / ';
    }
`

const Title = styled.h1`
    margin-top: 10px;
    font-size: 26px;
`

const Description = styled.p`
    font-size: 22px;
    margin-top: 30px;
    padding-bottom: 50px;
`

const AuthorAndViewCount = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

const Author = styled.span`
    display: flex;
    font-size: 22px;
    color: #000000;
    align-items: center;
`

const AuthorImage = styled.div`
    background-color: #c4c4c4;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin-right: 20px;
`

const ViewCount = styled.span`
    color: #666666;
    font-size: 22px;
`

const Container = styled.div`
    background-color: #f9f9f9;
    padding: 0 100px;
`

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
                        <BreadCrumb>
                            <span>Video / </span>
                            <span>{asset.media?.title}</span>
                        </BreadCrumb>
                        {asset.src === null ? (
                            <VideoPlayer video={asset} />
                        ) : (
                            <IframeVideoPlayer asset={asset} />
                        )}
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
                                <AuthorImage />
                                Author name
                            </Author>
                            <ViewCount>View count</ViewCount>
                        </AuthorAndViewCount>
                        <Description>{asset.media?.description}</Description>
                    </Card>
                )}
            </Container>
        </Layout>
    )
}

export default VideoPage
