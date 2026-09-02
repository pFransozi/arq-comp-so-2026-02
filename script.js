document.querySelector('.semester-measurements')?.remove();
document.querySelector('#ia-first .method-rules')?.remove();
document.querySelector('#aula-atual .eyebrow')?.remove();

const isAula02 = /(?:^|\/)aula-02\.html$/.test(window.location.pathname);

if (isAula02) {
  document.body.classList.add('lesson-clean');
  const lessonStyle = document.createElement('link');
  lessonStyle.rel = 'stylesheet';
  lessonStyle.href = 'aula-02-clean.css';
  document.head.appendChild(lessonStyle);
}

const baseScript = document.createElement('script');
baseScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@e8a8a5618b8cac11bc3d40439a9d608480c81b8f/script.js';
baseScript.defer = true;

const loadAula02Clean = () => {
  if (!isAula02 || document.querySelector('script[data-aula02-clean]')) return;
  const lessonScript = document.createElement('script');
  lessonScript.src = 'aula-02-clean.js';
  lessonScript.defer = true;
  lessonScript.dataset.aula02Clean = 'true';
  document.head.appendChild(lessonScript);
};

baseScript.addEventListener('load', loadAula02Clean);
baseScript.addEventListener('error', loadAula02Clean);
document.head.appendChild(baseScript);