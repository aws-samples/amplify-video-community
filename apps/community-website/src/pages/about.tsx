import React from 'react'
import Layout from '../shared/components/Layout'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import HTMLParser from 'html-react-parser'

const PostContent = styled.div`
    padding: 5%;
`

const About = ({ data }: PageProps) => (
    <Layout>
        <PostContent>
            {HTMLParser(data.about.childMarkdownRemark.html)}
        </PostContent>
    </Layout>
)

export const pageQuery = graphql`
    query {
        about: file(relativePath: { eq: "about.md" }) {
            id
            childMarkdownRemark {
                id
                html
            }
        }
    }
`

export default About
