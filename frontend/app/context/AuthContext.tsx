"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import test from "node:test";

type User = {
  username: string;
  is_staff: boolean;
} | null;

type AuthContextType = {
  user: User;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
  checkAuth: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me/`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data));
  }, []);

  async function logout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout/`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/blogs");
  }

  async function checkAuth() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me/`, {
      credentials: "include",
    });
    const data = res.ok ? await res.json() : null;
    setUser(data);
  }

  return (
    <AuthContext.Provider value={{ user, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
