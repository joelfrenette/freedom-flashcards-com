"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  MessageSquare,
  ThumbsUp,
  Heart,
  Scale,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Globe,
  DollarSign,
  Newspaper,
  Microscope,
  Scroll,
  Lightbulb,
  BookOpen,
  Flag,
  Brain,
  Swords,
  GraduationCap,
} from "lucide-react"

export default function CategoriesPage() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategoryCounts() {
      try {
        const [
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
          freedom101,
        ] = await Promise.all([
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
          import("@/data/freedom-101-flashcards"),
        ])

        setCategoryCounts({
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
          "freedom-101": freedom101.allFreedom101Flashcards?.length || 0,
        })
      } catch (error) {
        console.error("Error loading category counts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCategoryCounts()
  }, [])

  const categories = [
    {
      title: "Freedom 101",
      slug: "freedom-101",
      icon: GraduationCap,
      color: "text-blue-700",
      description:
        "Start your journey with America's founding documents and principles explained simply. Perfect for newcomers to conservative thought and constitutional basics.",
    },
    {
      title: "They Lied To Us About",
      slug: "they-lied",
      icon: MessageSquare,
      color: "text-blue-600",
      description:
        "Uncover the narratives that turned out to be false or misleading. From policy promises to media stories, discover what they got wrong.",
    },
    {
      title: "We Were Right About",
      slug: "we-were-right",
      icon: ThumbsUp,
      color: "text-green-600",
      description:
        "Conservative predictions that came true despite mockery and dismissal. See the issues where time proved skeptics correct.",
    },
    {
      title: "Why Do You Feel",
      slug: "why-do-you-feel",
      icon: Heart,
      color: "text-red-600",
      description:
        "Question the emotional arguments used to bypass logic and reason. Explore how feelings are weaponized in political discourse.",
    },
    {
      title: "Double Standards Exposed",
      slug: "double-standards",
      icon: Scale,
      color: "text-purple-600",
      description:
        "Reveal the hypocrisy when rules change based on who's involved. Compare identical situations treated completely differently.",
    },
    {
      title: "Logic Check",
      slug: "logic-check",
      icon: CheckCircle,
      color: "text-teal-600",
      description:
        "Test popular arguments against basic reasoning and common sense. Identify logical fallacies in everyday political talking points.",
    },
    {
      title: "These Views Are Anti-American",
      slug: "anti-american",
      icon: AlertTriangle,
      color: "text-orange-600",
      description:
        "Examine ideas that contradict America's founding values and constitutional principles. Understand what threatens our republic's foundation.",
    },
    {
      title: "I'm Just Curious",
      slug: "im-curious",
      icon: HelpCircle,
      color: "text-indigo-600",
      description:
        "Ask the questions they don't want you to ask. Polite inquiries that expose uncomfortable truths and challenge narratives.",
    },
    {
      title: "Global Agenda Exposed",
      slug: "global-agenda",
      icon: Globe,
      color: "text-cyan-600",
      description:
        "Discover how international organizations influence American policy and sovereignty. Learn what global elites have planned for your future.",
    },
    {
      title: "Follow the Money",
      slug: "follow-the-money",
      icon: DollarSign,
      color: "text-emerald-600",
      description:
        "Track the financial interests behind political movements and policy decisions. See who profits from the causes they champion.",
    },
    {
      title: "Media Narratives Exposed",
      slug: "media-narratives",
      icon: Newspaper,
      color: "text-rose-600",
      description:
        "Decode how mainstream media shapes public opinion through selective reporting. Understand the techniques used to manipulate the news.",
    },
    {
      title: "Science or Politics?",
      slug: "science-or-politics",
      icon: Microscope,
      color: "text-violet-600",
      description:
        "Distinguish between legitimate science and political agendas disguised as research. Question when 'experts' become activists.",
    },
    {
      title: "The Constitution Still Matters",
      slug: "constitution-matters",
      icon: Scroll,
      color: "text-amber-600",
      description:
        "Understand why our founding document remains relevant and under attack. Defend the principles that protect American freedom.",
    },
    {
      title: "Common Sense Check",
      slug: "common-sense-check",
      icon: Lightbulb,
      color: "text-yellow-600",
      description:
        "Apply basic common sense to absurd claims and policies. Sometimes the simplest reasoning reveals the biggest truths.",
    },
    {
      title: "History Rewritten",
      slug: "history-rewritten",
      icon: BookOpen,
      color: "text-stone-600",
      description:
        "Discover how historical facts are being altered to fit modern narratives. Compare what really happened to what's now being taught.",
    },
    {
      title: "Freedom Isn't Free",
      slug: "freedom-isnt-free",
      icon: Flag,
      color: "text-red-700",
      description:
        "Honor the sacrifices made for American liberty throughout history. Understand the cost of freedom and why it must be defended.",
    },
    {
      title: "Think For Yourself",
      slug: "think-for-yourself",
      icon: Brain,
      color: "text-fuchsia-600",
      description:
        "Break free from groupthink and challenge accepted narratives. Develop critical thinking skills to question everything.",
    },
    {
      title: "The Culture War Chronicles",
      slug: "culture-war",
      icon: Swords,
      color: "text-pink-600",
      description:
        "Navigate the battles over values, traditions, and American identity. Understand the fronts in today's cultural conflicts.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Image src="/logo.jpg" alt="Freedom Flashcards Logo" width={50} height={50} className="rounded" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                    Freedom Flashcards
                  </h1>
                  <p className="text-lg mt-1 text-center md:text-left">Greatest conversation starters</p>
                </div>
              </div>
            </div>
            <nav className="flex gap-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/categories" className="hover:underline font-semibold">
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Flashcard Categories</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon
              const count = categoryCounts[category.slug] || 0

              return (
                <div
                  key={category.slug}
                  className="p-6 flex flex-col hover:shadow-lg transition-shadow border rounded-lg bg-white"
                >
                  <div className="flex items-start mb-3">
                    <div className={`mr-3 mt-1 ${category.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{category.description}</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t">
                    <span className="text-sm font-medium text-gray-700">{count} flashcards</span>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-primary text-white hover:bg-primary-hover h-9 px-4 py-2 cursor-pointer"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Freedom Flashcards. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-600">Helping patriots have eye-opening conversations since 2024.</p>
        </div>
      </footer>
    </div>
  )
}
