require('dotenv').config()

const mailchimpEndpoint = process.env.GATSBY_MAILCHIMP_ENDPOINT
const gaTrackingId = process.env.GATSBY_GA_TRACKING_ID

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/xml-sitemap'
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {}
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        chunkSize: 10000,
        queries: require('@elegantstack/gatsby-blog-algolia/src/queries'),
        continueOnFailure: true
      }
    },
    ...(mailchimpEndpoint && mailchimpEndpoint.length >= 40 ? [{
      resolve: 'gatsby-plugin-mailchimp',
      options: { endpoint: mailchimpEndpoint }
    }] : []),
    ...(gaTrackingId && gaTrackingId.startsWith('G-') ? [{
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [gaTrackingId],
        pluginConfig: { head: true }
      }
    }] : []),
    {
      resolve: '@elegantstack/gatsby-theme-flexiblog-agency',
      options: {
        darkMode: false,
        sources: {
          local: true
        },
        services: {
          algolia: true,
          graphComment: true,
          mailchimp: true
        },
        collectionPostsPerPage: 9
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    //General Site Metadata
    siteUrl: 'https://www.originfacts.com',
    title: 'FlexiBlog Theme',
    name: 'FlexiBlog',
    description: 'My site description...',
    address: 'New York, NY',
    email: 'email@example.com',
    phone: '+1 (888) 888-8888',

    //Site Social Media Links
    social: [
      {
        name: 'Github',
        url: 'https://github.com/gatsbyjs'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/gatsbyjs'
      },
      {
        name: 'Instagram',
        url: 'https://github.com/gatsbyjs'
      }
    ],

    //Header Menu Items
    headerMenu: [
      {
        name: 'Destination Guides',
        slug: '/category/destination-guides'
      },
      {
        name: 'Travel Tips',
        slug: '/category/travel-tips',
        items: [
          {
            name: 'Car Rentals & Transportation',
            slug: '/category/car-rentals-and-transportation'
          },
          {
            name: 'Flight Deals & Airline Guides',
            slug: '/category/flight-deals-and-airline-guides'
          },
          {
            name: 'Hotel & Accommodation',
            slug: '/category/hotel-and-accommodation'
          }
        ]
      },
      {
        name: 'Tours & Activities',
        slug: '/category/tours-and-activities'
      },
      {
        name: 'Travel Resources',
        slug: '/category/travel-resources',
        items: [
          {
            name: 'Travel Credit Cards',
            slug: '/category/travel-credit-cards'
          },
          {
            name: 'Travel Gear & Accessories',
            slug: '/category/travel-gear-and-accessories'
          },
          {
            name: 'Travel Insurance',
            slug: '/category/travel-insurance'
          }
        ]
      }
    ],

    //Footer Menu Items (2 Sets)
    footerMenu: [
      {
        title: 'Originfacts',
        items: [
          {
            name: 'Home',
            slug: '/'
          },
          {
            name: 'About Us',
            slug: '/about-us'
          },
          {
            name: 'Sitemap',
            slug: '/sitemap'
          },
          {
            name: 'Contact Us',
            slug: '/contact'
          }
        ]
      },
      {
        title: 'Categories',
        items: [
          {
            name: 'Destination Guides',
            slug: '/category/destination-guides'
          },
          {
            name: 'Hotel & Accommodation',
            slug: '/category/hotel-and-accommodation'
          },
          {
            name: 'Car Rentals',
            slug: '/category/car-rentals-and-transportation'
          },
          {
            name: 'Flight & Airline Guides',
            slug: '/category/flight-deals-and-airline-guides'
          },
          {
            name: 'Tours & Activities',
            slug: '/category/tours-and-activities'
          },
          {
            name: 'Travel Resources',
            slug: '/category/travel-resources',
            items: [
              {
                name: 'Travel Credit Cards',
                slug: '/category/travel-credit-cards'
              },
              {
                name: 'Travel Gear & Accessories',
                slug: '/category/travel-gear-and-accessories'
              },
              {
                name: 'Travel Insurance',
                slug: '/category/travel-insurance'
              }
            ]
          }
        ]
      },
      {
        title: 'Useful Links',
        items: [
          {
            name: 'Privacy Policy',
            slug: '/privacy-policy'
          },
          {
            name: 'Cookie Policy',
            slug: '/cookie-policy'
          },
          {
            name: 'Terms & Conditions',
            slug: '/terms-conditions'
          }
        ]
      }
    ]
  }
}
