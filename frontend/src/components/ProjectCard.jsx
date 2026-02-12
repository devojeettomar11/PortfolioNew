export default function ProjectCard({ project }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300">
      <h3 className="text-xl font-bold text-white">{project.title}</h3>
      <p className="text-gray-300 mt-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech.map((t, index) => (
          <span
            key={index}
            className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-5">
        <a
          href={project.github}
          target="_blank"
          className="text-purple-400 hover:text-purple-300"
        >
          GitHub
        </a>
        <a
          href={project.live}
          target="_blank"
          className="text-blue-400 hover:text-blue-300"
        >
          Live Demo
        </a>
      </div>
    </div>
  );
}
