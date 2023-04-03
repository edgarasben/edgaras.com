'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const data = [
  {
    title: 'Web & UI Design',
    description:
      "Ready to create a digital presence that's smart, sleek, and functional? Whether you're launching a brand new website or mobile app, or looking to revamp your existing digital product, I'll work with you to understand your business goals and design a site or app that's optimized for your users and aligned with your brand. With expertise in UI design and development best practices, I'll create a digital product that not only looks great, but also delivers an intuitive and engaging user experience that keeps your customers coming back for more.",
    image: '/images/web-mobile-design.svg',
    imageWidth: 210
  },
  {
    title: 'UX Research & Optimizations',
    description:
      'I use a range of design research methods such as heuristic evaluation, user testing, surveys, and analytics to understand how users interact with your services and products. Based on the insights gathered, I provide practical recommendations for improving the design, layout, and content of the website or app. By optimizing the user experience, I help businesses increase user engagement, improve conversion rates, and ultimately achieve their business objectives.',
    /* 'Digital product design, mobile or web, worked with React Native, Unity devs, SaaS. Design System that aligns with your brand. Icon, typography, color and layour design, following web and native design patterns, and best practices. Accessible, responsive, and performant.', */
    image: '/images/ux-research-audits.svg',
    imageWidth: 276
  },

  {
    title: 'Prototypes & MVPs',
    description:
      "Need to test your product idea before investing time and money in development? I offer both no-code and code-based prototyping services to help you bring your idea to life. Using the latest tools and techniques, I'll work with you to create a functional prototype that can be tested and refined to ensure that it meets your business objectives and user needs. Whether you're looking to build an MVP or just validate a concept, I can help you get there faster and with more confidence.",
    image: '/images/prototypes-mvps.svg',
    imageWidth: 142
  },
  {
    title: 'AI & Automations',
    description:
      "I offer AI and automation solutions to help streamline your business operations and save you time. Using no-code tools, I can automate tasks such as sending scheduled emails, posting to social media, and data scraping. Additionally, I can leverage the power of the ChatGPT API to automate various manual tasks. Whether you're looking to improve efficiency or reduce human error, I can create custom workflows tailored to your unique needs. Let's discuss your specific needs and see how I can help.",
    image: '/images/ai-automations.svg',
    imageWidth: 335
  }
  /*   {
    title: 'Software Design',
    description: 'Landing page design, blogs, newsletter design, connecting CMS system.',
    image: '/images/software.png'
  },
  {
    title: 'Automation',
    description:
      'Design in terms in backstage processes, newsletters, email automations, data scraping, data processing, social media autoamtion, ',
    image: '/images/automation.png'
  } */
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
      ease: 'easeOut'
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
}

export function AnimateStagger() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      /*     initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut', staggerChildren: 0.5 }} */
      /*  viewport={{ once: true }} */
      className="grid w-full grid-cols-1 gap-0.5 pt-24 md:grid-cols-2"
    >
      {data.map((service) => (
        <motion.div
          key={service.title}
          variants={item}
          className="w-full space-y-16 bg-neutral/50 p-16"
        >
          <Image
            src={service.image}
            width={service.imageWidth}
            height={166}
            alt={service.image}
          />
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">{service.title}</h3>
            <p className="text-lg text-fg-neutral-faded">{service.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
