import { NextResponse } from 'next/server';
import { getPosts, savePost, deletePost, Post } from '@/lib/db';

export async function GET() {
    const posts = await getPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Basic validation
        if (!body.title || !body.slug || !body.content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newPost: Post = {
            id: body.id || crypto.randomUUID(),
            title: body.title,
            slug: body.slug,
            content: body.content,
            excerpt: body.excerpt || body.content.substring(0, 150) + '...',
            author: 'Admin', // Hardcoded for now
            date: new Date().toISOString().split('T')[0],
            published: true,
            image: body.image,
            category: body.category,
            tags: body.tags,
        };

        await savePost(newPost);
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        await deletePost(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
