import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";


export default function DocsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section >


        <div className="mt-8 mx-4">
          <Snippet hideSymbol variant="bordered">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FF705B] to-[#FFB457]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <Code>class: "bg-clip-text text-transparent bg-gradient-to-b from-[#FF705B] to-[#FFB457]"</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </div>
  );
}
