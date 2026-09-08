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

    const iasGrid = programSection.querySelector('.ias-grid');
    const registerBoundary = programSection.querySelector('.boundary');

    if (iasGrid) {
      if (!programSection.querySelector('[data-register-intro]')) {
        iasGrid.insertAdjacentHTML('beforebegin', `
          <div class="study-prose" data-register-intro>
            <h3>Registradores: o estado de trabalho da CPU</h3>
            <p><strong>Registradores</strong> são pequenas áreas de armazenamento dentro da CPU. Eles mantêm, por pouco tempo, as informações de que o processador precisa imediatamente: um endereço, uma instrução, um valor que acabou de chegar da memória ou um resultado intermediário.</p>
            <p>Isso ajuda a entender por que a CPU não é apenas “a parte que calcula”. Para executar uma instrução, ela também precisa <strong>lembrar onde está no programa, qual operação está tratando e quais informações estão sendo transferidas</strong>.</p>
            <p>No aprofundamento, vamos observar quatro registradores porque eles tornam o ciclo de busca especialmente visível. Eles aparecem tanto no estudo da IAS quanto em modelos introdutórios de operação do processador.</p>
          </div>
        `);
      }

      iasGrid.innerHTML = `
        <article class="ias-card">
          <strong>PC · contador de programa</strong>
          <p>Guarda o endereço associado à próxima instrução que deverá ser buscada. No IAS, ele aponta para o próximo par de instruções armazenado em uma palavra de memória.</p>
        </article>
        <article class="ias-card">
          <strong>IR · registrador de instrução</strong>
          <p>Mantém a operação que está sendo tratada pela unidade de controle. No IAS, o IR contém o código de operação da instrução em execução.</p>
        </article>
        <article class="ias-card">
          <strong>MAR · registrador de endereço de memória</strong>
          <p>Guarda o endereço da posição de memória que será acessada. Antes de uma leitura ou escrita, é o MAR que indica <em>onde</em> a operação deve ocorrer.</p>
        </article>
        <article class="ias-card">
          <strong>MBR · registrador de buffer de memória</strong>
          <p>Mantém temporariamente a palavra que está sendo transferida entre memória e processador. Em uma leitura, recebe o conteúdo vindo da memória; em uma escrita, mantém o conteúdo que será enviado a ela.</p>
        </article>
      `;
    }

    if (registerBoundary) {
      registerBoundary.innerHTML = `
        <strong>Como esses registradores trabalham juntos?</strong>
        <p>Em um ciclo de busca simplificado, podemos acompanhar a movimentação da informação em quatro momentos. O objetivo não é decorar micro-operações, mas perceber que cada registrador assume uma responsabilidade diferente.</p>
        <div class="microflow" aria-label="Fluxo simplificado entre registradores durante a busca">
          <span>1 · PC → MAR<br>onde buscar</span>
          <span>2 · Memória → MBR<br>o que foi lido</span>
          <span>3 · MBR → IR<br>qual instrução tratar</span>
          <span>4 · PC avança<br>preparar a próxima busca</span>
        </div>
        <p><strong>Uma precisão importante:</strong> o IAS completo possui outros registradores. O <strong>IBR</strong> mantém temporariamente uma das instruções da palavra de memória, enquanto <strong>AC</strong> e <strong>MQ</strong> participam do armazenamento de operandos e resultados da ULA. Aqui concentramos PC, IR, MAR e MBR porque eles deixam mais clara a relação entre <strong>sequenciamento, memória e busca de instruções</strong>.</p>
        <p style="margin-bottom:0">Processadores atuais podem organizar essas responsabilidades de maneiras diferentes e usar muitos outros registradores internos. Por isso, o mais importante é compreender <strong>a função que precisa ser realizada</strong>, e não tratar esses quatro nomes como uma lista universal de toda CPU.</p>
      `;
    }
  }

  const cycleSection = main.querySelector('#ciclo');
  if (cycleSection) {
    const container = cycleSection.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="study-heading">
          <p class="study-kicker">6 · Da instrução armazenada à ação</p>
          <h2>O ciclo de instrução: como a CPU transforma uma instrução em trabalho</h2>
          <p>Um programa não é executado “de uma vez”. A CPU repete continuamente um ciclo: localiza a próxima instrução, entende o que ela pede e realiza a operação correspondente. Esse modelo permite acompanhar a execução sem entrar ainda em toda a complexidade de um processador moderno.</p>
        </div>

        <div class="cycle">
          <article class="cycle-step">
            <b>1</b>
            <strong>Busca</strong>
            <p>A CPU identifica onde está a próxima instrução e traz seus bits da memória para dentro do processador.</p>
          </article>
          <article class="cycle-step">
            <b>2</b>
            <strong>Decodificação</strong>
            <p>A unidade de controle interpreta a operação, identifica operandos e determina quais recursos serão necessários.</p>
          </article>
          <article class="cycle-step">
            <b>3</b>
            <strong>Execução</strong>
            <p>A ação é realizada e o estado da máquina é atualizado: registradores, memória, fluxo de execução ou E/S podem ser afetados.</p>
          </article>
        </div>

        <div class="study-prose">
          <h3>1. Busca: tornar a próxima instrução disponível</h3>
          <p>No modelo sequencial, o <strong>PC</strong> mantém a referência da próxima instrução. Para acessar a memória, esse endereço pode ser colocado no <strong>MAR</strong>; o conteúdo lido chega ao <strong>MBR</strong>; e a instrução que será tratada fica disponível no <strong>IR</strong>. Ao mesmo tempo, o processador prepara a referência para a instrução seguinte.</p>
          <div class="microflow" style="grid-template-columns:repeat(4,minmax(0,1fr))" aria-label="Etapas simplificadas da busca de instrução">
            <span>PC → MAR<br>endereço da busca</span>
            <span>Memória → MBR<br>conteúdo lido</span>
            <span>MBR → IR<br>instrução corrente</span>
            <span>PC avança<br>próxima busca</span>
          </div>
          <p>Esse detalhamento mostra algo importante: <strong>buscar não significa apenas “ler a memória”</strong>. É preciso fornecer um endereço, coordenar a leitura, receber o conteúdo e atualizar o estado interno da CPU.</p>

          <h3>2. Decodificação: responder “o que esta instrução pede?”</h3>
          <p>Com a instrução disponível, a unidade de controle interpreta seu <strong>código de operação</strong> e os campos que acompanham a instrução. Ela precisa determinar qual operação será feita, onde estão os operandos e qual caminho de dados deverá ser usado.</p>
          <p>Uma instrução como <code>ADD 21</code>, por exemplo, não significa “some o número 21”. No nosso modelo didático, <code>ADD</code> identifica a operação e <code>21</code> indica o endereço onde está um operando. Decodificar é justamente distinguir esses papéis antes de executar.</p>

          <h3>3. Execução: a sequência depende da instrução</h3>
          <p>Depois da decodificação, não existe uma única sequência universal. O que acontece depende do tipo de instrução. Algumas usam a ULA, outras movimentam dados, outras alteram o fluxo do programa e outras podem envolver E/S.</p>
        </div>

        <div class="mini-grid four">
          <article class="mini-card">
            <span class="tag">Aritmética e lógica</span>
            <h4>Calcular</h4>
            <p>Operandos são enviados à ULA e o resultado atualiza um registrador, flags ou outro destino definido pela instrução.</p>
          </article>
          <article class="mini-card">
            <span class="tag">Load / store</span>
            <h4>Movimentar dados</h4>
            <p>A CPU lê um valor da memória para um registrador ou grava um valor de um registrador na memória.</p>
          </article>
          <article class="mini-card">
            <span class="tag">Controle de fluxo</span>
            <h4>Mudar a sequência</h4>
            <p>Saltos e desvios podem modificar o PC e fazer com que a próxima instrução venha de outro endereço.</p>
          </article>
          <article class="mini-card">
            <span class="tag">Entrada / saída</span>
            <h4>Interagir com o ambiente</h4>
            <p>Dependendo da arquitetura, uma instrução pode iniciar ou participar da comunicação com módulos de E/S.</p>
          </article>
        </div>

        <div class="study-prose">
          <h3>Rastreando a instrução <code>ADD 21</code></h3>
          <p>Podemos agora retomar a mesma máquina didática da aula principal. Antes da instrução <code>ADD 21</code>, o acumulador contém <code>7</code> e a posição de memória <code>21</code> contém <code>5</code>.</p>
        </div>

        <div class="study-table-wrap">
          <table class="study-table">
            <thead>
              <tr>
                <th>Momento</th>
                <th>O que acontece</th>
                <th>O que observar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Antes da busca</td>
                <td>O PC referencia o endereço onde está <code>ADD 21</code>.</td>
                <td>A CPU precisa saber <em>qual instrução vem a seguir</em>.</td>
              </tr>
              <tr>
                <td>Busca</td>
                <td>A instrução é lida da memória e fica disponível para tratamento no processador.</td>
                <td>Endereço e conteúdo cumprem papéis diferentes durante a transferência.</td>
              </tr>
              <tr>
                <td>Decodificação</td>
                <td>A CPU identifica a operação <code>ADD</code> e interpreta <code>21</code> como referência ao operando.</td>
                <td>A instrução precisa dizer <em>o que fazer</em> e <em>com qual informação</em>.</td>
              </tr>
              <tr>
                <td>Busca do operando</td>
                <td>O endereço <code>21</code> é acessado e o valor <code>5</code> é obtido.</td>
                <td>Executar uma instrução pode exigir um novo acesso à memória depois da busca da própria instrução.</td>
              </tr>
              <tr>
                <td>Execução</td>
                <td>A ULA realiza <code>7 + 5</code> e o acumulador passa a conter <code>12</code>.</td>
                <td>O resultado pode ficar primeiro em um registrador; a memória ainda não precisa ter sido alterada.</td>
              </tr>
              <tr>
                <td>Continuidade</td>
                <td>O PC já está preparado para a instrução seguinte, <code>STORE 22</code>.</td>
                <td>Somente a próxima instrução escreverá o resultado no endereço <code>22</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="study-grid">
          <div class="study-prose">
            <h3>O modelo de três etapas é útil, mas não descreve toda a microarquitetura</h3>
            <p>Em uma descrição mais detalhada, o ciclo pode envolver etapas adicionais. Um operando pode exigir <strong>endereçamento indireto</strong>; ao final de uma instrução, a CPU pode precisar verificar e tratar uma <strong>interrupção</strong>; e cada fase pode ser decomposta em várias micro-operações internas.</p>
            <p>Isso não invalida o modelo <strong>busca → decodificação → execução</strong>. Ele continua útil porque organiza as responsabilidades fundamentais da CPU antes de estudarmos como uma microarquitetura específica implementa essas responsabilidades.</p>
          </div>

          <div class="study-stack">
            <article class="study-card">
              <strong>Uma instrução pode exigir mais memória</strong>
              <p>Buscar a instrução e buscar seus operandos são acessos distintos. Uma instrução de carga, soma ou armazenamento pode voltar à memória durante sua execução.</p>
            </article>
            <article class="study-card">
              <strong>Nem toda instrução termina com um cálculo</strong>
              <p>O efeito pode ser mover dados, alterar o PC, atualizar flags, escrever na memória ou iniciar uma interação com E/S.</p>
            </article>
          </div>
        </div>

        <div class="boundary">
          <strong>E nos processadores atuais?</strong>
          <p>CPUs modernas não precisam esperar uma instrução terminar completamente para começar a próxima. Com <strong>pipeline</strong>, diferentes unidades podem trabalhar ao mesmo tempo: enquanto uma instrução está sendo executada, outra pode estar sendo decodificada e uma terceira já pode estar sendo buscada.</p>
          <p style="margin-bottom:0">Por isso, o ciclo de instrução deve ser entendido como um <strong>modelo das responsabilidades necessárias para executar instruções</strong>, e não como a afirmação de que todo processador atual realiza exatamente três passos físicos, um após o outro.</p>
        </div>
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
