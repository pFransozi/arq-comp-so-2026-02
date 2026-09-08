document.querySelector('.semester-measurements')?.remove();
document.querySelector('#ia-first .method-rules')?.remove();
document.querySelector('#aula-atual .eyebrow')?.remove();

const isAula02 = /(?:^|\/)aula-02\.html$/.test(window.location.pathname);

if (isAula02) {
  document.body.classList.add('lesson-clean');
  const lessonStyle = document.createElement('link');
  lessonStyle.rel = 'stylesheet';
  lessonStyle.href = 'aula-02-clean.css';
  document.head.appendChild(lessonStyle);
}

const baseScript = document.createElement('script');
baseScript.src = 'https://cdn.jsdelivr.net/gh/pFransozi/arq-comp-so-2026-02@e8a8a5618b8cac11bc3d40439a9d608480c81b8f/script.js';
baseScript.defer = true;

const improveAula02Register = () => {
  if (!isAula02) return;

  const registro = document.querySelector('#registro');
  if (!registro) return;

  const sectionEyebrow = registro.querySelector('.section-heading .eyebrow');
  const sectionTitle = registro.querySelector('.section-heading h2');
  const sectionIntro = registro.querySelector('.section-heading > p:last-child');

  if (sectionEyebrow) sectionEyebrow.textContent = 'Entrega';
  if (sectionTitle) sectionTitle.textContent = 'Registro 0 — primeira leitura do baseline';
  if (sectionIntro) {
    sectionIntro.textContent = 'Use a medição acima como referência. Aqui, o objetivo é interpretar a primeira execução: explicar o que foi observado, indicar uma evidência e separar o que já podemos afirmar do que ainda precisa ser investigado.';
  }

  const registerZero = registro.querySelector('.register-zero');
  if (!registerZero) return;

  registerZero.innerHTML = `
    <div class="inquiry-head">
      <div>
        <span class="inquiry-kicker">Síntese da equipe</span>
        <h3>O que a primeira execução mostrou?</h3>
      </div>
      <span class="inquiry-tag">Interpretação · evidência · limite</span>
    </div>
    <div class="inquiry-body" style="grid-template-columns:1fr">
      <div>
        <p>Não repita todos os valores da tabela. Use-os como evidência para construir uma explicação curta sobre o comportamento inicial do programa.</p>
        <ol class="prompt-list">
          <li><strong>Validação:</strong> os testes passaram e o resultado da execução foi considerado correto? Indique qual evidência sustenta essa afirmação.</li>
          <li><strong>Fluxo:</strong> explique, em poucas frases, o caminho <code>entrada JSON → processamento sequencial → resultados, métricas e log</code>.</li>
          <li><strong>Evidência:</strong> escolha um artefato gerado pela execução — resultado, arquivo de métricas ou log — e explique o que ele permite confirmar.</li>
          <li><strong>Limite:</strong> o que uma única execução com a entrada pequena ainda não permite concluir sobre desempenho, gargalos ou ganho com paralelismo?</li>
          <li><strong>Próxima investigação:</strong> formule uma pergunta ou hipótese que poderia ser testada com uma entrada maior ou em uma versão futura do programa.</li>
        </ol>
        <div class="completion-criterion">
          <strong>Formato da entrega</strong>
          <p>Uma síntese curta por equipe, apoiada na tabela de medição e nos artefatos gerados. Não é necessário copiar todos os números nem modificar o código.</p>
        </div>
      </div>
    </div>
  `;
};

const loadAula02Clean = () => {
  if (!isAula02 || document.querySelector('script[data-aula02-clean]')) return;
  const lessonScript = document.createElement('script');
  lessonScript.src = 'aula-02-clean.js';
  lessonScript.defer = true;
  lessonScript.dataset.aula02Clean = 'true';
  document.head.appendChild(lessonScript);
};

baseScript.addEventListener('load', () => {
  loadAula02Clean();
  improveAula02Register();
});
baseScript.addEventListener('error', () => {
  loadAula02Clean();
  improveAula02Register();
});
document.head.appendChild(baseScript);