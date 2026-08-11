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

const evidenceSection = document.querySelector('#evidencias');
evidenceSection?.remove();
document.querySelector('.main-nav a[href="#evidencias"]')?.remove();

const decisionSection = document.querySelector('#decisao');
decisionSection?.remove();

const finalIndividualRecord = document.querySelector('#fechamento .exit-card');
finalIndividualRecord?.remove();

const isAula03 = document.querySelector('#organizacao') && document.querySelector('#arquiteturas') && document.querySelector('#ciclo');
if (isAula03) {
  const aula03Style = document.createElement('style');
  aula03Style.textContent = `
    :root {
      --ink: #172033;
      --muted: #647087;
      --line: #dfe5ef;
      --soft: #f4f7fb;
      --paper: #ffffff;
      --navy: #0f172a;
      --blue: #3157d5;
      --blue-soft: #edf2ff;
      --violet: #7357d8;
      --violet-soft: #f2efff;
      --teal: #17857b;
      --teal-soft: #eaf8f6;
      --amber: #b66a07;
      --amber-soft: #fff7e8;
      --shadow: 0 18px 48px rgba(35, 50, 78, .09);
    }

    .hero {
      background:
        radial-gradient(circle at 87% 20%, rgba(115,87,216,.14), transparent 27%),
        radial-gradient(circle at 75% 75%, rgba(23,133,123,.12), transparent 22%),
        linear-gradient(180deg, #fbfcff 0%, #fff 100%);
    }
    .hero::after {
      border-color: rgba(49,87,213,.13);
      box-shadow: 0 0 0 70px rgba(49,87,213,.025), 0 0 0 140px rgba(115,87,216,.018);
    }
    .section-dark .eyebrow,
    .stored-callout strong { color: #92a9ff; }
    .warmup { background: linear-gradient(135deg, var(--navy), #172554); }
    .bridge-question {
      background: var(--teal-soft);
      border-color: rgba(23,133,123,.22);
    }
    .system-box.center,
    .cpu-shell { border-color: #b9c7ff; }
    .inquiry {
      border-color: #cbd6ff;
      background: linear-gradient(135deg, #f5f7ff, #fff);
      box-shadow: 0 15px 36px rgba(49,87,213,.07);
    }
    .inquiry-head { border-bottom-color: #dce4ff; }

    .organization-infographic,
    .cpu-infographic {
      margin: 1.6rem 0 0;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: var(--paper);
      box-shadow: var(--shadow);
    }
    .organization-infographic img,
    .cpu-infographic img {
      display: block;
      width: 100%;
      height: auto;
    }

    .stored-node {
      background: #ffffff;
      border-color: #dfe5ef;
      color: #172033;
    }
    .stored-node.memory {
      background: #f5f8ff;
      border-color: #cbd6ff;
    }
    .stored-node.cpu {
      background: #faf7ff;
      border-color: #d9d0ff;
    }
    .stored-node small { color: #3157d5; }
    .stored-node strong { color: #172033; }
    .stored-node span { color: #647087; }

    body.theme-dark {
      --ink: #eef4ff;
      --muted: #aab7cc;
      --line: #2a3750;
      --soft: #0d1422;
      --paper: #101725;
      --navy: #070b14;
      --blue: #84a2ff;
      --blue-soft: #162443;
      --violet: #a994ff;
      --violet-soft: #231d3e;
      --teal: #43d0c8;
      --teal-soft: #102d2c;
      --amber: #f0b35f;
      --amber-soft: #2b2113;
      --shadow: 0 18px 48px rgba(0,0,0,.32);
      background: var(--paper);
      color: var(--ink);
    }
    body.theme-dark .site-header {
      background: rgba(16,23,37,.92);
      border-bottom-color: rgba(42,55,80,.9);
    }
    body.theme-dark .main-nav a { color: var(--muted); }
    body.theme-dark .main-nav a:hover,
    body.theme-dark .main-nav a.active,
    body.theme-dark .nav-highlight { color: var(--blue) !important; }
    body.theme-dark .hero {
      background:
        radial-gradient(circle at 87% 20%, rgba(169,148,255,.16), transparent 27%),
        radial-gradient(circle at 75% 75%, rgba(67,208,200,.10), transparent 22%),
        var(--paper);
    }
    body.theme-dark .guiding-card,
    body.theme-dark .card,
    body.theme-dark .lesson-path a,
    body.theme-dark .function-card,
    body.theme-dark .system-box,
    body.theme-dark .cpu-diagram,
    body.theme-dark .arch-card,
    body.theme-dark .cycle-phase,
    body.theme-dark .simulator,
    body.theme-dark .trace-table-wrap,
    body.theme-dark .record-table-wrap,
    body.theme-dark .project-step,
    body.theme-dark .check-item,
    body.theme-dark .inquiry,
    body.theme-dark .memory-table,
    body.theme-dark .record-table input,
    body.theme-dark .record-table select,
    body.theme-dark .worksheet textarea,
    body.theme-dark .stored-node,
    body.theme-dark .stored-node.memory,
    body.theme-dark .stored-node.cpu,
    body.theme-dark .execution-step,
    body.theme-dark .stored-type {
      background: #172033;
      border-color: var(--line);
      color: var(--ink);
    }
    body.theme-dark .stored-node small { color: #92a9ff; }
    body.theme-dark .stored-node strong { color: var(--ink); }
    body.theme-dark .stored-node span,
    body.theme-dark .execution-step p,
    body.theme-dark .stored-type p { color: var(--muted); }
    body.theme-dark .stored-definition { background: #070b14; }
    body.theme-dark .example-goal {
      background: var(--teal-soft);
      color: var(--teal);
    }
    body.theme-dark .topic-list div,
    body.theme-dark .cpu-part,
    body.theme-dark .state-box,
    body.theme-dark .arch-memory div,
    body.theme-dark .bus-line,
    body.theme-dark .sim-message,
    body.theme-dark .inquiry-tag,
    body.theme-dark .memory-row strong {
      background: #111a2b;
      border-color: var(--line);
      color: var(--ink);
    }
    body.theme-dark .button-secondary,
    body.theme-dark .sim-controls button:not(.primary) {
      background: #172033;
      border-color: var(--line);
      color: var(--ink);
    }
    body.theme-dark .button-primary,
    body.theme-dark .sim-controls .primary {
      background: var(--blue);
      border-color: var(--blue);
      color: #07101f;
    }
    body.theme-dark .skill strong,
    body.theme-dark .c6 .skill strong {
      background: #111a2b;
      color: var(--blue);
    }
    body.theme-dark .c6 .skill strong,
    body.theme-dark .reg { color: var(--violet); }
    body.theme-dark .reg { background: var(--violet-soft); }
    body.theme-dark .bridge-question {
      background: var(--teal-soft);
      border-color: rgba(67,208,200,.20);
      color: var(--ink);
    }
    body.theme-dark .precision-note {
      background: var(--amber-soft);
      border-left-color: var(--amber);
      color: var(--ink);
    }
    body.theme-dark .stored-callout,
    body.theme-dark .warmup { background: #070b14; }
    body.theme-dark .stored-callout strong,
    body.theme-dark .section-dark .eyebrow { color: #92a9ff; }
    body.theme-dark .trace-table thead th,
    body.theme-dark .record-table thead th { background: #111a2b; color: var(--ink); }
    body.theme-dark .trace-table td,
    body.theme-dark .trace-table th,
    body.theme-dark .record-table td,
    body.theme-dark .record-table th { border-color: var(--line); }
    body.theme-dark .organization-infographic,
    body.theme-dark .cpu-infographic {
      background: #101725;
      border-color: var(--line);
    }
  `;
  document.head.appendChild(aula03Style);

  const organizationModel = document.querySelector('#organizacao .system-model');
  if (organizationModel) {
    const figure = document.createElement('figure');
    figure.className = 'organization-infographic';
    figure.innerHTML = `
      <img
        src="./assets/cpu-memoria-es-barramentos.svg"
        data-light-src="./assets/cpu-memoria-es-barramentos.svg"
        data-dark-src="./assets/cpu-memoria-es-barramentos-dark.svg"
        alt="Infográfico didático que mostra memória principal, CPU e entrada/saída conectadas pelos barramentos de endereços, dados e controle. A CPU é detalhada em unidade de controle, ULA, registradores e clock."
        loading="eager"
      >
    `;
    organizationModel.replaceWith(figure);
    document.querySelector('#organizacao .precision-note')?.remove();
  }

  const cpuZoom = document.querySelector('#cpu .cpu-zoom');
  if (cpuZoom) {
    const figure = document.createElement('figure');
    figure.className = 'cpu-infographic';
    figure.innerHTML = `
      <img
        src="./assets/cpu-internos-light.svg"
        data-light-src="./assets/cpu-internos-light.svg"
        data-dark-src="./assets/cpu-internos-dark.svg"
        alt="Infográfico didático sobre unidade de controle, ULA e registradores, mostrando o fluxo de informação dentro da CPU e exemplos de registradores PC, IR e ACC."
        loading="eager"
      >
    `;
    cpuZoom.replaceWith(figure);
  }
}

const missionSection = document.querySelector('#missao');
if (missionSection) {
  const intro = missionSection.querySelector('.section-heading > p:last-child');
  if (intro) {
    intro.innerHTML = 'Em equipe, valide o baseline e faça <strong>uma execução</strong> com <code>entradas/pequena.json</code>. O objetivo é compreender o ponto de partida, observar os artefatos gerados e registrar a primeira referência. No Windows, os comandos abaixo usam <code>py</code>; se o seu ambiente usar <code>python</code>, substitua o comando.';
  }

  const missionGrid = missionSection.querySelector('.mission-grid');
  if (missionGrid) {
    missionGrid.innerHTML = `
      <article><span>1</span><h3>Conheça o pacote</h3><p>Leia o README e localize <code>main.py</code>, <code>entradas/</code>, <code>tests/</code>, <code>outputs/</code> e <code>logs/</code>.</p></article>
      <article><span>2</span><h3>Valide o ponto de partida</h3><p>Execute <code>py -m unittest discover -s tests -v</code> e confirme que os testes passam antes da primeira medição.</p></article>
      <article><span>3</span><h3>Execute a entrada pequena</h3><p>Use <code>py main.py --entrada entradas/pequena.json</code>. Esta é a execução que será registrada na primeira linha da tabela.</p></article>
      <article><span>4</span><h3>Observe os artefatos</h3><p>Abra <code>outputs/resultados_pequena.json</code>, <code>outputs/metricas_pequena.json</code> e <code>logs/execucao_pequena.log</code>.</p></article>
      <article><span>5</span><h3>Preencha a primeira referência</h3><p>Use <code>metricas_pequena.json</code> para registrar entrada, tarefas, tempos, memória, vazão e correção na primeira linha da tabela.</p></article>
      <article><span>6</span><h3>Explique o que aconteceu</h3><p>Relacione a entrada JSON, o processamento sequencial e os resultados, métricas e logs produzidos pelo programa.</p></article>
    `;
  }
}

const measurementCard = document.querySelector('#registro .measurement-card');
if (measurementCard) {
  const title = measurementCard.querySelector('.measurement-head h3');
  const description = measurementCard.querySelector('.measurement-head > p');
  const rowHeaders = measurementCard.querySelectorAll('tbody th');
  const note = measurementCard.querySelector('.table-note');

  if (title) title.textContent = 'Registre o primeiro resultado observado';
  if (description) {
    description.innerHTML = 'Preencha apenas a primeira linha com a execução de <code>entradas/pequena.json</code>. As linhas seguintes ficam reservadas para medições futuras, quando começarmos a comparar o comportamento do programa.';
  }

  if (rowHeaders[0]) rowHeaders[0].textContent = '1 — hoje';
  if (rowHeaders[1]) rowHeaders[1].textContent = '2 — futura';
  if (rowHeaders[2]) rowHeaders[2].textContent = '3 — futura';

  if (note) {
    note.innerHTML = 'Os valores da primeira linha podem ser copiados de <code>outputs/metricas_pequena.json</code>. O pico de memória é medido de forma dependente do sistema operacional; por isso, o ambiente deverá ser registrado quando iniciarmos comparações futuras.';
  }
}

const registerZero = document.querySelector('#registro .register-zero');
if (registerZero) {
  registerZero.innerHTML = `
    <div class="inquiry-head">
      <div>
        <span class="inquiry-kicker">Uma resposta por equipe</span>
        <h3>Registro da primeira execução do baseline</h3>
      </div>
      <span class="inquiry-tag">Entrada pequena · primeira referência</span>
    </div>
    <div class="inquiry-body">
      <div>
        <ol class="prompt-list">
          <li><strong>Validação:</strong> os testes passaram? Registre o resultado.</li>
          <li><strong>Execução:</strong> qual comando foi utilizado para executar o baseline?</li>
          <li><strong>Entrada:</strong> quantas tarefas havia em <code>entradas/pequena.json</code>?</li>
          <li><strong>Medição:</strong> qual foi o tempo total e o resultado foi considerado correto?</li>
          <li><strong>Artefatos:</strong> quais arquivos foram gerados em <code>outputs/</code> e <code>logs/</code>?</li>
          <li><strong>Fluxo:</strong> descreva o caminho <code>entrada JSON → processamento sequencial → resultados/métricas/log</code>.</li>
          <li><strong>Limite da observação:</strong> o que ainda não podemos concluir sobre o desempenho a partir de uma única execução com entrada pequena?</li>
        </ol>
        <div class="completion-criterion">
          <strong>Critério de conclusão</strong>
          <p>“Com a entrada pequena, o baseline recebeu ______ tarefas, processou-as de forma ______, levou ______ s, produziu ______ e deixou como evidências ______.”</p>
        </div>
      </div>
      <div class="worksheet">
        <label for="baseline">Registro 0 da equipe</label>
        <textarea id="baseline" data-save="baseline" placeholder="Testes:\nComando:\nNúmero de tarefas:\nTempo total:\nResultado correto:\nArquivos gerados:\nFluxo observado:\nO que ainda não podemos concluir:"></textarea>
        <span class="save-note">O texto e a tabela ficam salvos somente neste navegador.</span>
      </div>
    </div>
  `;
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

  document.querySelectorAll('img[data-light-src][data-dark-src]').forEach((image) => {
    image.src = isDark ? image.dataset.darkSrc : image.dataset.lightSrc;
  });

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

const architectureGrid = document.querySelector('#arquiteturas .architecture-grid');
if (architectureGrid) {
  const architectureFigure = document.createElement('figure');
  architectureFigure.className = 'architecture-infographic';
  const architectureIsDark = document.body.classList.contains('theme-dark');
  architectureFigure.innerHTML = `
    <img
      src="${architectureIsDark ? './assets/von-neumann-harvard-dark.svg' : './assets/von-neumann-harvard-light.svg'}"
      data-light-src="./assets/von-neumann-harvard-light.svg"
      data-dark-src="./assets/von-neumann-harvard-dark.svg"
      alt="Comparação didática entre von Neumann, com memória e barramento compartilhados para instruções e dados, e Harvard, com memórias e caminhos de acesso separados."
      loading="eager"
    >
  `;
  architectureGrid.replaceWith(architectureFigure);

  const architectureStyle = document.createElement('style');
  architectureStyle.textContent = `
    .architecture-infographic {
      margin: 1.6rem 0 0;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: var(--paper);
      box-shadow: var(--shadow);
    }
    .architecture-infographic img {
      display: block;
      width: 100%;
      height: auto;
    }
    body.theme-dark .architecture-infographic {
      background: #07101f;
      border-color: var(--line);
    }
  `;
  document.head.appendChild(architectureStyle);
}

const logisimSection = document.querySelector('#logisim');
if (logisimSection) {
  logisimSection.remove();
  document.querySelectorAll('a[href="#logisim"]').forEach((link) => link.remove());
}

const cycleInquiry = document.querySelector('#ciclo .inquiry');
if (cycleInquiry) {
  const kicker = cycleInquiry.querySelector('.inquiry-kicker');
  const tag = cycleInquiry.querySelector('.inquiry-tag');
  const textarea = cycleInquiry.querySelector('textarea');
  if (kicker?.textContent.trim() === 'Antes do Logisim') kicker.textContent = 'Aplicação do modelo';
  if (tag) tag.textContent = 'Previsão → explicação';
  if (textarea) textarea.placeholder = 'Nossa explicação...\nComo PC, IR e ACC mudam...\nO que corrigimos...';
}
