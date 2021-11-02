import React from 'react'
import styled from 'styled-components'
import { CustomArrowProps } from 'react-slick'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const StyledArrow = styled.div`
    display: flex;
    position: absolute;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    background: white;
    color: black;
    box-shadow: 0 4px 5px rgb(100 100 100 / 40%);
    transition: box-shadow 300ms;

    & svg {
        transition: color 300ms;
    }

    &:hover {
        box-shadow: 0 2px 10px rgb(100 100 100 / 40%);

        & svg {
            color: ${(props) => props.theme.palette.primary.main};
        }
    }
`

const StyledNextArrow = styled(StyledArrow)`
    right: 25px;
`

const NextArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledNextArrow onClick={onClick}>
            <FaArrowRight />
        </StyledNextArrow>
    )
}

const StyledPrevArrow = styled(StyledArrow)`
    left: 25px;
`

const PrevArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledPrevArrow onClick={onClick}>
            <FaArrowLeft />
        </StyledPrevArrow>
    )
}

export { NextArrow, PrevArrow }
