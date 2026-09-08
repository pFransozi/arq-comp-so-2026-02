(() => {
  const path = window.location.pathname;
  const isAula03 = /(?:^|\/)aula-03\.html$/.test(path);
  const isAula04 = /(?:^|\/)aula-04\.html$/.test(path);

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

  loadScript('https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@cb4518d7dc92a1c5b03218cd231bdca68aeed111/script.js');
})();
