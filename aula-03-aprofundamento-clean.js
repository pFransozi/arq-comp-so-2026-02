(() => {
  const base = document.createElement('script');
  base.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@a30bbb6b22aa2042b02ad57d421964ba6a399b39/aula-03-aprofundamento-clean.js';
  base.defer = true;

  base.addEventListener('load', () => {
    const reviewSection = document.querySelector('#limites');
    const reviewContainer = reviewSection?.querySelector('.container');

    if (reviewContainer) {
      reviewContainer.innerHTML = `
        <div class="study-heading">
          <p class="study-kicker">9 · Revisão</p>
          <h2>Retome os principais conceitos</h2>
          <p>Use esta síntese para verificar se você consegue relacionar as ideias centrais da aula e explicar como elas se conectam durante a execução de um programa.</p>
        </div>

        <div class="check-grid">
          <article class="check-card">
            <span>01</span>
            <strong>Função × estrutura</strong>
            <p>Consigo diferenciar o que um componente faz da forma como ele se conecta e se organiza com os demais componentes do sistema.</p>
          </article>

          <article class="check-card">
            <span>02</span>
            <strong>Arquitetura × organização</strong>
            <p>Consigo separar características visíveis ao programador das escolhas internas usadas para implementar o computador.</p>
          </article>

          <article class="check-card">
            <span>03</span>
            <strong>CPU, memória, E/S e interconexão</strong>
            <p>Consigo explicar o papel dos principais componentes e por que a execução depende da cooperação entre processamento, armazenamento, comunicação e dispositivos externos.</p>
          </article>

          <article class="check-card">
            <span>04</span>
            <strong>Programa armazenado</strong>
            <p>Consigo explicar por que instruções e dados podem permanecer na memória e como a CPU localiza e utiliza essas informações durante a execução.</p>
          </article>

          <article class="check-card">
            <span>05</span>
            <strong>Registradores e ciclo de instrução</strong>
            <p>Consigo relacionar PC, IR, MAR e MBR às etapas de busca, decodificação e execução sem tratá-los como uma lista universal de toda CPU.</p>
          </article>

          <article class="check-card">
            <span>06</span>
            <strong>Comunicação interna</strong>
            <p>Consigo explicar por que uma transferência envolve conteúdo, endereço e sinais de controle e como esses elementos aparecem em uma leitura ou escrita de memória.</p>
          </article>

          <article class="check-card">
            <span>07</span>
            <strong>von Neumann × Harvard</strong>
            <p>Consigo comparar os dois modelos pela organização e pelos caminhos de instruções e dados, reconhecendo que máquinas atuais podem combinar características de ambos.</p>
          </article>

          <article class="check-card">
            <span>08</span>
            <strong>Entrada e saída</strong>
            <p>Consigo explicar por que dispositivos externos são mediados por módulos ou controladores de E/S e como essa comunicação se integra ao restante do sistema.</p>
          </article>
        </div>

        <div class="boundary">
          <strong>Uma forma de conectar tudo</strong>
          <p>Uma instrução armazenada precisa ser localizada na memória, transferida até a CPU, interpretada e executada. Dependendo da operação, a CPU pode usar registradores, acessar dados na memória, alterar o fluxo de execução ou comunicar-se com um dispositivo de E/S. É essa sequência de relações que une os conceitos trabalhados nesta aula.</p>
        </div>
      `;
    }

    document.querySelectorAll('a[href="#limites"]').forEach((link) => {
      link.textContent = 'Revisão dos conceitos';
    });

    const referencesSection = document.querySelector('#referencias');
    const referencesContainer = referencesSection?.querySelector('.container');

    if (referencesContainer) {
      referencesContainer.innerHTML = `
        <div class="study-heading">
          <p class="study-kicker">10 · Referências</p>
          <h2>Referências bibliográficas</h2>
        </div>

        <div class="study-prose">
          <ul class="references">
            <li><em>Arquitetura e organização de computadores: projetando com foco em desempenho.</em> 11. ed. Bookman, 2024.</li>
            <li><em>Organização e arquitetura de computadores: uma jornada do fundamental ao inovador.</em> Freitas Bastos, 2023.</li>
            <li><em>Sistemas operacionais modernos.</em> 5. ed. Bookman, 2024.</li>
          </ul>
        </div>
      `;
    }
  });

  document.head.appendChild(base);
})();
