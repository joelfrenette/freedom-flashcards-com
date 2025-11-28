"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FlashcardComponent } from "@/components/flashcard"
import { QuestionFlashcard } from "@/components/question-flashcard"
import { NewCardButton } from "@/components/new-card-button"

// Import all flashcard data
import { allTheyLiedFlashcards } from "@/data/they-lied-flashcards"
import { allWeWereRightFlashcards } from "@/data/we-were-right-flashcards"
import { allWhyDoYouFeelFlashcards } from "@/data/why-do-you-feel-flashcards"
import { allAntiAmericanFlashcards } from "@/data/anti-american-flashcards"
import { allImCuriousFlashcards } from "@/data/im-curious-flashcards"
import { allGlobalAgendaFlashcards } from "@/data/global-agenda-flashcards"
import { allDoubleStandardsFlashcards } from "@/data/double-standards-flashcards"
import { allLogicCheckFlashcards } from "@/data/logic-check-flashcards"
import { allFollowTheMoneyFlashcards } from "@/data/follow-the-money-flashcards"
import { allMediaNarrativesFlashcards } from "@/data/media-narratives-flashcards"
import { allScienceOrPoliticsFlashcards } from "@/data/science-or-politics-flashcards"
import { allConstitutionMattersFlashcards } from "@/data/constitution-matters-flashcards"
import { allCommonSenseCheckFlashcards } from "@/data/common-sense-check-flashcards"
import { allHistoryRewrittenFlashcards } from "@/data/history-rewritten-flashcards"
import { allFreedomIsntFreeFlashcards } from "@/data/freedom-isnt-free-flashcards"
import { allThinkForYourselfFlashcards } from "@/data/think-for-yourself-flashcards"
import { allCultureWarFlashcards } from "@/data/culture-war-flashcards"
import { allFreedom101Flashcards } from "@/data/freedom-101-flashcards"

// Helper function to validate if a flashcard has valid content
function isValidFlashcard(card: any): boolean {
  if (!card) return false

  // For question-type flashcards (why-do-you-feel, im-curious, double-standards)
  if (card.type === "why-do-you-feel" || card.type === "im-curious" || card.type === "double-standards") {
    return !!(card.question && card.question.trim().length > 0)
  }

  // For regular flashcards, check title, claim, and truth
  return !!(
    card.title &&
    card.title.trim().length > 0 &&
    card.claim &&
    card.claim.trim().length > 0 &&
    card.truth &&
    card.truth.trim().length > 0
  )
}

export default function RandomPage() {
  const [currentCard, setCurrentCard] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [shownCardIds, setShownCardIds] = useState<Set<string>>(new Set())
  const [allCardsShown, setAllCardsShown] = useState(false)

  // Combine all flashcards from all categories and filter out invalid ones
  const allFlashcards = [
    ...allTheyLiedFlashcards.map((card) => ({ ...card, type: "they-lied" })),
    ...allWeWereRightFlashcards.map((card) => ({ ...card, type: "we-were-right" })),
    ...allWhyDoYouFeelFlashcards.map((card) => ({ ...card, type: "why-do-you-feel" })),
    ...allAntiAmericanFlashcards.map((card) => ({ ...card, type: "anti-american" })),
    ...allImCuriousFlashcards.map((card) => ({ ...card, type: "im-curious" })),
    ...allGlobalAgendaFlashcards.map((card) => ({ ...card, type: "global-agenda" })),
    ...allDoubleStandardsFlashcards.map((card) => ({ ...card, type: "double-standards" })),
    ...allLogicCheckFlashcards.map((card) => ({ ...card, type: "logic-check" })),
    ...allFollowTheMoneyFlashcards.map((card) => ({ ...card, type: "follow-the-money" })),
    ...allMediaNarrativesFlashcards.map((card) => ({ ...card, type: "media-narratives" })),
    ...allScienceOrPoliticsFlashcards.map((card) => ({ ...card, type: "science-or-politics" })),
    ...allConstitutionMattersFlashcards.map((card) => ({ ...card, type: "constitution-matters" })),
    ...allCommonSenseCheckFlashcards.map((card) => ({ ...card, type: "common-sense-check" })),
    ...allHistoryRewrittenFlashcards.map((card) => ({ ...card, type: "history-rewritten" })),
    ...allFreedomIsntFreeFlashcards.map((card) => ({ ...card, type: "freedom-isnt-free" })),
    ...allThinkForYourselfFlashcards.map((card) => ({ ...card, type: "think-for-yourself" })),
    ...allCultureWarFlashcards.map((card) => ({ ...card, type: "culture-war" })),
    ...allFreedom101Flashcards.map((card) => ({ ...card, type: "freedom-101" })),
  ].filter(isValidFlashcard) // Only include valid flashcards

  // Calculate total count from all data files (before filtering)
  const totalFlashcardsInDataFiles =
    allTheyLiedFlashcards.length +
    allWeWereRightFlashcards.length +
    allWhyDoYouFeelFlashcards.length +
    allAntiAmericanFlashcards.length +
    allImCuriousFlashcards.length +
    allGlobalAgendaFlashcards.length +
    allDoubleStandardsFlashcards.length +
    allLogicCheckFlashcards.length +
    allFollowTheMoneyFlashcards.length +
    allMediaNarrativesFlashcards.length +
    allScienceOrPoliticsFlashcards.length +
    allConstitutionMattersFlashcards.length +
    allCommonSenseCheckFlashcards.length +
    allHistoryRewrittenFlashcards.length +
    allFreedomIsntFreeFlashcards.length +
    allThinkForYourselfFlashcards.length +
    allCultureWarFlashcards.length +
    allFreedom101Flashcards.length

  // Load shown card IDs from localStorage on initial render
  useEffect(() => {
    const loadShownCards = () => {
      const savedShownCards = localStorage.getItem("shownCardIds")
      if (savedShownCards) {
        setShownCardIds(new Set(JSON.parse(savedShownCards)))
      }

      const savedAllCardsShown = localStorage.getItem("allCardsShown")
      if (savedAllCardsShown) {
        setAllCardsShown(JSON.parse(savedAllCardsShown))
      }
    }

    loadShownCards()
    getNewCard()
  }, [])

  const getNewCard = () => {
    setLoading(true)

    // Check if we have any valid cards at all
    if (allFlashcards.length === 0) {
      console.error("No valid flashcards available")
      setLoading(false)
      return
    }

    // If all cards have been shown, reset tracking
    if (shownCardIds.size >= allFlashcards.length || allCardsShown) {
      setShownCardIds(new Set())
      setAllCardsShown(false)
      localStorage.removeItem("shownCardIds")
      localStorage.setItem("allCardsShown", "false")
    }

    // Get cards that haven't been shown yet
    const availableCards = allFlashcards.filter((card) => {
      const cardId = `${card.type}-${card.id}`
      return !shownCardIds.has(cardId)
    })

    // If we've shown all cards, this means we just reset, so use all cards
    const cardsToChooseFrom = availableCards.length > 0 ? availableCards : allFlashcards

    // Get random card and validate it
    let randomCard = null
    let attempts = 0
    const maxAttempts = cardsToChooseFrom.length * 2 // Prevent infinite loop

    while (!randomCard && attempts < maxAttempts) {
      const candidateCard = cardsToChooseFrom[Math.floor(Math.random() * cardsToChooseFrom.length)]
      if (isValidFlashcard(candidateCard)) {
        randomCard = candidateCard
      }
      attempts++
    }

    // Fallback: if we still don't have a valid card, find the first valid one
    if (!randomCard) {
      randomCard = cardsToChooseFrom.find(isValidFlashcard)
    }

    // If we still don't have a valid card, something is seriously wrong
    if (!randomCard) {
      console.error("Could not find any valid flashcards")
      setLoading(false)
      return
    }

    // Mark this card as shown
    const cardId = `${randomCard.type}-${randomCard.id}`
    const newShownCardIds = new Set(shownCardIds)
    newShownCardIds.add(cardId)

    // Check if we've now shown all cards
    const newAllCardsShown = newShownCardIds.size >= allFlashcards.length

    // Update state
    setShownCardIds(newShownCardIds)
    setAllCardsShown(newAllCardsShown)

    // Save to localStorage
    localStorage.setItem("shownCardIds", JSON.stringify([...newShownCardIds]))
    localStorage.setItem("allCardsShown", JSON.stringify(newAllCardsShown))

    // Set the current card after a short delay to simulate loading
    setTimeout(() => {
      setCurrentCard(randomCard)
      setLoading(false)
    }, 500)
  }

  if (loading || !currentCard) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-secondary text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">FREEDOM-FLASHCARDS.COM</h1>
                <p className="text-lg mt-1">Eye-opening conversations for breaking the programming</p>
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

        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 w-full max-w-2xl bg-gray-100 rounded"></div>
          </div>
        </main>

        <footer className="bg-gray-100 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} FREEDOM-FLASHCARDS.COM. All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-600">Helping patriots have eye-opening conversations since 2024.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">FREEDOM-FLASHCARDS.COM</h1>
              <p className="text-lg mt-1">Eye-opening conversations for breaking the programming</p>
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

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">Random Flashcard</h1>

        <div className="max-w-2xl mx-auto mb-8">
          {currentCard.type === "why-do-you-feel" ||
          currentCard.type === "im-curious" ||
          currentCard.type === "double-standards" ? (
            <QuestionFlashcard flashcard={currentCard} />
          ) : (
            <FlashcardComponent flashcard={currentCard} />
          )}
        </div>

        <div className="text-center">
          <NewCardButton onClick={getNewCard} className="bg-primary hover:bg-primary-hover text-white" />
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          {allCardsShown
            ? "You've seen all flashcards! Starting a new cycle."
            : `You've seen ${shownCardIds.size} out of ${totalFlashcardsInDataFiles} flashcards.`}
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} FREEDOM-FLASHCARDS.COM. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-600">Helping patriots have eye-opening conversations since 2024.</p>
        </div>
      </footer>
    </div>
  )
}
