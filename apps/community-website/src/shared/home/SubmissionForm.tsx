import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { setContentSubmission } from '../api'
import FormInput from '../components/Input'
import LandingButton from '../components/Button'
import * as APIt from '../../API'
import { screenSizes } from '../constants'

const Container = styled.div`
    padding: 100px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;

    @media (max-width: ${screenSizes.s}px) {
        padding: 100px 30px;
    }
`

const Wrapper = styled.div`
    max-width: 1000px;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
`

const Title = styled.h2`
    color: #000000;
    font-weight: 600;
    font-size: 28px;
    margin: 0;
`

const OrangeText = styled.span`
    color: #ff9900;
`

const SubTitle = styled.p`
    color: #000000;
    font-size: 22px;
    margin: 0;
`

const FormContainer = styled.div`
    display: flex;
    margin-bottom: 20px;

    @media (max-width: ${screenSizes.s}px) {
        flex-direction: column;
    }
`

type InputsWrapperType = {
    right?: boolean
}

const InputsWrapper = styled.div<InputsWrapperType>`
    flex: 1;
    ${(props) =>
        props.right
            ? css`
                  padding-left: 50px;
              `
            : css`
                  padding-right: 50px;
              `}

    @media (max-width: ${screenSizes.s}px) {
        ${(props) =>
            props.right &&
            css`
                margin-top: 20px;
            `}
        padding: 0;
    }
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-top: 55px;
`

const SubmissionForm = () => {
    const [youtubeSource, setYoutubeSource] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const parseYoutubeSource = (input: string) => {
        const url = new URL(input)
        const urlParams = new URLSearchParams(url.search)
        return urlParams.get('v')
    }

    const onSubmit = () => {
        const id: string = uuidv4()
        const youtubeID = parseYoutubeSource(youtubeSource)
        console.log(id, title, description, comment)
        if (youtubeID === '') {
            return
        }
        ;(async () => {
            try {
                await setContentSubmission({
                    id,
                    title,
                    description,
                    comment,
                    source: APIt.Source.YOUTUBE,
                    src: `https://youtube.com/embed/${youtubeID}`,
                    email,
                })
            } catch (error) {
                console.error('homepage/form.tsx(setContentSubmission):', error)
            }
            setYoutubeSource('')
            setEmail('')
            setTitle('')
            setDescription('')
            setComment('')
        })()
    }

    return (
        <Container>
            <Wrapper>
                <TitleContainer>
                    <Title>
                        You want to <OrangeText>share</OrangeText> your{' '}
                        <OrangeText>content</OrangeText> to the{' '}
                        <OrangeText>Amplify Video</OrangeText> community?
                    </Title>
                    <SubTitle>
                        Fill the form below to share with us what you’ve
                        created!
                    </SubTitle>
                </TitleContainer>
                <FormContainer>
                    <InputsWrapper>
                        <FormInput
                            name="Title*"
                            value={title}
                            onChangeInput={(e) => setTitle(e.target.value)}
                        />
                        <FormInput
                            name="Email*"
                            last
                            value={email}
                            onChangeInput={(e) => setEmail(e.target.value)}
                        />
                    </InputsWrapper>
                    <InputsWrapper right>
                        <FormInput
                            name="Youtube Url*"
                            value={youtubeSource}
                            onChangeInput={(e) =>
                                setYoutubeSource(e.target.value)
                            }
                        />
                        <FormInput
                            name="Comment"
                            last
                            value={comment}
                            onChangeInput={(e) => setComment(e.target.value)}
                        />
                    </InputsWrapper>
                </FormContainer>
                <FormInput
                    name="Description*"
                    multipleLine
                    last
                    value={description}
                    onChangeTextArea={(e) => setDescription(e.target.value)}
                />
                <ButtonWrapper>
                    <LandingButton
                        primaryColor="#ff9900"
                        onClick={() => {
                            onSubmit()
                        }}
                        text="Share content"
                    />
                </ButtonWrapper>
            </Wrapper>
        </Container>
    )
}

export default SubmissionForm
