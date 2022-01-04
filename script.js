/* eslint-disable no-use-before-define */
const recoverValue = document.querySelector('#lista-tarefas');
const creatTask = document.querySelector('#criar-tarefa');
const text = document.querySelector('#texto-tarefa');
const apaga = document.querySelector('#apaga-tudo');
const remove = document.querySelector('#remover-finalizados');
const save = document.querySelector('#salvar-tarefas');
const moveUp = document.querySelector('#mover-cima');
const moveDown = document.querySelector('#mover-baixo');
const removeSelected = document.querySelector('#remover-selecionado');

// Requisitos 5 e 6
// Referências:
// Mentoria com Ana Berguer
// input: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input
// value: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/values
// appendChild: http://devfuria.com.br/javascript/dom-append-child/
// creatElement: https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement
function addItem() {
  const item = document.createElement('li');

  item.innerText = text.value;
  item.addEventListener('click', corDeFundo); // Faz parte do Requisito 7
  recoverValue.appendChild(item);
  text.value = '';

  item.addEventListener('dblclick', riscaItem);
}

creatTask.addEventListener('click', addItem);

// Requisito 7
// Concluído com ajuda do Pedro Fideles da turma 19 - tribo A

function corDeFundo(event) {
  if (document.querySelector('.selecionaCor') != null) {
    document.querySelector('.selecionaCor').classList.remove('selecionaCor');
  }
  event.target.classList.add('selecionaCor');
}

// Requisito 9
// Concluído com ajuda do Pedro Fideles Turma 19 - tribo A
function riscaItem(event) {
  if (verificar(event.target.classList)) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function verificar(array) {
  for (let index = 0; index < array.length; index += 1) {
    if (array[index] === 'completed') {
      return true;
    }
  }
  return false;
}

// Requisito 10
// Concluído com ajuda do Pedro Fideldes da Turma 19 - tribo A
function apagar() {
  // recoverValue.innerHTML = ''; - Forma mais simples de fazer;
  const tarefas = recoverValue.children;

  for (let i = tarefas.length - 1; i >= 0; i -= 1) {
    recoverValue.removeChild(tarefas[i]);
  }
}
apaga.addEventListener('click', apagar);

// Requisito 11
// Concluído com ajuda do Pedro Fideles da Turma 19 - tribo A
function remover() {
  const removerCompletados = document.querySelectorAll('.completed');

  for (let i = 0; i < removerCompletados.length; i += 1) {
    recoverValue.removeChild(removerCompletados[i]);
  }
}
remove.addEventListener('click', remover);

// Requisito 12
// Storage.setItem: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/setItem
// Storage.getItem: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/getItem
save.addEventListener('click', saveTasks);

function saveTasks() {
  localStorage.setItem('listaDeTarefas', recoverValue.innerHTML); // setItem adiciona a chave ao Storage
}

function returnList() {
  recoverValue.innerHTML = localStorage.getItem('listaDeTarefas'); // getItem retorna o valor passado pelo setItem
}

returnList();

// Requisito 13
// https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
// https://developer.mozilla.org/pt-BR/docs/Web/API/Node/nextSibling
// https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
// https://developer.mozilla.org/pt-BR/docs/Web/API/Element/classList
// Concluído com ajuda do Roberval Filho na Monitoria Summer do dia 04/01/2021
function moveTop() {
  const task = document.querySelectorAll('li');
  for (let index = 0; index < task.length; index += 1) {
    if (task[index].classList.contains('selecionaCor') && index > 0) {
      recoverValue.insertBefore(task[index], task[index].previousElementSibling);
    }
  }
}
moveUp.addEventListener('click', moveTop);

function moveLow() {
  const task = document.querySelectorAll('li');
  console.log(task);
  for (let index = 0; index < task.length; index += 1) {
    if (task[index].classList.contains('selecionaCor') && index < task.length) {
      const currentTask = task[index + 2];
      recoverValue.insertBefore(task[index], currentTask);
    }
  }
}
moveDown.addEventListener('click', moveLow);

// Requisito 14
// Seguir a mesma lógica do requisito 13
function removeItemSelected() {
  const task = document.querySelectorAll('li');

  for (let index = 0; index < task.length; index += 1) {
    if (task[index].classList.contains('selecionaCor')) {
      recoverValue.removeChild(task[index]);
    }
  }
}

removeSelected.addEventListener('click', removeItemSelected);
