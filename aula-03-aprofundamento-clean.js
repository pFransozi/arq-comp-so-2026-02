(() => {
  if (!document.body.classList.contains('study-page')) return;
  if (document.body.dataset.study03CleanReady === 'true') return;
  document.body.dataset.study03CleanReady = 'true';
  document.body.classList.add('study-clean');

  const main = document.querySelector('main#conteudo');
  if (!main) return;

  const hero = main.querySelector('.study-hero');
  const tocShell = main.querySelector('.study-toc-shell');
  const sections = [...main.querySelectorAll(':scope > .study-section[id]')];
  if (!hero || !tocShell || !sections.length) return;

  const roleCard = hero.querySelector('.study-card');
  if (roleCard) {
    roleCard.innerHTML = `
      <strong>Qual é o papel deste material?</strong>
      <p>A aula principal introduz os conceitos com exemplos, modelos simples e rastreamento passo a passo. Neste aprofundamento, essas mesmas ideias são retomadas com mais precisão conceitual e com apoio da bibliografia da disciplina.</p>
      <p>O foco está em consolidar a compreensão sobre organização do computador, CPU, memória, entrada/saída, programa armazenado, arquiteturas e ciclo de instrução.</p>
    `;
  }

  const replaceText = (selector, needle, replacement) => {
    const element = main.querySelector(selector);
    if (element && element.textContent.includes(needle)) element.textContent = replacement;
  };

  replaceText(
    '#modelo .study-heading > p:last-child',
    'Stallings organiza',
    'Boa parte da confusão em arquitetura de computadores nasce quando usamos palavras diferentes como se respondessem à mesma pergunta. Por isso, é útil separar os diferentes níveis de descrição do sistema.'
  );

  replaceText(
    '#modelo .study-prose p:nth-of-type(2)',
    'Stallings',
    'Um exemplo clássico ajuda a separar as duas ideias: decidir se existe uma instrução de multiplicação pertence à arquitetura; decidir como ela será implementada pertence à organização.'
  );

  replaceText(
    '#sistema .study-heading > p:last-child',
    'Stallings',
    'Em uma visão de alto nível, um computador tradicional pode ser compreendido por quatro grandes componentes estruturais: processador, memória principal, entrada/saída e sistema de interconexão.'
  );

  const interconnectBlock = main.querySelector('#sistema .system-block.interconnect');
  const interconnectCallout = [...main.querySelectorAll('#sistema .study-callout')]
    .find((callout) => callout.textContent.includes('Por que a interconexão merece aparecer como componente próprio?'));

  if (interconnectBlock && !interconnectBlock.querySelector('[data-interconnect-why]')) {
    interconnectBlock.insertAdjacentHTML('beforeend', `
      <p data-interconnect-why><strong>Por que ele aparece como um componente próprio?</strong> Sem um mecanismo de comunicação, CPU, memória e E/S seriam blocos isolados. A execução depende tanto das unidades que processam e armazenam quanto dos caminhos que transportam informação entre elas.</p>
    `);
  }
  interconnectCallout?.remove();

  replaceText(
    '#programa .study-prose p:nth-of-type(1)',
    'Stallings',
    'Na máquina IAS, a memória principal mantém dados e instruções. A unidade de controle busca uma instrução, identifica a operação que ela representa e coordena as transferências necessárias para executá-la.'
  );

  replaceText(
    '#programa .study-prose p:nth-of-type(4)',
    'Stallings',
    'O conceito de programa armazenado é geralmente associado a John von Neumann, embora ideias semelhantes tenham sido desenvolvidas no mesmo período por outros pesquisadores, incluindo Alan Turing.'
  );

  replaceText(
    '#barramentos .study-prose p:nth-of-type(2)',
    'Stallings',
    'Uma CPU pode ter grande capacidade de processamento e ainda assim ficar limitada se dados e instruções não chegam no ritmo necessário. Projetar um sistema equilibrado exige considerar processador, memória e interconexões em conjunto.'
  );

  replaceText(
    '#io .study-heading > p:last-child',
    'Tanenbaum',
    'Entrada e saída formam a interface entre o computador e o ambiente externo. Para a Aula 03, o ponto essencial é reconhecer que dispositivos externos são mediados por hardware de E/S e, em sistemas operacionais, também por software especializado.'
  );

  const referencesSection = main.querySelector('#referencias');
  if (referencesSection) {
    const titles = referencesSection.querySelectorAll('.study-prose h3');
    if (titles[0]) titles[0].textContent = 'Arquitetura e Organização de Computadores';
    if (titles[1]) titles[1].textContent = 'Sistemas Operacionais Modernos';

    const editionCard = [...referencesSection.querySelectorAll('.study-card')]
      .find((card) => card.querySelector('strong')?.textContent.trim() === 'Sobre as edições');
    if (editionCard) {
      editionCard.innerHTML = `
        <strong>Sobre as edições</strong>
        <p>Os PDFs disponíveis no projeto correspondem a edições anteriores às listadas no PPC vigente. Para este aprofundamento, foram utilizados apenas os fundamentos introdutórios que permanecem estáveis entre as edições.</p>
      `;
    }

    const natureCard = [...referencesSection.querySelectorAll('.study-card')]
      .find((card) => card.querySelector('strong')?.textContent.trim() === 'Natureza do material');
    if (natureCard) {
      natureCard.innerHTML = `
        <strong>Natureza do material</strong>
        <p>Esta página organiza e sintetiza os conceitos da bibliografia da disciplina para apoiar o estudo e a retomada dos conteúdos.</p>
      `;
    }
  }

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
