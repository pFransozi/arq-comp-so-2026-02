(() => {
  if (!document.body.classList.contains('lesson-page')) return;
  if (document.body.dataset.cleanLayoutReady === 'true') return;
  document.body.dataset.cleanLayoutReady = 'true';
  document.body.classList.add('lesson-clean');

  const main = document.querySelector('main#conteudo');
  if (!main) return;

  const guidingQuestion = main.querySelector('#inicio .guiding-card blockquote');
  if (guidingQuestion) {
    guidingQuestion.textContent = 'O que acontece entre clicar em “executar” e o computador produzir um resultado?';
  }

  const lessonPathSection = main.querySelector('#percurso');
  lessonPathSection?.remove();
  main.querySelector('#inicio .hero-actions a[href="#percurso"]')?.remove();

  const exploratoryBlock = main.querySelector('#aquecimento .warmup');
  if (exploratoryBlock) {
    const eyebrow = exploratoryBlock.querySelector('.eyebrow');
    const title = exploratoryBlock.querySelector('h2');
    const intro = exploratoryBlock.querySelector('p:not(.eyebrow)');

    if (eyebrow) eyebrow.textContent = 'Perguntas exploratórias';
    if (title) title.textContent = 'O que acontece durante a execução de um programa?';
    if (intro) {
      intro.textContent = 'Use estas perguntas para organizar uma primeira explicação sobre o que acontece quando um programa é executado.';
    }
  }

  const layerInquiry = main.querySelector('#camadas .inquiry');
  if (layerInquiry) {
    layerInquiry.querySelector('.teacher-note')?.remove();
    layerInquiry.querySelector('.worksheet')?.remove();

    const intro = layerInquiry.querySelector('.inquiry-body > div > p');
    if (intro) {
      intro.textContent = 'Escolha uma aplicação que você conhece e uma ação específica, como abrir um arquivo, salvar um documento ou enviar uma mensagem. A partir dessa ação, descreva o caminho entre aplicação, runtime, sistema operacional e hardware.';
    }

    const questions = layerInquiry.querySelectorAll('.prompt-list li');
    if (questions[0]) {
      questions[0].innerHTML = '<strong>Aplicação:</strong> qual parte da ação é responsabilidade da aplicação? Que dados ela recebe, transforma ou produz?';
    }
    if (questions[1]) {
      questions[1].innerHTML = '<strong>Sistema operacional:</strong> de que serviço do SO essa ação depende? Pense em arquivos, processos, memória, rede ou dispositivos e explique a função desse serviço.';
    }
    if (questions[2]) {
      questions[2].innerHTML = '<strong>Hardware:</strong> que recurso físico é mobilizado? Relacione CPU, memória, armazenamento, rede ou periféricos à ação escolhida.';
    }
    if (questions[3]) {
      questions[3].innerHTML = '<strong>Evidência:</strong> que rastro observável poderia sustentar sua explicação? Indique o que você observaria em um arquivo, log, processo, métrica ou ferramenta de monitoramento e o que isso confirmaria.';
    }

    const body = layerInquiry.querySelector('.inquiry-body');
    if (body) body.style.gridTemplateColumns = '1fr';
  }

  const executionSection = main.querySelector('#execucao');
  if (executionSection) {
    const headingEyebrow = executionSection.querySelector('.section-heading .eyebrow');
    const headingTitle = executionSection.querySelector('.section-heading h2');
    const headingIntro = executionSection.querySelector('.section-heading > p:last-child');

    if (headingEyebrow) headingEyebrow.textContent = 'Percurso de execução';
    if (headingTitle) headingTitle.textContent = 'Do código ao resultado observável';
    if (headingIntro) {
      headingIntro.textContent = 'Vamos acompanhar um programa simples e separar o que pertence ao código, ao runtime, ao sistema operacional e ao hardware.';
    }

    const executionInquiry = executionSection.querySelector('.execution-inquiry');
    if (executionInquiry) {
      executionInquiry.innerHTML = `
        <div class="inquiry-head">
          <div>
            <span class="inquiry-kicker">Leitura orientada</span>
            <h3>Leia, preveja, execute e explique</h3>
          </div>
          <span class="inquiry-tag">Código → execução → efeitos</span>
        </div>

        <div class="code-investigation-grid execution-clean-code">
          <div class="code-panel" aria-label="Exemplo de código Python para investigação">
            <div class="code-panel-head">
              <span>exemplo_fluxo.py</span>
              <span>Python</span>
            </div>
            <pre><code>dados = [4, 7, 2, 9]

total = 0

for valor in dados:
    total += valor * valor

with open("resultado.txt", "w", encoding="utf-8") as arquivo:
    arquivo.write(str(total))

print("Resultado:", total)</code></pre>
          </div>

          <div class="research-brief execution-clean-preview">
            <span class="research-label">Antes de executar</span>
            <h4>Preveja o que será produzido</h4>
            <p>Leia o programa sem executá-lo e tente antecipar seus efeitos.</p>
            <ol class="prompt-list">
              <li>Qual valor deve aparecer no terminal?</li>
              <li>Qual arquivo deve ser criado e o que ele deve conter?</li>
              <li>Quais recursos do computador precisarão participar para que isso aconteça?</li>
            </ol>
          </div>
        </div>

        <div class="research-questions" aria-labelledby="questoes-fluxo">
          <div class="research-questions-head">
            <span>Depois da execução</span>
            <h4 id="questoes-fluxo">Explique o caminho percorrido</h4>
          </div>
          <ol>
            <li><span>01</span><p><strong>Antes da execução:</strong> onde estavam o arquivo Python e os dados escritos no código?</p></li>
            <li><span>02</span><p><strong>Runtime:</strong> ao executar <code>python exemplo_fluxo.py</code>, qual programa passa a interpretar e executar esse código?</p></li>
            <li><span>03</span><p><strong>Sistema operacional:</strong> o que precisa ser disponibilizado para a execução acontecer? Considere processo, memória e tempo de CPU.</p></li>
            <li><span>04</span><p><strong>Memória e CPU:</strong> durante o cálculo, onde ficam valores como <code>dados</code> e <code>total</code>, e qual componente realiza as operações de soma e multiplicação?</p></li>
            <li><span>05</span><p><strong>Arquivos e terminal:</strong> quando o código executa <code>open(...)</code>, <code>write(...)</code> e <code>print(...)</code>, ele acessa diretamente os dispositivos ou utiliza serviços oferecidos pelo sistema operacional?</p></li>
            <li><span>06</span><p><strong>Evidências:</strong> quais efeitos podem ser observados depois da execução e como eles se relacionam às ações realizadas pelo programa?</p></li>
          </ol>
        </div>
      `;
    }

    const executionSynthesis = executionSection.querySelector('.execution-synthesis');
    if (executionSynthesis) {
      executionSynthesis.innerHTML = `
        <div class="section-heading compact-heading">
          <p class="eyebrow">Síntese</p>
          <h3>Um modelo de alto nível</h3>
          <p>O código-fonte não vai diretamente para a CPU. O interpretador executa dentro de um processo gerenciado pelo sistema operacional; durante essa execução, o processo usa memória, recebe tempo de CPU e solicita serviços para acessar arquivos e terminal.</p>
        </div>

        <div class="execution-clean-model" aria-label="Modelo de alto nível da execução de um programa Python">
          <div class="execution-clean-source">
            <small>Antes</small>
            <strong>Arquivo Python</strong>
            <span>Código-fonte armazenado.</span>
          </div>
          <div class="execution-clean-arrow" aria-hidden="true">→</div>
          <div class="execution-clean-core">
            <div class="execution-clean-process">
              <small>Durante</small>
              <strong>Interpretador Python em um processo</strong>
              <span>O sistema operacional cria e gerencia o contexto de execução.</span>
            </div>
            <div class="execution-clean-resources">
              <div><strong>Memória</strong><span>Objetos e variáveis.</span></div>
              <div><strong>CPU</strong><span>Executa as operações.</span></div>
              <div><strong>Serviços do SO</strong><span>Arquivos e terminal.</span></div>
            </div>
            <div class="execution-clean-results">
              <span>resultado.txt</span>
              <span>saída no terminal</span>
            </div>
          </div>
        </div>
      `;
    }

    const cleanExecutionStyle = document.createElement('style');
    cleanExecutionStyle.textContent = `
      body.lesson-clean #execucao .execution-clean-code {
        align-items:stretch;
      }
      body.lesson-clean #execucao .execution-clean-preview {
        justify-content:flex-start;
        padding:4px 0;
      }
      body.lesson-clean #execucao .execution-clean-preview .prompt-list {
        margin:8px 0 0;
        padding-left:1.2rem;
      }
      body.lesson-clean #execucao .execution-clean-preview .prompt-list li + li {
        margin-top:.55rem;
      }
      body.lesson-clean #execucao .research-questions {
        padding:26px 0 4px;
      }
      body.lesson-clean #execucao .research-questions ol {
        grid-template-columns:1fr 1fr;
        gap:0 24px;
        border-top:1px solid var(--clean-line);
      }
      body.lesson-clean #execucao .research-questions li {
        min-height:auto;
        padding:15px 0;
        border:0;
        border-bottom:1px solid var(--clean-line);
        border-radius:0;
        background:transparent;
      }
      body.lesson-clean #execucao .research-questions li > span {
        width:30px;
        height:30px;
        border-radius:50%;
        background:var(--clean-accent);
      }
      body.lesson-clean #execucao .execution-synthesis {
        margin-top:36px;
      }
      body.lesson-clean #execucao .execution-clean-model {
        display:grid;
        grid-template-columns:minmax(170px,.7fr) auto minmax(0,1.9fr);
        gap:18px;
        align-items:center;
        margin-top:20px;
      }
      body.lesson-clean #execucao .execution-clean-source,
      body.lesson-clean #execucao .execution-clean-process,
      body.lesson-clean #execucao .execution-clean-resources > div {
        border:1px solid var(--clean-line);
        border-radius:8px;
        background:transparent;
      }
      body.lesson-clean #execucao .execution-clean-source {
        padding:18px;
      }
      body.lesson-clean #execucao .execution-clean-source small,
      body.lesson-clean #execucao .execution-clean-process small {
        display:block;
        margin-bottom:5px;
        color:var(--clean-accent);
        font-size:.72rem;
        font-weight:800;
        letter-spacing:.08em;
        text-transform:uppercase;
      }
      body.lesson-clean #execucao .execution-clean-source strong,
      body.lesson-clean #execucao .execution-clean-process strong,
      body.lesson-clean #execucao .execution-clean-resources strong {
        display:block;
        color:var(--clean-text);
      }
      body.lesson-clean #execucao .execution-clean-source span,
      body.lesson-clean #execucao .execution-clean-process span,
      body.lesson-clean #execucao .execution-clean-resources span {
        display:block;
        margin-top:4px;
        color:var(--clean-muted);
        font-size:.88rem;
      }
      body.lesson-clean #execucao .execution-clean-arrow {
        color:var(--clean-accent);
        font-size:1.5rem;
        font-weight:800;
      }
      body.lesson-clean #execucao .execution-clean-core {
        padding-left:18px;
        border-left:3px solid var(--clean-accent);
      }
      body.lesson-clean #execucao .execution-clean-process {
        padding:18px;
      }
      body.lesson-clean #execucao .execution-clean-resources {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:10px;
        margin-top:10px;
      }
      body.lesson-clean #execucao .execution-clean-resources > div {
        padding:14px;
      }
      body.lesson-clean #execucao .execution-clean-results {
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        margin-top:12px;
      }
      body.lesson-clean #execucao .execution-clean-results span {
        padding:.35rem .55rem;
        border-radius:999px;
        background:var(--clean-accent-soft);
        color:var(--clean-accent);
        font-size:.8rem;
        font-weight:750;
      }
      @media (max-width:850px) {
        body.lesson-clean #execucao .research-questions ol {
          grid-template-columns:1fr;
        }
        body.lesson-clean #execucao .execution-clean-model {
          grid-template-columns:1fr;
        }
        body.lesson-clean #execucao .execution-clean-arrow {
          transform:rotate(90deg);
          justify-self:center;
        }
        body.lesson-clean #execucao .execution-clean-resources {
          grid-template-columns:1fr;
        }
      }
    `;
    document.head.appendChild(cleanExecutionStyle);
  }

  const sections = [...main.querySelectorAll(':scope > section[id]')]
    .filter((section) => section.id !== 'inicio' && section.isConnected);

  const getSectionLabel = (section) => {
    const heading = section.querySelector('.section-heading h2, .warmup h2, h2');
    if (heading?.textContent.trim()) return heading.textContent.trim();
    return section.id.replaceAll('-', ' ');
  };

  const shell = document.createElement('div');
  shell.className = 'lesson-shell lesson-page-grid';
  main.parentNode.insertBefore(shell, main);
  shell.appendChild(main);

  const toc = document.createElement('aside');
  toc.className = 'lesson-toc';
  toc.setAttribute('aria-label', 'Índice desta aula');

  const tocHead = document.createElement('div');
  tocHead.className = 'lesson-toc-head';

  const tocLabel = document.createElement('span');
  tocLabel.className = 'lesson-toc-label';
  tocLabel.textContent = 'Nesta aula';

  const tocToggle = document.createElement('button');
  tocToggle.className = 'lesson-toc-toggle';
  tocToggle.type = 'button';
  tocToggle.setAttribute('aria-expanded', 'true');
  tocToggle.setAttribute('aria-label', 'Recolher índice');
  tocToggle.title = 'Recolher índice';
  tocToggle.textContent = '›';

  tocHead.append(tocLabel, tocToggle);

  const tocNav = document.createElement('nav');
  const tocLinks = sections.map((section) => {
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = getSectionLabel(section);
    tocNav.appendChild(link);
    return link;
  });

  const currentDot = document.createElement('span');
  currentDot.className = 'lesson-toc-current';
  currentDot.setAttribute('aria-hidden', 'true');

  toc.append(tocHead, tocNav, currentDot);
  shell.appendChild(toc);

  tocToggle.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('toc-collapsed');
    tocToggle.setAttribute('aria-expanded', String(!collapsed));
    tocToggle.setAttribute('aria-label', collapsed ? 'Expandir índice' : 'Recolher índice');
    tocToggle.title = collapsed ? 'Expandir índice' : 'Recolher índice';
  });

  const heroContainer = main.querySelector('#inicio .container');
  if (heroContainer && sections.length) {
    const mobileToc = document.createElement('details');
    mobileToc.className = 'lesson-mobile-toc';

    const summary = document.createElement('summary');
    summary.textContent = 'Nesta aula';

    const mobileNav = document.createElement('nav');
    sections.forEach((section) => {
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      link.textContent = getSectionLabel(section);
      mobileNav.appendChild(link);
    });

    mobileToc.append(summary, mobileNav);
    heroContainer.appendChild(mobileToc);
  }

  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, {
      rootMargin: '-20% 0px -68% 0px',
      threshold: [0, .1, .5]
    });
    sections.forEach((section) => observer.observe(section));
  } else if (sections[0]) {
    setActive(sections[0].id);
  }
})();
