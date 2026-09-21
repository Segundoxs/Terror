document.addEventListener("DOMContentLoaded", () => {
    const audioGrito = new Audio("https://p16-flow-file-sign.ibyteimg.com/tos-mya-i-u8dpqn1f20/8002e4c94cba4a889024846a2259fc12.mp3~tplv-0es2k971ck-image.image?rcl=2026090904174442D34E5FA07D0061C23A&rk3s=8e244e95&rrcfp=935dee89&x-expires=1789503465&x-signature=aXG8U0%2B7Pgmim%2BmP3IHh2xOZXWA%3D");
    audioGrito.preload = "auto";
    function tocarGrito() {
        audioGrito.currentTime = 0;
        audioGrito.play().catch(() => {});
    }
    const grain = document.createElement("div");
    grain.id = "fx-grain";
    document.body.appendChild(grain);
    const glow = document.createElement("div");
    glow.id = "fx-cursor-glow";
    const dot = document.createElement("div");
    dot.id = "fx-cursor-dot";
    document.body.appendChild(glow);
    document.body.appendChild(dot);
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
        glow.classList.add("fx-active");
        dot.classList.add("fx-active");
    });
    window.addEventListener("mouseleave", () => {
        glow.classList.remove("fx-active");
        dot.classList.remove("fx-active");
    });
    function animateGlow(){
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + "px";
        glow.style.top = glowY + "px";
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
    const hoverables = document.querySelectorAll("a, button, input[type='submit']");
    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => dot.classList.add("fx-hover"));
        el.addEventListener("mouseleave", () => dot.classList.remove("fx-hover"));
    });
    const sections = document.querySelectorAll("main section, footer");
    sections.forEach(sec => sec.classList.add("fx-reveal"));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add("fx-visible");
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(sec => observer.observe(sec));
    const magnetics = document.querySelectorAll("nav a, button, input[type='submit']");
    magnetics.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate(0,0)";
        });
    });
    const images = document.querySelectorAll("main img");
    images.forEach(img => img.classList.add("fx-parallax"));
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        images.forEach(img => {
            const speed = 0.05;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    const cards = document.querySelectorAll(".game-card");
    cards.forEach(card => {
        if (!card.querySelector(".game-card-shine")) {
            const shine = document.createElement("div");
            shine.className = "game-card-shine";
            card.appendChild(shine);
        }
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            card.style.transform =
                `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
        });
        card.addEventListener("mouseleave", () => {
            if (!card.classList.contains("selecionado")) {
                card.style.transform =
                    "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
            }
        });
    });
    
    /* ==================================================
       DADOS DOS VILÕES E LINKS DE AFILIADOS
       ================================================== */
    let michael = 0;
    let jason = 0;
    let freddy = 0;
    let chucky = 0;
    let ghostface = 0;
    let pennywise = 0;
    let perguntaAtual = 1;
    const totalPerguntas = 6;
    
    let pergunta1Respondida = false;
    let pergunta2Respondida = false;
    let pergunta3Respondida = false;
    let pergunta4Respondida = false;
    let pergunta5Respondida = false;
    let pergunta6Respondida = false;
    
    const dadosViloes = {
        michael: {
            nome: "Michael Myers",
            descricao: "Você é o silêncio que aterroriza. Calmo, observador e implacável, você prefere agir nas sombras e deixar sua presença ser sentida antes mesmo de ser vista. Sua determinação é lendária — quando decide algo, ninguém para você.",
            imagem: "img/michael myers.jpeg",
            poderes: ["Silêncio mortal", "Implacabilidade", "Força sobre-humana"],
            afiliados: [
                { icone: "🎬", titulo: "Assistir Halloween", descricao: "Franquia completa no Prime Video", url: "#" },
                { icone: "🔪", titulo: "Comprar Máscara de Michael", descricao: "Réplica oficial na Amazon", url: "#" },
                { icone: "📚", titulo: "Livro: A História de Michael Myers", descricao: "Conheça os bastidores do personagem", url: "#" }
            ]
        },
        jason: {
            nome: "Jason Voorhees",
            descricao: "Você é movido por lealdade e vingança. Forte, determinado e com um senso de justiça distorcido, você protege o que é seu a qualquer custo. Não esquece uma traição, e sua presença em Crystal Lake é um aviso para todos.",
            imagem: "img/jason.jpeg",
            poderes: ["Força bruta", "Resistência extrema", "Sentido de caçador"],
            afiliados: [
                { icone: "🎬", titulo: "Assistir Sexta-Feira 13", descricao: "Todos os filmes na HBO Max", url: "#" },
                { icone: "⛺", titulo: "Kit de Sobrevivência Jason", descricao: "Para fãs de verdade na Amazon", url: "#" },
                { icone: "🎭", titulo: "Máscara de Hóquei Réplica", descricao: "Item de colecionador oficial", url: "#" }
            ]
        },
        freddy: {
            nome: "Freddy Krueger",
            descricao: "Você é o mestre da mente e da ironia. Inteligente, sarcástico e manipulador, você adora brincar com suas vítimas antes de agir. O mundo dos sonhos é seu reino, e sua língua afiada é tão perigosa quanto suas lâminas.",
            imagem: "img/fred.jpeg",
            poderes: ["Manipulação de sonhos", "Inteligência afiada", "Ironia mortal"],
            afiliados: [
                { icone: "🎬", titulo: "Assistir A Hora do Pesadelo", descricao: "Clássicos do terror no Netflix", url: "#" },
                { icone: "🧤", titulo: "Luva de Freddy Réplica", descricao: "Lâminas autênticas para colecionadores", url: "#" },
                { icone: "👕", titulo: "Camiseta Freddy Krueger", descricao: "Estilo sombrio para o dia a dia", url: "#" }
            ]
        },
        chucky: {
            nome: "Chucky",
            descricao: "Você é pequeno, mas extremamente perigoso. Engraçado, debochado e cheio de atitude, você odeia ser subestimado e usa isso a seu favor. Sua língua solta e seu temperamento explosivo fazem de você um adversário imprevisível.",
            imagem: "img/chuck.jpg",
            poderes: ["Velocidade surpresa", "Atitude inabalável", "Habilidade em armas"],
            afiliados: [
                { icone: "🎬", titulo: "Assistir Brinquedo Assassino", descricao: "Saga Chucky completa no Star+", url: "#" },
                { icone: "🧸", titulo: "Boneco Chucky Colecionável", descricao: "Réplica em tamanho real", url: "#" },
                { icone: "🎮", titulo: "Jogos de Terror no PC", descricao: "Promoções imperdíveis na Steam", url: "#" }
            ]
        },
        ghostface: {
            nome: "Ghostface",
            descricao: "Você é o dramático e teatral. Ama ser o centro das atenções e adora um bom suspense antes do ataque. Sua máscara é sua marca registrada, e você sabe que o medo começa muito antes da primeira facada.",
            imagem: "img/ghostface.jpeg",
            poderes: ["Teatralidade", "Mistério estratégico", "Adaptabilidade"],
            afiliados: [
                { icone: "🎬", titulo: "Assistir Pânico", descricao: "Toda a franquia no Paramount+", url: "#" },
                { icone: "🎭", titulo: "Máscara Ghostface Oficial", descricao: "Ícone do terror moderno", url: "#" },
                { icone: "📱", titulo: "Capinha de Celular Temática", descricao: "Mostre seu lado Ghostface", url: "#" }
            ]
        },
        pennywise: {
            nome: "Pennywise",
            descricao: "Você é o medo em pessoa. Misterioso, adaptável e capaz de se transformar no que mais assusta seus alvos, você joga com a mente de uma forma única. Um palhaço sorridente que esconde a escuridão mais profunda de Derry.",
            imagem: "img/palhaço.jpeg",
            poderes: ["Metamorfose", "Manipulação mental", "Existência ancestral"],
            afiliados: [
                { icone: "🎬", titulo: "Assistir IT: A Coisa", descricao: "Capítulos 1 e 2 no Max", url: "#" },
                { icone: "📚", titulo: "Livro IT - Stephen King", descricao: "A obra-prima completa em português", url: "#" },
                { icone: "🎈", titulo: "Funko Pop Pennywise", descricao: "Para colecionadores de terror", url: "#" }
            ]
        }
    };
    
    /* ==================================================
       FUNÇÕES PRINCIPAIS
       ================================================== */
    function responder(vilao, pergunta, card) {
        if (pergunta === 1 && !pergunta1Respondida) {
            tocarGrito();
            somarPonto(vilao);
            pergunta1Respondida = true;
            marcarCard(card);
            atualizarProgresso(1);
            avancarPergunta(1);
        }
        if (pergunta === 2 && !pergunta2Respondida) {
            tocarGrito();
            somarPonto(vilao);
            pergunta2Respondida = true;
            marcarCard(card);
            atualizarProgresso(2);
            avancarPergunta(2);
        }
        if (pergunta === 3 && !pergunta3Respondida) {
            tocarGrito();
            somarPonto(vilao);
            pergunta3Respondida = true;
            marcarCard(card);
            atualizarProgresso(3);
            avancarPergunta(3);
        }
        if (pergunta === 4 && !pergunta4Respondida) {
            tocarGrito();
            somarPonto(vilao);
            pergunta4Respondida = true;
            marcarCard(card);
            atualizarProgresso(4);
            avancarPergunta(4);
        }
        if (pergunta === 5 && !pergunta5Respondida) {
            tocarGrito();
            somarPonto(vilao);
            pergunta5Respondida = true;
            marcarCard(card);
            atualizarProgresso(5);
            avancarPergunta(5);
        }
        if (pergunta === 6 && !pergunta6Respondida) {
            tocarGrito();
            somarPonto(vilao);
            pergunta6Respondida = true;
            marcarCard(card);
            atualizarProgresso(6);
        }
        if (todasRespondidas()) {
            setTimeout(mostrarResultado, 600);
        }
    }
    
    function somarPonto(vilao) {
        if (vilao === "michael") michael++;
        if (vilao === "jason") jason++;
        if (vilao === "freddy") freddy++;
        if (vilao === "chucky") chucky++;
        if (vilao === "ghostface") ghostface++;
        if (vilao === "pennywise") pennywise++;
    }
    
    function marcarCard(cardClicado) {
        const cardsDaPergunta = cardClicado.parentElement.querySelectorAll(".game-card");
        cardsDaPergunta.forEach(c => {
            c.classList.add("desativado");
            c.style.pointerEvents = "none";
        });
        cardClicado.classList.add("selecionado");
        cardClicado.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1.05)";
        cardClicado.style.border = "3px solid #dc143c";
    }
    
    function atualizarProgresso(respondida) {
        const porcentagem = (respondida / totalPerguntas) * 100;
        const barra = document.getElementById("progressoBarra");
        const texto = document.getElementById("progressoTexto");
        if (barra) barra.style.width = porcentagem + "%";
        if (texto) texto.textContent = `Pergunta ${respondida} de ${totalPerguntas}`;
    }
    
    function avancarPergunta(perguntaAtualNum) {
        setTimeout(() => {
            const todasPerguntas = document.querySelectorAll(".pergunta");
            todasPerguntas[perguntaAtualNum - 1].style.display = "none";
            
            // Mostra anúncio do meio após a pergunta 3
            if (perguntaAtualNum === 3) {
                const adsenseMeio = document.getElementById("adsense-meio");
                if (adsenseMeio) adsenseMeio.style.display = "flex";
            }
            
            if (todasPerguntas[perguntaAtualNum]) {
                todasPerguntas[perguntaAtualNum].style.display = "block";
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 500);
    }
    
    function todasRespondidas() {
        return pergunta1Respondida &&
               pergunta2Respondida &&
               pergunta3Respondida &&
               pergunta4Respondida &&
               pergunta5Respondida &&
               pergunta6Respondida;
    }
    
    /* ==================================================
       MOSTRAR RESULTADO COM MONETIZAÇÃO
       ================================================== */
    function mostrarResultado() {
        document.querySelectorAll(".pergunta").forEach(p => p.style.display = "none");
        const adsenseMeio = document.getElementById("adsense-meio");
        if (adsenseMeio) adsenseMeio.style.display = "none";
        
        const resultado = document.getElementById("resultado");
        const todasPontuacoes = [
            { vilao: "michael", pontos: michael },
            { vilao: "jason", pontos: jason },
            { vilao: "freddy", pontos: freddy },
            { vilao: "chucky", pontos: chucky },
            { vilao: "ghostface", pontos: ghostface },
            { vilao: "pennywise", pontos: pennywise }
        ];
        todasPontuacoes.sort((a, b) => b.pontos - a.pontos);
        const vencedor = todasPontuacoes[0];
        const dados = dadosViloes[vencedor.vilao];
        
        // Monta lista de pontuação
        let listaPontos = "";
        todasPontuacoes.forEach(item => {
            const classe = (item.vilao === vencedor.vilao) ? 'class="vencedor"' : "";
            listaPontos += `<li ${classe}>${dadosViloes[item.vilao].nome}: ${item.pontos} pontos</li>`;
        });
        
        // Monta poderes
        let listaPoderes = dados.poderes.map(p => `<span class="poder-tag">${p}</span>`).join(" ");
        
        // Monta afiliados
        let listaAfiliados = "";
        dados.afiliados.forEach(af => {
            listaAfiliados += `
                <a href="${af.url}" target="_blank" rel="noopener sponsored" class="afiliado-card">
                    <div class="afiliado-icone">${af.icone}</div>
                    <div class="afiliado-info">
                        <h4>${af.titulo}</h4>
                        <p>${af.descricao}</p>
                    </div>
                    <div class="afiliado-seta">→</div>
                </a>
            `;
        });
        
        // Monta HTML completo do resultado
        resultado.innerHTML = `
            <div class="resultado-card">
                <p class="label">Você é...</p>
                <h2>${dados.nome}</h2>
                
                <img src="${dados.imagem}" alt="${dados.nome}" class="resultado-imagem">
                
                <p class="descricao">${dados.descricao}</p>
                
                <div style="margin-bottom:25px;">
                    <h3 style="color:#e5383b; margin-bottom:12px;">Seus poderes sombrios:</h3>
                    <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
                        ${listaPoderes}
                    </div>
                </div>
                
                <!-- ==================== BLOCO DE ANÚNCIO 3: RESULTADO ==================== -->
                <div class="adsense-bloco adsense-resultado">
                    <div class="adsense-placeholder">
                        <span>📢 Espaço para Google AdSense</span>
                        <small>Anúncio na página de resultado</small>
                    </div>
                </div>
                
                <div class="pontuacao-box">
                    <h3>Sua pontuação completa:</h3>
                    <ul>
                        ${listaPontos}
                    </ul>
                </div>
                
                <div class="botoes-acao">
                    <button onclick="location.reload()" class="btn btn-primary">
                        🔄 Jogar Novamente
                    </button>
                    <button onclick="compartilharWhatsApp('${dados.nome}')" class="btn btn-whatsapp">
                        📱 Compartilhar no WhatsApp
                    </button>
                    <button onclick="copiarLink()" class="btn btn-secondary">
                        🔗 Copiar Link
                    </button>
                </div>
                
                <!-- ==================== SEÇÃO DE AFILIADOS ==================== -->
                <div class="afiliados-section">
                    <h3>🎬 Para os fãs de ${dados.nome}</h3>
                    <p class="subtitulo">Confira produtos e conteúdos relacionados (links de afiliado)</p>
                    ${listaAfiliados}
                </div>
            </div>
        `;
        
        // Adiciona CSS inline para as tags de poder
        const styleTags = document.createElement('style');
        styleTags.textContent = `
            .poder-tag {
                background: rgba(229, 56, 59, 0.15);
                border: 1px solid rgba(229, 56, 59, 0.4);
                color: #f5f3f4;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 500;
            }
        `;
        document.head.appendChild(styleTags);
        
        resultado.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    /* ==================================================
       FUNÇÕES DE COMPARTILHAMENTO
       ================================================== */
    function compartilharWhatsApp(vilaoNome) {
        const texto = encodeURIComponent(`🔪 Eu fiz o Terror Test e sou ${vilaoNome}! E você, qual vilão de terror seria? Faça o quiz: ${window.location.href}`);
        window.open(`https://wa.me/?text=${texto}`, '_blank');
    }
    
    function copiarLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            mostrarToast("Link copiado! Compartilhe com os amigos 👻");
        }).catch(() => {
            // Fallback
            const input = document.createElement('input');
            input.value = window.location.href;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            mostrarToast("Link copiado! Compartilhe com os amigos 👻");
        });
    }
    
    function mostrarToast(mensagem) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = mensagem;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('visivel'), 10);
        setTimeout(() => {
            toast.classList.remove('visivel');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
    
    /* ==================================================
       INICIALIZAÇÃO
       ================================================== */
    const todasPerguntas = document.querySelectorAll(".pergunta");
    todasPerguntas.forEach((p, index) => {
        p.style.display = (index === 0) ? "block" : "none";
    });
    const resultadoEl = document.getElementById("resultado");
    if (resultadoEl) resultadoEl.style.display = "none";
    
    // Expõe funções globalmente
    window.responder = responder;
    window.compartilharWhatsApp = compartilharWhatsApp;
    window.copiarLink = copiarLink;
});
