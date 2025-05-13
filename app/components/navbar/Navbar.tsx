import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex flex-col items-start justify-start bg-black/75  backdrop-blur-sm">
      <div className="w-full flex justify-between">
        <Link href="/">
          <h5 className="font-bold text-xl">KABAYAN</h5>
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
