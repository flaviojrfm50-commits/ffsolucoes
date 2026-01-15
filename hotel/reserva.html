// ================== SUPABASE ==================
const supabase = supabase.createClient(
  "https://pdajixsoowcyhnjwhgpc.supabase.co",
  "sb_publishable_LatlFlcxk6IchHe3RNmfwA_9Oq4EsZw"
);

// ================== SESSÃO (PADRÃO BAR) ==================
const admin = JSON.parse(localStorage.getItem("admin_logado"));

if (!admin || !admin.app_id) {
  alert("Sessão inválida. Faça login novamente.");
  location.href = "../auth/login.html";
  throw new Error("Sem app_id");
}

const negocioId = admin.app_id;

// ================== CRIAR RESERVA ==================
async function criarReserva(event) {
  event.preventDefault();

  const quarto_id = document.getElementById("quarto_id").value;
  const nome = document.getElementById("nome").value.trim();
  const documento = document.getElementById("documento").value.trim();
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (!quarto_id || !nome || !checkin || !checkout) {
    alert("Preencha todos os campos obrigatórios");
    return;
  }

  const { error } = await supabase
    .from("hotel_reservas")
    .insert([{
      negocio_id: negocioId,   // 🔥 AQUI ESTAVA O ERRO
      quarto_id: quarto_id,
      hospede_nome: nome,
      documento: documento,
      checkin: checkin,
      checkout: checkout,
      status: "ativo"
    }]);

  if (error) {
    console.error("Erro ao criar reserva:", error);
    alert("Erro ao criar reserva");
    return;
  }

  alert("Reserva realizada com sucesso!");
  location.href = "reservas.html";
}
