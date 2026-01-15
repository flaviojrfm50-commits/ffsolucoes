async function login(usuario, senha) {
  // Corrigir caracteres especiais (ex: ponto)
  const usuarioCod = encodeURIComponent(usuario);
  const senhaCod = encodeURIComponent(senha);

  // Consulta segura
  const { data, error } = await sb
    .from("usuarios")
    .select("*")
    .eq("usuario", usuarioCod)
    .eq("senha", senhaCod)
    .maybeSingle();

  if (error) {
    console.error("Erro no login:", error);
    return null;
  }

  if (!data) return null;

  localStorage.setItem("admin_logado", JSON.stringify(data));
  return data;
}

function verificarSessao() {
  const user = JSON.parse(localStorage.getItem("admin_logado"));
  if (!user) location.href = "login.html";
  return user;
}

function logout() {
  localStorage.removeItem("admin_logado");
  location.href = "login.html";
}
