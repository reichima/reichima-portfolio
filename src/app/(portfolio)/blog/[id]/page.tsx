import BackToTop from "@/components/back-to-top";
import BlogContent from "@/components/blog-content";
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
    const description = blog.content.replace(/<[^>]*>/g, "").slice(0, 160);
    const url = `https://reichima.com/blog/${id}`;

    return {
      title: `${blog.title} | Blog`,
      description,
      openGraph: {
        type: "article",
        url,
        title: blog.title,
        description,
        siteName: "Reichima Portfolio",
        images: blog.eyecatch
          ? [
              {
                url: blog.eyecatch.url,
                width: blog.eyecatch.width,
                height: blog.eyecatch.height,
                alt: blog.title,
              },
            ]
          : [],
        publishedTime: blog.publishedAt,
        modifiedTime: blog.updatedAt,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
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

            <BlogContent content={blog.content} />

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
