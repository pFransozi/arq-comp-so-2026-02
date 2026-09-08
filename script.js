(() => {
  const isAula04Aprofundamento = /(?:^|\/)aula-04-aprofundamento\.html$/.test(window.location.pathname);

  const improveAula04ISA = () => {
    if (!isAula04Aprofundamento) return;
    const container = document.querySelector('#isa .container');
    if (!container) return;

    container.innerHTML = `
      <div class="study-heading">
        <p class="study-kicker">3 · ISA por dentro</p>
        <h2>A ISA é o vocabulário e o conjunto de regras que a máquina entende</h2>
        <p>Depois de entender a diferença entre código de alto nível e código de máquina, precisamos olhar para a regra que conecta o software ao processador. A <strong>ISA — Instruction Set Architecture</strong> define quais instruções de máquina existem, quais dados elas podem manipular, como os operandos são indicados e como essas instruções são representadas.</p>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>Pense na ISA como um contrato entre software e hardware</h3>
          <p>O compilador não pode gerar qualquer operação que desejar. Para produzir código de máquina, ele precisa utilizar apenas as instruções, registradores, formatos e formas de endereçamento definidos pela arquitetura-alvo.</p>
          <p>O processador, por sua vez, precisa implementar esse contrato: ao encontrar uma instrução válida, deve interpretá-la e produzir o efeito definido sobre registradores, memória e fluxo de execução.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Do lado do software</strong><p>O compilador transforma o programa em instruções pertencentes à ISA escolhida como alvo.</p></div>
          <div class="study-callout"><strong>Do lado do hardware</strong><p>O processador reconhece essas instruções e executa os efeitos previstos pela arquitetura.</p></div>
        </div>
      </div>

      <div class="study-prose">
        <h3>O que uma ISA precisa definir?</h3>
        <p>Não basta existir uma lista de nomes de instruções. A arquitetura precisa definir vários elementos para que uma instrução possa ser codificada, interpretada e executada.</p>
      </div>

      <div class="design-list">
        <div class="design-row"><strong>Operações</strong><span>Quais ações podem ser executadas: somar, subtrair, comparar, mover dados, carregar, armazenar, desviar a execução e outras.</span></div>
        <div class="design-row"><strong>Tipos de dados</strong><span>Quais dados podem ser manipulados diretamente, como números, caracteres e valores lógicos representados em bits.</span></div>
        <div class="design-row"><strong>Registradores</strong><span>Quais registradores existem e como as instruções podem utilizá-los para armazenar operandos, resultados e informações de controle.</span></div>
        <div class="design-row"><strong>Formato das instruções</strong><span>Como os bits são organizados para identificar a operação e os operandos envolvidos.</span></div>
        <div class="design-row"><strong>Endereçamento</strong><span>Como uma instrução indica onde encontrar seus dados: na própria instrução, em registradores ou na memória.</span></div>
        <div class="design-row"><strong>Fluxo de execução</strong><span>Como a máquina determina a próxima instrução e como testes e desvios podem alterar a sequência normal do programa.</span></div>
      </div>

      <div class="study-prose">
        <h3>Abra uma instrução em partes</h3>
        <p>Uma instrução de máquina precisa fornecer ao processador informações suficientes para realizar uma operação. Conceitualmente, podemos lê-la respondendo a quatro perguntas.</p>
      </div>

      <div class="instruction-anatomy" aria-label="Elementos conceituais de uma instrução de máquina">
        <div class="instruction-field"><small>O que fazer?</small><strong>Operação / opcode</strong></div>
        <div class="instruction-field"><small>Com quais dados?</small><strong>Operandos de entrada</strong></div>
        <div class="instruction-field"><small>Onde fica o resultado?</small><strong>Operando de resultado</strong></div>
        <div class="instruction-field"><small>O que vem depois?</small><strong>Próxima instrução</strong></div>
      </div>
      <p class="instruction-caption">Representação conceitual. A quantidade de campos e a forma de codificação variam entre arquiteturas e formatos de instrução.</p>

      <div class="study-prose">
        <h3>Exemplo 1 · uma soma entre registradores</h3>
        <p>Considere a pseudo-instrução abaixo. Ela não representa a sintaxe exata de x86 ou ARM; serve apenas para enxergar os elementos que uma instrução precisa expressar.</p>
      </div>

      <div class="code-reading">
        <div class="study-code">
          <div class="study-code-head"><span>Pseudo-Assembly</span><span>exemplo didático</span></div>
          <pre><code>SOMAR R3, R1, R2</code></pre>
        </div>
        <div class="reading-list">
          <div class="reading-item"><strong>Operação</strong><p><code>SOMAR</code> representa o trabalho que deve ser realizado.</p></div>
          <div class="reading-item"><strong>Operandos fonte</strong><p><code>R1</code> e <code>R2</code> representam os valores usados como entrada.</p></div>
          <div class="reading-item"><strong>Resultado</strong><p><code>R3</code> representa o local que receberá o resultado.</p></div>
          <div class="reading-item"><strong>Próxima instrução</strong><p>Se não houver desvio, a execução normalmente continua na instrução seguinte.</p></div>
        </div>
      </div>

      <div class="study-callout">
        <strong>Uma instrução altera o estado da máquina</strong>
        <p>Antes da execução, os registradores possuem determinados valores. Depois da instrução, o valor de <code>R3</code> muda para refletir o resultado da soma. O efeito esperado dessa operação faz parte do contrato definido pela ISA.</p>
      </div>

      <div class="study-prose">
        <h3>Exemplo 2 · onde o operando pode estar?</h3>
        <p>Outra parte importante da ISA é definir como localizar os operandos. O dado pode estar em locais diferentes, e a instrução precisa fornecer informação suficiente para encontrá-lo.</p>
      </div>

      <div class="operand-grid">
        <div class="operand-card"><strong>Imediato</strong><p>O valor está dentro da própria instrução. Exemplo didático: <code>SOMAR R1, R1, 5</code>. Nesse caso, <code>5</code> é o operando imediato.</p></div>
        <div class="operand-card"><strong>Registrador</strong><p>O valor já está em um registrador. Exemplo didático: <code>SOMAR R1, R1, R2</code>.</p></div>
        <div class="operand-card"><strong>Memória</strong><p>A instrução precisa indicar como localizar um endereço de memória antes de usar o valor armazenado nele.</p></div>
        <div class="operand-card"><strong>Base + deslocamento</strong><p>Um endereço pode ser calculado combinando o conteúdo de um registrador-base com um deslocamento. Isso é útil para acessar variáveis locais, campos de estruturas e elementos de vetores.</p></div>
      </div>

      <div class="code-reading">
        <div class="study-code">
          <div class="study-code-head"><span>Pseudo-Assembly</span><span>endereçamento didático</span></div>
          <pre><code>CARREGAR R1, [BASE + 8]</code></pre>
        </div>
        <div class="reading-list">
          <div class="reading-item"><strong>BASE</strong><p>Representa um registrador que contém uma referência inicial.</p></div>
          <div class="reading-item"><strong>+ 8</strong><p>Representa um deslocamento usado para chegar ao dado desejado.</p></div>
          <div class="reading-item"><strong>R1</strong><p>Recebe o valor obtido da memória.</p></div>
        </div>
      </div>

      <div class="boundary">
        <strong>O mesmo objetivo pode ser expresso de formas diferentes</strong>
        <p>Arquiteturas diferentes podem oferecer repertórios de instruções, registradores, formatos e modos de endereçamento diferentes. Por isso, o compilador pode produzir sequências distintas para x86-64 e ARM64 mesmo quando o código-fonte descreve exatamente o mesmo comportamento.</p>
      </div>

      <div class="study-prose">
        <h3>Exemplo 3 · uma decisão também depende da ISA</h3>
        <p>Considere novamente uma condição como <code>if (a &gt; b)</code>. Em algum momento, a tradução precisa representar pelo menos duas tarefas: <strong>comparar os valores</strong> e <strong>alterar o fluxo de execução</strong> de acordo com o resultado.</p>
        <p>A ISA precisa fornecer operações capazes de sustentar esse comportamento. Os detalhes podem variar entre arquiteturas: a forma de representar o resultado da comparação, a instrução usada para o desvio, os registradores envolvidos e a codificação das instruções não precisam ser iguais.</p>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>O que observar no Compiler Explorer?</h3>
          <p>Ao olhar para o Assembly, identifique primeiro as categorias, não tente decorar os nomes. Pergunte: há uma operação aritmética? Há movimentação entre memória e registradores? Aparece algum valor imediato? Há comparação ou desvio?</p>
          <p>Depois altere o target. Observe quais elementos mudaram: registradores, instruções, quantidade de operações e formas de acessar dados. Essas diferenças são manifestações concretas de contratos de ISA diferentes.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Procure a operação</strong><p>Qual instrução parece realizar o cálculo ou a comparação?</p></div>
          <div class="study-callout"><strong>Procure os operandos</strong><p>Eles aparecem como registradores, constantes ou referências à memória?</p></div>
          <div class="study-callout"><strong>Procure o controle</strong><p>Há alguma instrução que altere qual será a próxima instrução executada?</p></div>
        </div>
      </div>

      <div class="boundary">
        <strong>O ponto central desta seção</strong>
        <p>A ISA não descreve o programa que queremos construir. Ela descreve <strong>quais operações a máquina sabe executar e como essas operações devem ser expressas</strong>. O compilador transforma o comportamento escrito em linguagem de alto nível em uma sequência que respeita esse contrato.</p>
      </div>
    `;
  };

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@aea617e782ad1f4be34349f46928bf00cbb6e8cd/script.js';
  previousScript.defer = true;
  previousScript.addEventListener('load', improveAula04ISA);
  previousScript.addEventListener('error', improveAula04ISA);
  document.head.appendChild(previousScript);

  let attempts = 0;
  const timer = window.setInterval(() => {
    improveAula04ISA();
    attempts += 1;
    if (attempts >= 30) window.clearInterval(timer);
  }, 150);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveAula04ISA, { once: true });
  } else {
    improveAula04ISA();
  }
})();