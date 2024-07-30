document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    let isValid = true; 

    clearMessages();

    if (name === '' || !validateName(name)) {
        if (name === '') {
            errorMessage('nameError', 'O nome é obrigatório.');
        } else {
            errorMessage('nameError', 'O nome não pode conter números.');
        }
        isValid = false;
    }    

    if (!validateEmail(email)) {
        errorMessage('emailError', 'O e-mail é inválido.');
        isValid = false;
    }

    if (!validateCPF(cpf)) {
        errorMessage('cpfError', 'O CPF é inválido.');
        isValid = false;
    }

    if (isValid) {
        successMessage('Cadastro realizado com sucesso!');
    }
});

function errorMessage(id, message) {
    document.getElementById(id).textContent = message;
}

function successMessage(message) {
    document.getElementById('successMessage').textContent = message;
}

function clearMessages() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('cpfError').textContent = '';
    document.getElementById('successMessage').textContent = '';
}

function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateCPF(cpf) {

    // Remove caracteres que não são numéricos
    cpf = cpf.replace(/\D/g, ''); 

    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (ex: 11111111111)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Valida o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += cpf.charAt(i) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    // Valida o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += cpf.charAt(i) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    return remainder === parseInt(cpf.charAt(10));
}

