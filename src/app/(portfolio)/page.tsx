import Scroll from "@/components/scroll";
import Image from "next/image";
// import { Footer } from "react-day-picker";

export default async function Page() {
  return (
    <main className="h-screen w-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
      <section
        id="home"
        className="key-visual relative z-0 grid h-screen w-full snap-start place-items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/landscape.png')" }}
      >
        <h1 className="animate-text-focus-in z-20 text-5xl font-bold text-white opacity-0">
          Mym Portfolio
        </h1>
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
                フォームからお気軽にお問い合わせください。
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
        {/* <h3 className={`${dotFont.className} mb-4 text-xl md:text-2xl`}>
          価値観ガチャ
        </h3> */}
        {/* 一旦即時に結果出力。TODO: ボタンからガチャ結果の出力 */}
        {/* <GachaResult /> */}
        {/* <Footer /> */}
      </section>
    </main>
  );
}
