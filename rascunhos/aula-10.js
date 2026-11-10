(() => {
  const scenarios = {
    livre: [
      [0, "Sem trava", null, null, "A e B ainda vão atualizar o contador."],
      [0, "Sem trava", 0, null, "A lê 0 e guarda esse valor em sua variável local."],
      [0, "Sem trava", 0, 0, "A execução alterna para B. B também lê 0."],
      [1, "Sem trava", 0, 0, "A retoma a execução, calcula 0 + 1 e grava 1. B ainda tem 0 como valor lido."],
      [1, "Sem trava", 0, 0, "B calcula 0 + 1 e grava 1 por cima da atualização de A."]
    ],
    trava: [
      [0, "Livre", null, null, "A e B vão usar a mesma trava para atualizar o contador."],
      [0, "Com A", 0, null, "A adquire a trava e lê 0."],
      [0, "Com A", 0, null, "B tenta adquirir a trava e fica bloqueada antes de ler."],
      [1, "Livre", 0, null, "A grava 1 e libera a trava. B pode prosseguir quando for escalonada e conseguir adquirir a trava."],
      [1, "Com B", 0, 1, "B é escalonada, adquire a trava e lê o contador já atualizado."],
      [2, "Livre", 0, 1, "B calcula 1 + 1, grava 2 e libera a trava."]
    ]
  };
  const simulator = document.getElementById("simulador");
  const scenarioSelect = document.getElementById("cenario");
  const stepLabel = document.getElementById("sim-passo");
  const counter = document.getElementById("sim-contador");
  const lock = document.getElementById("sim-trava");
  const readingA = document.getElementById("sim-leitura-a");
  const readingB = document.getElementById("sim-leitura-b");
  const eventText = document.getElementById("sim-evento");
  const previousButton = document.getElementById("sim-anterior");
  const nextButton = document.getElementById("sim-proximo");
  const resetButton = document.getElementById("sim-reiniciar");
  let step = 0;

  function renderStep() {
    const steps = scenarios[scenarioSelect.value];
    const [value, owner, valueA, valueB, event] = steps[step];
    stepLabel.textContent = "Passo " + (step + 1) + " de " + steps.length;
    counter.textContent = value;
    lock.textContent = owner;
    readingA.textContent = valueA ?? "Ainda não leu";
    readingB.textContent = valueB ?? "Ainda não leu";
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
