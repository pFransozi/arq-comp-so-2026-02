(() => {
  const path = window.location.pathname;
  const isAula06 = /(?:^|\/)(?:rascunhos\/)?aula-06\.html$/.test(path);

  const improveAula06Experiment = () => {
    if (!isAula06) return;
    const container = document.querySelector('#experimento .container');
    if (!container) return;

    container.innerHTML = `
      <div class="section-heading">
        <p class="eyebrow">Experimento final</p>
        <h2>Mesmos dados, mesma resposta, percursos diferentes</h2>
        <p>Vamos comparar implementações que realizam o mesmo trabalho lógico, mas acessam ou movimentam os dados de maneiras diferentes. A sequência será sempre a mesma: <strong>entender o percurso → formular uma hipótese → executar → interpretar a medição.</strong></p>
      </div>

      <div class="cache-explanation">
        <strong>Pergunta do experimento:</strong> se duas implementações processam os mesmos dados e produzem o mesmo resultado, a forma como elas percorrem ou gravam esses dados pode alterar o tempo de execução?
      </div>

      <div class="inquiry">
        <div class="inquiry-head">
          <span class="inquiry-kicker">Antes do código</span>
          <span class="inquiry-tag">visualize o percurso</span>
        </div>
        <div class="inquiry-body">
          <div>
            <h3>Imagine uma matriz 3 × 4</h3>
            <p>Na memória, vamos representá-la como uma sequência linear de posições:</p>
            <div class="code-frame"><pre><code>linha 0 →  0   1   2   3
linha 1 →  4   5   6   7
linha 2 →  8   9  10  11</code></pre></div>
            <p>A posição de um elemento é calculada por <code>linha * COLUNAS + coluna</code>.</p>
          </div>
          <div>
            <h3>Dois percursos possíveis</h3>
            <div class="concept-pair">
              <div class="concept-item"><strong>Por linhas</strong><p><code>0 → 1 → 2 → 3 → 4 → 5 → ...</code></p></div>
              <div class="concept-item"><strong>Por colunas</strong><p><code>0 → 4 → 8 → 1 → 5 → 9 → ...</code></p></div>
            </div>
            <ol class="prompt-list" style="margin-top:16px">
              <li>Qual percurso acessa mais posições consecutivas?</li>
              <li>Qual deles parece favorecer melhor a localidade espacial?</li>
              <li>Qual você espera que seja mais rápido? Registre a hipótese antes de executar.</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="inquiry">
        <div class="inquiry-head">
          <span class="inquiry-kicker">Parte A · Acesso em memória</span>
          <span class="inquiry-tag">Python</span>
        </div>
        <div class="inquiry-body">
          <div>
            <h3>O que deve permanecer igual?</h3>
            <p>As duas funções devem percorrer <strong>todos os elementos</strong> e produzir <strong>a mesma soma</strong>. O que muda é apenas a ordem de acesso.</p>
            <div class="concept-pair">
              <div class="concept-item"><strong>Percurso por linhas</strong><p>A linha varia no laço externo; dentro dela, percorremos as colunas.</p></div>
              <div class="concept-item"><strong>Percurso por colunas</strong><p>A coluna varia no laço externo; dentro dela, percorremos as linhas.</p></div>
            </div>
          </div>
          <div>
            <h3>Antes de programar</h3>
            <ol class="prompt-list">
              <li>As duas funções realizarão a mesma quantidade de somas?</li>
              <li>Qual delas tende a acessar endereços consecutivos?</li>
              <li>Qual resultado você espera observar no tempo de execução?</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="code-frame">
        <div class="code-caption">Infraestrutura fornecida — implemente apenas os dois percursos</div>
        <pre><code>from time import perf_counter

LINHAS = 1500
COLUNAS = 1500

dados = bytearray([1]) * (LINHAS * COLUNAS)


def percorrer_por_linhas():
    total = 0
    # percorra linha por linha
    # use: posicao = linha * COLUNAS + coluna
    return total


def percorrer_por_colunas():
    total = 0
    # percorra coluna por coluna
    # use: posicao = linha * COLUNAS + coluna
    return total


def medir(nome, funcao):
    inicio = perf_counter()
    resultado = funcao()
    fim = perf_counter()
    print(f"{nome}: resultado={resultado} | tempo={fim - inicio:.4f}s")

medir("Por linhas", percorrer_por_linhas)
medir("Por colunas", percorrer_por_colunas)</code></pre>
      </div>

      <div class="inquiry">
        <div class="inquiry-head">
          <span class="inquiry-kicker">Depois de executar</span>
          <span class="inquiry-tag">compare antes de concluir</span>
        </div>
        <div class="inquiry-body">
          <div>
            <h3>Repita a medição</h3>
            <p>Execute o programa pelo menos três vezes. Pequenas variações são normais. Procure o <strong>padrão geral</strong>, não apenas um único número.</p>
            <div class="trace-table-wrap">
              <table class="trace-table" style="min-width:560px">
                <thead><tr><th>Percurso</th><th>Execução 1</th><th>Execução 2</th><th>Execução 3</th></tr></thead>
                <tbody><tr><td>Por linhas</td><td></td><td></td><td></td></tr><tr><td>Por colunas</td><td></td><td></td><td></td></tr></tbody>
              </table>
            </div>
          </div>
          <div>
            <h3>Interprete</h3>
            <ol class="prompt-list">
              <li>Os resultados das duas funções são iguais?</li>
              <li>O percurso por linhas foi mais rápido na maioria das execuções?</li>
              <li>Como a sequência de endereços ajuda a explicar o resultado?</li>
              <li>Se a diferença foi pequena, que custo do próprio Python pode estar mascarando parte do efeito?</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="precision-note">
        <strong>Resultado esperado, não uma regra absoluta.</strong> O percurso por linhas tende a ser mais rápido porque acessa posições consecutivas e favorece a localidade espacial. Como o experimento roda em Python, o custo do interpretador e dos laços também participa da medição e pode reduzir a diferença observada.
      </div>

      <div class="inquiry">
        <div class="inquiry-head">
          <span class="inquiry-kicker">Parte B · Persistência</span>
          <span class="inquiry-tag">mesmo conteúdo · estratégias diferentes</span>
        </div>
        <div class="inquiry-body">
          <div>
            <h3>Agora mude o tipo de movimentação</h3>
            <p>Em vez de mudar a ordem de acesso à memória, vamos manter o mesmo conteúdo e mudar <strong>como ele é enviado ao arquivo</strong>.</p>
            <div class="concept-pair">
              <div class="concept-item"><strong>Linha a linha</strong><p>O programa chama <code>write()</code> repetidamente dentro de um laço.</p></div>
              <div class="concept-item"><strong>Em bloco</strong><p>O programa reúne o conteúdo e realiza uma chamada de escrita com um bloco maior.</p></div>
            </div>
          </div>
          <div>
            <h3>Formule a hipótese</h3>
            <ol class="prompt-list">
              <li>As duas estratégias gravam a mesma quantidade de linhas?</li>
              <li>Qual delas realiza mais chamadas de <code>write()</code> no código Python?</li>
              <li>Qual você espera que tenha menor tempo? Por quê?</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="code-frame">
        <div class="code-caption">Ponto de partida — implemente as duas estratégias</div>
        <pre><code>resultados = [f"{i};{i*i}\\n" for i in range(200_000)]


def gravar_linha_a_linha():
    with open("saida_linhas.txt", "w", encoding="utf-8") as arquivo:
        # percorra resultados e use arquivo.write(...)
        pass


def gravar_em_bloco():
    with open("saida_bloco.txt", "w", encoding="utf-8") as arquivo:
        # reúna as linhas e faça uma escrita em bloco
        pass


medir("Linha a linha", gravar_linha_a_linha)
medir("Em bloco", gravar_em_bloco)</code></pre>
      </div>

      <div class="inquiry">
        <div class="inquiry-head">
          <span class="inquiry-kicker">Fechamento do experimento</span>
          <span class="inquiry-tag">interpretação</span>
        </div>
        <div class="inquiry-body">
          <div>
            <h3>Compare as duas partes</h3>
            <p>Na Parte A, mudamos a <strong>ordem de acesso</strong>. Na Parte B, mudamos a <strong>forma de agrupar operações de escrita</strong>. Nos dois casos, a funcionalidade permanece equivalente, mas o percurso dos dados muda.</p>
          </div>
          <div>
            <h3>Explique com os conceitos da aula</h3>
            <ol class="prompt-list">
              <li>Onde aparece a <strong>localidade espacial</strong> na Parte A?</li>
              <li>Onde aparecem <strong>latência</strong> e <strong>agrupamento de operações</strong> na Parte B?</li>
              <li>Que decisão de Engenharia de Software foi alterada em cada experimento?</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="cache-explanation">
        <strong>Ideia que deve ficar:</strong> desempenho não depende apenas do algoritmo em sentido abstrato. A forma como o software <strong>organiza, percorre e movimenta dados</strong> também cria custos que podem ser observados por medição.
      </div>
    `;
  };

  const previousScript = document.createElement('script');
  previousScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@28d139bec288eaa289489c02caed7fdcbb941ca6/script.js';
  previousScript.defer = true;
  previousScript.addEventListener('load', improveAula06Experiment);
  previousScript.addEventListener('error', improveAula06Experiment);
  document.head.appendChild(previousScript);

  let attempts = 0;
  const timer = window.setInterval(() => {
    improveAula06Experiment();
    attempts += 1;
    if (attempts >= 30) window.clearInterval(timer);
  }, 150);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveAula06Experiment, { once: true });
  } else {
    improveAula06Experiment();
  }
})();