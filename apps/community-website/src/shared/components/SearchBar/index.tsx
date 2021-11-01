import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import styled from 'styled-components'

const SearchBarWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 30px;
    padding: 2px;
    height: 34px;
`

const SearchBarInput = styled.input`
    background-color: #f9f9f9;
    width: 100%;
    border: none;
    border-radius: 30px;
    height: 100%;

    &:focus-visible {
        outline: none;
    }
`

const SearchBarButton = styled.button`
    background-color: #ff9900;
    height: 100%;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    padding: 0 20px;

    &:hover {
        cursor: pointer;
    }
`

const SearchBar = () => {
    return (
        <SearchBarWrapper>
            <AiOutlineSearch
                style={{
                    margin: '0 10px',
                    height: '100%',
                    width: '10%',
                }}
                size={20}
            />
            <SearchBarInput />
            <SearchBarButton>Search</SearchBarButton>
        </SearchBarWrapper>
    )
}

export default SearchBar
