// a ideia e criar uma abertura de tela via javascript quando clicar no botao
// pesquisar pontos de coleta.
// ocultando e exibindo a tela quando a o ID modal com a classe HIDE estiver ativada/desativada.


const buttonSearch = document.querySelector('#page-home main a')


const modal = document.querySelector('#modal')
const close = document.querySelector('#modal .header a')

buttonSearch.addEventListener('click', () => {
  modal.classList.remove('hide')
})

close.addEventListener('click', () => {
  modal.classList.add('hide')
})

