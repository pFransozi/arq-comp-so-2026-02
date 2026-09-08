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
    body.aula03-clean.theme-dark .cpu-infographic {
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
    body.aula03-clean.theme-dark .inquiry {
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
