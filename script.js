(() => {
  const path = window.location.pathname;
  const isAula06 = /(?:^|\/)(?:rascunhos\/)?aula-06\.html$/.test(path);

  const formatAula06Exercise = () => {
    if (!isAula06) return;
    const perfis = document.querySelector('#perfis');
    if (!perfis) return;

    perfis.querySelectorAll('.inquiry li > strong:first-child').forEach((label) => {
      if (/^[A-I]\.$/.test(label.textContent.trim())) label.remove();
    });

    perfis.querySelectorAll('.inquiry h3').forEach((heading) => {
      if (heading.textContent.trim() === 'Cenário J') {
        heading.textContent = 'Uma aplicação em vários momentos';
      }
    });

    perfis.querySelectorAll('.inquiry ol').forEach((list) => {
      list.style.listStyleType = 'decimal';
      list.style.listStylePosition = 'outside';
      list.style.paddingLeft = '1.5rem';
      list.style.marginLeft = '0';
    });

    perfis.querySelectorAll('.inquiry li').forEach((item) => {
      item.style.marginLeft = '0';
    });
  };

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@4f87bfc44e8e87e094df9850477e050371999f6c/script.js';
  previousScript.defer = true;
  document.head.appendChild(previousScript);

  let attempts = 0;
  const timer = window.setInterval(() => {
    formatAula06Exercise();
    attempts += 1;
    if (attempts >= 30) window.clearInterval(timer);
  }, 150);

  window.addEventListener('load', formatAula06Exercise);
})();