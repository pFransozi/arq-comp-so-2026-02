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
  const paletteStyle = document.createElement('style');
  paletteStyle.textContent = `
    :root {
      --blue: #3157d5;
      --blue-soft: #edf2ff;
      --violet: #7357d8;
      --violet-soft: #f2efff;
      --teal: #17857b;
      --teal-soft: #eaf8f6;
      --navy: #0f172a;
      --amber: #b66a07;
      --amber-soft: #fff7e8;
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
    .stored-callout strong {
      color: #92a9ff;
    }

    .warmup {
      background: linear-gradient(135deg, var(--navy), #172554);
    }

    .system-box.center {
      border-color: #b9c7ff;
    }

    .cpu-shell {
      border-color: #b9c7ff;
    }

    .inquiry {
      border-color: #cbd6ff;
      background: linear-gradient(135deg, #f5f7ff, #fff);
      box-shadow: 0 15px 36px rgba(49,87,213,.07);
    }

    .inquiry-head {
      border-bottom-color: #dce4ff;
    }
  `;
  document.head.appendChild(paletteStyle);
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
