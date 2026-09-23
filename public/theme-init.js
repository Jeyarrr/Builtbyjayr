// Runs before the stylesheet/app to prevent flashing the wrong theme.
(() => {
  let saved;
  try { saved = localStorage.getItem('builtbyjayr-theme'); } catch {}
  const theme = saved === 'light' || saved === 'dark' ? saved : window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.bsTheme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#10130f' : '#f6f7f2');
})();
