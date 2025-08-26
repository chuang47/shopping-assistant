const API_BASE = 'http://localhost:5050';

const $ = sel => document.querySelector(sel);
const grid = $('#grid');
const hint = $('#hint');
const form = $('#f');
const q = $('#q');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = q.value.trim();
  if (!query) return;
  hint.textContent = 'Searching...';
  grid.innerHTML = '';
  try {
    const url = `${API_BASE}/search?` + new URLSearchParams({ q: query }).toString();
    const r = await fetch(url);
    const items = await r.json();

    if (!Array.isArray(items) || items.length === 0) {
      hint.textContent = 'No results. Try rephrasing (e.g., "white crewneck t-shirt men M").';
      return;
    }

    hint.textContent = `Found ${items.length} results`;
    grid.innerHTML = items.map(toCard).join('');
  } catch (err) {
    console.error(err);
    hint.textContent = 'Error fetching results. Is the backend running?';
  }
});

function toCard(item) {
  const title = escapeHtml(item.title || 'Product');
  const price = item.price ? `$${item.price}` : '';
  const source = item.source || '';
  const img = item.image || '';

  return `
    <div class="card">
      <a href="${item.url}" target="_blank" rel="noopener">
        <img src="${img}" alt="">
        <div class="meta">
          <div class="title" title="${title}">${title}</div>
          <div class="row">
            <span>${price}</span>
            <span>${source}</span>
          </div>
        </div>
      </a>
    </div>
  `;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Optional: run an initial query for quick demo
document.addEventListener('DOMContentLoaded', () => {
  q.value = 'white t-shirt mens medium';
});
