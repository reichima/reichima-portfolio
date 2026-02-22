import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function AboutCode() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-white/20 bg-[#1e1e1e] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#2d2d2d] px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-2 text-xs text-gray-400">profile.go</div>
      </div>
      <ScrollArea className="h-[300px] w-full p-4">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-blue-300">package </code>
          <code className="text-white">main</code>
          <br />
          <br />
          <code className="text-blue-300">var </code>
          <code className="text-yellow-300">profile </code>
          <code className="text-white">= </code>
          <code className="text-yellow-300">Profile</code>
          <code className="text-portfolio-primary-light">{`{`}</code>
          <br />
          <span className="pl-4">
            <code className="text-sky-300">Name: </code>
            <code className="text-green-300">&quot;Reichima&quot;</code>,
          </span>
          <br />
          <span className="pl-4">
            <code className="text-sky-300">Role: </code>
            <code className="text-green-300">&quot;WebEngineer&quot;</code>,
          </span>
          <br />
          <span className="pl-4">
            <code className="text-sky-300">Location: </code>
            <code className="text-green-300">&quot;Tochigi, Japan&quot;</code>,
          </span>
          <br />
          <span className="pl-4">
            <code className="text-sky-300">Skills: </code>
            <code className="text-yellow-300">Skills</code>
            <code className="text-portfolio-primary-light">{`{`}</code>
          </span>
          <br />
          <span className="pl-8">
            <code className="text-sky-300">Backend: </code>
            <code className="text-white">[]</code>
            <code className="text-blue-300">string</code>
            <code className="text-white">{`{`}</code>
            <code className="text-green-300">&quot;PHP(Laravel)&quot;</code>
            <code className="text-white">, </code>
            <code className="text-green-300">&quot;Ruby&quot;</code>
            <code className="text-white">, </code>
            <code className="text-green-300">&quot;Go&quot;</code>
            <code className="text-white">, </code>
            <code className="text-green-300">&quot;Hono&quot;</code>
            <code className="text-white">{`}`}</code>,
          </span>
          <br />
          <span className="pl-8">
            <code className="text-sky-300">Frontend: </code>
            <code className="text-white">[]</code>
            <code className="text-blue-300">string</code>
            <code className="text-white">{`{`}</code>
            <code className="text-green-300">&quot;Next.js&quot;</code>
            <code className="text-white">{`}`}</code>,
          </span>
          <br />
          <span className="pl-4">
            <code className="text-portfolio-primary-light">{`}`}</code>,
          </span>
          <br />
          <span className="pl-4">
            <code className="text-sky-300">Contact: </code>
            <code className="text-green-300">
              &quot;お気軽にご相談ください&quot;
            </code>
            ,
          </span>
          <br />
          <span className="pl-4">
            <code className="text-gray-500">
              {"// TODO: イナズマイレブンのクリア"}
            </code>
          </span>
          <br />
          <span className="pl-4">
            <code className="text-sky-300">FavoriteGame: </code>
            <Link
              href="/game-ranking"
              className="text-green-300 underline decoration-green-300/40 hover:decoration-green-300"
            >
              &quot;Many&quot;
            </Link>
            ,
          </span>
          <br />
          <span className="pl-4">
            <code className="text-gray-500">
              {"// FIXME: 健康的な食事をする"}
            </code>
          </span>
          <br />
          <span className="pl-4">
            <code className="text-sky-300">FavoriteFood: </code>
            <code className="text-green-300">&quot;家系ラーメン&quot;</code>,
          </span>
          <br />
          <code className="text-portfolio-primary-light">{`}`}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}
