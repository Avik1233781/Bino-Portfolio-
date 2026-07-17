import React, { useState, useEffect } from 'react';
import profilePic from './assets/Bino.png'; // Change this to her photo file name!
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  
  // States to control the Easter egg animations
  const [showSurprise, setShowSurprise] = useState(false);
  const [zoomClock, setZoomClock] = useState(false); // Handles clock interactive zoom

  // Updates the time every second
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  // 🌟 CONTINUOUS SCROLL ANIMATION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-scroll');
        } else {
          // 🌟 THIS LINE RESETS THE ANIMATION SO IT PLAYS AGAIN
          entry.target.classList.remove('show-scroll');
        }
      });
    }, { threshold: 0.15 }); // Waits until 15% of the element is visible before animating

    // Find everything with the 'hidden-scroll' class and watch it
    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    // Cleanup watcher when component unmounts
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []); // Empty array means this runs exactly once when the site loads

  // Formats the digital clock
  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  // Math for the Analog Clock rotations
  const secondsDegrees = time.getSeconds() * 6; 
  const minutesDegrees = time.getMinutes() * 6 + time.getSeconds() * 0.1; 
  const hoursDegrees = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  // Profile picture click handler
  const handleProfileClick = () => {
    setShowSurprise(true);
    setTimeout(() => {
      setShowSurprise(false);
    }, 3000);
  };

  // Analog clock click handler
  const handleClockClick = () => {
    setZoomClock(true);
    setTimeout(() => {
      setZoomClock(false);
    }, 3000); // Zoom duration set to 3 seconds
  };

  // 🌟 UPDATED: Generic placeholders for her portfolio
  const portfolioData = {
    name: "Binodini Sarkar",
    role: "Subtitle Placeholder | Creative | Passionate",
    bio: "Explore the creativity, passion, and brilliance she brings to life. This space is dedicated to showcasing her amazing work and beautiful moments.",
    
    links: [
      { id: 1, label: "Link One", url: "#" }, 
      { id: 2, label: "Link Two", url: "#"}, 
      { id: 3, label: "Email Me", url: "#" },
      { id: 4, label: "Instagram", url: "#" }
    ],
    projects: [
      {
        id: 1,
        category: "✨ Category One",
        title: "Creative Project One",
        description: "A brief description of this beautiful project goes here.",
        link: "#"
      },
      {
        id: 2,
        category: "🎨 Category Two",
        title: "Creative Project Two",
        description: "A brief description of this amazing work goes here.",
        link: "#"
      },
      {
        id: 3,
        category: "📸 Category Three",
        title: "Creative Project Three",
        description: "A brief description of this stunning gallery goes here.",
        link: "#"
      },
      {
        id: 4,
        category: "⭐ Category Four",
        title: "Creative Project Four",
        description: "A brief description of this fun piece goes here.",
        link: "#"
      }
    ]
  };

  return (
    <div className="portfolio-container">
      
      {/* HEADER SECTION */}
      <header className="header fade-in-up delay-0"> 
  

        {/* Profile Container */}
        <div className="profile-container">
          <div 
            className={`heart-glow-wrapper ${showSurprise ? 'zoom-effect' : ''}`} 
            onClick={handleProfileClick}
          >
            
          </div>
          <img 
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80"
            alt="Profile" 
            className={`profile-img ${showSurprise ? 'zoom-effect' : ''}`} 
            onClick={handleProfileClick}
          />
          <div className={`catchy-message ${showSurprise ? 'show-message' : ''}`}>
            ✨ Click for a surprise! ✨
          </div>
        </div>

       {/* 🌟 WRAPPED H1 IN TYPING CONTAINER */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Add hidden-scroll right next to typing-container */}
          <h1 className="typing-container hidden-scroll">Welcome to <span className="highlight-text">{portfolioData.name}</span></h1>
        </div>
        
        {/* DUAL CLOCK DISPLAY */}
        <div className="dual-clock-container">
          
          {/* Interactive Analog Clock Wrapper */}
          <div className="interactive-clock-wrapper">
            <div 
              className={`analog-clock ${zoomClock ? 'zoom-effect' : ''}`} 
              onClick={handleClockClick}
              title="Click the clock!"
            >
              <div className="hand hour-hand" style={{ transform: `rotate(${hoursDegrees}deg)` }} />
              <div className="hand min-hand" style={{ transform: `rotate(${minutesDegrees}deg)` }} />
              <div className="hand sec-hand" style={{ transform: `rotate(${secondsDegrees}deg)` }} />
              <div className="clock-center"></div>
            </div>
            
            {/* Catchy Clock Message */}
            <div className={`catchy-message ${zoomClock ? 'show-message' : ''}`}>
              ⏳ Time spent together is magic! 🚀
            </div>
          </div>
          
          {/* Digital Neon Clock */}
          <div className="clock-wrapper">
            <div id="live-clock">⏱ {formatTime(time)}</div>
            <div id="live-date" style={{ fontSize: '0.85rem', color: '#ffe066', marginTop: '4px', letterSpacing: '1px', fontWeight: '500' }}>
              {time.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
        
        <h2 className="hidden-scroll">{portfolioData.role}</h2>
        <p className="bio-text hidden-scroll">{portfolioData.bio}</p>
      </header>

      {/* CHROME TAB LINKS SECTION */}
      <section className="links-section fade-in-up delay-1">
        <h3 className="hidden-scroll">Quick Links</h3>
        <div className="button-group">
          {portfolioData.links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="link-button">
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION - WITH FORCED INLINE CSS UPDATED FOR PINK THEME */}
      <section className="projects-section fade-in-up delay-2">
        <h3 className="hidden-scroll" style={{ textAlign: 'center', marginBottom: '2rem' }}>Her Works</h3>
        
        {/* THIS INLINE STYLE FORCES THE 2 COLUMNS NO MATTER WHAT */}
        <div 
          className="project-grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1.5rem',
            width: '100%' 
          }}
        >
          {portfolioData.projects.map((project) => (
            <div 
              className="project-card hidden-scroll"
              key={project.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassy effect
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '1.5rem',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#ffffff', opacity: 0.9, marginBottom: '0.5rem' }}>
                {project.category}
              </span>
              
              <h4 style={{ color: '#ffe066', marginBottom: '0.5rem' }}>{project.title}</h4>
              <p style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                {project.description}
              </p>
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', borderBottom: '1px solid white' }}
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="fade-in-up delay-3">
        <p>© {new Date().getFullYear()} Made with love.</p>
      </footer>
    </div>
  );
}

export default App;