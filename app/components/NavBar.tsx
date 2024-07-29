"use client";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";

import { BuiltInProviderType } from "next-auth/providers";

interface SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Navbar: React.FC<SignInProps> = ({ providers }) => {
  const isUserLoggedIn: boolean = true;

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">Hello Joe</div>
      <div className="flex items-center space-x-4">
        <a href="/" className="text-white hover:underline">
          Home
        </a>
        {isUserLoggedIn ? (
          <>
            <input
              type="text"
              className="px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Search..."
            />
            <button
              onClick={() => signOut()}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
        )}
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              onClick={() => signIn(provider.id)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Sign In with {provider.name}
            </button>
          ))}
      </div>
    </nav>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
export default Navbar;
