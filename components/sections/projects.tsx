import { projects } from "@/data/portfolio";
import { SectionHeader } from "../section-header";
import { ProjectCard } from "./project-card";
<<<<<<< HEAD
=======
import { Heatmap } from "./heatmap";
>>>>>>> 80d4a03401acb6b6886b77480e59e357ca07875a

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Projects" title="Selected work" description="Six shipped systems spanning security, vision, and analytics." />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

<<<<<<< HEAD
=======
        <Heatmap />
>>>>>>> 80d4a03401acb6b6886b77480e59e357ca07875a
      </div>
    </section>
  );
}
