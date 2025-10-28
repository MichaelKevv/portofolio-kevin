import { User } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                <User className="w-32 h-32 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Hello! I'm Kevin
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Full Stack Developer with a love for creating elegant solutions 
              to complex problems. With expertise in modern web technologies, I specialize in 
              building responsive and user-friendly applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in web development started with a curiosity about how things work on 
              the internet, and has evolved into a professional career where I get to combine 
              creativity with technical skills daily.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
