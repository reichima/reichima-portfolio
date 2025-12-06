import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PcCase, Rocket } from "lucide-react";
import Image from "next/image";
import { RefObject, useState } from "react";
import { GiSkills, GiTalk } from "react-icons/gi";
import AboutCode from "./about-code";

interface AboutSectionProps {
  aboutRef: RefObject<HTMLElement>;
  profileImageRef: RefObject<HTMLImageElement>;
  aboutTitleRef: RefObject<HTMLHeadingElement>;
  aboutTextRef: RefObject<HTMLDivElement>;
}

export default function AboutSection({
  aboutRef,
  profileImageRef,
  aboutTitleRef,
  aboutTextRef,
}: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState("view");
  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={aboutTitleRef}
        className="relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
      >
        About Me
      </h2>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-8 w-full"
      >
        <div className="mb-8 flex justify-center">
          <TabsList className="grid w-[400px] grid-cols-2 bg-white/10 text-white">
            <TabsTrigger value="view" tabIndex={activeTab === "view" ? -1 : 0}>
              View
            </TabsTrigger>
            <TabsTrigger value="code" tabIndex={activeTab === "code" ? -1 : 0}>
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="view" tabIndex={-1}>
          <div className="mt-4 flex flex-col items-center justify-center gap-12 lg:flex-row">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500 opacity-75 blur-lg"></div>
              <Image
                ref={profileImageRef}
                src="/images/portfolio/profile.png"
                alt="profile"
                width={280}
                height={280}
                className="relative rounded-full border-4 border-white/20 shadow-2xl"
                loading="lazy"
              />
            </div>

            <div ref={aboutTextRef} className="max-w-lg space-y-6">
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <Rocket className="mr-1 inline h-6 w-6 text-purple-400" />
                  栃木でWebエンジニアをしているReichimaです
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <PcCase className="mr-1 inline h-6 w-6 text-yellow-400" />
                  バックエンドが主ですが、フロントエンドやサーバー構築も可能です。
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <GiSkills className="mr-1 inline h-6 w-6 text-yellow-400" />
                  PHP(Laravel)、TypeScript(Next.js、Hono)、Rubyをよく使用します。
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <GiTalk className="mr-1 inline h-6 w-6 text-blue-400" />
                  土日、平日夜稼働での副業案件を募集しています。
                  <br />
                  お気軽にご相談ください
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="flex justify-center" tabIndex={-1}>
          <AboutCode />
        </TabsContent>
      </Tabs>
    </section>
  );
}
