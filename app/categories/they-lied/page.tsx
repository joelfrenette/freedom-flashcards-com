import type { Metadata } from "next"
import TheyLiedClientPage from "./client-page"

export const metadata: Metadata = {
  title: "They Lied To Us About | FREEDOM-FLASHCARDS.COM",
  description: "Exposing the lies and misinformation pushed by mainstream media and politicians.",
}

export default function TheyLiedPage() {
  return <TheyLiedClientPage />
}
