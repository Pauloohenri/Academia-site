document.addEventListener('DOMContentLoaded', function() {
    // Botão de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            auth.signOut().then(() => {
                window.location.href = 'login.html';
            }).catch((error) => {
                console.error('Erro ao fazer logout:', error);
            });
        });
    }
    
    // Carregar dados do usuário
    auth.onAuthStateChanged(user => {
        if (user) {
            // Buscar dados do usuário no Firestore
            db.collection('usuarios').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const dados = doc.data();
                        
                        // Atualizar informações na página
                        document.getElementById('nomeAluno').textContent = dados.nome;
                        document.getElementById('emailAluno').textContent = dados.email;
                        document.getElementById('planoAluno').textContent = dados.plano;
                        
                        // Formatar datas
                        const dataMatricula = new Date(dados.dataMatricula.seconds * 1000);
                        const dataVencimento = new Date(dados.dataVencimento.seconds * 1000);
                        
                        const formatarData = (data) => {
                            return data.toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                        };
                        
                        document.getElementById('dataMatricula').textContent = formatarData(dataMatricula);
                        document.getElementById('dataVencimento').textContent = formatarData(dataVencimento);
                        
                        // Verificar se o plano está vencido
                        const hoje = new Date();
                        const statusPlano = document.getElementById('statusPlano');
                        
                        if (dataVencimento < hoje) {
                            statusPlano.classList.add('status-vencido');
                            statusPlano.textContent = 'Plano vencido! Entre em contato para renovação.';
                        } else {
                            statusPlano.classList.add('status-ativo');
                            statusPlano.textContent = 'Plano ativo';
                        }
                    } else {
                        console.log("Documento do usuário não encontrado!");
                    }
                }).catch((error) => {
                    console.error("Erro ao buscar dados do usuário:", error);
                });
        }
    });
});