"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, ExternalLink, Share2, Download, X } from "lucide-react"
import { TextToSpeech } from "./text-to-speech"

interface Source {
  name: string
  url: string
}

export interface Flashcard {
  id: number
  title: string
  claim: string
  truth: string
  sources: Source[]
}

export function FlashcardComponent({ flashcard }: { flashcard: Flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Prepare text for speech synthesis
  const getSpeechText = () => {
    let text = `${flashcard.title}. The Claim: ${flashcard.claim}.`

    if (isFlipped) {
      text += ` The Truth: ${flashcard.truth}. Sources include: ${flashcard.sources.map((s) => s.name).join(", ")}.`
    }

    return text
  }

  // Direct clipboard copy approach instead of Web Share API
  const handleShare = async () => {
    const shareText = `${flashcard.title}\n\nClaim: ${flashcard.claim}\n\nTruth: ${flashcard.truth}\n\nFrom Freedom Flashcards: ${window.location.href}`

    try {
      // Try the modern Clipboard API first
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // Fall back to the older execCommand method
        const textArea = document.createElement("textarea")
        textArea.value = shareText
        textArea.style.position = "fixed"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand("copy")
        document.body.removeChild(textArea)

        if (successful) {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } else {
          alert("Unable to copy. Please select and copy the URL manually.")
        }
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      alert("Sharing failed. Please try copying the URL manually.")
    }
  }

  const generateMemeImage = async () => {
    setIsGeneratingImage(true)

    try {
      const html2canvas = (await import("html2canvas")).default

      // Create a temporary container for the meme
      const memeContainer = document.createElement("div")
      memeContainer.style.position = "fixed"
      memeContainer.style.left = "-9999px"
      memeContainer.style.width = "1200px"
      memeContainer.style.padding = "80px"
      memeContainer.style.backgroundColor = "#1a1a1a"
      memeContainer.style.fontFamily = "Arial, sans-serif"
      memeContainer.style.color = "#ffffff"

      // Build the sources list
      const sourcesHtml = flashcard.sources
        .map((source) => `<div style="margin: 3px 0;">${source.name}: ${source.url}</div>`)
        .join("")

      // Build the meme content
      memeContainer.innerHTML = `
        <div style="padding: 60px;">
          <h1 style="font-size: 48px; font-weight: bold; color: #ffffff; margin: 0 0 40px 0; line-height: 1.2; text-align: center;">
            ${flashcard.title}
          </h1>
          
          <div style="margin-bottom: 40px; padding: 30px; background: rgba(255,255,255,0.05); border-radius: 12px;">
            <div style="font-size: 28px; font-weight: bold; color: #ff4444; margin-bottom: 20px;">
              ❌ THE CLAIM:
            </div>
            <div style="font-size: 26px; color: #ffffff; line-height: 1.5;">
              ${flashcard.claim}
            </div>
          </div>
          
          <div style="margin-bottom: 40px; padding: 30px; background: rgba(255,255,255,0.05); border-radius: 12px;">
            <div style="font-size: 28px; font-weight: bold; color: #44ff44; margin-bottom: 20px;">
              ✓ THE TRUTH:
            </div>
            <div style="font-size: 26px; color: #ffffff; line-height: 1.5;">
              ${flashcard.truth}
            </div>
          </div>
          
          <div style="margin-bottom: 50px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px;">
            <div style="font-size: 18px; font-weight: bold; color: #cccccc; margin-bottom: 12px;">
              SOURCES:
            </div>
            <div style="font-size: 11px; color: #999999; line-height: 1.6;">
              ${sourcesHtml}
            </div>
          </div>
          
          <div style="text-align: center; border-top: 2px solid rgba(255,255,255,0.2); padding-top: 30px;">
            <div style="font-size: 32px; font-weight: bold; color: #ffffff;">
              🇺🇸 FREEDOM-FLASHCARDS.COM 🇺🇸
            </div>
            <div style="font-size: 20px; color: #cccccc; margin-top: 8px;">
              Greatest conversation starters
            </div>
          </div>
        </div>
      `

      document.body.appendChild(memeContainer)

      // Generate the image
      const canvas = await html2canvas(memeContainer, {
        backgroundColor: "#1a1a1a",
        scale: 2,
        logging: false,
        useCORS: true,
        width: 1200,
        height: memeContainer.scrollHeight,
      })

      document.body.removeChild(memeContainer)

      // Convert to blob and create URL
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          setGeneratedImageUrl(url)
          setShowShareModal(true)
        }
      }, "image/png")
    } catch (error) {
      console.error("Error generating meme:", error)
      alert("Failed to generate meme image. Please try again.")
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const downloadImage = () => {
    if (!generatedImageUrl) return

    const link = document.createElement("a")
    link.href = generatedImageUrl
    link.download = `freedom-flashcard-${flashcard.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareToFacebook = () => {
    if (!generatedImageUrl) return
    downloadImage()
    alert("Image downloaded! You can now upload it to Facebook.")
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(
      `${flashcard.title}\n\n${flashcard.claim}\n\nFrom Freedom Flashcards: ${window.location.href}`,
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const shareToTruthSocial = () => {
    const text = encodeURIComponent(
      `${flashcard.title}\n\n${flashcard.claim}\n\nFrom Freedom Flashcards: ${window.location.href}`,
    )
    window.open(`https://truthsocial.com/share?text=${text}`, "_blank")
  }

  const shareViaWebShare = async () => {
    if (!generatedImageUrl) return

    try {
      const response = await fetch(generatedImageUrl)
      const blob = await response.blob()
      const file = new File([blob], `freedom-flashcard-${flashcard.id}.png`, { type: "image/png" })

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: flashcard.title,
          text: `${flashcard.claim}\n\nFrom Freedom Flashcards`,
        })
      } else {
        downloadImage()
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error)
    }
  }

  const closeModal = () => {
    setShowShareModal(false)
    if (generatedImageUrl) {
      URL.revokeObjectURL(generatedImageUrl)
      setGeneratedImageUrl(null)
    }
  }

  return (
    <>
      <Card className="overflow-hidden" ref={cardRef}>
        <CardHeader className="bg-secondary bg-opacity-5 pb-2 relative">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl flex-1">{flashcard.title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-primary hover:bg-primary/10 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" /> Copy to Share
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="font-semibold mb-1">The Claim:</div>
            <div className="text-gray-700">{flashcard.claim}</div>
          </div>

          {isFlipped && (
            <>
              <div className="mb-4">
                <div className="font-semibold mb-1">The Truth:</div>
                <div className="text-gray-700">{flashcard.truth}</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Sources:</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {flashcard.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {source.name}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between items-center bg-gray-50 gap-2">
          <div className="flex gap-2">
            <Button
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white font-medium"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {isFlipped ? "Hide Truth" : "Reveal Truth"}
            </Button>
            <TextToSpeech text={getSpeechText()} label="Read Aloud" />
          </div>
          <Button
            variant="default"
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
            onClick={generateMemeImage}
            disabled={isGeneratingImage}
          >
            <Share2 className="h-4 w-4 mr-1" />
            {isGeneratingImage ? "Creating Meme..." : "Share on Social"}
          </Button>
        </CardFooter>
      </Card>

      {/* Share Modal */}
      {showShareModal && generatedImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Share Your Meme</h2>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <img
                  src={generatedImageUrl || "/placeholder.svg"}
                  alt="Generated meme"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <div className="space-y-3">
                <Button onClick={downloadImage} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download Image
                </Button>

                <Button onClick={shareViaWebShare} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share (Mobile)
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={shareToFacebook} className="w-full bg-[#1877f2] hover:bg-[#1565d8] text-white">
                    Facebook
                  </Button>

                  <Button onClick={shareToTwitter} className="w-full bg-[#1da1f2] hover:bg-[#1a8cd8] text-white">
                    Twitter/X
                  </Button>

                  <Button onClick={shareToTruthSocial} className="w-full bg-[#dc143c] hover:bg-[#c01232] text-white">
                    Truth Social
                  </Button>

                  <Button
                    onClick={() => {
                      downloadImage()
                      alert("Image downloaded! You can now upload it to Instagram.")
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Instagram
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4 text-center">
                For Instagram, Facebook, and Truth Social, download the image and upload it manually to those platforms.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FlashcardComponent
