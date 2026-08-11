const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');

const percursoEyebrow = document.querySelector('#percurso .eyebrow');
if (percursoEyebrow?.textContent.trim() === 'Percurso de 4 horas') {
  percursoEyebrow.remove();
}

const executionChain = document.querySelector('.execution-synthesis .execution-chain');
if (executionChain) {
  const figure = document.createElement('figure');
  figure.className = 'execution-flow-figure';
  figure.innerHTML = `
    <img
      src="./assets/fluxo-execucao-alto-nivel.svg"
      alt="Fluxo esperado em alto nível: código-fonte, interpretador Python, processo, memória, CPU, serviços do sistema operacional e saída ou resultado observável."
      loading="lazy"
    >
    <figcaption>Do código-fonte ao resultado observável: uma visão integrada das responsabilidades envolvidas durante a execução.</figcaption>
  `;
  executionChain.replaceWith(figure);

  const flowFigureStyle = document.createElement('style');
  flowFigureStyle.textContent = `
    .execution-flow-figure {
      margin: 1.6rem 0 0;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: #071426;
      box-shadow: var(--shadow);
    }
    .execution-flow-figure img {
      display: block;
      width: 100%;
      height: auto;
      background: #071426;
    }
    .execution-flow-figure figcaption {
      margin: 0;
      padding: .9rem 1.1rem 1rem;
      border-top: 1px solid rgba(255,255,255,.08);
      background: #071426;
      color: #aebbd0;
      text-align: center;
      font-size: .88rem;
    }
  `;
  document.head.appendChild(flowFigureStyle);
}

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo noturno');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    themeToggle.querySelector('.theme-text').textContent = isDark ? 'Modo claro' : 'Modo noturno';
  }
};

const savedTheme = localStorage.getItem('arquitetura-so-theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
  localStorage.setItem('arquitetura-so-theme', nextTheme);
  applyTheme(nextTheme);
});

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-dialog-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialogTarget);
    if (dialog?.showModal) dialog.showModal();
  });

  button.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const dialog = document.getElementById(button.dataset.dialogTarget);
    if (dialog?.showModal) dialog.showModal();
  });
});

document.querySelectorAll('.image-dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});
