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
  orderChannel = 'email',
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
Preferred Contact: ${orderChannel}

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

  const orderDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e8e4dd;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#14110F;">
            ${item.name}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8e4dd;font-size:14px;color:#14110F;text-align:center;">
            ${item.quantity}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8e4dd;font-size:14px;color:#14110F;text-align:right;">
            &euro;${item.price.toFixed(2)}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8e4dd;font-size:14px;color:#14110F;text-align:right;font-weight:600;">
            &euro;${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Order ${orderRef}</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F3EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F3EC;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Email container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(20,17,15,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#14110F;padding:28px 32px;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:500;color:#F7F3EC;letter-spacing:0.5px;">
                ChemicalsSite
              </h1>
              <p style="margin:6px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#C8A97E;">
                Order Confirmation
              </p>
            </td>
          </tr>

          <!-- Order ref banner -->
          <tr>
            <td style="background-color:#FAF6EE;border-bottom:1px solid #e8e4dd;padding:20px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8A8070;">Order Reference</p>
                    <p style="margin:4px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:600;color:#14110F;">${orderRef}</p>
                  </td>
                  <td style="text-align:right;vertical-align:top;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8A8070;">Date</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#14110F;">${orderDate}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Buyer & Shipping info -->
          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="vertical-align:top;padding-right:16px;">
                    <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#C8A97E;font-weight:600;">Buyer Details</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#14110F;">${buyer.fullName}</p>
                    <p style="margin:4px 0;font-size:14px;color:#4a4540;">
                      <a href="mailto:${buyer.email}" style="color:#C8A97E;text-decoration:none;">${buyer.email}</a>
                    </p>
                    <p style="margin:4px 0;font-size:14px;color:#4a4540;">${buyer.phone || 'No phone provided'}</p>
                    <p style="margin:0;font-size:14px;color:#4a4540;">Contact: <span style="text-transform:capitalize;">${orderChannel}</span></p>
                  </td>
                  <td width="50%" style="vertical-align:top;padding-left:16px;">
                    <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#C8A97E;font-weight:600;">Ship To</p>
                    <p style="margin:0;font-size:14px;color:#14110F;line-height:1.6;">
                      ${shipping.street}<br/>
                      ${shipping.city}, ${shipping.postalCode}<br/>
                      ${shipping.country}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Payment method -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6EE;border-radius:4px;border:1px solid #e8e4dd;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8A8070;">Payment Method</p>
                    <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#14110F;text-transform:capitalize;">&#8383; ${paymentMethod}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:28px 32px 0;">
              <div style="border-top:1px solid #e8e4dd;"></div>
            </td>
          </tr>

          <!-- Order items table -->
          <tr>
            <td style="padding:24px 32px 0;">
              <p style="margin:0 0 16px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#C8A97E;font-weight:600;">Order Items</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <thead>
                  <tr style="background-color:#FAF6EE;">
                    <th style="padding:10px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8A8070;font-weight:600;border-bottom:2px solid #e8e4dd;">Product</th>
                    <th style="padding:10px 16px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8A8070;font-weight:600;border-bottom:2px solid #e8e4dd;">Qty</th>
                    <th style="padding:10px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8A8070;font-weight:600;border-bottom:2px solid #e8e4dd;">Price</th>
                    <th style="padding:10px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8A8070;font-weight:600;border-bottom:2px solid #e8e4dd;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 16px 4px;text-align:right;font-size:14px;color:#8A8070;">Subtotal</td>
                  <td style="padding:12px 16px 4px;text-align:right;font-size:14px;color:#14110F;width:100px;">&euro;${totals.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 16px;text-align:right;font-size:14px;color:#8A8070;">Shipping</td>
                  <td style="padding:4px 16px;text-align:right;font-size:14px;color:#14110F;width:100px;">${totals.shipping > 0 ? `&euro;${totals.shipping.toFixed(2)}` : 'Free'}</td>
                </tr>
                <tr>
                  <td style="padding:4px 16px;text-align:right;font-size:14px;color:#8A8070;">Tax</td>
                  <td style="padding:4px 16px;text-align:right;font-size:14px;color:#14110F;width:100px;">&euro;${totals.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:8px 16px 0;">
                    <div style="border-top:2px solid #14110F;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px 0;text-align:right;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:600;color:#14110F;">Total</td>
                  <td style="padding:12px 16px 0;text-align:right;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:600;color:#14110F;width:100px;">&euro;${totals.total.toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          ${notes ? `
          <!-- Notes -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6EE;border-radius:4px;border:1px solid #e8e4dd;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#8A8070;font-weight:600;">Customer Notes</p>
                    <p style="margin:0;font-size:14px;color:#14110F;line-height:1.6;">${notes}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Next steps -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#14110F;border-radius:4px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:16px;font-weight:600;color:#F7F3EC;">What happens next?</p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 12px 6px 0;vertical-align:top;">
                          <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background-color:#C8A97E;color:#14110F;font-size:12px;font-weight:700;">1</span>
                        </td>
                        <td style="padding:6px 0;font-size:14px;color:#d4cfc8;line-height:1.5;">We review your order and reply with a Bitcoin wallet address and the exact amount.</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 12px 6px 0;vertical-align:top;">
                          <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background-color:#C8A97E;color:#14110F;font-size:12px;font-weight:700;">2</span>
                        </td>
                        <td style="padding:6px 0;font-size:14px;color:#d4cfc8;line-height:1.5;">Send the Bitcoin payment to the provided address.</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 12px 6px 0;vertical-align:top;">
                          <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background-color:#C8A97E;color:#14110F;font-size:12px;font-weight:700;">3</span>
                        </td>
                        <td style="padding:6px 0;font-size:14px;color:#d4cfc8;line-height:1.5;">Once payment is confirmed, your order ships discreetly.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FAF6EE;border-top:1px solid #e8e4dd;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#8A8070;">
                This email was sent by <strong style="color:#14110F;">ChemicalsSite</strong>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#a8a090;">
                If you did not place this order, please disregard this message.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Email container -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>`;

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
