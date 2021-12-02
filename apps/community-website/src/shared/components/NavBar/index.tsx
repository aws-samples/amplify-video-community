import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Menu from './Menu'
import { NavbarTheme } from '../../theme'
import { useWindowDimensions } from '../../hooks'
import LogoDark from '../../../assets/logo/logo-dark.svg'
import LogoLight from '../../../assets/logo/logo-light.svg'
import { screenSizes } from '../../constants'

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

type NavBarProps = {
    navbarTheme: NavbarTheme
    onHeightChange: (height: number) => void
    maxHeight?: number
    minHeight?: number
}

const NavBar = ({
    navbarTheme,
    onHeightChange,
    maxHeight = 110,
    minHeight = 76,
}: NavBarProps) => {
    const { height, width } = useWindowDimensions()
    const [navBarHeight, setNavBarHeight] = useState(maxHeight)

    const handleScroll = () => {
        const computedHeight = maxHeight - window.pageYOffset
        computedHeight < minHeight
            ? setNavBarHeight(minHeight)
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

    return (
        <Header
            id="video-community-header"
            theme={navbarTheme}
            height={navBarHeight}
            minHeight={minHeight}
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

                {width > screenSizes.xs && (
                    <LogoText theme={navbarTheme}>Amplify Video</LogoText>
                )}
            </LogoLink>
            <Menu
                navbarTheme={navbarTheme}
                navBarHeight={navBarHeight}
                minHeight={minHeight}
                dropdownMode={width <= screenSizes.m}
            />
        </Header>
    )
}

export default NavBar
