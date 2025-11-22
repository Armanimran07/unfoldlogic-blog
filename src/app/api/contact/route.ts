import { NextResponse } from 'next/server';
import { saveMessage, ContactMessage } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.email || !body.message || !body.name) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const newMessage: ContactMessage = {
            id: crypto.randomUUID(),
            name: body.name,
            email: body.email,
            message: body.message,
            date: new Date().toISOString(),
        };

        await saveMessage(newMessage);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
