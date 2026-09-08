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

  const systemBlocks = [...main.querySelectorAll('#sistema .system-block')];
  const findSystemBlock = (title) => systemBlocks.find((block) => block.querySelector('h3')?.textContent.trim() === title);

  const cpuBlock = findSystemBlock('CPU');
  if (cpuBlock) {
    cpuBlock.innerHTML = `
      <p class="study-kicker">Processamento</p>
      <h3>CPU</h3>
      <p>Busca, interpreta e executa instruções. Neste nível de descrição, podemos enxergá-la como a combinação de <strong>unidade de controle</strong>, <strong>ULA</strong> e <strong>registradores</strong>.</p>
      <p>A unidade de controle coordena a sequência das operações e as transferências entre os componentes; a ULA realiza operações aritméticas e lógicas; e os registradores mantêm temporariamente instruções, endereços, operandos e resultados necessários durante a execução.</p>
    `;
  }

  const memoryBlock = findSystemBlock('Memória principal');
  if (memoryBlock) {
    memoryBlock.innerHTML = `
      <p class="study-kicker">Armazenamento</p>
      <h3>Memória principal</h3>
      <p>Organiza-se como um conjunto de posições endereçáveis. Cada posição mantém informação binária que, conforme o contexto da execução, pode representar uma <strong>instrução</strong> ou um <strong>dado</strong>.</p>
      <p>É nela que ficam disponíveis as instruções e os operandos de que a CPU precisa naquele momento, além dos resultados que precisam ser mantidos ou escritos durante o processamento.</p>
    `;
  }

  const ioBlock = findSystemBlock('Entrada / saída');
  if (ioBlock) {
    ioBlock.innerHTML = `
      <p class="study-kicker">Comunicação externa</p>
      <h3>Entrada / saída</h3>
      <p>Os módulos de E/S fazem a mediação entre processador/memória e os dispositivos externos. Eles recebem comandos, movimentam dados e informam o estado dos dispositivos ao restante do sistema.</p>
      <p>Essa mediação também ajuda a lidar com diferenças de velocidade e de formato entre o computador e os periféricos. Por isso, módulos de E/S podem realizar <strong>controle e temporização</strong>, <strong>buffering de dados</strong> e <strong>detecção de erros</strong>.</p>
    `;
  }

  const externalBlock = findSystemBlock('Dispositivos externos');
  if (externalBlock) {
    externalBlock.innerHTML = `
      <p class="study-kicker">Ambiente</p>
      <h3>Dispositivos externos</h3>
      <p>São os periféricos pelos quais o computador troca informação com o ambiente. Eles não se conectam diretamente à lógica interna da CPU: a comunicação ocorre por meio de módulos ou controladores de E/S.</p>
      <p>Podemos encontrar dispositivos voltados à interação com pessoas, como tela e impressora; dispositivos voltados à comunicação com máquinas, como discos, sensores e atuadores; e dispositivos de comunicação, que permitem trocar dados com sistemas remotos.</p>
    `;
  }

  const interconnectBlock = main.querySelector('#sistema .system-block.interconnect');
  if (interconnectBlock) {
    interconnectBlock.innerHTML = `
      <p class="study-kicker">Comunicação interna</p>
      <h3>Sistema de interconexão</h3>
      <p>É o conjunto de caminhos que permite a troca de informação entre CPU, memória principal e módulos de E/S. Essas trocas envolvem não apenas dados, mas também <strong>endereços</strong> e <strong>sinais de controle</strong>.</p>
      <p>Um barramento compartilhado é um exemplo clássico de interconexão, mas máquinas atuais também usam ligações ponto a ponto e estruturas especializadas. A escolha depende do volume e do tipo de comunicação exigidos entre os módulos.</p>
      <p><strong>Por que ele aparece como um componente próprio?</strong> Sem esses caminhos, CPU, memória e E/S seriam blocos isolados. A execução depende tanto das unidades que processam e armazenam quanto da infraestrutura que transporta informação entre elas.</p>
    `;
  }

  const interconnectCallout = [...main.querySelectorAll('#sistema .study-callout')]
    .find((callout) => callout.textContent.includes('Por que a interconexão merece aparecer como componente próprio?'));
  interconnectCallout?.remove();

  const programSection = main.querySelector('#programa');
  if (programSection) {
    const headingIntro = programSection.querySelector('.study-heading > p:last-child');
    if (headingIntro) {
      headingIntro.textContent = 'O princípio do programa armazenado é o ponto de partida: a memória pode manter não apenas os dados, mas também as instruções que orientam o processamento. A partir dessa ideia, podemos acompanhar como a CPU encontra e executa uma sequência de operações.';
    }

    const prose = programSection.querySelector('.study-prose');
    if (prose) {
      prose.innerHTML = `
        <h3>O princípio central</h3>
        <p>Em um computador com programa armazenado, <strong>instruções e dados ficam disponíveis na memória em posições endereçáveis</strong>. A CPU busca uma instrução, identifica a operação indicada, obtém os operandos necessários e executa o trabalho.</p>
        <p>Na aula principal usamos uma máquina didática com instruções como <code>LOAD</code>, <code>ADD</code> e <code>STORE</code>. Ela não representa um processador real; serve para tornar visível a sequência <strong>buscar → interpretar → executar</strong> e a relação entre endereço, instrução, dado e resultado.</p>

        <h3>Onde entra a máquina IAS?</h3>
        <p><strong>IAS</strong> é a sigla de <em>Institute for Advanced Study</em>. A máquina IAS foi um computador histórico de programa armazenado, desenvolvido no início da computação eletrônica. Ela aparece com frequência na literatura porque sua organização deixa explícitas relações que continuamos estudando: memória, unidade de controle, registradores, instruções e dados.</p>
        <p>Aqui, a IAS funciona como uma <strong>ponte entre a máquina didática da aula e uma organização histórica real</strong>. Não precisamos memorizar todos os seus registradores ou formatos; interessa observar como o princípio do programa armazenado aparece em uma máquina concreta.</p>

        <h3>O que observar nesse modelo?</h3>
        <p>Na IAS, a memória principal mantém dados e instruções. A unidade de controle busca a próxima instrução, identifica a operação que ela representa e coordena as transferências necessárias para executá-la. Operandos podem ser lidos da memória, resultados podem permanecer temporariamente em registradores ou ser escritos novamente na memória.</p>
        <p>Instruções e dados são ambos codificados como bits. O que muda é <strong>como aquele conteúdo é interpretado e utilizado durante a execução</strong>. Essa é a mesma ideia que a máquina didática da aula tornou visível de forma simplificada.</p>
      `;
    }
  }

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
