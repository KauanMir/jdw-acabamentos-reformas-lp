# JDW Acabamentos e Reformas — Landing Page

Landing page institucional de alto padrão para a **JDW Acabamentos e Reformas**, empresa especializada em drywall, gesso, forros, revestimentos, elétrica e reformas residenciais e comerciais em Brasília — DF.

---

## Visão Geral

Página única (SPA) desenvolvida com HTML, CSS e JavaScript puros — sem frameworks, sem dependências externas além das fontes Google. Foco em performance, responsividade e identidade visual premium.

**Paleta de cores:** `#0A0A0A` (preto), `#CC0000` (vermelho JDW), `#FFFFFF` (branco)

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura e acessibilidade |
| CSS3 custom properties | Design tokens, animações, responsividade |
| JavaScript ES6+ (vanilla) | Interações, scroll reveal, carrossel, lightbox |
| Google Fonts | Archivo (display) + Hanken Grotesk (corpo) |
| CSS Container Queries | Layout adaptativo interno |
| IntersectionObserver API | Scroll reveal e counters animados |
| CSS `clamp()` / `svh` | Tipografia e layout fluidos |

---

## Funcionalidades

- **Hero** com imagem cinematic (Ken Burns), parallax e overlay multicamadas
- **Prova social** com avaliação e selos
- **Seção Antes & Depois** com cards verticais 9:16, hover premium e etiquetas com identidade visual
- **Portfólio** com filtros por categoria e lightbox
- **Depoimentos** em carrossel responsivo com dots e setas
- **Processo** em timeline animada
- **CTAs** integrados ao WhatsApp com link direto
- **Header fixo** com logo grande e comportamento ao scroll
- **Float WhatsApp** com animação de pulso
- **Footer** completo com contato, redes sociais e navegação
- **Responsivo** de 320px a 4K — mobile-first

---

## Como Executar Localmente

Não requer build, servidor Node ou dependência alguma.

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/jdw-acabamentos-reformas-lp.git

# Abra o arquivo diretamente no navegador
# Opção A — duplo clique em index.html
# Opção B — com Live Server (VS Code)
cd jdw-acabamentos-reformas-lp
# instale a extensão "Live Server" no VS Code e clique em "Go Live"
```

> As fontes e as imagens do portfólio de placeholder (Unsplash) requerem conexão com a internet. As imagens reais da empresa (logo, antes, depois) são servidas localmente.

---

## Estrutura do Projeto

```
jdw-acabamentos-reformas-lp/
├── index.html              # Página principal (entry point)
├── assets/
│   ├── styles-v3.css       # Estilos completos (design tokens, componentes, responsivo)
│   ├── script-v3.js        # Interações (scroll reveal, carrossel, lightbox, counters)
│   └── images/
│       ├── logo-jdw.png    # Logotipo oficial JDW (~1.4 MB)
│       ├── antes.png       # Foto Antes — 1080×1920px, 9:16 (~2.5 MB)
│       └── depois.png      # Foto Depois — 1080×1920px, 9:16 (~1.6 MB)
├── .gitignore
└── README.md
```

---

## Contato JDW

- **WhatsApp:** [(61) 8180-0981](https://wa.me/556181800981)
- **Instagram:** [@jdw_acabamentosreformas](https://www.instagram.com/jdw_acabamentosreformas/)
- **Localização:** Brasília — DF

---

## Melhorias Futuras Sugeridas

- [ ] Substituir imagens de portfólio (Unsplash) por fotos reais de obras
- [ ] Adicionar formulário de contato com backend ou Formspree
- [ ] Implementar Google Analytics / Meta Pixel
- [ ] Otimizar imagens `.png` para `.webp` (redução de ~60% no tamanho)
- [ ] Adicionar lazy loading nativo nas imagens do portfólio
- [ ] Configurar GitHub Pages ou Vercel para deploy gratuito
- [ ] Adicionar Schema.org (JSON-LD) para SEO local
- [ ] Criar página de agradecimento pós-formulário

---

*Desenvolvido com HTML, CSS e JavaScript puros — sem frameworks, máxima performance.*
