"use client";

import Footer from "@/app/(portfolio)/footer";
import Scroll from "@/components/scroll";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [showFooter, setShowFooter] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const specialRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!specialRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // スペシャルセクションが画面に入ったらフッターを表示
        const isVisible = entries[0]?.isIntersecting;
        setShowFooter(isVisible);
      },
      {
        threshold: 0.5, // 50%以上表示されたら検出
        rootMargin: "0px", // マージンなし
      },
    );

    observer.observe(specialRef.current);

    return () => {
      if (specialRef.current) {
        observer.unobserve(specialRef.current);
      }
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="h-screen w-screen snap-y snap-mandatory overflow-scroll scroll-smooth"
    >
      {/* 既存のセクションはそのまま */}
      <section
        id="home"
        className="relative z-0 grid h-screen w-full snap-start place-items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/landscape.png')" }}
      >
        <Scroll />
      </section>
      <section id="about" className="bg-primary h-screen w-full snap-start p-8">
        <div className="h-16"></div>
        <h2 className="relative py-6 pl-2 text-5xl text-white italic">
          -About-
        </h2>
        <div className="flex">
          <div>
            <Image
              src="/images/mym.JPG"
              alt="logo"
              width={256}
              height={256}
              className="rounded-full"
            />
          </div>
          <div className="about-right">
            <p>Webエンジニアをしています</p>
            <p>得意な言語はRuby</p>
            <p>
              仕事ではサーバー構築やPHPを等を使用してシステム開発をしています
            </p>
          </div>
        </div>
      </section>
      <section
        id="works"
        className="h-screen w-full snap-start bg-orange-300 p-8"
      >
        <div className="h-16"></div>
        <h2 className="relative py-6 pl-2 text-5xl text-white italic">
          -Works-
        </h2>
      </section>
      <section
        id="contact"
        className="min-h-screen w-full snap-start bg-gray-500 p-8"
      >
        <div className="h-16"></div>
        <h2 className="relative py-6 pl-2 text-5xl text-white italic">
          -Contact-
        </h2>
        <div className="max-w-screen-xl px-2 py-16">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="text-base-100 max-w-xl text-lg">
                案件のご依頼、遊ぶ約束など、 <br />
                フォームからお気軽にお問い合わせください。
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              {/* <ContactForm /> */}
            </div>
          </div>
        </div>
      </section>
      <section
        id="special"
        ref={specialRef}
        className="relative h-screen w-full snap-start bg-red-400 p-8"
      >
        <div className="h-16"></div>
        <h2 className="relative py-6 pl-2 text-5xl text-white italic">
          -Special-
        </h2>
        <Image
          src="/images/wait-image.png"
          alt="wait"
          width={600}
          height={600}
        />
      </section>
      <div
        className={`fixed right-0 bottom-0 left-0 z-40 transition-all duration-500 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer />
      </div>
    </main>
  );
}
