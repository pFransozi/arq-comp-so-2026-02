(() => {
  if (!document.body.classList.contains('study-page')) return;
  if (document.body.dataset.studyCleanReady === 'true') return;
  document.body.dataset.studyCleanReady = 'true';
  document.body.classList.add('study-clean');

  const main = document.querySelector('main#conteudo');
  if (!main) return;

  const hero = main.querySelector('.study-hero');
  const tocShell = main.querySelector('.study-toc-shell');
  const sections = [...main.querySelectorAll(':scope > .study-section[id]')];
  if (!hero || !tocShell || !sections.length) return;

  const layout = document.createElement('div');
  layout.className = 'study-clean-layout';

  const content = document.createElement('div');
  content.className = 'study-clean-content';

  main.insertBefore(layout, hero);
  layout.appendChild(content);
  content.appendChild(hero);
  sections.forEach((section) => content.appendChild(section));

  const aside = document.createElement('aside');
  aside.className = 'study-clean-aside';
  aside.setAttribute('aria-label', 'Índice deste aprofundamento');

  const head = document.createElement('div');
  head.className = 'study-clean-toc-head';

  const label = document.createElement('span');
  label.className = 'study-clean-toc-label';
  label.textContent = 'Neste material';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'study-clean-toc-toggle';
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Recolher índice');
  toggle.title = 'Recolher índice';
  toggle.textContent = '›';

  head.append(label, toggle);
  aside.append(head, tocShell);

  const current = document.createElement('span');
  current.className = 'study-clean-current';
  current.setAttribute('aria-hidden', 'true');
  aside.appendChild(current);
  layout.appendChild(aside);

  toggle.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('toc-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Expandir índice' : 'Recolher índice');
    toggle.title = collapsed ? 'Expandir índice' : 'Recolher índice';
  });

  const tocLinks = [...tocShell.querySelectorAll('a[href^="#"]')];
  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window) {
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
  } else {
    setActive(sections[0].id);
  }

  const heroContainer = hero.querySelector('.container');
  if (heroContainer) {
    const mobileToc = document.createElement('details');
    mobileToc.className = 'study-mobile-toc';

    const summary = document.createElement('summary');
    summary.textContent = 'Neste material';

    const nav = document.createElement('nav');
    tocLinks.forEach((link) => {
      const copy = document.createElement('a');
      copy.href = link.getAttribute('href');
      copy.textContent = link.textContent;
      nav.appendChild(copy);
    });

    mobileToc.append(summary, nav);
    heroContainer.appendChild(mobileToc);
  }
})();
