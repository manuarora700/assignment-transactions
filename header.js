const header = document.getElementById("header");

const currentuser = JSON.parse(localStorage.getItem("currentuser"));

if (!currentuser) {
  header.innerHTML = `
      <nav class="nav nav--tours">
      <a class="nav__el" href="/">Peach Tree Bank</a>
    </nav>
    <div class="header__logo">
    <a class="nav__el" href="#">Hello</a>
    </div>
    <nav class="nav nav--user">
      <a class="nav__el" href="/login.html">Login</a
      ><a class="nav__el nav__el--cta" href="/signup.html">Signup</a>
    </nav>
`;
  console.log("USER NOT THERE");
  // window.reload();
} else {
  header.innerHTML = `
  <nav class="nav nav--tours">
        <a class="nav__el" href="/">Peach Tree Bank</a>
      </nav>
      <div class="header__logo">
      <a class="nav__el" href="#">Hello,  ${currentuser.name}</a>
      </div>
      <nav class="nav nav--user">
        
        <button class="nav__el" href="/transactions.html" onclick="logout()">logout</button>
        <a class="nav__el nav__el--cta" href="/transactions.html">Transactions</a>
        <a class="nav__el nav__el--cta" href="/capital.html">Capital</a>
      </nav>
  
  `;
  console.log(currentuser);
  // window.reload();
}
