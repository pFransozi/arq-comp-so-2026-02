# Arquitetura de Computadores e Sistemas Operacionais — site v1

Estrutura:

- `index.html`: página principal com acesso aos materiais.
- `curso.html`: visão geral da disciplina, percurso, calendário, conteúdos, avaliação e projeto PBL.
- `aula-02.html`: primeiro encontro efetivo — camadas, execução, baseline e evidências.
- `atividade-mapa-camadas-evidencias.md`: atividade complementar da Aula 02.
- `styles.css`: estilos compartilhados, responsivos e com modo noturno.
- `aula-XX.css`: estilos exclusivos de cada aula; os aprofundamentos seguem a mesma convenção.
- `theme-init.js`: aplica o tema salvo antes da primeira pintura da página.
- `script.js`: comportamento compartilhado das aulas: navegação móvel, tema, progresso, índice lateral, persistência dos campos, modais e simulador.
- `assets/percurso-arquitetura.svg`: infográfico do percurso da disciplina.

## Padrão das aulas

Para evitar diferenças visuais e mudanças de layout durante o carregamento:

- cada aula deve carregar apenas `styles.css`, sua própria folha `aula-XX.css`, `theme-init.js` e `script.js`;
- o HTML deve conter o conteúdo e a estrutura finais da página, inclusive o índice lateral;
- não carregue versões históricas de arquivos pela CDN nem injete CSS ou conteúdo com JavaScript;
- não use blocos `<style>` dentro das aulas; regras compartilhadas pertencem a `styles.css` e exceções pertencem à folha da aula;
- novas interações reutilizáveis devem ser incluídas em `script.js` e ativadas pela presença dos elementos correspondentes.

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
