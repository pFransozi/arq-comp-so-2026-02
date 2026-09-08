(() => {
  const path = window.location.pathname;
  const isAula03 = /(?:^|\/)aula-03\.html$/.test(path);
  const isAula04 = /(?:^|\/)aula-04\.html$/.test(path);
  const isAula04Aprofundamento = /(?:^|\/)aula-04-aprofundamento\.html$/.test(path);
  const isAula06 = /(?:^|\/)(?:rascunhos\/)?aula-06\.html$/.test(path);

  const loadScript = (src, datasetKey) => {
    if (datasetKey && document.querySelector(`script[data-${datasetKey}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    if (datasetKey) script.dataset[datasetKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = 'true';
    document.head.appendChild(script);
  };

  if (isAula03) {
    document.body.classList.add('aula03-clean');

    const oldToggle = document.querySelector('.theme-toggle');
    if (oldToggle) {
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
    }

    const inquiry = document.querySelector('#ciclo .inquiry');
    if (inquiry) {
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
    }

    loadScript('aula-03-clean.js', 'aula03-clean');
    return;
  }

  if (isAula06) {
    const perfis = document.querySelector('#perfis');
    if (perfis) {
      const inquiries = [...perfis.querySelectorAll('.inquiry')];
      const inquiry = inquiries[0];

      if (inquiry) {
        inquiry.innerHTML = `
          <div class="inquiry-head">
            <div>
              <span class="inquiry-kicker">Exercício de classificação</span>
              <h3>Identifique o perfil predominante da carga</h3>
            </div>
            <span class="inquiry-tag">CPU-bound · memory-bound · I/O-bound</span>
          </div>
          <div class="inquiry-body" style="grid-template-columns:1.35fr .65fr">
            <div>
              <p>Considere <strong>o trecho de execução descrito</strong>. Em cada caso, escolha o perfil que parece dominar o comportamento da aplicação.</p>
              <ol class="prompt-list">
                <li><strong>A.</strong> Um programa calcula números primos durante vários segundos e quase não realiza leitura ou escrita de arquivos.</li>
                <li><strong>B.</strong> Um programa percorre repetidamente uma matriz muito grande já carregada na RAM, realizando apenas uma soma simples em cada elemento.</li>
                <li><strong>C.</strong> Um programa grava milhares de pequenos registros em arquivos separados ao longo da execução.</li>
                <li><strong>D.</strong> Um programa comprime centenas de imagens que já estão carregadas na memória, executando transformações matemáticas intensivas sobre cada uma.</li>
                <li><strong>E.</strong> Um programa percorre um vetor de centenas de milhões de valores na RAM e executa pouquíssimas operações aritméticas sobre cada elemento.</li>
                <li><strong>F.</strong> Um utilitário copia um arquivo de 20 GB de uma unidade de armazenamento para outra, sem realizar transformações relevantes nos dados.</li>
                <li><strong>G.</strong> Um programa calcula repetidamente hashes criptográficos sobre um bloco de dados que já está disponível na memória.</li>
                <li><strong>H.</strong> Um algoritmo percorre uma estrutura muito grande de objetos ligados por referências espalhadas na memória, realizando pouco cálculo em cada objeto.</li>
                <li><strong>I.</strong> Um analisador lê um arquivo de log de vários gigabytes linha por linha, faz um teste simples em cada linha e grava apenas um pequeno resumo no final.</li>
              </ol>
            </div>
            <div>
              <h3>Como responder</h3>
              <ol class="prompt-list">
                <li>Escolha entre <strong>CPU-bound</strong>, <strong>memory-bound</strong> e <strong>I/O-bound</strong>.</li>
                <li>Indique qual <strong>pista do enunciado</strong> levou à sua classificação.</li>
              </ol>
            </div>
          </div>
          <div class="inquiry-body" style="grid-template-columns:1.1fr .9fr;border-top:1px solid var(--line)">
            <div>
              <h3>Desafio · uma aplicação, vários momentos</h3>
              <p>Uma aplicação executa quatro etapas:</p>
              <ol class="prompt-list">
                <li>lê 4 GB de dados de um SSD;</li>
                <li>percorre várias vezes uma grande estrutura já carregada na RAM para reorganizar os registros;</li>
                <li>executa um cálculo estatístico pesado sobre os dados reorganizados;</li>
                <li>grava um resumo de 5 MB em disco.</li>
              </ol>
            </div>
            <div>
              <h3>Classifique cada etapa</h3>
              <ol class="prompt-list">
                <li>Qual perfil parece predominante em cada fase?</li>
                <li>A aplicação inteira precisa receber um único rótulo?</li>
                <li>Sem medir o tempo de cada fase, é possível afirmar qual delas domina o tempo total?</li>
              </ol>
            </div>
          </div>
        `;
      }

      inquiries.slice(1).forEach((item) => item.remove());
      perfis.querySelectorAll('.trace-table-wrap').forEach((table) => table.remove());
      perfis.querySelectorAll('.bridge-question').forEach((bridge) => {
        if (/próxima aula|ponte/i.test(bridge.textContent)) bridge.remove();
      });
    }
  }

  if (isAula04) {
    document.body.classList.add('aula03-clean', 'aula04-clean');
    const baseScript = document.createElement('script');
    baseScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@e8a8a5618b8cac11bc3d40439a9d608480c81b8f/script.js';
    baseScript.defer = true;
    const finish = () => loadScript('lesson-layout.js', 'lesson-layout');
    baseScript.addEventListener('load', finish);
    baseScript.addEventListener('error', finish);
    document.head.appendChild(baseScript);
    return;
  }

  if (isAula04Aprofundamento) {
    document.querySelector('.study-source-note')?.remove();

    const setHtml = (selector, html) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = html;
    };

    setHtml('#mapa .study-prose p:first-of-type', '<strong>O compilador</strong> converte uma linguagem-fonte para uma representação adequada à máquina-alvo, podendo gerar linguagem de montagem como etapa intermediária. O <strong>código objeto</strong> é a representação de máquina produzida para um módulo. O <strong>ligador</strong> combina módulos objeto e resolve referências entre eles, enquanto o <strong>carregador</strong> coloca o programa em memória e prepara sua execução.');
    setHtml('#compilacao .boundary p', 'Diferentemente do montador, um compilador não trabalha com uma correspondência fixa em que cada comando de entrada equivale necessariamente a uma única instrução de máquina ou a uma sequência predeterminada. Uma construção de alto nível pode exigir várias operações, e sua tradução depende das escolhas do compilador e da arquitetura-alvo.');
    setHtml('#isa .study-heading > p:last-child', 'A arquitetura do conjunto de instruções funciona como a interface entre hardware e software. Para compreender por que dois targets geram saídas diferentes, precisamos observar os elementos que compõem esse contrato.');
    setHtml('#arquiteturas .study-heading > p:last-child', 'As famílias x86 e ARM são exemplos importantes de arquiteturas com contratos distintos. A diferença não é apenas estética: cada família define seu próprio conjunto de instruções, registradores, formatos e formas de endereçamento.');
    setHtml('#arquiteturas .architecture-side:first-child p:first-of-type', 'A arquitetura x86 evoluiu ao longo de sucessivas gerações de processadores e representa uma tradição associada a conjuntos de instruções mais complexos.');
    setHtml('#interfaces .study-heading > p:last-child', 'Uma distinção importante é separar três interfaces: API, ABI e ISA. Elas ajudam a explicar por que “meu código compila” e “meu binário executa” são afirmações diferentes.');
    setHtml('#interfaces .interface-layer:first-child p', '<strong>Application Programming Interface.</strong> É a interface usada por programas em linguagem de alto nível para acessar serviços por meio de bibliotecas. Uma API favorece a portabilidade do software por <strong>recompilação</strong> em outros sistemas que ofereçam a mesma interface.');
    setHtml('#ligacao .study-heading > p:last-child', 'Duas etapas normalmente ficam escondidas quando usamos “Build” ou “Run”: a ligação de módulos e o carregamento do programa.');

    const ligacaoParagraphs = [...document.querySelectorAll('#ligacao .study-prose p')];
    ligacaoParagraphs.forEach((paragraph) => {
      if (paragraph.textContent.trim().startsWith('Stallings mostra que')) {
        paragraph.innerHTML = 'A resolução de referências externas pode ocorrer em momentos diferentes. Em uma estratégia de ligação antecipada, os módulos são combinados antes do carregamento. Na <strong>ligação dinâmica</strong>, parte dessa resolução é adiada e um módulo externo pode ser associado mais tarde, inclusive durante a execução.';
      }
      if (paragraph.textContent.trim().startsWith('Um programa pode ser preparado')) {
        paragraph.innerHTML = 'Um programa pode ser preparado para ser carregado em diferentes regiões da memória. Por isso, distinguimos <strong>carregamento absoluto</strong>, <strong>carregamento relocável</strong> e <strong>carregamento dinâmico em tempo de execução</strong>.';
      }
    });

    setHtml('#processo .study-heading > p:last-child', 'O sistema operacional precisa transformar o arquivo executável em uma imagem de processo que possa receber tempo de CPU e utilizar memória e demais recursos.');
    setHtml('#processo .process-explanation p:first-of-type', 'Em sistemas UNIX, <code>exec</code> substitui a imagem de memória de um processo pelo arquivo executável indicado. Isso evidencia uma diferença importante: <strong>o arquivo é um artefato armazenado; o processo é o estado de uma execução</strong>.');

    const referenceIntro = document.querySelector('#referencias .study-heading > p:last-child');
    if (referenceIntro) {
      referenceIntro.textContent = 'O conteúdo desta página foi elaborado a partir dos materiais bibliográficos anexados ao projeto.';
    }

    document.querySelectorAll('#referencias .reference-list > p').forEach((reference) => {
      if (reference.textContent.trim().startsWith('EMENTÁRIO GERAL')) reference.remove();
    });

    loadScript('https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@cb4518d7dc92a1c5b03218cd231bdca68aeed111/script.js');
    return;
  }

  loadScript('https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@cb4518d7dc92a1c5b03218cd231bdca68aeed111/script.js');
})();