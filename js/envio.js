// js/envio.js

document.getElementById('formMatricula').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const plano = document.getElementById('plano').value;
  const mensagem = document.getElementById('mensagem').value;

  try {
    await db.collection("matriculas").add({
      nome,
      email,
      telefone,
      plano,
      mensagem,
      timestamp: new Date()
    });
    alert("Mensagem enviada com sucesso!");
    document.getElementById('formMatricula').reset();
  } catch (error) {
    alert("Erro ao enviar: " + error.message);
    console.error(error);
  }
});
