import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>David Knight - Android Developer Portfolio</title>
        <meta name="description" content="Personal portfolio of David Knight, passionate Android Developer specializing in Kotlin, MVVM, and Jetpack Compose" />
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
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>
                Hi there, I'm <span style={styles.highlightText}>David Knight</span>! 👋
              </h1>
              <p style={styles.heroSubtitle}>
                Android Developer | Kotlin Expert | Performance Enthusiast
              </p>
              <p style={styles.heroDescription}>
                I'm a passionate Android Developer with expertise in crafting high-performance, 
                scalable, and intuitive mobile applications. I specialize in modern development 
                paradigms like MVVM, Jetpack Compose, and Kotlin, with a keen focus on 
                performance optimization.
              </p>
              <div style={styles.ctaButtons}>
                <Link href="/projects" style={styles.ctaButtonPrimary}>
                  View My Projects
                </Link>
                <a 
                  href="https://www.linkedin.com/in/d7knight" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.ctaButtonSecondary}
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </section>

          <section style={styles.aboutSection}>
            <h2 style={styles.sectionTitle}>About Me</h2>
            <div style={styles.aboutGrid}>
              <div style={styles.aboutCard}>
                <div style={styles.emoji}>🔭</div>
                <h3 style={styles.cardTitle}>What I'm Building</h3>
                <p style={styles.cardText}>
                  Currently building cutting-edge Android apps that deliver exceptional 
                  user experiences and pushing the boundaries of mobile development.
                </p>
              </div>
              <div style={styles.aboutCard}>
                <div style={styles.emoji}>🌱</div>
                <h3 style={styles.cardTitle}>Learning & Growing</h3>
                <p style={styles.cardText}>
                  Exploring advanced Jetpack Compose techniques and staying updated with 
                  the latest Android trends and best practices.
                </p>
              </div>
              <div style={styles.aboutCard}>
                <div style={styles.emoji}>⚡</div>
                <h3 style={styles.cardTitle}>My Passion</h3>
                <p style={styles.cardText}>
                  I love solving complex problems and fine-tuning apps to run at lightning 
                  speed! Performance optimization is my specialty.
                </p>
              </div>
            </div>
          </section>

          <section style={styles.skillsSection}>
            <h2 style={styles.sectionTitle}>Technologies & Tools</h2>
            <div style={styles.skillsGrid}>
              <div style={styles.skillCategory}>
                <h3 style={styles.skillCategoryTitle}>Languages</h3>
                <div style={styles.skillTags}>
                  <span style={styles.skillTag}>Kotlin</span>
                  <span style={styles.skillTag}>Java</span>
                </div>
              </div>
              <div style={styles.skillCategory}>
                <h3 style={styles.skillCategoryTitle}>Frameworks & Libraries</h3>
                <div style={styles.skillTags}>
                  <span style={styles.skillTag}>Jetpack Compose</span>
                  <span style={styles.skillTag}>Jetpack Navigation</span>
                  <span style={styles.skillTag}>Coroutines</span>
                  <span style={styles.skillTag}>LiveData</span>
                  <span style={styles.skillTag}>Flow</span>
                </div>
              </div>
              <div style={styles.skillCategory}>
                <h3 style={styles.skillCategoryTitle}>Architecture</h3>
                <div style={styles.skillTags}>
                  <span style={styles.skillTag}>MVVM</span>
                  <span style={styles.skillTag}>Clean Architecture</span>
                </div>
              </div>
              <div style={styles.skillCategory}>
                <h3 style={styles.skillCategoryTitle}>Dev Tools</h3>
                <div style={styles.skillTags}>
                  <span style={styles.skillTag}>Android Studio</span>
                  <span style={styles.skillTag}>Gradle</span>
                  <span style={styles.skillTag}>Git</span>
                  <span style={styles.skillTag}>Firebase</span>
                </div>
              </div>
              <div style={styles.skillCategory}>
                <h3 style={styles.skillCategoryTitle}>Performance Optimization</h3>
                <div style={styles.skillTags}>
                  <span style={styles.skillTag}>Android Profiler</span>
                  <span style={styles.skillTag}>LeakCanary</span>
                </div>
              </div>
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
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0 0 1rem 0',
    color: '#f1f5f9',
  },
  highlightText: {
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    color: '#94a3b8',
    margin: '0 0 2rem 0',
  },
  heroDescription: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    lineHeight: '1.8',
    margin: '0 0 2rem 0',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaButtonPrimary: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  ctaButtonSecondary: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: '#3b82f6',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: '2px solid #3b82f6',
    transition: 'all 0.3s',
  },
  aboutSection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#f1f5f9',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  aboutCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
  },
  emoji: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#f1f5f9',
  },
  cardText: {
    color: '#cbd5e1',
    lineHeight: '1.6',
    margin: 0,
  },
  skillsSection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#1e293b',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  skillCategory: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '1.5rem',
  },
  skillCategoryTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#3b82f6',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  skillTag: {
    backgroundColor: '#334155',
    color: '#e2e8f0',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
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
