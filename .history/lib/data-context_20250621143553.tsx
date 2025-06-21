"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// Types
export interface Person {
  id: number
  name: string
  role: string
  category: string
  email: string
  interests: string[]
  bio: string
  image: string
  // Research Scholar specific fields
  yearOfJoining?: string
  expectedCompletion?: string
  iitProfileLink?: string
  // Additional contact info
  phone?: string
}

export interface Publication {
  id: number
  title: string
  authors: string[]
  journal: string
  year: number
  type: string // 'journal', 'conference', 'book-chapter', 'event'
  doi: string
  featured: boolean
  abstract: string
  paperUrl: string
  codeUrl: string
  // Additional fields for different publication types
  venue?: string // Conference name or book title
  pages?: string
  volume?: string
  issue?: string
  publisher?: string
  isbn?: string
}

export interface Achievement {
  id: number
  year: number
  type: string
  title: string
  description: string
  recipient: string
  icon: string
  color: string
}

export interface Instrument {
  id: number
  name: string
  category: string
  image: string
  description: string
  specs: string[]
  applications: string[]
  details: string
}

export interface Course {
  id: number
  title: string
  code: string
  semester: string
  instructor: string
  credits: number
  students: number
  description: string
  syllabus: string[]
  prerequisites: string[]
  textbook: string
  schedule: string
}

export interface HomeContent {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  mission: string
  vision: string
  stats: Array<{
    label: string
    value: number
  }>
}

export interface NewsItem {
  id: number
  title: string
  date: string
  type: string
}

export interface ContactInfo {
  address: {
    line1: string
    line2: string
    line3: string
    line4: string
    line5: string
  }
  phone: string
  email: string
  officeHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
}

export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  organizer?: string
  registrationLink?: string
}

export interface Alumni {
  id: number
  name: string
  graduationYear: string
  degree: string
  currentPosition?: string
  company?: string
  location?: string
  image?: string
  achievements?: string[]
}

// Initial Data
const initialPeople: Person[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Faculty",
    category: "Faculty",
    image: "/Screenshot 2025-06-01 215002.png",
    interests: ["Machine Learning", "Computer Vision", "AI"],
    bio: "Dr. Kumar is a leading researcher in machine learning with over 15 years of experience. He has published 50+ papers in top-tier conferences.",
    email: "rajesh@iitpkd.ac.in",
  },
  {
    id: 2,
    name: "Dr. Sarah Wilson",
    role: "Faculty",
    category: "Faculty",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Natural Language Processing", "Deep Learning", "AI Ethics"],
    bio: "Dr. Wilson specializes in NLP and AI ethics with a focus on responsible AI development.",
    email: "sarah.wilson@iitpkd.ac.in",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "PhD Student",
    category: "PhD",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Natural Language Processing", "Deep Learning"],
    bio: "Priya is working on advanced NLP models for multilingual text understanding.",
    email: "priya@iitpkd.ac.in",
  },
  {
    id: 4,
    name: "Arjun Patel",
    role: "PhD Student",
    category: "PhD",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Robotics", "Computer Vision"],
    bio: "Arjun focuses on autonomous navigation systems for mobile robots.",
    email: "arjun@iitpkd.ac.in",
  },
  {
    id: 5,
    name: "Ravi Kumar",
    role: "MS Student",
    category: "MS",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Machine Learning", "Data Science"],
    bio: "Ravi is working on predictive analytics and machine learning applications.",
    email: "ravi@iitpkd.ac.in",
  },
  {
    id: 6,
    name: "Anita Singh",
    role: "MS Student",
    category: "MS",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Computer Vision", "Image Processing"],
    bio: "Anita focuses on medical image analysis using computer vision techniques.",
    email: "anita@iitpkd.ac.in",
  },
  {
    id: 7,
    name: "Sarah Johnson",
    role: "Research Intern",
    category: "Interns",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["Data Science", "Machine Learning"],
    bio: "Sarah is an undergraduate intern working on predictive analytics projects.",
    email: "sarah@iitpkd.ac.in",
  },
  {
    id: 8,
    name: "Michael Chen",
    role: "Research Intern",
    category: "Interns",
    image: "/placeholder.svg?height=300&width=300",
    interests: ["AI", "Software Development"],
    bio: "Michael is working on AI-powered software development tools.",
    email: "michael@iitpkd.ac.in",
  },
]

const initialPublications: Publication[] = [
  {
    id: 1,
    title: "Deep Learning Approaches for Autonomous Vehicle Navigation",
    authors: ["Dr. Rajesh Kumar", "Priya Sharma", "Arjun Patel"],
    journal: "IEEE Transactions on Intelligent Transportation Systems",
    year: 2024,
    type: "Journal",
    doi: "10.1109/TITS.2024.1234567",
    featured: true,
    abstract: "This paper presents novel deep learning approaches for autonomous vehicle navigation in complex urban environments.",
    paperUrl: "https://example.com/paper1.pdf",
    codeUrl: "https://github.com/example/autonomous-navigation",
  },
  {
    id: 2,
    title: "Natural Language Processing for Multilingual Understanding",
    authors: ["Priya Sharma", "Dr. Sarah Wilson"],
    journal: "ACL 2024",
    year: 2024,
    type: "Conference",
    doi: "10.18653/v1/2024.acl-long.123",
    featured: true,
    abstract: "A comprehensive study on multilingual NLP models for cross-lingual understanding.",
    paperUrl: "https://example.com/paper2.pdf",
    codeUrl: "https://github.com/example/multilingual-nlp",
  },
]

const initialHomeContent: HomeContent = {
  hero: {
    title: "IIT Palakkad Research Lab",
    subtitle: "Advancing the frontiers of science and technology through innovative research",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
  },
  mission: "To conduct world-class research that addresses real-world challenges and contributes to the advancement of science and technology for the betterment of society.",
  vision: "To be a globally recognized research laboratory that fosters innovation, nurtures talent, and creates impactful solutions for tomorrow's challenges.",
  stats: [
    { label: "Research Students", value: 25 },
    { label: "Publications", value: 75 },
    { label: "Awards", value: 15 },
    { label: "Years of Excellence", value: 10 },
  ],
}

const initialAchievements: Achievement[] = [
  {
    id: 1,
    year: 2024,
    type: "Award",
    title: "Best Paper Award",
    description: "Received best paper award at ICML 2024 for groundbreaking research in machine learning.",
    recipient: "Dr. Rajesh Kumar",
    icon: "Award",
    color: "bg-yellow-500",
  },
  {
    id: 2,
    year: 2024,
    type: "Grant",
    title: "NSF Research Grant",
    description: "Awarded $500,000 NSF grant for AI research in autonomous systems.",
    recipient: "Dr. Sarah Wilson",
    icon: "DollarSign",
    color: "bg-green-500",
  },
]

const initialInstruments: Instrument[] = [
  {
    id: 1,
    name: "High-Performance Computing Cluster",
    category: "Computing",
    image: "/placeholder.svg?height=300&width=400",
    description: "State-of-the-art computing cluster for machine learning and AI research.",
    specs: ["64 CPU cores", "512GB RAM", "8x NVIDIA A100 GPUs", "100TB storage"],
    applications: ["Deep Learning", "Computer Vision", "Natural Language Processing"],
    details: "Our HPC cluster enables researchers to train large-scale machine learning models and conduct complex simulations.",
  },
  {
    id: 2,
    name: "Robotic Arm System",
    category: "Robotics",
    image: "/placeholder.svg?height=300&width=400",
    description: "6-DOF robotic arm for manipulation and interaction research.",
    specs: ["6 degrees of freedom", "5kg payload", "0.1mm repeatability", "Force/torque sensing"],
    applications: ["Human-Robot Interaction", "Manipulation Research", "Automation"],
    details: "Advanced robotic system for studying human-robot collaboration and autonomous manipulation tasks.",
  },
]

const initialCourses: Course[] = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    code: "CS 6301",
    semester: "Fall 2024",
    instructor: "Dr. Rajesh Kumar",
    credits: 3,
    students: 45,
    description: "Comprehensive introduction to machine learning algorithms and applications.",
    syllabus: ["Linear Regression", "Classification", "Neural Networks", "Deep Learning", "Reinforcement Learning"],
    prerequisites: ["Linear Algebra", "Probability and Statistics", "Programming"],
    textbook: "Pattern Recognition and Machine Learning by Christopher Bishop",
    schedule: "MWF 10:00-11:00 AM",
  },
  {
    id: 2,
    title: "Computer Vision",
    code: "CS 6302",
    semester: "Spring 2024",
    instructor: "Dr. Sarah Wilson",
    credits: 3,
    students: 32,
    description: "Advanced topics in computer vision and image processing.",
    syllabus: ["Image Processing", "Feature Detection", "Object Recognition", "Deep Learning for Vision"],
    prerequisites: ["Machine Learning", "Linear Algebra", "Programming"],
    textbook: "Computer Vision: Algorithms and Applications by Richard Szeliski",
    schedule: "TTh 2:00-3:30 PM",
  },
]

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "Dr. Smith receives NSF Grant for AI Research",
    date: "2024-01-15",
    type: "Grant",
  },
  {
    id: 2,
    title: "Paper accepted at ICML 2024",
    date: "2024-01-10",
    type: "Publication",
  },
]

const initialContactInfo: ContactInfo = {
  address: {
    line1: "Research Laboratory",
    line2: "Indian Institute of Technology Palakkad",
    line3: "Ahalia Integrated Campus",
    line4: "Kozhippara, Palakkad - 678623",
    line5: "Kerala, India",
  },
  phone: "+91 4923 226 100",
  email: "research@iitpkd.ac.in",
  officeHours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: 9:00 AM - 1:00 PM",
    sunday: "Sunday: Closed",
  },
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "International Conference on Machine Learning",
    description: "Join us for a comprehensive conference on the latest advances in machine learning and artificial intelligence.",
    date: "2024-07-15",
    time: "9:00 AM - 5:00 PM",
    location: "IIT Palakkad Auditorium",
    category: "Conference",
    organizer: "Department of Computer Science",
    registrationLink: "https://example.com/register",
  },
  {
    id: 2,
    title: "AI Workshop for Beginners",
    description: "A hands-on workshop introducing the fundamentals of artificial intelligence and machine learning.",
    date: "2024-06-20",
    time: "2:00 PM - 6:00 PM",
    location: "Computer Lab 1",
    category: "Workshop",
    organizer: "Dr. Rajesh Kumar",
    registrationLink: "https://example.com/workshop",
  },
  {
    id: 3,
    title: "Research Seminar: Future of Robotics",
    description: "An insightful seminar discussing the future trends and applications of robotics in various industries.",
    date: "2024-05-10",
    time: "3:00 PM - 4:30 PM",
    location: "Seminar Hall",
    category: "Seminar",
    organizer: "Dr. Sarah Wilson",
  },
  {
    id: 4,
    title: "Annual Tech Competition",
    description: "Showcase your technical skills in our annual competition featuring multiple categories.",
    date: "2024-08-25",
    time: "10:00 AM - 6:00 PM",
    location: "Main Campus",
    category: "Competition",
    organizer: "Student Technical Society",
    registrationLink: "https://example.com/competition",
  },
]

const initialAlumni: Alumni[] = [
  {
    id: 1,
    name: "Dr. Amit Sharma",
    graduationYear: "2020",
    degree: "PhD in Computer Science",
    currentPosition: "Senior Research Scientist",
    company: "Google Research",
    location: "Mountain View, CA",
    image: "/placeholder.svg?height=300&width=300",
    achievements: ["Best Thesis Award", "Published 15+ papers", "Patent holder"],
  },
  {
    id: 2,
    name: "Neha Gupta",
    graduationYear: "2021",
    degree: "MS in Computer Science",
    currentPosition: "Software Engineer",
    company: "Microsoft",
    location: "Seattle, WA",
    image: "/placeholder.svg?height=300&width=300",
    achievements: ["Dean's List", "Hackathon Winner"],
  },
  {
    id: 3,
    name: "Rahul Verma",
    graduationYear: "2019",
    degree: "PhD in Electrical Engineering",
    currentPosition: "Pursuing Postdoc",
    company: "MIT",
    location: "Cambridge, MA",
    image: "/placeholder.svg?height=300&width=300",
    achievements: ["Best Paper Award", "Research Excellence Award"],
  },
  {
    id: 4,
    name: "Priyanka Joshi",
    graduationYear: "2022",
    degree: "MS in Data Science",
    currentPosition: "Data Scientist",
    company: "Netflix",
    location: "Los Gatos, CA",
    image: "/placeholder.svg?height=300&width=300",
    achievements: ["Outstanding Student Award", "Industry Collaboration"],
  },
  {
    id: 5,
    name: "Vikram Singh",
    graduationYear: "2018",
    degree: "PhD in Machine Learning",
    currentPosition: "Principal Engineer",
    company: "Tesla",
    location: "Palo Alto, CA",
    image: "/placeholder.svg?height=300&width=300",
    achievements: ["Innovation Award", "10+ Patents", "Tech Lead"],
  },
]

// Context
interface DataContextType {
  // People
  people: Person[]
  addPerson: (person: Omit<Person, 'id'>) => void
  updatePerson: (id: number, person: Partial<Person>) => void
  deletePerson: (id: number) => void

  // Publications
  publications: Publication[]
  addPublication: (publication: Omit<Publication, 'id'>) => void
  updatePublication: (id: number, publication: Partial<Publication>) => void
  deletePublication: (id: number) => void

  // Achievements
  achievements: Achievement[]
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void
  updateAchievement: (id: number, achievement: Partial<Achievement>) => void
  deleteAchievement: (id: number) => void

  // Instruments
  instruments: Instrument[]
  addInstrument: (instrument: Omit<Instrument, 'id'>) => void
  updateInstrument: (id: number, instrument: Partial<Instrument>) => void
  deleteInstrument: (id: number) => void

  // Courses
  courses: Course[]
  addCourse: (course: Omit<Course, 'id'>) => void
  updateCourse: (id: number, course: Partial<Course>) => void
  deleteCourse: (id: number) => void

  // Home Content
  homeContent: HomeContent
  updateHomeContent: (content: Partial<HomeContent>) => void

  // News
  news: NewsItem[]
  addNews: (newsItem: Omit<NewsItem, 'id'>) => void
  updateNews: (id: number, newsItem: Partial<NewsItem>) => void
  deleteNews: (id: number) => void

  // Contact
  contactInfo: ContactInfo
  updateContactInfo: (info: Partial<ContactInfo>) => void

  // Events
  events: Event[]
  addEvent: (event: Omit<Event, 'id'>) => void
  updateEvent: (id: number, event: Partial<Event>) => void
  deleteEvent: (id: number) => void

  // Alumni
  alumni: Alumni[]
  addAlumni: (alumni: Omit<Alumni, 'id'>) => void
  updateAlumni: (id: number, alumni: Partial<Alumni>) => void
  deleteAlumni: (id: number) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Provider
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [people, setPeople] = useState<Person[]>(initialPeople)
  const [publications, setPublications] = useState<Publication[]>(initialPublications)
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements)
  const [instruments, setInstruments] = useState<Instrument[]>(initialInstruments)
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [homeContent, setHomeContent] = useState<HomeContent>(initialHomeContent)
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo)
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [alumni, setAlumni] = useState<Alumni[]>(initialAlumni)

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPeople = localStorage.getItem('lab-people')
      const savedPublications = localStorage.getItem('lab-publications')
      const savedAchievements = localStorage.getItem('lab-achievements')
      const savedInstruments = localStorage.getItem('lab-instruments')
      const savedCourses = localStorage.getItem('lab-courses')
      const savedHomeContent = localStorage.getItem('lab-home-content')
      const savedNews = localStorage.getItem('lab-news')
      const savedContactInfo = localStorage.getItem('lab-contact-info')
      const savedEvents = localStorage.getItem('lab-events')
      const savedAlumni = localStorage.getItem('lab-alumni')

      if (savedPeople) setPeople(JSON.parse(savedPeople))
      if (savedPublications) setPublications(JSON.parse(savedPublications))
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
      if (savedInstruments) setInstruments(JSON.parse(savedInstruments))
      if (savedCourses) setCourses(JSON.parse(savedCourses))
      if (savedHomeContent) setHomeContent(JSON.parse(savedHomeContent))
      if (savedNews) setNews(JSON.parse(savedNews))
      if (savedContactInfo) setContactInfo(JSON.parse(savedContactInfo))
      if (savedEvents) setEvents(JSON.parse(savedEvents))
      if (savedAlumni) setAlumni(JSON.parse(savedAlumni))
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-people', JSON.stringify(people))
    }
  }, [people])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-publications', JSON.stringify(publications))
    }
  }, [publications])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-achievements', JSON.stringify(achievements))
    }
  }, [achievements])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-instruments', JSON.stringify(instruments))
    }
  }, [instruments])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-courses', JSON.stringify(courses))
    }
  }, [courses])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-home-content', JSON.stringify(homeContent))
    }
  }, [homeContent])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-news', JSON.stringify(news))
    }
  }, [news])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-contact-info', JSON.stringify(contactInfo))
    }
  }, [contactInfo])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-events', JSON.stringify(events))
    }
  }, [events])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab-alumni', JSON.stringify(alumni))
    }
  }, [alumni])

  // People functions
  const addPerson = (person: Omit<Person, 'id'>) => {
    const newPerson = { ...person, id: Date.now() }
    setPeople(prev => [...prev, newPerson])
  }

  const updatePerson = (id: number, updates: Partial<Person>) => {
    setPeople(prev => prev.map(person => 
      person.id === id ? { ...person, ...updates } : person
    ))
  }

  const deletePerson = (id: number) => {
    setPeople(prev => prev.filter(person => person.id !== id))
  }

  // Publications functions
  const addPublication = (publication: Omit<Publication, 'id'>) => {
    const newPublication = { ...publication, id: Date.now() }
    setPublications(prev => [...prev, newPublication])
  }

  const updatePublication = (id: number, updates: Partial<Publication>) => {
    setPublications(prev => prev.map(pub => 
      pub.id === id ? { ...pub, ...updates } : pub
    ))
  }

  const deletePublication = (id: number) => {
    setPublications(prev => prev.filter(pub => pub.id !== id))
  }

  // Achievements functions
  const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = { ...achievement, id: Date.now() }
    setAchievements(prev => [...prev, newAchievement])
  }

  const updateAchievement = (id: number, updates: Partial<Achievement>) => {
    setAchievements(prev => prev.map(achievement =>
      achievement.id === id ? { ...achievement, ...updates } : achievement
    ))
  }

  const deleteAchievement = (id: number) => {
    setAchievements(prev => prev.filter(achievement => achievement.id !== id))
  }

  // Instruments functions
  const addInstrument = (instrument: Omit<Instrument, 'id'>) => {
    const newInstrument = { ...instrument, id: Date.now() }
    setInstruments(prev => [...prev, newInstrument])
  }

  const updateInstrument = (id: number, updates: Partial<Instrument>) => {
    setInstruments(prev => prev.map(instrument =>
      instrument.id === id ? { ...instrument, ...updates } : instrument
    ))
  }

  const deleteInstrument = (id: number) => {
    setInstruments(prev => prev.filter(instrument => instrument.id !== id))
  }

  // Courses functions
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: Date.now() }
    setCourses(prev => [...prev, newCourse])
  }

  const updateCourse = (id: number, updates: Partial<Course>) => {
    setCourses(prev => prev.map(course =>
      course.id === id ? { ...course, ...updates } : course
    ))
  }

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id))
  }

  // Home content functions
  const updateHomeContent = (updates: Partial<HomeContent>) => {
    setHomeContent(prev => ({ ...prev, ...updates }))
  }

  // News functions
  const addNews = (newsItem: Omit<NewsItem, 'id'>) => {
    const newNews = { ...newsItem, id: Date.now() }
    setNews(prev => [...prev, newNews])
  }

  const updateNews = (id: number, updates: Partial<NewsItem>) => {
    setNews(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const deleteNews = (id: number) => {
    setNews(prev => prev.filter(item => item.id !== id))
  }

  // Contact functions
  const updateContactInfo = (updates: Partial<ContactInfo>) => {
    setContactInfo(prev => ({ ...prev, ...updates }))
  }

  // Events functions
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now() }
    setEvents(prev => [...prev, newEvent])
  }

  const updateEvent = (id: number, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event =>
      event.id === id ? { ...event, ...updates } : event
    ))
  }

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  // Alumni functions
  const addAlumni = (alumni: Omit<Alumni, 'id'>) => {
    const newAlumni = { ...alumni, id: Date.now() }
    setAlumni(prev => [...prev, newAlumni])
  }

  const updateAlumni = (id: number, updates: Partial<Alumni>) => {
    setAlumni(prev => prev.map(alumni =>
      alumni.id === id ? { ...alumni, ...updates } : alumni
    ))
  }

  const deleteAlumni = (id: number) => {
    setAlumni(prev => prev.filter(alumni => alumni.id !== id))
  }

  const value: DataContextType = {
    people,
    addPerson,
    updatePerson,
    deletePerson,
    publications,
    addPublication,
    updatePublication,
    deletePublication,
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    instruments,
    addInstrument,
    updateInstrument,
    deleteInstrument,
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    homeContent,
    updateHomeContent,
    news,
    addNews,
    updateNews,
    deleteNews,
    contactInfo,
    updateContactInfo,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    alumni,
    addAlumni,
    updateAlumni,
    deleteAlumni,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

// Hook
export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
