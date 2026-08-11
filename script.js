const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');

const percursoEyebrow = document.querySelector('#percurso .eyebrow');
if (percursoEyebrow?.textContent.trim() === 'Percurso de 4 horas') {
  percursoEyebrow.remove();
}

const registroEyebrow = document.querySelector('#registro .eyebrow');
if (registroEyebrow?.textContent.trim() === 'Entrega formativa') {
  registroEyebrow.textContent = 'Entrega';
}

const executionChain = document.querySelector('.execution-synthesis .execution-chain');
if (executionChain) {
  const figure = document.createElement('figure');
  figure.className = 'execution-flow-figure';
  figure.innerHTML = `
    <img
      src="./assets/fluxo-execucao-alto-nivel-light.svg"
      data-light-src="./assets/fluxo-execucao-alto-nivel-light.svg"
      data-dark-src="./assets/fluxo-execucao-alto-nivel-dark.svg"
      alt="Fluxo da execução: o código-fonte passa pelo interpretador Python, sistema operacional e processo em execução; o processo utiliza CPU, memória e entrada/saída, e o fluxo retorna até o resultado observável."
      loading="lazy"
    >
  `;
  executionChain.replaceWith(figure);

  const flowFigureStyle = document.createElement('style');
  flowFigureStyle.textContent = `
    .execution-flow-figure {
      margin: 1.6rem 0 0;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: var(--paper);
      box-shadow: var(--shadow);
    }
    .execution-flow-figure img {
      display: block;
      width: 100%;
      height: auto;
    }
    body.theme-dark .execution-flow-figure {
      background: #071426;
    }
  `;
  document.head.appendChild(flowFigureStyle);
}

const windowsTraceCard = [...document.querySelectorAll('.api-trace-lab .trace-card')]
  .find((card) => card.querySelector('h5')?.textContent.trim() === 'Windows');

if (windowsTraceCard) {
  windowsTraceCard.innerHTML = `
    <h5>Windows</h5>
    <p>Use o Process Monitor do Sysinternals para observar as operações realizadas durante a execução. Para simplificar a atividade, coloque <code>Procmon64.exe</code> na mesma pasta de <code>exemplo_fluxo.py</code> e abra o PowerShell ou Terminal nessa pasta.</p>
    <pre><code># 1. Iniciar a captura
.\\Procmon64.exe /AcceptEula /Quiet /BackingFile rastros-windows.pml

# 2. Executar o programa
py exemplo_fluxo.py

# 3. Encerrar a captura
.\\Procmon64.exe /Terminate

# 4. Abrir o rastro para análise
.\\Procmon64.exe /OpenLog rastros-windows.pml</code></pre>
    <div class="trace-focus">
      <strong>Depois da captura</strong>
      <span>O Procmon precisa estar em execução <strong>antes</strong> de rodar o programa Python; ele registra os eventos enquanto eles acontecem.</span>
      <span>Se a janela de filtros abrir com filtros antigos e nenhum evento aparecer, clique em <strong>Reset</strong> e depois em <strong>OK</strong>.</span>
      <span>Abra <strong>Filter → Filter...</strong> e adicione <code>Path</code> <strong>contains</strong> <code>resultado.txt</code> → <strong>Include</strong>.</span>
      <span>Procure operações como <code>CreateFile</code>, <code>WriteFile</code> e <code>CloseFile</code> associadas a <code>resultado.txt</code>.</span>
      <span>Observe a coluna <code>Process Name</code>: mesmo executando <code>py exemplo_fluxo.py</code>, as operações podem aparecer associadas ao interpretador, como <code>python.exe</code>, porque <code>py</code> atua como launcher.</span>
    </div>
  `;
}

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);

  const executionFlowImage = document.querySelector('.execution-flow-figure img');
  if (executionFlowImage) {
    executionFlowImage.src = isDark
      ? executionFlowImage.dataset.darkSrc
      : executionFlowImage.dataset.lightSrc;
  }

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
