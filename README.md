# OpenInk Frontend

Este é o repositório do frontend do projeto **OpenInk**, desenvolvido utilizando Next.js.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente em sua máquina.

### Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 18 ou superior recomendada)
- **npm** (incluso com o Node.js) ou outro gerenciador de pacotes compatível (como Yarn ou pnpm)

---

### 1. Instalar as Dependências
Abra o terminal na pasta raiz do projeto e instale as dependências necessárias:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Executar o Servidor de Desenvolvimento
Inicie o servidor local para desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Após iniciar o servidor, abra o seu navegador e acesse:
👉 **[http://localhost:3000](http://localhost:3000)**

Qualquer alteração feita no código (como na página inicial em `app/page.tsx`) atualizará a página de forma automática (Fast Refresh).

---

## 🛠️ Outros Comandos Úteis

### 📚 Storybook
O projeto usa Storybook para desenvolvimento e documentação isolada de componentes. Para rodar o servidor do Storybook:
```bash
npm run storybook
```
Acesse no navegador através de:
👉 **[http://localhost:6006](http://localhost:6006)**

---

### 🧪 Executar Testes
O projeto utiliza o **Vitest** para os testes automatizados. Para rodar os testes em modo interativo:
```bash
npx vitest
```

---

### 🧹 Linting (Formatação e Padronização)
Para executar a checagem estática de qualidade de código (ESLint):
```bash
npm run lint
```

---

### 📦 Build de Produção
Para criar a build otimizada de produção:
```bash
npm run build
```

Para rodar a aplicação em modo de produção (após ter executado o build):
```bash
npm run start
```
