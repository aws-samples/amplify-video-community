module.exports = {
    siteMetadata: {
        title: 'Amplify Video Community',
        titleTemplate: '%s',
        description:
            'Amplify Video Community is a community website created by TrackIt using Amplify only.',
        url: 'https://amplify-video-community.trackit.io',
        image: 'src/images/favicon.png',
        twitterUsername: '@TrackItCloud',
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'content',
                path: `${__dirname}/content/`,
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /assets/,
                },
            },
        },
        'gatsby-plugin-image',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sharp',
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        `gatsby-transformer-sharp`,
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false,
                            backgroundColor: 'transparent',
                        },
                    },
                ],
            },
        },
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/favicon.png',
            },
        },
    ],
}
