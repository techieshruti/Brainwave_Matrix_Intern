 const editBtn = document.querySelector('.edit-profile-btn');
  const userNameSpan = document.getElementById('user-name');

  editBtn.addEventListener('click', () => {
    const currentName = userNameSpan.textContent;
    const newName = prompt('Enter your new name:', currentName);
    if (newName && newName.trim() !== '') {
      userNameSpan.textContent = newName.trim();
    }
  });

  //login page 
  