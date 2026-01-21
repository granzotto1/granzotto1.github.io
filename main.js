// Fade hero quando si scende
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    if (window.scrollY > 180) {
      hero.style.opacity = '0';
      hero.style.pointerEvents = 'none';
    } else {
      hero.style.opacity = '1';
    }
  });
  
  // Fade-in sezioni (opzionale)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });