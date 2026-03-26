module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {}
    },
    {
      resolve: '@elegantstack/gatsby-theme-flexiblog-agency',
      options: {
        sources: {
          local: true
        }
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    //General Site Metadata
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
        name: 'Hotels',
        slug: '/category/hotel-and-accommodation'
      },
      {
        name: 'Flights',
        slug: '/category/flight-deals-and-airline-guides'
      },
      {
        name: 'Car Rentals',
        slug: '/category/car-rentals-and-transportation'
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
          },
          {
            name: 'Luggage & Suitcases',
            slug: '/category/luggage-and-suitcases'
          }
        ]
      }
    ],

    //Footer Menu Items (2 Sets)
    footerMenu: [
      {
        title: 'Quick Links',
        items: [
          {
            name: 'Advertise with us',
            slug: '/contact'
          },
          {
            name: 'About Us',
            slug: '/about-us'
          },
          {
            name: 'Contact Us',
            slug: '/contact'
          }
        ]
      },
      {
        title: 'Legal Stuff',
        items: [
          {
            name: 'Privacy Notice',
            slug: '/privacy-policy'
          },
          {
            name: 'Cookie Policy',
            slug: '/cookie-policy'
          },
          {
            name: 'Terms Of Use',
            slug: '/terms-conditions'
          }
        ]
      }
    ]
  }
}
