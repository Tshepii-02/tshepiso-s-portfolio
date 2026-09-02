import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  Flower2,
  Mail,
  Github,
  Linkedin,
  Download,
  GraduationCap,
  Award,
  Briefcase,
  FolderOpen,
  Sparkles,
  MapPin,
  Menu,
  X,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import blossom from "@/assets/blossom-bouquet.png";
import {
  about,
  certifications,
  education,
  experience,
  profile,
  projects,
  references,
  skillGroups,
} from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tshepiso Langa | Customer Support & Education Professional" },
      {
        name: "description",
        content:
          "Personal portfolio of Tshepiso Langa: international customer support specialist, school administrator and B.Ed student at UNISA. Skills, projects, experience and contact details.",
      },
      { property: "og:title", content: "Tshepiso Langa | Customer Support & Education" },
      {
        property: "og:description",
        content:
          "Adaptable, detail-oriented professional in international customer support, educational administration and client relations.",
      },
    ],
  }),
  component: Home,
});

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div className="mb-10 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-brand" />
    </div>
  );
}

function Petals() {
  const petals = [
    { top: "8%", left: "6%", size: 26, delay: "0s", type: "heart" },
    { top: "18%", left: "88%", size: 32, delay: "1.2s", type: "flower" },
    { top: "62%", left: "4%", size: 22, delay: "2.1s", type: "flower" },
    { top: "78%", left: "92%", size: 24, delay: "0.6s", type: "heart" },
    { top: "40%", left: "80%", size: 18, delay: "3s", type: "heart" },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => {
        const Icon = p.type === "heart" ? Heart : Flower2;
        return (
          <Icon
            key={i}
            className="animate-float absolute text-primary/35"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        );
      })}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2 font-bold">
          <span className="bg-brand flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground">
            <Heart className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-brand text-lg">Tshepiso Langa</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-blush hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="ml-2 rounded-full">
            <a href="/Tshepiso-Langa-CV.pdf" download>
              <Download className="h-4 w-4" aria-hidden="true" /> CV
            </a>
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-blush p-2 text-primary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-card px-4 py-3 md:hidden">
          <ul className="grid gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-blush hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full rounded-full">
                <a href="/Tshepiso-Langa-CV.pdf" download>
                  <Download className="h-4 w-4" aria-hidden="true" /> Download CV
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="bg-hero relative overflow-hidden">
      <Petals />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-soft">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Welcome to my portfolio
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Hi, I&rsquo;m <span className="text-brand">Tshepiso Langa</span>
          </h1>
          <p className="mt-3 text-lg font-semibold text-sky-foreground">{profile.title}</p>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">{profile.tagline}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href="#contact">
                <Mail className="h-4 w-4" aria-hidden="true" /> Get in touch
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href="/Tshepiso-Langa-CV.pdf" download>
                <Download className="h-4 w-4" aria-hidden="true" /> Download CV
              </a>
            </Button>
          </div>

          <dl className="mt-9 grid max-w-md grid-cols-3 gap-3">
            {[
              { k: "3+ yrs", v: "Corporate experience" },
              { k: "US", v: "Campaign support" },
              { k: "B.Ed", v: "UNISA, 3rd year" },
            ].map((s) => (
              <div key={s.k} className="card-blossom px-3 py-4 text-center">
                <dt className="text-xl font-bold text-primary">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex justify-center">
          <div className="bg-sunny absolute inset-x-8 top-8 bottom-8 rounded-[3rem] opacity-40 blur-2xl" />
          <img
            src={blossom}
            alt="Illustration of pink cosmos flowers, white daisies and small pink hearts"
            width={1024}
            height={1024}
            className="relative w-full max-w-md drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading eyebrow="About me" title="A little about who I am" icon={Heart} />
      <div className="grid gap-6 md:grid-cols-5">
        <div className="card-blossom md:col-span-3 p-6 sm:p-8">
          {about.map((p, i) => (
            <p key={i} className={i === 0 ? "text-muted-foreground" : "mt-4 text-muted-foreground"}>
              {p}
            </p>
          ))}
        </div>
        <ul className="md:col-span-2 grid content-start gap-4">
          {[
            { icon: MapPin, label: "Based in", value: profile.location },
            { icon: GraduationCap, label: "Studying", value: "B.Ed — UNISA (3rd year)" },
            { icon: Award, label: "Certified in", value: "International Customer Support" },
            { icon: Sparkles, label: "Known for", value: "Empathy, patience, precision" },
          ].map((item) => (
            <li key={item.label} className="card-blossom card-blossom-hover flex gap-4 p-5">
              <span className="bg-blush flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="font-semibold">{item.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-blush/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Skills" title="Technical & soft skills" icon={Sparkles} />
        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.heading} className="card-blossom card-blossom-hover p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Flower2 className="h-5 w-5 text-primary" aria-hidden="true" />
                {group.heading}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 font-medium">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading eyebrow="Projects" title="Work I&rsquo;m proud of" icon={FolderOpen} />
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} className="card-blossom card-blossom-hover flex flex-col p-6">
            <div className="bg-sunny mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-sun-foreground">
              <FolderOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{p.org}</p>
            <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t}>
                  <Badge variant="outline" className="rounded-full border-primary/40 text-primary">
                    {t}
                  </Badge>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-secondary/40 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Experience" title="Where I&rsquo;ve worked" icon={Briefcase} />
        <ol className="relative space-y-6 border-l-2 border-primary/30 pl-6 sm:pl-8">
          {experience.map((job) => (
            <li key={job.role + job.company} className="relative">
              <span className="absolute -left-[2.15rem] top-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground sm:-left-[2.65rem]">
                <Heart className="h-3 w-3" aria-hidden="true" />
              </span>
              <div className="card-blossom card-blossom-hover p-6">
                <h3 className="text-lg font-bold">{job.role}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{job.company}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {job.timeline}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-muted-foreground">
                      <Flower2
                        className="mt-0.5 h-4 w-4 shrink-0 text-sun-foreground"
                        aria-hidden="true"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <SectionHeading
        eyebrow="Education & certifications"
        title="Learning never stops"
        icon={GraduationCap}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((e) => (
          <div key={e.institution} className="card-blossom card-blossom-hover p-6">
            <div className="bg-blush mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-primary">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold">{e.qualification}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{e.institution}</p>
            <Badge variant="secondary" className="mt-3 rounded-full">
              {e.status}
            </Badge>
            <p className="mt-3 text-sm text-muted-foreground">{e.detail}</p>
          </div>
        ))}
        {certifications.map((c) => (
          <div key={c.name} className="card-blossom card-blossom-hover p-6 md:col-span-2">
            <div className="bg-sunny mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-sun-foreground">
              <Award className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold">{c.name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">Issued by {c.issuer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-hero relative overflow-hidden py-16 md:py-20">
      <Petals />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contact" title="Let&rsquo;s connect" icon={Mail} />

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
            { icon: Linkedin, label: "LinkedIn", value: "Tshepiso Langa", href: profile.linkedin },
            { icon: Github, label: "GitHub", value: "View profile", href: profile.github },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="card-blossom card-blossom-hover flex items-center gap-4 p-6"
            >
              <span className="bg-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary-foreground">
                <c.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </span>
                <span className="block truncate font-semibold">{c.value}</span>
              </span>
            </a>
          ))}
        </div>

        <h3 className="mt-14 text-center text-2xl font-bold">References</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((r) => (
            <div key={r.name} className="card-blossom p-5">
              <p className="font-bold">{r.name}</p>
              <p className="text-sm text-primary">{r.role}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{r.org}</p>
              <div className="mt-3 space-y-1 text-sm">
                <a
                  href={`tel:${r.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {r.phone}
                </a>
                {r.email && (
                  <a
                    href={`mailto:${r.email}`}
                    className="flex items-center gap-2 break-all text-muted-foreground hover:text-primary"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {r.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full">
            <a href="/Tshepiso-Langa-CV.pdf" download>
              <Download className="h-4 w-4" aria-hidden="true" /> Download my CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center sm:px-6">
        <span className="flex items-center gap-2 font-semibold">
          <Heart className="h-4 w-4 text-primary" aria-hidden="true" /> {profile.name}
        </span>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with care, patience and a lot of
          flowers.
        </p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
