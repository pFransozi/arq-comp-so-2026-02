(() => {
document.querySelector('.semester-measurements')?.remove();
document.querySelector('#ia-first .method-rules')?.remove();
document.querySelector('#aula-atual .eyebrow')?.remove();

const isAula02 = /(?:^|\/)aula-02\.html$/.test(window.location.pathname);
const isAula02Aprofundamento = /(?:^|\/)aula-02-aprofundamento\.html$/.test(window.location.pathname);
const isAula03 = /(?:^|\/)aula-03\.html$/.test(window.location.pathname);

if (isAula02) {
  document.body.classList.add('lesson-clean');
  const lessonStyle = document.createElement('link');
  lessonStyle.rel = 'stylesheet';
  lessonStyle.href = 'aula-02-clean.css';
  document.head.appendChild(lessonStyle);
}

if (isAula02Aprofundamento) {
  document.body.classList.add('study-clean');
  const studyStyle = document.createElement('link');
  studyStyle.rel = 'stylesheet';
  studyStyle.href = 'aula-02-aprofundamento-clean.css';
  document.head.appendChild(studyStyle);
}

if (isAula03) {
  document.body.classList.add('aula03-clean');
  const aula03Style = document.createElement('link');
  aula03Style.rel = 'stylesheet';
  aula03Style.href = 'aula-03-clean.css';
  document.head.appendChild(aula03Style);

  const aula03CycleStyle = document.createElement('link');
  aula03CycleStyle.rel = 'stylesheet';
  aula03CycleStyle.href = 'aula-03-cycle-layout.css';
  document.head.appendChild(aula03CycleStyle);
}

const improveAula02Register = () => {
  if (!isAula02) return;

  const registro = document.querySelector('#registro');
  if (!registro) return;

  const sectionEyebrow = registro.querySelector('.section-heading .eyebrow');
  const sectionTitle = registro.querySelector('.section-heading h2');
  const sectionIntro = registro.querySelector('.section-heading > p:last-child');

  if (sectionEyebrow) sectionEyebrow.textContent = 'Entrega';
  if (sectionTitle) sectionTitle.textContent = 'Registro 0 — primeira leitura do baseline';
  if (sectionIntro) {
    sectionIntro.textContent = 'Use a medição acima como referência. Aqui, o objetivo é interpretar a primeira execução: explicar o que foi observado, indicar uma evidência e separar o que já podemos afirmar do que ainda precisa ser investigado.';
  }

  const registerZero = registro.querySelector('.register-zero');
  if (!registerZero) return;

  registerZero.innerHTML = `
    <div class="inquiry-head">
      <div>
        <span class="inquiry-kicker">Síntese da equipe</span>
        <h3>O que a primeira execução mostrou?</h3>
      </div>
      <span class="inquiry-tag">Interpretação · evidência · limite</span>
    </div>
    <div class="inquiry-body" style="grid-template-columns:1fr">
      <div>
        <p>Não repita todos os valores da tabela. Use-os como evidência para construir uma explicação curta sobre o comportamento inicial do programa.</p>
        <ol class="prompt-list">
          <li><strong>Validação:</strong> os testes passaram e o resultado da execução foi considerado correto? Indique qual evidência sustenta essa afirmação.</li>
          <li><strong>Fluxo:</strong> explique, em poucas frases, o caminho <code>entrada JSON → processamento sequencial → resultados, métricas e log</code>.</li>
          <li><strong>Evidência:</strong> escolha um artefato gerado pela execução — resultado, arquivo de métricas ou log — e explique o que ele permite confirmar.</li>
          <li><strong>Limite:</strong> o que uma única execução com a entrada pequena ainda não permite concluir sobre desempenho, gargalos ou ganho com paralelismo?</li>
          <li><strong>Próxima investigação:</strong> formule uma pergunta ou hipótese que poderia ser testada com uma entrada maior ou em uma versão futura do programa.</li>
        </ol>
        <div class="completion-criterion">
          <strong>Formato da entrega</strong>
          <p>Uma síntese curta por equipe, apoiada na tabela de medição e nos artefatos gerados. Não é necessário copiar todos os números nem modificar o código.</p>
        </div>
      </div>
    </div>
  `;
};

const improveAula02Closing = () => {
  if (!isAula02) return;

  const fechamento = document.querySelector('#fechamento');
  if (!fechamento) return;

  const eyebrow = fechamento.querySelector('.section-heading .eyebrow');
  const title = fechamento.querySelector('.section-heading h2');
  const intro = fechamento.querySelector('.section-heading > p:last-child');

  if (eyebrow) eyebrow.textContent = 'Fechamento';
  if (title) title.textContent = 'O que acontece quando executamos um programa?';
  if (intro) {
    intro.textContent = 'A resposta pode ser descrita agora de forma mais precisa, relacionando código, runtime, sistema operacional e hardware.';
  }

  const closingGrid = fechamento.querySelector('.closing-grid');
  if (closingGrid) {
    closingGrid.innerHTML = `
      <article class="summary-card">
        <h3>Síntese da aula</h3>
        <p>O código-fonte não executa sozinho nem acessa diretamente todos os recursos do computador. O runtime executa o programa dentro de um processo gerenciado pelo sistema operacional. Durante essa execução, o processo usa memória, recebe tempo de CPU e solicita serviços do SO para acessar arquivos, terminal e outros dispositivos.</p>
        <ul>
          <li><strong>Aplicação e runtime:</strong> expressam a lógica do programa e conduzem sua execução.</li>
          <li><strong>Sistema operacional:</strong> cria e gerencia o processo e controla o acesso aos recursos.</li>
          <li><strong>Hardware:</strong> realiza fisicamente as operações de processamento, memória, armazenamento e entrada/saída.</li>
        </ul>
        <p><strong>Próxima pergunta:</strong> se a CPU executa instruções, como CPU, memória e entrada/saída se organizam para que isso aconteça?</p>
      </article>
    `;
    closingGrid.style.gridTemplateColumns = '1fr';
  }
};

const addAula02References = () => {
  if (!isAula02 || document.querySelector('#referencias')) return;

  const main = document.querySelector('main#conteudo');
  const fechamento = document.querySelector('#fechamento');
  if (!main) return;

  const referencias = document.createElement('section');
  referencias.className = 'section';
  referencias.id = 'referencias';
  referencias.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Referências</p>
        <h2>Referências bibliográficas</h2>
        <p>Principais obras utilizadas como base conceitual para os conteúdos desta aula e para o desenvolvimento da disciplina.</p>
      </div>
      <div style="display:grid;gap:16px;border-top:1px solid var(--line);padding-top:18px">
        <p style="margin:0"><strong>STALLINGS, William.</strong> Arquitetura e organização de computadores: projetando com foco em desempenho. 11. ed. Porto Alegre: Bookman, 2024.</p>
        <p style="margin:0"><strong>SILVA, Luiz Ricardo Mantovani da.</strong> Organização e arquitetura de computadores: uma jornada do fundamental ao inovador. Rio de Janeiro: Freitas Bastos, 2023.</p>
        <p style="margin:0"><strong>TANENBAUM, Andrew Stuart; BOS, Herbert.</strong> Sistemas operacionais modernos. 5. ed. Porto Alegre: Bookman, 2024.</p>
      </div>
    </div>
  `;

  if (fechamento) fechamento.insertAdjacentElement('afterend', referencias);
  else main.appendChild(referencias);
};

const fixAula03Theme = () => {
  if (!isAula03) return;

  const oldToggle = document.querySelector('.theme-toggle');
  if (!oldToggle) return;

  const themeToggle = oldToggle.cloneNode(true);
  oldToggle.replaceWith(themeToggle);
  themeToggle.style.pointerEvents = 'auto';
  themeToggle.style.position = 'relative';
  themeToggle.style.zIndex = '120';

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('theme-dark', isDark);

    document.querySelectorAll('img[data-light-src][data-dark-src]').forEach((image) => {
      image.src = isDark ? image.dataset.darkSrc : image.dataset.lightSrc;
    });

    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo noturno');

    const icon = themeToggle.querySelector('.theme-icon');
    const text = themeToggle.querySelector('.theme-text');
    if (icon) icon.textContent = isDark ? '☀' : '☾';
    if (text) text.textContent = isDark ? 'Modo claro' : 'Modo noturno';
  };

  const savedTheme = localStorage.getItem('arquitetura-so-theme');
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('arquitetura-so-theme', nextTheme);
    applyTheme(nextTheme);
  });
};

const improveAula03Add21Inquiry = () => {
  if (!isAula03) return;

  const inquiry = document.querySelector('#ciclo .inquiry');
  if (!inquiry) return;

  inquiry.innerHTML = `
    <div class="inquiry-head">
      <div>
        <span class="inquiry-kicker">Antes do Logisim</span>
        <h3>Rastreie a instrução <code>ADD 21</code></h3>
      </div>
      <span class="inquiry-tag">instrução → operando → resultado</span>
    </div>
    <div class="inquiry-body" style="grid-template-columns:1fr">
      <div>
        <p>Use a máquina didática e a tabela de memória acima como referência. A ideia é acompanhar o que muda desde a busca da instrução até o resultado da soma.</p>
        <ol class="prompt-list">
          <li><strong>Localização da instrução:</strong> em qual endereço da memória está <code>ADD 21</code>? Antes da busca, qual registrador indica onde está a próxima instrução?</li>
          <li><strong>Busca e decodificação:</strong> depois que <code>ADD 21</code> é buscada, em qual registrador a instrução corrente fica disponível para que a CPU identifique a operação a executar?</li>
          <li><strong>Localização do operando:</strong> o número <code>21</code> da instrução representa o valor que será somado ou um endereço? Consulte a tabela e identifique qual valor está armazenado nessa posição.</li>
          <li><strong>Execução:</strong> antes de executar <code>ADD 21</code>, o acumulador contém <code>7</code>. Qual componente da CPU realiza a soma <code>7 + 5</code> e qual passa a ser o valor do acumulador?</li>
          <li><strong>O que muda e o que permanece:</strong> após <code>ADD 21</code>, quais valores da máquina foram alterados? O conteúdo do endereço <code>21</code> mudou? E o endereço <code>22</code> já recebeu o resultado?</li>
          <li><strong>Continuidade da execução:</strong> concluída a soma, para qual endereço o PC deve apontar e qual será a próxima instrução da sequência?</li>
        </ol>
      </div>
    </div>
  `;
};

const loadAula02Clean = () => {
  if (!isAula02 || document.querySelector('script[data-aula02-clean]')) return;
  const lessonScript = document.createElement('script');
  lessonScript.src = 'aula-02-clean.js';
  lessonScript.defer = true;
  lessonScript.dataset.aula02Clean = 'true';
  document.head.appendChild(lessonScript);
};

const loadAula02AprofundamentoClean = () => {
  if (!isAula02Aprofundamento || document.querySelector('script[data-aula02-aprofundamento-clean]')) return;
  const studyScript = document.createElement('script');
  studyScript.src = 'aula-02-aprofundamento-clean.js';
  studyScript.defer = true;
  studyScript.dataset.aula02AprofundamentoClean = 'true';
  document.head.appendChild(studyScript);
};

const loadAula03Clean = () => {
  if (!isAula03 || document.querySelector('script[data-aula03-clean]')) return;
  const aula03Script = document.createElement('script');
  aula03Script.src = 'aula-03-clean.js';
  aula03Script.defer = true;
  aula03Script.dataset.aula03Clean = 'true';
  document.head.appendChild(aula03Script);
};

if (isAula03) {
  fixAula03Theme();
  improveAula03Add21Inquiry();
  loadAula03Clean();
  return;
}

const baseScript = document.createElement('script');
baseScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@e8a8a5618b8cac11bc3d40439a9d608480c81b8f/script.js';
baseScript.defer = true;

const preparePages = () => {
  improveAula02Register();
  improveAula02Closing();
  addAula02References();
  loadAula02Clean();
  loadAula02AprofundamentoClean();
};

baseScript.addEventListener('load', preparePages);
baseScript.addEventListener('error', preparePages);
document.head.appendChild(baseScript);
})();