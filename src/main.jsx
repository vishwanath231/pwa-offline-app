import { db } from './db';

const app = document.getElementById('root');

app.innerHTML = `
  <h1>Register User</h1>
  <form id="user-form">
    <input type="text" id="username" placeholder="Username" required /><br />
    <input type="email" id="email" placeholder="Email" required /><br />
    <button type="submit">Submit</button>
  </form>
  <ul id="user-list"></ul>
`;

const form = document.getElementById('user-form');
const userList = document.getElementById('user-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();

  if (username && email) {
    await db.users.add({ username, email });
    form.reset();
    renderUsers();
  }
});

async function renderUsers() {
  const users = await db.users.toArray();
  userList.innerHTML = users.map(user => `<li>${user.username} (${user.email})</li>`).join('');
}

renderUsers();
