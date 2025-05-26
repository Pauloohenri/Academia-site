// firebase.js

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAANiX5K0I6hq0-ZcFTebEFbCxhXEsPGMI",
    authDomain: "academia-fitlife.firebaseapp.com",
    projectId: "academia-fitlife",
    storageBucket: "academia-fitlife.firebasestorage.app",
    messagingSenderId: "705299652574",
    appId: "1:705299652574:web:7e30eadaf6b4ca6b5c074f"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Referências aos serviços do Firebase
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Função para verificar autenticação do usuário
  function verificarAutenticacao() {
    auth.onAuthStateChanged(user => {
      const isPainel = window.location.pathname.includes('painel.html');
      
      if (user) {
        console.log('Usuário logado:', user.email);
        // Redireciona para o painel se não estiver na página de login
        if (!isPainel && window.location.pathname.includes('login.html')) {
          window.location.href = 'painel.html';
        }
      } else {
        console.log('Usuário não logado');
        // Redireciona para o login se estiver no painel
        if (isPainel) {
          window.location.href = 'login.html';
        }
      }

      auth.onAuthStateChanged(async user => {
  if (user) {
    const docRef = db.collection('usuarios').doc(user.uid);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      // Criar novo documento caso não exista
      await docRef.set({
        nome: user.displayName || "Aluno",
        email: user.email,
        plano: "Padrão",
        dataMatricula: new Date(),
        dataVencimento: new Date(new Date().setMonth(new Date().getMonth() + 1)) // 1 mês depois
      });
      console.log("Novo documento de usuário criado!");
    }
  }
});

    });
  }
  
  // Chama a função para verificar a autenticação
  verificarAutenticacao();
  