(() => {
document.querySelector('.semester-measurements')?.remove();
document.querySelector('#ia-first .method-rules')?.remove();
document.querySelector('#aula-atual .eyebrow')?.remove();

const isAula02 = /(?:^|\/)aula-02\.html$/.test(window.location.pathname);
const isAula02Aprofundamento = /(?:^|\/)aula-02-aprofundamento\.html$/.test(window.location.pathname);
const isAula03 = /(?:^|\/)aula-03\.html$/.test(window.location.pathname);
const isAula03Aprofundamento = /(?:^|\/)aula-03-aprofundamento\.html$/.test(window.location.pathname);
const isAula06 = /(?:^|\/)aula-06\.html$/.test(window.location.pathname);

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

if (isAula03Aprofundamento) {
  document.body.classList.add('study-clean');
  const study03Style = document.createElement('link');
  study03Style.rel = 'stylesheet';
  study03Style.href = 'aula-03-aprofundamento-clean.css';
  document.head.appendChild(study03Style);
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

const improveAula03AprofundamentoInterconexao = () => {
  if (!isAula03Aprofundamento) return;

  const section = document.querySelector('#interconexao');
  const container = section?.querySelector('.container');
  if (!container) return;

  container.innerHTML = `
    <div class="study-heading">
      <p class="study-kicker">4 · Comunicação interna</p>
      <h2>Como CPU, memória e E/S trocam informação</h2>
      <p>A interconexão é a infraestrutura que permite aos componentes do computador conversar entre si. O barramento compartilhado é um modelo clássico e didático para entender essa comunicação, mas não é a única forma de organizar esses caminhos.</p>
    </div>

    <div class="study-grid">
      <div class="study-prose">
        <h3>Uma transferência precisa responder a três perguntas</h3>
        <p>Quando a CPU acessa a memória ou um módulo de E/S, não basta transportar um valor. O sistema também precisa indicar <strong>onde</strong> a transferência deve ocorrer e <strong>qual operação</strong> está sendo solicitada.</p>

        <div class="bus-stack">
          <div class="bus">
            <strong>Dados</strong>
            <span><strong>O que está sendo transferido?</strong> Instruções, operandos e resultados circulam por essas linhas ou caminhos.</span>
          </div>
          <div class="bus">
            <strong>Endereços</strong>
            <span><strong>Onde a operação deve ocorrer?</strong> O endereço identifica uma posição de memória ou um dispositivo/porta associado à transferência.</span>
          </div>
          <div class="bus">
            <strong>Controle</strong>
            <span><strong>O que deve ser feito e quando?</strong> Sinais de leitura, escrita, confirmação e temporização coordenam o uso dos caminhos compartilhados.</span>
          </div>
        </div>
      </div>

      <div class="study-stack">
        <article class="study-card">
          <strong>Exemplo · ler o conteúdo do endereço 20</strong>
          <p>Retome os registradores da seção anterior:</p>
          <ol style="margin:.7rem 0 0;padding-left:1.15rem;color:var(--muted)">
            <li>o <strong>MAR</strong> mantém o endereço <code>20</code>;</li>
            <li>o endereço é apresentado à memória;</li>
            <li>o controle indica uma operação de <strong>leitura</strong>;</li>
            <li>a memória coloca o conteúdo solicitado no caminho de <strong>dados</strong>;</li>
            <li>o valor recebido pode ser mantido temporariamente no <strong>MBR</strong>.</li>
          </ol>
          <p style="margin-top:.8rem;margin-bottom:0">Assim, endereço, controle e dado não são três assuntos separados: eles participam da <strong>mesma transferência</strong>.</p>
        </article>
      </div>
    </div>

    <div class="study-prose" style="margin-top:2rem">
      <h3>O que muda em um barramento compartilhado?</h3>
      <p>Em um barramento compartilhado, vários componentes utilizam um conjunto comum de caminhos. Isso torna a organização flexível, mas cria uma consequência: <strong>é preciso coordenar quem pode usar o barramento em cada momento</strong>. Quando a demanda cresce, a capacidade dessa comunicação também pode limitar o desempenho do sistema.</p>

      <div class="mini-grid">
        <article class="mini-card">
          <span class="tag">Dados</span>
          <h4>Largura da transferência</h4>
          <p>Quanto mais bits podem ser transportados em uma transferência, maior pode ser a quantidade de informação movimentada por acesso, desde que os demais componentes consigam acompanhar.</p>
        </article>
        <article class="mini-card">
          <span class="tag">Endereços</span>
          <h4>Quantidade de posições identificáveis</h4>
          <p>A quantidade de bits usada para representar endereços determina quantas posições distintas podem ser identificadas pelo sistema.</p>
        </article>
      </div>

      <h3>Interconexão não significa necessariamente “um único barramento”</h3>
      <p>Máquinas atuais combinam diferentes soluções: barramentos dedicados, ligações ponto a ponto, controladores integrados e interconexões especializadas. Essas alternativas reduzem a necessidade de todos os componentes disputarem exatamente o mesmo caminho.</p>
      <p>Mesmo quando a implementação física deixa de parecer um barramento clássico, a separação entre <strong>conteúdo transferido, destino/origem e controle da operação</strong> continua sendo uma boa forma de raciocinar sobre a comunicação interna.</p>
    </div>

    <div class="boundary">
      <strong>Ideia central</strong>
      <p>O desempenho de um computador não depende apenas da velocidade com que a CPU calcula. A execução também depende de quão rapidamente instruções, dados e comandos conseguem circular entre processador, memória e E/S.</p>
    </div>
  `;
};

const improveAula06Hierarchy = () => {
  if (!isAula06) return;

  const section = document.querySelector('#hierarquia');
  const container = section?.querySelector('.container');
  const grid = section?.querySelector('.function-grid');
  if (!container || !grid || section.dataset.hierarchyEnhanced === 'true') return;
  section.dataset.hierarchyEnhanced = 'true';

  const intro = section.querySelector('.section-heading > p:last-child');
  if (intro) {
    intro.textContent = 'Durante a execução, a aplicação depende de dados que podem estar em diferentes níveis de armazenamento. Quanto mais próximo o dado estiver do processador, menor tende a ser o tempo de acesso. Em compensação, a capacidade disponível costuma ser menor.';
  }

  const style = document.createElement('style');
  style.dataset.aula06Hierarchy = 'true';
  style.textContent = `
    body.aula03-clean #hierarquia .hierarchy-figure{margin:24px 0 28px;padding:18px;border:1px solid var(--clean-line);border-radius:8px;background:transparent}
    body.aula03-clean #hierarquia .hierarchy-figure svg{display:block;width:100%;height:auto;max-height:520px}
    body.aula03-clean #hierarquia .hierarchy-caption{margin:12px 0 0;color:var(--clean-muted);font-size:.94rem;line-height:1.6}
    body.aula03-clean #hierarquia .function-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:18px}
    body.aula03-clean #hierarquia .function-card{padding:16px 0;border-width:1px 0 0;border-radius:0}
    body.aula03-clean #hierarquia .function-card span{display:block;margin-bottom:8px}
    body.aula03-clean #hierarquia .function-card h3{margin:0 0 8px;font-size:1rem}
    body.aula03-clean #hierarquia .function-card p{font-size:1rem}
    body.aula03-clean #hierarquia .precision-note{margin-top:22px}
    @media(max-width:760px){
      body.aula03-clean #hierarquia .hierarchy-figure{padding:10px}
      body.aula03-clean #hierarquia .hierarchy-figure svg{min-width:720px}
      body.aula03-clean #hierarquia .hierarchy-figure{overflow-x:auto}
      body.aula03-clean #hierarquia .function-grid{grid-template-columns:1fr}
    }
  `;
  document.head.appendChild(style);

  const figure = document.createElement('div');
  figure.className = 'hierarchy-figure';
  figure.setAttribute('aria-label', 'Diagrama da hierarquia de memória e armazenamento');
  figure.innerHTML = `
    <svg viewBox="0 0 980 520" role="img" aria-labelledby="hierarquiaTitulo hierarquiaDesc">
      <title id="hierarquiaTitulo">Hierarquia de memória e armazenamento</title>
      <desc id="hierarquiaDesc">Diagrama vertical com CPU no topo, seguida de registradores, cache, RAM e armazenamento. Nos níveis superiores, o acesso tende a ser mais rápido e a capacidade menor. Nos níveis inferiores, a capacidade aumenta e o custo de acesso tende a ser maior.</desc>
      <defs>
        <marker id="hierarchy-arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="var(--clean-line)"></path>
        </marker>
      </defs>
      <style>
        .h-box{fill:var(--clean-surface);stroke:var(--clean-line);stroke-width:1.4}
        .h-box-accent{fill:var(--clean-accent-soft);stroke:var(--clean-accent);stroke-width:1.4}
        .h-text{fill:var(--clean-text);font:600 18px Inter,system-ui,sans-serif}
        .h-sub{fill:var(--clean-muted);font:400 14px Inter,system-ui,sans-serif}
        .h-label{fill:var(--clean-accent);font:700 13px Inter,system-ui,sans-serif;letter-spacing:.08em}
        .h-arrow{stroke:var(--clean-line);stroke-width:2.4;fill:none;marker-end:url(#hierarchy-arrow)}
        .h-guide{fill:var(--clean-accent-soft);stroke:var(--clean-accent);stroke-width:1.1}
        .h-guide-text{fill:var(--clean-text);font:600 14px Inter,system-ui,sans-serif}
      </style>

      <rect class="h-guide" x="58" y="24" rx="8" ry="8" width="282" height="42"></rect>
      <text class="h-guide-text" x="199" y="50" text-anchor="middle">↑ Mais rápido · menor capacidade</text>

      <rect class="h-box-accent" x="390" y="26" rx="10" ry="10" width="200" height="56"></rect>
      <text class="h-text" x="490" y="61" text-anchor="middle">CPU</text>
      <path class="h-arrow" d="M490 82 L490 110"></path>

      <rect class="h-box" x="340" y="110" rx="10" ry="10" width="300" height="70"></rect>
      <text class="h-label" x="490" y="136" text-anchor="middle">01</text>
      <text class="h-text" x="490" y="159" text-anchor="middle">Registradores</text>
      <text class="h-sub" x="490" y="176" text-anchor="middle">operandos e resultados imediatos</text>
      <path class="h-arrow" d="M490 180 L490 210"></path>

      <rect class="h-box" x="310" y="210" rx="10" ry="10" width="360" height="76"></rect>
      <text class="h-label" x="490" y="237" text-anchor="middle">02</text>
      <text class="h-text" x="490" y="260" text-anchor="middle">Cache</text>
      <text class="h-sub" x="490" y="279" text-anchor="middle">dados e instruções com alta chance de reutilização</text>
      <path class="h-arrow" d="M490 286 L490 316"></path>

      <rect class="h-box" x="275" y="316" rx="10" ry="10" width="430" height="78"></rect>
      <text class="h-label" x="490" y="343" text-anchor="middle">03</text>
      <text class="h-text" x="490" y="366" text-anchor="middle">RAM</text>
      <text class="h-sub" x="490" y="385" text-anchor="middle">memória principal usada pela aplicação em execução</text>
      <path class="h-arrow" d="M490 394 L490 424"></path>

      <rect class="h-box" x="235" y="424" rx="10" ry="10" width="510" height="78"></rect>
      <text class="h-label" x="490" y="451" text-anchor="middle">04</text>
      <text class="h-text" x="490" y="474" text-anchor="middle">Armazenamento</text>
      <text class="h-sub" x="490" y="493" text-anchor="middle">SSD, NVMe e HDD · persistência e maior capacidade</text>

      <rect class="h-guide" x="648" y="454" rx="8" ry="8" width="282" height="42"></rect>
      <text class="h-guide-text" x="789" y="480" text-anchor="middle">↓ Mais lento · maior capacidade</text>
    </svg>
    <p class="hierarchy-caption">A hierarquia combina tecnologias com diferentes tempos de acesso e capacidades. Para o software, isso significa que o desempenho depende também de onde os dados estão e de como são acessados.</p>
  `;

  grid.insertAdjacentElement('beforebegin', figure);

  const cards = [...grid.querySelectorAll('.function-card')];
  const descriptions = [
    'Pequenos espaços internos ao processador usados para operandos e resultados imediatos durante a execução.',
    'Memória pequena e rápida que ajuda a manter próximos dados e instruções com alta chance de reutilização.',
    'Memória principal onde ficam dados e instruções necessários para a aplicação em execução.',
    'SSD, NVMe e HDD oferecem persistência e maior capacidade, mas com custo de acesso mais alto.'
  ];
  cards.forEach((card,index)=>{
    const paragraph = card.querySelector('p');
    if (paragraph && descriptions[index]) paragraph.textContent = descriptions[index];
  });

  const note = section.querySelector('.precision-note');
  if (note) {
    note.innerHTML = '<strong>Onde entra ROM/flash?</strong> Memórias não voláteis aparecem principalmente em firmware e no armazenamento persistente. Nesta aula, vamos observar sobretudo o caminho que mais afeta a execução cotidiana da aplicação: <strong>cache → RAM → armazenamento</strong>.';
  }
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

const loadAula03AprofundamentoClean = () => {
  if (!isAula03Aprofundamento || document.querySelector('script[data-aula03-aprofundamento-clean]')) return;
  const studyScript = document.createElement('script');
  studyScript.src = 'aula-03-aprofundamento-clean.js';
  studyScript.defer = true;
  studyScript.dataset.aula03AprofundamentoClean = 'true';
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
  improveAula03AprofundamentoInterconexao();
  improveAula06Hierarchy();
  loadAula02Clean();
  loadAula02AprofundamentoClean();
  loadAula03AprofundamentoClean();
};

baseScript.addEventListener('load', preparePages);
baseScript.addEventListener('error', preparePages);
document.head.appendChild(baseScript);
})();