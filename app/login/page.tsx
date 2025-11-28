"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Simple authentication check
    if (email === "truthhacker@protonmail.com" && password === "TRUTH") {
      // Store auth token in localStorage
      localStorage.setItem("adminAuth", "true")
      router.push("/admin")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                FREEDOM-FLASHCARDS.COM
              </h1>
              <p className="text-lg mt-1 text-center md:text-left">
                Eye-opening conversations for breaking the programming
              </p>
            </div>
            <nav className="flex gap-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/categories" className="hover:underline">
                Categories
              </Link>
              <Link href="/random" className="hover:underline">
                Random
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Freedom Flashcards. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-600">Helping patriots have eye-opening conversations since 2024.</p>
        </div>
      </footer>
    </div>
  )
}
