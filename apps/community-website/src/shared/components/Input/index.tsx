import React from 'react'
import styled, { css } from 'styled-components'

type ContainerProps = {
    last?: boolean
    multipleLine?: boolean
}

const Container = styled.div<ContainerProps>`
    display: flex;
    width: 100%;
    margin-bottom: ${(props) => (props.last ? '0' : '20px')};
`

const FieldNameContainer = styled.div`
    width: 110px;
`

const FieldName = styled.span`
    color: #000000;
    font-size: 16px;
    font-weight: 600;
`

const InputContainer = styled.div`
    flex: 1;
`

const TextInputStyle = css`
    border: 1px solid #000000;
    color: #333333;
    background-color: rgba(0, 0, 0, 0);
    font-size: 16px;
    border-radius: 5px;
    width: 100%;
    padding: 3px 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
`

const Index = styled.input`
    ${TextInputStyle};
`

const TextArea = styled.textarea`
    ${TextInputStyle};
    resize: none;
    height: 100%;
`

type Props = {
    name: string
    multipleLine?: boolean
    last?: boolean
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>
    onChangeTextArea?: React.ChangeEventHandler<HTMLTextAreaElement>
    value: string
}

const FormInput = ({
    name,
    multipleLine,
    last,
    onChangeInput,
    onChangeTextArea,
    value,
}: Props) => {
    return (
        <Container last={last} multipleLine={multipleLine}>
            <FieldNameContainer>
                <FieldName>{name}</FieldName>
            </FieldNameContainer>
            <InputContainer>
                {multipleLine ? (
                    <TextArea onChange={onChangeTextArea} value={value} />
                ) : (
                    <Index onChange={onChangeInput} value={value} />
                )}
            </InputContainer>
        </Container>
    )
}

export default FormInput
