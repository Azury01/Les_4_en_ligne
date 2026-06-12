const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const button = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    
    const BACKEND_URL = `https://formspree.io/f/meewrgpj`;

    button.disabled = true;
    button.innerText = 'Envoi en cours...';

    const formData = new FormData(form);

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.className = 'success';
            status.innerText = 'Merci ! Votre message a bien été envoyé. Nous vous répondons rapidement.';
            form.reset();
        } else {
            const data = await response.json();
            throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi.');
        }

    } catch (error) {
        status.className = 'error';
        status.innerText = 'Erreur : Impossible d\'envoyer le message pour le moment.';
        console.error(error);
    } finally {
        button.disabled = false;
        button.innerText = 'Envoyer le message';
        status.classList.remove('hidden');
    }
});