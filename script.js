(() => {
  const isAula04Aprofundamento = /(?:^|\/)aula-04-aprofundamento\.html$/.test(window.location.pathname);

  const improveAula04Architectures = () => {
    if (!isAula04Aprofundamento) return;
    const container = document.querySelector('#arquiteturas .container');
    if (!container) return;

    container.innerHTML = `
      <div class="study-heading">
        <p class="study-kicker">4 · Dois alvos reais</p>
        <h2>O mesmo código-fonte pode precisar falar duas linguagens de máquina diferentes</h2>
        <p>Até aqui vimos que o compilador precisa gerar instruções válidas para uma ISA específica. Agora vamos tornar isso concreto comparando dois alvos reais: <strong>x86-64</strong> e <strong>ARM64</strong>. O objetivo não é decorar instruções de nenhuma das duas arquiteturas, mas perceber o que muda quando o mesmo programa precisa ser executado por máquinas com contratos diferentes.</p>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>Por que comparar justamente essas duas famílias?</h3>
          <p>As famílias x86 e ARM são exemplos importantes de projetos de processador desenvolvidos a partir de tradições arquiteturais diferentes. A família x86 evoluiu durante muitas gerações mantendo compatibilidade com um conjunto amplo de instruções. A família ARM foi desenvolvida dentro da tradição de conjuntos reduzidos de instruções e com forte uso de registradores.</p>
          <p>Para quem desenvolve software, a consequência prática é simples: <strong>a mesma intenção escrita em C pode resultar em sequências de instruções diferentes quando o alvo muda</strong>.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>O que permanece</strong><p>O algoritmo, as regras de negócio e o comportamento esperado do programa podem continuar exatamente os mesmos.</p></div>
          <div class="study-callout"><strong>O que muda</strong><p>As instruções disponíveis, os registradores, os formatos das instruções e as formas de acessar operandos dependem da arquitetura escolhida.</p></div>
        </div>
      </div>

      <div class="architecture-compare">
        <article class="architecture-side">
          <small>Família x86</small>
          <h3>x86-64</h3>
          <p>É uma evolução da família x86. Seu conjunto de instruções foi ampliado ao longo de várias gerações, preservando compatibilidade e incorporando novas capacidades.</p>
          <p>Ao compilar para x86-64, o compilador precisa escolher instruções, registradores e formas de endereçamento pertencentes a esse contrato.</p>
        </article>
        <article class="architecture-side">
          <small>Família ARM</small>
          <h3>ARM64</h3>
          <p>A família ARM está associada historicamente à tradição RISC, com forte uso de registradores e formatos de instrução mais regulares.</p>
          <p>Ao compilar para ARM64, o compilador trabalha com outro repertório de instruções, outros registradores e outras regras de codificação e acesso a dados.</p>
        </article>
      </div>

      <div class="boundary">
        <strong>RISC × CISC é uma forma de contextualizar, não de escolher um vencedor</strong>
        <p>Esses termos ajudam a entender tradições de projeto. Eles não devem ser usados como um ranking simples de desempenho. Para esta aula, o que importa é perceber que arquiteturas diferentes oferecem recursos e regras diferentes ao software.</p>
      </div>

      <div class="study-prose">
        <h3>Exemplo · a mesma função, dois targets</h3>
        <p>Considere uma função simples. Em linguagem de alto nível, a intenção é apenas somar dois valores e devolver o resultado.</p>
      </div>

      <div class="code-reading">
        <div class="study-code">
          <div class="study-code-head"><span>C</span><span>mesmo código-fonte</span></div>
          <pre><code>int soma(int a, int b) {
    return a + b;
}</code></pre>
        </div>
        <div class="reading-list">
          <div class="reading-item"><strong>Target x86-64</strong><p>O compilador seleciona registradores e instruções definidos pela ISA x86-64.</p></div>
          <div class="reading-item"><strong>Target ARM64</strong><p>O compilador precisa expressar a mesma soma usando registradores e instruções definidos pela ISA ARM64.</p></div>
          <div class="reading-item"><strong>Resultado lógico</strong><p>Nos dois casos, a função continua devendo produzir o mesmo resultado para as mesmas entradas.</p></div>
        </div>
      </div>

      <div class="study-callout">
        <strong>O ponto importante não é o nome da instrução</strong>
        <p>Se em um target aparece uma instrução com determinado nome e no outro aparece outra, isso não significa que um programa “mudou de ideia”. Significa que o compilador expressou a mesma intenção usando o vocabulário disponível em cada ISA.</p>
      </div>

      <div class="study-prose">
        <h3>O que comparar quando o Assembly for diferente?</h3>
        <p>Em vez de tentar alinhar linha por linha, compare o papel das operações. Procure identificar onde cada versão realiza cálculo, movimenta dados, acessa memória e controla o fluxo.</p>
      </div>

      <div class="design-list">
        <div class="design-row"><strong>Registradores</strong><span>Os nomes e a organização dos registradores mudam entre as arquiteturas.</span></div>
        <div class="design-row"><strong>Operações</strong><span>Uma mesma intenção pode ser implementada por instruções com nomes e capacidades diferentes.</span></div>
        <div class="design-row"><strong>Endereçamento</strong><span>As formas disponíveis para localizar operandos e acessar memória podem ser diferentes.</span></div>
        <div class="design-row"><strong>Formato das instruções</strong><span>A maneira como os bits representam operação e operandos também depende da arquitetura.</span></div>
        <div class="design-row"><strong>Quantidade de instruções</strong><span>Uma sequência pode usar mais ou menos instruções sem que isso, isoladamente, indique melhor desempenho.</span></div>
      </div>

      <div class="study-prose">
        <h3>Experimento mental · o que acontece quando mudamos apenas o target?</h3>
        <p>Suponha que o código-fonte, o compilador e o nível de otimização permaneçam os mesmos. A única mudança é trocar o alvo de x86-64 para ARM64.</p>
      </div>

      <div class="compatibility-grid">
        <div class="compatibility-card"><small>Permanece</small><strong>Algoritmo</strong><p>A lógica escrita no código-fonte continua a mesma.</p></div>
        <div class="compatibility-card"><small>Muda</small><strong>Representação de máquina</strong><p>O compilador passa a gerar instruções pertencentes a outra ISA.</p></div>
        <div class="compatibility-card"><small>Consequência</small><strong>Outro artefato</strong><p>O binário produzido para uma arquitetura não deve ser tratado como se fosse automaticamente executável pela outra.</p></div>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>Como observar isso no Compiler Explorer?</h3>
          <p>Use exatamente o mesmo trecho de C e gere primeiro para x86-64 e depois para ARM64. Não tente traduzir cada linha de Assembly. Observe padrões.</p>
          <p>Compare os registradores utilizados, os nomes das operações, os acessos à memória e as instruções de controle. Depois tente explicar <strong>o que permaneceu semanticamente igual</strong> apesar das diferenças de representação.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Pergunta 1</strong><p>Quais diferenças são apenas de vocabulário da ISA?</p></div>
          <div class="study-callout"><strong>Pergunta 2</strong><p>Em ambos os targets você consegue localizar onde ocorre o cálculo principal?</p></div>
          <div class="study-callout"><strong>Pergunta 3</strong><p>O fato de uma saída ter mais linhas permite concluir que ela é pior? Por quê?</p></div>
        </div>
      </div>

      <div class="boundary">
        <strong>O ponto central desta seção</strong>
        <p><strong>Target</strong> não é apenas uma opção do compilador: ele define qual contrato de máquina a tradução precisa respeitar. x86-64 e ARM64 podem executar programas com o mesmo comportamento, mas o código de máquina produzido para cada uma é construído segundo regras diferentes.</p>
      </div>
    `;
  };

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@a0e1a400ed83ce30bcf50c66aa649269de2e8c70/script.js';
  previousScript.defer = true;
  previousScript.addEventListener('load', improveAula04Architectures);
  previousScript.addEventListener('error', improveAula04Architectures);
  document.head.appendChild(previousScript);

  let attempts = 0;
  const timer = window.setInterval(() => {
    improveAula04Architectures();
    attempts += 1;
    if (attempts >= 30) window.clearInterval(timer);
  }, 150);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveAula04Architectures, { once: true });
  } else {
    improveAula04Architectures();
  }
})();