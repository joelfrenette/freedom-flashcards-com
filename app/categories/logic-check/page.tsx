"use client"

import { useState, useEffect } from "react"
import { FlashcardComponent } from "@/components/flashcard"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { allLogicCheckFlashcards } from "@/data/logic-check-flashcards"
import Link from "next/link"

const allFlashcards = [
  {
    id: 1,
    title: "Tax Cuts Only Help the Rich",
    claim: "Tax cuts only benefit wealthy people and don't help working families.",
    truth:
      "If tax cuts only help the rich, why do you want to raise MY taxes? When everyone pays less, everyone benefits. The middle class gets the largest percentage benefit from most tax cuts.",
    sources: [
      {
        name: "Tax Cut Distribution Analysis",
        url: "https://www.heritage.org/taxes/report/the-tax-cuts-and-jobs-act-simplified-the-tax-code-and-reduced-taxes-american",
      },
      {
        name: "Middle Class Tax Relief Data",
        url: "https://www.taxpolicycenter.org/briefing-book/how-did-tax-cuts-and-jobs-act-change-personal-taxes",
      },
    ],
  },
  {
    id: 2,
    title: "We Need to Spend More on Education",
    claim: "Increasing education spending will automatically improve student outcomes.",
    truth:
      "We already spend more per student than most countries with better results. Maybe it's not about money? How much more spending will it take before we admit the system is broken?",
    sources: [
      {
        name: "International Education Spending",
        url: "https://www.heritage.org/education/report/after-25-years-federal-spending-education-what-have-taxpayers-received-return",
      },
      {
        name: "OECD Education Rankings",
        url: "https://www.oecd.org/pisa/",
      },
    ],
  },
  {
    id: 3,
    title: "Climate Change Requires Immediate Action",
    claim: "We must take drastic action now to prevent climate catastrophe.",
    truth:
      "If it's really an emergency, why are you flying private jets and buying oceanfront mansions? Why not lead by example and stop using fossil fuels first?",
    sources: [
      {
        name: "Climate Elite Hypocrisy",
        url: "https://www.heritage.org/environment/commentary/the-climate-elites-carbon-footprint-problem",
      },
      {
        name: "Private Jet Usage Data",
        url: "https://www.instituteforenergyresearch.org/climate-change/climate-activists-private-jets/",
      },
    ],
  },
  {
    id: 4,
    title: "We Need to Defund the Police",
    claim: "Police funding should be redirected to social programs for community safety.",
    truth:
      "When someone breaks into your house at 3 AM, are you calling a social worker? Why do the people pushing defunding have private security?",
    sources: [
      {
        name: "Crime Statistics Post-Defunding",
        url: "https://www.heritage.org/crime-and-justice/commentary/defunding-police-increases-crime",
      },
      {
        name: "Private Security for Politicians",
        url: "https://www.foxnews.com/politics/defund-police-politicians-security-details",
      },
    ],
  },
  {
    id: 5,
    title: "Voter ID is Racist",
    claim: "Requiring identification to vote disproportionately affects minority communities.",
    truth:
      "You need ID to buy beer, but not to choose the President? How does that make sense? Is buying alcohol more important than voting?",
    sources: [
      {
        name: "Voter ID Polling Data",
        url: "https://www.rasmussenreports.com/public_content/politics/general_politics/march_2021/75_support_voter_id_laws",
      },
      {
        name: "ID Requirements for Daily Activities",
        url: "https://www.heritage.org/election-integrity/commentary/voter-photo-id-standard-worldwide",
      },
    ],
  },
  {
    id: 6,
    title: "America Was Built on Slavery",
    claim: "The United States was fundamentally built on the institution of slavery.",
    truth:
      "Then why did 600,000 Americans die in a war to end it? Why do we fight the bloodiest war in our history to abolish something we were 'built on'?",
    sources: [
      {
        name: "Civil War Casualties",
        url: "https://www.battlefields.org/learn/articles/civil-war-casualties",
      },
      {
        name: "Founding Fathers and Slavery",
        url: "https://www.heritage.org/american-founders/report/did-america-have-christian-founding",
      },
    ],
  },
  {
    id: 7,
    title: "The Rich Don't Pay Their Fair Share",
    claim: "Wealthy Americans need to pay more in taxes to fund government programs.",
    truth:
      "The top 10% pay 70% of all taxes. What percentage would be 'fair'? Should 10% of people pay 100% of the taxes?",
    sources: [
      {
        name: "Tax Distribution Data",
        url: "https://www.heritage.org/taxes/commentary/1-chart-how-much-the-rich-pay-taxes",
      },
      {
        name: "IRS Statistics of Income",
        url: "https://www.irs.gov/statistics/soi-tax-stats-individual-income-tax-rates-and-tax-shares",
      },
    ],
  },
  {
    id: 8,
    title: "We Need Universal Healthcare",
    claim: "Government-run healthcare would provide better coverage for everyone.",
    truth:
      "If government healthcare is so great, why do politicians get private insurance? Why do people from countries with 'free' healthcare come here for treatment?",
    sources: [
      {
        name: "Medical Tourism to US",
        url: "https://www.heritage.org/health-care-reform/report/how-socialized-medicine-hurts-patients-and-doctors",
      },
      {
        name: "Congressional Healthcare Plans",
        url: "https://www.congress.gov/bill/117th-congress/house-bill/1976",
      },
    ],
  },
  {
    id: 9,
    title: "Men Can Get Pregnant",
    claim: "Biological males can become pregnant and give birth.",
    truth:
      "Only biological females have the reproductive organs necessary for pregnancy. This is basic biology that hasn't changed despite social constructs.",
    sources: [
      {
        name: "Basic Human Biology",
        url: "https://www.britannica.com/science/human-reproductive-system",
      },
      {
        name: "Medical Definition of Pregnancy",
        url: "https://www.mayoclinic.org/healthy-lifestyle/getting-pregnant/in-depth/pregnancy/art-20045756",
      },
    ],
  },
  {
    id: 10,
    title: "Math is Racist",
    claim: "Mathematics perpetuates white supremacy and should be decolonized.",
    truth:
      "Math is universal. 2+2=4 regardless of race, culture, or politics. Mathematical principles work the same way everywhere in the universe.",
    sources: [
      {
        name: "Mathematical Universality",
        url: "https://www.scientificamerican.com/article/is-math-a-universal-language/",
      },
      {
        name: "Oregon Drops Math Requirements",
        url: "https://www.oregonlive.com/politics/2021/08/gov-kate-brown-signed-a-law-to-allow-oregon-students-to-graduate-without-proving-they-can-write-or-do-math.html",
      },
    ],
  },
  {
    id: 11,
    title: "Silence is Violence",
    claim: "Not speaking out against injustice is equivalent to committing violence.",
    truth:
      "Silence is literally the absence of action. Violence requires physical force. Words have meanings, and redefining them destroys communication.",
    sources: [
      {
        name: "Definition of Violence",
        url: "https://www.merriam-webster.com/article/silence-is-violence",
      },
      {
        name: "First Amendment Rights",
        url: "https://www.law.cornell.edu/constitution/first_amendment",
      },
    ],
  },
  {
    id: 12,
    title: "Words are Violence",
    claim: "Offensive speech causes the same harm as physical violence.",
    truth:
      "Words and physical violence are fundamentally different. If words were violence, every debate would be assault and every disagreement would be battery.",
    sources: [
      {
        name: "Free Speech Principles",
        url: "https://www.aclu.org/other/freedom-expression",
      },
      {
        name: "Legal Definition of Assault",
        url: "https://www.law.cornell.edu/wex/assault",
      },
    ],
  },
  {
    id: 13,
    title: "Gender is a Social Construct",
    claim: "Gender has no biological basis and is entirely socially constructed.",
    truth:
      "If gender is purely social, why do transgender people need hormones and surgery to change their bodies? You can't medically treat a social construct.",
    sources: [
      {
        name: "Biological Sex Differences",
        url: "https://www.nature.com/articles/s41598-019-53500-y",
      },
      {
        name: "Hormone Therapy Research",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6616494/",
      },
    ],
  },
  {
    id: 14,
    title: "All Cultures are Equal",
    claim: "Every culture is equally valid and none should be judged superior.",
    truth:
      "If all cultures are equal, why do people risk their lives to leave some cultures and move to others? Actions speak louder than relativist theories.",
    sources: [
      {
        name: "Global Migration Patterns",
        url: "https://www.un.org/development/desa/pd/content/international-migrant-stock",
      },
      {
        name: "Freedom House Rankings",
        url: "https://freedomhouse.org/countries/freedom-world/scores",
      },
    ],
  },
  {
    id: 15,
    title: "Capitalism is Exploitation",
    claim: "Capitalism inherently exploits workers and creates inequality.",
    truth:
      "If capitalism is pure exploitation, why do socialist countries build walls to keep people IN rather than OUT? People vote with their feet.",
    sources: [
      {
        name: "Berlin Wall History",
        url: "https://www.history.com/topics/cold-war/berlin-wall",
      },
      {
        name: "Global Poverty Reduction",
        url: "https://ourworldindata.org/extreme-poverty",
      },
    ],
  },
  {
    id: 16,
    title: "There are No Biological Differences",
    claim: "Men and women are biologically identical except for reproductive organs.",
    truth:
      "If there are no biological differences, why do we have separate sports categories? Why do medications affect men and women differently?",
    sources: [
      {
        name: "Sex Differences in Medicine",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4800017/",
      },
      {
        name: "Athletic Performance Gaps",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3761733/",
      },
    ],
  },
  {
    id: 17,
    title: "Diversity is Our Strength",
    claim: "Any form of diversity automatically makes organizations stronger.",
    truth:
      "If diversity of appearance is strength, why do you demand conformity of thought? Shouldn't intellectual diversity matter more than skin color?",
    sources: [
      {
        name: "Intellectual Diversity Study",
        url: "https://www.nas.org/academic-questions/31/2/homogeneous_the_political_affiliations_of_elite_liberal_arts_college_faculty",
      },
      {
        name: "Groupthink Research",
        url: "https://psycnet.apa.org/record/1972-10835-001",
      },
    ],
  },
  {
    id: 18,
    title: "Profit is Evil",
    claim: "Making profit from business is morally wrong and exploitative.",
    truth:
      "Profit is the reward for providing value to others. If profit is evil, why do you expect to be paid for your work? Isn't your salary 'profit' from your labor?",
    sources: [
      {
        name: "Economic Value Creation",
        url: "https://www.investopedia.com/terms/v/value-added.asp",
      },
      {
        name: "Profit Motive Benefits",
        url: "https://www.econlib.org/library/Topics/Details/profits.html",
      },
    ],
  },
  {
    id: 19,
    title: "Borders are Immoral",
    claim: "National borders are artificial constructs that should be eliminated.",
    truth:
      "If borders are immoral, why do you lock your house at night? Why do countries with 'immoral' borders have the highest immigration rates?",
    sources: [
      {
        name: "Immigration Statistics",
        url: "https://www.migrationpolicy.org/programs/data-hub/charts/immigrant-population-over-time",
      },
      {
        name: "Property Rights Theory",
        url: "https://www.cato.org/policy-analysis/importance-property-rights",
      },
    ],
  },
  {
    id: 20,
    title: "Objectivity is White Supremacy",
    claim: "Objective truth and logical reasoning are tools of white supremacy.",
    truth:
      "If objectivity is white supremacy, how can you objectively prove that claim? You're using the very logic you claim is invalid to make your argument.",
    sources: [
      {
        name: "Scientific Method",
        url: "https://www.britannica.com/science/scientific-method",
      },
      {
        name: "Logic and Reasoning",
        url: "https://plato.stanford.edu/entries/logic-classical/",
      },
    ],
  },
  {
    id: 21,
    title: "America is Systemically Racist",
    claim: "Every American institution is designed to oppress minorities.",
    truth:
      "If America is systemically racist, why do millions of minorities immigrate here voluntarily? Why do they stay and thrive rather than leave?",
    sources: [
      {
        name: "Minority Immigration Rates",
        url: "https://www.pewresearch.org/hispanic/2020/08/20/facts-on-u-s-immigrants/",
      },
      {
        name: "Economic Mobility Data",
        url: "https://www.brookings.edu/research/thirteen-economic-facts-about-social-mobility-and-the-role-of-education/",
      },
    ],
  },
  {
    id: 22,
    title: "Guns Cause Violence",
    claim: "The presence of firearms automatically increases violence and crime.",
    truth:
      "If guns cause violence, why do police carry them for protection? Why are the safest places often those with the most armed security?",
    sources: [
      {
        name: "Defensive Gun Use Statistics",
        url: "https://www.cdc.gov/violenceprevention/firearms/fastfact.html",
      },
      {
        name: "Crime Rate Comparisons",
        url: "https://www.fbi.gov/services/cjis/ucr/",
      },
    ],
  },
  {
    id: 23,
    title: "Socialism Has Never Been Tried",
    claim: "Real socialism has never been implemented, only corrupted versions.",
    truth:
      "If socialism keeps getting 'corrupted' every time it's tried, maybe the problem is with socialism itself. How many failed attempts before we admit the theory is flawed?",
    sources: [
      {
        name: "Socialist Experiments History",
        url: "https://www.heritage.org/progressivism/commentary/three-nations-that-tried-socialism-and-rejected-it",
      },
      {
        name: "Economic Freedom Index",
        url: "https://www.heritage.org/index/",
      },
    ],
  },
  {
    id: 24,
    title: "Hate Speech Isn't Free Speech",
    claim: "Offensive speech should be legally restricted and punished.",
    truth:
      "Who decides what's 'hate speech'? If you give government power to ban speech you don't like, what happens when they decide YOUR speech is hateful?",
    sources: [
      {
        name: "First Amendment Protections",
        url: "https://www.law.cornell.edu/constitution/first_amendment",
      },
      {
        name: "Supreme Court Speech Cases",
        url: "https://www.mtsu.edu/first-amendment/encyclopedia/case/texas-v-johnson",
      },
    ],
  },
  {
    id: 25,
    title: "Wealth is Zero-Sum",
    claim: "Rich people getting richer means poor people get poorer.",
    truth:
      "If wealth is zero-sum, how has global poverty decreased while billionaires increased? How do new businesses create value that didn't exist before?",
    sources: [
      {
        name: "Global Poverty Trends",
        url: "https://ourworldindata.org/extreme-poverty",
      },
      {
        name: "Wealth Creation Economics",
        url: "https://www.econlib.org/library/Topics/Details/wealthofnations.html",
      },
    ],
  },
  {
    id: 26,
    title: "Climate Models are Perfect",
    claim: "Climate change predictions are absolutely certain and unquestionable.",
    truth:
      "If climate models are perfect, why have they been consistently wrong for decades? Why do they keep adjusting the predictions when reality doesn't match?",
    sources: [
      {
        name: "Climate Model Accuracy",
        url: "https://www.nature.com/articles/nature08823",
      },
      {
        name: "Prediction vs Reality Analysis",
        url: "https://www.globalwarmingpolicy.org/content/uploads-2017-05-GWPF-Note-19.pdf",
      },
    ],
  },
  {
    id: 27,
    title: "Government Knows Best",
    claim: "Government experts should make decisions for individuals and families.",
    truth:
      "If government knows best, why do government officials send their kids to private schools while forcing others into failing public schools?",
    sources: [
      {
        name: "Politicians' School Choices",
        url: "https://www.heritage.org/education/report/school-choice-works-politicians-know-it",
      },
      {
        name: "Public vs Private Education",
        url: "https://www.cato.org/policy-analysis/public-schooling-battle-american-mind",
      },
    ],
  },
  {
    id: 28,
    title: "Equality of Outcome is Justice",
    claim: "True equality means everyone should have identical results regardless of effort.",
    truth:
      "If equality of outcome is justice, why do Olympic athletes train differently? Should we give everyone the same grade regardless of how much they study?",
    sources: [
      {
        name: "Equality vs Equity Debate",
        url: "https://www.heritage.org/civil-rights/commentary/equality-opportunity-not-outcome-what-america-should-strive",
      },
      {
        name: "Merit-Based Systems",
        url: "https://www.hoover.org/research/case-merit",
      },
    ],
  },
  {
    id: 29,
    title: "Fossil Fuels are Destroying Earth",
    claim: "Fossil fuels will destroy the planet and must be eliminated immediately.",
    truth:
      "If fossil fuels are so dangerous, why do climate activists use them to travel to climate conferences? Why not lead by example and stop using them first?",
    sources: [
      {
        name: "Energy Transition Reality",
        url: "https://www.iea.org/reports/world-energy-outlook-2023",
      },
      {
        name: "Fossil Fuel Benefits",
        url: "https://www.heritage.org/environment/report/the-benefits-fossil-fuels",
      },
    ],
  },
  {
    id: 30,
    title: "Minimum Wage Helps Workers",
    claim: "Raising minimum wage always helps low-income workers earn more money.",
    truth:
      "If minimum wage helps workers, why do businesses lay people off when it increases? How does $15/hour help someone who loses their $10/hour job?",
    sources: [
      {
        name: "Minimum Wage Employment Effects",
        url: "https://www.cbo.gov/publication/55410",
      },
      {
        name: "Small Business Impact Study",
        url: "https://www.nfib.com/content/press-release/economy/small-business-optimism-falls-in-december/",
      },
    ],
  },
  {
    id: 31,
    title: "Rent Control Helps Tenants",
    claim: "Rent control policies protect tenants from greedy landlords.",
    truth:
      "If rent control helps tenants, why are there housing shortages everywhere it's implemented? Why do economists across the political spectrum oppose it?",
    sources: [
      {
        name: "Rent Control Economics",
        url: "https://www.brookings.edu/research/what-does-economic-evidence-tell-us-about-the-effects-of-rent-control/",
      },
      {
        name: "Housing Supply Effects",
        url: "https://www.urban.org/urban-wire/rent-control-good-policy",
      },
    ],
  },
  {
    id: 32,
    title: "Green Energy is Cheaper",
    claim: "Renewable energy is now cheaper than fossil fuels in all cases.",
    truth:
      "If green energy is cheaper, why do electricity bills keep rising in states with renewable mandates? Why do we need subsidies for something that's already cheaper?",
    sources: [
      {
        name: "Electricity Price Trends",
        url: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a",
      },
      {
        name: "Renewable Energy Subsidies",
        url: "https://www.heritage.org/budget-and-spending/report/federal-energy-subsidies-what-are-we-getting-our-money",
      },
    ],
  },
  {
    id: 33,
    title: "Illegal Immigration Helps Economy",
    claim: "Undocumented immigrants boost the economy and take jobs Americans won't do.",
    truth:
      "If illegal immigration helps the economy, why do wages rise when immigration enforcement increases? Why do unions oppose guest worker programs?",
    sources: [
      {
        name: "Immigration and Wages Study",
        url: "https://www.heritage.org/immigration/report/the-fiscal-impact-unlawful-immigrants-united-states-localities",
      },
      {
        name: "Labor Market Effects",
        url: "https://www.cis.org/Report/Immigration-and-American-Dream",
      },
    ],
  },
  {
    id: 34,
    title: "Student Loan Forgiveness is Fair",
    claim: "Canceling student debt helps the economy and promotes equality.",
    truth:
      "If loan forgiveness is fair, why should someone who worked three jobs to pay off their loans subsidize someone who didn't? How is that equality?",
    sources: [
      {
        name: "Student Loan Demographics",
        url: "https://www.brookings.edu/research/who-owes-the-most-in-student-loans-new-data-from-the-fed/",
      },
      {
        name: "Loan Forgiveness Analysis",
        url: "https://www.cbo.gov/publication/58494",
      },
    ],
  },
  {
    id: 35,
    title: "Big Tech Censorship is Private",
    claim: "Private companies can censor whoever they want on their platforms.",
    truth:
      "If it's just private censorship, why did government officials coordinate with tech companies to remove content? When did private become government-directed?",
    sources: [
      {
        name: "Twitter Files Documentation",
        url: "https://twitter.com/mtaibbi/status/1598822959866683394",
      },
      {
        name: "Government Censorship Cases",
        url: "https://www.heritage.org/technology/commentary/the-twitter-files-reveal-disturbing-government-censorship",
      },
    ],
  },
]

export default function LogicCheckPage() {
  const [flashcards, setFlashcards] = useState(allLogicCheckFlashcards)
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 5
  const totalPages = Math.ceil(flashcards.length / cardsPerPage)

  useEffect(() => {
    const savedData = localStorage.getItem("flashcards-logic-check")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFlashcards(parsed)
      } catch (error) {
        console.error("Error loading saved flashcards:", error)
        setFlashcards(allLogicCheckFlashcards)
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
          <h1 className="text-4xl font-bold mb-2">Logic Check</h1>
          <p className="text-xl text-gray-600 mb-4">Common sense comebacks and logical reasoning</p>
          <p className="text-gray-600">
            Apply basic logic and common sense to popular narratives and see how they hold up under scrutiny.
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
