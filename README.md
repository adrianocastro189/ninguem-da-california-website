# Site da Ninguém da Califórnia

Site oficial da banda **Ninguém da Califórnia**, de Juiz de Fora/MG.

Este é um guia de **atualização do conteúdo do site**. Tudo que a banda muda no
dia a dia (vídeos, músicas, fotos, shows) fica em **um único arquivo**. Você
edita esse arquivo, salva, envia pro GitHub, e em poucos minutos o site no ar se
atualiza sozinho. 🚀

## 🧠 A ideia em uma frase

> Existe **um arquivo só** que controla todo o conteúdo do site:
> **`src/data/site.json`**. Você nunca precisa mexer em mais nada.

Pensa nesse arquivo como o "banco de dados" da banda.

## 📁 Onde fica o que

| O que você quer mudar                       | Onde mexer             |
| ------------------------------------------- | ---------------------- |
| Vídeos, músicas, integrantes, shows, e-mail | `src/data/site.json`   |
| Fotos (arquivos de imagem)                  | pasta `public/img/`    |
| Logo da banda                               | pasta `public/assets/` |

⚠️ **Só mexa nesses lugares.** O resto do projeto é a "máquina" que monta o
site. Se mexer no resto sem saber, pode quebrar. 🙅

## ✍️ Como editar o `site.json` (o coração do site)

O "banco de dados" do site é um JSON.

1. ✅ Todo texto fica **entre aspas duplas**: `"assim"`.
2. ✅ Cada item de uma lista termina com **vírgula**, exceto o último.
3. ✅ Não apague as chaves `{ }` nem os colchetes `[ ]`.

> 😌 Se você errar uma vírgula ou uma aspa, **o site simplesmente não atualiza**
> e o GitHub te avisa que deu erro. Ele **não** publica uma versão quebrada.
> Você conserta e envia de novo.

### 🎬 Vídeo de destaque (o vídeo grande lá no topo)

```json
"featuredVideo": "https://www.youtube.com/watch?v=z8_S_wHfDxo",
```

👉 Cole o **link do YouTube** do vídeo entre as aspas. Pode ser o link
normal (`https://www.youtube.com/watch?v=...`), o link curto
(`https://youtu.be/...`) ou o link de short. O site entende qualquer um. 😉

### 📺 Shorts (o carrossel de vídeos verticais)

```json
"shorts": [
  "https://www.youtube.com/watch?v=z8_S_wHfDxo",
  "https://youtu.be/OUTRO_VIDEO_AQUI"
],
```

👉 É uma **lista**. Para adicionar um short, coloque o link entre aspas e
**não esqueça a vírgula** entre um e outro. O último não leva vírgula.

### 🎵 Repertório (o setlist)

```json
"repertoire": [
  { "title": "Take Me Out", "artist": "Franz Ferdinand", "link": "" },
  { "title": "Reptilia", "artist": "The Strokes", "link": "https://youtu.be/..." }
],
```

Cada música tem 3 campos:

- `title` 🎶 → nome da música
- `artist` 🎤 → banda original
- `link` ▶️ → link do YouTube da **nossa versão** (ou da original). Se
  deixar `""` (vazio), o site mostra a música mas o botão de "play" fica
  apagado. Quando tiver o vídeo, é só colar o link aqui.

👉 Para **adicionar** uma música, copie uma linha inteira, cole embaixo,
ajuste os textos e cuide das vírgulas. Para **remover**, apague a linha
inteira (e a vírgula sobrando, se for o caso).

### 👥 Integrantes

```json
"members": [
  { "name": "Mateus Castro", "role": "Guitarra e vocais", "photo": "" }
],
```

- `name` → nome
- `role` → o que toca
- `photo` 📸 → caminho da foto (veja a seção de fotos abaixo). Se deixar
  `""`, aparece um quadradinho escrito `[ FOTO ]` no lugar.

### 🖼️ Galeria (carrossel de fotos)

```json
"gallery": [
  { "src": "", "caption": "Foto ao vivo" },
  { "src": "img/backstage.jpg", "caption": "Backstage" }
],
```

- `src` → caminho da foto. Vazio (`""`) mostra um placeholder `[ FOTO ]`.
- `caption` → a legenda que aparece em cima da foto.

### 📅 Agenda de shows

```json
"shows": [
  { "date": "2026-08-15", "city": "São Paulo, SP", "venue": "Bar do Rock", "time": "22h", "ticket": "" }
],
```

- `date` 📆 → data no formato **ANO-MÊS-DIA** (ex.: `2026-08-15`). O site
  transforma sozinho em `15 AGO`.
- `city`, `venue` (local), `time` (horário).
- 👉 Se **não tiver show marcado**, deixe a lista vazia assim: `"shows": []`.
  O site mostra automaticamente um aviso bonito de "nenhum show marcado". 🎸

### 📧 E-mail e redes sociais

```json
"email": "contato@ninguemdacalifornia.com",
"socials": {
  "youtube": "https://www.youtube.com/@ninguem-da-california",
  "instagram": "https://www.instagram.com/ninguem.dacalifornia/"
},
```

👉 É só trocar o que está entre aspas.

### 📖 História da banda

```json
"history": "Escreva aqui a história da banda...",
```

👉 Um texto corrido entre aspas.

## 📸 Como adicionar fotos

As fotos ficam dentro da pasta **`public/img/`**. O passo a passo:

1. 🗂️ Copie o arquivo da foto (ex.: `backstage.jpg`) para dentro de
   `public/img/`.
2. 💡 Dica: use nomes **simples, sem espaços e sem acentos**
   (`foto-ensaio.jpg`, não `Foto do Ensaio.JPG`).
3. No `site.json`, no campo da foto, escreva o caminho começando com
   `img/`:
   - Foto de integrante: `"photo": "img/mateus.jpg"`
   - Foto da galeria: `"src": "img/show-sp.jpg"`
4. Salve e envie (próxima seção). ✅

> 📐 Dica de qualidade: fotos da galeria ficam bonitas em formato
> "paisagem" (mais largas que altas). Fotos de integrante ficam em
> "quadrado". Não precisa ser exato, o site se ajeita.

## 🔄 Como publicar suas mudanças (passo a passo)

O site mora no GitHub. Quando você envia uma alteração, o (GitHub Actions) monta
o site e publica sozinho. Você só precisa enviar.

### 🅰️ Pelo site do GitHub (sem instalar nada)

1. 🌐 Entre em
   [github.com/adrianocastro189/ninguem-da-california-website](https://github.com/adrianocastro189/ninguem-da-california-website).
2. 📂 Navegue até o arquivo que quer mudar (ex.: `src/data/site.json`).
3. ✏️ Clique no **lápis** (canto superior direito do arquivo) para editar.
4. ⌨️ Faça suas mudanças.
5. ⬇️ Desça até **"Commit changes"**, escreva uma frase curta do que mudou
   (ex.: "adiciona link da música Reptilia") e confirme.
6. ⏳ Pronto! O robô começa a trabalhar. Em **2 a 5 minutos** o site no ar
   se atualiza. ☕

Para **enviar uma foto** por esse jeito: entre na pasta `public/img/`,
clique em **"Add file" → "Upload files"**, arraste a imagem e confirme com
"Commit changes".

### 🅱️ Pelo computador (Git)

Se você usa o Git no computador:

```bash
# 1. Baixe a versão mais recente
git pull

# 2. (edite os arquivos no seu editor)

# 3. Veja o que mudou
git status

# 4. Marque as mudanças para envio
git add .

# 5. Salve com uma mensagem curta
git commit -m "atualiza repertorio e fotos"

# 6. Envie para o GitHub (dispara a publicação)
git push
```

⏳ Depois do `push`, a GH Action publica em alguns minutos.

### 👀 Como saber se publicou (ou se deu erro)

1. No GitHub, abra a aba **"Actions"** (no topo do repositório).
2. Você verá sua mudança rodando. 🟡 Bolinha amarela = trabalhando.
3. ✅ **Verde** = publicou com sucesso! Atualize o site no navegador.
4. ❌ **Vermelho** = teve um erro (provavelmente uma vírgula ou aspa no
   JSON). Clique nele pra ver a mensagem, conserte o arquivo e envie de
   novo. **O site no ar continua o mesmo até dar verde** — nada quebra.

## 👀 Ver as mudanças antes de publicar (opcional)

Se quiser ver como ficou **antes** de enviar pro mundo, e você tem o
Node.js instalado:

```bash
npm install   # só na primeira vez
npm run dev   # abre o site em http://localhost:4321
```

Abra o endereço que aparecer no navegador. Conforme você edita e salva, a
página atualiza sozinha. 🔁 Quando estiver bom, siga o passo de publicar.

## ❓ Deu algo errado?

- 😟 **Enviei e o site não mudou.** Veja a aba **Actions**: se está
  vermelho, foi erro no `site.json` (quase sempre vírgula ou aspa). A
  mensagem aponta a linha.
- 🤔 **Não tenho certeza se não quebrei nada.** Cole o conteúdo do
  `site.json` em [jsonlint.com](https://jsonlint.com) — ele diz na hora se
  o arquivo está válido. ✅
- 🆘 **Travou de vez.** Chama o responsável pelo site (Adriano). Como cada
  mudança fica guardada no histórico do GitHub, dá sempre pra voltar pra última
  versão que funcionava. 💾

Feito com 💜 para a Ninguém da Califórnia.

> 🛠️ **Documentação técnica**:
> `ARCHITECTURE.md` e `CODING_STANDARDS.md` na raiz do projeto.
