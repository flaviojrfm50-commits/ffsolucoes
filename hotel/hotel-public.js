/* =====================================================
   HOTEL PUBLIC CORE
   Usar SOMENTE em páginas públicas
   ===================================================== */

/* ========= SUPABASE ========= */
const SUPABASE_URL = "https://pdajixsoowcyhnjwhgpc.supabase.co",
const SUPABASE_KEY = "sb_publishable_LatlFlcxk6IchHe3RNmfwA_9Oq4EsZw""SUA_ANON_KEY";

const supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

/* ========= APP VIA URL ========= */
const params = new URLSearchParams(window.location.search);
const negocioId = params.get("app");

if (!negocioId) {
  document.body.innerHTML = `
    <div style="padding:40px;text-align:center">
      <h3>Hotel não identificado</h3>
      <p>Link inválido ou incompleto.</p>
    </div>
  `;
  throw new Error("Sem app_id na URL");
}

/* ========= HELPERS ========= */
function formatarData(data) {
  if (!data) return "-";
  return new Date(data).toLocaleDateString("pt-BR");
}

function formatarMoeda(valor) {
  if (valor === null || valor === undefined) return "-";
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* =====================================================
   QUARTOS DISPONÍVEIS (quartos.html)
   ===================================================== */
async function carregarQuartosDisponiveis() {
  const lista = document.getElementById("lista-quartos");
  if (!lista) return; // página não usa quartos

  const { data, error } = await supabase
    .from("hotel_quartos")
    .select("*")
    .eq("negocio_id", negocioId)
    .eq("status", "disponivel")
    .order("numero");

  if (error) {
    console.error(error);
    lista.innerHTML = "<p>Erro ao carregar quartos.</p>";
    return;
  }

  if (!data || data.length === 0) {
    lista.innerHTML = "<p>Nenhum quarto disponível no momento.</p>";
    return;
  }

  lista.innerHTML = "";

  data.forEach(q => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>Quarto ${q.numero}</h3>
      <p>Tipo: ${q.tipo}</p>
      <p>Valor: ${formatarMoeda(q.valor)}</p>
      <a href="reserva.html?app=${negocioId}&quarto=${q.id}">
        Reservar
      </a>
    `;

    lista.appendChild(div);
  });
}

/* =====================================================
   CRIAR RESERVA (reserva.html)
   ===================================================== */
async function criarReserva(event) {
  event.preventDefault();

  const quarto_id = document.getElementById("quarto_id")?.value;
  const nome = document.getElementById("nome")?.value.trim();
  const documento = document.getElementById("documento")?.value.trim();
  const checkin = document.getElementById("checkin")?.value;
  const checkout = document.getElementById("checkout")?.value;
  const msg = document.getElementById("msg");

  if (!quarto_id || !nome || !checkin || !checkout) {
    if (msg) msg.innerText = "Preencha todos os campos obrigatórios";
    return;
  }

  const { error } = await supabase
    .from("hotel_reservas")
    .insert([{
      negocio_id: negocioId,
      quarto_id: quarto_id,
      hospede_nome: nome,
      documento: documento,
      checkin: checkin,
      checkout: checkout,
      status: "ativo"
    }]);

  if (error) {
    console.error(error);
    if (msg) msg.innerText = "Erro ao enviar reserva";
    return;
  }

  if (msg) {
    msg.style.color = "#22c55e";
    msg.innerText = "Reserva enviada com sucesso!";
  }

  setTimeout(() => {
    location.href = "quartos.html?app=" + negocioId;
  }, 1500);
}

/* ========= INIT AUTOMÁTICO ========= */
document.addEventListener("DOMContentLoaded", () => {
  carregarQuartosDisponiveis();
});
