import React from 'react'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import styled from 'styled-components'

const VideoPlayerWrapper = styled.div`
    margin: auto;
    width: 100%;
`

export default class Index extends React.Component<videojs.PlayerOptions> {
    private player?: videojs.Player
    private videoNode?: HTMLVideoElement
    private options?: videojs.PlayerOptions

    constructor(props: videojs.PlayerOptions) {
        super(props)
        this.options = props
        this.player = undefined
        this.videoNode = undefined
    }

    componentDidMount() {
        this.player = videojs(this.videoNode, this.options).ready(function () {
            return
        })
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <VideoPlayerWrapper>
                <div data-vjs-player>
                    <video
                        ref={(node: HTMLVideoElement) => {
                            this.videoNode = node
                        }}
                        className="vjs-fluid video-js vjs-default-skin vjs-big-play-centered"
                    />
                </div>
            </VideoPlayerWrapper>
        )
    }
}
