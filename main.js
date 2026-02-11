document.querySelectorAll('.project').forEach(el => {
  const href = el.getAttribute('data-href');
  
  if (href) {
    el.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey) {
        window.open(href, '_blank');
      } else {
        window.location.href = href;
      }
    });
  }
});

console.log('zero errori strano vero?');
