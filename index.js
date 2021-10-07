const apiUrl = 'https://api.github.com';

/**
 * 1 - O usuário vai digitar "username/repositorio"
 * 2 - Clicar no botão "Buscar"
 * 3 - Pegar o valor digitado
 * 4 - Fazer uma busca no Github tentando encontrar o repositório digitado;
 * 5 - Inserir o repositório na div#repositorios
 */

const repositorios = [];

async function fazerRequisicao(evento) {
  evento.preventDefault();

  let inputRepositorio = document.querySelector('input');
  let nomeRepositorio = inputRepositorio.value;
  // username/repositorio
  if (!nomeRepositorio.trim()) {
    //<span class="erro">Digite "autor/nome-do-repositorio"</span>
    let spanErro = document.createElement('span');
    spanErro.classList.add('erro');
    spanErro.innerText = 'Digite "autor/nome-do-repositorio"';
    inputRepositorio.parentElement.after(spanErro);
    return;
  }

  let repositorio = await fetch(`${apiUrl}/repos/${nomeRepositorio}`)

  let json = await repositorio.json();

  repositorios.push(json);

  //carregar repositório
  carregarRepositorio(json);

}

document
  .querySelector('form')
  .addEventListener('submit', fazerRequisicao);


function carregarRepositorios(repositorios) {
  for (const repositorio of repositorios) {
    carregarRepositorio(repositorio);
  }
}

function carregarRepositorio(json) {
  let div = `<div>
            <img class="avatar" src="${json.owner.avatar_url}" alt="${json.owner.login}" />
            <div>
              <strong>${json.full_name}</strong>
              <p>${json.description}</p>
            </div>
            <img class="svg" src="./assets/chevron-right.svg" />
          </div>
          `;

  document.querySelector('#repositorios').innerHTML += div;
}
