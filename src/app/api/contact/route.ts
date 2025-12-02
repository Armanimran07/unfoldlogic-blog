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

export async function GET() {
    try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
