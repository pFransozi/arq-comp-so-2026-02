(() => {
  const base = document.createElement('script');
  base.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@a30bbb6b22aa2042b02ad57d421964ba6a399b39/aula-03-aprofundamento-clean.js';
  base.defer = true;

  base.addEventListener('load', () => {
    const limits = document.querySelector('#limites');
    if (limits) {
      const kicker = limits.querySelector('.study-heading .study-kicker');
      const title = limits.querySelector('.study-heading h2');
      const intro = limits.querySelector('.study-heading > p:last-child');
      const headers = limits.querySelectorAll('.study-table th');

      if (kicker) kicker.textContent = '9 · Limites do modelo';
      if (title) title.textContent = 'O que este modelo permite explicar';
      if (intro) {
        intro.textContent = 'Todo modelo destaca alguns aspectos do computador e simplifica outros. Reconhecer esses limites ajuda a saber até onde cada explicação é válida e quais detalhes não estão representados neste nível de análise.';
      }
      if (headers[0]) headers[0].textContent = 'Modelo usado';
      if (headers[1]) headers[1].textContent = 'O que ele ajuda a explicar';
      if (headers[2]) headers[2].textContent = 'O que o modelo não detalha';
    }

    const section = document.querySelector('#referencias');
    const container = section?.querySelector('.container');
    if (!container) return;

    container.innerHTML = `
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
  });

  document.head.appendChild(base);
})();
