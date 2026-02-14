import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SkillCard from "../components/SkillCard";
import BackToTop from "../components/BackToTop";

import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { certificates } from "../data/certificates";

import { useState } from "react";
import API from "../api";

import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await API.post("/api/enquiries", form);
      setMessage("✅ Enquiry submitted successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setMessage("❌ Failed to submit enquiry. Try again!");
    }
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-950 to-black dark:from-black dark:via-gray-950 dark:to-black text-white min-h-screen relative overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">

        {/* Glow */}
        <div className="absolute top-[-180px] left-[-180px] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl"></div>

        <p className="text-purple-400 font-semibold tracking-widest uppercase text-sm relative z-10">
          Full Stack MERN Developer
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-5 relative z-10 leading-tight">
          Hi, I'm <span className="text-purple-400">Devojeet</span> Tomar
        </h1>

        <p className="text-gray-300 text-lg md:text-2xl mt-6 max-w-3xl relative z-10 leading-relaxed">
          I build modern, responsive and high-performance web applications using
          <span className="text-purple-300 font-semibold">
            {" "}React, Node.js, Express and MongoDB
          </span>.
        </p>

        <div className="flex gap-4 mt-10 flex-wrap justify-center relative z-10">
          <a
            href="#contact"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white font-semibold shadow-lg shadow-purple-600/30 transition"
          >
            Hire Me
          </a>

          <a
            href="/DEVOJEET_TOMAR_LATEST.pdf"
            download="DEVOJEET_TOMAR_LATEST.pdf"
            className="border border-purple-400 hover:bg-purple-500/20 px-8 py-3 rounded-xl text-purple-300 font-semibold transition"
          >
            Download Resume
          </a>
        </div>

        {/* Info Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-gray-300 text-sm relative z-10">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <MapPin size={16} className="text-purple-400" />
            Etawah, Uttar Pradesh
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Mail size={16} className="text-purple-400" />
            devojeettomar11@gmail.com
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Phone size={16} className="text-purple-400" />
            9045408171
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          About Me
        </h2>

        <p className="text-gray-300 mt-8 text-center max-w-3xl mx-auto text-lg leading-relaxed">
          I am Devojeet Tomar, a passionate Full Stack MERN Developer and MCA student.
          I enjoy building clean UI, scalable backend APIs and database-driven web applications.
          I am looking for a professional opportunity where I can learn, grow and contribute.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition shadow-lg shadow-purple-500/10">
            <h3 className="text-xl font-bold text-purple-400">Education</h3>
            <p className="text-gray-300 mt-3">Graduation Completed (May 2025)</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition shadow-lg shadow-purple-500/10">
            <h3 className="text-xl font-bold text-purple-400">Currently</h3>
            <p className="text-gray-300 mt-3">Pursuing MCA (Online)</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition shadow-lg shadow-purple-500/10">
            <h3 className="text-xl font-bold text-purple-400">Training</h3>
            <p className="text-gray-300 mt-3">
              Internshala Full Stack Training
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          Skills
        </h2>

        <p className="text-gray-400 text-center mt-6 max-w-2xl mx-auto text-lg">
          Technologies and tools I use to build modern full stack applications.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </section>

      {/* PROJECTS (All projects shown) */}
      <section id="projects" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          Projects
        </h2>

        <p className="text-gray-400 text-center mt-6 max-w-2xl mx-auto text-lg">
          Some of my best projects showcasing my MERN development skills.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      {/* CERTIFICATES */}
    {/* CERTIFICATES */}
<section id="certificates" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
    Certificates
  </h2>

  <p className="text-gray-400 text-center mt-6 max-w-2xl mx-auto text-lg">
    My professional certifications from Internshala training programs.
  </p>

  <div className="grid md:grid-cols-2 gap-8 mt-14">
    {certificates.map((cert, index) => (
      <div
        key={index}
        className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg shadow-purple-500/10 hover:scale-105 transition duration-300"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold px-4 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30">
            {cert.tag}
          </span>

          <span className="text-sm text-gray-400 font-medium">
            {cert.issuer}
          </span>
        </div>

        <h3 className="text-white font-bold text-xl mt-6 leading-snug">
          {cert.title}
        </h3>

        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-6 text-purple-400 hover:text-purple-300 font-semibold"
        >
          View Certificate →
        </a>
      </div>
    ))}
  </div>
</section>


      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          Contact Me
        </h2>

        <p className="text-gray-400 text-center mt-6 max-w-2xl mx-auto text-lg">
          Feel free to contact me for internships, jobs, collaborations or project work.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-14">

          {/* Contact Cards */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 shadow-lg shadow-purple-500/10">
              <Mail className="text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-semibold text-lg">
                  devojeettomar11@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 shadow-lg shadow-purple-500/10">
              <Phone className="text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-semibold text-lg">9045408171</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 shadow-lg shadow-purple-500/10">
              <MapPin className="text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white font-semibold text-lg">
                  Etawah, Uttar Pradesh, India
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.linkedin.com/in/devojeet-tomar-1272-/"
                target="_blank"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold transition"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>

              <a
                href="https://github.com/devojeettomar11"
                target="_blank"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-xl font-semibold transition"
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={submitEnquiry}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg shadow-purple-500/10"
          >
            <h3 className="text-white text-2xl font-bold">
              Send Enquiry
            </h3>

            <input
              className="w-full mt-6 p-3 rounded-lg bg-black/40 text-white outline-none border border-white/10 focus:border-purple-400"
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white outline-none border border-white/10 focus:border-purple-400"
              placeholder="Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white outline-none border border-white/10 focus:border-purple-400"
              placeholder="Your Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <textarea
              className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white outline-none border border-white/10 focus:border-purple-400"
              placeholder="Your Message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-600/30 transition"
            >
              Submit Enquiry
            </button>

            {message && (
              <p className="text-sm mt-4 text-green-400 font-semibold">
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
}
