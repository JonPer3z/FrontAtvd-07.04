// Função para alternar o menu lateral e deslocar o container
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const mainContainer = document.getElementById('main-container');
    sidebar.classList.toggle('active');
    mainContainer.classList.toggle('shifted');
}

// Garantir que a função esteja disponível globalmente
window.toggleMenu = toggleMenu;