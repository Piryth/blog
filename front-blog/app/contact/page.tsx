"use client"

import type React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Github, Linkedin} from "lucide-react"
import {config} from "@/config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch(`api/contact/`, {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setSubmitStatus('success')
    } catch (error) {
      console.error('Submission error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({...prev, [field]: value}))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">On discute ?</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Voyons comment donner vie à vos projets
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Follow Me</CardTitle>
                <CardDescription>Ajoutez moi sur mes résaux</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com/Piryth" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4"/>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://www.linkedin.com/in/arnaud-endignous/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4"/>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Me contacter</CardTitle>
                <CardDescription>Racontez moi votre projets. Je reviens vers vous.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" id="name-label" className="block text-sm font-medium mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-describedby="name-label"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" id="email-label" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-describedby="email-label"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" id="message-label" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Dites m'en plus sur vos projets, vos délais et vos spécifications."
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                      aria-describedby="message-label"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div
                      className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
                      Le messagé a été envoyé ! Je reviens vers vous au plus vite.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div
                      className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                      Je n'ai pas pu envoyer le message: {errorMessage}. Veuillez réessayer plus tard.
                    </div>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Ça part...' : 'Envoyer'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

