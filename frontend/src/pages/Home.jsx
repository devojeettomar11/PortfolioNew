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

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

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
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        
        {/* Background Glow Effects */}
        <div className="absolute w-[450px] h-[450px] bg-purple-600/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-[450px] h-[450px] bg-pink-600/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white relative z-10">
          Hi, I'm <span className="text-purple-400">Devojeet</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-2xl mt-6 max-w-2xl relative z-10 leading-relaxed">
          Full Stack MERN Developer | MCA Student <br />
          I build modern, responsive, high-performance websites that impress HR & clients 🚀
        </p>

        <div className="flex gap-4 mt-10 flex-wrap justify-center relative z-10">
          <a
            href="#contact"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white font-semibold shadow-lg shadow-purple-600/30 transition"
          >
            Hire Me
          </a>

          <a
  href="/resumelatest.pdf"
  download="resumelatest.pdf"
  className="border border-purple-400 hover:bg-purple-500/20 px-8 py-3 rounded-xl text-purple-300 font-semibold transition"
>
  Download Resume
</a>
        </div>

        <p className="text-gray-400 mt-10 text-sm relative z-10">
          📍 Etawah, Uttar Pradesh | 📧 devojeettomar11@gmail.com
        </p>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center">
          About Me
        </h2>

        <p className="text-gray-300 mt-6 text-center max-w-3xl mx-auto text-lg leading-relaxed">
          I am Devojeet Tomar, a passionate Full Stack MERN Developer.  
          I love building attractive and scalable web applications with modern UI and powerful backend systems.
          My goal is to work in a professional company where I can grow and contribute with my skills.
        </p>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 text-gray-200 shadow-lg shadow-purple-500/10">
          <h3 className="text-2xl font-bold text-purple-300">
            Education & Training
          </h3>

          <ul className="mt-5 space-y-3 text-lg">
  <li>🎓 MCA (Online) — Currently Pursuing</li>
  <li>🎓 BCA — GLA University, Mathura (Completed: May 2025)</li>
  <li>💻 Internshala Full Stack Training — Aug 2025 to Feb 2026</li>
</ul>

        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 px-6 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center">Skills</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center">Projects</h2>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {["All", "Frontend", "Backend", "Fullstack"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === cat
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="py-20 px-6 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center">
          Certificates
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg shadow-purple-500/10"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <h3 className="text-white font-bold text-xl">{cert.title}</h3>

                <a
                  href={cert.link}
                  target="_blank"
                  className="text-purple-400 hover:text-purple-300 mt-3 inline-block font-semibold"
                >
                  View Certificate →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center">Contact Me</h2>

        <div className="grid md:grid-cols-2 gap-10 mt-14">
          
          {/* Left Info */}
          <div className="text-gray-300 space-y-5 text-lg">
            <p>
              <span className="text-purple-400 font-bold">Email:</span>{" "}
              devojeettomar11@gmail.com
            </p>

            <p>
              <span className="text-purple-400 font-bold">Phone:</span>{" "}
              9045408171
            </p>

            <p>
              <span className="text-purple-400 font-bold">Location:</span>{" "}
              Etawah, Uttar Pradesh, India
            </p>

            <div className="flex gap-6 mt-6 font-semibold">
              <a
                className="text-blue-400 hover:text-blue-300"
                href="https://www.linkedin.com/in/devojeet-tomar-1272-/"
                target="_blank"
              >
                LinkedIn
              </a>

              <a
                className="text-gray-200 hover:text-gray-100"
                href="https://github.com/devojeettomar11"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Right Form */}
          <form
            onSubmit={submitEnquiry}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg shadow-purple-500/10"
          >
            <h3 className="text-white text-2xl font-bold">Send Enquiry</h3>

            <input
              className="w-full mt-5 p-3 rounded-lg bg-black/40 text-white outline-none border border-white/10 focus:border-purple-400"
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

      {/* Back to Top */}
      <BackToTop />

      <Footer />
    </div>
  );
}
