import React, { useRef } from 'react'
import ReactPlayer from 'react-player'
import awsvideoconfig from '../../../aws-video-exports'
import styled from 'styled-components'
import PlayLogo from '../../../assets/logo/logo-play.svg'

const ThumbnailContainer = styled.div`
    position: relative;
    background-image: ${(props) =>
        props.playing || !props.thumbUrl ? 'none' : `url(${props.thumbUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 360px;
    height: 200px;
    border-radius: ${(props) => (props.hover ? '10px 10px 0 0' : '10px')};
    overflow: hidden;
`

const TransparentOverlay = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(50, 50, 50, 0.5);
    width: 100%;
    height: 100%;
    border-top-right-radius: 10px;
    top: 0;
    transition: opacity 200ms;
    opacity: ${(props) => (props.visible ? 1 : 0)};
`

const Thumbnail = ({ video, videoStatus }) => {
    const playerRef = useRef<ReactPlayer>(null)

    return (
        <ThumbnailContainer
            thumbUrl={
                video.vod
                    ? video.vod?.media?.source === 'SELF'
                        ? video.thumbnail?.url
                        : video.thumbnail?.obj?.src
                    : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
            }
            hover={videoStatus.playing}
        >
            <ReactPlayer
                ref={playerRef}
                style={{ opacity: videoStatus.playing ? '1' : '0' }}
                width="100%"
                height="100%"
                url={
                    video.vod
                        ? video.vod?.media?.source === 'SELF'
                            ? `https://${awsvideoconfig.awsOutputVideo}/public/${video.vod?.id}/${video.vod?.id}.m3u8`
                            : video.vod?.src
                        : video.url
                }
                controls={false}
                playing={videoStatus.playing}
                muted
                config={{
                    youtube: {
                        playerVars: {
                            controls: 0,
                            rel: 0,
                        },
                    },
                }}
            />
            <TransparentOverlay visible={videoStatus.playing}>
                <PlayLogo />
            </TransparentOverlay>
        </ThumbnailContainer>
    )
}

export default Thumbnail
