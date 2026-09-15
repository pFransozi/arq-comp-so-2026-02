(() => {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const progress = document.getElementById('progress');

  const applyTheme = (theme) => {
    const dark = theme === 'dark';
    document.documentElement.classList.toggle('theme-dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    body.classList.toggle('theme-dark', dark);

    document.querySelectorAll('img[data-light-src][data-dark-src]').forEach((image) => {
      image.src = dark ? image.dataset.darkSrc : image.dataset.lightSrc;
    });

    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo noturno');
    const icon = themeToggle.querySelector('.theme-icon');
    const text = themeToggle.querySelector('.theme-text');
    if (icon) icon.textContent = dark ? '☀' : '☾';
    if (text) text.textContent = dark ? 'Modo claro' : 'Modo noturno';
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme === 'dark' || (savedTheme !== 'light' && prefersDark) ? 'dark' : 'light');

  themeToggle?.addEventListener('click', () => {
    const next = body.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  const pageId = location.pathname.split('/').pop()?.replace('.html', '') || 'aula';
  const storagePrefix = `arquitetura:${pageId.replace(/^aula-(\d+)/, 'aula$1')}`;
  document.querySelectorAll('[data-save]').forEach((field) => {
    const key = `${storagePrefix}:${field.dataset.save}`;
    const saved = localStorage.getItem(key);
    if (saved !== null) field.value = saved;
    ['input', 'change'].forEach((eventName) => {
      field.addEventListener(eventName, () => localStorage.setItem(key, field.value));
    });
  });

  const toc = document.querySelector('.aula03-toc, .lesson-toc, .study-clean-aside');
  const tocToggle = toc?.querySelector('.aula03-toc-toggle, .lesson-toc-toggle, .study-clean-toc-toggle');
  const tocLinks = [...(toc?.querySelectorAll('nav a[href^="#"]') || [])];
  const tocSections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  tocToggle?.addEventListener('click', () => {
    const collapsed = body.classList.toggle('toc-collapsed');
    tocToggle.setAttribute('aria-expanded', String(!collapsed));
    tocToggle.setAttribute('aria-label', collapsed ? 'Expandir índice' : 'Recolher índice');
    tocToggle.title = collapsed ? 'Expandir índice' : 'Recolher índice';
  });

  if ('IntersectionObserver' in window && tocSections.length) {
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!current) return;
      tocLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current.target.id}`);
      });
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .15, .5] });
    tocSections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll('[data-dialog-target]').forEach((button) => {
    button.addEventListener('click', () => document.getElementById(button.dataset.dialogTarget)?.showModal?.());
  });
  document.querySelectorAll('.image-dialog, dialog').forEach((dialog) => {
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  const stateElements = {
    pc: document.getElementById('state-pc'),
    ir: document.getElementById('state-ir'),
    acc: document.getElementById('state-acc'),
    mem: document.getElementById('state-mem'),
    message: document.getElementById('sim-message')
  };
  const nextCycle = document.getElementById('next-cycle');
  const resetCycle = document.getElementById('reset-cycle');

  if (nextCycle && resetCycle && Object.values(stateElements).every(Boolean)) {
    const states = [
      { pc: '00', ir: '—', acc: '0', mem: '0', message: '<strong>Estado inicial.</strong> O PC aponta para a instrução 00. Nenhuma instrução foi executada ainda.' },
      { pc: '01', ir: 'LOAD 20', acc: '7', mem: '0', message: '<strong>Passo 1 · LOAD 20 concluída.</strong> O valor 7 de Mem[20] foi carregado no ACC. O PC já aponta para 01.' },
      { pc: '02', ir: 'ADD 21', acc: '12', mem: '0', message: '<strong>Passo 2 · ADD 21 concluída.</strong> A ULA somou o valor 5 de Mem[21] ao 7 que estava no ACC. O PC aponta para 02.' },
      { pc: '03', ir: 'STORE 22', acc: '12', mem: '12', message: '<strong>Passo 3 · STORE 22 concluída.</strong> O valor 12 do ACC foi gravado em Mem[22]. O PC aponta para 03.' },
      { pc: '03', ir: 'HALT', acc: '12', mem: '12', message: '<strong>Passo 4 · HALT concluída.</strong> A sequência didática foi encerrada.' }
    ];
    let index = 0;
    const renderState = () => {
      const state = states[index];
      stateElements.pc.textContent = state.pc;
      stateElements.ir.textContent = state.ir;
      stateElements.acc.textContent = state.acc;
      stateElements.mem.textContent = state.mem;
      stateElements.message.innerHTML = state.message;
    };
    nextCycle.addEventListener('click', () => {
      index = Math.min(states.length - 1, index + 1);
      renderState();
    });
    resetCycle.addEventListener('click', () => {
      index = 0;
      renderState();
    });
    renderState();
  }

  if (pageId === 'aula-05-aprofundamento') {
    const referenceItems = document.querySelectorAll('#referencias .reference-list p');
    referenceItems.forEach((item) => {
      if (item.textContent.includes('EMENTÁRIO GERAL')) item.remove();
    });
    const referenceIntro = document.querySelector('#referencias .study-heading p:not(.study-kicker)');
    if (referenceIntro) referenceIntro.textContent = 'O conteúdo desta página foi elaborado a partir dos PDFs que integram o projeto da disciplina.';

    const taxaSection = document.getElementById('taxa');
    if (taxaSection) {
      taxaSection.innerHTML = `
        <div class="container">
          <div class="study-heading">
            <p class="study-kicker">8 · O que significa “mais rápido”?</p>
            <h2>Tempo de resposta e throughput observam lados diferentes do desempenho</h2>
            <p>Quando dizemos que um sistema é “mais rápido”, precisamos perguntar <strong>mais rápido em quê?</strong> Podemos querer reduzir o tempo necessário para obter o resultado de uma única operação ou aumentar a quantidade total de trabalho concluído em determinado intervalo. Essas duas perspectivas são relacionadas, mas não são iguais.</p>
          </div>

          <div class="study-grid">
            <div class="study-prose">
              <h3>Tempo de resposta: quanto precisamos esperar?</h3>
              <p>O <strong>tempo de resposta</strong> indica quanto tempo transcorre entre uma solicitação e a obtenção do resultado. Em aplicações interativas, essa métrica é particularmente importante porque afeta diretamente a percepção de quem utiliza o sistema.</p>
              <p>Podemos observar tempo de resposta ao abrir uma tela, consultar uma API, executar uma busca, compilar um projeto ou gerar um relatório.</p>
            </div>
            <div class="study-stack">
              <div class="study-callout"><strong>Exemplo</strong><p>Se uma requisição é enviada às <strong>10:00:00,000</strong> e a resposta chega às <strong>10:00:00,120</strong>, o tempo de resposta observado foi de <strong>120 ms</strong>.</p></div>
              <div class="study-callout"><strong>Pergunta respondida</strong><p><strong>Quanto preciso esperar</strong> para obter o resultado desta operação?</p></div>
            </div>
          </div>

          <div class="study-grid">
            <div class="study-prose">
              <h3>Throughput: quanto trabalho o sistema consegue concluir?</h3>
              <p><strong>Throughput</strong>, também chamado de <strong>vazão</strong>, indica a quantidade de trabalho concluída por unidade de tempo. Ele é especialmente útil quando o sistema precisa processar muitas tarefas, requisições ou transações.</p>
              <p>A unidade depende do contexto: podemos falar em <strong>requisições por segundo</strong>, <strong>arquivos por minuto</strong>, <strong>jobs por hora</strong> ou <strong>transações por segundo</strong>.</p>
            </div>
            <div class="study-stack">
              <div class="study-callout"><strong>Exemplo</strong><p>Se um servidor conclui <strong>6.000 requisições em 60 segundos</strong>, seu throughput médio é de <strong>100 requisições/s</strong>.</p></div>
              <div class="study-callout"><strong>Pergunta respondida</strong><p><strong>Quanto trabalho este sistema consegue processar</strong> em determinado intervalo?</p></div>
            </div>
          </div>

          <div class="study-prose">
            <h3>Uma métrica não substitui a outra</h3>
            <p>É possível que um sistema responda mais rapidamente a uma solicitação individual e, ainda assim, outro sistema consiga concluir mais solicitações ao longo do tempo.</p>
          </div>

          <div class="study-table-wrap">
            <table class="mix-table">
              <thead><tr><th>Métrica</th><th>Sistema A</th><th>Sistema B</th></tr></thead>
              <tbody>
                <tr><td><strong>Tempo de resposta de uma requisição</strong></td><td>80 ms</td><td>120 ms</td></tr>
                <tr><td><strong>Throughput máximo observado</strong></td><td>100 req/s</td><td>300 req/s</td></tr>
              </tbody>
            </table>
          </div>

          <div class="comparison-grid">
            <div class="comparison-side">
              <small>Sistema A</small>
              <h3>Responde antes</h3>
              <p>Uma requisição individual termina em menos tempo.</p>
              <p>Seu throughput total, porém, é menor.</p>
            </div>
            <div class="comparison-side">
              <small>Sistema B</small>
              <h3>Conclui mais trabalho</h3>
              <p>Cada requisição demora um pouco mais.</p>
              <p>Mas o sistema consegue concluir muito mais requisições por segundo.</p>
            </div>
          </div>

          <div class="boundary">
            <strong>Então qual sistema é “mais rápido”?</strong>
            <p>Não existe uma única resposta. Se o requisito principal for reduzir a espera de uma operação individual, o Sistema A apresenta o melhor resultado. Se o objetivo for atender o maior número possível de requisições por segundo, o Sistema B é superior nesse aspecto.</p>
          </div>

          <div class="study-prose">
            <h3>Onde o multicore entra nessa discussão?</h3>
            <p>Um processador com vários núcleos pode permitir que diferentes tarefas avancem simultaneamente. Quando as tarefas são independentes, isso pode aumentar bastante a <strong>capacidade total do sistema</strong>, mesmo que o tempo necessário para executar uma única tarefa mude pouco.</p>
          </div>

          <div class="comparison-grid">
            <div class="comparison-side">
              <small>Um núcleo</small>
              <h3>Trabalho mais serial</h3>
              <p>Tarefa A → Tarefa B → Tarefa C → Tarefa D</p>
              <p>As tarefas aguardam a disponibilidade do mesmo recurso de execução.</p>
            </div>
            <div class="comparison-side">
              <small>Vários núcleos</small>
              <h3>Mais tarefas simultâneas</h3>
              <p>Tarefas independentes podem avançar em diferentes núcleos.</p>
              <p>O principal ganho pode aparecer no <strong>throughput</strong>, e não necessariamente no tempo de uma tarefa isolada.</p>
            </div>
          </div>

          <div class="study-grid">
            <div class="study-prose">
              <h3>Um exemplo próximo de Engenharia de Software</h3>
              <p>Imagine uma API que recebe muitas requisições simultaneamente. Para uma pessoa que acabou de enviar uma requisição, importa <strong>quanto tempo aquela resposta demora</strong>. Para quem projeta a infraestrutura, também importa <strong>quantas requisições o sistema consegue atender por segundo</strong>.</p>
              <p>O mesmo sistema, portanto, pode precisar ser avaliado pelas duas perspectivas.</p>
            </div>
            <div class="study-stack">
              <div class="study-callout"><strong>Usuário individual</strong><p>Percebe principalmente o <strong>tempo de resposta</strong>.</p></div>
              <div class="study-callout"><strong>Sistema como um todo</strong><p>Precisa sustentar um <strong>throughput</strong> compatível com a carga esperada.</p></div>
            </div>
          </div>

          <div class="study-prose">
            <h3>Melhorar throughput não significa melhorar cada resposta</h3>
            <p>Uma mudança de arquitetura pode permitir que mais tarefas sejam processadas simultaneamente e aumentar o throughput sem reduzir proporcionalmente o tempo de cada tarefa individual.</p>
            <p>Da mesma forma, uma otimização voltada para diminuir a latência de uma operação específica não garante que a capacidade total do sistema aumentará na mesma proporção.</p>
          </div>

          <div class="study-table-wrap">
            <table class="mix-table">
              <thead><tr><th>Contexto</th><th>Métrica mais diretamente relacionada</th></tr></thead>
              <tbody>
                <tr><td>Interface interativa</td><td>Tempo de resposta</td></tr>
                <tr><td>Requisição de API</td><td>Tempo de resposta</td></tr>
                <tr><td>Processamento em lote</td><td>Throughput</td></tr>
                <tr><td>Servidor com muitas requisições</td><td>Throughput e tempo de resposta</td></tr>
                <tr><td>Compilação de um único projeto</td><td>Tempo para conclusão</td></tr>
                <tr><td>Pipeline com milhares de arquivos</td><td>Throughput</td></tr>
              </tbody>
            </table>
          </div>

          <div class="boundary">
            <strong>O que guardar desta seção</strong>
            <p><strong>“Mais rápido” precisa ser definido.</strong> Tempo de resposta indica quanto esperamos pelo resultado de uma operação. Throughput indica quanto trabalho o sistema consegue concluir por unidade de tempo. Uma arquitetura pode melhorar uma dessas métricas mais do que a outra; por isso, a escolha da métrica deve acompanhar o requisito de desempenho da aplicação.</p>
          </div>

          <div class="study-grid">
            <div class="study-prose">
              <h3>Daqui para a próxima seção</h3>
              <p>Depois de definir <strong>o que queremos medir</strong>, ainda precisamos decidir <strong>como realizar uma comparação representativa e reproduzível</strong>.</p>
            </div>
            <div class="study-stack">
              <div class="study-callout"><strong>Próximo passo</strong><p>É nesse ponto que entram os <strong>benchmarks</strong>: cargas e procedimentos usados para comparar sistemas de forma controlada.</p></div>
            </div>
          </div>
        </div>`;
    }
  }
})();
