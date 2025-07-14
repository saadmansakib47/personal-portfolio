"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Phone, MapPin } from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Prisma",
    "Python",
    "C++",
    "Java",
    "C#",
    "Docker",
    "Git",
    "JUnit",
    "Postman",
    "Selenium",
    "Playwright"
  ]

  const projects = [
    {
      title: "PatientZer0",
      description:
        "A healthcare & telemedicine oriented application to interpret test reports, track medical profile, and connect with doctors.",
      technologies: ["React", "Node.js", "MongoDB", "AI API"],
      github: "https://github.com/saadmansakib47",
      live: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Apollo API",
      description:
        "AI API dedicated for PatientZer0 to extract text from reports, process prompt input, and get output from an AI model.",
      technologies: ["Node.js", "Python"],
      github: "https://github.com/saadmansakib47",
      live: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Scanning Detector",
      description: "Detects unauthorized scans in the network using PyShark, including SYN, ACK, NULL, FIN, XMAS scans.",
      technologies: ["Python", "PyShark"],
      github: "https://github.com/saadmansakib47",
      live: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">Saadman Sakib</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-white hover:text-purple-400 transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-purple-400 transition-colors">About</a>
              <a href="#skills" className="text-white hover:text-purple-400 transition-colors">Skills</a>
              <a href="#projects" className="text-white hover:text-purple-400 transition-colors">Projects</a>
              <a href="#contact" className="text-white hover:text-purple-400 transition-colors">Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/30 rounded-lg mb-4">
                <a href="#home" className="block px-3 py-2 text-white hover:text-purple-400">Home</a>
                <a href="#about" className="block px-3 py-2 text-white hover:text-purple-400">About</a>
                <a href="#skills" className="block px-3 py-2 text-white hover:text-purple-400">Skills</a>
                <a href="#projects" className="block px-3 py-2 text-white hover:text-purple-400">Projects</a>
                <a href="#contact" className="block px-3 py-2 text-white hover:text-purple-400">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

       {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <img src="/placeholder.svg?height=200&width=200" alt="Profile" className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-purple-400 shadow-2xl" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Saadman Sakib</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Software Engineering Student & SQA Enthusiast</p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Focused on backend development, software quality assurance, and security. Passionate about writing clean code, building practical solutions, and technical blogging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">View My Work</Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent">Download CV</Button>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <a href="https://github.com/saadmansakib47" className="text-gray-400 hover:text-purple-400 transition-colors"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/saadman-sakib-4987a0285/" className="text-gray-400 hover:text-purple-400 transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:saadmansakib@iut-dhaka.edu" className="text-gray-400 hover:text-purple-400 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/placeholder.svg?height=400&width=400" alt="About me" className="rounded-lg shadow-2xl" />
            </div>
            <div className="text-gray-300">
              <h3 className="text-2xl font-semibold text-white mb-6">Aspiring Software Engineer & Tester</h3>
              <p className="mb-6 leading-relaxed">
                Currently studying BSc in Software Engineering at Islamic University of Technology. Interested in backend development, software testing, and network security.
              </p>
              <p className="mb-6 leading-relaxed">
                I enjoy building meaningful tools, writing technical blogs, and exploring topics like cybersecurity. Contributor to several backend and AI integration projects.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Experience</h4>
                  <p>0 Years</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Projects</h4>
                  <p>10+ Completed</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Location</h4>
                  <p>Dhaka, Bangladesh</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Availability</h4>
                  <p>Open to Internship</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Skills & Technologies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Frontend</CardTitle>
                <CardDescription className="text-gray-400">Creating beautiful user interfaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Backend</CardTitle>
                <CardDescription className="text-gray-400">Building robust server solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Tools & Others</CardTitle>
                <CardDescription className="text-gray-400">Development tools and practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Git", "AWS", "Figma", "Jest", "CI/CD"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader className="p-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400 mb-4">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-purple-500/30 text-purple-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Work Together</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm always interested in internships and learning opportunities. Feel free to contact me!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <Mail className="text-purple-400" size={20} />
                  <span>saadmansakib@iut-dhaka.edu</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <Phone className="text-purple-400" size={20} />
                  <span>+8801617386902</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <MapPin className="text-purple-400" size={20} />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
            {/* Form stays same */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2024 Saadman Sakib. All rights reserved. Built with React & Tailwind CSS.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://github.com/saadmansakib47" className="text-gray-400 hover:text-purple-400 transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/saadman-sakib-4987a0285/" className="text-gray-400 hover:text-purple-400 transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:saadmansakib@iut-dhaka.edu" className="text-gray-400 hover:text-purple-400 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
