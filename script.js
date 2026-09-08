(() => {
  const path = window.location.pathname;
  const isAula04Aprofundamento = /(?:^|\/)aula-04-aprofundamento\.html$/.test(path);
  const isAula06 = /(?:^|\/)(?:rascunhos\/)?aula-06\.html$/.test(path);

  const improveAula04Map = () => {
    if (!isAula04Aprofundamento) return;
    const container = document.querySelector('#mapa .container');
    if (!container) return;

    container.innerHTML = `
      <div class="study-heading">
        <p class="study-kicker">1 · Mapa da tradução</p>
        <h2>Do código que escrevemos ao programa que pode ser executado</h2>
        <p>Entre o arquivo-fonte escrito pelo programador e as instruções que o processador executa existem várias etapas. Cada uma recebe uma representação do programa, realiza uma transformação específica e produz algo que será usado pela etapa seguinte.</p>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>Comece por uma ideia simples</h3>
          <p>Quando escrevemos um programa em uma linguagem de alto nível, trabalhamos com nomes de variáveis, funções, estruturas de decisão e repetições. Essa forma é adequada para quem desenvolve o software, mas não é a representação que o processador executa diretamente.</p>
          <p>O caminho até a execução pode ser entendido como uma sequência de transformações: o código-fonte é traduzido, os módulos produzidos são integrados, surge um executável e, por fim, esse arquivo é colocado em memória para que a execução possa começar.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Ideia-chave</strong><p>O programa não “vira executável” de uma só vez. Ele passa por representações intermediárias, e cada etapa resolve um problema diferente.</p></div>
          <div class="study-callout"><strong>Observe a mudança</strong><p>Ao longo do percurso, a intenção escrita pelo programador vai sendo transformada em uma representação cada vez mais próxima da máquina que executará o programa.</p></div>
        </div>
      </div>

      <div class="toolchain-flow" aria-label="Fluxo conceitual do código-fonte até a execução">
        <div class="toolchain-step"><small>1 · Fonte</small><strong>Código-fonte</strong><span>É a representação escrita pelo programador em uma linguagem de alto nível.</span></div>
        <div class="toolchain-step"><small>2 · Tradução</small><strong>Compilador</strong><span>Traduz o código-fonte para uma representação adequada à máquina-alvo. Em algumas cadeias, pode existir uma etapa intermediária em Assembly.</span></div>
        <div class="toolchain-step"><small>3 · Módulo</small><strong>Código objeto</strong><span>É código de máquina produzido para uma parte do programa, mas ainda pode conter referências que precisam ser resolvidas.</span></div>
        <div class="toolchain-step"><small>4 · Integração</small><strong>Ligador</strong><span>Combina módulos objeto e resolve referências entre partes compiladas separadamente.</span></div>
        <div class="toolchain-step"><small>5 · Artefato</small><strong>Executável</strong><span>É o programa em uma forma que pode ser carregada para execução no ambiente para o qual foi construído.</span></div>
        <div class="toolchain-step"><small>6 · Execução</small><strong>Carregador + SO</strong><span>Colocam o executável em memória e preparam o estado necessário para iniciar sua execução.</span></div>
      </div>

      <div class="study-prose">
        <h3>Acompanhe um exemplo conceitual</h3>
        <p>Imagine um programa dividido em dois módulos: um contém a função principal e outro contém uma função de cálculo utilizada pelo primeiro. Cada módulo pode ser compilado separadamente, produzindo seu próprio <strong>código objeto</strong>.</p>
        <p>Nesse momento, o módulo principal pode saber que precisa chamar a função de cálculo, mas ainda não possuir a informação final necessária para localizar essa função no programa completo. O <strong>ligador</strong> reúne os módulos e resolve essa relação, produzindo um único artefato executável.</p>
        <p>O executável ainda é apenas um arquivo armazenado. Antes que a CPU possa executar suas instruções, o <strong>carregador</strong> precisa colocá-lo em memória e preparar sua execução. A distinção entre arquivo executável e processo será retomada mais adiante neste aprofundamento.</p>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>O que devemos guardar desta sequência?</h3>
          <p><strong>Compilar</strong> é traduzir o código-fonte. <strong>Ligar</strong> é integrar módulos produzidos separadamente. <strong>Carregar</strong> é preparar o executável em memória para que ele possa começar a ser executado.</p>
          <p>Essas etapas ajudam a explicar por que um projeto pode possuir vários arquivos-fonte e bibliotecas, mas entregar ao usuário um único executável — e também por que esse executável continua dependendo da arquitetura e do ambiente para os quais foi construído.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Código objeto ≠ executável</strong><p>O código objeto já contém representação de máquina, mas ainda pode depender da integração realizada pelo ligador.</p></div>
          <div class="study-callout"><strong>Executável ≠ execução</strong><p>O executável é um artefato armazenado. Ele precisa ser carregado e preparado antes que suas instruções sejam efetivamente executadas.</p></div>
        </div>
      </div>
    `;
  };

  const improveAula06Profiles = () => {
    if (!isAula06) return;
    const list = document.querySelector('#perfis .inquiry:first-of-type .inquiry-body:first-of-type > div:first-child > ol.prompt-list');
    if (!list) return;
    list.style.setProperty('list-style', 'none', 'important');
    list.style.setProperty('padding-left', '0', 'important');
    list.querySelectorAll(':scope > li').forEach((item) => {
      item.style.setProperty('margin-left', '0', 'important');
    });
  };

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@242699afd1bea25e23f8908a8e4491dcfa63be1f/script.js';
  previousScript.defer = true;
  previousScript.addEventListener('load', () => {
    improveAula04Map();
    improveAula06Profiles();
  });
  previousScript.addEventListener('error', () => {
    improveAula04Map();
    improveAula06Profiles();
  });
  document.head.appendChild(previousScript);

  const improveCurrentPage = () => {
    improveAula04Map();
    improveAula06Profiles();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveCurrentPage, { once: true });
  } else {
    improveCurrentPage();
  }
})();