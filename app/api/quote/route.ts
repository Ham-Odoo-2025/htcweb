import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, locale } = body;

    if (!customer?.name || !customer?.phone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required to submit an inquiry.' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one product.' },
        { status: 400 }
      );
    }

    // Generate unique reference ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const refId = `HTC-RFQ-${randomDigits}`;
    const timestamp = new Date().toISOString();

    // 1. Prepare Odoo CRM Lead Payload
    const odooLeadData = {
      name: `RFQ ${refId}: ${customer.company ? customer.company + ' - ' : ''}${customer.name} (${items.length} products)`,
      contact_name: customer.name,
      partner_name: customer.company || '',
      phone: customer.phone.startsWith('+') ? customer.phone : `+974${customer.phone}`,
      mobile: customer.phone.startsWith('+') ? customer.phone : `+974${customer.phone}`,
      email_from: customer.email || '',
      description: `
RFQ Reference: ${refId}
Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Qatar' })}
Customer Name: ${customer.name}
Company: ${customer.company || 'N/A'}
Phone: ${customer.phone}
Email: ${customer.email || 'N/A'}
Project Location/Notes: ${customer.notes || 'N/A'}

--- REQUESTED PRODUCTS ---
${items
  .map(
    (item: any, idx: number) =>
      `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - Category: ${item.category} - Unit Price: ${
        item.price > 0 ? item.price + ' QAR' : 'On Quote'
      }`
  )
  .join('\n')}
      `.trim(),
    };

    // 2. If Odoo environment variables exist, connect to Odoo via JSON-RPC
    const odooUrl = process.env.ODOO_URL;
    const odooDb = process.env.ODOO_DB;
    const odooUser = process.env.ODOO_USERNAME;
    const odooKey = process.env.ODOO_API_KEY || process.env.ODOO_PASSWORD;

    let odooLeadId: number | null = null;

    if (odooUrl && odooDb && odooUser && odooKey) {
      try {
        // Authenticate with Odoo
        const authRes = await fetch(`${odooUrl}/jsonrpc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              service: 'common',
              method: 'authenticate',
              args: [odooDb, odooUser, odooKey, {}],
            },
          }),
        });

        const authData = await authRes.json();
        const uid = authData?.result;

        if (uid) {
          // Create Lead in crm.lead
          const createRes = await fetch(`${odooUrl}/jsonrpc`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'call',
              params: {
                service: 'object',
                method: 'execute_kw',
                args: [
                  odooDb,
                  uid,
                  odooKey,
                  'crm.lead',
                  'create',
                  [odooLeadData],
                ],
              },
            }),
          });

          const createData = await createRes.json();
          odooLeadId = createData?.result || null;
          console.log(`[Odoo Lead Created Successfully]: ID ${odooLeadId}`);
        }
      } catch (odooErr) {
        console.error('[Odoo CRM Connection Failed, saving lead locally]:', odooErr);
      }
    } else {
      console.log('[Odoo Credentials not configured yet, Lead captured locally]:', odooLeadData);
    }

    // 3. Format WhatsApp Dispatch URL
    const itemsList = items
      .map((item: any) => `• ${item.quantity}x ${item.name}`)
      .join('\n');

    const whatsappMessage = `*Hamilton Fire Qatar - New Quotation Request*
*Ref:* ${refId}
*Customer:* ${customer.name}${customer.company ? ` (${customer.company})` : ''}
*Phone:* ${customer.phone}
${customer.email ? `*Email:* ${customer.email}\n` : ''}${customer.notes ? `*Notes:* ${customer.notes}\n` : ''}
*Items Required:*
${itemsList}

Please review and provide our official QCDD quotation. Thank you!`;

    const targetWhatsApp = '97455176118';
    const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    return NextResponse.json({
      success: true,
      refId,
      odooLeadId,
      whatsappUrl,
      timestamp,
    });
  } catch (err: any) {
    console.error('[Quote API Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Server error processing quotation request.' },
      { status: 500 }
    );
  }
}
