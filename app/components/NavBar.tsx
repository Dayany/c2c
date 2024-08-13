"use client";
import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import Image from "next/image";
import PartsModalButton from "@/parts/PartsModalButton";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {session ? (
        <div className="flex items-center justify-start">
          <Image
            className="rounded-full"
            src={
              session?.user?.image ||
              process.env.NEXT_PUBLIC_S3_BUCKET_URL +
                "Generic-Profile-Image-300x300.png"
            }
            width="50"
            height="50"
            alt="logo"
          />
          <div className="text-white text-lg px-6">{session?.user?.email}</div>
        </div>
      ) : (
        <div className="text-white text-lg">Welcome to Car2Car</div>
      )}
      <div className="flex items-center space-x-4">
        <a href="/" className="text-white hover:underline">
          Home
        </a>
        <PartsModalButton />
        {session ? (
          <>
            <input
              type="text"
              className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Search..."
            />
            <Link
              href="/api/auth/signout"
              className="bg-gray-700 text-white px-4 py-2 rounded whitespace-nowrap"
            >
              Sign Out
            </Link>
          </>
        ) : (
          <Link
            href="/api/auth/signin"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
