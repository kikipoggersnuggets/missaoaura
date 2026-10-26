
const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções. Gosta de construir, corrigir falhas e criar tecnologias para superar desafios.",
        imagem: "img/catsistem.jpg",
        recomendacao: "Responsável por reparar os equipamentos da nave, desenvolver ferramentas e manter os sistemas funcionando."
    },
    {
        id: 2,
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "É curioso, observador e analítico. Gosta de pesquisar, analisar evidências e descobrir como as coisas funcionam.",
        imagem: "img/doguinhocientista.jpg",
        recomendacao: "Responsável por estudar amostras do planeta, investigar formas de vida e analisar fenômenos desconhecidos."
    },
    {
        id: 3,
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "É aventureiro, corajoso e adaptável. Gosta de conhecer novos lugares e encontrar alternativas em situações inesperadas.",
        imagem: "img/cataventura.jpg",
        recomendacao: "Responsável por explorar o território, mapear regiões desconhecidas e identificar caminhos seguros para a equipe."
    },
    {
        id: 4,
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "É organizado, responsável e estratégico. Gosta de coordenar pessoas, avaliar riscos e tomar decisões importantes.",
        imagem: "img/dogestrategista.jpg",
        recomendacao: "Responsável por organizar as atividades, distribuir tarefas, planejar recursos e coordenar as decisões da missão."
    }
];

const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoNascimento = document.getElementById("nascimento");
const secaoFormulario = document.getElementById("formulario-section");
const secaoResultado = document.getElementById("resultado");
const botaoRefazer = document.getElementById("refazer");

// Impede a seleção de uma data futura.
const hoje = new Date();
const hojeLocal = [
    hoje.getFullYear(),
    String(hoje.getMonth() + 1).padStart(2, "0"),
    String(hoje.getDate()).padStart(2, "0")
].join("-");

campoNascimento.max = hojeLocal;

// Calcula a idade considerando se o aniversário já aconteceu.
function calcularIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento + "T12:00:00");
    const agora = new Date();

    let idade = agora.getFullYear() - nascimento.getFullYear();

    const aniversarioAindaNaoOcorreu =
        agora.getMonth() < nascimento.getMonth() ||
        (
            agora.getMonth() === nascimento.getMonth() &&
            agora.getDate() < nascimento.getDate()
        );

    if (aniversarioAindaNaoOcorreu) {
        idade--;
    }

    return idade;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const dataNascimento = campoNascimento.value;

    // Valida os dados pessoais.
    if (nome.length < 2) {
        alert("Por favor, informe um nome válido.");
        campoNome.focus();
        return;
    }

    if (!dataNascimento || dataNascimento > hojeLocal) {
        alert("Informe uma data de nascimento válida, sem datas futuras.");
        campoNascimento.focus();
        return;
    }

    // Confirma que todas as perguntas foram respondidas.
    const respostas = [];

    for (let i = 1; i <= 4; i++) {
        const selecionada = formulario.querySelector(
            `input[name="p${i}"]:checked`
        );

        if (!selecionada) {
            alert(`Responda à pergunta ${i} antes de continuar.`);
            return;
        }

        respostas.push(Number(selecionada.value));
    }

    // Cada perfil começa com zero pontos.
    const pontuacoes = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };

    // Cada resposta soma um ponto ao perfil escolhido.
    respostas.forEach(function(idPerfil) {
        pontuacoes[idPerfil]++;
    });

    // Descobre a maior pontuação.
    const maiorPontuacao = Math.max(...Object.values(pontuacoes));

    // Identifica todos os perfis que atingiram a maior pontuação.
    const perfisEmpatados = perfis.filter(function(perfil) {
        return pontuacoes[perfil.id] === maiorPontuacao;
    });

    let perfilEscolhido;
    let mensagemEmpate = "";

    if (perfisEmpatados.length === 1) {
        perfilEscolhido = perfisEmpatados[0];
    } else {
        // Em caso de empate, escolhe um dos perfis empatados.
        const indice = Math.floor(Math.random() * perfisEmpatados.length);
        perfilEscolhido = perfisEmpatados[indice];

        mensagemEmpate =
            "Você demonstrou características de mais de um perfil! " +
            "Como houve empate, um dos perfis com maior pontuação foi " +
            "selecionado para representar sua missão.";
    }

    // Localiza os dados do perfil no array de objetos.
    const perfil = perfis.find(function(item) {
        return item.id === perfilEscolhido.id;
    });

    const idade = calcularIdade(dataNascimento);

    // Apresenta os dados do participante e o resultado.
    document.getElementById("saudacao").textContent =
        `Olá, ${nome}!`;

    document.getElementById("idade").textContent =
        `Sua idade é ${idade} ${idade === 1 ? "ano" : "anos"}.`;

    document.getElementById("nome-perfil").textContent = perfil.nome;

    document.getElementById("categoria-perfil").textContent =
        `Categoria: ${perfil.categoria}`;

    document.getElementById("descricao-perfil").textContent =
        perfil.descricao;

    document.getElementById("recomendacao").textContent =
        perfil.recomendacao;

    document.getElementById("mensagem-empate").textContent =
        mensagemEmpate;

    const imagem = document.getElementById("imagem-perfil");
    imagem.src = perfil.imagem;
    imagem.alt = `Ilustração do perfil ${perfil.nome}`;

    // Mostra o resultado e oculta o formulário.
    secaoFormulario.hidden = true;
    secaoResultado.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Permite fazer o teste novamente.
botaoRefazer.addEventListener("click", function() {
    formulario.reset();

    secaoResultado.hidden = true;
    secaoFormulario.hidden = false;

    campoNascimento.max = hojeLocal;

    window.scrollTo({ top: 0, behavior: "smooth" });
    campoNome.focus();
});
