// ===============================================
// AUTH.JS
// Controle de Login, Sessão e Logout
// Sistema do Hotel — FF Soluções
// ===============================================

// -------------------------
// LOGIN
// -------------------------
async function login(email, senha) {
  const { data, error } = await sb.auth.signInWithPassword({
    email: email,
    password: senha
  });

  if (error) {
    console.error("Erro no login:", error);
    return null;
  }

  // Salva usuário no localStorage
  localStorage.setItem("admin_logado", JSON.stringify(data.user));

  return data.user;
}

// -------------------------
// VERIFICAR SESSÃO
// Redireciona para login.html caso não esteja logado
// -------------------------
function verificarSessao() {
  const user = JSON.parse(localStorage.getItem("admin_logado"));

  if (!user) {
    location.href = "login.html";
    return null;
  }

  return user;
}

// -------------------------
// LOGOUT
// -------------------------
function logout() {
  localStorage.removeItem("admin_logado");
  location.href = "login.html";
}
