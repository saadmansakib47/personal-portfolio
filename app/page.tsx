"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, ExternalLink, Menu, X, Phone, MapPin, ChevronLeft, ChevronRight, Github, Linkedin } from "lucide-react"

// Simple SVGs for Github and Linkedin icons (replace with your preferred SVGs or use simple-icons)
function Intertitle({ onComplete }: { onComplete: () => void }) {
  const [currentText, setCurrentText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Store interval ID

  const fullText = `And when he goes to heaven
To Saint Peter He will tell
"One more Engineer reporting Sir
I have served my hitch in hell."` // <== Add this!

  useEffect(() => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      if (index < fullText.length) {
        setCurrentText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(intervalRef.current!);
        setIsComplete(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete();
          }, 1000); // Fade out
        }, 2000); // Delay before fade
      }
    }, 120); // Typing speed

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center max-w-2xl px-8">
        <div className="relative">
          <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed font-mono tracking-wide">
            {currentText.split("\n").map((line, index) => (
              <span key={index} className="block mb-2">
                {line}
              </span>
            ))}
            {!isComplete && (
              <span className="inline-block w-0.5 h-8 bg-gray-300 ml-1 animate-pulse"></span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}


function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

// New, simpler TypingEffect component
function TypingEffect({ text, speed = 50, className = "" }: { text: string; speed?: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    // Reset on text change or mount
    setDisplayedText("")
    indexRef.current = 0
    setIsTypingComplete(false)

    const typeCharacter = () => {
      if (indexRef.current < text.length) {
        // Use substring to ensure correct characters are added
        setDisplayedText(text.substring(0, indexRef.current + 1))
        indexRef.current++
        timeoutRef.current = setTimeout(typeCharacter, speed)
      } else {
        setIsTypingComplete(true) // Mark as complete
      }
    }

    typeCharacter() // Start typing

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed]) // Re-run if text or speed changes

  return (
    <span className={`${className}`}>
      {displayedText.split("\n").map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))}
      {!isTypingComplete && <span className="inline-block w-2 h-6 bg-white ml-1 typing-cursor"></span>}{" "}
      {/* Blinking cursor */}
    </span>
  )
}

function SkillCard({ title, desc, skills, index }: { title: string; desc: string; skills: string[]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
    >
      <Card className="bg-black/30 border-gray-700 backdrop-blur-sm hover:bg-black/50 transition-all duration-500 chamfered-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-xl tracking-wider font-serif">{title}</CardTitle>
          <CardDescription className="text-gray-400 font-sans">{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-white hover:text-white transition-all duration-300 font-sans hover:scale-105"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TerminalContactForm() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<string[]>([
    "You are on SAADMAN SAKIB's terminal interface.",
    "Type 'help' for a list of commands.",
    "",
  ])
  const [showCursor, setShowCursor] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1) // -1 means no history selected

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages])

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim()
    let newMessages = [...messages, `> ${command}`]

    if (lowerCommand === "help") {
      newMessages.push(
        "Available commands:",
        "  say <message> - Send a message to Saadman.",
        "  clear         - Clear the terminal screen.",
        "  about         - Learn more about this terminal.",
        "  history       - Show command history (use up/down arrows).",
        "  exit          - Close the terminal (mock command).",
        "",
      )
    } else if (lowerCommand === "clear") {
      newMessages = ["You are on SAADMAN SAKIB's terminal interface.", "Type 'help' for a list of commands.", ""]
    } else if (lowerCommand === "sudo") {
      newMessages.push("Permission denied: You are not root here.", "")
    } else if (lowerCommand.startsWith("say ")) {
      const userMessage = command.substring(4).trim()
      if (userMessage) {
        newMessages.push(`Message sent: "${userMessage}"`)
        // Simulate AI response
        setTimeout(() => {
          setMessages((prev) => [...prev, "Thank you for your message! I'll get back to you soon.", ""])
        }, 1000)
      } else {
        newMessages.push("Usage: say <your message>", "")
      }
    } else if (lowerCommand === "about") {
      newMessages.push(
        "This is a mock terminal interface for Saadman Sakib's portfolio.",
        "It's designed to be interactive and fun!",
        "",
      )
    } else if (lowerCommand === "history") {
      if (commandHistory.length > 0) {
        newMessages.push("Command History:")
        commandHistory.forEach((histCmd, idx) => newMessages.push(`  ${idx + 1}: ${histCmd}`))
        newMessages.push("")
      } else {
        newMessages.push("No command history yet.", "")
      }
    } else {
      newMessages.push(`Command not found: ${command}. Type 'help' for a list of commands.`, "")
    }

    setMessages(newMessages)
    setCommandHistory((prev) => [...prev, command]) // Add to history
    setHistoryIndex(-1) // Reset history index
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault() // Prevent cursor from moving
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault() // Prevent cursor from moving
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-6 font-mono text-sm">
      <div className="mb-4 h-64 overflow-y-auto custom-scrollbar">
        {messages.map((message, index) => (
          <div key={index} className="text-green-400 mb-1">
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center text-green-400">
          <span className="mr-2">{">"}</span>
          {/* Display the input value and then the cursor */}
          <span className="whitespace-pre">{input}</span> {/* Use whitespace-pre to preserve spaces */}
          {showCursor && <span className="bg-green-400 w-2 h-4 ml-1 terminal-cursor"></span>}
          {/* Hidden input to capture actual typing */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add keydown handler
            className="absolute opacity-0 w-0 h-0" // Hide the actual input
            autoComplete="off"
            spellCheck="false"
            autoFocus // Auto-focus on load
          />
        </div>
      </form>
    </div>
  )
}

export default function Portfolio() {
  const [showIntertitle, setShowIntertitle] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSection, setCurrentSection] = useState(0);
  const [currentBlogSection, setCurrentBlogSection] = useState(0);
  const scrollY = useScrollAnimation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem("intertitlePlayed");

      if (alreadyShown === "true") {
        setIsReady(true); // no need to show intertitle
      } else {
        setShowIntertitle(true); // trigger intertitle
      }

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const handleIntertitleComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("intertitlePlayed", "true");
    }
    setShowIntertitle(false);
    setIsReady(true);
  };

  // Show intertitle only if flagged
  if (showIntertitle) {
    return <Intertitle onComplete={handleIntertitleComplete} />;
  }

  // Show nothing until ready
  if (!isReady && !showIntertitle) return null;

  const nextSection = () => {
    if (currentSection < projectSections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const nextBlogSection = () => {
    if (currentBlogSection < blogSections.length - 1) {
      setCurrentBlogSection(currentBlogSection + 1)
    }
  }

  const prevBlogSection = () => {
    if (currentBlogSection > 0) {
      setCurrentBlogSection(currentBlogSection - 1)
    }
  }

  const skills = [
    {
      title: "FRONTEND",
      desc: "Creating beautiful interfaces",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
      title: "BACKEND",
      desc: "Building robust solutions",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"],
    },
    { title: "TOOLS", desc: "Development practices", skills: ["Git", "AWS", "Figma", "Jest", "CI/CD"] },
  ]

  const projectSections = [
    {
      title: "WEB APPS",
      projects: [
        {
          title: "PatientZer0",
          description:
            "A healthcare & telemedicine oriented application to interpret test reports, track medical profile, and connect with doctors.",
          technologies: ["React", "Next.js", "Node.js", "MongoDB", "AI API"],
          github: "https://github.com/saadmansakib47",
          live: "#",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Police Positive",
          description: "A web-based smart dashboard designed to enhance law enforcement responsiveness.",
          technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
          github: "https://github.com/saadmansakib47",
          live: "#",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "InstantPlaces",
          description: "A tourist-spot searching application within the metropolitan for the sightseers.",
          technologies: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
          github: "https://github.com/saadmansakib47/InstantPlaces",
          live: "#",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      title: "APIs",
      projects: [
        {
          title: "Apollo API",
          description:
            "AI API dedicated for PatientZer0 to extract text from reports, process prompt input, and get output from an AI model.",
          technologies: ["Node.js", "Python", "Express.js", "REST API"],
          github: "https://github.com/saadmansakib47",
          live: "#",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "SecretNamespace",
          description: "A Blog API for CS Blog Website.",
          technologies: ["Node.js", "Express.js", "MongoDB", "REST API"],
          github: "https://github.com/saadmansakib47/SecretNamespace",
          live: "#",
          image:
            "https://sjc.microlink.io/mhYZjAVub4h7xwsx5wdDJ-Q3lw1-8LTUb09P55pMC5j1PdXmZ-lHfs6_d-gf10mi_0KvgFGKNgnFioRf93btaQ.jpeg",
        },
      ],
    },
    {
      title: "SECURITY TOOLS",
      projects: [
        {
          title: "Scanning Detector",
          description:
            "Detects unauthorized scans in the network using PyShark, including SYN, ACK, NULL, FIN, XMAS scans.",
          technologies: ["Python", "PyShark", "Network Security"],
          github: "https://github.com/saadmansakib47",
          live: "#",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Network Monitor",
          description:
            "Real-time network monitoring tool with advanced packet analysis and threat detection capabilities.",
          technologies: ["Python", "Flask", "SQLite", "Network Monitoring"],
          github: "https://github.com/saadmansakib47",
          live: "#",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "CipherShield",
          description:
            "A console app to generate and assess strength of password, and encrypt/decrypt text with different algorithms (implemented from scratch).",
          technologies: ["Python", "Cryptography", "Security"],
          github: "https://github.com/saadmansakib47/Project-CipherShield-",
          live: "#",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/298686636-b6c3d4db-fb80-40bd-b110-92b83bc72463-4WbWFhJ6ybgvhv2h8XTjjefWpD7czq.png",
        },
      ],
    },
    {
      title: "BROWSER EXTENSIONS",
      projects: [
        {
          title: "DirectRemoveBG",
          description: "One click Drag & Drop to remove background from your image.",
          technologies: ["JavaScript", "HTML", "CSS", "Browser API"],
          github: "https://github.com/saadmansakib47/DirectRemoveBG",
          live: "#",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/341033632-071043d3-b76d-4fe2-9dba-bdbb894a1ced-eBai2MtwiDfTYj2gCpcb8UrhYWmYCL.png",
        },
        {
          title: "TimeFlies",
          description: "A tracker to monitor Facebook usage time.",
          technologies: ["JavaScript", "HTML", "CSS", "Browser API"],
          github: "https://github.com/saadmansakib47/TimeFlies",
          live: "#",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/340961559-854762ad-c078-4469-8dea-d4d4db69bfd3-LnAtl3cmnu0lo4gBAmokOfacJHq4fU.png",
        },
      ],
    },
  ]

  const blogSections = [
    {
      title: "REACT PERFORMANCE OPTIMIZATION",
      blogs: [
        {
          title: "Props Drilling and Context API",
          description:
            "Understanding the problems with props drilling and how Context API provides a cleaner solution for state management in React applications.",
          image: "/images/props-drilling-context-api.jpg",
          link: "https://www.facebook.com/saadman.sakib.988678/posts/pfbid02pPS6rd6wNEfxMEnvpztLc5i7yJYQsgRZhMVwiwC8zrHkTEeEimwo9SUQJKaVTg69l",
        },
        {
          title: "Lazy Loading",
          description:
            "Implementing lazy loading techniques in React to improve application performance and reduce initial bundle size.",
          image: "/images/lazy-loading.jpg",
          link: "https://www.facebook.com/saadman.sakib.988678/posts/pfbid0v4V69if9pEapHdGPqQqb5dHzWPzJ3fBrW4VjbZkPBBZkyvSEvBJJKzrEZv9iX9r1l",
        },
        {
          title: "Debouncing",
          description:
            "Mastering debouncing techniques to optimize user input handling and API calls in React applications.",
          image: "/images/debouncing.jpg",
          link: "https://www.facebook.com/saadman.sakib.988678/posts/pfbid0sDo8t6X1qM7pBp8q57TJGNEkCujbhBFixDYTvm5SiZjA6aRzvJi8aQv4eps1FPaUl",
        },
      ],
    },
    {
      title: "DEVELOPER'S LIFE",
      blogs: [
        {
          title: "Semantic Commit Messages",
          description:
            "Best practices for writing meaningful commit messages that improve code collaboration and project maintainability.",
          image: "/images/semantic-commit-messages.png",
          link: "https://developers-life.hashnode.dev/semantic-commit-messages",
        },
        {
          title: "Semantic Versioning",
          description:
            "Understanding semantic versioning principles and how to properly version your software projects for better dependency management.",
          image: "/images/semantic-versioning.jpg",
          link: "https://www.facebook.com/saadman.sakib.988678/posts/pfbid02sf2FQTKh1kTYG9e2udSFDTicTibV1v8XjConzZz2cxYrpofeiTn3qGa1ghmuSchzl",
        },
        {
          title: "How to Read Legacy Code",
          description:
            "Strategies and techniques for understanding and working with legacy codebases effectively as a developer.",
          image: "/images/legacy-code.png",
          link: "https://developers-life.hashnode.dev/legacy-code",
        },
      ],
    },
    {
      title: "SECURITY TOOLS",
      blogs: [
        {
          title: "Mimikatz Intro",
          description:
            "Introduction to Mimikatz, a powerful post-exploitation tool for extracting credentials from Windows systems.",
          image: "/images/mimikatz-kiwi.jpg",
          link: "https://mimikatz.hashnode.dev/password",
        },
        {
          title: "Mimikatz Attack Vectors",
          description:
            "Exploring various attack vectors and techniques used with Mimikatz for penetration testing and security assessment.",
          image: "/images/mimikatz-kiwi.jpg",
          link: "https://mimikatz.hashnode.dev/mimikatz-attack-vectors-explained",
        },
      ],
    },
    {
      title: "FINTECH",
      blogs: [
        {
          title: "SSLCommerz Payment Gateway Integration",
          description:
            "Integrating SSLCommerz payment gateway in web applications for secure online transactions.",
          image: "/images/sslcommerz.jpg",
          link: "https://fintech.hashnode.dev/sslcommerz-integration",
        },
      ],
    },
  ];

  const renderBlogCards = (blogs: (typeof blogSections)[0]["blogs"]) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog: typeof blogSections[0]["blogs"][0], index: number) => (
        <Card
          key={index}
          className="bg-black/50 border-gray-800 backdrop-blur-sm hover:bg-black/70 transition-all duration-500 group flex-shrink-0 project-card"
        >
          <CardHeader className="p-0">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-white mb-3 tracking-wide font-serif">{blog.title}</CardTitle>
            <CardDescription className="text-gray-400 mb-6 leading-relaxed font-sans">
              {blog.description}
            </CardDescription>
            <div className="flex justify-center">
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-200 transition-all duration-300 font-sans cursor-none magnetic-button"
                onClick={() => window.open(blog.link, "_blank")}
              >
                <ExternalLink size={16} className="mr-2" />
                READ
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    showIntertitle ? (
      <Intertitle onComplete={handleIntertitleComplete} />
    ) : (
      <div className="min-h-screen bg-black text-gray-100 relative overflow-x-hidden cursor-none">
        {/* Custom Cursor */}
        <div
          className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transform: "scale(1)",
          }}
        />

      {/* Fog/Noise Overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-10 noise-bg"></div>

      {/* Enhanced Floating Elements */}
      <div
        className="absolute w-2 h-2 bg-white/20 rounded-full enhanced-float"
        style={{
          left: "10%",
          top: "20%",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      <div
        className="absolute w-1 h-1 bg-white/30 rounded-full enhanced-float"
        style={{
          left: "80%",
          top: "60%",
          transform: `translateY(${scrollY * -0.15}px)`,
          animationDelay: "5s",
        }}
      />
      <div
        className="absolute w-3 h-3 bg-white/10 rounded-full enhanced-float"
        style={{
          left: "60%",
          top: "30%",
          transform: `translateY(${scrollY * 0.08}px)`,
          animationDelay: "10s",
        }}
      />
      <div
        className="absolute w-1.5 h-1.5 bg-white/25 rounded-full enhanced-float"
        style={{
          left: "25%",
          top: "70%",
          transform: `translateY(${scrollY * 0.12}px)`,
          animationDelay: "15s",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-2xl font-bold text-white tracking-wider font-oswald">CODENAME : BLACK EAGLE</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12">
              {["HOME", "ABOUT", "SKILLS", "PROJECTS", "BLOGS", "CONTACT"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-all duration-300 tracking-widest text-sm font-sans relative group cursor-none"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-gray-800 cursor-none"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-6">
              <div className="space-y-4">
                {["HOME", "ABOUT", "SKILLS", "PROJECTS", "BLOGS", "CONTACT"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-white transition-colors tracking-widest text-sm cursor-none"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center max-w-5xl mx-auto relative z-20">
          <div className="mb-16">
            <div className="w-64 h-64 mx-auto mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-900 rounded-full"></div>
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border-2 border-gray-600"
              />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight font-oswald">
            SAADMAN
            <br />
            <span className="text-white">SAKIB</span>
          </h1>

          <div className="w-24 h-px bg-gray-600 mx-auto mb-8"></div>

          <p className="text-xl md:text-2xl text-gray-400 mb-6 tracking-wide font-sans">ASPIRING SQA ENGINEER</p>
          <p className="text-lg md:text-xl text-gray-500 mb-16 tracking-wide font-sans">SECURITY ENTHUSIAST</p>

          {/* Reverted to static text for simplicity and multi-line support */}
          <p className="text-2xl md:text-3xl leading-relaxed font-oswald uppercase max-w-4xl mx-auto mb-16 text-white">
            {"MAX, DEAREST OF ALL MY FRIENDS,"}
            <br />
            {"I WAS SUPPOSED TO BE THE HERO."}
            <br />
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 tracking-wider font-sans px-8 py-4 hover:scale-105 cursor-none"
            >
              VIEW WORK
            </Button>
            <Button
            asChild
            size="lg"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent transition-all duration-300 tracking-wider font-sans px-8 py-4 hover:scale-105 cursor-none"
            >
            <a
                 href="/pdf/Saadman_CV.pdf"
                download = "Saadman_CV.pdf"
             >
             DOWNLOAD CV
             </a>
             </Button>

          </div>

          <div className="flex justify-center space-x-8">
            {[
              { icon: Github, href: "https://github.com/saadmansakib47" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/saadman-sakib-4987a0285/" },
              { icon: Mail, href: "mailto:saadmansakib@iut-dhaka.edu" },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-gray-500 hover:text-white transition-all duration-300 transform hover:scale-110 cursor-none"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-oswald">WHO AM I?</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                <img
                  src="/images/about-stories.png"
                  alt="Notebook with handwritten stories"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div className="text-gray-300 space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 tracking-wide font-oswald">
                A living collection of some stories.
              </h3>

              <div className="space-y-6 text-lg leading-relaxed font-courier">
                {/* New TypingEffect component applied to the combined text */}
              <TypingEffect
                text={`I'm Saadman Sakib, a passionate SQA Engineer and Security Enthusiast from Dhaka, Bangladesh. I love building robust web apps, exploring security tools, and sharing my knowledge through blogs.`}
                className="text-white"
              />
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-800">
                {[
                  { label: "EXPERIENCE", value: "0 YEARS" },
                  { label: "PROJECTS", value: "10+ COMPLETED" },
                  { label: "LOCATION", value: "DHAKA, BD" },
                  { label: "STATUS", value: "AVAILABLE" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <h4 className="font-bold text-gray-500 mb-2 text-sm tracking-wider font-sans">{label}</h4>
                    <p className="text-white font-sans">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-gray-950/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-oswald">SKILLS</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={skill.title} {...skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-oswald glitch-effect">
              PROJECTS
            </h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>
        </div>

        {/* Project Navigation with Swipe Animation */}
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Section Title with Swipe Animation */}
          <div className="section-title-container text-center">
            {projectSections.map((section, index) => (
              <div
                key={section.title}
                className={`section-title-slide ${
                  index === currentSection ? "active" : index < currentSection ? "prev" : "next"
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-oswald">
                  {section.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Project Cards with Swipe Animation */}
          <div className="projects-container">
            <div
              className="projects-content projects-slide"
              style={{
                transform: `translateX(-${currentSection * 25}%)`,
              }}
            >
              {projectSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="projects-section">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.projects.map((project, index) => (
                      <Card
                        key={index}
                        className="bg-black/50 border-gray-800 backdrop-blur-sm hover:bg-black/70 transition-all duration-500 group flex-shrink-0 project-card"
                      >
                        <CardHeader className="p-0">
                          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <CardTitle className="text-white mb-3 tracking-wide font-serif">{project.title}</CardTitle>
                          <CardDescription className="text-gray-400 mb-6 leading-relaxed font-sans">
                            {project.description}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech: string) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-gray-700 text-gray-400 font-sans text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent transition-all duration-300 font-sans cursor-none magnetic-button"
                              onClick={() => window.open(project.github, "_blank")}
                            >
                              <Github size={16} className="mr-2" />
                              CODE
                            </Button>
                            <Button
                              size="sm"
                              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 font-sans cursor-none magnetic-button"
                              onClick={() => window.open(project.live, "_blank")}
                            >
                              <ExternalLink size={16} className="mr-2" />
                              LIVE
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-12">
            <Button
              onClick={prevSection}
              disabled={currentSection === 0}
              className="bg-black/50 border border-gray-700 text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-none"
              size="lg"
            >
              <ChevronLeft size={20} className="mr-2" />
              PREVIOUS
            </Button>

            {/* Section Indicators */}
            <div className="flex space-x-2">
              {projectSections.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSection ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSection}
              disabled={currentSection === projectSections.length - 1}
              className="bg-black/50 border border-gray-700 text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-none"
              size="lg"
            >
              NEXT
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-32 relative overflow-hidden bg-gray-950/30">
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-oswald glitch-effect">
              BLOGS
            </h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>
        </div>

        {/* Blog Navigation with Swipe Animation */}
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Section Title with Swipe Animation */}
          <div className="section-title-container text-center">
            {blogSections.map((section, index) => (
              <div
                key={section.title}
                className={`section-title-slide ${
                  index === currentBlogSection ? "active" : index < currentBlogSection ? "prev" : "next"
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-oswald">
                  {section.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Blog Cards with Swipe Animation */}
          <div className="projects-container">
            <div
              className="projects-content projects-slide"
              style={{
                transform: `translateX(-${currentBlogSection * 25}%)`,
              }}
            >
              {blogSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="projects-section">
                  {renderBlogCards(section.blogs)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-12">
            <Button
              onClick={prevBlogSection}
              disabled={currentBlogSection === 0}
              className="bg-black/50 border border-gray-700 text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-none"
              size="lg"
            >
              <ChevronLeft size={20} className="mr-2" />
              PREVIOUS
            </Button>

            {/* Section Indicators */}
            <div className="flex space-x-2">
              {blogSections.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentBlogSection ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextBlogSection}
              disabled={currentBlogSection === blogSections.length - 1}
              className="bg-black/50 border border-gray-700 text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-none"
              size="lg"
            >
              NEXT
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-gray-950/50 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-oswald">CONTACT</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 tracking-wide font-oswald">LET'S CONNECT</h3>

              <div className="space-y-6">
                {[
                  { icon: Mail, text: "saadmansakib@iut-dhaka.edu" },
                  { icon: Phone, text: "+8801617386902" },
                  { icon: MapPin, text: "Dhaka, Bangladesh" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-6 text-gray-300 group">
                    <Icon className="text-gray-500 group-hover:text-white transition-colors duration-300" size={20} />
                    <span className="font-sans tracking-wide">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-8 tracking-wide font-oswald">SEND MESSAGE</h3>
              <TerminalContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 mb-6 font-sans tracking-wide">
            🟢 SYSTEM STATUS: STABLE | © SAADMAN | MODE: ACTIVE | LAST BUILD: 07-2025
          </p>
          <div className="flex justify-center space-x-8">
            {[
              { icon: Github, href: "https://github.com/saadmansakib47" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/saadman-sakib-4987a0285/" },
              { icon: Mail, href: "mailto:saadmansakib@iut-dhaka.edu" },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 cursor-none"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
    )
  )
}
