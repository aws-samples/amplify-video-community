import React from 'react'
import styled from 'styled-components'
import LandingLink from '../Button/Link'

const Container = styled.div`
    background-color: #242f3e;
    padding: 0 50px;
`

const ContentWrapper = styled.div`
    padding: 50px;
    display: flex;
`

type ContentProps = {
    last?: boolean
    first?: boolean
}

const Content = styled.div<ContentProps>`
    flex: 1;
    padding-left: ${(props) => (props.first ? '0' : '75px')};
    padding-right: ${(props) => (props.last ? '0' : '75px')};
`

const ContentTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 50px 0;
`

const ContentText = styled.p`
    font-size: 18px;
    color: #ffffff;
    margin: 0 0 50px 0;
`

const StyledContentLink = styled.a`
    display: flex;
    font-size: 18px;
    color: #ffffff;
    margin: 0 0 10px 0;
    text-decoration: none;
`

const Divideur = styled.div`
    border: 1px solid #e5e5e5;
    width: 100%;
`

const InfoContainer = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: center;
`

const InfoLink = styled.a`
    font-size: 12px;
    color: #ffffff;
    font-weight: 600;
    margin: 0 5px;
    text-decoration: none;
`

const NormalText = styled.p`
    font-size: 12px;
    color: #ffffff;
    margin: 0 5px;
`

const BoldLink = styled.a`
    font-weight: 600;
    margin: 0;
    text-decoration: none;
    color: #ffffff;
`

type ContentLinkProps = {
    href: string
    text: string
}

const ContentLink = ({ href, text }: ContentLinkProps) => (
    <StyledContentLink target="__blank" href={href}>
        {text}
    </StyledContentLink>
)

const Footer = () => (
    <Container>
        <ContentWrapper>
            <Content first>
                <ContentTitle>Getting started</ContentTitle>
                <ContentText>
                    Start using Amplify Video to easily incorporate video
                    streaming into your mobile and web applications.
                </ContentText>
                <LandingLink
                    redirection="https://aws.amazon.com/fr/blogs/media/introducing_aws_amplify_video/"
                    primaryColor="#ffffff"
                    secondaryColor="#242f3e"
                    text="Introducing Amplify Video"
                />
            </Content>
            <Content>
                <ContentTitle>Open source code</ContentTitle>
                <ContentText>
                    Amplify Video is an open source plugin for the Amplify CLI.
                    Take a look at the project on GitHub.
                </ContentText>
                <LandingLink
                    redirection="https://github.com/awslabs/amplify-video"
                    primaryColor="#ffffff"
                    secondaryColor="#242f3e"
                    text="GitHub Repository"
                />
            </Content>
            <Content last>
                <ContentTitle>Useful links</ContentTitle>
                <ContentLink
                    href="https://aws.amazon.com/amplify/"
                    text="AWS Amplify"
                />
                <ContentLink
                    href="https://docs.amplify.aws/"
                    text="Amplify documentation"
                />
                <ContentLink
                    href="https://aws.amazon.com/fr/media-services/"
                    text="AWS Media Services"
                />
                <ContentLink
                    href="https://github.com/awslabs/amplify-video/wiki/Getting-Started-with-Live"
                    text="Getting started with LIVE"
                />
                <ContentLink
                    href="https://github.com/awslabs/amplify-video/wiki/Getting-Started-with-VOD"
                    text="Getting started with VOD"
                />
            </Content>
        </ContentWrapper>
        <Divideur />
        <InfoContainer>
            <InfoLink target="__blank" href="/terms">
                Site Terms
            </InfoLink>
            <InfoLink target="__blank" href="/privacy">
                Privacy
            </InfoLink>
            <NormalText>
                © 2020 Amazon Web Services, Inc. or its affiliates. All rights
                reserved.
            </NormalText>
            <NormalText>
                Created by{' '}
                <BoldLink href="https://trackit.io/" target="__blank">
                    TrackIt
                </BoldLink>
            </NormalText>
        </InfoContainer>
    </Container>
)

export default Footer
