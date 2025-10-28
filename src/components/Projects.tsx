import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      gradient: "from-blue-600 to-purple-600",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team collaboration features, and progress tracking.",
      tags: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
      gradient: "from-green-600 to-teal-600",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization and automated reporting.",
      tags: ["React", "D3.js", "Express", "MongoDB"],
      gradient: "from-orange-600 to-pink-600",
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content creation tool using machine learning to generate marketing copy and blog posts.",
      tags: ["Python", "OpenAI", "React", "FastAPI"],
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      title: "Weather Forecast App",
      description: "Real-time weather application with beautiful UI, location-based forecasts, and weather alerts.",
      tags: ["React", "Weather API", "Chart.js"],
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      title: "Portfolio Builder",
      description: "No-code portfolio builder allowing users to create stunning portfolios with customizable templates.",
      tags: ["Next.js", "Supabase", "Tailwind", "Drag & Drop"],
      gradient: "from-rose-600 to-orange-600",
    },
  ];

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                <h3 className="text-2xl font-bold text-white z-10 px-4 text-center">
                  {project.title}
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
