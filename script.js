document.querySelector('.semester-measurements')?.remove();
document.querySelector('#ia-first .method-rules')?.remove();

const baseScript = document.createElement('script');
baseScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@e8a8a5618b8cac11bc3d40439a9d608480c81b8f/script.js';
baseScript.defer = true;
document.head.appendChild(baseScript);