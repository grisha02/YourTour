const selectedElement = document.querySelector('#direction');

selectedElement.addEventListener('change', () => {
  selectedElement.classList.add('active-option');
  selectedElement.style.color = '#1B1F2B';
});

if (!selectedElement.classList.contains('active-option')) {
  selectedElement.style.color = '#A6A6A6';
}