"use client";

import {
  sendContactAction,
  type ContactActionState,
} from "@/features/contact/actions/send-contact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircleIcon, Smile } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const initialState: ContactActionState = {
  success: false,
  message: "",
};

export default function ContactSection() {
  const contactRef = useRef<HTMLElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);

  const [state, formAction, isPending] = useActionState(
    sendContactAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (
      contactRef.current &&
      contactTitleRef.current &&
      contactContentRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        contactTitleRef.current,
        {
          opacity: 0,
          x: 100,
          rotationY: 90,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
        },
      );

      const contactElements = contactContentRef.current.children;
      tl.fromTo(
        contactElements,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }
  }, []);

  // 送信結果の処理
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        // フォームをリセット
        formRef.current?.reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={contactTitleRef}
        className="font-orbitron relative py-6 pl-2 text-6xl font-bold tracking-wider text-white"
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
                  <CheckCircleIcon className="mr-1 inline text-green-400" />
                  お仕事のご相談
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
                    お気軽にお問い合わせください
                    <Smile className="ml-1 inline size-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md lg:p-12">
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/90">
                      お名前
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={`w-full rounded-lg border px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:ring-2 focus:outline-none ${
                        state.errors?.name
                          ? "border-red-400 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20"
                          : "border-white/20 bg-white/10 focus:border-purple-400 focus:ring-purple-400/20"
                      }`}
                      placeholder="梅沢 うめお"
                      disabled={isPending}
                    />
                    {state.errors?.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {state.errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/90">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      name="email"
                      className={`w-full rounded-lg border px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:ring-2 focus:outline-none ${
                        state.errors?.email
                          ? "border-red-400 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20"
                          : "border-white/20 bg-white/10 focus:border-purple-400 focus:ring-purple-400/20"
                      }`}
                      placeholder="reichima@example.com"
                      disabled={isPending}
                    />
                    {state.errors?.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {state.errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">
                    件名
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className={`w-full rounded-lg border px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:ring-2 focus:outline-none ${
                      state.errors?.subject
                        ? "border-red-400 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20"
                        : "border-white/20 bg-white/10 focus:border-purple-400 focus:ring-purple-400/20"
                    }`}
                    placeholder="お問い合わせの件名"
                    disabled={isPending}
                  />
                  {state.errors?.subject && (
                    <p className="mt-1 text-sm text-red-400">
                      {state.errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">
                    メッセージ
                  </label>
                  <textarea
                    rows={6}
                    name="message"
                    className={`w-full rounded-lg border px-4 py-3 text-white placeholder-white/50 backdrop-blur-md focus:ring-2 focus:outline-none ${
                      state.errors?.message
                        ? "border-red-400 bg-red-500/10 focus:border-red-400 focus:ring-red-400/20"
                        : "border-white/20 bg-white/10 focus:border-purple-400 focus:ring-purple-400/20"
                    }`}
                    placeholder="2000文字以内でご記入ください"
                    disabled={isPending}
                  />
                  {state.errors?.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {state.errors.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => formRef.current?.requestSubmit()}
                    disabled={isPending}
                    className={`rounded-lg px-8 py-3 font-semibold text-white transition-all duration-300 focus:ring-2 focus:ring-purple-400/50 focus:outline-none ${
                      isPending
                        ? "cursor-not-allowed bg-gray-500 opacity-50"
                        : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25"
                    }`}
                  >
                    {isPending ? "送信中..." : "送信する"}
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
