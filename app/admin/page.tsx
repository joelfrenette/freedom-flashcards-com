"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Edit, Trash2, Plus, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadCategoryCounts = async () => {
    try {
      const [
        freedom101,
        theyLied,
        weWereRight,
        whyDoYouFeel,
        doubleStandards,
        logicCheck,
        antiAmerican,
        imCurious,
        globalAgenda,
        followTheMoney,
        mediaNarratives,
        scienceOrPolitics,
        constitutionMatters,
        commonSenseCheck,
        historyRewritten,
        freedomIsntFree,
        thinkForYourself,
        cultureWar,
      ] = await Promise.all([
        import("@/data/freedom-101-flashcards"),
        import("@/data/they-lied-flashcards"),
        import("@/data/we-were-right-flashcards"),
        import("@/data/why-do-you-feel-flashcards"),
        import("@/data/double-standards-flashcards"),
        import("@/data/logic-check-flashcards"),
        import("@/data/anti-american-flashcards"),
        import("@/data/im-curious-flashcards"),
        import("@/data/global-agenda-flashcards"),
        import("@/data/follow-the-money-flashcards"),
        import("@/data/media-narratives-flashcards"),
        import("@/data/science-or-politics-flashcards"),
        import("@/data/constitution-matters-flashcards"),
        import("@/data/common-sense-check-flashcards"),
        import("@/data/history-rewritten-flashcards"),
        import("@/data/freedom-isnt-free-flashcards"),
        import("@/data/think-for-yourself-flashcards"),
        import("@/data/culture-war-flashcards"),
      ])

      // Default counts from data files
      const defaultCounts: Record<string, number> = {
        "freedom-101": freedom101.allFreedom101Flashcards?.length || 0,
        "they-lied": theyLied.allTheyLiedFlashcards?.length || 0,
        "we-were-right": weWereRight.allWeWereRightFlashcards?.length || 0,
        "why-do-you-feel": whyDoYouFeel.allWhyDoYouFeelFlashcards?.length || 0,
        "double-standards": doubleStandards.allDoubleStandardsFlashcards?.length || 0,
        "logic-check": logicCheck.allLogicCheckFlashcards?.length || 0,
        "anti-american": antiAmerican.allAntiAmericanFlashcards?.length || 0,
        "im-curious": imCurious.allImCuriousFlashcards?.length || 0,
        "global-agenda": globalAgenda.allGlobalAgendaFlashcards?.length || 0,
        "follow-the-money": followTheMoney.allFollowTheMoneyFlashcards?.length || 0,
        "media-narratives": mediaNarratives.allMediaNarrativesFlashcards?.length || 0,
        "science-or-politics": scienceOrPolitics.allScienceOrPoliticsFlashcards?.length || 0,
        "constitution-matters": constitutionMatters.allConstitutionMattersFlashcards?.length || 0,
        "common-sense-check": commonSenseCheck.allCommonSenseCheckFlashcards?.length || 0,
        "history-rewritten": historyRewritten.allHistoryRewrittenFlashcards?.length || 0,
        "freedom-isnt-free": freedomIsntFree.allFreedomIsntFreeFlashcards?.length || 0,
        "think-for-yourself": thinkForYourself.allThinkForYourselfFlashcards?.length || 0,
        "culture-war": cultureWar.allCultureWarFlashcards?.length || 0,
      }

      // Check localStorage for each category and use that count if it exists
      const actualCounts: Record<string, number> = {}
      Object.keys(defaultCounts).forEach((categorySlug) => {
        const savedData = localStorage.getItem(`flashcards-${categorySlug}`)
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData)
            actualCounts[categorySlug] = parsed.length
          } catch {
            actualCounts[categorySlug] = defaultCounts[categorySlug]
          }
        } else {
          actualCounts[categorySlug] = defaultCounts[categorySlug]
        }
      })

      setCategoryCounts(actualCounts)
    } catch (error) {
      console.error("Error loading category counts:", error)
    }
  }

  useEffect(() => {
    async function initialLoad() {
      await loadCategoryCounts()
      setLoading(false)
    }
    initialLoad()
  }, [])

  const handleRefreshCounts = async () => {
    setRefreshing(true)
    await loadCategoryCounts()
    setRefreshing(false)
  }

  const categories = [
    {
      name: "Freedom 101",
      slug: "freedom-101",
      description:
        "Start your journey with America's founding documents and principles explained simply. Perfect for newcomers to conservative thought and constitutional basics.",
    },
    {
      name: "They Lied To Us About",
      slug: "they-lied",
      description:
        "Uncover the narratives that turned out to be false or misleading. From policy promises to media stories, discover what they got wrong.",
    },
    {
      name: "We Were Right About",
      slug: "we-were-right",
      description:
        "Conservative predictions that came true despite mockery and dismissal. See the issues where time proved skeptics correct.",
    },
    {
      name: "Why Do You Feel",
      slug: "why-do-you-feel",
      description:
        "Question the emotional arguments used to bypass logic and reason. Explore how feelings are weaponized in political discourse.",
    },
    {
      name: "Double Standards Exposed",
      slug: "double-standards",
      description:
        "Reveal the hypocrisy when rules change based on who's involved. Compare identical situations treated completely differently.",
    },
    {
      name: "Logic Check",
      slug: "logic-check",
      description:
        "Test popular arguments against basic reasoning and common sense. Identify logical fallacies in everyday political talking points.",
    },
    {
      name: "These Views Are Anti-American",
      slug: "anti-american",
      description:
        "Examine ideas that contradict America's founding values and constitutional principles. Understand what threatens our republic's foundation.",
    },
    {
      name: "I'm Just Curious",
      slug: "im-curious",
      description:
        "Ask the questions they don't want you to ask. Polite inquiries that expose uncomfortable truths and challenge narratives.",
    },
    {
      name: "Global Agenda Exposed",
      slug: "global-agenda",
      description:
        "Discover how international organizations influence American policy and sovereignty. Learn what global elites have planned for your future.",
    },
    {
      name: "Follow the Money",
      slug: "follow-the-money",
      description:
        "Track the financial interests behind political movements and policy decisions. See who profits from the causes they champion.",
    },
    {
      name: "Media Narratives Exposed",
      slug: "media-narratives",
      description:
        "Decode how mainstream media shapes public opinion through selective reporting. Understand the techniques used to manipulate the news.",
    },
    {
      name: "Science or Politics?",
      slug: "science-or-politics",
      description:
        "Distinguish between legitimate science and political agendas disguised as research. Question when 'experts' become activists.",
    },
    {
      name: "The Constitution Still Matters",
      slug: "constitution-matters",
      description:
        "Understand why our founding document remains relevant and under attack. Defend the principles that protect American freedom.",
    },
    {
      name: "Common Sense Check",
      slug: "common-sense-check",
      description:
        "Apply basic common sense to absurd claims and policies. Sometimes the simplest reasoning reveals the biggest truths.",
    },
    {
      name: "History Rewritten",
      slug: "history-rewritten",
      description:
        "Discover how historical facts are being altered to fit modern narratives. Compare what really happened to what's now being taught.",
    },
    {
      name: "Freedom Isn't Free",
      slug: "freedom-isnt-free",
      description:
        "Honor the sacrifices made for American liberty throughout history. Understand the cost of freedom and why it must be defended.",
    },
    {
      name: "Think For Yourself",
      slug: "think-for-yourself",
      description:
        "Break free from groupthink and challenge accepted narratives. Develop critical thinking skills to question everything.",
    },
    {
      name: "The Culture War Chronicles",
      slug: "culture-war",
      description:
        "Navigate the battles over values, traditions, and American identity. Understand the fronts in today's cultural conflicts.",
    },
  ]

  const totalFlashcards = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-secondary text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-sm mt-1">Manage your Freedom Flashcards content</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="bg-white text-secondary hover:bg-gray-100">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Categories Overview</h2>
            <p className="text-gray-600 mt-1">
              Total: {totalFlashcards} flashcards across {categories.length} categories
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRefreshCounts}
              disabled={refreshing}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Counts
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Category
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                    <div>
                      <p className="text-3xl font-bold text-primary">{categoryCounts[category.slug] || 0}</p>
                      <p className="text-sm text-gray-500">flashcards</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary-hover text-white"
                        onClick={() => router.push(`/admin/categories/${category.slug}`)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                      <Button size="sm" variant="outline" className="border-primary text-primary bg-transparent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
