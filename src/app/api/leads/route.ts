import { NextResponse } from 'next/server';
import { saveLead, Lead } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const newLead: Lead = {
            id: crypto.randomUUID(),
            email: body.email,
            name: body.name,
            date: new Date().toISOString(),
        };

        await saveLead(newLead);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }
}
