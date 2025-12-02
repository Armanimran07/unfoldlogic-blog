import { supabase } from './supabase';

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: string;
    date: string;
    published: boolean;
    image?: string;
    category?: string;
    tags?: string[];
}

export interface Lead {
    id: string;
    email: string;
    name?: string;
    date: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
}

export async function getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching post by slug:', error);
        return undefined;
    }

    return data;
}

export async function savePost(post: Post): Promise<void> {
    // Check if post exists to decide between insert and update
    const { data: existing } = await supabase
        .from('posts')
        .select('id')
        .eq('id', post.id)
        .single();

    if (existing) {
        const { error } = await supabase
            .from('posts')
            .update(post)
            .eq('id', post.id);

        if (error) {
            console.error('Supabase Error (Update):', JSON.stringify(error, null, 2));
            throw error;
        }
    } else {
        const { error } = await supabase
            .from('posts')
            .insert([post]);

        if (error) {
            console.error('Supabase Error (Insert):', JSON.stringify(error, null, 2));
            throw error;
        }
    }
}

export async function deletePost(id: string): Promise<void> {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

export async function saveLead(lead: Lead): Promise<void> {
    const { error } = await supabase
        .from('leads')
        .insert([lead]);

    if (error) throw error;
}

export async function getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching leads:', error);
        return [];
    }

    return data || [];
}

export async function saveMessage(message: ContactMessage): Promise<void> {
    const { error } = await supabase
        .from('messages')
        .insert([message]);

    if (error) throw error;
}

export async function getMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }

    return data || [];
}

export async function getRecommendedPosts(currentSlug: string): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .neq('slug', currentSlug)
        .limit(3)
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching recommended posts:', error);
        return [];
    }

    return data || [];
}
