import Head from 'next/head';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  liveUrl?: string;
  highlights: string[];
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'AlgoStrategySandbox',
      description: 'A QuantConnect integration site for building and managing stock portfolios with algorithmic trading strategies.',
      technologies: ['TypeScript', 'Next.js', 'React', 'QuantConnect API'],
      github: 'https://github.com/d7knight2/AlgoStrategySandbox',
      liveUrl: 'https://algo-strategy-sandbox.vercel.app',
      highlights: [
        'Portfolio management with real-time tracking',
        'Paper trading and live trading integration',
        'Stock search and analysis functionality',
        'Modern dark theme UI with responsive design'
      ]
    },
    {
      title: 'PrepWise-AI',
      description: 'An AI-powered interview preparation platform helping users practice and improve their interview skills.',
      technologies: ['JavaScript', 'Next.js', 'React', 'AI Integration'],
      github: 'https://github.com/d7knight2/PrepWise-AI',
      liveUrl: 'https://prep-wise-ai-wheat.vercel.app',
      highlights: [
        'AI-driven interview question generation',
        'Interactive practice sessions',
        'Performance tracking and feedback',
        'User-friendly interface for seamless experience'
      ]
    },
    {
      title: 'AnrWatchdog',
      description: 'Android library for detecting and reporting Application Not Responding (ANR) errors in production apps.',
      technologies: ['Kotlin', 'Android', 'Performance Monitoring'],
      github: 'https://github.com/d7knight2/AnrWatchdog',
      highlights: [
        'Real-time ANR detection',
        'Performance optimization tools',
        'Easy integration with Android apps',
        'Comprehensive error reporting'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Projects - David Knight Portfolio</title>
        <meta name="description" content="Portfolio of projects by David Knight, showcasing Android development, web applications, and algorithmic trading platforms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.container}>
        <nav style={styles.nav}>
          <div style={styles.navContent}>
            <Link href="/" style={styles.navBrand}>
              David Knight
            </Link>
            <div style={styles.navLinks}>
              <Link href="/" style={styles.navLink}>
                Home
              </Link>
              <Link href="/projects" style={styles.navLink}>
                Projects
              </Link>
              <a 
                href="https://www.linkedin.com/in/d7knight" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.navLink}
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/d7knight2" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.navLink}
              >
                GitHub
              </a>
            </div>
          </div>
        </nav>

        <main style={styles.main}>
          <section style={styles.hero}>
            <h1 style={styles.heroTitle}>My Projects</h1>
            <p style={styles.heroDescription}>
              A showcase of my work spanning Android development, web applications, 
              and algorithmic trading platforms. Each project demonstrates my commitment 
              to clean code, performance optimization, and user experience.
            </p>
          </section>

          <section style={styles.projectsSection}>
            <div style={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div key={index} style={styles.projectCard}>
                  <div style={styles.projectHeader}>
                    <h2 style={styles.projectTitle}>{project.title}</h2>
                    <div style={styles.projectLinks}>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.projectLink}
                        title="View on GitHub"
                      >
                        GitHub →
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={styles.projectLinkLive}
                          title="View Live Demo"
                        >
                          Live Demo →
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p style={styles.projectDescription}>{project.description}</p>
                  
                  <div style={styles.technologiesSection}>
                    <h3 style={styles.technologiesTitle}>Technologies:</h3>
                    <div style={styles.techTags}>
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} style={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={styles.highlightsSection}>
                    <h3 style={styles.highlightsTitle}>Key Features:</h3>
                    <ul style={styles.highlightsList}>
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} style={styles.highlightItem}>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>Interested in Working Together?</h2>
            <p style={styles.ctaText}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div style={styles.ctaButtons}>
              <a 
                href="https://www.linkedin.com/in/d7knight" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.ctaButton}
              >
                Connect on LinkedIn
              </a>
              <a 
                href="https://github.com/d7knight2" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.ctaButtonSecondary}
              >
                View More on GitHub
              </a>
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <p>© 2026 David Knight. Built with Next.js and TypeScript.</p>
          <p style={styles.footerLinks}>
            <a href="https://github.com/d7knight2" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
              GitHub
            </a>
            {' • '}
            <a href="https://www.linkedin.com/in/d7knight" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
              LinkedIn
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
  },
  nav: {
    borderBottom: '1px solid #334155',
    position: 'sticky',
    top: 0,
    backgroundColor: '#0f172a',
    zIndex: 1000,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBrand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#cbd5e1',
    transition: 'color 0.3s',
    fontSize: '1rem',
  },
  main: {
    flex: 1,
    width: '100%',
  },
  hero: {
    padding: '4rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0 0 1rem 0',
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroDescription: {
    fontSize: '1.2rem',
    color: '#cbd5e1',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.8',
  },
  projectsSection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  projectsGrid: {
    display: 'grid',
    gap: '2rem',
  },
  projectCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '2rem',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  projectTitle: {
    fontSize: '1.8rem',
    margin: 0,
    color: '#f1f5f9',
  },
  projectLinks: {
    display: 'flex',
    gap: '1rem',
  },
  projectLink: {
    color: '#60a5fa',
    fontSize: '0.95rem',
    transition: 'color 0.3s',
  },
  projectLinkLive: {
    color: '#34d399',
    fontSize: '0.95rem',
    transition: 'color 0.3s',
  },
  projectDescription: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  },
  technologiesSection: {
    marginBottom: '1.5rem',
  },
  technologiesTitle: {
    fontSize: '1rem',
    color: '#94a3b8',
    marginBottom: '0.5rem',
  },
  techTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  techTag: {
    backgroundColor: '#334155',
    color: '#e2e8f0',
    padding: '0.4rem 0.8rem',
    borderRadius: '16px',
    fontSize: '0.85rem',
  },
  highlightsSection: {
    marginTop: '1.5rem',
  },
  highlightsTitle: {
    fontSize: '1rem',
    color: '#94a3b8',
    marginBottom: '0.75rem',
  },
  highlightsList: {
    margin: 0,
    paddingLeft: '1.5rem',
    color: '#cbd5e1',
  },
  highlightItem: {
    marginBottom: '0.5rem',
    lineHeight: '1.6',
  },
  ctaSection: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#1e293b',
  },
  ctaTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#f1f5f9',
  },
  ctaText: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: '1.7',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  ctaButtonSecondary: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: '#3b82f6',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: '2px solid #3b82f6',
    transition: 'all 0.3s',
  },
  footer: {
    padding: '2rem',
    borderTop: '1px solid #334155',
    textAlign: 'center',
    color: '#94a3b8',
  },
  footerLinks: {
    marginTop: '0.5rem',
  },
  footerLink: {
    color: '#60a5fa',
  },
};
