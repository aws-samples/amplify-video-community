import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link as GatsbyLink } from 'gatsby'
import { NavbarTheme } from '../../theme'

type SearchTextProps = {
    hover: boolean
    theme: NavbarTheme
}

type SearchProps = {
    to: string
    theme: NavbarTheme
}

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: ${({ dropdownMode }) => (dropdownMode ? 0 : '10px')};
`

const SearchText = styled.span<SearchTextProps>`
    color: ${(props) =>
        props.hover
            ? props.theme.searchHoverMainColor
            : props.theme.searchMainColor};
    transition: 0.2s;
    font-size: 16px;
    ${({ dropdownMode, hover }) =>
        dropdownMode && hover
            ? 'color: #ffffff'
            : dropdownMode && 'color: #000000;'}
`

const SearchButton = styled(GatsbyLink)`
    text-decoration: none;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    border: 2px solid ${(props) => props.theme.searchMainColor};
    background-color: ${(props) => props.theme.searchBgColor};
    cursor: pointer;
    border-radius: 20px;
    transition: 0.2s;
    ${({ dropdownMode }) =>
        dropdownMode &&
        'border: 2px solid #000000; background-color: transparent;'}

    &:hover {
        background-color: ${(props) => props.theme.searchHoverBgColor};
        border: 2px solid ${(props) => props.theme.searchHoverBgColor};
        ${({ dropdownMode }) =>
            dropdownMode &&
            'border: 2px solid var(--amplify-primary-color); background-color: var(--amplify-primary-color);'}
    }
`

const Search = ({ to, theme, dropdownMode }: SearchProps) => {
    const [hover, setHover] = useState(false)

    let searchColor = theme.searchMainColor
    if (hover && !dropdownMode) searchColor = theme.searchHoverMainColor
    else if (dropdownMode && hover) searchColor = '#ffffff'
    else if (dropdownMode) searchColor = '#000000'

    return (
        <SearchWrapper dropdownMode={dropdownMode}>
            <SearchButton
                theme={theme}
                to={to}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                dropdownMode={dropdownMode}
            >
                <AiOutlineSearch
                    style={{ transition: '0.2s' }}
                    size={20}
                    color={searchColor}
                />
                <SearchText
                    hover={hover}
                    theme={theme}
                    dropdownMode={dropdownMode}
                >
                    Search
                </SearchText>
            </SearchButton>
        </SearchWrapper>
    )
}

export default Search
