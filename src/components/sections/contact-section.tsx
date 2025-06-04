import { RefObject } from "react";

interface ContactSectionProps {
  contactRef: RefObject<HTMLElement>;
  contactTitleRef: RefObject<HTMLHeadingElement>;
  contactContentRef: RefObject<HTMLDivElement>;
}

export default function ContactSection({
  contactRef,
  contactTitleRef,
  contactContentRef,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={contactTitleRef}
        className="relative py-6 pl-2 text-6xl font-bold tracking-wider text-white"
        style={{
          background: "linear-gradient(45deg, #ffffff, #a855f7, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Contact
      </h2>

      <div ref={contactContentRef} className="mx-auto mt-12 max-w-6xl">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <div className="rounded-xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Please Contact Me
              </h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-white/90">
                  💼 副業案件のご依頼、お仕事のご相談
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-purple-400"></div>
                  <span className="text-white/80">通常24時間以内に返信</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-pink-400"></div>
                  <span className="text-white/80">
                    お気軽にお問い合わせください😎
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md lg:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/90">
                      お名前
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none"
                      placeholder="山田太郎"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/90">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">
                    件名
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none"
                    placeholder="お仕事のご相談"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">
                    メッセージ
                  </label>
                  <textarea
                    rows={6}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none"
                    placeholder="詳細をお聞かせください..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 focus:ring-2 focus:ring-purple-400/50 focus:outline-none"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
