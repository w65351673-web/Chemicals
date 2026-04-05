import Link from 'next/link';
import { FaUndo, FaExclamationTriangle, FaCheckCircle, FaClock, FaEnvelope, FaTimesCircle } from 'react-icons/fa';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://darkchemsite.com'),
  title: 'Return & Refund Policy | DarkChemSite',
  description: 'Learn about our return policy, refund process, and how to request returns for defective or incorrect products.',
  alternates: {
    canonical: '/refund',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <FaUndo className="mr-4 text-purple-500" />
            Return & Refund Policy
          </h1>
          <p className="text-gray-400">Last Updated: December 3, 2025</p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-yellow-400 text-2xl mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Important Notice</h3>
              <p className="text-gray-300">
                Due to the nature of research chemicals and safety regulations, we have a strict return policy. 
                Please read this policy carefully before making a purchase. All sales are final unless the product 
                is defective, damaged, or incorrect.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <FaCheckCircle className="text-green-400 text-2xl mr-3" />
              <h3 className="text-white font-semibold">Eligible for Return</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Defective products</li>
              <li>• Damaged during shipping</li>
              <li>• Wrong items received</li>
              <li>• Missing items from order</li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <FaTimesCircle className="text-red-400 text-2xl mr-3" />
              <h3 className="text-white font-semibold">NOT Eligible for Return</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Opened or used products</li>
              <li>• Change of mind</li>
              <li>• Incorrect product ordered by customer</li>
              <li>• Products past return window</li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-gray-300 space-y-8">
          
          {/* Return Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Return Eligibility</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">1.1 Acceptable Return Reasons</h3>
            <p className="mb-4">We accept returns ONLY in the following circumstances:</p>
            
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="text-white font-semibold mb-2">✅ Defective Products</h4>
                <p className="text-sm mb-2">Products that are damaged, contaminated, or do not meet quality standards</p>
                <p className="text-xs text-gray-400">Timeframe: Must be reported within 48 hours of delivery</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="text-white font-semibold mb-2">✅ Shipping Damage</h4>
                <p className="text-sm mb-2">Products damaged during transit with visible packaging damage</p>
                <p className="text-xs text-gray-400">Timeframe: Must be reported within 24 hours with photos</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="text-white font-semibold mb-2">✅ Wrong Items Shipped</h4>
                <p className="text-sm mb-2">You received a different product than what you ordered</p>
                <p className="text-xs text-gray-400">Timeframe: Must be reported within 48 hours of delivery</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="text-white font-semibold mb-2">✅ Missing Items</h4>
                <p className="text-sm mb-2">Items listed on your order are missing from the package</p>
                <p className="text-xs text-gray-400">Timeframe: Must be reported within 48 hours of delivery</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">1.2 Non-Returnable Items</h3>
            <p className="mb-4">The following items CANNOT be returned or refunded:</p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <FaTimesCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Opened or Used Products</p>
                  <p className="text-sm">Once the seal is broken or product is used, it cannot be returned for safety and legal reasons</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaTimesCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Change of Mind</p>
                  <p className="text-sm">We do not accept returns due to buyer's remorse or change of research plans</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaTimesCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Customer Error</p>
                  <p className="text-sm">If you ordered the wrong product, we cannot accept returns</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaTimesCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Expired Return Window</p>
                  <p className="text-sm">Returns must be requested within the specified timeframe</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaTimesCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Improperly Stored Products</p>
                  <p className="text-sm">Products damaged due to improper storage or handling by customer</p>
                </div>
              </div>
            </div>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <FaClock className="mr-3 text-purple-400" />
              2. Return Process
            </h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">2.1 How to Request a Return</h3>
            <div className="bg-gray-900 rounded-lg p-6">
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">1</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Contact Us Immediately</p>
                    <p className="text-sm">Email <a href="mailto:info@darkchemsite.com" className="text-purple-400 hover:text-purple-300">info@darkchemsite.com</a> within the specified timeframe</p>
                    <p className="text-xs text-gray-400 mt-1">Include: Order number, product name, and reason for return</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">2</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Provide Evidence</p>
                    <p className="text-sm">Take clear photos of the product, packaging, and any damage</p>
                    <p className="text-xs text-gray-400 mt-1">Photos must show: Product label, packaging damage, defect details</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">3</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Wait for Approval</p>
                    <p className="text-sm">Our team will review your request within 24-48 hours</p>
                    <p className="text-xs text-gray-400 mt-1">We may request additional information or photos</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">4</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Receive Return Authorization</p>
                    <p className="text-sm">If approved, you'll receive a Return Authorization (RA) number</p>
                    <p className="text-xs text-gray-400 mt-1">Do NOT return items without an RA number</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">5</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Ship the Product Back</p>
                    <p className="text-sm">Package securely and include RA number on the package</p>
                    <p className="text-xs text-gray-400 mt-1">Use trackable shipping method (we'll provide prepaid label if our error)</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">6</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Receive Refund or Replacement</p>
                    <p className="text-sm">Once we receive and inspect the return, we'll process your refund or send replacement</p>
                    <p className="text-xs text-gray-400 mt-1">Processing time: 7-14 business days</p>
                  </div>
                </li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">2.2 Return Shipping</h3>
            <div className="space-y-3">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">✅ Our Error (Defective, Wrong, or Damaged Items)</p>
                <p className="text-sm">We will provide a prepaid return shipping label. You will NOT be charged for return shipping.</p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">❌ Customer Error or Change of Mind</p>
                <p className="text-sm">Returns are not accepted for customer errors or change of mind. All sales are final.</p>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Refund Policy</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">3.1 Refund Methods</h3>
            <p className="mb-4">Approved refunds will be issued using the following methods:</p>
            
            <div className="bg-gray-900 rounded-lg p-6 space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Original Payment Method</p>
                <p className="text-sm">Refunds are issued to the original payment method used for purchase</p>
                <ul className="text-xs text-gray-400 mt-2 ml-4 space-y-1">
                  <li>• Credit/Debit Card: 5-10 business days</li>
                  <li>• Bank Transfer: 7-14 business days</li>
                  <li>• Other Methods: Up to 14 business days</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-white mb-2">Store Credit (Optional)</p>
                <p className="text-sm">You may choose to receive store credit instead of a refund</p>
                <ul className="text-xs text-gray-400 mt-2 ml-4 space-y-1">
                  <li>• Instant credit to your account</li>
                  <li>• 10% bonus credit (e.g., €100 refund = €110 store credit)</li>
                  <li>• No expiration date</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">3.2 Refund Amount</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaCheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Product Price</p>
                  <p className="text-sm">Full refund of the product price</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaCheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Shipping Fees (Our Error Only)</p>
                  <p className="text-sm">Original shipping fees refunded if the error was ours</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaTimesCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Shipping Fees (Customer Error)</p>
                  <p className="text-sm">Shipping fees are non-refundable for customer errors</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaTimesCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Return Shipping Costs</p>
                  <p className="text-sm">Deducted from refund if customer is responsible for return</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3 mt-6">3.3 Partial Refunds</h3>
            <p className="mb-4">In some cases, we may issue a partial refund:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Products returned without original packaging</li>
              <li>Products with minor defects that don't affect research use</li>
              <li>Products returned after the standard return window (case-by-case basis)</li>
              <li>Products with missing accessories or documentation</li>
            </ul>
          </section>

          {/* Replacement Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Replacement Policy</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.1 When Replacements Are Offered</h3>
            <p className="mb-4">We offer replacements for:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              <li>Defective products (subject to availability)</li>
              <li>Wrong items shipped</li>
              <li>Damaged products during shipping</li>
              <li>Missing items from your order</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">4.2 Replacement Process</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>Request return authorization as described above</li>
                <li>Indicate you prefer a replacement instead of refund</li>
                <li>We'll check product availability</li>
                <li>If available, replacement ships within 2-3 business days</li>
                <li>If unavailable, we'll offer refund or alternative product</li>
              </ol>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-blue-400">
                <strong>💡 Note:</strong> Replacements are subject to product availability. If the product is out of stock, we'll offer a full refund or equivalent alternative.
              </p>
            </div>
          </section>

          {/* Damaged or Defective */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Damaged or Defective Products</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">5.1 Inspection Upon Delivery</h3>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
              <p className="text-yellow-400 font-semibold mb-2">⚠️ IMPORTANT: Inspect Immediately</p>
              <p className="text-sm">
                Inspect your package immediately upon delivery. If you notice any damage to the packaging or products, 
                take photos and contact us within 24 hours.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">5.2 Required Documentation</h3>
            <p className="mb-4">To process a claim for damaged or defective products, you must provide:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Clear Photos:</strong> Multiple angles of the product and packaging</li>
              <li><strong>Product Label:</strong> Visible product information and batch number</li>
              <li><strong>Packaging Damage:</strong> Photos of any external damage to the box/envelope</li>
              <li><strong>Defect Details:</strong> Clear description of the defect or damage</li>
              <li><strong>Order Information:</strong> Order number and date of delivery</li>
            </ul>
          </section>

          {/* Cancellations */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Order Cancellations</h2>
            
            <h3 className="text-xl font-semibold text-purple-400 mb-3">6.1 Before Shipment</h3>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="font-semibold text-white mb-2">✅ Cancellation Possible</p>
              <p className="text-sm">
                You may cancel your order for a full refund if it hasn't been processed or shipped yet. 
                Contact us immediately at <a href="mailto:info@darkchemsite.com" className="text-purple-400 hover:text-purple-300">info@darkchemsite.com</a> with your order number.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">6.2 After Shipment</h3>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">❌ Cancellation Not Possible</p>
              <p className="text-sm">
                Once an order has shipped, it cannot be cancelled. You must follow the return process 
                if you no longer want the product (subject to our return policy).
              </p>
            </div>
          </section>

          {/* Chargebacks */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Chargebacks and Disputes</h2>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3">⚠️ Important Chargeback Policy</h3>
              <p className="mb-4">
                Filing a chargeback or payment dispute without first contacting us is considered fraud and may result in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Immediate account termination</li>
                <li>Blacklisting from future purchases</li>
                <li>Legal action to recover costs</li>
                <li>Reporting to fraud prevention agencies</li>
              </ul>
              <p className="text-yellow-400 font-semibold">
                Please contact us first at <a href="mailto:info@darkchemsite.com" className="text-purple-400 hover:text-purple-300">info@darkchemsite.com</a>. We're committed to resolving all issues fairly and promptly.
              </p>
            </div>
          </section>

          {/* Contact for Returns */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <FaEnvelope className="mr-3 text-purple-400" />
              8. Contact Us for Returns
            </h2>
            <p className="mb-4">
              Have questions about returns or need to start a return request?
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="mb-3"><strong className="text-white">Email:</strong> <a href="mailto:info@darkchemsite.com" className="text-purple-400 hover:text-purple-300">info@darkchemsite.com</a></p>
              <p className="mb-3"><strong className="text-white">Subject Line:</strong> Return Request - Order #[Your Order Number]</p>
              <p className="mb-3"><strong className="text-white">Response Time:</strong> Within 24 hours</p>
              <p className="mb-3"><strong className="text-white">Contact Form:</strong> <Link href="/contact" className="text-purple-400 hover:text-purple-300">Click here</Link></p>
              
              <div className="bg-gray-800 p-4 rounded-lg mt-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">Include in Your Email:</strong></p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Order number</li>
                  <li>• Product name and quantity</li>
                  <li>• Reason for return</li>
                  <li>• Photos of product/damage (if applicable)</li>
                  <li>• Preferred resolution (refund or replacement)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">📋 Quick Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-white mb-2">Return Window:</p>
                <ul className="text-sm space-y-1">
                  <li>• Defective: 48 hours</li>
                  <li>• Damaged: 24 hours</li>
                  <li>• Wrong item: 48 hours</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Refund Time:</p>
                <ul className="text-sm space-y-1">
                  <li>• Processing: 7-14 days</li>
                  <li>• Credit card: 5-10 days</li>
                  <li>• Bank transfer: 7-14 days</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/shipping" 
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            ← Shipping Policy
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
