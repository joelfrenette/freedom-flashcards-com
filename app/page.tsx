import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Brain, MessageCircle, ThumbsUp } from "lucide-react"
import type { Metadata } from "next"
// import Image from "next/image"

export const metadata: Metadata = {
  title: "Home | FREEDOM-FLASHCARDS.COM",
  description: "Eye-opening conversations for breaking the programming",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                  FREEDOM-FLASHCARDS.COM
                </h1>
                <p className="text-lg mt-1 text-center md:text-left">Greatest conversation starters</p>
              </div>
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
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Break Through The Cognitive Dissonance</h2>
            <p className="text-xl mb-8">
              Arm yourself with thought-provoking questions and facts to help loved ones see through media manipulation
              and political narratives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white" asChild>
                <Link href="/categories">
                  Browse Categories <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-gray-100 bg-transparent"
                asChild
              >
                <Link href="/random">Random Flashcard</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              title="They Lied To Us About..."
              description="Expose the lies and misinformation pushed by mainstream media and politicians."
              icon={<MessageCircle className="h-8 w-8" />}
              href="/categories/they-lied"
            />
            <CategoryCard
              title="We Were Right About..."
              description="Remember when they called us conspiracy theorists? Time has proven us correct."
              icon={<ThumbsUp className="h-8 w-8" />}
              href="/categories/we-were-right"
            />
            <CategoryCard
              title="Why Do You Feel..."
              description="Thought-provoking questions that expose contradictions in progressive thinking."
              icon={<Brain className="h-8 w-8" />}
              href="/categories/why-do-you-feel"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Browse Categories</h3>
              <p>Find conversation starters organized by topic and theme.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Share on Social</h3>
              <p>
                When viewing a card, click "Share on Social" to convert it into a meme and post it on Facebook,
                Instagram, Twitter, Truth Social, or other platforms.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Start Conversations</h3>
              <p>Use these talking points to help break through media programming.</p>
            </div>
          </div>
        </section>
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

function CategoryCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary bg-white text-primary hover:bg-primary hover:text-white h-9 px-4 py-2 mt-auto"
      >
        Explore
      </Link>
    </Card>
  )
}
