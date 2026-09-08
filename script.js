(() => {
  const isAula04Aprofundamento = /(?:^|\/)aula-04-aprofundamento\.html$/.test(window.location.pathname);

  const improveAula04LinkLoad = () => {
    if (!isAula04Aprofundamento) return;
    const container = document.querySelector('#ligacao .container');
    if (!container) return;

    container.innerHTML = `
      <div class="study-heading">
        <p class="study-kicker">6 · Ligação e carregamento</p>
        <h2>Compilar os arquivos ainda não basta para colocar o programa em execução</h2>
        <p>Em um projeto real, diferentes partes do programa podem ser compiladas separadamente. Isso produz <strong>módulos objeto</strong>, mas eles ainda precisam ser reunidos em um artefato coerente e, depois, colocados na memória. É nesse ponto que entram duas etapas diferentes: <strong>ligação</strong> e <strong>carregamento</strong>.</p>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>Primeiro separe os dois problemas</h3>
          <p><strong>Ligação</strong> resolve o problema de integrar partes do programa. Um módulo pode usar uma função ou um dado definido em outro módulo; enquanto esses arquivos estão separados, essa referência pode existir apenas de forma simbólica.</p>
          <p><strong>Carregamento</strong> resolve outro problema: colocar o módulo carregável na memória e fazer com que suas referências de endereço façam sentido na posição em que ele foi colocado.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Ligador</strong><p>Recebe módulos objeto, integra essas partes e resolve referências entre elas para produzir um módulo carregável.</p></div>
          <div class="study-callout"><strong>Carregador</strong><p>Coloca o módulo na memória principal e prepara seus endereços para que a execução possa começar.</p></div>
        </div>
      </div>

      <div class="boundary">
        <strong>Uma forma simples de lembrar</strong>
        <p><strong>Ligação:</strong> “como estas partes se conectam?”. <strong>Carregamento:</strong> “onde este programa ficará na memória e como suas referências funcionarão ali?”.</p>
      </div>

      <div class="study-prose">
        <h3>Exemplo · dois arquivos que dependem um do outro</h3>
        <p>Imagine um programa dividido em dois arquivos. O primeiro contém a função principal; o segundo contém uma função de cálculo usada pelo primeiro.</p>
      </div>

      <div class="architecture-compare">
        <article class="architecture-side">
          <small>Módulo A</small>
          <h3><code>main.c</code></h3>
          <p>Contém uma chamada para <code>calcular_total()</code>.</p>
          <p>Depois da compilação, <code>main.o</code> sabe que precisa dessa função, mas ainda pode ter apenas uma <strong>referência simbólica</strong> para ela.</p>
        </article>
        <article class="architecture-side">
          <small>Módulo B</small>
          <h3><code>calculos.c</code></h3>
          <p>Contém a implementação de <code>calcular_total()</code>.</p>
          <p>Depois da compilação, <code>calculos.o</code> contém o código correspondente a essa função.</p>
        </article>
      </div>

      <div class="link-load-flow" aria-label="Exemplo didático de ligação e carregamento">
        <div class="link-load-node"><strong><code>main.o</code></strong><span>Possui uma referência ainda não resolvida para <code>calcular_total()</code>.</span></div>
        <div class="link-load-node"><strong><code>calculos.o</code></strong><span>Contém o código da função que será utilizada pelo primeiro módulo.</span></div>
        <div class="link-load-node"><strong>Ligador</strong><span>Reúne os módulos e transforma a referência simbólica em uma referência válida dentro do módulo integrado.</span></div>
        <div class="link-load-node"><strong>Módulo carregável</strong><span>Passa a conter as partes do programa em uma representação integrada.</span></div>
        <div class="link-load-node"><strong>Carregador</strong><span>Coloca esse módulo na memória e prepara os endereços usados durante a execução.</span></div>
      </div>

      <div class="study-callout">
        <strong>O que o ligador realmente resolveu?</strong>
        <p>Antes da ligação, o módulo A conhecia o <em>nome</em> da função de que precisava. Depois da ligação, essa dependência passa a apontar para uma posição concreta dentro do módulo carregável.</p>
      </div>

      <div class="study-prose">
        <h3>Agora aparece um segundo problema: em que endereço da memória o programa será colocado?</h3>
        <p>Nem sempre é desejável decidir, durante a compilação, a posição exata que um programa ocupará na memória. Se vários programas compartilham a memória, uma posição que estava livre em um momento pode não estar livre em outro.</p>
        <p>Por isso, é comum trabalhar com <strong>endereços relativos</strong>. Em vez de dizer “este dado estará obrigatoriamente no endereço 4120”, o módulo pode representar algo como “este dado está 120 posições depois do início do programa”.</p>
      </div>

      <div class="code-reading">
        <div class="study-code">
          <div class="study-code-head"><span>Exemplo conceitual</span><span>relocação</span></div>
          <pre><code>referência relativa = 120
base escolhida pelo carregador = 4000
endereço resultante = 4000 + 120 = 4120</code></pre>
        </div>
        <div class="reading-list">
          <div class="reading-item"><strong>Antes do carregamento</strong><p>O módulo pode conter referências relativas ao seu próprio início.</p></div>
          <div class="reading-item"><strong>Durante o carregamento</strong><p>O carregador escolhe a posição inicial e ajusta as referências que precisam ser convertidas.</p></div>
          <div class="reading-item"><strong>Depois do ajuste</strong><p>As referências passam a fazer sentido na região de memória realmente ocupada pelo programa.</p></div>
        </div>
      </div>

      <div class="study-prose">
        <h3>Três momentos possíveis para resolver os endereços</h3>
        <p>A diferença entre as estratégias está principalmente em <strong>quando</strong> a posição efetiva do programa e de suas referências é determinada.</p>
      </div>

      <div class="design-list">
        <div class="design-row"><strong>Carregamento absoluto</strong><span>O módulo é preparado para uma posição específica da memória. Isso simplifica o carregamento, mas reduz a flexibilidade.</span></div>
        <div class="design-row"><strong>Carregamento relocável</strong><span>O módulo usa referências relativas. Ao carregá-lo, o carregador ajusta essas referências de acordo com a posição escolhida.</span></div>
        <div class="design-row"><strong>Endereçamento em tempo de execução</strong><span>As referências permanecem relativas e a tradução para endereços efetivos é realizada dinamicamente durante a execução, com suporte do hardware.</span></div>
      </div>

      <div class="boundary">
        <strong>Relocação não significa mover “qualquer número” do programa</strong>
        <p>O carregador precisa saber quais campos representam endereços que devem ser ajustados. Uma constante numérica usada pelo programa não pode ser tratada automaticamente como se fosse um endereço.</p>
      </div>

      <div class="study-prose">
        <h3>E onde entram bibliotecas?</h3>
        <p>Uma aplicação também pode depender de módulos externos, como bibliotecas. Essas dependências podem ser resolvidas em momentos diferentes.</p>
      </div>

      <div class="architecture-compare">
        <article class="architecture-side">
          <small>Antes do carregamento</small>
          <h3>Ligação antecipada</h3>
          <p>Os módulos necessários são integrados antes de o programa ser carregado. O artefato resultante já traz as referências externas resolvidas para aquela composição.</p>
        </article>
        <article class="architecture-side">
          <small>Mais tarde</small>
          <h3>Ligação dinâmica</h3>
          <p>Algumas referências externas permanecem não resolvidas no módulo carregável e podem ser resolvidas no carregamento ou somente quando forem necessárias durante a execução.</p>
        </article>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>Por que adiar a ligação pode ser útil?</h3>
          <p>Quando um módulo externo é mantido separadamente, uma versão atualizada dele pode ser incorporada sem exigir necessariamente que toda a aplicação seja recomposta do zero. Além disso, um mesmo código externo pode ser compartilhado por mais de uma aplicação.</p>
          <p>O ponto importante é perceber que <strong>ligação dinâmica</strong> fala sobre quando uma dependência entre módulos é resolvida, enquanto <strong>carregamento relocável</strong> fala sobre onde um módulo será colocado na memória. São problemas diferentes.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Não confunda</strong><p><strong>Ligação</strong> conecta módulos. <strong>Relocação</strong> ajusta referências de endereço. <strong>Carregamento</strong> coloca o programa na memória.</p></div>
          <div class="study-callout"><strong>Ordem conceitual</strong><p>Compilar → produzir módulos objeto → ligar módulos → obter módulo carregável → carregar na memória → executar.</p></div>
        </div>
      </div>

      <div class="study-prose">
        <h3>Do ponto de vista de Engenharia de Software</h3>
        <p>Essas etapas aparecem escondidas em comandos simples como <strong>Build</strong> ou <strong>Run</strong>, mas continuam existindo. Elas ajudam a explicar erros de símbolo não encontrado, dependências de bibliotecas, incompatibilidades entre artefatos e situações em que um executável existe no disco, mas ainda não está pronto para ser executado na memória.</p>
      </div>

      <div class="boundary">
        <strong>O ponto central desta seção</strong>
        <p><strong>Compilar</strong> traduz cada parte do código. <strong>Ligar</strong> integra essas partes e resolve dependências entre módulos. <strong>Carregar</strong> coloca o módulo resultante na memória e ajusta as referências necessárias para aquela execução. São etapas diferentes de uma mesma cadeia.</p>
      </div>
    `;
  };

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@10a2afda48e7556f21f60bd1c8f800388f06a094/script.js';
  previousScript.defer = true;
  previousScript.addEventListener('load', improveAula04LinkLoad);
  previousScript.addEventListener('error', improveAula04LinkLoad);
  document.head.appendChild(previousScript);

  let attempts = 0;
  const timer = window.setInterval(() => {
    improveAula04LinkLoad();
    attempts += 1;
    if (attempts >= 30) window.clearInterval(timer);
  }, 150);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveAula04LinkLoad, { once: true });
  } else {
    improveAula04LinkLoad();
  }
})();