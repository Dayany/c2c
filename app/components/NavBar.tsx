"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import PartsModalButton from "./parts/PartsModalButton";
interface NavbarProps {
  session: Session | null;
}

const NavBar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {session ? (
          <div className="flex items-center">
            <Image
              className="rounded-full"
              src={
                session?.user?.image ||
                process.env.NEXT_PUBLIC_S3_BUCKET_URL +
                  "Generic-Profile-Image-300x300.png"
              }
              width="40"
              height="40"
              alt="User Avatar"
            />
            <div className="text-white text-sm px-4 hidden sm:block">
              {session?.user?.email}
            </div>
          </div>
        ) : (
          <div className="text-white text-lg">Welcome to Car2Car</div>
        )}

        <div className="sm:hidden">
          <button onClick={toggleMenu} className="flex flex-col space-y-1">
            <div
              className={`h-1 w-6 bg-white transition transform ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-white transition ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-white transition transform ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></div>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <a href="/" className="text-white hover:underline">
            Home
          </a>
          {session ? (
            <>
              <PartsModalButton className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" />
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
      </div>

      {isOpen && (
        <div className="sm:hidden mt-2">
          <a href="/" className="block text-white hover:underline py-2">
            Home
          </a>
          {session ? (
            <>
              <PartsModalButton className="block bg-gray-500 rounded pl-2 w-full text-left text-white py-2" />
              <input
                type="text"
                className="px-2 py-1 mt-2 w-full rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                placeholder="Search..."
              />
              <Link
                href="/api/auth/signout"
                className="block w-full text-left bg-gray-700 text-white px-4 py-2 mt-2 rounded"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="block w-full text-left bg-gray-700 text-white px-4 py-2 mt-2 rounded"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
