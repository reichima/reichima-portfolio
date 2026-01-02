import BackToTop from "@/components/back-to-top";
import ProfileCard from "@/components/profile-card";
import ShareButtons from "@/components/share-buttons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBlogDetail, getBlogs } from "@/lib/microcms";
import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { contents } = await getBlogs({ limit: 100 });
  return contents.map((blog) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const blog = await getBlogDetail(id);
    return {
      title: `${blog.title} | Blog`,
      description: blog.content.replace(/<[^>]*>/g, "").slice(0, 160),
      openGraph: {
        title: blog.title,
        description: blog.content.replace(/<[^>]*>/g, "").slice(0, 160),
        images: blog.eyecatch ? [blog.eyecatch.url] : [],
      },
    };
  } catch {
    return {
      title: "Blog",
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;

  let blog;
  try {
    blog = await getBlogDetail(id);
  } catch {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 読了時間を計算（日本語は400文字/分として計算）
  const calculateReadingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, "");
    const charCount = text.length;
    const minutes = Math.ceil(charCount / 400);
    return minutes;
  };

  const readingTime = calculateReadingTime(blog.content);

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 pt-32 pb-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="text-white/60">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-white">
                  ホーム
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/#blog" className="hover:text-white">
                  ブログ
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">
                {blog.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
          {blog.eyecatch && (
            <div className="relative h-64 w-full md:h-96">
              <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <time className="text-sm text-white/60">
                {formatDate(blog.publishedAt)}
              </time>
              <span className="flex items-center gap-1 text-sm text-white/60">
                <Clock className="h-4 w-4" />
                {readingTime}分で読めます
              </span>
              {blog.category && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                  {blog.category.name}
                </span>
              )}
            </div>

            <h1 className="mb-8 text-3xl font-bold text-white md:text-4xl">
              {blog.title}
            </h1>

            <div
              className="blog-content prose prose-p:text-white/90 prose-a:text-purple-300 prose-a:underline hover:prose-a:text-purple-200 prose-strong:text-white prose-em:text-white/90 prose-code:rounded prose-code:bg-white/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-purple-200 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-800 prose-pre:border prose-pre:border-white/10 prose-ol:text-white/90 prose-ul:text-white/90 prose-li:text-white/90 prose-li:marker:text-purple-400 prose-blockquote:border-l-purple-500 prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:text-white/80 prose-hr:border-white/20 prose-img:rounded-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* シェアボタン */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="mb-4 text-sm text-white/60">この記事をシェアする</p>
              <ShareButtons title={blog.title} />
            </div>
          </div>
        </article>
        <ProfileCard />
      </div>

      <BackToTop />
    </main>
  );
}
