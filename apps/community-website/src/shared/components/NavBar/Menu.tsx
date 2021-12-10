import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import HeaderLink from './Link'
import Search from './Search'
import Dropdown from '../Dropdown'
import { useWindowDimensions } from '../../hooks'
import { screenSizes } from '../../constants'

import MenuColored from '../../../assets/logo/menu-colored.svg'
import MenuWhite from '../../../assets/logo/menu-white.svg'

const RightItemsWrapper = styled.div`
    display: flex;
    height: 100%;
`

const MenuContainer = styled.div`
    box-sizing: border-box;
    aspect-ratio: 1 / 1;
    border-radius: 7px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    transition: transform 200ms ease-in;
    &:hover {
        ${({ light }) => light && 'border: 1.5px solid #FFFFFF;'}
        ${({ light }) =>
            !light && 'border: 1.5px solid var(--amplify-primary-color);'}
    }
`

const Menu = ({ navbarTheme, navBarHeight, minHeight }) => {
    const [groups, setGroups] = useState<Array<string>>([])
    const { width } = useWindowDimensions()

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

    const dropdownMode = width <= screenSizes.m

    const ButtonsList = [
        <HeaderLink
            theme={navbarTheme}
            navBarHeight={navBarHeight}
            navBarMinHeight={minHeight}
            to="/videos"
            content="Videos"
            key="videos"
            dropdownMode={dropdownMode}
        />,
        <HeaderLink
            theme={navbarTheme}
            navBarHeight={navBarHeight}
            navBarMinHeight={minHeight}
            to="/live"
            content="Live"
            key="live"
            dropdownMode={dropdownMode}
        />,
        <HeaderLink
            theme={navbarTheme}
            navBarHeight={navBarHeight}
            navBarMinHeight={minHeight}
            to="/about"
            content="About"
            key="about"
            dropdownMode={dropdownMode}
        />,
        <HeaderLink
            theme={navbarTheme}
            navBarHeight={navBarHeight}
            navBarMinHeight={minHeight}
            isExternal
            to="https://docs.amplify-video.com"
            content="Documentation"
            key="documentation"
            dropdownMode={dropdownMode}
        />,
        <Search
            theme={navbarTheme}
            to="/search"
            key="search"
            dropdownMode={dropdownMode}
        />,
    ]

    if (groups.includes('Admin')) {
        ButtonsList.splice(
            4,
            0,
            <HeaderLink
                theme={navbarTheme}
                navBarHeight={navBarHeight}
                navBarMinHeight={minHeight}
                to="/admin"
                content="Admin"
                key="admin"
                dropdownMode={dropdownMode}
            />
        )
    }

    if (dropdownMode)
        return (
            <Dropdown list={ButtonsList} height="45%">
                <MenuContainer light={navbarTheme.amplifyLogo === 'light'}>
                    {navbarTheme.amplifyLogo === 'light' ? (
                        <MenuWhite height="80%" />
                    ) : (
                        <MenuColored height="80%" />
                    )}
                </MenuContainer>
            </Dropdown>
        )
    return <RightItemsWrapper>{ButtonsList}</RightItemsWrapper>
}

export default Menu
