if (!window.supabaseClient) {
  const SUPABASE_URL = "https://pdajixsoowcyhnjwhgpc.supabase.co";
  const SUPABASE_KEY = "sb-publishable-LAtlFlcxk6IchHe3RNmfwA_9Oq4EsZw";

  // Usa o objeto global da biblioteca carregada
  const { createClient } = window.supabase;
  window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log("✅ Supabase global inicializado com sucesso.");
}
