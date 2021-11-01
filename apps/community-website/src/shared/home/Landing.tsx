import React, { useRef } from 'react'
import styled from 'styled-components'
import intro from '../../videos/introduction-video.mp4'

const LandingContainer = styled.div`
    background-color: black;
    width: 100%;
    height: 100vh;
`

const VideoPlayer = styled.video`
    object-fit: cover;
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
`

const Landing = () => {
    const videoRef = useRef<HTMLVideoElement>(null)

    return (
        <LandingContainer>
            <VideoPlayer ref={videoRef} muted loop autoPlay id="amplifyVideo">
                <source src={intro} type="video/mp4" />
            </VideoPlayer>
        </LandingContainer>
    )
}

export default Landing
