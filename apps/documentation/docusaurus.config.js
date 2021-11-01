// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Amplify Video",
  tagline:
    "An open source plugin for the Amplify CLI to incorporate video streaming into mobile and web app powered by AWS Amplify and AWS Media Services",
  url: "https://docs-amplify-video.trackit.io/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Amazon Web Service", // Usually your GitHub org/user name.
  projectName: "amplify-video", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/trackit/amplify-video-community/edit/main/apps/documentation/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/main/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        content: `⭐️ If you like Amplify Video, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/awslabs/amplify-video">GitHub</a>!`,
      },
      navbar: {
        title: "Amplify Video",
        logo: {
          alt: "Amplify logo",
          src: "img/favicon.ico",
        },
        items: [
          {
            type: "doc",
            docId: "CLI/Installation",
            position: "left",
            label: "Documentation",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/awslabs/amplify-video",
            className: "header-github-link",
            "aria-label": "GitHub repository",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Learn",
            items: [
              {
                label: "UnicornFlix Workshop",
                href: "https://github.com/awslabs/unicornflix",
              },
              {
                label: "UnicornTrivia Workshop",
                href: "https://github.com/awslabs/aws-amplify-unicorntrivia-workshop",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discussions",
                href: "https://github.com/awslabs/amplify-video/discussions",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/amplify",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Getting Started",
                to: "/docs/CLI/Installation",
              },
              {
                label: "Support",
                href: "https://github.com/awslabs/amplify-video/issues",
              },
              {
                label: "AWS Amplify Docs",
                href: "https://docs.amplify.aws/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/awslabs/amplify-video",
              },
            ],
          },
        ],
        logo: {
          alt: "Facebook Open Source Log",
          src: "img/logo.png",
          href: "/docs/CLI/Installation",
        },
        copyright: `© ${new Date().getFullYear()} Amazon Web Services, Inc. or its affiliates. All rights reserved. Created by <a href="https://trackit.io/" target="__blank">TrackIt</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
