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

export async function GET() {
    try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching leads:", error);
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
