import React from 'react'
import styled from 'styled-components'
import { CustomArrowProps } from 'react-slick'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const StyledArrow = styled.div`
    position: absolute;
    cursor: pointer;
    z-index: 11;
    color: black;
    margin: -25px 15px 0 15px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: 2px solid #000000;
    transition: 300ms;

    & svg {
        transition: color 300ms;
    }

    &:hover {
        border-color: ${(props) => props.theme.palette.primary.main};
    }

    &:hover svg {
        color: ${(props) => props.theme.palette.primary.main};
    }
`

const StyledNextArrow = styled(StyledArrow)`
    right: 0;
    top: 50%;
`

const NextArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledNextArrow onClick={onClick}>
            <FaArrowRight />
        </StyledNextArrow>
    )
}

const StyledPrevArrow = styled(StyledArrow)`
    left: 0;
    top: 50%;
`

const PrevArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledPrevArrow onClick={onClick}>
            <FaArrowLeft />
        </StyledPrevArrow>
    )
}

export { NextArrow, PrevArrow }
