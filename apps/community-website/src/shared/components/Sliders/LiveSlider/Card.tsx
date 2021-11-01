import React from 'react'
import Loader from 'react-loader-spinner'
import { navigate } from 'gatsby'
import CSS from 'csstype'
import styled, { css } from 'styled-components'
import { VideoOnDemand, Thumbnail } from '../../../../models'

type CardContainerProps = {
    isActive: boolean
}

const ActiveCard = css`
    transform: scale(1.5);
    opacity: 1;
    z-index: 10;
`

const UnactiveCard = css`
    transform: scale(1);
    opacity: 0.5;
    z-index: 1;
`

const CardContainer = styled.div<CardContainerProps>`
    background-color: #dddddd;
    width: 30vw;
    position: relative;
    ${(props) => (props.isActive ? ActiveCard : UnactiveCard)};
    transition: transform 300ms;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    overflow: hidden;

    & img {
        width: 100%;
        margin: 0 auto;
    }
`

const Image = styled.img`
    width: 100%;
`

const LiveInformations = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    z-index: 12;
    top: 0;
    right: 0;
    height: calc(33vw * 9 / 18 * 1.5);
    width: 33%;
    padding: 10px;
`

const TopInformations = styled.div`
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
`

const StreamerImageContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: #dddddd;
`

const StreamerImage = styled.img``

const NameAndCount = styled.div`
    flex: 1;
    margin-left: 10px;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
`

const NameText = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
`

const ViewerCount = styled.p`
    font-size: 10px;
    color: #ffffff;
    margin: 0;
    width: 100%;
`

const StreamTitle = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
`
const StreamDescription = styled.p`
    font-size: 10px;
    color: #ffffff;
    margin: 0;
    width: 100%;
`

const LiveMarker = styled.div`
    top: 10px;
    left: 10px;
    background-color: #dd0000;
    position: absolute;
    z-index: 12;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 2px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LiveText = styled.span`
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
`

type VideoCardProps = {
    thumbnail:
        | {
              obj: Thumbnail | undefined
              url: string
          }
        | undefined
    vod: VideoOnDemand | undefined
    isActive: boolean
    style?: CSS.Properties
    imgStyle?: CSS.Properties
}

const VideoCard = ({ thumbnail, isActive }: VideoCardProps) => {
    const onClick = () => {
        navigate('/live')
    }

    return (
        <CardContainer isActive={isActive}>
            {!thumbnail ? (
                <Loader
                    type="Rings"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <>
                    <Image
                        src={thumbnail.url}
                        alt="thumbnail"
                        onClick={onClick}
                    />
                    {isActive && (
                        <LiveMarker>
                            <LiveText>LIVE</LiveText>
                        </LiveMarker>
                    )}
                    {isActive && (
                        <LiveInformations>
                            <TopInformations>
                                <StreamerImageContainer>
                                    <StreamerImage />
                                </StreamerImageContainer>
                                <NameAndCount>
                                    <NameText>Streamer Name</NameText>
                                    <ViewerCount>Viewer Count</ViewerCount>
                                </NameAndCount>
                            </TopInformations>
                            <StreamTitle>Stream Title</StreamTitle>
                            <StreamDescription>
                                Stream Description
                            </StreamDescription>
                        </LiveInformations>
                    )}
                </>
            )}
        </CardContainer>
    )
}

export default VideoCard
