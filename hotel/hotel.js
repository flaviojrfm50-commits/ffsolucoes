const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario || usuario.app_id !== APP_ID) {
  alert("Sessão inválida");
  window.location.href = "login.html";
}

async function listarQuartos() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/hotel_quartos?app_id=eq.${APP_ID}&select=*`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const quartos = await res.json();
  const div = document.getElementById("lista");

  div.innerHTML = "";

  quartos.forEach(q => {
    div.innerHTML += `
      <div>
        <b>Quarto ${q.numero}</b><br>
        Tipo: ${q.tipo}<br>
        Capacidade: ${q.capacidade}<br>
        Diária: R$ ${q.valor_diario}<br>
        Status: ${q.status}
        <hr>
      </div>
    `;
  });
}

listarQuartos();
