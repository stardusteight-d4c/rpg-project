"use client"

import Image from "next/image"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

interface HandoutDisplayProps extends IHandout {}

export const HandoutDisplay = ({ content }: HandoutDisplayProps) => {
  if (content.type.name === "Letter Type 01")
    return (
      <div className="w-[681px] relative">
        <div className="absolute pr-5 !font-delius w-[550px] h-[850px] overflow-y-scroll space-y-4 markdown-context text-lg text-black left-[80px] top-[60px]">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content.inputs[0]}
          </ReactMarkdown>
        </div>
        <Image
          src="/handouts/assets/letter-type-01.png"
          width={1000}
          height={1000}
          quality={100}
          alt=""
          className="select-none pointer-events-none"
        />
      </div>
    )

  if (content.type.name === "Letter Type 02")
    return (
      <div className="w-[681px] relative">
        <div className="absolute !font-delius pr-5 font-medium text-lg w-[500px] h-[800px] overflow-y-scroll space-y-4 markdown-context text-black top-[100px] left-[110px] ">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content.inputs[0]}
          </ReactMarkdown>
        </div>
        <Image
          src="/handouts/assets/letter-type-02.png"
          width={1000}
          height={1000}
          quality={100}
          alt=""
          className="select-none pointer-events-none"
        />
      </div>
    )

  if (content.type.name === "Note Type 01")
    return (
      <div className="w-[681px] relative">
         <div className="absolute pr-5 !font-delius w-[550px] h-[900px] overflow-y-scroll space-y-4 markdown-context text-lg text-black left-[80px] top-[60px]">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content.inputs[0]}
          </ReactMarkdown>
        </div>
        <Image
          src="/handouts/assets/note-type-01.png"
          width={1000}
          height={1000}
          quality={100}
          alt=""
          className="select-none pointer-events-none"
        />
      </div>
    )

  if (content.type.name === "Note Type 02")
    return (
      <div className="w-[681px] relative">
        <div className="absolute !font-delius h-[560px] overflow-hidden pr-5 font-medium text-xl w-[600px] !italic space-y-4 markdown-context text-black top-[50px] left-[50px] ">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content.inputs[0]}
          </ReactMarkdown>
        </div>
        <Image
          src="/handouts/assets/note-type-02.png"
          width={1000}
          height={1000}
          quality={100}
          alt=""
          className="select-none pointer-events-none"
        />
      </div>
    )

  if (content.type.name === "Note Type 03")
    return (
      <div className="w-[681px] relative mb-10">
        <div className="absolute !font-delius h-[160px] overflow-y-scroll pr-5 font-medium text-4xl w-[560px] !italic space-y-4 markdown-context text-black top-[50px] left-[50px] ">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content.inputs[0]}
          </ReactMarkdown>
        </div>
        <Image
          src="/handouts/assets/note-type-03.png"
          width={1000}
          height={1000}
          quality={100}
          alt=""
          className="select-none pointer-events-none"
        />
      </div>
    )

  if (content.type.name === "Newspaper Type 01")
    return (
      <div className="w-[681px] relative">
        <div className="absolute tracking-tight top-[68px] pr-5 w-[530px] left-[80px] text-black text-3xl h-[82px] overflow-y-scroll font-bold">
          {content.inputs[0]}
        </div>
        <div className="absolute top-[165px] markdown-context space-y-4 !text-black w-[330px] h-[280px] overflow-y-scroll pr-5 text-justify text-sm left-[80px]">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {content.inputs[1]}
          </ReactMarkdown>
        </div>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e2a7112977895.601eac8484f94.jpg"
          alt=""
          className="w-[193px] select-none pointer-events-none h-[257px] absolute right-[73px] bottom-[56px]"
        />
        <Image
          src="/handouts/assets/newspaper-type-01.png"
          width={1000}
          height={1000}
          quality={100}
          alt=""
          className="select-none pointer-events-none"
        />
      </div>
    )
}
