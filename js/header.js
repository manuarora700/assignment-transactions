const header = document.getElementById("header");

const currentuser = JSON.parse(localStorage.getItem("currentuser"));

if (!currentuser) {
  header.innerHTML = `
      <nav class="nav nav--tours">
      <a class="nav__el" href="/">Peach Tree Bank</a>
    </nav>
    <nav class="nav nav--user">
      <a class="nav__el" href="/views/login.html">Login</a
      ><a class="nav__el nav__el--cta" href="/views/signup.html">Signup</a>
    </nav>
`;
} else {
  header.innerHTML = `
  <nav class="nav nav--tours">
        <a class="nav__el" href="/">Peach Tree Bank</a>
      </nav>
      <div class="header__logo">
      <a class="nav__el" href="#">Hello,  ${currentuser.name}</a>
      </div>
      <nav class="nav nav--user">
        
        <button class="nav__el" href="/views/transactions.html" onclick="logout()">logout</button>
        <a class="nav__el nav__el--cta" href="/views/transactions.html">Transactions</a>
        <a class="nav__el nav__el--cta" href="/views/capital.html">Capital</a>
      </nav>
  
  `;
}
