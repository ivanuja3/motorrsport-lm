/* ===== Motorrsport.LM — medición y comportamiento ===== */
/* Completar con los IDs reales cuando estén creadas las cuentas. Mientras tengan "XXXX", no se carga nada. */
const GA_ID = 'G-NL1FMX5SRQ';          // Google Analytics 4 (ID de medición)
const ADS_ID = 'AW-XXXXXXXXXX';        // Google Ads (ID de la cuenta)
const ADS_LABEL_WHATSAPP = 'XXXXXXXX'; // etiqueta de conversión: clic en WhatsApp
const ADS_LABEL_LLAMADA = 'XXXXXXXX';  // etiqueta de conversión: clic en llamar

window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
const real = v => v && !/X{4,}/.test(v);
if (real(GA_ID) || real(ADS_ID)) {
  const s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (real(GA_ID) ? GA_ID : ADS_ID);
  document.head.appendChild(s);
  gtag('js', new Date());
  if (real(GA_ID)) gtag('config', GA_ID);
  if (real(ADS_ID)) gtag('config', ADS_ID);
}
function track(evento, label){
  gtag('event', evento, { pagina: location.pathname });
  if (real(ADS_ID) && real(label)) gtag('event', 'conversion', { send_to: ADS_ID + '/' + label });
}
document.addEventListener('click', e => {
  const a = e.target.closest('a'); if (!a) return;
  const h = a.getAttribute('href') || '';
  if (h.startsWith('https://wa.me/')) track('whatsapp_click', ADS_LABEL_WHATSAPP);
  else if (h.startsWith('tel:')) track('llamada_click', ADS_LABEL_LLAMADA);
  else if (h.includes('google.com/maps')) track('mapa_click');
});

/* marcas que pasaron por el taller */
const track_el = document.getElementById('brandsTrack');
if (track_el) {
  const BRANDS = [
    {name:'Volkswagen', file:'volkswagen'}, {name:'Audi', file:'audi'}, {name:'BMW', file:'bmw'},
    {name:'Toyota', file:'toyota'}, {name:'Peugeot', file:'peugeot'}, {name:'Ford', file:'ford'},
    {name:'Chevrolet', file:'chevrolet'}, {name:'Fiat', file:'fiat'}, {name:'Renault', file:'renault'},
    {name:'Nissan', file:'nissan'}, {name:'Honda', file:'honda'}, {name:'Citroën', file:'citroen'}
  ];
  track_el.innerHTML = [...BRANDS, ...BRANDS].map(b => `<span class="brand-item"><img src="assets/brands/${b.file}.svg" alt="${b.name}" loading="lazy"></span>`).join('');
}

/* entrada suave de secciones */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, {threshold: .12});
document.querySelectorAll('.sec, .hero-grid, .lp-hero .wrap').forEach(el => { el.classList.add('fade-in'); io.observe(el); });
