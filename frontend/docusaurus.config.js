// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentation interne - Imbus Tunisia',
  tagline: 'Règles internes, sécurité et bonnes pratiques',
  favicon: 'img/download.jpeg',

  future: {
    v4: true,
  },

  url: 'http://localhost',
  baseUrl: '/',

  organizationName: 'imbus-tunisia',
  projectName: 'regles-internes',

  onBrokenLinks: 'throw',
i18n: {
  defaultLocale: 'fr',
  locales: ['fr', 'en'],
  localeConfigs: {
    fr: { path: 'fr' },
    en: { path: 'en' },
    
  },
},

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    image: 'img/imbus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Imbus Tunisia',
      logo: {
        alt: 'Logo Imbus',
        src: 'img/download.jpeg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Règles internes',
        },

        // Search
        {
          type: 'search',
          position: 'right',
        },

        {
          type: 'localeDropdown',
          position: 'right',
        },

        {
          to: '/login',
          label: 'Login',
          position: 'right',
        },

        {
          href: 'https://www.imbus.tn',
          label: 'Site officiel',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Règles internes', to: '/docs/regles-internes' },
          ],
        },
        {
          title: 'Entreprise',
          items: [
            { label: 'Imbus Tunisia', href: 'https://www.imbus.tn' },
            { label: 'Contact', href: 'mailto:info@imbus.tn' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Imbus Tunisia. Tous droits réservés.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

    docs: {
      versionPersistence: 'localStorage',
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  },

  plugins: [
  [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    {
      hashed: true,
      indexDocs: true,
      indexPages: true,
      indexBlog: false,
      docsRouteBasePath: '/docs',
      language: ["fr", "en"],

      searchBarShortcut: false,
    },
  ],
],

  markdown: {
    format: 'mdx',
    emoji: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn', 
    },
  },
};



export default config;