(() => {
  const SUPPORTED = ['en', 'zh', 'fr', 'de', 'es', 'ja', 'ko', 'ru'];
  const STORAGE_KEY = 'site_lang';

  function getInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(nav)) return nav;
    return 'en';
  }

  async function loadDict(lang) {
    try {
      const res = await fetch(`./i18n/${lang}.json`, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (e) {
      if (lang !== 'en') {
        console.warn(`[i18n] Failed to load ${lang}, falling back to en`, e);
        return loadDict('en');
      }
      console.warn('[i18n] Failed to load en dictionary', e);
      return {};
    }
  }

  function deepMerge(target, source) {
    const out = Array.isArray(target) ? [...target] : { ...target };
    if (!source) return out;
    for (const [k, v] of Object.entries(source)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        out[k] = deepMerge(out[k] || {}, v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }

  function getByPath(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);
  }

  function applyTranslations(dict) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = getByPath(dict, key);
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });
    // Document title (optional key: document.title)
    const title = getByPath(dict, 'document.title');
    if (title) document.title = title;
  }

  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    // Load English baseline then overlay selected language for reliable fallback
    const base = await loadDict('en');
    const overlay = lang === 'en' ? {} : await loadDict(lang);
    const dict = deepMerge(base, overlay);
    applyTranslations(dict);
    const sel = document.getElementById('langSelect');
    if (sel && sel.value !== lang) sel.value = lang;
  }

  // Expose globally for select handler
  window.setLanguage = setLanguage;

  // Init
  document.addEventListener('DOMContentLoaded', async () => {
    const initial = getInitialLang();
    await setLanguage(initial);
    const sel = document.getElementById('langSelect');
    if (sel) {
      sel.value = initial;
      sel.addEventListener('change', (e) => setLanguage(e.target.value));
    }
  });
})();


