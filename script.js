document.addEventListener("DOMContentLoaded", () => {
    const palavras = ["programacao", "javascript", "html", "css", "github", "forca", "computador", "servidor"];
    const palavra = palavras[Math.floor(Math.random() * palavras.length)];

    const palavraDiv = document.getElementById("palavra");
    const letrasDiv = document.getElementById("letras");
    const mensagem = document.getElementById("mensagem");
    const canvas = document.getElementById("forcaCanvas");
    const ctx = canvas.getContext("2d");

    let tentativas = 6;
    let acertos = [];
    let erros = [];

    // Desenha a estrutura da forca
    function desenharEstrutura() {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        ctx.moveTo(10, 240);
        ctx.lineTo(190, 240); // base
        ctx.moveTo(50, 240);
        ctx.lineTo(50, 20);   // poste
        ctx.lineTo(150, 20);  // topo
        ctx.lineTo(150, 50);  // corda
        ctx.stroke();
    }

    // Desenha partes do boneco conforme erros
    function desenharBoneco(erros) {
        ctx.strokeStyle = "#1e88e5";
        switch(erros) {
            case 1: // cabeça
                ctx.beginPath();
                ctx.arc(150, 70, 20, 0, Math.PI*2);
                ctx.stroke();
                break;
            case 2: // corpo
                ctx.beginPath();
                ctx.moveTo(150, 90);
                ctx.lineTo(150, 150);
                ctx.stroke();
                break;
            case 3: // braço esquerdo
                ctx.beginPath();
                ctx.moveTo(150, 100);
                ctx.lineTo(120, 130);
                ctx.stroke();
                break;
            case 4: // braço direito
                ctx.beginPath();
                ctx.moveTo(150, 100);
                ctx.lineTo(180, 130);
                ctx.stroke();
                break;
            case 5: // perna esquerda
                ctx.beginPath();
                ctx.moveTo(150, 150);
                ctx.lineTo(130, 190);
                ctx.stroke();
                break;
            case 6: // perna direita
                ctx.beginPath();
                ctx.moveTo(150, 150);
                ctx.lineTo(170, 190);
                ctx.stroke();
                break;
        }
    }

    function atualizarPalavra() {
        const exibida = palavra.split("").map(l => acertos.includes(l) ? l : "_").join(" ");
        palavraDiv.textContent = exibida;
        if (!exibida.includes("_")) {
            mensagem.textContent = "🎉 Você venceu!";
            letrasDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
        }
    }

    function verificar(letra, botao) {
        if (palavra.includes(letra)) {
            acertos.push(letra);
        } else {
            erros.push(letra);
            tentativas--;
            desenharBoneco(erros.length);
        }
        atualizarPalavra();
        if (tentativas <= 0) {
            mensagem.textContent = `💀 Você perdeu! A palavra era: ${palavra}`;
            letrasDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
        }
        botao.disabled = true;
    }

    function criarBotoes() {
        const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");
        alfabeto.forEach(l => {
            const botao = document.createElement("button");
            botao.textContent = l;
            botao.className = "btn";
            botao.addEventListener("click", () => verificar(l, botao));
            letrasDiv.appendChild(botao);
        });
    }

    desenharEstrutura();
    atualizarPalavra();
    criarBotoes();
});
