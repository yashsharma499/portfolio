"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c▲ Yash Kumar Sharma %c Full-Stack & AI Engineer ",
      "background:#7C3AED;color:#fff;padding:6px 10px;border-radius:6px 0 0 6px;font-weight:bold",
      "background:#12121e;color:#22d3ee;padding:6px 10px;border-radius:0 6px 6px 0"
    );
    console.log("Curious about the code? → https://github.com/yashsharma499");
  }, []);
  return null;
}
