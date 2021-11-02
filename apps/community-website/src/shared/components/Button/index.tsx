import React from 'react'
import styled, { css } from 'styled-components'
import { IconType } from 'react-icons/lib'

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    IconComponent?: IconType
    primaryColor?: string
    secondaryColor?: string
    text?: string
    last?: boolean
}

type ButtonProps = {
    primaryColor?: string
    secondaryColor?: string
    last?: boolean
    asIcon?: boolean
}

const Container = styled.button<ButtonProps>`
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

const Text = styled.span<ButtonProps>`
    color: ${(props) => props.primaryColor || '#000000'};
    font-size: 22px;
    text-align: center;
    ${(props) =>
        props.asIcon
            ? css`
                  margin-left: 10px;
              `
            : ''}
    flex: 1;
`

const LandingButton = ({
    IconComponent,
    primaryColor,
    secondaryColor,
    text,
    last,
    onClick,
}: Props) => (
    <Container
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        last={last}
        onClick={onClick}
    >
        {IconComponent && <IconComponent color={primaryColor} size={40} />}
        {text && (
            <Text asIcon={!!IconComponent} primaryColor={primaryColor}>
                {text}
            </Text>
        )}
    </Container>
)

export default LandingButton
