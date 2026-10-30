import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'


const INFO = {
  name: 'Shaurya Tiwari',
  dob: '18/03/2006', 
  location: 'Jabalpur, M.P.', 
  college: 'R.G.P.V University, Jabalpur',
  course: 'B.Tech, Computer Science',
  currently:
    'Final year student preparing to join TCS as an Assistant System Engineer, practising DSA in C++ and building this portfolio.',
}

const OBJECTIVE = [
  "I'm a full-stack developer and final-year Computer Science student who enjoys turning ideas into complete, working products, from the database to the interface.",
  'I want to build reliable, well-crafted software, and go deeper into system-level programming in C++ to understand how things work beneath the abstraction.',
  "I'm looking for opportunities where I can learn from strong engineers, take on real problems, and grow into an engineer who understands software from the interface down to the operating system.",
]

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/shaurya-tiwari-m2006/',
  github: 'https://github.com/Shaurya1803',
  leetcode: 'https://leetcode.com/u/Shaurya1803/',
  
  codechef: 'https://www.codechef.com/users/shaurya_tiw_75',
}

/* ---------------------------- Icons ---------------------------- */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
)


const CodeChefIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 7l-5 5 5 5" />
    <path d="M16 7l5 5-5 5" />
    <path d="M13.5 5l-3 14" />
  </svg>
)

/* --------------------------- Buttons --------------------------- */
const buttonBase =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B211C] dark:focus-visible:ring-offset-surface'

const SOCIALS = [
  {
    name: 'LinkedIn',
    href: LINKS.linkedin,
    Icon: LinkedInIcon,
    className: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
  },
  {
    name: 'GitHub',
    href: LINKS.github,
    Icon: GitHubIcon,
    className:
      'bg-white text-[#24292F] hover:bg-gray-200 dark:bg-[#24292F] dark:text-white dark:hover:bg-black',
  },
  {
    name: 'LeetCode',
    href: LINKS.leetcode,
    Icon: LeetCodeIcon,
    className: 'bg-[#FFA116] text-[#1C1C1C] hover:bg-[#E8900F]',
  },
  {
    name: 'CodeChef',
    href: LINKS.codechef,
    Icon: CodeChefIcon,
    className: 'bg-[#8B6B57] text-white hover:bg-[#9C7A64] dark:bg-[#5B4638] dark:hover:bg-[#46352A]',
  },
]


const ease = [0.22, 1, 0.36, 1]

const Reveal = ({ children, delay = 0, className }) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}


const InfoRow = ({ label, value }) => (
  <div className="grid gap-1 border-b border-bg/15 py-4 last:border-b-0 dark:border-night/15 sm:grid-cols-[8rem_1fr] sm:gap-4">
    <dt className="text-sm font-semibold text-bg/60 dark:text-night/60">{label}</dt>
    <dd className="text-base font-medium leading-snug">
      {value || <span className="text-accent dark:text-[#B8431A]">Add in About.jsx</span>}
    </dd>
  </div>
)

/* ---------------------------- Section ---------------------------- */
const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-4 border-t-4 border-accent bg-[#2B211C] px-4 py-20 text-bg transition-colors duration-500 dark:bg-surface dark:text-night md:px-20 md:py-28"
    >
      <Reveal>
        <h2 className="font-heading text-5xl md:text-6xl">About me</h2>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-5 md:gap-16">
       
        <div className="md:col-span-3">
          <Reveal>
            <h3 className="font-heading text-3xl">Career objective</h3>
          </Reveal>
          <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-bg/85 dark:text-night/85">
            {OBJECTIVE.map((p, i) => (
              <Reveal key={p} delay={i * 0.12}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <h3 className="font-heading text-3xl">Find me online</h3>
          </Reveal>
          <div className="mt-5 flex flex-wrap gap-3">
            {SOCIALS.map(({ name, href, Icon, className }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonBase} ${className}`}
                >
                  <Icon />
                  {name}
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        
        <Reveal className="md:col-span-2" delay={0.15}>
          <div className="rounded-[28px] bg-[#3A2D26] p-6 shadow-[inset_0_0_0_1px_rgba(255,248,240,0.08)] dark:bg-bg dark:shadow-[inset_0_0_0_1px_rgba(22,20,18,0.08)] md:p-8">
            <h3 className="font-heading text-3xl">Quick info</h3>
            <dl className="mt-3">
              <InfoRow label="Name" value={INFO.name} />
              <InfoRow label="Date of birth" value={INFO.dob} />
              <InfoRow label="Location" value={INFO.location} />
              <InfoRow
                label="Education"
                value={`${INFO.course}, ${INFO.college}`}
              />
              <InfoRow label="Currently" value={INFO.currently} />
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About