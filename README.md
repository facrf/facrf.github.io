# Fabiano Cesar — Portfólio Pessoal & Website Oficial

[![Site](https://img.shields.io/badge/website-fabianocesar.com-17211d?style=flat-square)](https://fabianocesar.com/)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/deployed_on-GitHub_Pages-222?style=flat-square&logo=github)](https://facrf.github.io/)
[![Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](#)

Repositório do site pessoal e portfólio profissional de **Fabiano Cesar**, desenvolvedor sênior Java e Kotlin com foco em arquitetura de software, APIs REST, integrações corporativas e aplicações web e mobile.

🌐 **Website oficial:** [https://fabianocesar.com](https://fabianocesar.com)  
📄 **Perfis profissionais:** [Português](README.pt.md) | [English](README.en.md) | [Español](README.es.md)

---

## 🎯 Visão Geral & Filosofia

O projeto é projetado segundo os princípios de **simplicidade radical**, **alta performance**, **acessibilidade** e **zero dependências externas pesadas**. Construído como uma aplicação estática (JAMstack vanilla) hospedada no **GitHub Pages**, o site carrega instantaneamente, opera com consumo mínimo de recursos e funciona perfeitamente sem necessidade de bundlers ou frameworks complexos.

### Destaques Técnicos

- **Zero dependências de runtime:** Nenhum framework JavaScript (React, Vue, etc.) ou bibliotecas CSS (Bootstrap, Tailwind). Apenas HTML5 semântico, CSS3 moderno e Vanilla JavaScript ES6+.
- **Performance e Core Web Vitals:** First Contentful Paint (FCP) quase instantâneo, Largest Contentful Paint (LCP) otimizado e zero dependência de fontes externas ou bibliotecas de terceiros.
- **Prevenção de FOUC:** Script síncrono ultra-leve no `<head>` determina o tema antes do render inicial, eliminando qualquer cintilação visual.
- **Internacionalização (i18n):** Suporte nativo a 3 idiomas (Português, Inglês e Espanhol) através de dicionário centralizado (`traducoes.json`) com sincronização em tempo real de metadados SEO, Open Graph e Twitter Cards.
- **Acessibilidade (WCAG 2.2 AA):**
  - Skip link visível no foco para pular direto ao conteúdo principal.
  - Navegação completa por teclado (incluindo fechamento de menu por tecla `Escape` com restauração de foco).
  - Atributos ARIA dinâmicos (`aria-expanded`, `aria-pressed`, `aria-controls`, `aria-current`).
  - Respeito à preferência do usuário via `@media (prefers-reduced-motion: reduce)`.
- **Segurança e Privacidade:**
  - Padrão **RFC 9116** implementado em `/.well-known/security.txt`.
  - Política de divulgação responsável de vulnerabilidades (`security-policy.html`).
  - Políticas de privacidade dedicadas para aplicativos Android em conformidade com a LGPD e Google Play Store.
  - Bloqueio preventivo de robôs de coleta automatizada de IA em `robots.txt`.

---

## 📁 Estrutura do Repositório

```text
facrf.github.io/
├── .well-known/
│   └── security.txt          # Metadados de segurança conforme RFC 9116
├── css/
│   └── site.css              # Folha de estilos única, moderna e responsiva
├── flags/                    # Bandeiras SVG para referência
├── privacidade/              # Política de privacidade da WebView do site
├── privacidederxauto/        # Política de privacidade do app RXAuto
├── privacidedfin/            # Política de privacidade do app edFin
├── privacy/                  # Rota espelhada de privacidade
├── privacyEstado/            # Política de privacidade do jogo Estado: Plano Quinquenal
├── .gitignore                # Arquivos ignorados pelo controle de versão
├── .htmlvalidate.json        # Configuração de validação HTML
├── 404.html                  # Página de erro 404 personalizada
├── AGENTS.md                 # Regras e convenções para agentes de IA
├── CNAME                     # Configuração de domínio personalizado (fabianocesar.com)
├── CONTRIBUTING.md           # Diretrizes de contribuição e convenções de commit
├── LICENSE                   # Licença GNU General Public License v3.0
├── README.en.md              # Apresentação profissional em inglês
├── README.es.md              # Apresentação profissional em espanhol
├── README.md                 # Documentação técnica do projeto
├── README.pt.md              # Apresentação profissional em português
├── robots.txt                # Diretivas para buscadores e proteção contra scraping
├── security-policy.html      # Diretrizes de divulgação responsável de segurança
├── site.js                   # Lógica client-side (i18n, tema, navegação, repositórios)
├── site.webmanifest          # Manifesto PWA com metadados e ícones
├── sitemap.xml               # Mapa do site para indexação em buscadores
├── thanks.html               # Hall da Fama / Reconhecimento de pesquisadores de segurança
└── traducoes.json            # Dicionário multilíngue (pt-br, en, es)
```

---

## 🛠️ Tecnologias & Padrões Adotados

| Camada | Tecnologia / Padrão | Descrição |
| :--- | :--- | :--- |
| **Marcação** | HTML5 Semântico | Estrutura limpa (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) |
| **Estilização** | CSS3 Moderno | Custom Properties, Flexbox, CSS Grid, tipografia fluida com `clamp()`, dark mode |
| **Scripting** | Vanilla JS (ES6+) | Manipulação direta do DOM, `IntersectionObserver`, `AbortController`, `fetch` API |
| **i18n** | JSON Declarativo | Sincronização de texto e metadados via atributos `data-i18n` |
| **SEO & Social** | Open Graph, Twitter, JSON-LD | Dados estruturados Schema.org `Person` e metatags canônicas |
| **Segurança** | RFC 9116, LGPD | Canais de relato de vulnerabilidades e conformidade de privacidade |
| **Deploy** | GitHub Pages | Hospedagem estática com certificado SSL gerenciado |

---

## 🚀 Como Executar Localmente

Como o projeto é estritamente estático, não requer etapas de compilação ou instalação de dependências:

### Opção 1: Python (Recomendado)

```bash
# Na raiz do repositório:
python3 -m http.server 8000
```
Acesse no navegador: [http://localhost:8000](http://localhost:8000)

### Opção 2: Node.js / npx (Alternativa)

```bash
npx serve .
```

### Opção 3: Extensão de Editor (VS Code / VSCodium)

- Utilize a extensão **Live Server** e clique em *"Go Live"*.

---

## 🌐 Sistema de Internacionalização (i18n)

Para adicionar ou editar conteúdos multilíngues:

1. Abra o arquivo [`traducoes.json`](traducoes.json).
2. Adicione ou atualize a chave correspondente nos três blocos: `"pt-br"`, `"en"` e `"es"`.
3. No arquivo [`index.html`](index.html), vincule o elemento HTML adicionando o atributo:
   ```html
   <p data-i18n="sua_chave">Texto padrão em português</p>
   ```
4. O script [`site.js`](site.js) sincroniza automaticamente os nós ao carregar ou alternar o idioma.

---

## 🎨 Sistema de Temas (Claro / Escuro)

- As cores são parametrizadas via variáveis CSS em `:root` e `:root[data-theme="dark"]` no arquivo [`css/site.css`](css/site.css).
- A detecção inicial respeita a preferência do sistema operacional (`prefers-color-scheme`) e é persistida no `localStorage`.
- A meta tag `theme-color` é atualizada dinamicamente para manter harmonia com as barras de status de navegadores mobile.

---

## 📋 Padrão de Commits & Contribuição

Conforme detalhado no arquivo [`CONTRIBUTING.md`](CONTRIBUTING.md), os commits devem ser atômicos, claros e seguir o formato de escopo padronizado:

- `content` — alterações de texto, biografia ou projetos
- `style` — layout, CSS e ajustes visuais
- `fix` — correções de bugs ou inconsistências
- `config` — configurações de ambiente (CNAME, robots.txt, sitemap, etc.)
- `docs` — documentação técnica e guias
- `i18n` — adições ou correções em traduções
- `chore` — tarefas de manutenção e limpeza

---

## 📄 Licença

Este projeto é distribuído sob a licença **GNU General Public License v3.0** (GPL-3.0). Consulte o arquivo [`LICENSE`](LICENSE) para mais informações.
