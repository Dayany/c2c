"use client";
import React from "react";
import Link from "next/link";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">display name</div>
      <div className="flex items-center space-x-4">
        <a href="/" className="text-white hover:underline">
          Home
        </a>
        {session ? (
          <>
            <input
              type="text"
              className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Search..."
            />
            <Link
              href="/api/auth/signout"
              className="bg-gray-700 text-white px-4 py-2 rounded"
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
