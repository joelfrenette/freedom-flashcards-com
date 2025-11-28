"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Sparkles, Loader2 } from "lucide-react"

import { allTheyLiedFlashcards } from "@/data/they-lied-flashcards"
import { allWeWereRightFlashcards } from "@/data/we-were-right-flashcards"
import { allWhyDoYouFeelFlashcards } from "@/data/why-do-you-feel-flashcards"
import { allDoubleStandardsFlashcards } from "@/data/double-standards-flashcards"
import { allLogicCheckFlashcards } from "@/data/logic-check-flashcards"
import { allAntiAmericanFlashcards } from "@/data/anti-american-flashcards"
import { allImCuriousFlashcards } from "@/data/im-curious-flashcards"
import { allGlobalAgendaFlashcards } from "@/data/global-agenda-flashcards"
import { allFreedom101Flashcards } from "@/data/freedom-101-flashcards"
import { allFollowTheMoneyFlashcards } from "@/data/follow-the-money-flashcards"
import { allMediaNarrativesFlashcards } from "@/data/media-narratives-flashcards"
import { allScienceOrPoliticsFlashcards } from "@/data/science-or-politics-flashcards"
import { allConstitutionMattersFlashcards } from "@/data/constitution-matters-flashcards"
import { allCommonSenseCheckFlashcards } from "@/data/common-sense-check-flashcards"
import { allHistoryRewrittenFlashcards } from "@/data/history-rewritten-flashcards"
import { allFreedomIsntFreeFlashcards } from "@/data/freedom-isnt-free-flashcards"
import { allThinkForYourselfFlashcards } from "@/data/think-for-yourself-flashcards"
import { allCultureWarFlashcards } from "@/data/culture-war-flashcards"

// Default API key
const DEFAULT_XAI_KEY = "xai-6WyoDW6yGHRQJTD4Q7Wpcc7X4QSdtplJxJhggg9t4gVPRhIAQoL7AEfSIn8d5VHf7J4L2qAZnx7mcv81"

const getCategoryTitle = (slug: string): string => {
  const titleMap: Record<string, string> = {
    "freedom-101": "Freedom 101",
    "they-lied": "They Lied To Us About",
    "we-were-right": "We Were Right About",
    "why-do-you-feel": "Why Do You Feel",
    "double-standards": "Double Standards Exposed",
    "logic-check": "Logic Check",
    "anti-american": "These Views Are Anti-American",
    "im-curious": "I'm Just Curious",
    "global-agenda": "Global Agenda Exposed",
    "follow-the-money": "Follow the Money",
    "media-narratives": "Media Narratives Exposed",
    "science-or-politics": "Science or Politics?",
    "constitution-matters": "The Constitution Still Matters",
    "common-sense-check": "Common Sense Check",
    "history-rewritten": "History Rewritten",
    "freedom-isnt-free": "Freedom Isn't Free",
    "think-for-yourself": "Think For Yourself",
    "culture-war": "The Culture War Chronicles",
  }
  return titleMap[slug] || "Category Management"
}

export default function CategoryManagementPage() {
  const router = useRouter()
  const params = useParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [flashcards, setFlashcards] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [editForm, setEditForm] = useState({
    title: "",
    claim: "",
    truth: "",
    question: "",
  })
  const [validationError, setValidationError] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  const categoryName = params.category as string
  const categoryTitle = getCategoryTitle(categoryName)

  const getDefaultFlashcards = (category: string): any[] => {
    console.log(`Getting default flashcards for category: ${category}`)

    const dataMap: Record<string, any[]> = {
      "they-lied": allTheyLiedFlashcards,
      "we-were-right": allWeWereRightFlashcards,
      "why-do-you-feel": allWhyDoYouFeelFlashcards,
      "double-standards": allDoubleStandardsFlashcards,
      "logic-check": allLogicCheckFlashcards,
      "anti-american": allAntiAmericanFlashcards,
      "im-curious": allImCuriousFlashcards,
      "global-agenda": allGlobalAgendaFlashcards,
      "freedom-101": allFreedom101Flashcards,
      "follow-the-money": allFollowTheMoneyFlashcards,
      "media-narratives": allMediaNarrativesFlashcards,
      "science-or-politics": allScienceOrPoliticsFlashcards,
      "constitution-matters": allConstitutionMattersFlashcards,
      "common-sense-check": allCommonSenseCheckFlashcards,
      "history-rewritten": allHistoryRewrittenFlashcards,
      "freedom-isnt-free": allFreedomIsntFreeFlashcards,
      "think-for-yourself": allThinkForYourselfFlashcards,
      "culture-war": allCultureWarFlashcards,
    }

    const cards = dataMap[category] || []
    console.log(`Retrieved ${cards.length} flashcards for ${category}`)
    return cards
  }

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      loadFlashcards()

      // Load API key from localStorage or use default
      const savedKey = localStorage.getItem("xai-api-key")
      if (savedKey) {
        setApiKey(savedKey)
      } else {
        // Set and save default key
        setApiKey(DEFAULT_XAI_KEY)
        localStorage.setItem("xai-api-key", DEFAULT_XAI_KEY)
      }
    }
  }, [router, categoryName])

  const loadFlashcards = () => {
    console.log(`Starting to load flashcards for ${categoryName}`)
    const savedData = localStorage.getItem(`flashcards-${categoryName}`)

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        console.log(`Loaded ${parsed.length} cards from localStorage for ${categoryName}`)
        setFlashcards(parsed)
      } catch (error) {
        console.error("Error parsing saved flashcards:", error)
        loadDefaultFlashcards()
      }
    } else {
      console.log(`No saved data found, loading default flashcards for ${categoryName}`)
      loadDefaultFlashcards()
    }
  }

  const loadDefaultFlashcards = () => {
    console.log(`Loading default flashcards for ${categoryName}`)
    const defaultCards = getDefaultFlashcards(categoryName)
    console.log(`Got ${defaultCards.length} default cards from data file`)

    if (defaultCards.length > 0) {
      // Ensure all cards have IDs - DO NOT SLICE, USE ALL CARDS
      const cardsWithIds = defaultCards.map((card, index) => ({
        ...card,
        id: card.id || index + 1,
      }))
      console.log(`Setting ALL ${cardsWithIds.length} cards to state`)
      setFlashcards(cardsWithIds)

      // Save ALL cards to localStorage for future edits
      localStorage.setItem(`flashcards-${categoryName}`, JSON.stringify(cardsWithIds))
      console.log(`Saved ${cardsWithIds.length} cards to localStorage`)
    } else {
      console.log("No default cards found")
      setFlashcards([])
    }
  }

  const saveFlashcards = (updatedFlashcards: any[]) => {
    console.log(`Saving ${updatedFlashcards.length} flashcards`)
    setFlashcards(updatedFlashcards)
    localStorage.setItem(`flashcards-${categoryName}`, JSON.stringify(updatedFlashcards))

    // Update category count in the categories list
    const categoriesData = localStorage.getItem("categories")
    if (categoriesData) {
      const categories = JSON.parse(categoriesData)
      const updatedCategories = categories.map((c: any) =>
        c.slug === categoryName ? { ...c, count: updatedFlashcards.length } : c,
      )
      localStorage.setItem("categories", JSON.stringify(updatedCategories))
    }
  }

  const validateForm = (): boolean => {
    setValidationError("")

    if (isQuestionType) {
      if (!editForm.question || editForm.question.trim().length === 0) {
        setValidationError("Question cannot be empty")
        return false
      }
    } else {
      if (!editForm.title || editForm.title.trim().length === 0) {
        setValidationError("Title cannot be empty")
        return false
      }
      if (!editForm.claim || editForm.claim.trim().length === 0) {
        setValidationError("Claim cannot be empty")
        return false
      }
      if (!editForm.truth || editForm.truth.trim().length === 0) {
        setValidationError("Truth cannot be empty")
        return false
      }
    }

    return true
  }

  const handleEdit = (flashcard: any) => {
    setEditingId(flashcard.id)
    setValidationError("")
    setEditForm({
      title: flashcard.title || "",
      claim: flashcard.claim || "",
      truth: flashcard.truth || "",
      question: flashcard.question || "",
    })
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    const updatedFlashcards = flashcards.map((card) => (card.id === editingId ? { ...card, ...editForm } : card))
    saveFlashcards(updatedFlashcards)
    setEditingId(null)
    setEditForm({ title: "", claim: "", truth: "", question: "" })
    setValidationError("")
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this flashcard?")) {
      const updatedFlashcards = flashcards.filter((card) => card.id !== id)
      saveFlashcards(updatedFlashcards)
    }
  }

  const handleAdd = () => {
    if (!validateForm()) {
      return
    }

    const newCard = {
      id: Math.max(...flashcards.map((c) => c.id), 0) + 1,
      ...editForm,
    }
    saveFlashcards([...flashcards, newCard])
    setIsAdding(false)
    setEditForm({ title: "", claim: "", truth: "", question: "" })
    setValidationError("")
  }

  const isDuplicate = (newCard: any, existingCards: any[]): boolean => {
    return existingCards.some((card) => {
      if (isQuestionType) {
        return card.question?.toLowerCase().trim() === newCard.question?.toLowerCase().trim()
      } else {
        return (
          card.title?.toLowerCase().trim() === newCard.title?.toLowerCase().trim() ||
          card.claim?.toLowerCase().trim() === newCard.claim?.toLowerCase().trim()
        )
      }
    })
  }

  const handleQuickFill = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true)
      return
    }

    setIsGenerating(true)
    setValidationError("")

    try {
      localStorage.setItem("xai-api-key", apiKey)

      // Get sample cards for context (limit to 5 for prompt)
      const sampleCards = flashcards.slice(0, Math.min(5, flashcards.length))

      let prompt = ""
      if (categoryName === "freedom-101") {
        prompt = `Generate 10 unique educational flashcards for the "Freedom 101" category.

Each flashcard should contain:
- A statement, quote, or phrase from foundational freedom documents (U.S. Constitution, Bill of Rights, Federalist Papers, Magna Carta, Declaration of Independence, Universal Declaration of Human Rights, Civil Rights legislation, etc.)
- An explanation of what it means in simple, accessible language

Here are some examples from this category:
${sampleCards
  .map(
    (card) => `
Title: ${card.title}
Claim: ${card.claim}
Truth: ${card.truth}
---`,
  )
  .join("\n")}

Generate 10 NEW flashcards that teach about freedom, rights, and constitutional principles.
Each should reference actual historical documents and explain their significance.

Return ONLY a JSON array with this exact structure:
[{"title": "Document/Principle Name", "claim": "What does this mean or why is it important?", "truth": "Clear explanation in simple language"}, ...]

Do not include any other text, explanations, or markdown. Just the raw JSON array.`
      } else if (categoryName === "common-sense-check") {
        prompt = `Generate 10 unique flashcards for the "Common Sense Check" category.

Each flashcard should expose absurd left-wing claims, policies, or narratives using simple common sense reasoning from a right-wing/conservative perspective.

Focus on:
- Illogical progressive policies that defy basic reasoning
- Woke ideology that contradicts reality
- Liberal double standards exposed by simple logic
- Leftist claims that fall apart under common sense scrutiny
- Progressive absurdities vs conservative common sense

Here are some examples from this category:
${sampleCards
  .map(
    (card) => `
Title: ${card.title}
Claim: ${card.claim}
Truth: ${card.truth}
---`,
  )
  .join("\n")}

Generate 10 NEW flashcards that apply basic common sense to reveal the absurdity of left-wing positions.
Each should contrast a ridiculous leftist claim with straightforward conservative reasoning.

Return ONLY a JSON array with this exact structure:
[{"title": "...", "claim": "The absurd left-wing claim or policy", "truth": "The common sense conservative response"}, ...]

Do not include any other text, explanations, or markdown. Just the raw JSON array.`
      } else if (isQuestionType) {
        prompt = `Generate 10 unique thought-provoking questions for a category titled "${categoryTitle}". 
These questions should challenge common narratives and encourage critical thinking.

Here are some examples from this category:
${sampleCards.map((card) => `- ${card.question}`).join("\n")}

Generate 10 NEW questions that are similar in style and tone but completely unique. 
Return ONLY a JSON array with this exact structure:
[{"question": "your question here"}, ...]

Do not include any other text, explanations, or markdown. Just the raw JSON array.`
      } else {
        prompt = `Generate 10 unique flashcards for a category titled "${categoryTitle}".
Each flashcard should expose a lie or reveal truth about the topic.

Here are some examples from this category:
${sampleCards
  .map(
    (card) => `
Title: ${card.title}
Claim: ${card.claim}
Truth: ${card.truth}
---`,
  )
  .join("\n")}

Generate 10 NEW flashcards that are similar in style and tone but completely unique.
Return ONLY a JSON array with this exact structure:
[{"title": "...", "claim": "...", "truth": "..."}, ...]

Do not include any other text, explanations, or markdown. Just the raw JSON array.`
      }

      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates educational flashcard content. Always respond with valid JSON arrays only, no additional text.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "grok-2-1212",
          temperature: 0.8,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      const content = data.choices[0].message.content

      let generatedCards = []
      try {
        generatedCards = JSON.parse(content)
      } catch {
        const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/)
        if (jsonMatch) {
          generatedCards = JSON.parse(jsonMatch[1])
        } else {
          const arrayMatch = content.match(/\[[\s\S]*\]/)
          if (arrayMatch) {
            generatedCards = JSON.parse(arrayMatch[0])
          } else {
            throw new Error("Could not parse JSON from AI response")
          }
        }
      }

      if (!Array.isArray(generatedCards)) {
        throw new Error("AI response is not an array")
      }

      const uniqueCards = generatedCards.filter((card) => !isDuplicate(card, flashcards))

      if (uniqueCards.length === 0) {
        setValidationError("All generated cards were duplicates. Try again for different results.")
        setIsGenerating(false)
        return
      }

      const maxId = Math.max(...flashcards.map((c) => c.id), 0)
      const newCards = uniqueCards.map((card, index) => ({
        id: maxId + index + 1,
        ...card,
      }))

      saveFlashcards([...flashcards, ...newCards])

      const skippedCount = generatedCards.length - uniqueCards.length
      if (skippedCount > 0) {
        alert(`Added ${uniqueCards.length} new flashcards. Skipped ${skippedCount} duplicates.`)
      } else {
        alert(`Successfully added ${uniqueCards.length} new flashcards!`)
      }
    } catch (error: any) {
      console.error("Error generating flashcards:", error)
      setValidationError(`Failed to generate flashcards: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBulkUpdate = () => {
    const csv = prompt("Paste JSON array:")
    if (csv) {
      try {
        const data = JSON.parse(csv)
        if (Array.isArray(data)) {
          const validItems = data.filter((item) => {
            if (isQuestionType) {
              return item.question && item.question.trim().length > 0
            } else {
              return (
                item.title &&
                item.title.trim().length > 0 &&
                item.claim &&
                item.claim.trim().length > 0 &&
                item.truth &&
                item.truth.trim().length > 0
              )
            }
          })

          if (validItems.length === 0) {
            alert("No valid flashcards found in the provided data.")
            return
          }

          const newFlashcards = validItems.map((item, index) => ({
            id: flashcards.length + index + 1,
            ...item,
          }))
          saveFlashcards([...flashcards, ...newFlashcards])

          const invalidCount = data.length - validItems.length
          if (invalidCount > 0) {
            alert(`Added ${validItems.length} valid flashcards. Skipped ${invalidCount} invalid flashcards.`)
          } else {
            alert(`Added ${newFlashcards.length} flashcards successfully!`)
          }
        }
      } catch {
        alert("Invalid format. Please use JSON array format.")
      }
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const isQuestionType = categoryName === "why-do-you-feel" || categoryName === "im-curious"

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{categoryTitle}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/admin" className="flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex gap-2">
            <Button
              onClick={handleQuickFill}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" /> Quick Fill (AI)
                </>
              )}
            </Button>
            <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-primary-hover text-white">
              <Plus className="h-4 w-4 mr-2" /> Add New
            </Button>
            <Button onClick={handleBulkUpdate} variant="outline" className="border-primary text-primary bg-transparent">
              Bulk Import
            </Button>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Total: {flashcards.length} flashcards
          {flashcards.length > 0 && <span className="ml-2 text-green-600">✓ Loaded successfully</span>}
        </div>

        {showApiKeyInput && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">xAI API Key Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800 mb-4">
                To use the Quick Fill feature, you need an xAI API key. Get yours at{" "}
                <a
                  href="https://console.x.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  console.x.ai
                </a>
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                  placeholder="Enter your xAI API key..."
                />
                <Button
                  onClick={() => {
                    if (apiKey) {
                      localStorage.setItem("xai-api-key", apiKey)
                      setShowApiKeyInput(false)
                      handleQuickFill()
                    }
                  }}
                  className="bg-primary hover:bg-primary-hover text-white"
                >
                  Save & Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {validationError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">{validationError}</div>
        )}

        {isAdding && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Flashcard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!isQuestionType && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter title..."
                    />
                  </div>
                )}
                {isQuestionType ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Question *</label>
                    <textarea
                      value={editForm.question}
                      onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                      placeholder="Enter question..."
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Claim *</label>
                      <textarea
                        value={editForm.claim}
                        onChange={(e) => setEditForm({ ...editForm, claim: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={2}
                        placeholder="Enter the claim..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Truth *</label>
                      <textarea
                        value={editForm.truth}
                        onChange={(e) => setEditForm({ ...editForm, truth: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        rows={3}
                        placeholder="Enter the truth..."
                      />
                    </div>
                  </>
                )}
                <div className="flex gap-2">
                  <Button onClick={handleAdd} className="bg-primary hover:bg-primary-hover text-white">
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAdding(false)
                      setValidationError("")
                    }}
                    variant="outline"
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {flashcards.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p className="mb-4">No flashcards yet.</p>
                <p className="text-sm">
                  Click "Add New" to create manually or "Quick Fill (AI)" to generate 10 cards using AI!
                </p>
              </CardContent>
            </Card>
          ) : (
            flashcards.map((flashcard) => (
              <Card key={flashcard.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {editingId === flashcard.id ? (
                    <div className="space-y-4">
                      {!isQuestionType && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Title *</label>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      )}
                      {isQuestionType ? (
                        <div>
                          <label className="block text-sm font-medium mb-2">Question *</label>
                          <textarea
                            value={editForm.question}
                            onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            rows={3}
                          />
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2">Claim *</label>
                            <textarea
                              value={editForm.claim}
                              onChange={(e) => setEditForm({ ...editForm, claim: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Truth *</label>
                            <textarea
                              value={editForm.truth}
                              onChange={(e) => setEditForm({ ...editForm, truth: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md"
                              rows={3}
                            />
                          </div>
                        </>
                      )}
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-white">
                          <Save className="h-4 w-4 mr-2" /> Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingId(null)
                            setValidationError("")
                          }}
                          variant="outline"
                        >
                          <X className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {isQuestionType ? (
                        <p className="mb-4 text-gray-900">{flashcard.question}</p>
                      ) : (
                        <>
                          <h3 className="font-bold text-lg mb-2 text-gray-900">{flashcard.title}</h3>
                          <div className="mb-2">
                            <span className="text-sm font-semibold text-red-600">Claim:</span>
                            <p className="text-sm text-gray-700">{flashcard.claim}</p>
                          </div>
                          <div className="mb-4">
                            <span className="text-sm font-semibold text-green-600">Truth:</span>
                            <p className="text-sm text-gray-700">{flashcard.truth}</p>
                          </div>
                        </>
                      )}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(flashcard)}
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary"
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(flashcard.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
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
