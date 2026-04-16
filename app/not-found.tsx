"use client"; // Required because we are using a client-side boundary

import Link from "next/link";
import { Suspense } from "react";

function NotFoundContent() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <h2 className="text-6xl font-heading mb-4 text-brand-yellow">404</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The burger you're looking for was cut in half... and then disappeared. 
        Let's get you back to the main menu.
      </p>
      <Link 
        href="/" 
        className="px-8 py-4 bg-white text-black font-bold uppercase tracking-tighter hover:bg-brand-yellow transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <NotFoundContent />
    </Suspense>
  );
}