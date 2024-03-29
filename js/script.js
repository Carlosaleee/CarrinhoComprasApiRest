let carrinho = [];

function start() {
    fetch('http://fakestoreapi.com/products?limit=4')
        .then(response => response.json())
        .then(data => {
            preencherCarrinho(data);
            atualizarCarrinho(); // Chama a função para atualizar o carrinho após o preenchimento inicial
        })
        .catch(error => {
            console.log('Ocorreu um erro', error);
        });
}

function preencherCarrinho(produtos) {
    produtos.forEach(data => {
        adicionarAoCarrinho(
            data.title,
            data.image,
            data.description,
            data.price
        );
    });
}

function adicionarAoCarrinho(nome, imgLink, descricao, preco) {
    carrinho.push({
        "nome": nome,
        "imgLink": imgLink,
        "descricao": descricao,
        "preco": Number.parseFloat(preco),
        "quantidade": 0,
        "total": 0.0
    });
}

function atualizarCarrinho() {
    let carrinhoHTML = document.getElementById("carrinho");
    carrinhoHTML.innerHTML = ''; // Limpa o conteúdo atual do carrinho

    carrinho.forEach((produto, index) => {
        let html = `<div id='produto${index}' class='d-flex flex-row justify-content-between align-items-center pt-lg-12 pt-md-12 pt-2 pb-3 border-bottom mobile'>
            <div class='d-flex flex-row align-items-center'>
                <div>
                    <img src='${produto.imgLink}' width='150' height='150' id='image'/>
                    <div class='d-flex flex-column pl-md-4 pl-1'>
                        <div><h6>${produto.nome}</h6></div>
                    </div>
                </div>
                <div class='pl-md-2 pl-1'><b> R$ ${produto.preco}</b></div>
                <div class='pl-md-3 pl-2'>
                    <span class='fa fa-minus-square text-secondary' onclick='removerItem(${index})'></span>
                    <span class='px-md-3 px-1' id='quantidade${index}'>${produto.quantidade}</span>
                    <span class='fa fa-plus-square text-secondary' onclick='adicionarItem(${index})'></span>
                </div>
                <div class='pl-md-0 pl-1'>
                    <b> R$ <span id='total${index}'>${produto.total.toFixed(2)}</span></b>
                </div>
                <div class='close' onclick='removerProduto(${index})'></div>
            </div>
        </div>`;
        carrinhoHTML.innerHTML += html; // Adiciona o HTML do produto ao carrinho
    });
}

function adicionarItem(item) {
    let qtd = document.getElementById('quantidade' + item);
    let produto = carrinho[item];
    produto.quantidade += 1;
    qtd.innerHTML = produto.quantidade;
    atualizaNumerosTela(item);
}

function removerItem(item) {
    let qtd = document.getElementById('quantidade' + item);
    let produto = carrinho[item];
    if (produto.quantidade > 0) {
        produto.quantidade -= 1;
        qtd.innerHTML = produto.quantidade;
        atualizaNumerosTela(item);
    }
}

function atualizaNumerosTela(item) {
    atualizarTotalProduto(item);
    atualizarSubtotal();
}

function atualizarTotalProduto(item) {
    let total = document.getElementById('total' + item);
    let produto = carrinho[item];
    produto.total = produto.quantidade * produto.preco;
    total.innerHTML = produto.total.toFixed(2);
}

function atualizarSubtotal() {
    let totalCompra = document.getElementById('valorTotalCompra');
    let subTotal = 0;
    carrinho.forEach(produto => {
        subTotal += produto.quantidade * produto.preco;
    });
    totalCompra.innerHTML = subTotal.toFixed(2);
}

function removerProduto(item) {
    if (confirm("Você tem certeza que deseja excluir o Produto?")) {
        carrinho[item].quantidade = 0;
        atualizarSubtotal();
        atualizarCarrinho(); // Atualiza o carrinho após remover o produto
    }
}

start(); // Inicia o carregamento do carrinho ao carregar a página
