// ===== CONFIG SUPABASE =====
const SUPABASE_URL = "https://pdajixsoowcyhnjwhgpc.supabase.co";
const SUPABASE_KEY = "sb_publishable_LatlFlcxk6IchHe3RNmfwA_9Oq4EsZw";

// ===== ELEMENTOS =====
const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const msg = document.getElementById("msg");

async function loginHotel() {
  msg.innerText = "Entrando...";

  const user = usuario.value.trim();
  const pass = senha.value.trim();

  if (!user || !pass) {
    msg.innerText = "Preencha usuário e senha.";
    return;
  }

  try {
    // 🔥 LOGIN SIMPLES (IGUAL AOS OUTROS MÓDULOS)
    const url =
      `${SUPABASE_URL}/rest/v1/admins` +
      `?usuario=eq.${encodeURIComponent(user)}` +
      `&senha=eq.${encodeURIComponent(pass)}` +
      `&ativo=eq.true` +
      `&select=id,usuario,app_id`;

    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      msg.innerText = "Usuário ou senha inválidos.";
      return;
    }

    const admin = data[0];

    // ✅ SESSÃO SIMPLES E FUNCIONAL
    localStorage.setItem("admin_logado", JSON.stringify({
      id: admin.id,
      usuario: admin.usuario,
      app_id: admin.app_id
    }));

    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    msg.innerText = "Erro ao conectar.";
  }
}
