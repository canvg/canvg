// @ts-check

const branch = require('git-branch')
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const currentBranch = process.env.BRANCH || branch.sync()
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'canvg',
  tagline: 'JavaScript SVG parser and renderer on Canvas',
  url: 'https://canvg.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: false,
  organizationName: 'canvg',
  projectName: 'canvg',
  noIndex: currentBranch !== 'master',

  customFields: {
    branch: currentBranch
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/canvg/canvg/edit/master/website/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        title: 'canvg',
        logo: {
          alt: 'canvg logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'api/classes/Canvg',
            position: 'left',
            label: 'API'
          },
          {
            type: 'doc',
            docId: 'examples/index',
            position: 'left',
            label: 'Examples'
          },
          {
            href: 'https://stackoverflow.com/questions/tagged/canvg',
            label: 'Stack Overflow',
            position: 'right'
          },
          {
            href: 'https://github.com/canvg/canvg',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      },
      algolia: {
        appId: 'FO8RN9ILX3',
        apiKey: '8194866ce2d4f864774ef365471ad771',
        indexName: 'canvgjs'
      }
    },

  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        excludeExternals: true,
        readme: 'none',
        sort: ['source-order']
      }
    ]
  ]
}

module.exports = config
