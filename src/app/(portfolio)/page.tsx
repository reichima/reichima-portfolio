import Image from "next/image";
// import { Footer } from "react-day-picker";

export default async function Page() {
  return (
    <main className="snap-y snap-mandatory h-screen w-screen overflow-scroll scroll-smooth">
      <section
        id="home"
        className="key-visual w-full h-screen bg-cover bg-center place-items-center relative grid z-0 snap-start"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <h1 className="text-5xl text-white font-bold opacity-0 animate-text-focus-in z-20">
          Mym Portfolio
        </h1>
        {/* <Scroll /> */}
      </section>
      <section id="about" className="w-full h-screen snap-start bg-primary p-8">
        <div className="h-16"></div>
        <h2 className="text-5xl relative py-6 pl-2 italic text-white">
          -About-
        </h2>
        <div className="flex">
          <div>
            <Image
              src="/mym.JPG"
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
        className="w-full h-screen snap-start p-8 bg-orange-300"
      >
        <div className="h-16"></div>
        <h2 className="text-5xl relative py-6 pl-2 italic text-white">
          -Works-
        </h2>
      </section>
      <section
        id="contact"
        className="w-full min-h-screen snap-start p-8 bg-gray-500"
      >
        <div className="h-16"></div>
        <h2 className="text-5xl relative py-6 pl-2 italic text-white">
          -Contact-
        </h2>
        <div className="max-w-screen-xl px-2 py-16">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg text-base-100">
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
        className="w-full h-screen snap-start p-8 bg-red-400 relative"
      >
        <div className="h-16"></div>
        <h2 className="text-5xl relative py-6 pl-2 italic text-white">
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
