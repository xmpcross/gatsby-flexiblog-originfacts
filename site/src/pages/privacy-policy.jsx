import React from 'react'
import { Main, Layout, Stack, Sidebar } from '@layout'
import Divider from '@components/Divider'
import Sticky from '@components/Sticky'
import LegalDocument from '../components/LegalDocument'
import PageTitle from '@components/PageTitle'
import Seo from '@widgets/Seo'
import { Box, Heading, Link, Text } from 'theme-ui'

const privacyHtml = String.raw`
<p><strong>Last updated: March 27, 2026</strong></p>

<p>Welcome to OriginFacts ("we", "us", or "our"). We operate the website <strong>originfacts.com</strong> (the "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.</p>

<h2>1. Information We Collect</h2>

<h3>Information You Provide Directly</h3>
<p>We may collect personal information that you voluntarily provide when you:</p>
<ul>
  <li>Subscribe to our newsletter</li>
  <li>Submit a contact form or send us an email</li>
  <li>Leave a comment on a post</li>
  <li>Enter a promotion, survey, or contest</li>
</ul>
<p>This information may include your name, email address, and any message content you provide.</p>

<h3>Information Collected Automatically</h3>
<p>When you visit our Site, certain information is collected automatically by our servers and third-party services, including:</p>
<ul>
  <li><strong>Log data:</strong> IP address, browser type, operating system, referring URLs, pages viewed, and timestamps</li>
  <li><strong>Cookies and tracking technologies:</strong> We use cookies and similar technologies to enhance your browsing experience and analyse Site traffic (see Section 5 below)</li>
  <li><strong>Device information:</strong> Hardware model, operating system version, unique device identifiers</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>We use the information we collect for the following purposes:</p>
<ul>
  <li>To operate, maintain, and improve our Site and content</li>
  <li>To send you newsletters and updates you have subscribed to</li>
  <li>To respond to your comments, questions, and requests</li>
  <li>To monitor and analyse usage patterns and trends</li>
  <li>To detect, prevent, and address technical issues or fraudulent activity</li>
  <li>To comply with applicable laws and regulations</li>
</ul>

<h2>3. Sharing Your Information</h2>
<p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:</p>
<ul>
  <li><strong>Service providers:</strong> We work with third-party vendors (such as email marketing platforms, analytics providers, and hosting services) who assist us in operating the Site. These parties are contractually obligated to keep your information confidential.</li>
  <li><strong>Legal requirements:</strong> We may disclose your information if required by law or in response to valid legal processes (e.g., a court order or government request).</li>
  <li><strong>Business transfers:</strong> If OriginFacts is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
  <li><strong>Protection of rights:</strong> We may disclose information to enforce our Terms and Conditions or protect the rights, property, or safety of OriginFacts, our users, or others.</li>
</ul>

<h2>4. Third-Party Services</h2>
<p>Our Site integrates with the following third-party services, each of which may collect and process data independently according to their own privacy policies:</p>
<ul>
  <li><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our Site. Google Analytics uses cookies and collects anonymised data. You can opt out via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</li>
  <li><strong>Algolia:</strong> We use Algolia to power our Site search functionality. Search queries may be processed by Algolia's servers. See <a href="https://www.algolia.com/policies/privacy/" target="_blank" rel="noopener noreferrer">Algolia's Privacy Policy</a>.</li>
  <li><strong>Mailchimp:</strong> If you subscribe to our newsletter, your email address is stored and processed by Mailchimp (Intuit Inc.). See <a href="https://www.intuit.com/privacy/statement/" target="_blank" rel="noopener noreferrer">Mailchimp's Privacy Policy</a>.</li>
  <li><strong>GraphComment:</strong> We use GraphComment for blog post comments. Comments you submit may be processed and stored by GraphComment. See <a href="https://graphcomment.com/en/privacy-policy.html" target="_blank" rel="noopener noreferrer">GraphComment's Privacy Policy</a>.</li>
  <li><strong>Travelpayouts:</strong> Our Site displays travel deals and widgets powered by Travelpayouts affiliate network. These widgets may use cookies to track referrals. See <a href="https://www.travelpayouts.com/en/privacy-policy" target="_blank" rel="noopener noreferrer">Travelpayouts' Privacy Policy</a>.</li>
</ul>

<h2>5. Cookies</h2>
<p>Cookies are small text files stored on your device when you visit a website. We use the following types of cookies:</p>
<ul>
  <li><strong>Essential cookies:</strong> Necessary for the Site to function correctly (e.g., session management).</li>
  <li><strong>Analytics cookies:</strong> Help us understand how visitors use the Site (e.g., Google Analytics).</li>
  <li><strong>Marketing cookies:</strong> Used by third-party affiliate networks (e.g., Travelpayouts) to track referral activity.</li>
</ul>
<p>You can control or disable cookies through your browser settings. Note that disabling certain cookies may affect Site functionality. For more details, see our <a href="/cookie-policy">Cookie Policy</a>.</p>

<h2>6. Affiliate Disclosure</h2>
<p>OriginFacts participates in affiliate marketing programmes, including the Travelpayouts network. This means we may earn a commission when you click on certain links or book travel products through our Site at no additional cost to you. Affiliate links are used to help fund free content on this Site.</p>

<h2>7. Data Retention</h2>
<p>We retain your personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Newsletter subscribers' data is retained until they unsubscribe. Comment data may be retained by third-party comment providers per their own policies.</p>

<h2>8. Your Rights</h2>
<p>Depending on your location, you may have the following rights regarding your personal data:</p>
<ul>
  <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
  <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete data.</li>
  <li><strong>Deletion:</strong> Request that we delete your personal data.</li>
  <li><strong>Objection:</strong> Object to the processing of your data for certain purposes.</li>
  <li><strong>Portability:</strong> Request your data in a structured, machine-readable format.</li>
  <li><strong>Withdrawal of consent:</strong> Withdraw consent for data processing where we rely on consent as the legal basis.</li>
</ul>
<p>To exercise any of these rights, please contact us at <a href="mailto:privacy@originfacts.com">privacy@originfacts.com</a>.</p>

<h2>9. Children's Privacy</h2>
<p>Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will take steps to delete it.</p>

<h2>10. Security</h2>
<p>We implement reasonable technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

<h2>11. Links to Other Websites</h2>
<p>Our Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before providing any personal information.</p>

<h2>12. Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of the Site after any changes constitutes your acceptance of the updated policy.</p>

<h2>13. Contact Us</h2>
<p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
<ul>
  <li><strong>Website:</strong> <a href="/contact">originfacts.com/contact</a></li>
  <li><strong>Email:</strong> <a href="mailto:privacy@originfacts.com">privacy@originfacts.com</a></li>
</ul>
`

const buildTocAndHtml = html => {
  const headings = []
  const processed = html.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    headings.push({ text, id })
    return `<h2 id="${id}">${text}</h2>`
  })
  return { headings, processed }
}

const { headings, processed: processedHtml } = buildTocAndHtml(privacyHtml)

const tocStyles = {
  wrapper: {
    position: 'sticky',
    top: 4,
    p: 3,
    bg: 'omegaLightest',
    borderRadius: 'default',
    border: '1px solid',
    borderColor: 'omegaLighter'
  },
  title: {
    fontFamily: 'Urbanist',
    fontWeight: 700,
    fontSize: '1rem',
    mb: 3,
    pb: 2,
    borderBottom: '2px solid',
    borderColor: 'omegaLight'
  },
  link: {
    display: 'block',
    fontSize: '0.85rem',
    color: 'omegaDark',
    textDecoration: 'none',
    py: '0.35rem',
    lineHeight: 1.4,
    borderLeft: '2px solid transparent',
    pl: 2,
    transition: 'all 0.2s',
    '&:hover': {
      color: 'alpha',
      borderLeftColor: 'alpha',
      pl: 3
    }
  }
}

const PagePrivacyPolicy = props => (
  <Layout {...props}>
    <Seo title='Privacy Policy' />
    <Divider />
    <Stack sx={{ mt: [null, 0], mb: [null, 0] }}>
      <Main>
        <PageTitle
          header='Privacy Policy'
          headingSx={{ fontSize: ['2rem', '2rem', '2rem', '2rem'] }}
        />
        <Text sx={{ fontSize: ['1rem', '1rem', '1rem', '2rem'], color: 'omegaDark', mt: 2 }}>
          How OriginFacts collects, uses, and protects personal information.
        </Text>
        <Divider />
        <LegalDocument html={processedHtml} />
      </Main>
      <Sidebar sx={{ pl: [0, 0, 4], flexBasis: ['100%', '100%', '280px'], flexShrink: 0 }}>
        <Sticky>
          <Box sx={tocStyles.wrapper}>
            <Heading as='h4' sx={tocStyles.title}>Table of Contents</Heading>
            {headings.map(({ text, id }) => (
              <Link key={id} href={`#${id}`} sx={tocStyles.link}>
                {text}
              </Link>
            ))}
          </Box>
        </Sticky>
      </Sidebar>
    </Stack>
  </Layout>
)

export default PagePrivacyPolicy
