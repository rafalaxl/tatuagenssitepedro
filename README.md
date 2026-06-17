# ✒️ Pedro — Tatuagens Autorais
### *Landing Page Imersiva de Alta Conversão com Qualificação de Leads 3D*

Este repositório contém o código-fonte da plataforma digital do artista Pedro, especializado em **Fineline** e **Microrealismo**. O projeto foi concebido sob a perspectiva de engenharia de conversão (CRO) e design de experiência de luxo, unindo arte de precisão a um funil técnico qualificado.

---

## 🎯 Proposta de Negócio & CRO

Diferente de portfólios convencionais que servem apenas como vitrine passiva ou direcionam cliques frios diretamente para o WhatsApp, esta plataforma atua como uma **máquina de pré-qualificação de leads**.

### O Funil Inteligente com Seletor 3D
Para otimizar o tempo de agenda do artista e filtrar potenciais clientes com alto alinhamento comercial, o fluxo de contato foi estruturado em etapas claras antes do redirecionamento ao WhatsApp:

1. **Escolha da Arte & Estilo:** O usuário seleciona a especialidade desejada (Fineline ou Microrealismo).
2. **Mapeamento Anatômico (Seletor 3D):** Utilizando uma interface tridimensional interativa, o cliente escolhe a região exata do corpo onde planeja a tatuagem.
3. **Escala & Dimensões:** Definição do tamanho aproximado em centímetros.
4. **Viabilidade & Longevidade:** O sistema calcula uma pré-avaliação técnica de viabilidade anatômica para evitar o "efeito blowout" (traços estourados).
5. **WhatsApp Payload:** O lead é enviado ao WhatsApp comercial com uma mensagem estruturada contendo todos os dados técnicos coletados (Local, Estilo, Tamanho, Descrição), permitindo que o atendimento de Pedro inicie diretamente na fase de fechamento de orçamento.

---

## 🛠️ Stack Tecnológica

Optou-se por uma arquitetura ultra-leve, focada em tempo de carregamento instantâneo no mobile e pontuação máxima no Core Web Vitals:

* **HTML5 Semântico:** Estrutura focada em SEO e acessibilidade (WCAG 2.1 AA).
* **Tailwind CSS:** Estilização utilitária de alta performance com design system baseado em Dark Mode profundo (tons de cinza-escuro absoluto e acentos em ouro champanhe).
* **Three.js (WebGL):** Engine para renderização em tempo real do modelo anatômico 3D de seleção de corpo, otimizada com buffers leves para rodar com fluidez em conexões móveis limitadas.
* **JavaScript Vanilla & GSAP:** Lógica de navegação, manipulação de estados do formulário e transições suaves (Parallax e Fade-ins de imagens) sem a sobrecarga de frameworks complexos.

---

## 🚀 Ondas de Desenvolvimento

O projeto é executado de forma incremental para garantir a entrega contínua de valor de negócio:

### Onda 1: Fundações & Motion Sutil (MVP)
* Estrutura semântica e SEO local para a região de Sorocaba/SP.
* Design System em Dark Mode com tipografia sofisticada (Playfair Display + Inter).
* Animações de entrada e efeitos de scroll utilizando GSAP (com controle para desativação em dispositivos que preferem motion reduzido).
* Formulário de orçamento estático com redirecionamento formatado de WhatsApp.

### Onda 2: Experiência Imersiva & 3D
* Integração da biblioteca Three.js com modelo anatômico otimizado (low-poly).
* Desenvolvimento do componente interativo de mapeamento corporal.
* Lógica de cálculo de estabilidade do traço baseada no local do corpo (orientando o usuário sobre a durabilidade da arte ao longo dos anos).

### Onda 3: Inteligência de Vendas & Otimização
* Integração de Analytics para rastreamento de cliques em CTA e conversões do funil.
* Galeria "Healed" dinâmica, exibindo o resultado real das artes cicatrizadas há mais de 12 meses (resolvendo o maior medo do público exigente de fineline).
* Implementação de dados estruturados JSON-LD (`LocalBusiness` e `Service`) para indexação avançada em motores de busca.

---

## 💎 Diferenciais do Projeto

* **Foco em Longevidade Técnica:** A comunicação do site posiciona Pedro como um **Consultor de Arte**, educando o cliente sobre o envelhecimento da pele e a integridade do traço fino.
* **Proof of Longevity:** Destaque estratégico para fotos de tatuagens cicatrizadas, gerando forte prova social e eliminando a objeção de perda de definição da arte.
* **Privacidade e Experiência:** Toda a linguagem do site reflete a exclusividade do atendimento em estúdio privado, atraindo clientes de maior ticket médio.

---

## ⚙️ Instalação e Execução Local

Como a plataforma adota uma arquitetura estática, não há necessidade de etapas de compilação complexas:

1. Clone o repositório:
   ```bash
   git clone https://github.com/pedro-tattoo/tatuagens-autorais.git
   ```
2. Abra o diretório do projeto:
   ```bash
   cd tatuagens-autorais
   ```
3. Execute um servidor local básico (por exemplo, com a extensão Live Server do VS Code ou Python):
   ```bash
   python -m http.server 8000
   ```
4. Acesse no navegador em `http://localhost:8000`.
