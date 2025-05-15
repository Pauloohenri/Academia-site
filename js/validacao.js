// Validar do formulário de matrícula
document.addEventListener('DOMContentLoaded', function() {
    const formMatricula = document.getElementById('formMatricula');

    if (formMatricula) {
        formMatricula.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset de erros
            document.querySelectorAll('.erro').forEach(item => {
                item.textContent = '';
            });

            let valido = true;

            // Validar nome
            const nome = document.getElementById('nome').value.trim();
            if (nome === '') {
                document.getElementById('erroNome').textContent = 'Nome é obrigatório';
                valido = false;
            } else if (nome.length < 3) {
                document.getElementById('erroNome').textContent = 'Nome deve ter pelo menos 3 caracteres';
                valido = false;
            }

            // Validar email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('erroEmail').textContent = 'E-mail é obrigatório';
                valido = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('erroEmail').textContent = 'E-mail inválido';
                valido = false;
            }

            // Validar telefone
            const telefone = document.getElementById('telefone').value.trim();
            const telefoneRegex = /^[0-9]{10,11}$/;
            if (telefone === '') {
                document.getElementById('erroTelefone').textContent = 'Telefone é obrigatório';
                valido = false;
            } else if (!telefoneRegex.test(telefone.replace(/\D/g, ''))) {
                document.getElementById('erroTelefone').textContent = 'Telefone inválido';
                valido = false;
            }

            // Validar plano
            const plano = document.getElementById('plano').value;
            if (plano === '') {
                document.getElementById('erroPlano').textContent = 'Selecione um plano';
                valido = false;
            }

            // Se tudo estiver válido, enviar os dados
            if (valido) {
                const dadosMatricula = {
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    plano: plano,
                    mensagem: document.getElementById('mensagem').value.trim(),
                    dataEnvio: firebase.firestore.Timestamp.now()
                };

                // Envia para a coleção "matriculas"
                db.collection('matriculas')
                    .add(dadosMatricula)
                    .then(() => {
                        alert('Formulário enviado com sucesso!');
                        formMatricula.reset();
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar os dados:', error);
                        alert('Erro ao enviar o formulário. Tente novamente mais tarde.');
                    });
            }
        });
    }
});
