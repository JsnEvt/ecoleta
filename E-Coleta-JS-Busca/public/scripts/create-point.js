function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json())
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  const ufValue = event.target.value


  const indexOfSelectedStated = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedStated].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true



  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })

}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)




// Itens de coleta
// pegar todos os li`s

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []


function handleSelectedItem(event) {
  const itemLi = event.target
  //adicionar ou remover uma classe para deixar destacado a selecao na pagina.
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // console.log(itemId)

  const alreadySelected = selectedItems.findIndex(item => {
    //em relacao a linha acima, esse (item) encontra o valor contido na lista e nao o indice
    const itemFound = item === itemId //isso sera true ou false
    return itemFound
  })
  // console.log(alreadySelected)

  //verificar se existem items selecionados, se sim, pegar os itens selecionados.
  //se ja estiver selecionado, remover a selecao.

  if (alreadySelected >= 0) { //essa linha verifica a existencia do valor no array.
    //tirar da selecao
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId //false
      // (item =! itemId) RETORNA O OPOSTO
      //a linha acima retorna a lista com todos os itens DIFERENTE do 
      //item que esta sendo lido no momento.
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    //se nao estiver selecionado, adiciona-lo.
    selectedItems.push(itemId)
  }


  // atualizar o campo escondido com os itens selecionados.

  collectedItems.value = selectedItems

  // console.log(selectedItems)
}
