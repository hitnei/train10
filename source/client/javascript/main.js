const menuToggle = document.getElementById('menu-toggle')
const menuContent = document.getElementById('menu-content')

menuToggle.addEventListener('click', () => {
    if (menuContent.classList.contains('active')) {
        menuContent.classList.remove('active')
    } else {
        menuContent.classList.add('active')
    }
})