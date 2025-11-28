"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Share2, Download, X } from "lucide-react"
import { TextToSpeech } from "./text-to-speech"

export interface QuestionFlashcardType {
  id: number
  question: string
}

export function QuestionFlashcard({ flashcard }: { flashcard: QuestionFlashcardType }) {
  const [copied, setCopied] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleShare = async () => {
    const shareText = `${flashcard.question}\n\nFrom Freedom Flashcards: ${window.location.href}`

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
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

      // Build the meme content
      memeContainer.innerHTML = `
        <div style="padding: 60px;">
          <div style="font-size: 36px; font-weight: bold; color: #ff6b6b; margin-bottom: 50px; text-align: center;">
            🤔 QUESTION TO CONSIDER
          </div>
          
          <div style="font-size: 32px; color: #ffffff; line-height: 1.6; text-align: center; font-weight: 600; margin: 60px 0; padding: 40px; background: rgba(255,255,255,0.05); border-radius: 12px;">
            ${flashcard.question}
          </div>
          
          <div style="text-align: center; border-top: 2px solid rgba(255,255,255,0.2); padding-top: 40px; margin-top: 80px;">
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
    link.download = `freedom-flashcard-question-${flashcard.id}.png`
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
    const text = encodeURIComponent(`${flashcard.question}\n\nFrom Freedom Flashcards: ${window.location.href}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const shareToTruthSocial = () => {
    const text = encodeURIComponent(`${flashcard.question}\n\nFrom Freedom Flashcards: ${window.location.href}`)
    window.open(`https://truthsocial.com/share?text=${text}`, "_blank")
  }

  const shareViaWebShare = async () => {
    if (!generatedImageUrl) return

    try {
      const response = await fetch(generatedImageUrl)
      const blob = await response.blob()
      const file = new File([blob], `freedom-flashcard-question-${flashcard.id}.png`, { type: "image/png" })

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Freedom Flashcard Question",
          text: flashcard.question,
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
      <Card className="overflow-hidden relative" ref={cardRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="absolute top-2 right-2 z-10 text-primary hover:bg-primary/10"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </>
          )}
        </Button>
        <CardHeader className="bg-primary bg-opacity-10 pb-2">
          <CardTitle className="text-xl">Question to Consider</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg text-gray-800 font-medium">{flashcard.question}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between items-center bg-gray-50 gap-2">
          <TextToSpeech text={flashcard.question} label="Read Aloud" />
          <Button
            variant="default"
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-medium ml-auto"
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
