import { supabase } from "@/lib/supabase";
import BlogPostClient from "./BlogPostClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { data: post } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!post) {
        return {
            title: 'Artículo no encontrado | FiberGravity',
            description: 'El artículo que buscas no existe o ha sido movido.'
        };
    }

    return {
        title: `${post.title} | Blog FiberGravity`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://fibergravity.mx/blog/${slug}`,
            images: [
                {
                    url: post.cover_image || 'https://via.placeholder.com/1200x630',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
            type: 'article',
            publishedTime: post.created_at,
            authors: [post.author_name || 'FiberGravity Team'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.cover_image || 'https://via.placeholder.com/1200x630'],
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data: post } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(name)')
        .eq('slug', slug)
        .single();

    return <BlogPostClient initialPost={post} slug={slug} />;
}
