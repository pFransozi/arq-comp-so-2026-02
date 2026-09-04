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
