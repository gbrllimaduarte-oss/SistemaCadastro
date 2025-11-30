/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// Função que carrega a tabela ao abrir a página
carregarTabela();

document.getElementById("formFerias").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let inicio = document.getElementById("inicio").value;
    let fim = document.getElementById("fim").value;
    let saldo = document.getElementById("saldo").value;
    let aprovacao = document.getElementById("aprovacao").value;

    if (inicio > fim) {
        alert("A data de início não pode ser maior que a de término.");
        return;
    }

    let novo = {
        nome,
        inicio: formatarData(inicio),
        fim: formatarData(fim),
        saldo,
        aprovacao
    };

    let lista = JSON.parse(localStorage.getItem("ferias")) || [];
    lista.push(novo);
    localStorage.setItem("ferias", JSON.stringify(lista));

    carregarTabela();
    document.getElementById("formFerias").reset();
});

function carregarTabela() {
    let tabela = document.getElementById("tabelaDados");
    tabela.innerHTML = "";

    let lista = JSON.parse(localStorage.getItem("ferias")) || [];

    lista.forEach((item, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.inicio}</td>
                <td>${item.fim}</td>
                <td>${item.saldo}</td>
                <td>${item.aprovacao}</td>
                <td><button onclick="excluir(${index})">Excluir</button></td>
            </tr>
        `;
    });
}

function excluir(i) {
    let lista = JSON.parse(localStorage.getItem("ferias")) || [];
    lista.splice(i, 1);
    localStorage.setItem("ferias", JSON.stringify(lista));
    carregarTabela();
}

function formatarData(d) {
    let p = d.split("-");
    return `${p[2]}/${p[1]}/${p[0]}`;
}


