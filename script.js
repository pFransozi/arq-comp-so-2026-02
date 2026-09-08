(() => {
  const isAula04Aprofundamento = /(?:^|\/)aula-04-aprofundamento\.html$/.test(window.location.pathname);

  const improveAula04HighLevel = () => {
    if (!isAula04Aprofundamento) return;
    const container = document.querySelector('#compilacao .container');
    if (!container) return;

    container.innerHTML = `
      <div class="study-heading">
        <p class="study-kicker">2 · Código de alto nível e código de máquina</p>
        <h2>Do que escrevemos ao que o processador consegue executar</h2>
        <p>Quando programamos, normalmente descrevemos uma solução usando abstrações pensadas para pessoas. O processador, porém, não executa diretamente um <code>if</code>, um <code>for</code>, uma função ou o nome de uma variável. Antes da execução, essas construções precisam ser traduzidas para instruções pertencentes ao conjunto de instruções da máquina-alvo.</p>
      </div>

      <div class="architecture-compare">
        <article class="architecture-side">
          <small>Mais próximo do programador</small>
          <h3>Código de alto nível</h3>
          <p>É o código escrito em linguagens como C, C++, Java ou Python. Ele permite expressar algoritmos com variáveis, expressões, funções, condições, repetições e outras estruturas que tornam o programa mais legível e mais fácil de desenvolver.</p>
          <p>Nesse nível, muitos detalhes da máquina ficam escondidos. Ao escrever <code>x = x + y</code>, por exemplo, não precisamos indicar manualmente qual registrador receberá cada valor nem quais bits formarão a instrução executada.</p>
        </article>
        <article class="architecture-side">
          <small>Mais próximo do processador</small>
          <h3>Código de máquina</h3>
          <p>É a representação composta pelas instruções que o processador executa diretamente. Cada instrução é codificada em bits e segue as regras da ISA da arquitetura-alvo.</p>
          <p>Essas instruções precisam indicar operações como somar, comparar, mover dados ou desviar a execução e também fornecer as informações necessárias para localizar seus operandos.</p>
        </article>
      </div>

      <div class="study-callout">
        <strong>Assembly não é código de máquina</strong>
        <p>A linguagem Assembly é uma representação simbólica das instruções da máquina. Em vez de ler uma sequência de bits, usamos nomes para operações, registradores e referências. Ela continua dependente da arquitetura, mas é muito mais legível para nós. É por isso que o Compiler Explorer mostra Assembly: ele funciona como uma janela para observar a tradução sem exigir que interpretemos diretamente o código binário.</p>
      </div>

      <div class="study-prose">
        <h3>Uma operação simples já mostra a diferença entre os dois níveis</h3>
        <p>Considere a expressão abaixo. Para quem programa, ela descreve uma única intenção: somar o valor de <code>y</code> ao valor de <code>x</code> e guardar o resultado novamente em <code>x</code>.</p>
      </div>

      <div class="code-reading">
        <div class="study-code">
          <div class="study-code-head"><span>C</span><span>linguagem de alto nível</span></div>
          <pre><code>x = x + y;</code></pre>
        </div>
        <div class="reading-list">
          <div class="reading-item"><strong>1 · Buscar o primeiro valor</strong><p>A máquina pode precisar carregar o valor associado a <code>x</code> para um registrador.</p></div>
          <div class="reading-item"><strong>2 · Realizar a soma</strong><p>Uma instrução aritmética utiliza o valor de <code>y</code> e o valor já disponível para produzir o resultado.</p></div>
          <div class="reading-item"><strong>3 · Guardar o resultado</strong><p>O novo valor precisa ser colocado no local associado a <code>x</code>.</p></div>
        </div>
      </div>

      <div class="boundary">
        <strong>Uma linha de código de alto nível pode exigir várias instruções de máquina</strong>
        <p>A linguagem de alto nível permite expressar uma operação de forma concisa. A máquina precisa de operações elementares capazes de movimentar dados, processá-los e controlar a sequência de execução. Por isso, não existe uma relação fixa de “uma linha de código = uma instrução de máquina”.</p>
      </div>

      <div class="study-prose">
        <h3>Que tipos de trabalho a máquina precisa conseguir representar?</h3>
        <p>Para executar programas escritos em linguagens de alto nível, o conjunto de instruções precisa oferecer operações suficientes para decompor essas construções em ações executáveis pelo processador. Podemos organizar essas ações em quatro grupos úteis:</p>
      </div>

      <div class="design-list">
        <div class="design-row"><strong>Processamento de dados</strong><span>Operações aritméticas e lógicas, como somas, comparações e manipulações de bits.</span></div>
        <div class="design-row"><strong>Armazenamento de dados</strong><span>Operações que movimentam valores entre registradores e memória.</span></div>
        <div class="design-row"><strong>Entrada e saída</strong><span>Operações necessárias para que dados entrem no sistema ou sejam enviados para dispositivos e serviços externos.</span></div>
        <div class="design-row"><strong>Controle</strong><span>Testes e desvios que permitem alterar a próxima instrução executada, dando suporte a decisões, repetições e chamadas.</span></div>
      </div>

      <div class="study-prose">
        <h3>Agora observe uma estrutura que usamos o tempo todo</h3>
        <p>Uma condição parece simples no código-fonte, mas precisa ser decomposta em operações menores. Considere a função:</p>
      </div>

      <div class="code-reading">
        <div class="study-code">
          <div class="study-code-head"><span>C</span><span>exemplo com decisão</span></div>
          <pre><code>int maior(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}</code></pre>
        </div>
        <div class="reading-list">
          <div class="reading-item"><strong>Comparar</strong><p>O processador precisa realizar uma operação que permita determinar a relação entre <code>a</code> e <code>b</code>.</p></div>
          <div class="reading-item"><strong>Tomar uma decisão</strong><p>O resultado da comparação precisa influenciar qual caminho da execução será seguido.</p></div>
          <div class="reading-item"><strong>Selecionar o resultado</strong><p>Dependendo da decisão, um dos dois valores precisa ser escolhido como resultado da função.</p></div>
          <div class="reading-item"><strong>Continuar a execução</strong><p>Concluída a função, o processador precisa prosseguir a partir do ponto adequado do programa.</p></div>
        </div>
      </div>

      <div class="study-grid">
        <div class="study-prose">
          <h3>O que observar no Compiler Explorer?</h3>
          <p>Não é necessário decorar instruções. Primeiro identifique <strong>o papel</strong> das operações que aparecem: movimentação de dados, cálculo, comparação, controle de fluxo e retorno.</p>
          <p>Depois altere o target e compare novamente. A intenção do programa continua a mesma, mas os nomes das instruções, os registradores utilizados e a sequência produzida podem mudar porque outra ISA está sendo usada como alvo.</p>
        </div>
        <div class="study-stack">
          <div class="study-callout"><strong>Pergunta útil</strong><p>Qual parte do Assembly parece corresponder à comparação? Qual parte parece controlar a decisão?</p></div>
          <div class="study-callout"><strong>Evite uma armadilha</strong><p>Contar linhas de Assembly, sozinho, não explica se uma tradução é “melhor”. Instruções diferentes podem realizar quantidades diferentes de trabalho.</p></div>
        </div>
      </div>

      <div class="boundary">
        <strong>O ponto central desta seção</strong>
        <p>O código de alto nível descreve <strong>o que queremos que o programa faça</strong> usando abstrações adequadas ao desenvolvimento de software. O código de máquina descreve esse comportamento como <strong>instruções que um processador específico consegue executar</strong>. O compilador faz a ponte entre esses dois níveis.</p>
      </div>
    `;
  };

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@8184b6f115782a7bd88454cb4dbe50f435547bf3/script.js';
  previousScript.defer = true;
  previousScript.addEventListener('load', improveAula04HighLevel);
  previousScript.addEventListener('error', improveAula04HighLevel);
  document.head.appendChild(previousScript);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveAula04HighLevel, { once: true });
  } else {
    improveAula04HighLevel();
  }
})();