import React from 'react'
import styled from 'styled-components'
import { IconType } from 'react-icons/lib'

type Props = {
    IconComponent?: IconType
    primaryColor?: string
    secondaryColor?: string
    text?: string
    last?: boolean
    redirection?: string
}

type WithColorProps = {
    primaryColor?: string
    secondaryColor?: string
    last?: boolean
}

const Container = styled.a<WithColorProps>`
    background-color: rgba(0, 0, 0, 0);
    border: 2px solid ${(props) => props.primaryColor || '#000000'};
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    margin: 0 0 ${(props) => (props.last ? '0' : '20px')} 0;
    text-decoration: none;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.primaryColor || '#000000'};
    }

    &:hover span {
        color: ${(props) => props.secondaryColor || '#ffffff'};
    }

    &:hover svg {
        color: ${(props) => props.secondaryColor || '#ffffff'} !important;
    }
`

const Text = styled.span<WithColorProps>`
    color: ${(props) => props.primaryColor || '#000000'};
    font-size: 22px;
    text-align: center;
    margin-left: 10px;
    flex: 1;
`

const LandingLink = ({
    IconComponent,
    primaryColor,
    secondaryColor,
    text,
    last,
    redirection,
}: Props) => (
    <Container
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        last={last}
        href={redirection}
        target="__blank"
    >
        {IconComponent && <IconComponent color={primaryColor} size={40} />}
        {text && <Text primaryColor={primaryColor}>{text}</Text>}
    </Container>
)

export default LandingLink
