document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if(username === 'anmol' && password === 'anmol123') {
    alert('Login Successful');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials');
  }
});
