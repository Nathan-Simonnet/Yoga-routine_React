const routine = document.getElementById('routine');
const lobby = document.getElementById('lobby');

lobby.addEventListener('click', () => {
    window.location.href = './index.html';
    console.log('lobby')
});

routine.addEventListener('click', () => {
    window.location.href = './routine.html';
    console.log('routine')
});