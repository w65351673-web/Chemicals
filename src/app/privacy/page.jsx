import Link from 'next/link';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://darkchemsite.com'),
  title: 'Privacy Policy | DarkChemSite',
  description: 'Privacy Policy for DarkChemSite - Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last Updated: December 3, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-gray-300 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to DarkChemSite ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p>
              By accessing or using DarkChemSite, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">2.1 Personal Information</h3>
            <p className="mb-4">We may collect the following personal information:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Account Information:</strong> Name, email address, username, and password</li>
              <li><strong>Contact Information:</strong> Phone number, billing address, and shipping address</li>
              <li><strong>Payment Information:</strong> Credit card details, billing information (processed securely through Stripe)</li>
              <li><strong>Order Information:</strong> Purchase history, order details, and preferences</li>
              <li><strong>Communication Data:</strong> Messages sent through our contact form or customer support</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">2.2 Automatically Collected Information</h3>
            <p className="mb-4">When you visit our website, we automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device type</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referring URLs</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address</li>
              <li><strong>Cookies and Tracking:</strong> Session cookies, preference cookies, analytics cookies</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Order Processing:</strong> To process and fulfill your orders, including payment processing and shipping</li>
              <li><strong>Account Management:</strong> To create and manage your account, authenticate users, and provide customer support</li>
              <li><strong>Communication:</strong> To send order confirmations, shipping updates, and respond to inquiries</li>
              <li><strong>Marketing:</strong> To send promotional emails, newsletters, and special offers (with your consent)</li>
              <li><strong>Website Improvement:</strong> To analyze usage patterns, improve our services, and enhance user experience</li>
              <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other illegal activities</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms of service</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. How We Share Your Information</h2>
            <p className="mb-4">We may share your information with:</p>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.1 Service Providers</h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Payment Processors:</strong> Stripe for secure payment processing</li>
              <li><strong>Shipping Partners:</strong> Courier services for order delivery</li>
              <li><strong>Email Services:</strong> Postmark for transactional emails</li>
              <li><strong>Analytics:</strong> Google Analytics for website analytics (anonymized data)</li>
              <li><strong>Customer Support:</strong> LiveChat for customer service</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.2 Legal Requirements</h3>
            <p className="mb-4">We may disclose your information if required by law, court order, or government request, or to:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li>Comply with legal obligations</li>
              <li>Protect our rights, property, or safety</li>
              <li>Prevent fraud or illegal activities</li>
              <li>Enforce our Terms of Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p className="mb-4">We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Encryption:</strong> SSL/TLS encryption for data transmission</li>
              <li><strong>Secure Storage:</strong> Encrypted databases and secure servers</li>
              <li><strong>Access Controls:</strong> Limited access to personal information</li>
              <li><strong>Payment Security:</strong> PCI-DSS compliant payment processing through Stripe</li>
              <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              <strong>Note:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality (login, cart, checkout)</li>
              <li><strong>Analytics Cookies:</strong> To understand how visitors use our site</li>
              <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> To deliver relevant advertisements (with consent)</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Privacy Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">7.1 General Rights</h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Object:</strong> Object to certain data processing activities</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">7.2 GDPR Rights (EU Users)</h3>
            <p className="mb-4">If you are in the European Union, you have additional rights under GDPR:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
              <li>Right to lodge a complaint with supervisory authority</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">7.3 CCPA Rights (California Users)</h3>
            <p className="mb-4">If you are a California resident, you have rights under CCPA:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to opt-out of sale of personal information</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>

            <p className="mt-4">
              To exercise your rights, please contact us at{' '}
              <a href="mailto:info@darkchemsite.com" className="text-purple-400 hover:text-purple-300">
                info@darkchemsite.com
              </a>
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
            <p className="mb-4">We retain your information for as long as necessary to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide our services and fulfill orders</li>
              <li>Comply with legal obligations (tax records, transaction history)</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Prevent fraud and maintain security</li>
            </ul>
            <p className="mt-4">
              Typically, we retain account information for 7 years after account closure, and transaction records for 10 years for tax and legal compliance.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Children's Privacy</h2>
            <p>
              Our services are intended for users aged 18 and older. We do not knowingly collect personal information from individuals under 18. If we become aware that we have collected information from a minor, we will take steps to delete it immediately.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable laws.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
            <p className="mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="mb-2"><strong className="text-white">Email:</strong> info@darkchemsite.com</p>
              <p className="mb-2"><strong className="text-white">Website:</strong> <Link href="/contact" className="text-purple-400 hover:text-purple-300">Contact Form</Link></p>
              <p><strong className="text-white">Response Time:</strong> We aim to respond within 48 hours</p>
            </div>
          </section>

          {/* Consent */}
          <section className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Consent</h2>
            <p>
              By using DarkChemSite, you consent to our Privacy Policy and agree to its terms. If you do not agree with this policy, please discontinue use of our services immediately.
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
