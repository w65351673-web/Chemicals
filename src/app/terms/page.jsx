import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | DarkChemSite',
  description: 'Terms and Conditions for DarkChemSite - Read our terms of service, user agreements, and legal policies.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-gray-400">Last Updated: December 3, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-gray-300 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              Welcome to DarkChemSite. By accessing or using our website, mobile application, or services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services.
            </p>
            <p className="mb-4">
              These Terms constitute a legally binding agreement between you ("User," "you," or "your") and DarkChemSite ("Company," "we," "us," or "our").
            </p>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold">
                ⚠️ IMPORTANT: Our products are intended for research and laboratory use only. Not for human consumption.
              </p>
            </div>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Eligibility</h2>
            <p className="mb-4">To use our Services, you must:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be prohibited from using our Services under applicable laws</li>
              <li>Be a qualified researcher, laboratory, or institution</li>
              <li>Comply with all local, state, national, and international laws</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              By using our Services, you represent and warrant that you meet all eligibility requirements.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Account Registration</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">3.1 Account Creation</h3>
            <p className="mb-4">To purchase products, you must create an account. You agree to:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">3.2 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these Terms, fraudulent activity, or any other reason at our sole discretion.
            </p>
          </section>

          {/* Products and Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Products and Services</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.1 Product Information</h3>
            <p className="mb-4">
              We strive to provide accurate product descriptions, images, and specifications. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.2 Research Use Only</h3>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
              <p className="font-semibold mb-2">All products sold on DarkChemSite are:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Intended for research and laboratory use ONLY</li>
                <li>NOT for human or animal consumption</li>
                <li>NOT for medical, therapeutic, or recreational use</li>
                <li>To be handled by qualified professionals only</li>
                <li>Subject to proper storage and handling requirements</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.3 Pricing</h3>
            <p className="mb-4">
              All prices are listed in Euros (€) and are subject to change without notice. We reserve the right to modify prices at any time. Prices do not include applicable taxes, duties, or shipping fees unless otherwise stated.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.4 Product Availability</h3>
            <p>
              Product availability is subject to change. We reserve the right to limit quantities, discontinue products, or refuse orders at our discretion.
            </p>
          </section>

          {/* Orders and Payment */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Orders and Payment</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">5.1 Order Acceptance</h3>
            <p className="mb-4">
              Your order is an offer to purchase products. We reserve the right to accept or reject any order for any reason. Order confirmation does not guarantee acceptance. We will notify you if your order is rejected.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">5.2 Payment</h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li>Payment must be made at the time of order</li>
              <li>We accept major credit cards and other payment methods via Stripe</li>
              <li>All payments are processed securely through our payment processor</li>
              <li>You authorize us to charge your payment method for the total amount</li>
              <li>Payment information must be accurate and current</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">5.3 Order Verification</h3>
            <p>
              We may require additional verification for orders, including but not limited to proof of identity, research credentials, or institutional affiliation.
            </p>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Shipping and Delivery</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">6.1 Shipping Policy</h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li>Shipping times are estimates and not guaranteed</li>
              <li>We are not responsible for delays caused by shipping carriers</li>
              <li>Risk of loss passes to you upon delivery to the carrier</li>
              <li>You are responsible for providing accurate shipping information</li>
              <li>Additional customs fees, duties, or taxes may apply for international orders</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">6.2 Discreet Packaging</h3>
            <p>
              All orders are shipped in discreet, unmarked packaging to protect your privacy.
            </p>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Returns and Refunds</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">7.1 Return Policy</h3>
            <p className="mb-4">
              Due to the nature of our products, we have a strict return policy:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Defective Products:</strong> Must be reported within 48 hours of delivery</li>
              <li><strong>Wrong Items:</strong> Must be reported within 48 hours of delivery</li>
              <li><strong>Damaged in Transit:</strong> Must be reported within 24 hours with photographic evidence</li>
              <li><strong>Non-Returnable:</strong> Opened, used, or improperly stored products cannot be returned</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">7.2 Refund Process</h3>
            <p className="mb-4">
              Approved refunds will be processed within 7-14 business days to the original payment method. Shipping fees are non-refundable unless the error was ours.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">7.3 Chargebacks</h3>
            <p>
              Initiating a chargeback without contacting us first may result in account termination and legal action.
            </p>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Prohibited Uses</h2>
            <p className="mb-4">You agree NOT to use our Services to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate any local, state, national, or international law</li>
              <li>Purchase products for human or animal consumption</li>
              <li>Resell products without authorization</li>
              <li>Misrepresent your identity, credentials, or intended use</li>
              <li>Engage in fraudulent activities or payment disputes</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our Services</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Collect user information without consent</li>
              <li>Post or transmit harmful, illegal, or offensive content</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">9.1 Our Content</h3>
            <p className="mb-4">
              All content on our website, including text, graphics, logos, images, software, and design, is owned by or licensed to DarkChemSite and protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">9.2 Limited License</h3>
            <p className="mb-4">
              We grant you a limited, non-exclusive, non-transferable license to access and use our Services for personal, non-commercial purposes. You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Reproduce, distribute, or modify our content</li>
              <li>Use our trademarks or branding without permission</li>
              <li>Create derivative works from our content</li>
              <li>Reverse engineer or decompile our software</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Disclaimers and Warranties</h2>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">10.1 AS-IS Basis</h3>
              <p className="mb-4">
                OUR SERVICES AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Merchantability or fitness for a particular purpose</li>
                <li>Accuracy, reliability, or completeness of content</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security or freedom from viruses</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">10.2 Product Quality</h3>
            <p>
              While we strive to provide high-quality products, we do not guarantee specific results, purity levels, or suitability for your particular research needs.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Limitation of Liability</h2>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <p className="mb-4 font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, DARKCHEMSITE SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Personal injury or property damage</li>
                <li>Misuse of products or failure to follow safety guidelines</li>
                <li>Actions of third parties (shipping carriers, payment processors)</li>
                <li>Unauthorized access to your account or information</li>
              </ul>
              <p className="mt-4">
                Our total liability shall not exceed the amount you paid for the specific product or service giving rise to the claim.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless DarkChemSite, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
              <li>Your use or misuse of our Services or products</li>
              <li>Violation of these Terms</li>
              <li>Violation of any laws or regulations</li>
              <li>Infringement of third-party rights</li>
              <li>Your negligence or willful misconduct</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">13.1 Informal Resolution</h3>
            <p className="mb-4">
              Before filing a claim, you agree to contact us at info@darkchemsite.com to attempt to resolve the dispute informally.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">13.2 Arbitration</h3>
            <p className="mb-4">
              Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration association.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">13.3 Class Action Waiver</h3>
            <p>
              You agree to resolve disputes on an individual basis and waive the right to participate in class actions or class arbitrations.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles. Any legal action must be brought in the courts located in [Your Jurisdiction].
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our Services after changes constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">16. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">17. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any other legal notices published on our website, constitute the entire agreement between you and DarkChemSite.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">18. Contact Us</h2>
            <p className="mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="mb-2"><strong className="text-white">Email:</strong> info@darkchemsite.com</p>
              <p className="mb-2"><strong className="text-white">Website:</strong> <Link href="/contact" className="text-purple-400 hover:text-purple-300">Contact Form</Link></p>
              <p><strong className="text-white">Response Time:</strong> We aim to respond within 48 hours</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Acknowledgment</h2>
            <p className="mb-4">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
            </p>
            <p>
              You further acknowledge and accept full responsibility for the proper use and handling of our products.
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/privacy" 
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            ← Privacy Policy
          </Link>
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
