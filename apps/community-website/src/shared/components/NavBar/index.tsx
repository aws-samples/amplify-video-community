import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import HeaderLink from './Link'
import Search from './Search'
import { NavbarTheme } from '../../theme'
import { useWindowDimensions } from '../../hooks'
import LogoDark from '../../../assets/logo/logo-dark.svg'
import LogoLight from '../../../assets/logo/logo-light.svg'

const Header = styled.header`
    box-sizing: border-box;
    margin: 0;
    display: flex;
    align-items: center;
    padding: 0 50px;
    background-color: ${(props) => props.theme.main};
    box-shadow: ${(props) =>
        props.minHeight === props.height ? props.theme.boxShadow : 0};
    justify-content: space-between;
    height: ${(props) => props.height}px;
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    transition: box-shadow 200ms, background-color 200ms;
`

const LogoLink = styled.a`
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 100%;
`

const LogoText = styled.span`
    color: ${(props) => props.theme.amplifyText};
    margin-left: 10px;
    font-weight: 500;
    font-size: 18px;
`

const LinkListContainer = styled.ul`
    list-style: none;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
`

const RightItemsWrapper = styled.div`
    display: flex;
    height: 100%;
`

type NavBarProps = {
    navbarTheme: NavbarTheme
    onHeightChange: (height: number) => void
    maxHeight?: number
    minHeight?: number
}

const NavBar = ({
    navbarTheme,
    onHeightChange,
    maxHeight = 9, // % of the total height of the screen
    minHeight = 5, // % of the total height of the screen
}: NavBarProps) => {
    const [groups, setGroups] = useState<Array<string>>([])
    const { height } = useWindowDimensions()
    const [navBarHeight, setNavBarHeight] = useState(height * (maxHeight / 100))

    const computedMinHeight = height * (minHeight / 100)

    const handleScroll = () => {
        const computedHeight = height * (maxHeight / 100) - window.pageYOffset
        computedHeight < computedMinHeight
            ? setNavBarHeight(computedMinHeight)
            : setNavBarHeight(computedHeight)
    }

    useEffect(() => {
        onHeightChange(navBarHeight)
    }, [navBarHeight])

    useEffect(() => {
        handleScroll()
        window.removeEventListener('scroll', handleScroll)
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [height])

    useEffect(() => {
        Auth.Credentials.get().then(() => {
            if (Auth.Credentials.getCredSource() === 'userPool') {
                Auth.currentSession().then((data) => {
                    const groupsData =
                        data.getIdToken().payload['cognito:groups']
                    if (groupsData !== undefined) setGroups(groupsData)
                })
            }
        })
    }, [])

    return (
        <Header
            id="video-community-header"
            theme={navbarTheme}
            height={navBarHeight}
            minHeight={computedMinHeight}
        >
            <LogoLink href="/">
                {navbarTheme.amplifyLogo === 'light' ? (
                    <LogoLight
                        height={(navBarHeight - 10) / 2}
                        width={navBarHeight / 2}
                    />
                ) : (
                    <LogoDark
                        height={(navBarHeight - 10) / 2}
                        width={navBarHeight / 2}
                    />
                )}

                <LogoText theme={navbarTheme}>Amplify Video</LogoText>
            </LogoLink>
            <RightItemsWrapper>
                <LinkListContainer>
                    <HeaderLink
                        theme={navbarTheme}
                        navBarHeight={navBarHeight}
                        navBarMinHeight={computedMinHeight}
                        to="/videos"
                        content="Videos"
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        to="/live"
                        content="Live"
                        navBarHeight={navBarHeight}
                        navBarMinHeight={computedMinHeight}
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        navBarMinHeight={computedMinHeight}
                        navBarHeight={navBarHeight}
                        to="/about"
                        content="About"
                    />
                    <HeaderLink
                        theme={navbarTheme}
                        navBarHeight={navBarHeight}
                        navBarMinHeight={computedMinHeight}
                        isExternal
                        to="https://docs-amplify-video.trackit.io"
                        content="Documentation"
                    />
                    {groups.includes('Admin') && (
                        <HeaderLink
                            theme={navbarTheme}
                            navBarHeight={navBarHeight}
                            navBarMinHeight={computedMinHeight}
                            to="/admin"
                            content="Admin"
                        />
                    )}
                </LinkListContainer>
                <Search theme={navbarTheme} to="/search" />
            </RightItemsWrapper>
        </Header>
    )
}

export default NavBar
