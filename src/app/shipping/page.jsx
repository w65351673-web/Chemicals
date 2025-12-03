import Link from 'next/link';
import { FaShippingFast, FaBox, FaGlobeAmericas, FaClock, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

export const metadata = {
  title: 'Shipping & Delivery Policy | DarkChemSite',
  description: 'Learn about our shipping methods, delivery times, international shipping, and tracking information.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <FaShippingFast className="mr-4 text-purple-500" />
            Shipping & Delivery Policy
          </h1>
          <p className="text-gray-400">Last Updated: December 3, 2025</p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
            <FaShippingFast className="text-4xl text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-400 text-sm">Orders processed within 24-48 hours</p>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
            <FaShieldAlt className="text-4xl text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Discreet Packaging</h3>
            <p className="text-gray-400 text-sm">Unmarked, secure packaging</p>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
            <FaGlobeAmericas className="text-4xl text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Worldwide Delivery</h3>
            <p className="text-gray-400 text-sm">We ship to most countries</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-gray-300 space-y-8">
          
          {/* Processing Time */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <FaClock className="mr-3 text-purple-400" />
              1. Order Processing Time
            </h2>
            <p className="mb-4">
              All orders are carefully processed and prepared for shipment by our team:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Standard Processing:</strong> 24-48 hours (Monday-Friday)</li>
              <li><strong>Weekend Orders:</strong> Processed on the next business day</li>
              <li><strong>Holiday Orders:</strong> May experience delays during major holidays</li>
              <li><strong>Verification Required:</strong> Orders requiring additional verification may take 2-3 business days</li>
            </ul>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-blue-400">
                <strong>💡 Tip:</strong> Orders placed before 2:00 PM (CET) Monday-Friday are typically processed the same day.
              </p>
            </div>
          </section>

          {/* Shipping Methods */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <FaBox className="mr-3 text-purple-400" />
              2. Shipping Methods & Delivery Times
            </h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">2.1 Domestic Shipping (Within Country)</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-semibold">Standard Shipping</h4>
                  <span className="text-purple-400 font-bold">€15.00</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Delivery: 3-5 business days</p>
                <p className="text-sm">Reliable and cost-effective option for most orders</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-semibold">Express Shipping</h4>
                  <span className="text-purple-400 font-bold">€35.00</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Delivery: 1-2 business days</p>
                <p className="text-sm">Priority handling and expedited delivery</p>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  <h4 className="text-white font-semibold">FREE Standard Shipping</h4>
                </div>
                <p className="text-sm">On orders over €100.00</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">2.2 International Shipping</h3>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-semibold">Europe (EU)</h4>
                  <span className="text-purple-400 font-bold">€25.00</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Delivery: 5-10 business days</p>
                <p className="text-sm">Standard international shipping within European Union</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-semibold">North America</h4>
                  <span className="text-purple-400 font-bold">€45.00</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Delivery: 7-14 business days</p>
                <p className="text-sm">USA, Canada, and Mexico</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-semibold">Rest of World</h4>
                  <span className="text-purple-400 font-bold">€60.00</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Delivery: 10-21 business days</p>
                <p className="text-sm">Australia, Asia, South America, and other regions</p>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <p className="text-yellow-400">
                <strong>⚠️ Note:</strong> Delivery times are estimates and may vary due to customs processing, weather conditions, or carrier delays. We are not responsible for delays beyond our control.
              </p>
            </div>
          </section>

          {/* Discreet Packaging */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <FaShieldAlt className="mr-3 text-purple-400" />
              3. Discreet & Secure Packaging
            </h2>
            <p className="mb-4">
              We understand the importance of privacy. All orders are shipped with the utmost discretion:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Unmarked Packaging:</strong> Plain, neutral boxes or envelopes with no branding</li>
              <li><strong>Generic Sender Name:</strong> No mention of "DarkChemSite" on the package</li>
              <li><strong>Secure Sealing:</strong> Tamper-evident packaging to ensure product integrity</li>
              <li><strong>Proper Cushioning:</strong> Products are carefully packed to prevent damage</li>
              <li><strong>Confidential Labels:</strong> No product descriptions on shipping labels</li>
            </ul>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mt-4">
              <p className="text-purple-300">
                <strong>Privacy Guarantee:</strong> Your order details remain completely confidential. We never share shipping information with third parties except as required for delivery.
              </p>
            </div>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Order Tracking</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.1 Tracking Information</h3>
            <p className="mb-4">
              Once your order ships, you will receive:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Shipping Confirmation Email:</strong> Sent within 24 hours of shipment</li>
              <li><strong>Tracking Number:</strong> Unique tracking code for your order</li>
              <li><strong>Carrier Information:</strong> Name of the shipping carrier</li>
              <li><strong>Estimated Delivery Date:</strong> Expected delivery timeframe</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.2 How to Track Your Order</h3>
            <div className="bg-gray-900 rounded-lg p-6">
              <ol className="list-decimal list-inside space-y-3">
                <li className="mb-2">
                  <strong className="text-white">Check Your Email:</strong>
                  <p className="ml-6 mt-1 text-sm">Look for the shipping confirmation email from info@darkchemsite.com</p>
                </li>
                <li className="mb-2">
                  <strong className="text-white">Visit Carrier Website:</strong>
                  <p className="ml-6 mt-1 text-sm">Click the tracking link or visit the carrier's website directly</p>
                </li>
                <li className="mb-2">
                  <strong className="text-white">Enter Tracking Number:</strong>
                  <p className="ml-6 mt-1 text-sm">Input your unique tracking number to see real-time updates</p>
                </li>
                <li>
                  <strong className="text-white">Monitor Progress:</strong>
                  <p className="ml-6 mt-1 text-sm">Check regularly for status updates until delivery</p>
                </li>
              </ol>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-blue-400">
                <strong>💡 Tip:</strong> Tracking information may take 24-48 hours to become active after shipment. If you don't see updates, please wait before contacting us.
              </p>
            </div>
          </section>

          {/* International Shipping */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <FaGlobeAmericas className="mr-3 text-purple-400" />
              5. International Shipping Information
            </h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">5.1 Customs & Duties</h3>
            <p className="mb-4">
              For international orders, please be aware:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Customs Fees:</strong> You are responsible for all customs duties, taxes, and fees</li>
              <li><strong>Import Regulations:</strong> Ensure products are legal to import in your country</li>
              <li><strong>Customs Delays:</strong> Packages may be held for inspection, causing delays</li>
              <li><strong>Refused Shipments:</strong> We cannot refund orders refused due to customs issues</li>
              <li><strong>Declaration Value:</strong> We declare the actual product value on customs forms</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">5.2 Restricted Countries</h3>
            <p className="mb-4">
              We currently do not ship to the following countries due to legal restrictions:
            </p>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 mb-2">
                <strong>Shipping Restrictions:</strong>
              </p>
              <p className="text-sm">
                Please contact us at info@darkchemsite.com to verify if we can ship to your country before placing an order.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">5.3 Address Requirements</h3>
            <p className="mb-4">
              To ensure successful international delivery:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide complete and accurate address including postal code</li>
              <li>Include phone number for customs clearance</li>
              <li>Use English characters for address (if applicable)</li>
              <li>Specify any special delivery instructions</li>
            </ul>
          </section>

          {/* Delivery Issues */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Delivery Issues</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">6.1 Lost or Stolen Packages</h3>
            <p className="mb-4">
              If your package is marked as delivered but you haven't received it:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
              <li>Check with neighbors, building management, or household members</li>
              <li>Look for delivery notices or alternative drop-off locations</li>
              <li>Wait 24 hours as carriers sometimes mark packages delivered early</li>
              <li>Contact the shipping carrier directly with your tracking number</li>
              <li>If still missing after 48 hours, contact us at info@darkchemsite.com</li>
            </ol>
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> We are not responsible for packages stolen after delivery confirmation. Consider using a secure delivery location.
            </p>

            <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">6.2 Damaged Packages</h3>
            <p className="mb-4">
              If your package arrives damaged:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li><strong>Do Not Open:</strong> Keep the package sealed if possible</li>
              <li><strong>Take Photos:</strong> Document all damage to packaging and contents</li>
              <li><strong>Contact Us Immediately:</strong> Email photos within 24 hours</li>
              <li><strong>File Carrier Claim:</strong> We will assist with filing a claim</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">6.3 Wrong or Missing Items</h3>
            <p className="mb-4">
              If you receive the wrong item or items are missing:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide your order number and photos of received items</li>
              <li>We will arrange for replacement or refund</li>
              <li>Return shipping will be covered by us for our errors</li>
            </ul>
          </section>

          {/* Shipping Restrictions */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Shipping Restrictions</h2>
            <p className="mb-4">
              Due to the nature of our products, certain restrictions apply:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Research Use Only:</strong> Products must be used for legitimate research purposes</li>
              <li><strong>Legal Compliance:</strong> You are responsible for ensuring products are legal in your location</li>
              <li><strong>Age Verification:</strong> Must be 18+ to receive shipments</li>
              <li><strong>Signature Required:</strong> Some orders may require signature upon delivery</li>
              <li><strong>PO Boxes:</strong> We do not ship to PO boxes for security reasons</li>
              <li><strong>Freight Forwarders:</strong> Use of freight forwarding services is prohibited</li>
            </ul>
          </section>

          {/* Contact for Shipping */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Shipping Support</h2>
            <p className="mb-4">
              Need help with your shipment? We're here to assist:
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="mb-3"><strong className="text-white">Email:</strong> info@darkchemsite.com</p>
              <p className="mb-3"><strong className="text-white">Response Time:</strong> Within 24 hours</p>
              <p className="mb-3"><strong className="text-white">Contact Form:</strong> <Link href="/contact" className="text-purple-400 hover:text-purple-300">Click here</Link></p>
              <p className="text-sm text-gray-400 mt-4">
                Please include your order number and tracking information when contacting us about shipping issues.
              </p>
            </div>
          </section>

          {/* Shipping Tips */}
          <section className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">💡 Shipping Tips</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                <span>Double-check your shipping address before completing checkout</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                <span>Provide a phone number for delivery notifications</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                <span>Choose a secure delivery location to prevent theft</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                <span>Track your package regularly for updates</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                <span>Contact us immediately if you notice any issues</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/terms" 
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            ← Terms & Conditions
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
