/* ============================================================
   NINGUÉM DA CALIFÓRNIA — CONFIGURAÇÃO DO SITE
   Edite SOMENTE este arquivo para atualizar o conteúdo do site.
   Não é preciso mexer no código. Salve e recarregue a página.
   ============================================================ */
window.SITE_CONFIG = {

  /* E-mail e redes sociais */
  email: "contato@ninguemdacalifornia.com",
  socials: {
    youtube:   "https://www.youtube.com/@ninguem-da-california",
    instagram: "https://www.instagram.com/ninguem.dacalifornia/"
  },

  /* Vídeo principal do topo — cole o link OU só o ID do YouTube */
  featuredVideo: "https://www.youtube.com/watch?v=z8_S_wHfDxo",

  /* História da banda */
  history:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",

  /* Integrantes — adicione "photo" com o caminho da foto quando tiver */
  members: [
    { name: "Mateus Castro",      role: "Guitarra e vocais",            photo: "" },
    { name: "Adriano Castro",     role: "Guitarra e vocais de apoio",   photo: "" },
    { name: "Guilherme Morrison", role: "Baixo e vocais de apoio",      photo: "" },
    { name: "Marcelo Oliveira",   role: "Bateria",                      photo: "" }
  ],

  /* Galeria de fotos (carrossel) — adicione caminhos de imagem */
  gallery: [
    { src: "", caption: "Foto ao vivo" },
    { src: "", caption: "Backstage" },
    { src: "", caption: "Ensaio" },
    { src: "", caption: "Show" }
  ],

  /* Shorts do YouTube — cole o link OU o ID de cada short */
  shorts: [
    "https://www.youtube.com/watch?v=z8_S_wHfDxo"
  ],

  /* Agenda de shows — deixe [] vazio enquanto não houver shows marcados */
  shows: [
    // { date: "2026-08-15", city: "São Paulo, SP", venue: "Bar do Rock", time: "22h", ticket: "" }
  ],

  /* Repertório
     "link" = link do YouTube (nosso cover OU a música original). Deixe "" se ainda não tiver.
     O ícone ▶ no setlist só aparece ativo quando há link. */
  repertoire: [
    { title: "The Fallen", artist: "Franz Ferdinand", link: "" },
    { title: "If I Had a Tail", artist: "Queens of the Stone Age", link: "" },
    { title: "Chocolate", artist: "Snow Patrol", link: "" },
    { title: "Frances Farmer Will Have Her Revenge On Seattle", artist: "Nirvana", link: "" },
    { title: "Stacked Actors", artist: "Foo Fighters", link: "" },
    { title: "Live Forever", artist: "Oasis", link: "" },
    { title: "Bug Eyes", artist: "Dredg", link: "" },
    { title: "Mexicola", artist: "Queens of the Stone Age", link: "" },
    { title: "Dam That River", artist: "Alice In Chains", link: "" },
    { title: "Bigger Stronger", artist: "Coldplay", link: "" },
    { title: "Planet Telex", artist: "Radiohead", link: "" },
    { title: "No More Keeping My Feet on the Ground", artist: "Coldplay", link: "" },
    { title: "Weight of Love", artist: "The Black Keys", link: "" },
    { title: "Champagne Supernova", artist: "Oasis", link: "" },
    { title: "Until It Sleeps", artist: "Metallica", link: "" },
    { title: "Choking Game", artist: "Chevelle", link: "" },
    { title: "Dead End Friends", artist: "Them Crooked Vultures", link: "" },
    { title: "Electioneering", artist: "Radiohead", link: "" },
    { title: "Ulysses", artist: "Franz Ferdinand", link: "" },
    { title: "Reptilia", artist: "The Strokes", link: "" },
    { title: "Take Me Out", artist: "Franz Ferdinand", link: "" },
    { title: "Fever", artist: "The Black Keys", link: "" },
    { title: "Wolf Like Me", artist: "TV on the Radio", link: "" },
    { title: "Quotes", artist: "Dredg", link: "" },
    { title: "Turn It Again", artist: "Red Hot Chili Peppers", link: "" },
    { title: "Cave", artist: "Muse", link: "" },
    { title: "Do the Evolution", artist: "Pearl Jam", link: "" }
  ]
};