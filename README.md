# 📚 ICPedia

> **Sua enciclopédia amigável para o Internet Computer**

ICPedia é um chatbot inteligente construído no ecossistema Internet Computer (ICP) que funciona como uma enciclopédia didática e acessível para novos usuários. Com uma interface moderna e linguagem simples, o ICPedia explica conceitos complexos do ICP usando analogias do mundo real.

## 🎯 Sobre o Projeto

O ICPedia foi desenvolvido para democratizar o conhecimento sobre o Internet Computer, tornando conceitos técnicos acessíveis para iniciantes. O bot utiliza inteligência artificial para fornecer explicações claras, sempre começando com analogias simples e evitando jargões técnicos desnecessários.

### ✨ Características Principais

- 🤖 **IA Especializada**: Focada exclusivamente no ecossistema Internet Computer
- 🎨 **Interface Moderna**: Design clean e responsivo com animações suaves
- 📖 **Explicações Didáticas**: Usa analogias do mundo real para facilitar o entendimento
- 🔗 **Links para Documentação**: Sempre direciona para a documentação oficial da DFINITY
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop e mobile
- ⚡ **Performance Otimizada**: Construído com tecnologias modernas

## 🛠️ Tecnologias Utilizadas

### Backend
- **Motoko**: Linguagem nativa do Internet Computer
- **LLM Integration**: Integração com modelo de linguagem Llama3 1.8B
- **Internet Computer**: Plataforma blockchain descentralizada

### Frontend
- **React**: Biblioteca JavaScript para interface de usuário
- **Tailwind CSS**: Framework CSS utilitário
- **Vite**: Build tool moderno e rápido
- **Inter Font**: Tipografia moderna e legível

### Ferramentas de Desenvolvimento
- **DFX**: SDK oficial do Internet Computer
- **Mops**: Gerenciador de dependências para Motoko

## 🚀 Como Executar o Projeto

### 🌐 Deploy Direto na Mainnet (Recomendado)

**Deploy instantâneo e gratuito via ICP Ninja!**

Quando visualizar este projeto no ICP Ninja, você pode fazer deploy diretamente na mainnet gratuitamente clicando em "Run" no canto superior direito. Abra este projeto no ICP Ninja:

[![Deploy no ICP Ninja](https://icp.ninja/assets/open.svg)](https://icp.ninja/i?g=https://github.com/MageTechnology/ICPedia)

### 💻 Instalação Local

#### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (SDK do Internet Computer)
- [Git](https://git-scm.com/)

#### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/MageTechnology/ICPedia.git
   cd ICPedia
   ```

2. **Instale as dependências do frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Inicie o ambiente local do Internet Computer**
   ```bash
   dfx start --clean --background
   ```

4. **Deploy do projeto**
   ```bash
   dfx deploy
   ```

5. **Acesse a aplicação**
   ```bash
   dfx canister open frontend
   ```

## 🌐 Sobre o ICP Ninja

O [ICP Ninja](https://icp.ninja) é uma plataforma que permite fazer deploy de projetos diretamente na mainnet do Internet Computer sem necessidade de configuração local. É perfeito para:

- **Deploy Rápido**: Deploy instantâneo com um clique
- **Gratuito**: Sem custos para projetos open source
- **Sem Configuração**: Não precisa instalar DFX ou outras ferramentas
- **Mainnet**: Deploy direto na rede principal do ICP

### Como Funciona

1. Clique no botão "Deploy no ICP Ninja" acima
2. Aguarde o carregamento do projeto
3. Clique em "Run" no canto superior direito
4. Aguarde o deploy (pode levar alguns minutos)
5. Acesse sua aplicação na mainnet!

## 📁 Estrutura do Projeto

```
llm_chatbot/
├── backend/
│   └── app.mo                 # Lógica principal do canister
├── frontend/
│   ├── src/
│   │   └── main.jsx          # Componente principal React
│   ├── index.html            # HTML base
│   ├── index.css             # Estilos customizados
│   └── package.json          # Dependências do frontend
├── dfx.json                  # Configuração do DFX
├── mops.toml                 # Dependências Motoko
└── README.md                 # Este arquivo
```

## 🎨 Funcionalidades

### 💬 Chat Inteligente
- Interface de chat moderna e intuitiva
- Animações suaves para melhor experiência do usuário
- Indicador de loading durante processamento
- Histórico de conversas em tempo real

### 🧠 IA Especializada
- **System Prompt Otimizado**: Configurado especificamente para explicar conceitos do ICP
- **Analogias**: Sempre usa comparações com o mundo real
- **Linguagem Simples**: Evita jargões técnicos desnecessários
- **Links Úteis**: Direciona para documentação oficial

### 📱 Design Responsivo
- Interface adaptável para diferentes tamanhos de tela
- Otimizado para mobile e desktop
- Scrollbar customizada
- Gradientes e sombras modernas

## 🎯 Exemplos de Uso

O ICPedia pode responder perguntas como:

- "O que é um canister?"
- "Como funcionam os cycles?"
- "Explique o que é Motoko"
- "O que é o Internet Computer?"
- "Como funciona a identidade no ICP?"

## 🔧 Personalização

### Modificando o System Prompt

Para alterar a personalidade ou comportamento do bot, edite o arquivo `backend/app.mo`:

```motoko
private let ICPEDIA_SYSTEM_PROMPT = "Seu prompt personalizado aqui...";
```

### Customizando o Visual

Os estilos estão organizados em:
- `frontend/index.css`: Estilos globais e customizados
- `frontend/src/main.jsx`: Classes Tailwind CSS

## 🛠️ Desenvolvimento Local

### Configuração do Ollama (Opcional)

Para testar o agente localmente com um modelo LLM, você precisará de um servidor para processar os prompts. Recomendamos usar o `ollama`:

1. **Instale o Ollama** seguindo a [documentação oficial](https://ollama.com/)

2. **Inicie o servidor Ollama:**
   ```bash
   ollama serve
   # Aguarde a mensagem: "Listening on port 11434"
   ```

3. **Em outro terminal, baixe o modelo LLM:**
   ```bash
   ollama run llama3.1:8b
   # Este comando baixa um modelo de 8B parâmetros (~4GB)
   ```

4. **Após o download, você pode parar o comando** - o modelo ficará disponível para uso

### Build e Deploy Detalhado

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MageTechnology/ICPedia.git
   cd ICPedia
   ```

2. **Instale dependências:**
   ```bash
   cd frontend && npm install && cd ..
   ```

3. **Inicie o ambiente local:**
   ```bash
   dfx start --background --clean
   ```

4. **Deploy do projeto:**
   ```bash
   dfx deploy
   ```

5. **Abra a aplicação:**
   ```bash
   dfx canister open frontend
   ```



## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Mantenha o código limpo e bem documentado
- Teste suas mudanças antes de submeter
- Siga as convenções de nomenclatura existentes
- Adicione comentários explicativos quando necessário

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [DFINITY Foundation](https://internetcomputer.org/) pelo ecossistema Internet Computer
- [Tailwind CSS](https://tailwindcss.com/) pelos estilos utilitários
- [React](https://reactjs.org/) pela biblioteca de interface
- Comunidade do Internet Computer pelo suporte e feedback

## 📞 Contato

- **Projeto**: [GitHub Repository](https://github.com/seu-usuario/icpedia)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/icpedia/issues)

---

**Desenvolvido com ❤️ para a comunidade Internet Computer** 