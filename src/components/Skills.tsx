import { Card } from "@/components/ui/card";
import { Code2, Database, Palette, Server, Smartphone, Zap } from "lucide-react";

const Skills = () => {
  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "React, TypeScript, Next.js, Tailwind CSS",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Node.js, Express, REST APIs, GraphQL",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Database,
      title: "Database Management",
      description: "PostgreSQL, MongoDB, Supabase, Redis",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first, Cross-browser compatibility",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Code splitting, Lazy loading, Caching",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Figma, Adobe XD, User Research",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Skills & Expertise
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{skill.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
