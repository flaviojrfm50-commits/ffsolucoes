console.log("DASHBOARD NOVO CARREGADO");

// ===== CONFIG =====
const SUPABASE_URL = "https://pdajixsoowcyhnjwhgpc.supabase.co";
const SUPABASE_KEY = "sb_publishable_LatlFlcxk6IchHe3RNmfwA_9Oq4EsZw";

// ===== SESSION =====
const admin = JSON.parse(localStorage.getItem("admin_logado"));

if (!admin || admin.tipo !== "hotel") {
  alert("Sessão inválida");
  window.location.href = "login.html";
}

const NEGOCIO_ID = admin.negocio_id;

// ===== ELEMENTOS =====
const elQuartos = document.getElementById("total-quartos");
const elReservas = document.getElementById("total-reservas");
const elHospedagens = document.getElementById("total-hospedagens");
const listaReservas = document.getElementById("lista-reservas");

// ===== FUNÇÃO GENÉRICA =====
async function buscarTabela(tabela) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${tabela}?select=*&negocio_id=eq.${NEGOCIO_ID}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  if (!res.ok) {
    console.warn(`Falha ao acessar ${tabela}`);
    return [];
  }

  return await res.json();
}

// ===== DASHBOARD =====
async function carregarDashboard() {
  // QUARTOS
  const quartos = await buscarTabela("hotel_quartos");
  elQuartos.innerText = quartos.length;

  // RESERVAS
  const reservas = await buscarTabela("hotel_reservas");
  elReservas.innerText = reservas.length;

  // HOSPEDAGENS (se não existir, fica 0)
  const hospedagens = await buscarTabela("hotel_hospedagens");
  elHospedagens.innerText = hospedagens.length || 0;

  // ÚLTIMAS RESERVAS
  if (!reservas.length) {
    listaReservas.innerHTML = "<p>Nenhuma reserva.</p>";
    return;
  }

  listaReservas.innerHTML = reservas
    .slice(0, 5)
    .map(r => `<p>Reserva #${r.id}</p>`)
    .join("");
}

carregarDashboard();
