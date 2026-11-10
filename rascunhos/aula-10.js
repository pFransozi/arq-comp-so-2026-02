(() => {
  const scenarios = {
    livre: [
      [0, "sem trava", "A e B ainda vão atualizar o contador."],
      [0, "sem trava", "A lê 0 e guarda esse valor em sua variável local."],
      [0, "sem trava", "A execução alterna para B. B também lê 0."],
      [1, "sem trava", "A retoma a execução, soma 1 ao valor que leu e grava 1."],
      [1, "sem trava", "B retoma a execução e grava 1 usando a sua leitura anterior. Uma atualização se perde."]
    ],
    trava: [
      [0, "livre", "A e B vão usar a mesma trava para atualizar o contador."],
      [0, "com A", "A adquire a trava e lê 0."],
      [0, "com A", "A execução alterna para B. B tenta adquirir a trava e fica bloqueada."],
      [1, "livre", "A volta a executar, grava 1 e libera a trava. B pode voltar a executar quando for escalonada."],
      [1, "com B", "B é escalonada, adquire a trava e lê 1."],
      [2, "livre", "B soma 1 ao valor que leu, grava 2 e libera a trava."]
    ]
  };
  const simulator = document.getElementById("simulador");
  const scenarioSelect = document.getElementById("cenario");
  const stepLabel = document.getElementById("sim-passo");
  const counter = document.getElementById("sim-contador");
  const lock = document.getElementById("sim-trava");
  const eventText = document.getElementById("sim-evento");
  const previousButton = document.getElementById("sim-anterior");
  const nextButton = document.getElementById("sim-proximo");
  const resetButton = document.getElementById("sim-reiniciar");
  let step = 0;

  function renderStep() {
    const steps = scenarios[scenarioSelect.value];
    const [value, owner, event] = steps[step];
    stepLabel.textContent = "Passo " + (step + 1) + " de " + steps.length;
    counter.textContent = value;
    lock.textContent = owner;
    eventText.textContent = event;
    previousButton.disabled = step === 0;
    nextButton.disabled = step === steps.length - 1;
  }

  function resetStep() {
    step = 0;
    renderStep();
  }

  scenarioSelect.addEventListener("change", resetStep);
  resetButton.addEventListener("click", resetStep);
  previousButton.addEventListener("click", () => {
    step -= 1;
    renderStep();
  });
  nextButton.addEventListener("click", () => {
    step += 1;
    renderStep();
  });
  renderStep();
  simulator.hidden = false;
})();
