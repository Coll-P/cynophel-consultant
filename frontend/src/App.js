import React, { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [clickedItem, setClickedItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'hub', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (item) => {
    setClickedItem(item.toLowerCase())
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-blue-900" style={{ fontFamily: 'Calibri Light, sans-serif' }}>
      <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <a className="flex items-center space-x-2" href="#home">
            <img src="image/logo.jpg" alt="CYNOPHEL CONSULTANTS" className="h-12 w-12" />
            <span className="hidden font-bold sm:inline-block">CYNOPHEL CONSULTANTS</span>
          </a>
          <nav className="flex-1 flex justify-center items-center space-x-6 lg:space-x-10">
            {['Home', 'About', 'Services', 'Hub', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                  activeSection === item.toLowerCase() || clickedItem === item.toLowerCase() ? 'text-primary' : ''
                }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left ${
                  activeSection === item.toLowerCase() || clickedItem === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </a>
            ))}
          </nav>
          <div className="w-12"></div> {/* Spacer to balance the logo */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-blue-200 bg-white text-blue-900">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-black">&copy; 2024 CYNOPHEL CONSULTANTS. All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-black">Email: info@cynophel.co.tz</p>
            <p className="text-black">Phone: +255 757-567-700</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {[Facebook, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#" className="text-blue-900 hover:text-blue-600 transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    "image/bg1.jpg",
    "image/bg2.jpg",
    "image/bg3.jpg",
    "image/bg4.jpg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full h-[400px] md:h-[600px] bg-white">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Carousel ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}

const Home = () => (
  <div id="home" className="relative">
    <ImageCarousel />
    <div className="relative bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-blue-900">Welcome to CYNOPHEL CONSULTANTS</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
          <div>
            <p className="mb-4 text-sm sm:text-base md:text-lg text-black">
              Cynophel is focused on achieving a high-quality service where our clients have direct access to decision-makers. Our people are driven to build and maintain positive, personal relationships and to really understand the sectors in which our clients operate.
            </p>
            <p className="mb-4 text-sm sm:text-base md:text-lg text-black">
              Our approach is as follows, for audits it is risk-based, innovative and efficient. We focus on improving the audit process, year on year, and providing quality feedback to management on internal systems and controls.
            </p>
            <p className="mb-4 text-sm sm:text-base md:text-lg text-black">
              We also add value to our clients through our approach to tax compliance and planning. We work with clients to provide awareness of pending changes in legislation and assess the impact on their business.
            </p>
            <Button className="mt-4">Learn More About Our Services</Button>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">Our Location</h2>
            <p className="mb-2 text-sm sm:text-base text-black">Mikocheni Plot 121</p>
            <p className="mb-2 text-sm sm:text-base text-black">Opposite Regency Hotel</p>
            <p className="mb-4 text-sm sm:text-base text-black">Dar es Salaam, Tanzania</p>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const About = () => (
  <div id="about" className="bg-gray-50 py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">About CYNOPHEL CONSULTANTS</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Story</h2>
          <p className="mb-4 text-black text-sm sm:text-base">
            At CYNOPHEL CONSULTANTS, we pride ourselves on delivering exceptional tax consultancy services to businesses and individuals across Tanzania. Our team of experienced professionals is dedicated to providing tailored solutions that meet the unique needs of each client.
          </p>
          <p className="mb-4 text-black text-sm sm:text-base">
            With years of experience in the industry, we have developed a deep understanding of the complex tax landscape in Tanzania and beyond. Our expertise allows us to navigate the intricacies of tax laws and regulations, ensuring that our clients remain compliant while optimizing their tax positions.
          </p>
          <p className="text-black text-sm sm:text-base">
            We believe in building long-lasting relationships with our clients, based on trust, transparency, and mutual success. Our commitment to excellence and continuous improvement drives us to stay at the forefront of industry developments, enabling us to provide cutting-edge advice and strategies.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Mission</h2>
          <p className="mb-6 text-black text-sm sm:text-base">
            To empower businesses and individuals with expert tax consultancy services, enabling them to navigate the complex financial landscape with confidence and achieve their financial goals.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Vision</h2>
          <p className="mb-6 text-black text-sm sm:text-base">
            To be the leading tax consultancy firm in Tanzania, recognized for our integrity, expertise, and innovative solutions that drive financial success for our clients.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Values</h2>
          <ul className="list-disc list-inside text-black text-sm sm:text-base">
            <li>Integrity in all our dealings</li>
            <li>Excellence in service delivery</li>
            <li>Continuous learning and innovation</li>
            <li>Client-centric approach</li>
            <li>Collaboration and teamwork</li>
          </ul>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Word from Our Team Lead</h2>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <img 
                src="image/judith.jpg" 
                alt="Team Lead" 
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-blue-500"
              />
              <h3 className="font-semibold text-xl text-center">Judith Frugence</h3>
              <p className="text-lg text-gray-600 text-center">Partner</p>
              <p className="mt-4 text-center text-black text-sm sm:text-base">
                "At CYNOPHEL CONSULTANTS, we are committed to providing exceptional tax consultancy services. Our team of experts is dedicated to helping our clients navigate the complex world of taxation with confidence and ease. We believe in building lasting relationships based on trust, expertise, and a deep understanding of our clients' needs."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

const services = [
  {
    title: "Statutory Audit",
    description: "We provide comprehensive auditing services to ensure your business complies with all statutory requirements. Our experienced team conducts thorough examinations of your financial records, offering valuable insights and recommendations.",
    image: "image/statutory.jpg"
  },
  {
    title: "Outsourcing compliance services",
    description: "Let us handle your compliance needs efficiently, allowing you to focus on core business activities. Our outsourcing services cover a wide range of compliance requirements, ensuring your business stays up-to-date with regulations.",
    image: "image/compliance.jpg"
  },
  {
    title: "Tax Health Check",
    description: "Our Tax Health Check service offers a thorough assessment of your tax position. We identify potential risks and opportunities, helping you optimize your tax strategy and ensure compliance with current tax laws.",
    image: "image/health.jpg"
  },
  {
    title: "Tax Retainer",
    description: "Stay informed and compliant throughout the year with our ongoing tax advisory services. Our Tax Retainer service provides you with regular updates, personalized advice, and proactive tax planning strategies.",
    image: "image/retainer.jpg"
  },
  {
    title: "Assistance in tackling tax audits",
    description: "Face tax audits with confidence. Our expert team provides comprehensive support during tax audits, ensuring smooth proceedings and working towards favorable outcomes for your business.",
    image: "image/audits.jpg"
  },
  {
    title: "Any other adhoc tax advisory services",
    description: "We offer customized tax advisory services tailored to your specific needs and challenges. Whether you need guidance on international tax issues, M&A tax implications, or any other tax-related matter, our team is here to help.",
    image: "image/advisory.jpg"
  }
]

const Services = () => (
  <div id="services" className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center text-blue-900">Our Services</h1>
      <div className="space-y-16">
        {services.map((service, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`} id={service.title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-blue-800">{service.title}</h2>
              <p className="text-black leading-relaxed text-sm sm:text-base">{service.description}</p>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/4">
              <img src={service.image} alt={service.title} className="w-full h-auto rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const resources = [
  {
    title: "Tax Updates",
    description: "Stay informed about the  latest changes in tax legislation and regulations.",
    link: "#"
  },
  {
    title: "Industry Insights",
    description: "Gain valuable insights into tax implications for various industries.",
    link: "#"
  },
  {
    title: "Webinars",
    description: "Join our expert-led webinars on various tax-related topics.",
    link: "#"
  },
  {
    title: "Downloadable Guides",
    description: "Access our comprehensive guides on tax planning and compliance.",
    link: "#"
  }
]

const Hub = () => (
  <div id="hub" className="container mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8 text-center">Resource Hub</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {resources.map((resource, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{resource.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-black text-sm sm:text-base">{resource.description}</CardDescription>
            <Button className="mt-4" variant="outline">Learn More</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

const Contact = () => (
  <div id="contact" className="bg-gray-100 py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-12 text-center text-blue-900">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">Get in Touch</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <p className="text-black text-sm sm:text-base">
                    Mikocheni Plot 121, Opposite Regency Hotel, Dar es Salaam, Tanzania
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <p className="text-black text-sm sm:text-base">+255 757-567-700</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <p className="text-black text-sm sm:text-base">info@cynophel.co.tz</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-black text-sm sm:text-base">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-black text-sm sm:text-base">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 h-[300px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.8754543254!2d39.2721!3d-6.7789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDYnNDQuMCJTIDM5wrAxNicxOS42IkU!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="CYNOPHEL CONSULTANTS Location"
            ></iframe>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">Send Us a Message</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Your Name" 
                    className="w-full p-3 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-700">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="Message Subject" 
                    className="w-full p-3 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Your Message" 
                    rows={4} 
                    className="w-full p-3 text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-3">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
)

const App = () => {
  return (
    <Layout>
      <Home />
      <About />
      <Services />
      <Hub />
      <Contact />
    </Layout>
  )
}

export default App