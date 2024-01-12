function savePoem() {
    const title = document.getElementById('poemTitle').value;
    const body = document.getElementById('poemBody').value;
    const date = document.getElementById('poemDate').value;
  
    if (title && body && date) {
      const poem = {
        title,
        body,
        date
      };
  
      // Salvare în localStorage
      const poems = JSON.parse(localStorage.getItem('poems')) || [];
      poems.push(poem);
      localStorage.setItem('poems', JSON.stringify(poems));
  
      // Resetează formularul
      document.getElementById('addPoemForm').reset();
  
      // Afișează poeziile actualizate
      displayPoems();
    }
  }
  
  function displayPoems() {
    const poemContainer = document.getElementById('poemList');
    poemContainer.innerHTML = '';
  
    const poems = JSON.parse(localStorage.getItem('poems')) || [];
  
    poems.forEach((poem, index) => {
      const poemCard = document.createElement('div');
      poemCard.className = 'card mb-3';
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body position-relative';
  
      cardBody.innerHTML = `<input type="checkbox" class="form-check-input" data-index="${index}" style="position: absolute; top: 10px; right: 10px;">
        <strong>${poem.title}</strong><br><pre>${poem.body}</pre><br>Data: ${poem.date}
        <button class="btn btn-secondary edit-button" onclick="editPoem(${index})">Editează</button>`;
  
      poemCard.appendChild(cardBody);
      poemContainer.appendChild(poemCard);
    });
  }
  
  function openPoemBox() {
    window.location.href = "index.html";
  }
  
  function deleteSelectedPoems() {
    const selectedPoems = document.querySelectorAll('input[type="checkbox"]:checked');
    const poems = JSON.parse(localStorage.getItem('poems')) || [];
  
    selectedPoems.forEach(selectedPoem => {
      const index = selectedPoem.dataset.index;
      poems.splice(index, 1);
    });
  
    localStorage.setItem('poems', JSON.stringify(poems));
    displayPoems();
  }
  
  function editPoem(index) {
    const poems = JSON.parse(localStorage.getItem('poems')) || [];
    const editedPoem = poems[index];
  
    // Populam formularul modalului cu datele actuale ale poeziei
    document.getElementById('editedTitle').value = editedPoem.title;
    document.getElementById('editedBody').value = editedPoem.body;
    document.getElementById('editedDate').value = editedPoem.date;
  
    // Deschidem modalul
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
  
    // Salvăm modificările atunci când se apasă butonul "Salvează Modificările"
    document.getElementById('editPoemForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      poems[index] = {
        title: document.getElementById('editedTitle').value,
        body: document.getElementById('editedBody').value,
        date: document.getElementById('editedDate').value
      };
  
      localStorage.setItem('poems', JSON.stringify(poems));
      displayPoems();
  
      // Închidem modalul după salvarea modificărilor
      editModal.hide();
    });
  }
  
  // Afișează poeziile la încărcarea paginii
  displayPoems();
  
