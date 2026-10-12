const TOP_COUNT = 12;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const cardHtml = (s) => `
  <div class="swiper-slide">
    <div class="card">
      <div class="card-img">
        <img src="${esc(s.albumCover)}" alt="${esc(s.title)}" loading="lazy">
        <span class="card-rank">${s.rank}</span>
      </div>
      <div class="card-title" title="${esc(s.title)}">${esc(s.title)}</div>
      <div class="card-artist">${esc(s.artist)}</div>
      <div class="card-foot">
        <button type="button" class="like">${esc(s.likes)}</button>
        <button type="button" class="play">듣기</button>
      </div>
    </div>
  </div>`;

const rowHtml = (s) => `
  <li class="row">
    <span class="row-rank">${s.rank}</span>
    <img class="row-img" src="${esc(s.albumCover)}" alt="${esc(s.title)}" loading="lazy">
    <div class="row-info">
      <div class="row-title">${esc(s.title)}</div>
      <div class="row-artist">${esc(s.artist)}</div>
    </div>
    <span class="row-likes">${esc(s.likes)}</span>
    <div class="row-btns">
      <button type="button" class="btn-play">듣기</button>
      <button type="button" class="btn-add">담기</button>
    </div>
  </li>`;

async function init() {
  const topEl = document.getElementById('top-list');
  const restEl = document.getElementById('rest-list');
  try {
    const res = await fetch('melon.json');
    if (!res.ok) throw new Error(res.status);
    const songs = (await res.json()).songs.sort((a, b) => a.rank - b.rank);

    topEl.innerHTML = songs.slice(0, TOP_COUNT).map(cardHtml).join('');
    restEl.innerHTML = songs.slice(TOP_COUNT).map(rowHtml).join('');

    new Swiper('#top-swiper', {
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: { prevEl: '#top-prev', nextEl: '#top-next' },
      breakpoints: {
        640: { slidesPerView: 3, spaceBetween: 20 },
        900: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  } catch (e) {
    restEl.innerHTML = '<li class="error">데이터를 불러오지 못했습니다. 로컬 서버(예: Live Server)로 실행해 주세요.</li>';
  }
}

init();
