(() => {
  const isAula04 = /(?:^|\/)aula-04\.html$/.test(window.location.pathname);

  if (isAula04) {
    document.body.classList.add('aula03-clean', 'aula04-clean');

    const cleanStyle = document.createElement('link');
    cleanStyle.rel = 'stylesheet';
    cleanStyle.href = 'aula-03-clean.css';
    document.head.appendChild(cleanStyle);

    const aula04Style = document.createElement('link');
    aula04Style.rel = 'stylesheet';
    aula04Style.href = 'aula-04-clean.css';
    document.head.appendChild(aula04Style);
  }

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@cb4518d7dc92a1c5b03218cd231bdca68aeed111/script.js';
  previousScript.defer = true;

  const finishAula04Layout = () => {
    if (!isAula04 || document.querySelector('script[data-aula04-clean]')) return;
    const cleanScript = document.createElement('script');
    cleanScript.src = 'aula-04-clean.js';
    cleanScript.defer = true;
    cleanScript.dataset.aula04Clean = 'true';
    document.head.appendChild(cleanScript);
  };

  previousScript.addEventListener('load', finishAula04Layout);
  previousScript.addEventListener('error', finishAula04Layout);
  document.head.appendChild(previousScript);
})();
