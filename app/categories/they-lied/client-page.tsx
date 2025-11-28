"use client"

import { useState, useEffect } from "react"
import { FlashcardComponent } from "@/components/flashcard"
import { allTheyLiedFlashcards } from "@/data/they-lied-flashcards"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TheyLiedClientPage() {
  const [flashcards, setFlashcards] = useState(allTheyLiedFlashcards)
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 5
  const totalPages = Math.ceil(flashcards.length / cardsPerPage)

  useEffect(() => {
    const savedData = localStorage.getItem("flashcards-they-lied")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFlashcards(parsed)
      } catch (error) {
        console.error("Error loading saved flashcards:", error)
        setFlashcards(allTheyLiedFlashcards)
      }
    }
  }, [])

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentFlashcards = flashcards.slice(indexOfFirstCard, indexOfLastCard)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 cursor-pointer hover:text-primary">
                  FREEDOM-FLASHCARDS.COM
                </h1>
              </Link>
              <p className="text-gray-600 mt-2">Greatest conversation starters</p>
            </div>
            <nav className="flex gap-4 items-center">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/categories" className="hover:text-primary transition-colors">
                Categories
              </Link>
              <Link href="/random" className="hover:text-primary transition-colors">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">They Lied To Us About</h1>
          <p className="text-xl text-gray-600 mb-4">Exposing the narratives that shaped our world</p>
          <p className="text-gray-600">
            Discover the truth behind mainstream media narratives and political claims that turned out to be false or
            misleading.
          </p>
        </div>

        <div className="mb-6">
          <Link href="/categories" className="text-primary hover:underline">
            ← Back to Categories
          </Link>
        </div>

        <div className="mb-6 text-sm text-gray-600">
          Showing {indexOfFirstCard + 1}-{Math.min(indexOfLastCard, flashcards.length)} of {flashcards.length}{" "}
          flashcards
        </div>
        <div className="space-y-6">
          {currentFlashcards.map((flashcard) => (
            <FlashcardComponent key={flashcard.id} flashcard={flashcard} />
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="border-primary text-primary disabled:opacity-50 bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-primary hover:bg-primary-hover text-white disabled:opacity-50"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} FREEDOM-FLASHCARDS.COM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
