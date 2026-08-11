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

const baselineCallout = document.querySelector('.baseline-callout');
if (baselineCallout) {
  const label = baselineCallout.querySelector('.callout-label');
  const title = baselineCallout.querySelector('h3');
  const description = baselineCallout.querySelector('p');
  const downloadButton = baselineCallout.querySelector('.button');

  if (label) label.textContent = 'Código inicial do projeto';
  if (title) title.textContent = 'Versão sequencial para os primeiros experimentos';
  if (description) {
    description.textContent = 'O programa lê tarefas em arquivos JSON, processa uma por vez, grava resultados e logs e gera métricas básicas. Também inclui testes e entradas com diferentes tamanhos.';
  }
  if (downloadButton) downloadButton.textContent = 'Baixar código';
}

const projectBoundary = document.querySelector('.project-boundary');
projectBoundary?.remove();

const methodReminder = document.querySelector('#missao .method-reminder');
methodReminder?.remove();

const missionSection = document.querySelector('#missao');
if (missionSection) {
  const intro = missionSection.querySelector('.section-heading > p:last-child');
  if (intro) {
    intro.innerHTML = 'Em equipe, valide o baseline e execute a mesma entrada pequena <strong>três vezes</strong>. Após cada execução, copie as métricas para uma linha da tabela abaixo. O objetivo é observar o ponto de partida e perceber que as medições podem variar mesmo sem mudar o código ou a entrada. No Windows, os comandos abaixo usam <code>py</code>; se o seu ambiente usar <code>python</code>, substitua o comando.';
  }

  const missionGrid = missionSection.querySelector('.mission-grid');
  if (missionGrid) {
    missionGrid.innerHTML = `
      <article><span>1</span><h3>Conheça o pacote</h3><p>Leia o README e localize <code>main.py</code>, <code>entradas/</code>, <code>tests/</code>, <code>outputs/</code> e <code>logs/</code>.</p></article>
      <article><span>2</span><h3>Valide o ponto de partida</h3><p>Execute <code>py -m unittest discover -s tests -v</code> e confirme que os testes passam antes das medições.</p></article>
      <article><span>3</span><h3>Faça a execução 1</h3><p>Execute <code>py main.py --entrada entradas/pequena.json</code>. Ao terminar, abra <code>outputs/metricas_pequena.json</code> e preencha a linha 1 da tabela.</p></article>
      <article><span>4</span><h3>Repita mais duas vezes</h3><p>Execute o mesmo comando novamente para as execuções 2 e 3. Após cada execução, copie as métricas para a linha correspondente antes de rodar novamente.</p></article>
      <article><span>5</span><h3>Compare as medições</h3><p>Compare tempo total, tempo de CPU, pico de memória, vazão e correção. Observe quais valores permaneceram iguais e quais variaram.</p></article>
      <article><span>6</span><h3>Explique o que observou</h3><p>Relacione entrada, processamento, resultados, métricas e logs. Registre uma hipótese inicial sobre qual recurso pode se tornar limitante quando a carga aumentar.</p></article>
    `;
  }
}

const measurementCard = document.querySelector('#registro .measurement-card');
if (measurementCard) {
  const title = measurementCard.querySelector('.measurement-head h3');
  const description = measurementCard.querySelector('.measurement-head > p');
  const rowHeaders = measurementCard.querySelectorAll('tbody th');
  const note = measurementCard.querySelector('.table-note');

  if (title) title.textContent = 'Registre três execuções do mesmo baseline';
  if (description) {
    description.innerHTML = 'Use <code>entradas/pequena.json</code> nas três execuções e preencha uma linha após cada rodada. Assim, a tabela registra três medições comparáveis do mesmo ponto de partida.';
  }

  ['1', '2', '3'].forEach((label, index) => {
    if (rowHeaders[index]) rowHeaders[index].textContent = label;
  });

  [2, 3].forEach((run) => {
    const input = measurementCard.querySelector(`[data-save="medicao-${run}-entrada"]`);
    const tasks = measurementCard.querySelector(`[data-save="medicao-${run}-tarefas"]`);
    if (input) input.placeholder = 'pequena';
    if (tasks) tasks.placeholder = '6';
  });

  if (note) {
    note.innerHTML = 'Após cada execução, copie os valores de <code>outputs/metricas_pequena.json</code> para a linha correspondente. Esse arquivo é reescrito quando o programa roda novamente, por isso registre a medição antes da próxima execução. O pico de memória é medido de forma dependente do sistema operacional; em comparações futuras, registre também o ambiente.';
  }
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
