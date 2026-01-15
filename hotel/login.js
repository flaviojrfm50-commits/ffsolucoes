const supabase = supabase.createClient(
  "https://pdajixsoowcyhnjwhgpc.supabase.co";
  "sb_publishable_LatlFlcxk6IchHe3RNmfwA_9Oq4EsZw";
);

async function loginHotel() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const msg = document.getElementById("msg");

  msg.innerText = "Verificando...";
  msg.style.color = "#fff";

  if (!usuario || !senha) {
    msg.innerText = "Preencha usuário e senha";
    msg.style.color = "#f87171";
    return;
  }

  const { data, error } = await supabase
    .from("admins")
    .select("id, usuario, senha, app_id, modulo")
    .eq("usuario", usuario)
    .eq("senha", senha)
    .eq("modulo", "hotel")
    .single();

  if (error || !data) {
    msg.innerText = "Usuário ou senha inválidos";
    msg.style.color = "#f87171";
    return;
  }

  // 🔥 PADRÃO ÚNICO MULTI-NEGÓCIO
  const adminLogado = {
    id: data.id,
    usuario: data.usuario,
    app_id: data.app_id,
    modulo: "hotel"
  };

  localStorage.setItem("admin_logado", JSON.stringify(adminLogado));
  localStorage.setItem("app_id", data.app_id);

  // redireciona pro painel do hotel
  location.href = "/ffsolucoes/hotel/index.html";
}
