import { supabase } from "@/lib/supabase";
import BlogListClient from "./BlogListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Blog | FiberGravity',
    description: 'Explora noticias, tips y novedades sobre internet, tecnología y entretenimiento con FiberGravity.',
    openGraph: {
        title: 'Blog | FiberGravity',
        description: 'Conectando ideas y tecnología. Lee nuestros últimos artículos.',
        images: ['https://fibergravity.mx/og-blog.jpg'], // Placeholder
    }
};

export default async function BlogPage() {
    // Fetch initial data on the server
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(name)')
        .eq('published', true)
        .order('created_at', { ascending: false });

    const { data: categories } = await supabase
        .from('blog_categories')
        .select('*');

    return (
        <BlogListClient
            initialPosts={posts || []}
            initialCategories={categories || []}
        />
    );
}
