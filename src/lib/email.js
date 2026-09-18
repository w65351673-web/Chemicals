import nodemailer from 'nodemailer';

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

export function isEmailConfigured() {
  return Boolean(gmailUser && gmailAppPassword);
}

export async function sendOrderEmail({
  orderRef,
  buyer,
  shipping,
  paymentMethod,
  items,
  totals,
  notes,
}) {
  if (!isEmailConfigured()) {
    throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD environment variables are not set');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const itemsList = items
    .map(
      (item) =>
        `- ${item.name} x${item.quantity} @ €${item.price.toFixed(2)} = €${(
          item.price * item.quantity
        ).toFixed(2)}`
    )
    .join('\n');

  const subject = `New Order Request ${orderRef} from ${buyer.fullName}`;
  const text = `Order Reference: ${orderRef}

BUYER INFORMATION
-----------------
Name: ${buyer.fullName}
Email: ${buyer.email}
Phone: ${buyer.phone || 'Not provided'}

SHIPPING ADDRESS
----------------
${shipping.street}
${shipping.city}, ${shipping.postalCode}
${shipping.country}

PAYMENT METHOD
--------------
${paymentMethod}

ORDER DETAILS
-------------
${itemsList}

Subtotal: €${totals.subtotal.toFixed(2)}
Shipping: ${totals.shipping > 0 ? `€${totals.shipping.toFixed(2)}` : 'Free'}
Tax: €${totals.tax.toFixed(2)}
Total: €${totals.total.toFixed(2)}

NOTES
-----
${notes || 'No additional notes'}
`;

  const html = `
    <h2>New Order Request — ${orderRef}</h2>
    <h3>Buyer Information</h3>
    <p><strong>Name:</strong> ${buyer.fullName}</p>
    <p><strong>Email:</strong> ${buyer.email}</p>
    <p><strong>Phone:</strong> ${buyer.phone || 'Not provided'}</p>

    <h3>Shipping Address</h3>
    <p>${shipping.street}<br/>${shipping.city}, ${shipping.postalCode}<br/>${shipping.country}</p>

    <h3>Payment Method</h3>
    <p>${paymentMethod}</p>

    <h3>Order Items</h3>
    <ul>
      ${items
        .map(
          (item) =>
            `<li>${item.name} x${item.quantity} @ €${item.price.toFixed(
              2
            )} = €${(item.price * item.quantity).toFixed(2)}</li>`
        )
        .join('')}
    </ul>

    <p><strong>Subtotal:</strong> €${totals.subtotal.toFixed(2)}</p>
    <p><strong>Shipping:</strong> ${totals.shipping > 0 ? `€${totals.shipping.toFixed(2)}` : 'Free'}</p>
    <p><strong>Tax:</strong> €${totals.tax.toFixed(2)}</p>
    <p><strong>Total:</strong> €${totals.total.toFixed(2)}</p>

    <h3>Notes</h3>
    <p>${notes || 'No additional notes'}</p>
  `;

  const sellerEmail = process.env.SELLER_EMAIL || gmailUser;

  await transporter.sendMail({
    from: `"ChemicalsSite Orders" <${gmailUser}>`,
    to: sellerEmail,
    cc: buyer.email,
    replyTo: buyer.email,
    subject,
    text,
    html,
  });

  return { success: true };
}
