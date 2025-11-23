// DATA ITALIANA HEADER
document.getElementById("data").textContent =
    new Date().toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// STATI FILTRI
let fascia = "giorno";
let settore = "TUTTI";

// DATI ESEMPIO
const attività = [
    { giorno: "2025-07-01", fascia: "giorno", settore: "VIK", titolo: "Benvenuto MiniClub", orario: "10:00 - 11:30" },
    { giorno: "2025-07-01", fascia: "giorno", settore: "TORNEI", titolo: "Torneo Ping Pong", orario: "15:00" },
    { giorno: "2025-07-01", fascia: "giorno", settore: "FITNESS", titolo: "Risveglio Muscolare", orario: "09:00" }
];

// CAMBIO FASCIA
document.getElementById("btnGiorno").onclick = () => {
    fascia = "giorno";
    btnGiorno.classList.add("active");
    btnSera.classList.remove("active");
    render();
};

document.getElementById("btnSera").onclick = () => {
    fascia = "sera";
    btnSera.classList.add("active");
    btnGiorno.classList.remove("active");
    render();
};

// CAMBIO SETTORE
document.querySelectorAll(".pill").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        settore = btn.dataset.sector;
        render();
    };
});

// RENDER LISTA
function render() {
    const oggi = new Date().toISOString().split("T")[0];

    const filtrate = attività.filter(a =>
        a.giorno === oggi &&
        a.fascia === fascia &&
        (settore === "TUTTI" || a.settore === settore)
    );

    const box = document.getElementById("lista");
    box.innerHTML = "";

    if (filtrate.length === 0) {
        box.innerHTML = `
            <div class="card border-TORNEI">
                Nessuna attività disponibile con i filtri selezionati.
            </div>
        `;
        return;
    }

    filtrate.forEach(a => {
        box.innerHTML += `
            <div class="card border-${a.settore}">
                <h3>${a.titolo}</h3>
                <p>${a.orario}</p>
            </div>
        `;
    });
}

render();
