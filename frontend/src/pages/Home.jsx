import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SkillCard from "../components/SkillCard";
import BackToTop from "../components/BackToTop";

import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { certificates } from "../data/certificates";

import { useState, useEffect, useRef } from "react";
import API from "../api";

import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code2, Server, Database, Briefcase, GraduationCap, Award, ArrowRight, Download, Sparkles } from "lucide-react";

/* ─────────────── Scroll-reveal hook ─────────────── */
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

/* ─────────────── Animated counter ─────────────── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 35);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────── Animated skill bar ─────────────── */
function AnimatedSkillBar({ skill }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5
                 hover:border-violet-500/30 hover:bg-white/[0.05]
                 transition-all duration-300 group"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-violet-400">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500
                     transition-all duration-1000 ease-out"
          style={{ width: visible ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ─────────────── Section heading ─────────────── */
function SectionHeading({ tag, title, subtitle }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className="text-center mb-16"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                      border border-violet-500/30 bg-violet-500/10
                      text-violet-300 text-xs font-mono tracking-widest uppercase mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        {tag}
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

/* ─────────────── Fade-in wrapper ─────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function Home() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  /* Subtle parallax glow follows cursor in hero */
  useEffect(() => {
    const handleMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitEnquiry = async (e) => {
    e.preventDefault();
    setMessage("");
    setSending(true);
    try {
      await API.post("/api/enquiries", form);
      setMessage("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setMessage("error");
    } finally {
      setSending(false);
    }
  };

  /* ── Stats ── */
  const stats = [
    { value: 11, suffix: "+", label: "Clinical Workflows" },
    { value: 15, suffix: "+", label: "API Endpoints" },
    { value: 6, suffix: "", label: "Full-Stack Projects" },
    { value: 95, suffix: "%", label: "Responsive Coverage" },
  ];

  /* ── Tech stack chips ── */
  const techStack = ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Redux", "JWT", "REST APIs", "Git", "Postman"];

  /* ── Experience timeline ── */
  const timeline = [
    {
      period: "Mar 2026 – Present",
      role: "Full Stack Developer",
      company: "MediGhar (Remote)",
      icon: <Briefcase size={14} />,
      color: "from-violet-500 to-fuchsia-500",
      bullets: [
        "Built Doctor Portal (6 pages) + Clinic Admin Portal (5 pages) managing 10+ clinical workflows",
        "Integrated Node.js/Express.js backend via Axios, JWT auth & custom httpClient interceptor — cut bottlenecks 50%",
        "Responsive collapsible sidebars, mobile drawer nav, and mock-data fallback for parallel dev",
      ],
    },
  ];

  return (
    <div className="bg-[#060609] text-white min-h-screen overflow-x-hidden">
      {/* Global ambient blobs — fixed */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px]
                        bg-violet-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px]
                        bg-fuchsia-700/8 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px]
                        bg-indigo-600/6 rounded-full blur-[100px] -translate-x-1/2" />
        {/* fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <Navbar />

      {/* ═══════════════════════════
          HERO
      ═══════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center
                   text-center px-6 pt-28 pb-16 overflow-hidden"
      >
        {/* cursor-tracked glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none
                     transition-all duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Available badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        border border-emerald-500/40 bg-emerald-500/10 mb-6
                        text-emerald-300 text-xs font-mono tracking-widest uppercase
                        animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for Internship & Entry-level Roles
        </div>

        {/* Name */}
        <div className="relative z-10">
          <p className="text-violet-400 font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            Full Stack MERN Developer
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-[90px] font-extrabold leading-[0.92] tracking-tight mb-6">
            <span className="block text-white">Hi, I'm</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #e879f9 50%, #f472b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Devojeet
            </span>
            <span className="block text-white/20" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
              Tomar
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            I build scalable, production-ready web apps using{" "}
            <span className="text-violet-300 font-medium">React, Node.js, Express</span> &{" "}
            <span className="text-fuchsia-300 font-medium">MongoDB</span> — with clean architecture and pixel-perfect UI.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <a
              href="#contact"
              className="group flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm
                         text-white transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
            >
              Hire Me
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/DEVOJEET_TOMAR_04.pdf"
              download="Devojeet_Tomar_Resume.pdf"
              className="group flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm
             border border-white/10 bg-white/[0.04] text-gray-200
             hover:border-violet-500/40 hover:bg-white/[0.08]
             transition-all duration-300 backdrop-blur-sm"
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>

          {/* Contact pills */}
          <div className="flex flex-wrap justify-center gap-3 text-gray-400 text-sm">
            {[
              { icon: <MapPin size={13} />, text: "Etawah, Uttar Pradesh" },
              { icon: <Mail size={13} />, text: "devojeettomar11@gmail.com" },
              { icon: <Phone size={13} />, text: "+91 9045408171" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07]
                           px-4 py-2 rounded-full hover:border-violet-500/30 transition-colors duration-300"
              >
                <span className="text-violet-400">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          {/* Tech stack scroll */}
          <div className="mt-12 overflow-hidden">
            <p className="text-gray-600 text-xs tracking-widest uppercase mb-4">Tech Stack</p>
            <div className="flex gap-2 flex-wrap justify-center max-w-2xl mx-auto">
              {techStack.map((t, i) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-md border border-white/[0.07]
                             bg-white/[0.03] text-gray-400 font-mono
                             hover:border-violet-500/30 hover:text-violet-300
                             transition-all duration-300"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-violet-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════
          STATS BAND
      ═══════════════════════════ */}
      <section className="relative z-10 py-12 border-y border-white/[0.05]
                          bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 100} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-white">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-gray-500 text-xs mt-1 tracking-wide">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          ABOUT
      ═══════════════════════════ */}
      <section id="about" className="relative z-10 py-28 px-6 max-w-6xl mx-auto">
        <SectionHeading
          tag="About Me"
          title="Who I Am"
          subtitle="A passionate MERN developer building scalable, production-grade apps with clean architecture and intuitive UI."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — bio */}
          <FadeIn delay={0}>
            <p className="text-gray-300 text-base leading-8">
              I'm <span className="text-white font-semibold">Devojeet Tomar</span>, a Full Stack MERN Developer and MCA student
              at GLA University. I enjoy crafting clean UI, scalable backend APIs, and database-driven web applications.{" "}
              <br /><br />
              My recent work at <span className="text-violet-300 font-medium">MediGhar</span> involved building real-world
              healthcare dashboards — Doctor & Clinic Admin portals — from scratch with full REST API integration, JWT auth,
              and mobile-responsive design.
              <br /><br />
              I'm actively seeking <span className="text-fuchsia-300 font-medium">internship or entry-level Frontend / MERN</span> roles
              where I can learn, contribute, and grow.
            </p>
            <div className="flex gap-3 mt-8">
              <a
                href="https://www.linkedin.com/in/devojeet-tomar-1272-/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                           bg-blue-600/20 border border-blue-500/30 text-blue-300
                           hover:bg-blue-600/30 transition-all duration-300"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="https://github.com/devojeettomar11"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                           bg-white/[0.05] border border-white/10 text-gray-300
                           hover:bg-white/[0.1] transition-all duration-300"
              >
                <Github size={15} /> GitHub
              </a>
            </div>
          </FadeIn>

          {/* Right — cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: <GraduationCap size={18} />,
                color: "text-violet-400",
                bg: "bg-violet-500/10 border-violet-500/20",
                title: "Education",
                lines: ["BCA — GLA University (May 2025)", "MCA — GLA University (Aug 2025 – Ongoing, Online)"],
              },
              {
                icon: <Briefcase size={18} />,
                color: "text-fuchsia-400",
                bg: "bg-fuchsia-500/10 border-fuchsia-500/20",
                title: "Experience",
                lines: ["Full Stack Developer @ MediGhar (Mar 2026 – Present)"],
              },
              {
                icon: <Award size={18} />,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20",
                title: "Training",
                lines: ["Full Stack Web Dev (6 Months) — Internshala", "Aug 2025 – Feb 2026"],
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 120}>
                <div className={`flex gap-4 p-5 rounded-2xl border ${card.bg}
                                 hover:scale-[1.02] transition-transform duration-300`}>
                  <div className={`mt-0.5 ${card.color} shrink-0`}>{card.icon}</div>
                  <div>
                    <p className={`font-bold text-sm ${card.color} mb-1`}>{card.title}</p>
                    {card.lines.map((l, j) => (
                      <p key={j} className="text-gray-300 text-sm leading-relaxed">{l}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          EXPERIENCE
      ═══════════════════════════ */}
      <section id="experience" className="relative z-10 py-28 px-6 max-w-5xl mx-auto">
        <SectionHeading
          tag="Experience"
          title="Work History"
          subtitle="Real-world development experience building production systems."
        />

        <div className="relative">
          {/* timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-fuchsia-500/30 to-transparent hidden md:block" />

          {timeline.map((item, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="relative md:pl-16 mb-10">
                {/* dot */}
                <div className={`absolute left-3 top-5 w-4 h-4 rounded-full hidden md:flex items-center justify-center
                                 bg-gradient-to-br ${item.color} shadow-[0_0_16px_rgba(124,58,237,0.6)]`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6
                                hover:border-violet-500/25 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{item.role}</h3>
                      <p className="text-violet-300 text-sm font-medium">{item.company}</p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full
                                     border border-white/[0.08] bg-white/[0.04] text-gray-400">
                      {item.period}
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {/* tech tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {["React.js", "Tailwind CSS", "Node.js", "Express.js", "JWT", "Axios", "TypeScript"].map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md
                                               border border-violet-500/20 bg-violet-500/10
                                               text-violet-300 font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          SKILLS
      ═══════════════════════════ */}
      <section id="skills" className="relative z-10 py-28 px-6 max-w-6xl mx-auto">
        <SectionHeading
          tag="Skills"
          title="What I Build With"
          subtitle="Technologies and tools I use to craft modern, full-stack applications."
        />

        {/* Category breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: <Code2 size={18} />, label: "Frontend", color: "text-violet-400", bg: "border-violet-500/20 bg-violet-500/[0.05]", techs: ["React.js", "Tailwind CSS", "Redux Toolkit", "React Router", "HTML5 / CSS3"] },
            { icon: <Server size={18} />, label: "Backend", color: "text-fuchsia-400", bg: "border-fuchsia-500/20 bg-fuchsia-500/[0.05]", techs: ["Node.js", "Express.js", "REST API Design", "JWT / bcrypt", "MVC Architecture"] },
            { icon: <Database size={18} />, label: "Database & Tools", color: "text-emerald-400", bg: "border-emerald-500/20 bg-emerald-500/[0.05]", techs: ["MongoDB", "Mongoose ODM", "Axios", "Git & GitHub", "Postman / VS Code"] },
          ].map((cat, i) => (
            <FadeIn key={cat.label} delay={i * 100}>
              <div className={`border rounded-2xl p-5 ${cat.bg} hover:scale-[1.02] transition-transform duration-300`}>
                <div className={`flex items-center gap-2 mb-4 ${cat.color} font-bold text-sm`}>
                  {cat.icon} {cat.label}
                </div>
                <ul className="space-y-2">
                  {cat.techs.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className={`w-1 h-1 rounded-full ${cat.color.replace("text-", "bg-")}`} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Animated progress bars */}
        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <FadeIn key={i} delay={i * 60}>
              <AnimatedSkillBar skill={skill} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          PROJECTS
      ═══════════════════════════ */}
      <section id="projects" className="relative z-10 py-28 px-6 max-w-6xl mx-auto">
        <SectionHeading
          tag="Projects"
          title="What I've Built"
          subtitle="A selection of full-stack projects that showcase my MERN development skills."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={i} delay={i * 100}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          CERTIFICATES
      ═══════════════════════════ */}
      <section id="certificates" className="relative z-10 py-28 px-6 max-w-6xl mx-auto">
        <SectionHeading
          tag="Certificates"
          title="Credentials"
          subtitle="Professional certifications earned through rigorous Internshala training programs."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6
                              hover:border-violet-500/30 hover:bg-white/[0.05]
                              transition-all duration-300 hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full
                                   bg-violet-600/20 text-violet-300 border border-violet-500/30">
                    {cert.tag}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{cert.issuer}</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-snug mb-5 group-hover:text-violet-200 transition-colors">
                  {cert.title}
                </h3>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-violet-400
                             hover:text-violet-300 font-semibold transition-colors"
                >
                  View Certificate <ExternalLink size={13} />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          CONTACT
      ═══════════════════════════ */}
      <section id="contact" className="relative z-10 py-28 px-6 max-w-6xl mx-auto">
        <SectionHeading
          tag="Contact"
          title="Let's Work Together"
          subtitle="Open to internships, jobs, collaborations and freelance project work."
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <FadeIn delay={0}>
            <div className="space-y-4">
              {[
                { icon: <Mail size={18} />, label: "Email", value: "devojeettomar11@gmail.com", color: "text-violet-400" },
                { icon: <Phone size={18} />, label: "Phone", value: "+91 9045408171", color: "text-fuchsia-400" },
                { icon: <MapPin size={18} />, label: "Location", value: "Etawah, Uttar Pradesh, India", color: "text-emerald-400" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07]
                             rounded-2xl p-5 hover:border-violet-500/25 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                   bg-white/[0.05] ${item.color} shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/devojeet-tomar-1272-/"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold
                             bg-blue-600/20 border border-blue-500/30 text-blue-300
                             hover:bg-blue-600/30 transition-all duration-300"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a
                  href="https://github.com/devojeettomar11"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold
                             bg-white/[0.05] border border-white/10 text-gray-300
                             hover:bg-white/[0.1] transition-all duration-300"
                >
                  <Github size={15} /> GitHub
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={150}>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-violet-400" />
                Send Enquiry
              </h3>

              <form onSubmit={submitEnquiry} className="space-y-4">
                {[
                  { name: "name", placeholder: "Your Name", type: "text" },
                  { name: "email", placeholder: "Your Email", type: "email" },
                  { name: "phone", placeholder: "Your Phone", type: "tel" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 text-white text-sm
                               border border-white/[0.08] outline-none placeholder-gray-600
                               focus:border-violet-500/60 focus:bg-black/50
                               transition-all duration-300"
                  />
                ))}

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/30 text-white text-sm
                             border border-white/[0.08] outline-none placeholder-gray-600
                             focus:border-violet-500/60 focus:bg-black/50
                             transition-all duration-300 resize-none"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white
                             transition-all duration-300 hover:scale-[1.02]
                             disabled:opacity-60 disabled:cursor-not-allowed
                             hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                >
                  {sending ? "Sending..." : "Submit Enquiry →"}
                </button>

                {message === "success" && (
                  <p className="text-sm text-emerald-400 font-semibold text-center">
                    ✓ Enquiry submitted successfully!
                  </p>
                )}
                {message === "error" && (
                  <p className="text-sm text-red-400 font-semibold text-center">
                    ✗ Failed to submit. Please try again.
                  </p>
                )}
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}