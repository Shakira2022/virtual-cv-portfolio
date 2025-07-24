"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Code,
  Database,
  Globe,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle,
  Send,
  CalendarDays,
  BarChart3,
  Zap,
  Play,
  Rocket,
  Monitor,
  Server,
  Smartphone,
  Palette,
  Settings,
  Network,
  FileText,
  Terminal,
  GitBranch,
  Layers,
  Shield,
  Cloud,
  Cpu,
  HardDrive,
  PenToolIcon as Tool,
  BookOpen,
  Calculator,
  PieChart,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ---------- helpers ----------
/**
 * Try to parse the response as JSON, but gracefully fall back to plain text
 * when the payload is not valid JSON (e.g. an HTML error page).
 */
const parseResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    try {
      return await response.json()
    } catch {
      /* fall-through and return text */
    }
  }
  return response.text()
}
// --------------------------------

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedYear, setSelectedYear] = useState("year1")
  const [showComingSoon, setShowComingSoon] = useState(false)

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  const projects = [
    {
      title: "E-Commerce Analytics Platform",
      description:
        "Advanced analytics platform providing real-time insights for e-commerce businesses with predictive modeling and automated reporting.",
      category: "Business Intelligence",
      categoryColor: "bg-orange-400/20 text-orange-400",
      status: "Live Production",
      statusColor: "bg-green-500/20 text-green-400",
      features: [
        "Real-time sales and inventory tracking",
        "Customer behavior analysis and segmentation",
        "Predictive sales forecasting models",
        "Automated marketing campaign optimization",
      ],
      technologies: ["Python", "Django", "React", "D3.js", "Redis", "AWS"],
      github: "https://github.com/Shakira2022/E-Commerce",
      demo: "https://ecommerce-analytics.vercel.app",
      image: null, // Will show "Coming Soon"
      comingSoon: true,
    },
    {
      title: "Clinic Chatbot and Management System",
      description:
        "Intelligent healthcare chatbot with patient management capabilities, appointment scheduling, and medical information assistance.",
      category: "Healthcare & AI",
      categoryColor: "bg-green-400/20 text-green-400",
      status: "In Development",
      statusColor: "bg-yellow-500/20 text-yellow-400",
      features: [
        "AI-powered medical chatbot for patient queries",
        "Appointment scheduling and management",
        "Patient records and history tracking",
        "Medical information and symptom checker",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "APIs Integration"],
      github: "https://github.com/citylyf/Clinic-Chatbot",
      demo: "https://clinic-chatbot.vercel.app",
      image: "/Clinic.png",
      comingSoon: true,
    },
    {
      title: "Weather Analytics Dashboard",
      description:
        "Interactive weather dashboard with data visualization, forecasting, and location-based weather tracking using external APIs.",
      category: "Data Visualization",
      categoryColor: "bg-blue-400/20 text-blue-400",
      status: "In Development",
      statusColor: "bg-yellow-500/20 text-yellow-400",
      features: [
        "Real-time weather data display",
        "Historical weather trends",
        "Interactive charts and graphs",
        "Location-based weather search",
      ],
      technologies: ["Vue.js", "D3.js", "Express.js", "Redis", "Chart.js"],
      github: "https://github.com/Shakira2022/Weather-Analytics",
      demo: "https://weather-analytics.vercel.app",
      image: null, // Will show "Coming Soon"
      comingSoon: true,
    },
    {
      title: "Cisco Packet Tracer Network Design",
      description:
        "Designed a robust and cost-effective network for a new company office using Cisco Packet Tracer, supporting departmental isolation, Internet access, and remote connectivity.",
      category: "Network Engineering",
      categoryColor: "bg-red-400/20 text-red-400",
      status: "Completed",
      statusColor: "bg-green-500/20 text-green-400",
      features: [
        "Topological network design with full isolation between departments",
        "Internet sharing across all zones from a central ISP connection",
        "Work-from-home support, remote access and BYOD security",
        "Comprehensive budget, simulations, and documentation",
      ],
      technologies: ["Cisco Packet Tracer", "Subnetting", "DHCP", "NAT", "Switching", "Routing"],
      github: "https://github.com/shakira2022/Cisco-Packet-Tracer",
      demo: "https://Cisco-Packet-Tracer.vercel.app",
      image: "/Cisco.png",
      comingSoon: true,
    },
  ]

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowComingSoon(true)
    setTimeout(() => setShowComingSoon(false), 2000)
  }

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
  const skills = {
    "Frontend Development": {
      icon: <Monitor className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", icon: <Code className="w-4 h-4" /> },
        { name: "Next.js", icon: <Layers className="w-4 h-4" /> },
        { name: "Vue.js", icon: <Code className="w-4 h-4" /> },
        { name: "TypeScript", icon: <FileText className="w-4 h-4" /> },
        { name: "Tailwind CSS", icon: <Palette className="w-4 h-4" /> },
        { name: "Framer Motion", icon: <Zap className="w-4 h-4" /> },
      ],
    },
    "Backend Development": {
      icon: <Server className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", icon: <Server className="w-4 h-4" /> },
        { name: "Express.js", icon: <Globe className="w-4 h-4" /> },
        { name: "Python", icon: <Code className="w-4 h-4" /> },
        { name: "Django", icon: <Shield className="w-4 h-4" /> },
        { name: "C#", icon: <Code className="w-4 h-4" /> },
        { name: ".NET", icon: <Layers className="w-4 h-4" /> },
      ],
    },
    "Database & Cloud": {
      icon: <Database className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
        { name: "MySQL", icon: <HardDrive className="w-4 h-4" /> },
        { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
        { name: "Firebase", icon: <Cloud className="w-4 h-4" /> },
        { name: "AWS", icon: <Cloud className="w-4 h-4" /> },
        { name: "Redis", icon: <Cpu className="w-4 h-4" /> },
      ],
    },
    "Development Tools": {
      icon: <Tool className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Visual Studio Code", icon: <Code className="w-4 h-4" /> },
        { name: "Visual Studio", icon: <Code className="w-4 h-4" /> },
        { name: "Git & GitHub", icon: <GitBranch className="w-4 h-4" /> },
        { name: "Git Bash", icon: <Terminal className="w-4 h-4" /> },
        { name: "Docker", icon: <Layers className="w-4 h-4" /> },
        { name: "Postman", icon: <Globe className="w-4 h-4" /> },
      ],
    },
    "Mobile & UI/UX": {
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      skills: [
        { name: "React Native", icon: <Smartphone className="w-4 h-4" /> },
        { name: "Flutter", icon: <Smartphone className="w-4 h-4" /> },
        { name: "Figma", icon: <Palette className="w-4 h-4" /> },
        { name: "Adobe XD", icon: <Palette className="w-4 h-4" /> },
        { name: "Responsive Design", icon: <Monitor className="w-4 h-4" /> },
        { name: "User Experience", icon: <Briefcase className="w-4 h-4" /> },
      ],
    },
    "Other Skills": {
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-teal-500 to-green-500",
      skills: [
        { name: "Cisco Packet Tracer", icon: <Network className="w-4 h-4" /> },
        { name: "Excel Advanced", icon: <Calculator className="w-4 h-4" /> },
        { name: "Data Analysis", icon: <PieChart className="w-4 h-4" /> },
        { name: "API Integration", icon: <Globe className="w-4 h-4" /> },
        { name: "System Administration", icon: <Settings className="w-4 h-4" /> },
        { name: "Network Security", icon: <Shield className="w-4 h-4" /> },
      ],
    },
  }

  const academicData = {
    year1: {
      average: "78.52%",
      semesters: [
        {
          title: "First Semester 2022",
          modules: [
            { name: "Academic Literacy Development", grade: "75%", status: "Distinction" },
            { name: "Introductory Mathematics I", grade: "84%", status: "Distinction" },
            { name: "Introduction To Problem Solving", grade: "75%", status: "Distinction" },
            { name: "Introduction To Business Management", grade: "63%", status: "Pass" },
            { name: "Descriptive Statistics", grade: "84%", status: "Distinction" },
          ],
        },
        {
          title: "Second Semester 2022",
          modules: [
            { name: "Introductory Mathematics 2", grade: "82%", status: "Distinction" },
            { name: "Intro Stat Inference I", grade: "69%", status: "Pass" },
            { name: "Introductory Programming Principals", grade: "94%", status: "Distinction" },
            { name: "Academic Literacy Development", grade: "77%", status: "Distinction" },
          ],
        },
      ],
    },
    year2: {
      average: "71.90%",
      semesters: [
        {
          title: "First Semester 2023",
          modules: [
            { name: "Introd To Graphical Interface Programming", grade: "87%", status: "Distinction" },
            { name: "Basic Mathematical Techniques", grade: "83%", status: "Distinction" },
            { name: "Financial Accounting Special", grade: "63%", status: "Pass" },
            { name: "Introduction To Object Oriented Programming", grade: "79%", status: "Distinction" },
            { name: "Introduction To Computing And Programming", grade: "75%", status: "Distinction" },
          ],
        },
        {
          title: "Second Semester 2023",
          modules: [
            { name: "Problem Solving For Managers", grade: "73%", status: "Pass" },
            { name: "Financial Accounting Special", grade: "57%", status: "Pass" },
            { name: "Structured Programming", grade: "54%", status: "Pass" },
            { name: "User Interface Programming I", grade: "76%", status: "Distinction" },
          ],
        },
      ],
    },
    year3: {
      average: "73.53%",
      semesters: [
        {
          title: "First Semester 2024",
          modules: [
            { name: "Object Oriented Programming", grade: "75%", status: "Distinction" },
            { name: "Understanding The Natural World", grade: "81%", status: "Distinction" },
            { name: "Apps & Advanced UI Programming", grade: "85%", status: "Distinction" },
            { name: "Communication Skills", grade: "80%", status: "Distinction" },
            { name: "Information Security", grade: "69%", status: "Pass" },
            { name: "System Analysis And Design 1", grade: "63%", status: "Pass" },
            { name: "Discrete Mathematics", grade: "57%", status: "Pass" },
          ],
        },
        {
          title: "Second Semester 2024",
          modules: [
            { name: "Understanding The Natural World", grade: "85%", status: "Distinction" },
            { name: "Data Structures And Algorithms", grade: "69%", status: "Pass" },
            { name: "System Analysis And Design 2", grade: "69%", status: "Pass" },
            { name: "Data Analytics 2", grade: "80%", status: "Distinction" },
          ],
        },
      ],
    },
    year4: {
      average: "Soon",
      semesters: [
        {
          title: "First Semester 2025",
          modules: [{ name: "Modules", grade: "Soon", status: "Soon" }],
        },
        {
          title: "Second Semester 2025",
          modules: [{ name: "Modules", grade: "Soon", status: "Soon" }],
        },
      ],
    },
  }

  const getBadgeClasses = (status: string) => {
    if (status === "Distinction") {
      return isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800"
    } else if (status === "Pass") {
      return isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-800"
    }
    return isDarkMode ? "bg-gray-500/20 text-gray-400" : "bg-gray-100 text-gray-800"
  }

  const sendSms = async (payload: { to: string; body: string }) => {
    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send SMS")
      }

      console.log("✅ SMS sent:", result)
      return result
    } catch (error: any) {
      console.error("❌ SMS Error:", error)
      throw error
    }
  }

  const calculateCharacterCount = (name: string, email: string, message: string) => {
    const fullMessage = `New message from ${name} (${email}):\n\n${message}`
    return fullMessage.length
  }


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("🚀 Form submit triggered") // Debug log

    // Validate form data before submitting
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields")
      return
    }

    setIsFormSubmitting(true)

    try {
      console.log("📤 Sending SMS with data:", formData) // Debug log

      const fullMessage = `New message from ${formData.name} (${formData.email}):\n\n${formData.message}`
      const charCount = fullMessage.length

      if (charCount > 160) {
        // Send the full message first
        const fullSmsPayload = {
          to: "+27785258483",
          body: fullMessage,
        }

        console.log("📦 Full SMS Payload:", fullSmsPayload) // Debug log

        await fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fullSmsPayload),
        })

        // Then send the notification message
        const notificationPayload = {
          to: "+27785258483",
          body: `Theres a text for you check BSMS from ${formData.name} (${formData.email})`,
        }

        console.log("📦 Notification SMS Payload:", notificationPayload) // Debug log

        const response = await fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationPayload),
        })

        console.log("📨 Response status:", response.status) // Debug log

        const result = await parseResponse(response)
        console.log("📨 Response data:", result) // Debug log

        if (!response.ok) {
          throw new Error(result.error || "Failed to send SMS")
        }
      } else {
        // Send as normal if under 160 characters
        const smsPayload = {
          to: "+27785258483",
          body: fullMessage,
        }

        console.log("📦 SMS Payload:", smsPayload) // Debug log

        const response = await fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(smsPayload),
        })

        console.log("📨 Response status:", response.status) // Debug log

        const result = await parseResponse(response)
        console.log("📨 Response data:", result) // Debug log

        if (!response.ok) {
          throw new Error(result.error || "Failed to send SMS")
        }
      }

      setFormSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      // Hide the "Message Sent" confirmation after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000)
    } catch (error: any) {
      console.error("❌ Error:", error) // Debug log
      alert("Error sending message: " + error.message)
    } finally {
      setIsFormSubmitting(false)
    }
  }


  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Muhle_Mabunda_CV.pdf"
    link.download = "Muhle_Mabunda_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Background Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large floating shapes - more visible */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-2xl"
          animate={{
            y: [0, 60, 0],
            x: [0, -40, 0],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-500/25 rounded-full blur-2xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 25, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 6,
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-56 h-56 bg-cyan-500/18 rounded-full blur-2xl"
          animate={{
            y: [0, -35, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 8,
          }}
        />

        {/* Floating particles - more visible */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/40 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isDarkMode
            ? "bg-black/20 backdrop-blur-md border-b border-white/10"
            : "bg-white/20 backdrop-blur-md border-b border-black/10"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              whileHover={{ scale: 1.05 }}
            >
              Muhle Mabunda
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === section.id
                      ? "text-purple-400"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {section.label}
                </button>
              ))}

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2 ml-4">
                <Sun className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-yellow-500"}`} />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-purple-600 [&>span]:bg-white dark:[&>span]:bg-gray-200"
                />
                <Moon className={`h-4 w-4 ${isDarkMode ? "text-blue-400" : "text-gray-400"}`} />
              </div>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sun className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-yellow-500"}`} />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-purple-600 [&>span]:bg-white dark:[&>span]:bg-gray-200"
                />
                <Moon className={`h-4 w-4 ${isDarkMode ? "text-blue-400" : "text-gray-400"}`} />
              </div>
              <button
                className={isDarkMode ? "text-white" : "text-gray-900"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            className={`md:hidden ${isDarkMode ? "bg-black/90" : "bg-white/90"} backdrop-blur-md`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-2 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left py-2 transition-colors ${
                    activeSection === section.id
                      ? "text-purple-400"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className={`min-h-screen flex items-center justify-center relative overflow-hidden py-20 border-b ${isDarkMode ? "border-slate-700/50" : "border-gray-200"}`}
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20"
                : "bg-gradient-to-r from-purple-200/40 to-blue-200/40"
            }`}
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 mb-4 px-3 py-1 rounded-full text-sm">
              Available for Opportunities
            </Badge>
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              Full-Stack <span className="text-purple-400">Developer</span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Passionate software engineer with expertise in modern web technologies, AI and API integration 
              and is ready to drive innovation and deliver exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleDownloadCV}
              >
                <Download className="mr-2" size={18} />
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`border-gray-400 ${isDarkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                onClick={() => scrollToSection("contact")}
              >
                <Phone className="mr-2" size={18} />
                Send SMS
              </Button>
            </div>
            <div className={`flex flex-wrap gap-x-6 gap-y-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
              <div className="flex items-center gap-2">
                <MapPin className="text-purple-400" size={16} />
                <span>Johannesburg</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="text-purple-400" size={16} />
                <span>Available Immediately</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="text-purple-400" size={16} />
                <span>74.4% GPA</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={() => handleExternalLink('https://github.com/Shakira2022')}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-slate-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                    : "bg-white text-gray-600 hover:bg-purple-600 hover:text-white shadow-md"
                }`}
              >
                <Github size={24} />
              </motion.button>
              <motion.button
                onClick={() => handleExternalLink('https://www.linkedin.com/in/muhle-mabunda-b951441a7')}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-slate-800 text-purple-400 hover:bg-purple-600 hover:text-white"
                    : "bg-white text-purple-600 hover:bg-purple-600 hover:text-white shadow-md"
                }`}
              >
                <Linkedin size={24} />
              </motion.button>
              <motion.button
                onClick={() => window.open('mailto:mabundamuhle46@gmail.com')}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-slate-800 text-purple-400 hover:bg-purple-600 hover:text-white"
                    : "bg-white text-purple-600 hover:bg-purple-600 hover:text-white shadow-md"
                }`}
              >
                <Mail size={24} />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Enhanced 3D Animated Circle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center w-full h-full min-h-[300px] md:min-h-[400px]"
          >
            {/* Multiple Rotating Rings for 3D Effect */}
            <motion.div
              className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full p-1 ${
                isDarkMode
                  ? "bg-gradient-to-br from-purple-500 to-blue-500"
                  : "bg-gradient-to-br from-purple-300 to-blue-300"
              }`}
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))',
              }}
            >
              {/* Inner Circle with 3D depth */}
              <motion.div
                className={`w-full h-full rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-slate-800" : "bg-white"
                }`}
                animate={{
                  boxShadow: [
                    "inset 0 0 20px rgba(147, 51, 234, 0.2)",
                    "inset 0 0 40px rgba(59, 130, 246, 0.3)",
                    "inset 0 0 20px rgba(147, 51, 234, 0.2)",
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              >
                <motion.img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Abstract pattern"
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover opacity-30"
                  animate={{
                    rotate: -360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Secondary Ring for Enhanced 3D Effect */}
            <motion.div
              className={`absolute w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full border-2 ${
                isDarkMode
                  ? "border-purple-400/30"
                  : "border-purple-300/40"
              }`}
              animate={{ 
                rotate: -360,
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }}
              style={{
                filter: 'blur(1px)',
              }}
            />

            {/* Outer Glow Ring */}
            <motion.div
              className={`absolute w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem] rounded-full ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                  : "bg-gradient-to-r from-purple-200/20 to-blue-200/20"
              }`}
              animate={{ 
                rotate: 360,
                scale: [1, 1.08, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ 
                rotate: { duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                opacity: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }}
              style={{
                filter: 'blur(20px)',
              }}
            />

            {/* Green Checkmark Icon with Enhanced Animation */}
            <motion.div
              className="absolute bottom-1/2 left-1/2 translate-x-1/2 translate-y-1/2 p-3 rounded-full bg-green-500 text-white shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.1, 1],
                y: [0, -5, 0],
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.9 },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))',
              }}
            >
              <CheckCircle size={32} />
            </motion.div>
          </motion.div>
        </div>
        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className={`${isDarkMode ? "text-white/60" : "text-gray-600/60"}`} size={32} />
        </motion.div>
      </section>

      {/* Coming Soon Notification */}
      <AnimatePresence>
        {showComingSoon && (
          <>
            {/* Background Overlay with Dim Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
            />
            
            {/* Text - Centered and Animated */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: [0.5, 1.2, 0.8, 1.1, 0.9, 1.0],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                opacity: { duration: 0.3 },
                scale: { 
                  duration: 2, 
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  ease: "easeInOut"
                }
              }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <span className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Coming Soon!
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-4 ${isDarkMode ? "bg-slate-950/30" : "bg-gray-100"} border-b ${isDarkMode ? "border-slate-700/50" : "border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-bold text-center mb-16 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div>
                  <div className="relative mx-auto max-w-lg">
                    <div className="relative w-96 h-96 mx-auto">
                      <img
                        src="/MyProfile.png"
                        alt="Muhle Mabunda - Full Stack Developer"
                        className="w-full h-full object-cover object-top rounded-full shadow-2xl border-4 border-purple-400/50 dark:border-purple-500/60 transform scale-75"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`space-y-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                <p className="text-lg leading-relaxed">
                  I'm a passionate Full Stack Developer with over 3 years of experience creating digital solutions that
                  make a difference. I specialize in modern web technologies and have a keen eye for user experience
                  design.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing knowledge with the developer community through blog posts.
                </p>
                

                {/* Languages Section */}
                <div className="pt-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["Python", "C#", "C++", "Java"].map((lang, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                          <Badge
                            className={`
                          ${isDarkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-gray-800"}
                          transition-colors cursor-pointer hover:opacity-80
                        `}
                          >
                            {lang}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["HTML", "CSS", "JavaScript", "Vue", "Tailwind", ".NET Multi-Platform App UI"].map(
                        (tech, index) => (
                          <motion.div key={index} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                            <Badge
                              className={`
                             ${isDarkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-gray-800"}
                             transition-colors cursor-pointer hover:opacity-80
                           `}
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Background & Certificates Section */}
            <div className="mt-16">
              <div className="grid md:grid-cols-2 gap-8 relative">
                {/* Vertical divider line - Fixed */}
                <div 
                  className={`absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 hidden md:block ${
                    isDarkMode 
                      ? "bg-gradient-to-b from-purple-400/30 via-purple-500/60 to-purple-400/30" 
                      : "bg-gradient-to-b from-purple-400/40 via-purple-500/70 to-purple-400/40"
                  }`}
                  style={{ minHeight: '100%', height: 'auto' }}
                />

                {/* Left Column: Academic Background */}
                <div>
                  <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Academic Background
                  </h3>
                  <Card
                    className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-gray-200"} h-full relative`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-purple-400">Bachelor of Science in IT</CardTitle>
                          <CardDescription className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                            Currently Pursuing • In Progress - North West University
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                        Pursuing Bachelor of Science in Information Technology with focus on Software Development and
                        System Administration.
                      </p>
                      {/* GPA Badge */}
                      <div className="mt-4">
                        <Badge
                          className={`
                            ${isDarkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-gray-800"}
                            transition-colors cursor-pointer hover:opacity-80
                          `}
                        >
                          Overall GPA: 74.4%
                        </Badge>
                      </div>
                      {/* Click here button with animated arrow */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="link"
                            className={`mt-4 p-0 h-auto text-left ${isDarkMode ? "text-purple-300 hover:text-purple-400" : "text-purple-600 hover:text-purple-700"}`}
                          >
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                              className="mr-2"
                            >
                              <ChevronRight size={18} />
                            </motion.div>
                            <span className="italic">Click here to view detailed academic record</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className={cn(
                            "max-w-4xl max-h-[80vh] overflow-y-auto",
                            isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200",
                          )}
                        >
                          <DialogHeader>
                            <DialogTitle className={isDarkMode ? "text-white text-2xl" : "text-gray-900 text-2xl"}>
                              Academic Transcripts
                            </DialogTitle>
                          </DialogHeader>
                          <div className="mt-6">
                            <Select defaultValue="year1" value={selectedYear} onValueChange={setSelectedYear}>
                              <SelectTrigger
                                className={cn(
                                  "w-full mb-4",
                                  isDarkMode
                                    ? "bg-slate-800 text-white border-slate-700"
                                    : "bg-gray-100 text-gray-900 border-gray-200",
                                )}
                              >
                                <SelectValue placeholder="Select a year" />
                              </SelectTrigger>
                              <SelectContent
                                className={cn(
                                  isDarkMode
                                    ? "bg-slate-800 text-white border-slate-700"
                                    : "bg-white text-gray-900 border-gray-200",
                                )}
                              >
                                <SelectGroup>
                                  <SelectLabel>Academic Years</SelectLabel>
                                  <SelectItem value="year1">2022 (First Year)</SelectItem>
                                  <SelectItem value="year2">2023 (Second Year)</SelectItem>
                                  <SelectItem value="year3">2024 (Third Year)</SelectItem>
                                  <SelectItem value="year4">2025 (Fourth Year)</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            {selectedYear && academicData[selectedYear as keyof typeof academicData] && (
                              <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                  {academicData[selectedYear as keyof typeof academicData].semesters.map(
                                    (semester, semIndex) => (
                                      <Card
                                        key={semIndex}
                                        className={cn(
                                          isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
                                        )}
                                      >
                                        <CardHeader>
                                          <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
                                            {semester.title}
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="space-y-2 mb-4">
                                            {semester.modules.map((module, modIndex) => (
                                              <div
                                                key={modIndex}
                                                className={cn(
                                                  "flex justify-between",
                                                  isDarkMode ? "text-gray-300" : "text-gray-700",
                                                )}
                                              >
                                                <span>{module.name}</span>
                                                <Badge className={getBadgeClasses(module.status)}>
                                                  {module.grade} ({module.status})
                                                </Badge>
                                              </div>
                                            ))}
                                          </div>
                                          <Separator
                                            className={isDarkMode ? "my-4 bg-slate-600" : "my-4 bg-gray-300"}
                                          />
                                        </CardContent>
                                      </Card>
                                    ),
                                  )}
                                </div>
                                <div className="text-center">
                                  <Badge className={getBadgeClasses("Distinction")}>
                                    Year Average: {academicData[selectedYear as keyof typeof academicData].average}
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column: Certificates and Achievements */}
                <div>
                  <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Achievement and Certificates
                  </h3>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className={`${
                        isDarkMode ? "bg-slate-800/30 border-slate-700" : "bg-white/50 border-gray-200"
                      } p-4 rounded-lg border`}
                    >
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Golden Key International Honour Society
                      </p>
                    </motion.div>

                    {["Git: Become an expert in Git and Github", "Cisco: Getting started with cisco packet tracer"].map(
                      (cert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={`${
                            isDarkMode ? "bg-slate-800/30 border-slate-700" : "bg-white/50 border-gray-200"
                          } p-4 rounded-lg border`}
                        >
                          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{cert}</p>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-4 ${isDarkMode ? "bg-slate-900/50" : "bg-white"} border-b ${isDarkMode ? "border-slate-700/50" : "border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-bold text-center mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              My Projects
            </h2>
            <p
              className={`text-lg text-center mb-16 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Here are some of my key projects, showcasing my expertise in full-stack development,E-Commerce,
              and Clinic Management solution. Each project reflects my commitment to creating impactful and innovative applications.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Card
                    className={`h-full flex flex-col ${
                      isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      {project.image ? (
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          isDarkMode ? "bg-slate-700" : "bg-gray-200"
                        }`}>
                          <span className={`text-2xl font-bold ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            Coming Soon
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={project.categoryColor}>{project.category}</Badge>
                        <Badge className={project.statusColor}>{project.status}</Badge>
                      </div>
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {project.title}
                      </CardTitle>
                      <CardDescription className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {project.description}
                      </CardDescription>
                      <div className="mt-4 space-y-2">
                        <h4
                          className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          <Zap size={18} className="text-purple-400" />
                          Key Features
                        </h4>
                        <Separator className={isDarkMode ? "bg-slate-600" : "bg-gray-300"} />
                        <ul className="space-y-1 text-sm">
                          {project.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <CheckCircle size={16} className="text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 space-y-2">
                        <h4
                          className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          <Code size={18} className="text-purple-400" />
                          Tech Stack
                        </h4>
                        <Separator className={isDarkMode ? "bg-slate-600" : "bg-gray-300"} />
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              className={`
                              ${isDarkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-gray-800"}
                              transition-colors cursor-pointer hover:opacity-80
                            `}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
                      <div className="flex gap-4">
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          onClick={project.comingSoon ? handleDemoClick : undefined}
                          {...(!project.comingSoon && { asChild: true })}
                        >
                          {!project.comingSoon ? (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <Play size={18} className="mr-2" />
                              Live Demo
                            </a>
                          ) : (
                            <>
                              <Play size={18} className="mr-2" />
                              Live Demo
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className={`flex-1 border-gray-400 ${isDarkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                          onClick={() => handleExternalLink(project.github)}
                        >
                          <Github size={18} className="mr-2" />
                          Source Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {/* View All Projects Button */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                variant="outline"
                className={`px-8 py-3 text-lg ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
              >
                <a href="https://github.com/Shakira2022?tab=repositories" target="_blank" rel="noopener noreferrer">
                  <Rocket className="mr-2" size={20} />
                  View All Projects on GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 px-4 ${isDarkMode ? "bg-slate-950/30" : "bg-gray-100"} border-b ${isDarkMode ? "border-slate-700/50" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-bold text-center mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Skills & Technologies
            </h2>
            <p
              className={`text-lg text-center mb-16 max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              A comprehensive overview of my technical expertise across various domains of software development, from
              frontend frameworks to backend systems and development tools.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, categoryData], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card
                    className={`${
                      isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-gray-200"
                    } h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryData.color} text-white shadow-lg`}>
                          {categoryData.icon}
                        </div>
                        <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {category}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categoryData.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="group/skill"
                          >
                            <div
                              className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? "bg-slate-700/50 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"} transition-all duration-200`}
                            >
                              <div
                                className={`p-2 rounded-md ${isDarkMode ? "bg-slate-600" : "bg-white"} group-hover/skill:bg-purple-500 transition-colors`}
                              >
                                {skill.icon}
                              </div>
                              <span className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                                {skill.name}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 ${isDarkMode ? "bg-slate-900/50" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-bold text-center mb-16 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Let's Connect
                </h3>
                <p className={`mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                  want to say hi, feel free to reach out!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-purple-400" size={20} />
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>mabundamuhle46@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="text-purple-400" size={20} />
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>+27 78 525 8483</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="text-purple-400" size={20} />
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                      Johannesburg
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <motion.button
                    onClick={() => handleExternalLink('https://github.com/Shakira2022')}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "bg-slate-800 text-purple-400 hover:bg-purple-600 hover:text-white"
                        : "bg-white text-purple-600 hover:bg-purple-600 hover:text-white shadow-md"
                    }`}
                  >
                    <Github size={24} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleExternalLink('https://www.linkedin.com/in/muhle-mabunda-b951441a7')}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "bg-slate-800 text-purple-400 hover:bg-purple-600 hover:text-white"
                        : "bg-white text-purple-600 hover:bg-purple-600 hover:text-white shadow-md"
                    }`}
                  >
                    <Linkedin size={24} />
                  </motion.button>
                </div>
              </div>
              <Card
                className={`${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-gray-200"} shadow-xl`}
              >
                <CardHeader>
                  <CardTitle className={`${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                    Send Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {formSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-8"
                      >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          Message Sent!
                        </h3>
                        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                          Thank you for reaching out. I'll get back to you soon!
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div>
                          <Label htmlFor="name" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            className={`${isDarkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-300"}`}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className={`${isDarkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-300"}`}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                            className={`${isDarkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-gray-50 border-gray-300"} min-h-[120px]`}
                            placeholder="Your message..."
                            required
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={handleFormSubmit}
                          disabled={isFormSubmitting}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          {isFormSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="mr-2 inline-block"
                            >
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                            </motion.div>
                          ) : (
                            <Send className="mr-2 h-4 w-4 inline-block" />
                          )}
                          {isFormSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-4 border-t ${isDarkMode ? "bg-black/40 border-slate-700" : "bg-white border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            © 2024 Muhle Mabunda. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}

