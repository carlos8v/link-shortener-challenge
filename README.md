# Boas vindas ao repositório de Encurtador de URL!

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, dando fork e utilizando branchs e Pull Request para colocar seus códigos.
---

# Sumário

- [Habilidades](#habilidades)
- [Entregáveis](#entregáveis)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
- [Instruções para entregar seu projeto](#instruções-para-entregar-seu-projeto)
  - [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
  - [Durante o desenvolvimento](#durante-o-desenvolvimento)
- [Requisitos do projeto](#requisitos-do-projeto)
  - [Antes de começar](#antes-de-começar)
    - [Setup do backend](#setup-do-backend)
    - [Execução de testes unitários](#execução-de-testes-unitários)
  - [Lista de Requisitos](#lista-de-requisitos)
    - [1 - Criar página inicial com criação de links](#1---criar-página-inicial-com-criação-de-links)
    - [2 - Criar página de listagem de links encurtados](#2---criar-página-de-listagem-de-links-encurtados)
    - [3 - Criar página de redirecionamento de links](#3---criar-página-de-redirecionamento-de-links)
    - [4 - Criar funcionalidade de exclusão](#4---criar-funcionalidade-de-exclusão-de-links)
    - [Requisitos Bônus](#requisitos-bônus)
    - [5 - Criar página de visualização de links acessados](#5---criar-página-de-visualização-de-links-acessados)
- [Avisos Finais](#avisos-finais)

# Habilidades

Nesse projeto, você vai construir um frontend usando `react` e será capaz de:
 - Utilizar roteamento de páginas com `react-router-dom`;
 - Utilizar apis externas com `react-query`;
 - Estilizar a aplicação com `tailwind.css`.

# Entregáveis

Para entregar o seu projeto você deverá dar fork do repositório e criar um Pull Request para avaliar seu desenvolvimento.

---

## O que deverá ser desenvolvido

Você vai desenvolver um site de encurtador de URL's. Oferencendo uma página de criação de encurtadores, uma página de redirecionamento através dos links encurtados e uma página de visualização

---

## Desenvolvimento

Você deve desenvolver uma aplicação em `React.js` usando `vite` para subir o servidor frontend e a estilização com `tailwind.css`.

Para fazer as funcionalidades é preciso conhecer os endpoints que a pasta `backend` disponibiliza para poder desenvolver a aplicação sem maiores complicações.

---

# Instruções para entregar seu projeto:


### ANTES DE COMEÇAR A DESENVOLVER:

1. Dê um fork no repositório.

2. Clone o repositório
  * Exemplo: `git clone https://github.com/carlos8v/link-shortener-challenge.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd link-shortener-challenge`

3. Instale as dependências
  * `npm install`

4. Crie uma branch a partir da branch `main`
  * Verifique que você está na branch `main`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `main`
    * Exemplo: `git checkout main`
  * Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    * Você pode criar uma branch no seguinte formato: `feature/feature-name`
    * Exemplo: `git checkout -b feature/homepage`

5. Programe :coffee:...

6. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças que ainda não estão no _stage_
    * Exemplo: `git status`
  * Adicione o novo arquivo ao _stage_ do Git
      * Exemplo:
        * `git add .`
        * `git status`
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto'` (fazendo o primeiro commit)
        * Se quiser, você pode seguir as regras do [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) para suas mensagens
          * Exemplo: `git commit -m 'feat: adicionado homepage'`

7. Adicione o novo `commit` à branch do repositório remoto
  * Usando o exemplo anterior: `git push -u origin feature/homepage`

8. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do repositório
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * Volte até a página de _Pull Requests_ do repositório e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está fora ou dentrodo stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u origin nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

# Requisitos do projeto:

## Antes de começar:

### ⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️

### 👀 Observações importantes:

Em cada requisito você encontrará em detalhes o que seu projeto deverá realizar. O estilo da página não será avaliado.

O não cumprimento de um requisito, total ou parcialmente, impactará em sua avaliação.

### Setup do backend

Nesse repositório existe uma pasta `backend` responsável por ser a api da aplicação. Para que o frontend consiga realizar as funcionalidades corretas é preciso inicializar a aplicação do backend.

```sh
# se você usa npm
npm run api

# se você usa yarn
yarn api
```

Para detalhes sobre os endpoints disponibilizados pelo backend veja o arquivo [backend/API.md](./backend/API.md)

Copie o arquivo `.env.example` para `.env` e coloque o endereço correto da url da api, seguindo o exemplo:

```env
VITE_API_URL=http://localhost:3333
```

Suas chamadas de requisições devem ser baseadas nessa variável de ambiente, exemplo:

```js
fetch(`${import.meta.env.VITE_API_URL}/links`, options)
```

### Execução de testes unitários

Nesse repositório estaremos usando o [playwright](https://playwright.dev/) para executar os testes, use o comando a seguir para executar o teste de um dos requisitos:

```sh
npm test -- e2e/req01-createShortLink.spec.js
```

:warning: Você pode utilizar `npm test` para rodar todos os testes, mas essa ação pode demorar durante o desenvolvimento, deixe que o avaliador determine como está o progresso de seu projeto

Se quiser observar os passos que o teste irá realizar no navegador, você pode utilizar o comando:

```sh
npm run test:ui
```

---

## Lista de Requisitos:

### 1 - Criar página inicial com criação de links

Nessa página deve ser possível criar um encurtador de link válido.

A página deve ser servida na raiz da aplicação, no caminho `/`.

#### Os seguintes pontos serão avaliados:

- A página deve ter uma tag `input` com os atributos:
  - `data-testid=create-shortlink-url`;
  - `required`;
  - `type=url`.

- A página deve ter uma tag `input` com os atributos:
  - `data-testid=create-shortlink-slug`;
  - `required`;
  - `type=text`.

- A página deve ter uma tag `button` com os atributos:
  - `data-testid=create-shortlink-button`;
  - `type=submit`.

- O botão de criar deve estar desabilitado enquanto a url e o slug não forem preenchidos;

- Caso a url encurtada já exista, deverá aparecer na tela uma tag `span` contendo:
  - O texto: `Encurtador com mesmo slug já cadastrado!`;
  - O atributo `data-testid=create-shortlink-response`.

- Caso a criação da url encurtada não retornar erro, deverá aparecer na tela uma tag `span` contendo:
  - O texto: `Encurtador criado com sucesso!`;
  - O atributo `data-testid=create-shortlink-response`.

### 2 - Criar página de listagem de links encurtados

Nessa página deve ser possível visualizar todos os encurtadores de link criados.

A página deve ser servida no caminho `/list`

#### Os seguintes pontos serão avaliados:

- Na página inicial deve haver uma tag `a` com o link para a página `/list`, contendo:
  - A mensagem: `Listagem`
  - O atributo `data-testid=list-shortlinks-page`

- Na página de listagem deve haver uma tag `a` com o link para a página `/`, contendo:
  - A mensagem: `Criar novo`
  - O atributo `data-testid=create-shortlinks-page`

- A página deve ter uma tag `table` com o atributo `data-testid=shortlink-list`;

- Para cada link deverá ter uma tag `tr` contendo:
  - O atributo `data-testid=shortlink-${id}`;
  - Uma tag `td` contendo:
    - O atributo `data-testid=shorlink-${id}-slug`
    - O texto contendo a slug
  - Uma tag `td` contendo:
    - O atributo `data-testid=shorlink-${id}-url`
    - O texto contendo a url

### 3 - Criar página de redirecionamento de links

Nessa página deve ser possível visualizar um link de redirecionamento criado, contendo um aviso de redirecionamento e a url para qual está sendo redirecionado.

A página deve ser servida no caminho `/redirect/:slug`

#### Os seguintes pontos serão avaliados:

- Na página deve ser possível buscar o link pelo slug. Exemplo:
  - `/redirect/google` deve pesquisar no backend link com o slug `google`

- Se o link não for encontrado deve existir na página uma tag `p` contendo:
  - O atributo `data-testid=shortlink-not-found`
  - O texto: `Slug não encontrado`

- Se o link  existir na página uma tag `p` contendo:
  - O atributo `data-testid=shortlink-redirect-info`
  - O texto: `Você está sendo redirecionado para ${link}`, onde o link deverá ser o link de redirecionamento cadastrado

- Se o link  existir na página uma tag `a` contendo:
  - O atributo `href=${link}`, onde o link deverá ser o link de redirecionamento cadastrado
  - O atributo `data-testid=shortlink-redirect-info`
  - O texto: `Ir para o link`

### 4 - Criar funcionalidade de exclusão de links

## Requisitos Bônus

### 5 - Criar página de visualização de links acessados

--- 

# Avisos Finais

O avaliador automático não necessariamente avalia seu projeto na ordem em que os requisitos aparecem no readme. Isso acontece para deixar o processo de avaliação mais rápido. Então, não se assuste se isso acontecer, ok?
