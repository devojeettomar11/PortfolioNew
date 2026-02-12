export default function SkillCard({ skill }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
      <div className="flex justify-between text-white font-semibold">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
}
