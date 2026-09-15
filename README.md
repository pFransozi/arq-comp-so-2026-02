# Arquitetura de Computadores e Sistemas Operacionais — site v1

Estrutura:

- `index.html`: página principal com acesso aos materiais.
- `curso.html`: visão geral da disciplina, percurso, calendário, conteúdos, avaliação e projeto PBL.
- `aula-02.html`: primeiro encontro efetivo — camadas, execução, baseline e evidências.
- `atividade-mapa-camadas-evidencias.md`: atividade complementar da Aula 02.
- `styles.css`: componentes específicos dos materiais de Arquitetura e Sistemas Operacionais.
- `aula-XX.css`: estilos exclusivos de cada aula; os aprofundamentos seguem a mesma convenção.
- `script.js`: interações específicas das aulas, como persistência dos campos e simuladores.
- `assets/percurso-arquitetura.svg`: infográfico do percurso da disciplina.
- `rascunhos/`: área de validação para novas aulas, aprofundamentos e materiais antes da integração à navegação oficial.

## Sistema visual

Identidade, estrutura editorial, navegação, tema e responsividade são fornecidos pelo sistema compartilhado do portal:

- `https://pfransozi.github.io/assets/css/ensino.css`
- `https://pfransozi.github.io/assets/js/ensino.js`

## Padrão das aulas

Para evitar diferenças visuais e mudanças de layout durante o carregamento:

- cada página deve carregar `ensino.css` e `ensino.js`; quando necessário, também pode carregar `styles.css`, sua própria folha `aula-XX.css` e `script.js`;
- o HTML deve conter o conteúdo e a estrutura finais da página, inclusive o índice lateral;
- não carregue versões históricas de arquivos nem injete CSS estrutural com JavaScript;
- não use blocos `<style>` dentro das aulas; regras gerais pertencem ao sistema compartilhado e exceções pertencem à folha da aula;
- novas interações reutilizáveis devem ser incluídas em `script.js` e ativadas pela presença dos elementos correspondentes.

## Fluxo de rascunhos para novos materiais

Novos materiais devem ser desenvolvidos primeiro em `rascunhos/`.

1. Criar a página na área de rascunhos, preservando o sistema visual da disciplina.
2. Marcar a página como **Rascunho para validação** e usar `noindex,nofollow` enquanto estiver em revisão.
3. Não criar links para o rascunho no portal, na visão geral ou nas aulas oficiais.
4. Revisar conteúdo, referências, responsividade, modo escuro e navegação.
5. Após validação docente, mover/copiar o material para a área principal e criar os links oficiais.
6. Remover a cópia provisória para evitar conteúdo duplicado.

Para aprofundamentos, o padrão é retomar os temas da aula principal e descer um nível de abstração ou precisão sem simplesmente repetir o material. O formato é expositivo, com diagramas, comparações, exemplos explicados e sínteses; exercícios e entregas só são incluídos quando houver decisão explícita nesse sentido.

O painel interno dos materiais em validação fica em `rascunhos/index.html`. As regras detalhadas estão em `rascunhos/README.md`.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos e a pasta `assets` para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

## Teste local

No Windows, execute `iniciar-servidor.bat`. Se preferir o terminal, abra a pasta do projeto e execute:

```powershell
py servidor-local.py
```

Depois, acesse `http://127.0.0.1:8000/`. O servidor desativa o cache do navegador para que alterações em HTML, CSS e JavaScript apareçam imediatamente. Use `Ctrl+C` para encerrá-lo.

Também é possível escolher outra porta:

```powershell
py servidor-local.py --porta 8080
```

## Baseline do PBL

O pacote `downloads/pbl-baseline-sequencial-v1.zip` acompanha o site e é disponibilizado na visão geral e na Aula 02. Ele contém a implementação sequencial, entradas reproduzíveis, testes, logs e métricas básicas.
