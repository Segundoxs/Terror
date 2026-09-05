document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       EFEITOS GERAIS DO SITE (grão, cursor, reveal, etc.)
       ================================================== */

    /* ---------- 1. Injeta o grão de fundo ---------- */
    const grain = document.createElement("div");
    grain.id = "fx-grain";
    document.body.appendChild(grain);

    /* ---------- 2. Injeta o cursor customizado ---------- */
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

    // Anima o glow com "atraso" (efeito suave de perseguição)
    function animateGlow(){
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + "px";
        glow.style.top = glowY + "px";
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Cursor cresce ao passar sobre links/botões
    const hoverables = document.querySelectorAll("a, button, input[type='submit']");
    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => dot.classList.add("fx-hover"));
        el.addEventListener("mouseleave", () => dot.classList.remove("fx-hover"));
    });

    /* ---------- 3. Reveal ao rolar a página ---------- */
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

    /* ---------- 4. Efeito magnético nos botões/links ---------- */
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

    /* ---------- 5. Parallax leve nas imagens ---------- */
    const images = document.querySelectorAll("main img");
    images.forEach(img => img.classList.add("fx-parallax"));

    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        images.forEach(img => {
            const speed = 0.05;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    /* ==================================================
       EFEITO 3D E BRILHO NOS CARDS
       ================================================== */
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
       LÓGICA DO QUIZ - 6 PERGUNTAS
       ================================================== */

    // Pontuação dos vilões
    let michael = 0;
    let jason = 0;
    let freddy = 0;
    let chucky = 0;
    let ghostface = 0;
    let pennywise = 0;

    // Controle de perguntas — APENAS 6
    let pergunta1Respondida = false;
    let pergunta2Respondida = false;
    let pergunta3Respondida = false;
    let pergunta4Respondida = false;
    let pergunta5Respondida = false;
    let pergunta6Respondida = false;

    // Dados dos vilões
    const dadosViloes = {
        michael: {
            nome: "Michael Myers",
            descricao: "Você é o silêncio que aterroriza. Calmo, observador e implacável, você prefere agir nas sombras e deixar sua presença ser sentida antes mesmo de ser vista."
        },
        jason: {
            nome: "Jason Voorhees",
            descricao: "Você é movido por lealdade e vingança. Forte, determinado e com um senso de justiça distorcido, você protege o que é seu a qualquer custo."
        },
        freddy: {
            nome: "Freddy Krueger",
            descricao: "Você é o mestre da mente e da ironia. Inteligente, sarcástico e manipulador, você adora brincar com suas vítimas antes de agir."
        },
        chucky: {
            nome: "Chucky",
            descricao: "Você é pequeno, mas extremamente perigoso. Engraçado, debochado e cheio de atitude, você odeia ser subestimado e usa isso a seu favor."
        },
        ghostface: {
            nome: "Ghostface",
            descricao: "Você é o dramático e teatral. Ama ser o centro das atenções e adora um bom suspense antes do ataque."
        },
        pennywise: {
            nome: "Pennywise",
            descricao: "Você é o medo em pessoa. Misterioso, adaptável e capaz de se transformar no que mais assusta seus alvos, você joga com a mente de uma forma única."
        }
    };

    // Função principal chamada no onclick
    function responder(vilao, pergunta, card) {

        if (pergunta === 1 && !pergunta1Respondida) {
            somarPonto(vilao);
            pergunta1Respondida = true;
            marcarCard(card);
            avancarPergunta(1);
        }

        if (pergunta === 2 && !pergunta2Respondida) {
            somarPonto(vilao);
            pergunta2Respondida = true;
            marcarCard(card);
            avancarPergunta(2);
        }

        if (pergunta === 3 && !pergunta3Respondida) {
            somarPonto(vilao);
            pergunta3Respondida = true;
            marcarCard(card);
            avancarPergunta(3);
        }

        if (pergunta === 4 && !pergunta4Respondida) {
            somarPonto(vilao);
            pergunta4Respondida = true;
            marcarCard(card);
            avancarPergunta(4);
        }

        if (pergunta === 5 && !pergunta5Respondida) {
            somarPonto(vilao);
            pergunta5Respondida = true;
            marcarCard(card);
            avancarPergunta(5);
        }

        if (pergunta === 6 && !pergunta6Respondida) {
            somarPonto(vilao);
            pergunta6Respondida = true;
            marcarCard(card);
            // Última pergunta → NÃO avança mais, mostra resultado
        }

        // Se TODAS as 6 forem respondidas → mostra resultado
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

    function avancarPergunta(perguntaAtual) {
        setTimeout(() => {
            const todasPerguntas = document.querySelectorAll(".pergunta");
            todasPerguntas[perguntaAtual - 1].style.display = "none";
            if (todasPerguntas[perguntaAtual]) {
                todasPerguntas[perguntaAtual].style.display = "block";
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 500);
    }

    // ✅ SÓ VERIFICA AS 6 PERGUNTAS
    function todasRespondidas() {
        return pergunta1Respondida &&
               pergunta2Respondida &&
               pergunta3Respondida &&
               pergunta4Respondida &&
               pergunta5Respondida &&
               pergunta6Respondida;
    }

    function mostrarResultado() {
        document.querySelectorAll(".pergunta").forEach(p => p.style.display = "none");
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

        let listaPontos = "";
        todasPontuacoes.forEach(item => {
            const destaque = (item.vilao === vencedor.vilao) ? 'style="font-weight:bold;color:#dc143c;"' : "";
            listaPontos += `<li ${destaque}>${dadosViloes[item.vilao].nome}: ${item.pontos} pontos</li>`;
        });

        resultado.innerHTML = `
            <div style="text-align:center; padding:40px 20px; max-width:700px; margin:0 auto;">
                <p style="text-transform:uppercase; letter-spacing:3px; opacity:0.7; margin-bottom:10px;">Você é...</p>
                <h2 style="font-size:2.5em; color:#dc143c; margin-bottom:20px; font-family:'Cormorant Garamond', serif;">${dados.nome}</h2>
                <p style="font-size:1.1em; line-height:1.7; margin-bottom:30px;">${dados.descricao}</p>
                
                <div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:12px; margin-bottom:30px; text-align:left;">
                    <h3 style="margin-top:0; margin-bottom:15px;">Sua pontuação completa:</h3>
                    <ul style="list-style:none; padding:0; line-height:2;">
                        ${listaPontos}
                    </ul>
                </div>
                
                <button onclick="location.reload()" style="padding:14px 35px; background:#dc143c; color:white; border:none; border-radius:8px; font-size:1.1em; cursor:pointer; font-family:'Cormorant Garamond', serif;">
                    Jogar Novamente
                </button>
            </div>
        `;

        resultado.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Inicialização
    const todasPerguntas = document.querySelectorAll(".pergunta");
    todasPerguntas.forEach((p, index) => {
        p.style.display = (index === 0) ? "block" : "none";
    });

    const resultadoEl = document.getElementById("resultado");
    if (resultadoEl) resultadoEl.style.display = "none";

    // Torna a função disponível no HTML
    window.responder = responder;

});