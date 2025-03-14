var comunicador;

// conectar com o back
window.onload = function() {
    new QWebChannel(qt.webChannelTransport, function(channel) {
        comunicador = channel.objects.comunicador;
        comunicador.sinalMensagem.connect(function(mensagem) {
            document.getElementById('resposta').innerHTML = 
                '<span class="pt-msg">' + mensagem + '</span>';
            console.log("sinalMensagem", mensagem);
        });
    });
};

// Simular o processo de login
function simulateLogin() {
    const loginButton = document.getElementById('loginButton');
    const loginForm = document.getElementById('loginForm');
    const successMessage = document.getElementById('successMessage');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage') || document.createElement('div');
    
    if (!usernameInput.value || !passwordInput.value) {
        if (!document.getElementById('errorMessage')) {
        errorMessage.id = 'errorMessage';
        errorMessage.className = 'text-red-500 text-sm mt-2';
        loginForm.appendChild(errorMessage);
        }
        errorMessage.textContent = 'Por favor, preencha todos os campos!';
        return; 
    }
    
    var resposta = comunicador.Logar(usernameInput.value,passwordInput.value)
    
    // Lógica simples de validação (exemplo)
    const validUsername = "admin";
    const validPassword = "123";
    
    if (usernameInput.value !== validUsername || passwordInput.value !== validPassword) {
        // Mostrar mensagem de erro para credenciais inválidas
        if (!document.getElementById('errorMessage')) {
        errorMessage.id = 'errorMessage';
        errorMessage.className = 'text-red-500 text-sm mt-2';
        loginForm.appendChild(errorMessage);
        }
        errorMessage.textContent = 'Usuário ou senha incorretos!';
        // Tremer o formulário para indicar erro
        loginForm.classList.add('shake');
        setTimeout(() => {
        loginForm.classList.remove('shake');
        }, 500);
        return; // Interrompe a função
    }
    
    // Limpar mensagem de erro se existir
    if (document.getElementById('errorMessage')) {
        errorMessage.textContent = '';
    }
    
    // Mostrar loader
    loginButton.innerHTML = '<span class="loader"></span>';
    loginButton.disabled = true;
    
    // Simular tempo de processamento
    setTimeout(() => {
        // Ocultar formulário
        loginForm.classList.add('hidden');
        
        // Mostrar mensagem de sucesso com animação
        successMessage.classList.remove('hidden');
        successMessage.innerHTML = `
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h3 class="text-xl font-bold text-gray-800 mb-2 mt-4">Login Realizado com Sucesso!</h3>
        <p class="text-gray-600 mb-6">Bem-vindo ao Sistema PDV</p>
        <p class="typing-animation text-indigo-600">Redirecionando para o PDV...</p>
        `;
        
        // Simular redirecionamento
        setTimeout(() => {
        successMessage.innerHTML += `
            <div class="mt-6">
            <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-indigo-600 h-2.5 rounded-full" style="width: 0%;" id="progressBar"></div>
            </div>
            </div>
        `;
        
        const progressBar = document.getElementById('progressBar');
        let width = 0;
        
        const interval = setInterval(() => {
            if (width >= 100) {
            clearInterval(interval);
            comunicador.navegarPara("template/index.html");  // Chama um método Python
        } else {
            width += 5;
            progressBar.style.width = width + '%';
            }
        }, 100);
        }, 1500);
    }, 2000);
}

// Criar partículas flutuantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Propriedades aleatórias
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.bottom = '-20px';
    particle.style.opacity = Math.random() * 0.8;
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
    }
}

// Iniciar partículas quando a página carregar
window.addEventListener('load', createParticles);
