import React from 'react'
import Layout from '../shared/components/Layout'
import styled from 'styled-components'

const NotFoundContent = styled.div`
    display: flex;
    height: 65vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const Title = styled.h2`
    font-size: 4rem;
    font-weight: 800;
    line-height: 0.1rem;
    display: contents;
`

const SubTitle = styled.h4`
    font-size: 1.25rem;
    font-weight: 500;
    padding-bottom: 1.375rem;
`

const Link = styled.a`
    border-radius: 0.25rem;
    cursor: pointer;
    box-shadow: rgb(204, 204, 204) 0.125rem 0.125rem 0 0.125rem;
    padding: 0.5625rem 0.75rem 0.5rem;
    margin-top: 1rem;
    background-color: #fff;
    font-size: 1rem;
    appearance: none;
    color: inherit;
    text-decoration: none;
    transition: all 0.25s ease 0s;
    font-weight: 400;

    &:hover {
        box-shadow: rgb(204, 204, 204) 0.1875rem 0.1875rem 0 0.1875rem;
        transform: translate(-0.0625rem, -0.0625rem);
    }
`

const NotFoundPage = () => {
    return (
        <Layout>
            <NotFoundContent>
                <Title>404</Title>
                <SubTitle>Page Not Found</SubTitle>
                <Link href="/">Return Home</Link>
            </NotFoundContent>
        </Layout>
    )
}

export default NotFoundPage
