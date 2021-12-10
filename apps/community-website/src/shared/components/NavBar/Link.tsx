import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { NavbarTheme } from '../../theme'

const InternalLink = styled(GatsbyLink)`
    text-decoration: none;
    padding: 0 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${(props) =>
        props.dropdownMode ? '#000000' : props.theme.textColor};

    &:hover {
        color: ${(props) =>
            props.dropdownMode
                ? 'var(--amplify-primary-color)'
                : props.theme.textHoverColor};
    }
`

const LinkText = styled.span`
    color: inherit;
`

const Item = styled.li`
    display: flex;
    white-space: nowrap;
    cursor: pointer;
    border-bottom: 0 solid ${(props) => props.theme.textHoverColor};
    transition: border-bottom 100ms ease-out;
    box-sizing: content-box;
    ${({ dropdownMode }) => dropdownMode && 'flex: 1; height: 100%;'}

    &:hover {
        ${(props) =>
            !props.dropdownMode &&
            `border-bottom: ${props.borderHeight}px solid
            ${props.theme.textHoverColor}`};
    }
`

const ExternalLink = styled.a`
    text-decoration: none;
    padding: 0 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${(props) =>
        props.dropdownMode ? '#000000' : props.theme.textColor};

    &:hover {
        color: ${(props) =>
            props.dropdownMode
                ? 'var(--amplify-primary-color)'
                : props.theme.textHoverColor};
    }
`

type HeaderLinkProps = {
    theme: NavbarTheme
    to: string
    content: string
    isExternal?: boolean
    navBarHeight: number
    dropdownMode: boolean
}

const HeaderLink = ({
    to,
    content,
    isExternal,
    theme,
    navBarHeight,
    navBarMinHeight,
    dropdownMode,
}: HeaderLinkProps) => {
    const borderHeight = (navBarHeight - navBarMinHeight) / 8 + 2
    if (isExternal)
        return (
            <Item
                theme={theme}
                borderHeight={borderHeight}
                dropdownMode={dropdownMode}
            >
                <ExternalLink
                    theme={theme}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    dropdownMode={dropdownMode}
                >
                    <LinkText>{content}</LinkText>
                </ExternalLink>
            </Item>
        )
    return (
        <Item
            theme={theme}
            borderHeight={borderHeight}
            dropdownMode={dropdownMode}
        >
            <InternalLink dropdownMode={dropdownMode} to={to} theme={theme}>
                <LinkText>{content}</LinkText>
            </InternalLink>
        </Item>
    )
}

export default HeaderLink
