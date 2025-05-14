"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-[18px] py-[16px] border-b border-gray flex flex-col items-center justify-center bg-black/75  backdrop-blur-sm">
      <div className="w-full flex justify-between">
        <div className="flex items-center bg-red">
          <Link href="/">
            <h5>KABAYAN</h5>
          </Link>
        </div>
        <div className="gap-[16px] flex flex-row items-center">
          <Link href="/dashboard">
            <p>DASHBOARD</p>
          </Link>
          <Link href="/analytics">
            <p>ANALYTICS</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
