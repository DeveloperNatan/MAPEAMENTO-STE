const menucontainer = document.getElementById("menu-container");
const modaladd = document.getElementById("modal-add");
const buttonadd = document.getElementById("button-modal-add");
const buttonfechar = document.getElementById("buttton-modal-fechar");
const selectFilial = document.getElementById("cad-filial");
const selectEspinha = document.getElementById("cad-espinha");
const selectAndar = document.getElementById("cad-andar");
const selectpa = document.getElementById("cad-pa");
const localcompleto = document.getElementById("cad-localcompleto");

async function fetchApitable() {
  try {
    const url = "http://localhost:9001/api/menurelacao";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed, status: ${response.status}`);
    }

    const menutable = await response.json();
    menucontainer.innerHTML = ""; // Limpa a tabela antes de adicionar novos itens

    menutable.forEach((item) => {
      const menuitems = document.createElement("div");
      menuitems.classList =
        "grid grid-cols-7 w-full bg-white border-b border-gray-300 p-2 text-center";

      menuitems.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>${item.LocalCompleto}</span>
        <span>${item.Patrimonio}</span>
          <div class="flex justify-center">
              <button class="bg-blue-500 text-white rounded-sm p-1 cursor-pointer mr-1">Editar</button>
              <form method="post" action="/cadastro/delete/id">
                  <input type="hidden" name="id" value="${item.id}">
                  <button type="submit" class="bg-red-500 text-white rounded-sm cursor-pointer button-excluir p-1 ml-1">
                      Excluir
                  </button>
              </form>
          </div>
        `;
      menucontainer.appendChild(menuitems);
    });
  } catch (error) {
    console.log("Erro ao buscar dados:", error);
  }
}

// Preenchendo o select de Espinha
if (selectEspinha) {
  for (let i = 1; i <= 37; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectEspinha.appendChild(option);
  }
}

if (selectAndar) {
  for (let i = 0; i <= 8; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectAndar.appendChild(option);
  }
}

if (selectpa) {
  for (let i = 1; i <= 18; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectpa.appendChild(option);
  }
}

// Evento para abrir o modal com animação
buttonadd.addEventListener("click", () => {
  modaladd.classList.remove("invisible", "opacity-0");
  modaladd.classList.add("visible", "opacity-400");

  // Suavizar a transição
  modaladd.querySelector("div").classList.remove("scale-90");
  modaladd.querySelector("div").classList.add("scale-100");
});

// Evento para fechar o modal ao clicar fora dele
buttonfechar.addEventListener("click", function (e) {
  if (e.target === buttonfechar) {
    modaladd.classList.remove("visible", "opacity-400");
    modaladd.classList.add("invisible", "opacity-0");

    // transicao
    modaladd.querySelector("div").classList.remove("scale-100");
    modaladd.querySelector("div").classList.add("scale-90");
  }
});

// Buscar os dados da API ao carregar a página
fetchApitable();
