"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const SignInPage = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = mode === "signin" ? "Signed in (demo)." : "Signed up (demo).";
    alert(message);
  };

  return (
    <main className="min-h-screen bg-light-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-black-100">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
            <p className="text-grey mt-2">Stay on brand with our primary blue accent.</p>
          </div>
          <Link href="/" className="text-primary-blue font-semibold hover:underline">
            Home
          </Link>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className={`flex-1 py-3 rounded-full border ${mode === "signin" ? "bg-primary-blue text-white border-primary-blue" : "bg-light-white text-black-100 border-light-white"}`}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`flex-1 py-3 rounded-full border ${mode === "signup" ? "bg-primary-blue text-white border-primary-blue" : "bg-light-white text-black-100 border-light-white"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-black-100" htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-light-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="Jane Doe"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black-100" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-light-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black-100" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full border border-light-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="••••••••"
            />
          </div>

          {mode === "signup" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-black-100" htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full border border-light-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="Match your password"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary-blue text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignInPage;
