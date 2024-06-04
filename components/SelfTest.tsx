'use client';

import Grammar from "./Grammar";
import Record from "./Record";

export default function SelfTest() {

  return (
    <div>
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
