# 🔪 Terror Test — Quiz Qual Vilão do Terror Você Seria?

Quiz interativo de personalidade com tema de terror, preparado para monetização com Google AdSense e links de afiliados. Hospedagem gratuita no Cloudflare Pages (termos permitem uso comercial).

## ✨ Funcionalidades

- 🎭 **6 vilões icônicos**: Michael Myers, Jason Voorhees, Freddy Krueger, Chucky, Ghostface, Pennywise
- ❓ **6 perguntas** com cards interativos em 3D
- 🎨 **Design imersivo**: paleta sombria, efeito grão de filme, cursor customizado, parallax
- 📊 **Barra de progresso** das perguntas
- 🏆 **Página de resultado** completa com pontuação detalhada
- 📱 **Botões de compartilhamento**: WhatsApp e copiar link (essencial para viralizar)
- 💰 **3 espaços para Google AdSense** estrategicamente posicionados
- 🛒 **Seção de afiliados personalizada** por cada vilão
- 📱 **Totalmente responsivo** para celular

## 🚀 Como colocar no ar (Cloudflare Pages)

### Passo 1: Preparar o código
1. Crie uma conta no **GitHub** (gratuita)
2. Crie um novo repositório (ex: `quiz-terror`)
3. Faça upload de todos os arquivos desta pasta para o repositório

### Passo 2: Deploy no Cloudflare Pages
1. Acesse [pages.cloudflare.com](https://pages.cloudflare.com) e crie uma conta gratuita
2. Clique em **"Create a project"** → **"Connect to Git"**
3. Selecione seu repositório do GitHub
4. Na tela de configuração:
   - **Framework preset**: `None` (ou deixe em branco)
   - **Build command**: deixe vazio
   - **Build output directory**: deixe vazio
5. Clique em **"Save and Deploy"**

✅ Pronto! Seu site estará no ar em menos de 1 minuto com um endereço como `seu-projeto.pages.dev`

## 💰 Configurando a Monetização

### 1. Google AdSense
1. Crie uma conta no [Google AdSense](https://www.google.com/adsense/)
2. Quando seu site for aprovado, gere códigos de anúncio do tipo **"Display ads"**
3. Cole os códigos nos locais marcados no `index.html`:
   - **Linha ~28**: `id="adsense-topo"` — topo da página
   - **Linha ~155**: `id="adsense-meio"` — aparece entre pergunta 3 e 4
   - No arquivo `Quiz.js`, procure por `adsense-resultado` — página de resultado

> 💡 **Dica**: Comece com 3 blocos de anúncio. Muitos anúncios = experiência ruim = menos compartilhamentos.

### 2. Links de Afiliados
No arquivo `Quiz.js`, procure o objeto `dadosViloes`. Cada vilão tem uma seção `afiliados` com 3 links.

**Programas de afiliados recomendados para o Brasil:**
- **Amazon Associates**: produtos físicos (bonecos, camisetas, livros)
- **Prime Video / Max / Netflix**: links para filmes (verifique se têm programa de afiliados)
- **Hotmart**: cursos e produtos digitais de terror
- **Magazine Luiza / Mercado Livre**: produtos variados

Substitua os `url: "#"` pelos seus links de afiliado.

### 3. Dica extra: Pix/Doação (opcional)
Se quiser adicionar um botão "Pague um café pro dev ☕" com Pix, é só adicionar mais um botão na seção `botoes-acao` dentro da função `mostrarResultado()` no `Quiz.js`.

## 📈 Dicas para gerar receita

1. **Compartilhamento é tudo**: Incentive amigos a fazerem o quiz e compartilharem o resultado no WhatsApp/Instagram Stories
2. **Poste em grupos**: Grupos de Facebook de fãs de terror, comunidades do Reddit, fóruns
3. **TikTok/Reels**: Faça um vídeo curto mostrando seu resultado e convidando pessoas a fazerem o quiz
4. **SEO**: O título e descrição já estão otimizados, mas você pode adicionar mais conteúdo na página inicial se quiser

## 📁 Estrutura do Projeto

```
quiz-terror/
├── index.html      # Página principal com perguntas
├── Quiz.css        # Estilos e tema de terror
├── Quiz.js         # Lógica do quiz + monetização
├── img/            # Imagens dos vilões
│   ├── michael myers.jpeg
│   ├── jason.jpeg
│   ├── fred.jpeg
│   ├── chuck.jpg
│   ├── ghostface.jpeg
│   └── palhaço.jpeg
└── README.md       # Este arquivo
```

## ⚠️ Avisos Importantes

- ✅ **Cloudflare Pages permite monetização** em seu plano gratuito — diferente da Vercel Hobby
- 📜 Leia os termos do Google AdSense antes de aplicar (seu site precisa ter conteúdo original e suficiente)
- 🔗 Sempre use `rel="sponsored"` ou `rel="nofollow"` em links de afiliado (já configurado no código)
- 🎵 O áudio de grito usa um link externo — para maior estabilidade, hospede seu próprio arquivo de áudio

## 🎉 Pronto!

Seu quiz de terror está pronto para gerar receita. Comece pequeno, foque em compartilhamento orgânico, e com o tempo você verá a receita crescendo conforme mais pessoas descobrem o quiz!

👻 Boa sorte e que o terror esteja com você!
