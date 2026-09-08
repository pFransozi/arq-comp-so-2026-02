(() => {
  if (!document.body.classList.contains('lesson-page')) return;
  if (document.body.dataset.aula03CleanReady === 'true') return;
  document.body.dataset.aula03CleanReady = 'true';
  document.body.classList.add('aula03-clean');

  const main = document.querySelector('main#conteudo');
  if (!main) return;

  /*
   * O script-base antigo injeta um bloco visual específico da Aula 03 depois
   * do CSS clean. Esse bloco reaplica cores e fundos do layout anterior e
   * acabava vencendo a cascata, sobretudo no modo escuro. Mantemos as
   * transformações de conteúdo feitas pelo script-base, mas removemos apenas
   * esse bloco visual legado.
   */
  [...document.head.querySelectorAll('style')].forEach((style) => {
    const css = style.textContent || '';
    if (
      css.includes('body.theme-dark .organization-infographic') &&
      css.includes('.stored-node.memory') &&
      css.includes('.cpu-infographic')
    ) {
      style.remove();
    }
  });

  const visualFixes = document.createElement('style');
  visualFixes.dataset.aula03VisualFixes = 'true';
  visualFixes.textContent = `
    body.aula03-clean {
      --instruction:#5268c9;
      --instruction-soft:#eef1ff;
      --data:#b86127;
      --data-soft:#fff1e7;
    }

    body.aula03-clean.theme-dark {
      --instruction:#9aabff;
      --instruction-soft:#202844;
      --data:#f0ad73;
      --data-soft:#332318;
      background:var(--clean-bg) !important;
      color:var(--clean-text) !important;
    }

    body.aula03-clean .memory-row.instr code {
      color:var(--instruction) !important;
    }
    body.aula03-clean .memory-row.data code {
      color:var(--data) !important;
    }
    body.aula03-clean .stored-type.instruction {
      border-left-color:var(--instruction) !important;
    }
    body.aula03-clean .stored-type.data {
      border-left-color:var(--data) !important;
    }
    body.aula03-clean .stored-type.instruction .eyebrow {
      color:var(--instruction) !important;
    }
    body.aula03-clean .stored-type.data .eyebrow {
      color:var(--data) !important;
    }
    body.aula03-clean .stored-legend span:first-child {
      background:var(--instruction-soft) !important;
      color:var(--instruction) !important;
    }
    body.aula03-clean .stored-legend span:last-child {
      background:var(--data-soft) !important;
      color:var(--data) !important;
    }

    body.aula03-clean .organization-infographic,
    body.aula03-clean .cpu-infographic {
      margin:1.6rem 0 0;
      overflow:hidden;
      border:1px solid var(--clean-line);
      border-radius:8px;
      background:var(--clean-surface);
      box-shadow:none;
    }
    body.aula03-clean .organization-infographic img,
    body.aula03-clean .cpu-infographic img {
      display:block;
      width:100%;
      height:auto;
    }

    body.aula03-clean .architecture-tradeoff {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:14px;
      margin-top:22px;
    }
    body.aula03-clean .tradeoff-card {
      padding:17px 18px;
      border:1px solid var(--clean-line);
      border-radius:8px;
      background:transparent;
    }
    body.aula03-clean .tradeoff-card h3 {
      margin:0 0 10px;
      font-size:1rem;
    }
    body.aula03-clean .tradeoff-card p {
      margin:0 0 9px;
      font-size:.93rem;
    }
    body.aula03-clean .tradeoff-card p:last-child { margin-bottom:0; }
    body.aula03-clean .tradeoff-card strong { color:var(--clean-text); }
    body.aula03-clean .modern-architecture-note {
      margin-top:22px;
      padding:17px 19px;
      border-left:3px solid var(--clean-accent);
      background:var(--clean-surface);
    }
    body.aula03-clean .modern-architecture-note h3 {
      margin:0 0 8px;
      font-size:1.08rem;
    }
    body.aula03-clean .modern-architecture-note p:last-child { margin-bottom:0; }

    body.aula03-clean.theme-dark .site-header,
    body.aula03-clean.theme-dark .inquiry-head,
    body.aula03-clean.theme-dark .stored-definition,
    body.aula03-clean.theme-dark .stored-callout,
    body.aula03-clean.theme-dark .bottleneck,
    body.aula03-clean.theme-dark .state-box,
    body.aula03-clean.theme-dark .cpu-part,
    body.aula03-clean.theme-dark .arch-memory div,
    body.aula03-clean.theme-dark .memory-row.header > *,
    body.aula03-clean.theme-dark .memory-row > strong:first-child,
    body.aula03-clean.theme-dark .organization-infographic,
    body.aula03-clean.theme-dark .cpu-infographic,
    body.aula03-clean.theme-dark .modern-architecture-note {
      background:var(--clean-surface) !important;
      color:var(--clean-text) !important;
      border-color:var(--clean-line) !important;
    }

    body.aula03-clean.theme-dark .card,
    body.aula03-clean.theme-dark .function-card,
    body.aula03-clean.theme-dark .concept-card,
    body.aula03-clean.theme-dark .system-box,
    body.aula03-clean.theme-dark .cpu-diagram,
    body.aula03-clean.theme-dark .stored-node,
    body.aula03-clean.theme-dark .arch-card,
    body.aula03-clean.theme-dark .cycle-phase,
    body.aula03-clean.theme-dark .simulator,
    body.aula03-clean.theme-dark .project-step,
    body.aula03-clean.theme-dark .check-item,
    body.aula03-clean.theme-dark .execution-step,
    body.aula03-clean.theme-dark .stored-type,
    body.aula03-clean.theme-dark .memory-table,
    body.aula03-clean.theme-dark .trace-table-wrap,
    body.aula03-clean.theme-dark .record-table-wrap,
    body.aula03-clean.theme-dark .inquiry,
    body.aula03-clean.theme-dark .tradeoff-card {
      background:transparent !important;
      color:var(--clean-text) !important;
      border-color:var(--clean-line) !important;
      box-shadow:none !important;
    }

    body.aula03-clean.theme-dark .memory-row,
    body.aula03-clean.theme-dark .memory-row > *,
    body.aula03-clean.theme-dark .trace-table th,
    body.aula03-clean.theme-dark .trace-table td,
    body.aula03-clean.theme-dark .record-table th,
    body.aula03-clean.theme-dark .record-table td {
      border-color:var(--clean-line) !important;
      color:var(--clean-text);
    }

    body.aula03-clean.theme-dark .worksheet textarea,
    body.aula03-clean.theme-dark .record-table input,
    body.aula03-clean.theme-dark .record-table select,
    body.aula03-clean.theme-dark .sim-controls button:not(.primary) {
      background:var(--clean-bg) !important;
      color:var(--clean-text) !important;
      border-color:var(--clean-line) !important;
    }

    body.aula03-clean.theme-dark .bridge-question {
      background:var(--clean-accent-soft) !important;
      color:var(--clean-text) !important;
    }
    body.aula03-clean.theme-dark .precision-note {
      background:var(--amber-soft) !important;
      color:var(--clean-text) !important;
    }
    body.aula03-clean.theme-dark .sim-message,
    body.aula03-clean.theme-dark .io-chain,
    body.aula03-clean.theme-dark .resource-tags span,
    body.aula03-clean.theme-dark .skill strong,
    body.aula03-clean.theme-dark .execution-step b {
      background:var(--clean-accent-soft) !important;
      color:var(--clean-accent) !important;
    }

    body.aula03-clean.theme-dark .warmup {
      background:transparent !important;
      color:var(--clean-text) !important;
    }
    body.aula03-clean.theme-dark .question-cloud div,
    body.aula03-clean.theme-dark .concept-item,
    body.aula03-clean.theme-dark .bus-line {
      background:transparent !important;
      color:var(--clean-text) !important;
      border-color:var(--clean-line) !important;
    }

    @media(max-width:760px){
      body.aula03-clean .architecture-tradeoff{grid-template-columns:1fr}
    }
  `;
  document.head.appendChild(visualFixes);

  const lessonPathSection = main.querySelector('#percurso');
  lessonPathSection?.remove();
  main.querySelector('#inicio .hero-actions a[href="#percurso"]')?.remove();

  const cpuContextCard = main.querySelector('#cpu .cpu-zoom > article.card');
  if (cpuContextCard) {
    cpuContextCard.innerHTML = `
      <h3>O que importa neste momento?</h3>
      <p>Para acompanhar o ciclo de instrução, não precisamos abrir toda a microarquitetura da CPU. Basta compreender que ela busca instruções, identifica a operação, movimenta dados e executa o trabalho indicado.</p>
      <p>Os registradores <strong>PC</strong> e <strong>IR</strong> aparecerão apenas para responder duas perguntas concretas: <strong>onde está a próxima instrução?</strong> e <strong>qual instrução está sendo tratada agora?</strong></p>
      <p style="margin-bottom:0"><strong>Mais adiante:</strong> clock, registradores específicos, caminhos internos, micro-operações e pipeline serão estudados em um nível de detalhe maior.</p>
    `;
  }

  const storedDefinition = main.querySelector('#programa .stored-definition');
  if (storedDefinition) {
    const eyebrow = storedDefinition.querySelector('.eyebrow');
    const title = storedDefinition.querySelector('h3');
    const text = storedDefinition.querySelector('p');

    if (eyebrow) eyebrow.textContent = 'Ideia-chave';
    if (title) title.textContent = 'O princípio do programa armazenado';
    if (text) {
      text.textContent = 'Uma ideia fundamental dos computadores de propósito geral é manter na memória não apenas os dados utilizados durante a execução, mas também as instruções que orientam o processamento. Isso permite que a CPU busque, interprete e execute uma sequência de operações armazenadas. A máquina didática a seguir simplifica esse princípio para acompanharmos uma execução passo a passo.';
    }
  }

  const didacticMachineIntro = main.querySelector('#programa .example-heading > div:first-child > p:not(.eyebrow)');
  if (didacticMachineIntro) {
    didacticMachineIntro.textContent = 'Não estamos representando um processador real. As instruções LOAD, ADD e STORE formam apenas uma linguagem didática simplificada. Elas servem para mostrar que uma instrução indica uma operação e, quando necessário, onde buscar ou guardar um dado.';
  }

  const legend = main.querySelectorAll('#programa .stored-legend span');
  if (legend[0]) legend[0].textContent = 'Azul · instrução';
  if (legend[1]) legend[1].textContent = 'Laranja · dado';

  const architectureSection = main.querySelector('#arquiteturas');
  if (architectureSection) {
    const intro = architectureSection.querySelector('.section-heading > p:last-child');
    if (intro) {
      intro.innerHTML = 'A diferença central está em <strong>como instruções e dados chegam ao processador</strong>. Não existe uma arquitetura simplesmente “melhor”: separar os caminhos pode aumentar a vazão, enquanto compartilhá-los simplifica a organização e oferece maior flexibilidade.';
    }

    const cards = architectureSection.querySelectorAll('.architecture-grid .arch-card');
    if (cards[0]) {
      const description = cards[0].querySelector('p');
      if (description) description.textContent = 'No modelo clássico, instruções e dados compartilham o mesmo espaço de memória e o mesmo caminho principal de acesso. Isso simplifica a organização e permite usar a memória de forma flexível.';
    }
    if (cards[1]) {
      const description = cards[1].querySelector('p');
      if (description) description.textContent = 'No modelo Harvard clássico, instruções e dados usam memórias e caminhos de acesso separados. A CPU pode, por exemplo, buscar a próxima instrução ao mesmo tempo em que acessa um dado.';
    }

    const oldPrecision = architectureSection.querySelector('.precision-note');
    oldPrecision?.remove();

    const grid = architectureSection.querySelector('.architecture-grid');
    if (grid && !architectureSection.querySelector('.architecture-tradeoff')) {
      grid.insertAdjacentHTML('afterend', `
        <div class="architecture-tradeoff" aria-label="Comparação entre von Neumann e Harvard">
          <article class="tradeoff-card">
            <h3>von Neumann · simplicidade e flexibilidade</h3>
            <p><strong>Vantagem:</strong> um espaço unificado facilita o uso da memória e a programação de sistemas de propósito geral.</p>
            <p><strong>Trade-off:</strong> instruções e dados podem disputar o mesmo caminho entre processador e memória.</p>
            <p><strong>Exemplos:</strong> é o modelo conceitual predominante para computadores pessoais e servidores de propósito geral.</p>
          </article>
          <article class="tradeoff-card">
            <h3>Harvard · acessos independentes</h3>
            <p><strong>Vantagem:</strong> a busca de instruções e o acesso a dados podem ocorrer em paralelo, aumentando a vazão.</p>
            <p><strong>Trade-off:</strong> exige mais caminhos e controle e pode impor espaços de memória distintos para código e dados.</p>
            <p><strong>Exemplos:</strong> aparece com frequência em microcontroladores e processadores voltados a processamento de sinais; o ARM Cortex-M3 é um exemplo apresentado por Stallings.</p>
          </article>
          <article class="tradeoff-card">
            <h3>Na prática · arquiteturas híbridas</h3>
            <p>Processadores atuais frequentemente misturam as duas ideias.</p>
            <p><strong>Exemplo:</strong> um processador pode apresentar ao software um espaço de memória unificado, mas internamente manter caches e caminhos separados para instruções e dados.</p>
            <p>Por isso, classificar um processador moderno apenas como “von Neumann” ou “Harvard” pode esconder detalhes importantes da organização interna.</p>
          </article>
        </div>
        <div class="modern-architecture-note">
          <h3>Então, onde cada modelo aparece?</h3>
          <p><strong>Como regra didática:</strong> von Neumann está associado ao computador de propósito geral e Harvard aparece bastante em sistemas embarcados e aplicações especializadas. <strong>Mas não é uma divisão rígida.</strong> Microcontroladores como o Cortex-M3 usam barramentos separados para instruções e dados, enquanto processadores modernos de PCs, servidores e smartphones frequentemente adotam uma organização chamada de <em>Harvard modificada</em>: memória logicamente unificada, mas caches de instruções e dados separadas próximas ao núcleo.</p>
        </div>
      `);
    }

    const bottleneck = architectureSection.querySelector('.bottleneck');
    if (bottleneck) {
      bottleneck.innerHTML = `
        <p class="eyebrow">O custo do caminho compartilhado</p>
        <h3>Por que falamos em gargalo de von Neumann?</h3>
        <p>No modelo clássico, a CPU precisa buscar instruções e movimentar dados pelo mesmo sistema de comunicação com a memória. Se o processador consegue trabalhar mais rápido do que esses dados chegam, ele precisa esperar. O problema não é simplesmente “a memória ser lenta”, mas a diferença entre a capacidade de processamento e a capacidade de alimentar o processador com instruções e dados.</p>
        <p style="margin-bottom:0">Separar caminhos, como no modelo Harvard, reduz parte dessa disputa, mas aumenta a complexidade da organização. Processadores modernos combinam técnicas como caches separadas, pré-busca e múltiplos níveis de memória para diminuir esse custo.</p>
      `;
    }
  }

  const sections = [...main.querySelectorAll(':scope > section[id]')]
    .filter((section) => section.id !== 'inicio' && section.isConnected);

  const getSectionLabel = (section) => {
    const heading = section.querySelector('.section-heading h2, .warmup h2, h2');
    if (heading?.textContent.trim()) return heading.textContent.trim();
    return section.id.replaceAll('-', ' ');
  };

  const shell = document.createElement('div');
  shell.className = 'aula03-shell aula03-page-grid';
  main.parentNode.insertBefore(shell, main);
  shell.appendChild(main);

  const toc = document.createElement('aside');
  toc.className = 'aula03-toc';
  toc.setAttribute('aria-label', 'Índice desta aula');

  const tocHead = document.createElement('div');
  tocHead.className = 'aula03-toc-head';

  const tocLabel = document.createElement('span');
  tocLabel.className = 'aula03-toc-label';
  tocLabel.textContent = 'Nesta aula';

  const tocToggle = document.createElement('button');
  tocToggle.className = 'aula03-toc-toggle';
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
  currentDot.className = 'aula03-toc-current';
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
    mobileToc.className = 'aula03-mobile-toc';

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
