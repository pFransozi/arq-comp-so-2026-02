(() => {
  const savedTheme = localStorage.getItem('arquitetura-so-theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const useDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  document.documentElement.classList.toggle('theme-dark', useDark);
  document.documentElement.style.colorScheme = useDark ? 'dark' : 'light';
  document.body?.classList.toggle('theme-dark', useDark);
})();
