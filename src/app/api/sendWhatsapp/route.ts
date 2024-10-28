// app/api/sendWhatsapp/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { phone_number, message } = await req.json();

        // Forward the request to the FastAPI backend
        const fastApiResponse = await fetch('http://127.0.0.1:8000/api/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number, message }),
        });

        const data = await fastApiResponse.json();

        if (!fastApiResponse.ok) {
            return NextResponse.json({ error: data.error || 'Failed to send message' }, { status: fastApiResponse.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error forwarding request to FastAPI:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
