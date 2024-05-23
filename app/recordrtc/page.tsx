import Grammar from "@/components/Grammar";
import Record from "@/components/Record";

export default function Home() {  
  return (
		<div className="flex flex-col justify-center items-center h-full gap-2">
      <h1>Get Started RecordRTC Example</h1>
      <h3>Step 1. Write a sentence & Grammar Correction</h3>
      <div className="flex gap-2">
        <Grammar />
      </div>
      <h3>Step 2. Read sentence</h3>
      <div className="flex gap-2">
        <Record />
      </div>
		</div>
  );
}