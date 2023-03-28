let minhaFila = new Fila(5);

function adicionarElemento() {
   const novoNome = document.getElementById("txtNovoNome");
   const novoCpf = document.getElementById("txtNovoCpf");
   if(novoNome.value == "" || novoCpf.value == "")
      alert("Preencha todos os Campos !")
   else{
      const novoAtendimento = new Atendimento();
      novoAtendimento.nome = novoNome.value;
      novoAtendimento.cpf = novoCpf.value;
      novoAtendimento.data = obterDataAtual();
      novoAtendimento.hora = obterHoraAtual();
      if(minhaFila.enqueue(novoAtendimento) === false)
         alert("Fila Cheia !");
      else{
         console.log(minhaFila.toString());
         alert(`${novoAtendimento.nome} entrou na fila às ${novoAtendimento.hora} do dia ${novoAtendimento.data}`);
         novoNome.value = "";
         novoCpf.value = "";
         novoNome.focus();
         mostrarFila();
      }
   }
}

function realizarAtendimento() {
   if(minhaFila.isEmpty())
      alert("Fila Vazia !");
   else{
      const remove = minhaFila.dequeue();
      const tempoEspera = calcularDiferencaHoras(remove.hora, obterHoraAtual());
      alert(remove.nome+" aguardou tempo total de: "+tempoEspera+" para ser atendido !");   
      console.log(minhaFila.toString());
      mostrarFila();
   }
}

function buscarCpf() {
   const cpf = document.getElementById("txtNovoCpf").value.trim();
   const atendimento = new Atendimento();
   let i = 0;
   for (let [key, item] of Object.entries(minhaFila.itens)){
      atendimento.cpf = cpf;
      i++;
      console.log(i);
      if (item.equals(atendimento)){
         alert("Achou! Posição: "+i);
         return;
      }
   }
   alert("CPF não encontrado !");
}

function mostrarMensagemRemocao(pessoaAtendida) {
   const lblMensagemRemocao = document.getElementById("lblMensagemRemocao");
   lblMensagemRemocao.innerHTML ="Próximo a ser atendido(a): "+ pessoaAtendida.nome;
   lblMensagemRemocao.style.display = "block";
}

function mostrarFila() {
   const filaElemento = document.getElementById("listPessoasFila");
   filaElemento.textContent = minhaFila.toString();
   filaElemento.innerHTML="";

   let i = 0;
   for(let item of minhaFila.itens){
      i++;
      const itemElement = document.createElement("li");
      itemElement.classList.add("fila-item");
      itemElement.innerText = item.toString();
      filaElemento.appendChild(itemElement);
   }

   if(i == 0) {
      pessoasFila.innerHTML = "Fila Vazia!";
      pessoasFila.style.display = "block";
   }else
      pessoasFila.innerHTML = "";

   if(!minhaFila.isEmpty()){
      mostrarMensagemRemocao(minhaFila.itens[0]);
   }else{
      lblMensagemRemocao.innerHTML = "A Fila está Vazia !";
      lblMensagemRemocao.style.display = "block";
   }
}

 function obterDataAtual() {
   let dataAtual = new Date();
   let dia = dataAtual.getDate();
   let mes = dataAtual.getMonth() + 1;
   let ano = dataAtual.getFullYear();
   let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
   return dataFormatada;
}

function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}

function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
