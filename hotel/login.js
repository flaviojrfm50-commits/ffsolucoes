async function login() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const erro = document.getElementById("erro");

  erro.textContent = "";

  if (!usuario || !senha) {
    erro.textContent = "Preencha usuário e senha";
    return;
  }

  const url =
    `${SUPABASE_URL}/rest/v1/admins` +
    `?usuario=eq.${usuario}` +
    `&senha=eq.${senha}` +
    `&ativo=eq.verdadeiro` +
    `&app_id=eq.${APP_ID}` +
    `&select=id,usuario,permissao,app_id`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  const data = await res.json();

  if (!data.length) {
    erro.textContent = "Usuário ou senha inválidos";
    return;
  }

  // sessão LOCAL (não quebra em outro navegador)
  sessionStorage.setItem("usuario", JSON.stringify(data[0]));

  window.location.href = "dashboard.html";
}
