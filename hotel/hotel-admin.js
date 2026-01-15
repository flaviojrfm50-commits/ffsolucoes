const supabaseUrl = "https://pdajixsoowcyhnjwhgpc.supabase.co",
const supabaseKey = "sb_publishable_LatlFlcxk6IchHe3RNmfwA_9Oq4EsZw"
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// ===============================
// 📌 LISTAR QUARTOS
// ===============================
async function listarQuartos() {
  const { data, error } = await supabase
    .from("hotel_quartos")
    .select("*")
    .order("numero", { ascending: true });

  if (error) {
    console.error("Erro ao listar:", error);
    return [];
  }

  return data;
}

// ===============================
// 📌 CRIAR QUARTO
// ===============================
async function criarQuarto(quarto) {
  const { data, error } = await supabase
    .from("hotel_quartos")
    .insert(quarto);

  if (error) {
    console.error("Erro ao criar quarto:", error);
    alert("Erro ao criar quarto: " + error.message);
    return null;
  }

  return data;
}

// ===============================
// 📌 REMOVER QUARTO (OPCIONAL)
// ===============================
async function deletarQuarto(id) {
  await supabase.from("hotel_quartos").delete().eq("id", id);
}

