import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentAchievement, setCurrentAchievement] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const achievements = [
    { emoji: '🏆', title: '2021 Tinder All Stars', subtitle: 'First Android All Star Ever!', color: '#fbbf24' },
    { emoji: '🌺', title: '2021 Kudos Award', subtitle: 'Trip to Maui, Hawaii', color: '#f472b6' },
    { emoji: '🤖', title: 'AI Champion', subtitle: 'Tinder AI Champion Nominee', color: '#60a5fa' },
    { emoji: '🥇', title: 'Stacks on Stacks 2022', subtitle: '1st Place Hackathon', color: '#fbbf24' },
    { emoji: '🥈', title: 'Black Pearl 2022', subtitle: '2nd Place Hackathon', color: '#94a3b8' },
    { emoji: '🥉', title: 'Skinz 2021', subtitle: '3rd Place Hackathon', color: '#d97706' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      setCurrentAchievement((prev) => (prev + 1) % achievements.length);
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [achievements.length]);

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

          <section style={styles.achievementsSection}>
            <h2 style={styles.sectionTitle}>🏆 Achievements Showcase</h2>
            <div style={styles.carouselContainer}>
              <div style={styles.carousel}>
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.achievementCard,
                      transform: `translateX(${(index - currentAchievement) * (isMobile ? 100 : 110)}%)`,
                      opacity: index === currentAchievement ? 1 : 0.3,
                      scale: index === currentAchievement ? '1' : '0.85',
                      borderColor: achievement.color,
                      boxShadow: index === currentAchievement ? `0 10px 40px ${achievement.color}40` : 'none',
                    }}
                  >
                    <div style={{ ...styles.achievementEmoji, color: achievement.color }}>
                      {achievement.emoji}
                    </div>
                    <h3 style={styles.achievementTitle}>{achievement.title}</h3>
                    <p style={styles.achievementSubtitle}>{achievement.subtitle}</p>
                  </div>
                ))}
              </div>
              <div style={styles.carouselDots}>
                {achievements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAchievement(index)}
                    style={{
                      ...styles.carouselDot,
                      backgroundColor: index === currentAchievement ? '#3b82f6' : '#334155',
                      transform: index === currentAchievement ? 'scale(1.3)' : 'scale(1)',
                    }}
                    aria-label={`Go to achievement ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section style={styles.experienceSection}>
            <h2 style={styles.sectionTitle}>Professional Experience</h2>
            <div style={styles.experienceGrid}>
              <div style={styles.experienceCard}>
                <div style={styles.experienceHeader}>
                  <div>
                    <h3 style={styles.experienceCompany}>Tinder</h3>
                    <p style={styles.experienceRole}>Android Engineer</p>
                  </div>
                  <div style={styles.companyLogo}>🔥</div>
                </div>
                <div style={styles.accomplishments}>
                  <h4 style={styles.accomplishmentsTitle}>Key Accomplishments:</h4>
                  <ul style={styles.accomplishmentsList}>
                    <li style={styles.accomplishmentItem}>
                      Single handedly architected Loops playback and creation using ExoPlayer and MediaCodec
                    </li>
                    <li style={styles.accomplishmentItem}>
                      🏆 Won the 2021 Tinder All Stars Award - First ever Tinder All Star for Android!
                    </li>
                    <li style={styles.accomplishmentItem}>
                      🌺 Won the 2021 Tinder Kudos Award and Tinder Challenge - included a trip to Maui, Hawaii with my wife
                    </li>
                    <li style={styles.accomplishmentItem}>
                      🤖 Nominated as a Tinder AI Champion
                    </li>
                  </ul>
                  <h4 style={styles.accomplishmentsTitle}>Hackathon Victories:</h4>
                  <ul style={styles.accomplishmentsList}>
                    <li style={styles.accomplishmentItem}>
                      🥇 Hackathon "Stacks on Stacks" 2022 - 1st Place
                    </li>
                    <li style={styles.accomplishmentItem}>
                      🥈 Hackathon "Black Pearl" 2022 - 2nd Place
                    </li>
                    <li style={styles.accomplishmentItem}>
                      🥉 Hackathon "Skinz" 2021 - 3rd Place
                    </li>
                    <li style={styles.accomplishmentItem}>
                      🥉 Hackathon "Anti Abuse Agent" 2025 - 3rd Place
                    </li>
                  </ul>
                </div>
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
    flexWrap: 'wrap',
    gap: '1rem',
  },
  navBrand: {
    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: 'clamp(1rem, 3vw, 2rem)',
    flexWrap: 'wrap',
  },
  navLink: {
    color: '#cbd5e1',
    transition: 'color 0.3s',
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
  },
  main: {
    flex: 1,
    width: '100%',
  },
  hero: {
    padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem)',
    textAlign: 'center',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
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
    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
    color: '#94a3b8',
    margin: '0 0 2rem 0',
  },
  heroDescription: {
    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
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
    padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    textAlign: 'center',
    marginBottom: 'clamp(2rem, 5vw, 3rem)',
    color: '#f1f5f9',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
    gap: 'clamp(1.5rem, 4vw, 2rem)',
  },
  aboutCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 'clamp(2.5rem, 6vw, 3rem)',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
    marginBottom: '1rem',
    color: '#f1f5f9',
  },
  cardText: {
    color: '#cbd5e1',
    lineHeight: '1.6',
    margin: 0,
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
  },
  skillsSection: {
    padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#1e293b',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
    gap: 'clamp(1.5rem, 4vw, 2rem)',
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
  experienceSection: {
    padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#0f172a',
  },
  experienceGrid: {
    display: 'grid',
    gap: '2rem',
  },
  experienceCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: 'clamp(1.5rem, 4vw, 2rem)',
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  experienceCompany: {
    fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
    margin: '0 0 0.5rem 0',
    color: '#f1f5f9',
  },
  experienceRole: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    color: '#94a3b8',
    margin: 0,
  },
  companyLogo: {
    fontSize: 'clamp(2.5rem, 6vw, 3rem)',
  },
  accomplishments: {
    marginTop: '1rem',
  },
  accomplishmentsTitle: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    color: '#3b82f6',
    marginBottom: '1rem',
  },
  accomplishmentsList: {
    margin: 0,
    paddingLeft: '1.5rem',
    color: '#cbd5e1',
  },
  accomplishmentItem: {
    marginBottom: '0.75rem',
    lineHeight: '1.6',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
  },
  achievementsSection: {
    padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
    backgroundColor: '#1e293b',
    overflow: 'hidden',
  },
  carouselContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    height: 'clamp(280px, 40vw, 350px)',
  },
  carousel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
    perspective: '1000px',
  },
  achievementCard: {
    position: 'absolute',
    backgroundColor: '#0f172a',
    border: '3px solid',
    borderRadius: '20px',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    width: 'clamp(250px, 80vw, 320px)',
    height: 'clamp(220px, 35vw, 280px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  achievementEmoji: {
    fontSize: 'clamp(3rem, 8vw, 4rem)',
    animation: 'float 3s ease-in-out infinite',
    textShadow: '0 5px 15px currentColor',
  },
  achievementTitle: {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    fontWeight: 'bold',
    color: '#f1f5f9',
    textAlign: 'center',
    margin: 0,
  },
  achievementSubtitle: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    color: '#94a3b8',
    textAlign: 'center',
    margin: 0,
  },
  carouselDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    position: 'absolute',
    bottom: '-2.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  carouselDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    padding: 0,
  },
};
