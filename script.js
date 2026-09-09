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

  applyTheme(document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light');

  themeToggle?.addEventListener('click', () => {
    const next = body.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('arquitetura-so-theme', next);
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
})();
