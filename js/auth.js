document.addEventListener('DOMContentLoaded', function() {
    // Login de usuário
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset de erros
            document.querySelectorAll('.erro').forEach(item => {
                item.textContent = '';
            });
            
            const email = document.getElementById('loginEmail').value.trim();
            const senha = document.getElementById('loginSenha').value;
            
            let valido = true;
            
            // Validação básica
            if (email === '') {
                document.getElementById('erroLoginEmail').textContent = 'E-mail é obrigatório';
                valido = false;
            }
            
            if (senha === '') {
                document.getElementById('erroLoginSenha').textContent = 'Senha é obrigatória';
                valido = false;
            }
            
            if (valido) {
                // Login com Firebase
                auth.signInWithEmailAndPassword(email, senha)
                    .then((userCredential) => {
                        // Login bem-sucedido
                        window.location.href = 'painel.html';
                    })
                    .catch((error) => {
                        // Tratamento de erros
                        console.error('Erro de login:', error);
                        
                        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                            document.getElementById('erroLoginEmail').textContent = 'E-mail ou senha incorretos';
                        } else if (error.code === 'auth/invalid-email') {
                            document.getElementById('erroLoginEmail').textContent = 'E-mail inválido';
                        } else {
                            document.getElementById('erroLoginEmail').textContent = 'Erro ao fazer login. Tente novamente.';
                        }
                    });
            }
        });
    }
    
    // Cadastro de usuário
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset de erros
            document.querySelectorAll('.erro').forEach(item => {
                item.textContent = '';
            });
            
            const nome = document.getElementById('cadastroNome').value.trim();
            const email = document.getElementById('cadastroEmail').value.trim();
            const senha = document.getElementById('cadastroSenha').value;
            const confirmaSenha = document.getElementById('confirmaSenha').value;
            
            let valido = true;
            
            // Validações
            if (nome === '') {
                document.getElementById('erroCadastroNome').textContent = 'Nome é obrigatório';
                valido = false;
            }
            
            if (email === '') {
                document.getElementById('erroCadastroEmail').textContent = 'E-mail é obrigatório';
                valido = false;
            }
            
            if (senha === '') {
                document.getElementById('erroCadastroSenha').textContent = 'Senha é obrigatória';
                valido = false;
            } else if (senha.length < 6) {
                document.getElementById('erroCadastroSenha').textContent = 'A senha deve ter pelo menos 6 caracteres';
                valido = false;
            }
            
            if (senha !== confirmaSenha) {
                document.getElementById('erroConfirmaSenha').textContent = 'As senhas não coincidem';
                valido = false;
            }
            
            if (valido) {
                // Cadastro com Firebase
                auth.createUserWithEmailAndPassword(email, senha)
                    .then((userCredential) => {
                        // Cadastro bem-sucedido
                        const user = userCredential.user;
                        
                        // Criar um documento de usuário no Firestore
                        const hoje = new Date();
                        const vencimento = new Date();
                        vencimento.setMonth(vencimento.getMonth() + 1); // Vencimento em 1 mês
                        
                        db.collection('usuarios').doc(user.uid).set({
                            nome: nome,
                            email: email,
                            plano: 'Básico', // Plano padrão
                            dataMatricula: hoje,
                            dataVencimento: vencimento
                        })
                        .then(() => {
                            alert('Cadastro realizado com sucesso!');
                            window.location.href = 'painel.html';
                        })
                        .catch((error) => {
                            console.error('Erro ao salvar dados do usuário:', error);
                            alert('Erro ao salvar dados do usuário');
                        });
                    })
                    .catch((error) => {
                        console.error('Erro de cadastro:', error);
                        
                        if (error.code === 'auth/email-already-in-use') {
                            document.getElementById('erroCadastroEmail').textContent = 'Este e-mail já está sendo usado';
                        } else if (error.code === 'auth/invalid-email') {
                            document.getElementById('erroCadastroEmail').textContent = 'E-mail inválido';
                        } else {
                            document.getElementById('erroCadastroEmail').textContent = 'Erro ao fazer cadastro. Tente novamente.';
                        }
                    });
            }
        });
    }
});