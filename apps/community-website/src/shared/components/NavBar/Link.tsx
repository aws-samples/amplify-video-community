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
    color: ${(props) => props.theme.textColor};

    &:hover {
        color: ${(props) => props.theme.textHoverColor};
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

    &:hover {
        border-bottom: ${(props) => props.borderHeight}px solid
            ${(props) => props.theme.textHoverColor};
    }
`

const ExternalLink = styled.a`
    text-decoration: none;
    padding: 0 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${(props) => props.theme.textColor};

    &:hover {
        color: ${(props) => props.theme.textHoverColor};
    }
`

type HeaderLinkProps = {
    theme: NavbarTheme
    to: string
    content: string
    isExternal?: boolean
    navBarHeight: number
}

const HeaderLink = ({
    to,
    content,
    isExternal,
    theme,
    navBarHeight,
    navBarMinHeight,
}: HeaderLinkProps) => {
    const borderHeight = (navBarHeight - navBarMinHeight) / 8 + 2
    if (isExternal)
        return (
            <Item theme={theme} borderHeight={borderHeight}>
                <ExternalLink
                    theme={theme}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkText>{content}</LinkText>
                </ExternalLink>
            </Item>
        )
    return (
        <Item theme={theme} borderHeight={borderHeight}>
            <InternalLink to={to} theme={theme}>
                <LinkText>{content}</LinkText>
            </InternalLink>
        </Item>
    )
}

export default HeaderLink
