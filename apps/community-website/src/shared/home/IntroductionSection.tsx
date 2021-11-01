import React from 'react'
import styled from 'styled-components'
import { FaAws, FaGithub } from 'react-icons/fa'
import LandingButton from '../components/Button/Link'
import Logo from '../../assets/logo/logo-dark.svg'

const Container = styled.div`
    background-color: #f9f9f9;
    padding: 100px;
`

const Wrapper = styled.div`
    display: flex;
`

const TextContainer = styled.div`
    flex: 1;
    padding-right: 50px;
`

const LogoContainer = styled.div`
    padding-left: 50px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`

const TitleWrapper = styled.div`
    margin-bottom: 50px;
`

const Title = styled.p`
    color: ${(props) => props.color || '#000000'};
    font-size: 48px;
    font-weight: 600;
    margin: 0;
`

const DescriptionWrapper = styled.div`
    margin-bottom: 50px;
`

type DescriptionTextProps = {
    marginBottom?: string
}

const DescriptionText = styled.p<DescriptionTextProps>`
    font-size: 22px;
    color: #000000;
    margin: 0 0 ${(props) => props.marginBottom || '0'} 0;
`

const IntroductionSection = () => (
    <Container>
        <Wrapper>
            <TextContainer>
                <TitleWrapper>
                    <Title color="#ff9900">Amplify Video</Title>
                    <Title>Live and VOD.</Title>
                </TitleWrapper>
                <DescriptionWrapper>
                    <DescriptionText marginBottom="30">
                        Amplify Video is an open source category for AWS Amplify
                        that simplifies the development of serverless
                        video-enabled web applications.
                    </DescriptionText>
                    <DescriptionText>
                        With Amplify Video, you can build live streaming or
                        video-on-demand integrated web applications in minutes.
                    </DescriptionText>
                </DescriptionWrapper>
                <LandingButton
                    IconComponent={FaAws}
                    primaryColor="#ff9900"
                    text="Introducing AWS Amplify Video"
                    redirection="https://aws.amazon.com/fr/blogs/media/introducing_aws_amplify_video/"
                />
                <LandingButton
                    IconComponent={FaGithub}
                    primaryColor="#000000"
                    text="Github repository"
                    redirection="https://github.com/awslabs/amplify-video"
                    last
                />
            </TextContainer>
            <LogoContainer>
                <Logo width={340} height={340} className="testClassName" />
            </LogoContainer>
        </Wrapper>
    </Container>
)

export default IntroductionSection
