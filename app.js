/**
 * Amungsa Studio - Official Photo Template Canvas Engine
 * Built for Amungsa Foundation / Amungsa Cares Papua
 */

// STATE MANAGEMENT
const state = {
  aspectRatio: '4:5', // '4:5' (1080x1350) or '1:1' (1080x1080)
  canvasW: 1080,
  canvasH: 1350,
  template: 'tpl1_berita', // 'tpl1_berita', 'tpl2_dokumentasi', 'tpl3_slogan', 'tpl12_kolase3'
  exportFormat: 'png', // 'png', 'jpeg', or 'webp'

  // Photos
  activeFrameIndex: 0,
  frames: [
    {
      img: null,
      src: 'assets/frame_image 01.png',
      zoom: 1.0,
      panX: 0,
      panY: 0,
      brightness: 100,
      contrast: 100,
    },
    {
      img: null,
      src: 'assets/frame_image 02.png',
      zoom: 1.0,
      panX: 0,
      panY: 0,
      brightness: 100,
      contrast: 100,
    },
    {
      img: null,
      src: 'assets/frame_image 03.png',
      zoom: 1.0,
      panX: 0,
      panY: 0,
      brightness: 100,
      contrast: 100,
    }
  ],

  // Badge
  badge: {
    enabled: true,
    text: 'SINERGI AMUNGSA',
    color: '#0f3b6c', // Deep Navy Blue Sinergi (Official)
    textColor: '#ffffff',
    position: 'bottom_left', // 'bottom_left', 'bottom', 'top', 'header'
    size: 17
  },

  // Date
  date: {
    enabled: true,
    style: 'box', // 'box' or 'pill'
    bgColor: 'silver', // 'silver' (default resmi) or custom hex
    day: '13',
    month: 'JUNI',
    year: '2026',
    location: 'Bhintuka SP. 13'
  },

  // Title / Slogan
  title: {
    enabled: true,
    text: 'Memperkuat Ikatan dengan\nPUSKESMAS dan Masyarakat\nBhintuka SP. 13',
    font: 'Plus Jakarta Sans', // 'Plus Jakarta Sans', 'Alex Brush', 'Great Vibes', 'Playfair Display', 'asset_png'
    size: 38,
    color: '#ffffff',
    subtitleEnabled: false,
    subtitleText: ''
  },

  // Branding & Overlays
  branding: {
    logoEnabled: true,
    logoGlow: true,
    logoCardBg: false,
    brushEnabled: true,
    brushOpacity: 0.85,
    motifEnabled: true,
    watermarkEnabled: true,
    watermarkOpacity: 0.70,
    socialEnabled: true,
    socialUsername: 'amungsafoundation'
  },

  // Loaded Assets Cache from Authentic .PSD
  assets: {
    logo: null,
    watermark: null,
    designOverlay: null,
    designOverlaySquare: null,
    motif: null,
    motifSquare: null,
    sloganDefault: null,
    contact: null,
    contactWide: null,
    calendarBoxShape: null,
    badgeShape: null
  },

  zoomScale: 0.55
};

// PRESETS (MATCHING OFFICIAL .PSD TEMPLATES IN assets/1MENTAH)
const PRESETS = {
  sinergi: {
    template: 'tpl1_berita',
    badgeText: 'SINERGI AMUNGSA',
    badgeColor: '#0f3b6c',
    day: '13',
    month: 'JUNI',
    year: '2026',
    dateBgColor: 'silver',
    location: 'Bhintuka SP. 13',
    titleText: 'Memperkuat Ikatan dengan\nPUSKESMAS dan Masyarakat\nBhintuka SP. 13',
    font: 'Plus Jakarta Sans',
    titleSize: 38,
    subtitleEnabled: false,
    subtitleText: '',
    photoIndex: 0,
    titleEnabled: true,
    dateEnabled: true,
    badgeEnabled: true,
    watermarkEnabled: true
  },
  dokumentasi: {
    template: 'tpl2_dokumentasi',
    badgeText: 'DOKUMENTASI KEGIATAN',
    badgeColor: '#0f52ba',
    day: '13',
    month: 'JUNI',
    year: '2026',
    location: 'Bhintuka SP. 13',
    titleText: '',
    font: 'Plus Jakarta Sans',
    titleSize: 36,
    subtitleEnabled: false,
    subtitleText: '',
    photoIndex: 1,
    titleEnabled: false,
    dateEnabled: false,
    badgeEnabled: false,
    watermarkEnabled: true
  },
  piringSehat: {
    template: 'tpl3_slogan',
    badgeText: 'PROGRAM GIZI AMUNGSA',
    badgeColor: '#0c6e50',
    day: '13',
    month: 'JUNI',
    year: '2026',
    location: 'Mimika, Papua Tengah',
    titleText: 'Dari Piring Sehat,\nLahir Masa Depan Hebat',
    font: 'asset_png',
    titleSize: 44,
    subtitleEnabled: false,
    subtitleText: '',
    photoIndex: 2,
    titleEnabled: true,
    dateEnabled: false,
    badgeEnabled: false,
    watermarkEnabled: false
  },
  kolaseLele: {
    template: 'tpl12_kolase3',
    badgeText: 'DOKUMENTASI AKSI YAYASAN AMUNGSA CARES',
    badgeColor: '#0c6e50',
    day: '07',
    month: 'SEPT',
    year: '2026',
    dateBgColor: 'silver',
    location: 'Budidaya Lele SP3, Mimika',
    titleText: 'Dari Piring Sehat,\nLahir Masa Depan Hebat',
    font: 'Alex Brush',
    titleSize: 44,
    subtitleEnabled: true,
    subtitleText: 'Kawal Kebijakan & Pendampingan Nyata Lapangan Peternak SP3',
    photoIndex: 0,
    titleEnabled: true,
    dateEnabled: true,
    badgeEnabled: true,
    watermarkEnabled: false
  },
  reses: {
    template: 'tpl1_berita',
    badgeText: 'PENGUATAN KEMITRAAN',
    badgeColor: '#0f3b6c',
    day: '10',
    month: 'JUNI',
    year: '2026',
    dateBgColor: 'silver',
    location: 'DPRD Mimika, Papua Tengah',
    titleText: 'Mengikuti RESES Anggota Dewan\nPerwakilan Rakyat Daerah (DPRD)\nKabupaten Mimika',
    font: 'Plus Jakarta Sans',
    titleSize: 36,
    subtitleEnabled: false,
    subtitleText: '',
    photoIndex: 0,
    titleEnabled: true,
    dateEnabled: true,
    badgeEnabled: true,
    watermarkEnabled: true
  },
  masker: {
    template: 'tpl1_berita',
    badgeText: 'RESPON AMUNGSA',
    badgeColor: '#991b1b',
    day: '14',
    month: 'SEPT',
    year: '2026',
    dateBgColor: 'silver',
    location: 'Mimika, Papua Tengah',
    titleText: 'Amungsa Salurkan 2.000 Masker\nuntuk Warga dan Pelajar\ndi Tengah Asap dan Debu',
    font: 'Plus Jakarta Sans',
    titleSize: 36,
    subtitleEnabled: false,
    subtitleText: '',
    photoIndex: 0,
    titleEnabled: true,
    dateEnabled: true,
    badgeEnabled: true,
    watermarkEnabled: true
  },
  akreditasi: {
    template: 'tpl1_berita',
    badgeText: 'PENGUATAN KELEMBAGAAN',
    badgeColor: '#0c6e50',
    day: '27',
    month: 'JUNI',
    year: '2026',
    dateBgColor: 'silver',
    location: 'Sekretariat Yayasan, Mimika',
    titleText: 'Amungsa Jalani Visitasi\nAkreditasi Lembaga Kesejahteraan\nSosial (LKS)',
    font: 'Plus Jakarta Sans',
    titleSize: 36,
    subtitleEnabled: false,
    subtitleText: '',
    photoIndex: 0,
    titleEnabled: true,
    dateEnabled: true,
    badgeEnabled: true,
    watermarkEnabled: true
  }
};

// DOM ELEMENTS
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const canvasWrapper = document.getElementById('canvasWrapper');

// INIT
window.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  if (document.fonts) {
    try { await document.fonts.ready; } catch(e) {}
  }
  await loadAssets();
  await loadSamplePhotos();
  fitCanvasToScreen();
  render();
});

// LOAD SYSTEM BRANDING ASSETS EXTRACTED FROM OFFICIAL .PSD
async function loadAssets() {
  const assetMap = {
    logo: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.logo) || 'assets/Logo Amungsa Cares Papua.png',
    watermark: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.watermark) || 'assets/watermark_official_scaled.png',
    designOverlay: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.designOverlay) || 'assets/design_official_overlay.png',
    designOverlaySquare: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.designOverlaySquare) || 'assets/design_official_overlay_square.png',
    motif: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.motif) || 'assets/motif_official_overlay.png',
    motifSquare: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.motifSquare) || 'assets/motif_official_overlay_square.png',
    sloganDefault: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.sloganDefault) || 'assets/slogan_piring_sehat_official.png',
    contact: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.contact) || 'assets/contact_centered_official.png',
    contactWide: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.contactWide) || 'assets/contact_wide_official.png',
    calendarBoxShape: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.calendarBoxShape) || 'assets/calendar_box_official_shape.png',
    badgeShape: (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.badgeShape) || 'assets/badge_official_shape.png'
  };

  const promises = Object.entries(assetMap).map(([key, url]) => {
    return new Promise((resolve) => {
      const img = new Image();
      if (typeof url === 'string' && url.startsWith('http')) {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => {
        state.assets[key] = img;
        resolve();
      };
      img.onerror = () => {
        console.warn(`Asset failed to load: ${key}`);
        resolve();
      };
      img.src = url;
    });
  });

  await Promise.all(promises);

  // Load authentic OCRAExtended font for Badge
  if (window.AMUNGSA_ASSETS && window.AMUNGSA_ASSETS.ocraFont) {
    try {
      const ocraFace = new FontFace('OCRAExtended', `url("${window.AMUNGSA_ASSETS.ocraFont}")`, { weight: 'normal', style: 'normal' });
      await ocraFace.load();
      document.fonts.add(ocraFace);
      const ocraFaceBold = new FontFace('OCRAExtended', `url("${window.AMUNGSA_ASSETS.ocraFont}")`, { weight: 'bold', style: 'normal' });
      await ocraFaceBold.load();
      document.fonts.add(ocraFaceBold);
      const ocraFace2 = new FontFace('OCR A Extended', `url("${window.AMUNGSA_ASSETS.ocraFont}")`, { weight: 'normal', style: 'normal' });
      await ocraFace2.load();
      document.fonts.add(ocraFace2);
      const ocraFace2Bold = new FontFace('OCR A Extended', `url("${window.AMUNGSA_ASSETS.ocraFont}")`, { weight: 'bold', style: 'normal' });
      await ocraFace2Bold.load();
      document.fonts.add(ocraFace2Bold);
      console.log('OCRAExtended font loaded successfully!');
    } catch (e) {
      console.warn('Could not load OCRAExtended via FontFace:', e);
    }
  }
}

// LOAD SAMPLE PHOTOS
async function loadSamplePhotos() {
  const sampleMap = [
    (window.AMUNGSA_ASSETS && (window.AMUNGSA_ASSETS.frameImage01 || window.AMUNGSA_ASSETS.sampleLeft)) || state.frames[0].src,
    (window.AMUNGSA_ASSETS && (window.AMUNGSA_ASSETS.frameImage02 || window.AMUNGSA_ASSETS.sampleCenter)) || state.frames[1].src,
    (window.AMUNGSA_ASSETS && (window.AMUNGSA_ASSETS.frameImage03 || window.AMUNGSA_ASSETS.sampleRight)) || state.frames[2].src
  ];

  const promises = state.frames.map((frame, idx) => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = sampleMap[idx] || frame.src;
      if (typeof url === 'string' && url.startsWith('http')) {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => {
        frame.img = img;
        resolve();
      };
      img.onerror = () => {
        console.warn(`Sample photo ${idx} failed to load`);
        resolve();
      };
      img.src = url;
    });
  });

  await Promise.all(promises);
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  // Tabs Navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Template Selection Cards
  document.querySelectorAll('.tpl-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.tpl-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.template = card.dataset.tpl;

      // Adjust defaults when switching template
      if (state.template === 'tpl1_berita') {
        state.activeFrameIndex = 0;
        state.title.enabled = true;
        state.date.enabled = true;
        state.badge.enabled = true;
        state.branding.watermarkEnabled = true;
      } else if (state.template === 'tpl2_dokumentasi') {
        state.activeFrameIndex = 1;
        state.title.enabled = false;
        state.date.enabled = false;
        state.badge.enabled = false;
        state.branding.watermarkEnabled = true;
      } else if (state.template === 'tpl3_slogan') {
        state.activeFrameIndex = 2;
        state.title.enabled = true;
        state.title.font = 'asset_png';
        state.date.enabled = false;
        state.badge.enabled = false;
        state.branding.watermarkEnabled = false;
      }

      syncUIFromState();
      render();
    });
  });

  // Presets (From Authentic .PSD Templates)
  const btnSinergi = document.getElementById('presetSinergi');
  const btnDokumentasi = document.getElementById('presetDokumentasi');
  const btnPiringSehat = document.getElementById('presetPiringSehat');
  const btnKolaseLele = document.getElementById('presetKolaseLele');
  const btnReses = document.getElementById('presetReses');
  const btnMasker = document.getElementById('presetMasker');
  const btnAkreditasi = document.getElementById('presetAkreditasi');

  if (btnSinergi) btnSinergi.addEventListener('click', () => applyPreset('sinergi'));
  if (btnDokumentasi) btnDokumentasi.addEventListener('click', () => applyPreset('dokumentasi'));
  if (btnPiringSehat) btnPiringSehat.addEventListener('click', () => applyPreset('piringSehat'));
  if (btnKolaseLele) btnKolaseLele.addEventListener('click', () => applyPreset('kolaseLele'));
  if (btnReses) btnReses.addEventListener('click', () => applyPreset('reses'));
  if (btnMasker) btnMasker.addEventListener('click', () => applyPreset('masker'));
  if (btnAkreditasi) btnAkreditasi.addEventListener('click', () => applyPreset('akreditasi'));

  // Aspect Ratio Buttons
  document.getElementById('btnRatio45').addEventListener('click', () => setAspectRatio('4:5'));
  document.getElementById('btnRatio11').addEventListener('click', () => setAspectRatio('1:1'));

  // Badge Controls
  const toggleBadge = document.getElementById('toggleBadge');
  const badgeText = document.getElementById('badgeText');
  const badgePosition = document.getElementById('badgePosition');
  const badgeCustomColor = document.getElementById('badgeCustomColor');

  if (toggleBadge) toggleBadge.addEventListener('change', (e) => { state.badge.enabled = e.target.checked; render(); });
  if (badgeText) badgeText.addEventListener('input', (e) => { state.badge.text = e.target.value; render(); });
  if (badgePosition) badgePosition.addEventListener('change', (e) => { state.badge.position = e.target.value; render(); });

  document.querySelectorAll('#badgeColorPalette .color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('#badgeColorPalette .color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      state.badge.color = dot.dataset.color;
      if (badgeCustomColor) badgeCustomColor.value = dot.dataset.color;
      render();
    });
  });

  if (badgeCustomColor) {
    badgeCustomColor.addEventListener('input', (e) => {
      state.badge.color = e.target.value;
      document.querySelectorAll('#badgeColorPalette .color-dot').forEach(d => d.classList.remove('active'));
      render();
    });
  }

  // Date Controls
  const toggleDate = document.getElementById('toggleDate');
  const btnDateBox = document.getElementById('btnDateBox');
  const btnDatePill = document.getElementById('btnDatePill');
  const dateDay = document.getElementById('dateDay');
  const dateMonth = document.getElementById('dateMonth');
  const dateYear = document.getElementById('dateYear');
  const dateLocation = document.getElementById('dateLocation');

  if (toggleDate) toggleDate.addEventListener('change', (e) => { state.date.enabled = e.target.checked; render(); });
  if (btnDateBox) {
    btnDateBox.addEventListener('click', () => {
      state.date.style = 'box';
      btnDateBox.classList.add('active');
      if (btnDatePill) btnDatePill.classList.remove('active');
      render();
    });
  }
  if (btnDatePill) {
    btnDatePill.addEventListener('click', () => {
      state.date.style = 'pill';
      btnDatePill.classList.add('active');
      if (btnDateBox) btnDateBox.classList.remove('active');
      render();
    });
  }

  if (dateDay) dateDay.addEventListener('input', (e) => { state.date.day = e.target.value; render(); });
  if (dateMonth) dateMonth.addEventListener('input', (e) => { state.date.month = e.target.value; render(); });
  if (dateYear) dateYear.addEventListener('input', (e) => { state.date.year = e.target.value; render(); });
  if (dateLocation) dateLocation.addEventListener('input', (e) => { state.date.location = e.target.value; render(); });

  // Date Color Palette Listeners
  const dateCustomColor = document.getElementById('dateCustomColor');
  if (dateCustomColor) {
    dateCustomColor.addEventListener('input', (e) => {
      state.date.bgColor = e.target.value;
      document.querySelectorAll('#dateColorPalette .color-dot').forEach(d => d.classList.remove('active'));
      render();
    });
  }

  document.querySelectorAll('#dateColorPalette .color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('#dateColorPalette .color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      state.date.bgColor = dot.dataset.color;
      render();
    });
  });

  // Title Controls
  const toggleTitle = document.getElementById('toggleTitle');
  const titleText = document.getElementById('titleText');
  const titleSize = document.getElementById('titleSize');
  const titleSizeVal = document.getElementById('titleSizeVal');
  const titleColor = document.getElementById('titleColor');
  const titleColorCode = document.getElementById('titleColorCode');
  const toggleSubtitle = document.getElementById('toggleSubtitle');
  const subtitleText = document.getElementById('subtitleText');

  if (toggleTitle) toggleTitle.addEventListener('change', (e) => { state.title.enabled = e.target.checked; render(); });
  if (titleText) titleText.addEventListener('input', (e) => { state.title.text = e.target.value; render(); });
  if (titleSize) {
    titleSize.addEventListener('input', (e) => {
      state.title.size = parseInt(e.target.value, 10);
      if (titleSizeVal) titleSizeVal.textContent = state.title.size + 'px';
      render();
    });
  }
  if (titleColor) {
    titleColor.addEventListener('input', (e) => {
      state.title.color = e.target.value;
      if (titleColorCode) titleColorCode.textContent = e.target.value;
      render();
    });
  }
  if (toggleSubtitle) {
    toggleSubtitle.addEventListener('change', (e) => { state.title.subtitleEnabled = e.target.checked; render(); });
  }
  if (subtitleText) {
    subtitleText.addEventListener('input', (e) => { state.title.subtitleText = e.target.value; render(); });
  }

  // Font Selection
  document.querySelectorAll('input[name="fontFamily"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.title.font = e.target.value;
      document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
      e.target.closest('.radio-card').classList.add('active');
      render();
    });
  });

  // Custom Font Uploader
  const customFontInput = document.getElementById('customFontInput');
  const customFontLoadedName = document.getElementById('customFontLoadedName');
  if (customFontInput) {
    customFontInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const buffer = await file.arrayBuffer();
          const cleanFontName = 'CustomFont_' + file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
          const customFontFace = new FontFace(cleanFontName, buffer);
          await customFontFace.load();
          document.fonts.add(customFontFace);
          
          state.title.font = cleanFontName;
          document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
          if (customFontLoadedName) {
            customFontLoadedName.textContent = `✓ Font Terpasang: ${file.name}`;
          }
          render();
          showToast(`Font kustom "${file.name}" berhasil dipasang & diterapkan ke judul!`);
        } catch (err) {
          console.error(err);
          showToast('Gagal memuat file font. Pastikan file valid (.ttf / .otf / .woff).');
        }
      }
    });
  }

  // Photo Frame Selection Tabs
  document.querySelectorAll('.frame-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.frame-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeFrameIndex = parseInt(tab.dataset.frame, 10);
      updateFrameUIValues();
    });
  });

  // Photo Adjustments
  const frameZoom = document.getElementById('frameZoom');
  const frameZoomVal = document.getElementById('frameZoomVal');
  const framePanX = document.getElementById('framePanX');
  const framePanY = document.getElementById('framePanY');
  const frameBrightness = document.getElementById('frameBrightness');
  const frameBrightnessVal = document.getElementById('frameBrightnessVal');
  const frameContrast = document.getElementById('frameContrast');
  const frameContrastVal = document.getElementById('frameContrastVal');
  const btnResetFrame = document.getElementById('btnResetFrame');

  frameZoom.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.frames[state.activeFrameIndex].zoom = val / 100;
    frameZoomVal.textContent = val + '%';
    render();
  });

  framePanX.addEventListener('input', (e) => {
    state.frames[state.activeFrameIndex].panX = parseInt(e.target.value, 10);
    render();
  });

  framePanY.addEventListener('input', (e) => {
    state.frames[state.activeFrameIndex].panY = parseInt(e.target.value, 10);
    render();
  });

  frameBrightness.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.frames[state.activeFrameIndex].brightness = val;
    frameBrightnessVal.textContent = val + '%';
    render();
  });

  frameContrast.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.frames[state.activeFrameIndex].contrast = val;
    frameContrastVal.textContent = val + '%';
    render();
  });

  btnResetFrame.addEventListener('click', () => {
    const fr = state.frames[state.activeFrameIndex];
    fr.zoom = 1.0;
    fr.panX = 0;
    fr.panY = 0;
    fr.brightness = 100;
    fr.contrast = 100;
    updateFrameUIValues();
    render();
    showToast('Posisi foto telah direset.');
  });

  // Dropzone File Upload
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');

  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  });

  // Branding Controls
  const toggleLogo = document.getElementById('toggleLogo');
  const toggleLogoGlow = document.getElementById('toggleLogoGlow');
  const logoCardBg = document.getElementById('logoCardBg');
  const toggleWatermark = document.getElementById('toggleWatermark');
  const watermarkOpacity = document.getElementById('watermarkOpacity');
  const watermarkOpacityVal = document.getElementById('watermarkOpacityVal');
  const toggleBrush = document.getElementById('toggleBrush');
  const brushOpacity = document.getElementById('brushOpacity');
  const brushOpacityVal = document.getElementById('brushOpacityVal');
  const toggleMotif = document.getElementById('toggleMotif');
  const toggleSocial = document.getElementById('toggleSocial');
  const socialUsername = document.getElementById('socialUsername');

  toggleLogo.addEventListener('change', (e) => { state.branding.logoEnabled = e.target.checked; render(); });
  if (toggleLogoGlow) {
    toggleLogoGlow.addEventListener('change', (e) => { state.branding.logoGlow = e.target.checked; render(); });
  }
  logoCardBg.addEventListener('change', (e) => { state.branding.logoCardBg = e.target.checked; render(); });

  if (toggleWatermark) {
    toggleWatermark.addEventListener('change', (e) => { state.branding.watermarkEnabled = e.target.checked; render(); });
  }
  if (watermarkOpacity) {
    watermarkOpacity.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.branding.watermarkOpacity = val / 100;
      watermarkOpacityVal.textContent = val + '%';
      render();
    });
  }

  toggleBrush.addEventListener('change', (e) => { state.branding.brushEnabled = e.target.checked; render(); });
  brushOpacity.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.branding.brushOpacity = val / 100;
    brushOpacityVal.textContent = val + '%';
    render();
  });
  toggleMotif.addEventListener('change', (e) => { state.branding.motifEnabled = e.target.checked; render(); });
  toggleSocial.addEventListener('change', (e) => { state.branding.socialEnabled = e.target.checked; render(); });
  socialUsername.addEventListener('input', (e) => { state.branding.socialUsername = e.target.value; render(); });

  // Direct Mouse Drag & Zoom on Canvas to Pan and Scale Photo
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let startPanX = 0;
  let startPanY = 0;

  function getFrameAtMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseCanvasX = (e.clientX - rect.left) * (state.canvasW / rect.width);
    const mouseCanvasY = (e.clientY - rect.top) * (state.canvasH / rect.height);

    if (state.template === 'tpl12_kolase3') {
      const yShift = (state.aspectRatio === '1:1') ? -60 : 0;
      // Frame 1 di tengah berada di lapisan atas (foreground)
      if (mouseCanvasX >= 353 && mouseCanvasX <= 353 + 376 && mouseCanvasY >= 393 + yShift && mouseCanvasY <= 393 + yShift + 565) {
        return 1;
      }
      // Frame 2 di kanan
      if (mouseCanvasX >= 661 && mouseCanvasX <= 661 + 376 && mouseCanvasY >= 272 + yShift && mouseCanvasY <= 272 + yShift + 564) {
        return 2;
      }
      // Frame 0 di kiri
      if (mouseCanvasX >= 51 && mouseCanvasX <= 51 + 376 && mouseCanvasY >= 179 + yShift && mouseCanvasY <= 179 + yShift + 564) {
        return 0;
      }
      return state.activeFrameIndex;
    }

    if (state.template === 'tpl1_berita') return 0;
    if (state.template === 'tpl2_dokumentasi') return (state.activeFrameIndex === 0 ? 1 : state.activeFrameIndex);
    if (state.template === 'tpl3_slogan') return (state.activeFrameIndex === 0 ? 2 : state.activeFrameIndex);

    return state.activeFrameIndex;
  }

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;

    // Tentukan frame yang diklik
    state.activeFrameIndex = getFrameAtMousePosition(e);
    document.querySelectorAll('.frame-tab').forEach(t => {
      t.classList.toggle('active', parseInt(t.dataset.frame, 10) === state.activeFrameIndex);
    });
    updateFrameUIValues();

    startPanX = state.frames[state.activeFrameIndex].panX;
    startPanY = state.frames[state.activeFrameIndex].panY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStartX) / state.zoomScale;
    const dy = (e.clientY - dragStartY) / state.zoomScale;
    const fr = state.frames[state.activeFrameIndex];
    fr.panX = Math.round(startPanX + dx);
    fr.panY = Math.round(startPanY + dy);
    framePanX.value = fr.panX;
    framePanY.value = fr.panY;
    render();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // ZOOM DI AREA FOTO (DALAM CANVAS): Memperbesar / memperkecil foto di dalam template
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Deteksi frame yang sedang di-hover
    const targetFrame = getFrameAtMousePosition(e);
    state.activeFrameIndex = targetFrame;
    document.querySelectorAll('.frame-tab').forEach(t => {
      t.classList.toggle('active', parseInt(t.dataset.frame, 10) === state.activeFrameIndex);
    });

    const fr = state.frames[targetFrame];
    const zoomDelta = e.deltaY < 0 ? 0.05 : -0.05;
    fr.zoom = Math.max(0.5, Math.min(3.5, Number((fr.zoom + zoomDelta).toFixed(2))));

    updateFrameUIValues();
    render();
  }, { passive: false });

  // Workbench Zoom Controls
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnZoomFit = document.getElementById('btnZoomFit');
  const btnZoom50 = document.getElementById('btnZoom50');
  const btnZoom75 = document.getElementById('btnZoom75');
  const btnZoom100 = document.getElementById('btnZoom100');
  const zoomSlider = document.getElementById('zoomSlider');

  if (btnZoomIn) btnZoomIn.addEventListener('click', () => setZoom(state.zoomScale + 0.1));
  if (btnZoomOut) btnZoomOut.addEventListener('click', () => setZoom(state.zoomScale - 0.1));
  if (btnZoomFit) btnZoomFit.addEventListener('click', fitCanvasToScreen);
  if (btnZoom50) btnZoom50.addEventListener('click', () => setZoom(0.5));
  if (btnZoom75) btnZoom75.addEventListener('click', () => setZoom(0.75));
  if (btnZoom100) btnZoom100.addEventListener('click', () => setZoom(1.0));

  if (zoomSlider) {
    zoomSlider.addEventListener('input', (e) => {
      setZoom(parseInt(e.target.value, 10) / 100);
    });
  }

  // ZOOM DI LUAR CANVAS (AREA PUTIH VIEWPORT): Memperbesar / memperkecil tampilan editor (zoom view)
  const viewport = document.getElementById('canvasViewport');
  if (viewport) {
    viewport.addEventListener('wheel', (e) => {
      // Jika scroll terjadi di canvas, biarkan listener canvas yang menangani zoom foto
      if (e.target === canvas || canvas.contains(e.target)) return;

      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.05 : -0.05;
      setZoom(state.zoomScale + delta);
    }, { passive: false });
  }

  // HD Zoom Preview Modal Listeners
  const btnOpenZoomPreview = document.getElementById('btnOpenZoomPreview');
  const btnClosePreviewModal = document.getElementById('btnClosePreviewModal');
  const previewModal = document.getElementById('previewModal');
  const btnDownloadFromPreview = document.getElementById('btnDownloadFromPreview');
  const btnModalDownloadPNG = document.getElementById('btnModalDownloadPNG');
  const btnModalDownloadJPG = document.getElementById('btnModalDownloadJPG');
  const btnModalDownloadWEBP = document.getElementById('btnModalDownloadWEBP');
  const btnModalZoomIn = document.getElementById('btnModalZoomIn');
  const btnModalZoomOut = document.getElementById('btnModalZoomOut');
  const btnModalZoomFit = document.getElementById('btnModalZoomFit');
  const btnModalZoom100 = document.getElementById('btnModalZoom100');

  if (btnOpenZoomPreview) btnOpenZoomPreview.addEventListener('click', openPreviewModal);
  if (btnClosePreviewModal) btnClosePreviewModal.addEventListener('click', closePreviewModal);
  if (btnDownloadFromPreview) btnDownloadFromPreview.addEventListener('click', () => exportImage('image/png', 'amungsa_post_hd.png'));
  if (btnModalDownloadPNG) btnModalDownloadPNG.addEventListener('click', () => exportImage('image/png', 'amungsa_post_hd.png'));
  if (btnModalDownloadJPG) btnModalDownloadJPG.addEventListener('click', () => exportImage('image/jpeg', 'amungsa_post_hd.jpg'));
  if (btnModalDownloadWEBP) btnModalDownloadWEBP.addEventListener('click', () => exportImage('image/webp', 'amungsa_post_hd.webp'));

  if (btnModalZoomIn) btnModalZoomIn.addEventListener('click', () => setModalPreviewZoom(modalPreviewScale + 0.15));
  if (btnModalZoomOut) btnModalZoomOut.addEventListener('click', () => setModalPreviewZoom(modalPreviewScale - 0.15));
  if (btnModalZoomFit) btnModalZoomFit.addEventListener('click', () => setModalPreviewZoom(0.55));
  if (btnModalZoom100) btnModalZoom100.addEventListener('click', () => setModalPreviewZoom(1.0));

  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) closePreviewModal();
    });
  }

  window.addEventListener('resize', fitCanvasToScreen);

  // ==========================================
  // EXPORT & DOWNLOAD FORMAT LISTENERS (PNG, JPG, WEBP)
  // ==========================================
  const btnDownloadMain = document.getElementById('btnDownloadMain');
  const btnToggleDownloadMenu = document.getElementById('btnToggleDownloadMenu');
  const downloadMenu = document.getElementById('downloadMenu');
  const downloadDropdownWrap = document.getElementById('downloadDropdownWrap');

  if (btnDownloadMain) {
    btnDownloadMain.addEventListener('click', () => downloadCurrent());
  }

  if (btnToggleDownloadMenu && downloadMenu) {
    btnToggleDownloadMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      downloadMenu.classList.toggle('show');
    });
  }

  document.addEventListener('click', (e) => {
    if (downloadMenu && downloadDropdownWrap && !downloadDropdownWrap.contains(e.target)) {
      downloadMenu.classList.remove('show');
    }
  });

  document.querySelectorAll('.download-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const fmt = item.getAttribute('data-format');
      setExportFormat(fmt);
      if (downloadMenu) downloadMenu.classList.remove('show');
      downloadCurrent(fmt);
    });
  });

  // Sidebar Format Selector (Pills) & Download Button
  document.querySelectorAll('.btn-fmt-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const fmt = btn.getAttribute('data-fmt');
      setExportFormat(fmt);
    });
  });

  const btnDownloadSidePNG = document.getElementById('btnDownloadSidePNG');
  if (btnDownloadSidePNG) {
    btnDownloadSidePNG.addEventListener('click', () => downloadCurrent());
  }

  // Quick Export Toolbar Buttons (Bottom)
  const btnExportPNG = document.getElementById('btnExportPNG');
  const btnExportJPG = document.getElementById('btnExportJPG');
  const btnExportWEBP = document.getElementById('btnExportWEBP');
  if (btnExportPNG) btnExportPNG.addEventListener('click', () => { setExportFormat('png'); downloadCurrent('png'); });
  if (btnExportJPG) btnExportJPG.addEventListener('click', () => { setExportFormat('jpeg'); downloadCurrent('jpeg'); });
  if (btnExportWEBP) btnExportWEBP.addEventListener('click', () => { setExportFormat('webp'); downloadCurrent('webp'); });

  const btnDownloadPNG = document.getElementById('btnDownloadPNG');
  if (btnDownloadPNG) btnDownloadPNG.addEventListener('click', () => downloadCurrent('png'));

  const btnCopyClipboard = document.getElementById('btnCopyClipboard');
  if (btnCopyClipboard) btnCopyClipboard.addEventListener('click', copyCanvasToClipboard);

  // ==========================================
  // MENU IMPORT FOTO & TERAPKAN TEMPLATE
  // ==========================================
  const btnNavImportModal = document.getElementById('btnNavImportModal');
  const btnTriggerQuickImport = document.getElementById('btnTriggerQuickImport');
  const btnFloatingImport = document.getElementById('btnFloatingImport');
  const btnCloseImportModal = document.getElementById('btnCloseImportModal');
  const btnCancelImportModal = document.getElementById('btnCancelImportModal');
  const importModal = document.getElementById('importModal');

  if (btnNavImportModal) btnNavImportModal.addEventListener('click', openImportModal);
  if (btnTriggerQuickImport) btnTriggerQuickImport.addEventListener('click', () => {
    const qInp = document.getElementById('quickImportFileInput');
    if (qInp) qInp.click();
  });
  if (btnFloatingImport) btnFloatingImport.addEventListener('click', openImportModal);
  if (btnCloseImportModal) btnCloseImportModal.addEventListener('click', closeImportModal);
  if (btnCancelImportModal) btnCancelImportModal.addEventListener('click', closeImportModal);

  if (importModal) {
    importModal.addEventListener('click', (e) => {
      if (e.target === importModal) closeImportModal();
    });
  }

  // Quick Import Dropzone & File Input in Tab 1
  const quickDropzone = document.getElementById('quickImportDropzone');
  const quickFileInput = document.getElementById('quickImportFileInput');
  if (quickDropzone && quickFileInput) {
    quickDropzone.addEventListener('click', () => quickFileInput.click());
    quickFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleQuickImportFiles(e.target.files);
      }
    });

    quickDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      quickDropzone.classList.add('dragover');
    });
    quickDropzone.addEventListener('dragleave', () => {
      quickDropzone.classList.remove('dragover');
    });
    quickDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      quickDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleQuickImportFiles(e.dataTransfer.files);
      }
    });
  }

  // Quick Apply Buttons in Tab 1
  document.querySelectorAll('.btn-tpl-apply').forEach(btn => {
    btn.addEventListener('click', () => {
      const tplKey = btn.dataset.apply;
      applyImportedPhotosToTemplate(tplKey, quickImportedImages);
    });
  });

  const btnClearQuick = document.getElementById('btnClearQuickPhotos');
  if (btnClearQuick) {
    btnClearQuick.addEventListener('click', () => {
      quickImportedImages = [];
      const panel = document.getElementById('quickApplyPanel');
      if (panel) panel.style.display = 'none';
      const thumbsRow = document.getElementById('quickThumbsRow');
      if (thumbsRow) thumbsRow.innerHTML = '';
      if (quickFileInput) quickFileInput.value = '';
      showToast('Daftar foto yang di-import telah dibersihkan.');
    });
  }

  // Modal Dropzone & File Input
  const modalDropzone = document.getElementById('modalDropzone');
  const modalFileInput = document.getElementById('modalFileInput');
  if (modalDropzone && modalFileInput) {
    modalDropzone.addEventListener('click', () => modalFileInput.click());
    modalFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleModalImportFiles(e.target.files);
      }
    });

    modalDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      modalDropzone.classList.add('dragover');
    });
    modalDropzone.addEventListener('dragleave', () => {
      modalDropzone.classList.remove('dragover');
    });
    modalDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      modalDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleModalImportFiles(e.dataTransfer.files);
      }
    });
  }

  // Modal Template Selection Cards
  document.querySelectorAll('.modal-tpl-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.modal-tpl-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Modal Apply Button
  const btnApplyImportModal = document.getElementById('btnApplyImportModal');
  if (btnApplyImportModal) {
    btnApplyImportModal.addEventListener('click', () => {
      const activeCard = document.querySelector('.modal-tpl-card.active');
      const chosenTpl = activeCard ? activeCard.dataset.tpl : state.template;
      applyImportedPhotosToTemplate(chosenTpl, modalImportedImages);
      closeImportModal();
    });
  }

  // Direct Canvas Drag & Drop
  const canvasViewport = document.getElementById('canvasViewport');
  if (canvasViewport) {
    canvasViewport.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    canvasViewport.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            state.frames[state.activeFrameIndex].img = img;
            render();
            showToast(`Foto berhasil di-import ke canvas (Slot Frame ${state.activeFrameIndex + 1}).`);
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// ==========================================
// IMPORT PHOTO & TEMPLATE APPLICATION LOGIC
// ==========================================
let quickImportedImages = [];
let modalImportedImages = [];

function openImportModal() {
  const modal = document.getElementById('importModal');
  if (modal) {
    modal.classList.add('active');
    document.querySelectorAll('.modal-tpl-card').forEach(card => {
      const isCurrent = (card.dataset.tpl === state.template);
      card.classList.toggle('active', isCurrent);
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = isCurrent;
    });
  }
}

function closeImportModal() {
  const modal = document.getElementById('importModal');
  if (modal) modal.classList.remove('active');
}

function handleQuickImportFiles(fileList) {
  if (!fileList || fileList.length === 0) return;
  const files = Array.from(fileList).slice(0, 3);
  quickImportedImages = [];

  const thumbsRow = document.getElementById('quickThumbsRow');
  if (thumbsRow) thumbsRow.innerHTML = '';

  let loadedCount = 0;
  files.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        quickImportedImages.push(img);
        loadedCount++;

        if (thumbsRow) {
          const item = document.createElement('div');
          item.className = 'quick-thumb-item';
          item.innerHTML = `<img src="${e.target.result}" alt="Foto ${idx + 1}"><span class="modal-thumb-badge">F${idx + 1}</span>`;
          thumbsRow.appendChild(item);
        }

        if (loadedCount === files.length) {
          const panel = document.getElementById('quickApplyPanel');
          const countLabel = document.getElementById('quickUploadedCount');
          if (panel) panel.style.display = 'block';
          if (countLabel) countLabel.textContent = `${files.length} Foto Siap Diterapkan:`;
          showToast(`${files.length} foto berhasil di-import. Silakan pilih template di bawah!`);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function handleModalImportFiles(fileList) {
  if (!fileList || fileList.length === 0) return;
  const files = Array.from(fileList).slice(0, 3);
  modalImportedImages = [];

  const thumbsGrid = document.getElementById('modalThumbsGrid');
  if (thumbsGrid) {
    thumbsGrid.innerHTML = '';
    thumbsGrid.style.display = 'grid';
  }

  let loadedCount = 0;
  files.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        modalImportedImages.push(img);
        loadedCount++;

        if (thumbsGrid) {
          const item = document.createElement('div');
          item.className = 'modal-thumb-item';
          item.innerHTML = `<img src="${e.target.result}" alt="Foto ${idx + 1}"><span class="modal-thumb-badge">Foto ${idx + 1}</span>`;
          thumbsGrid.appendChild(item);
        }

        if (loadedCount === files.length) {
          showToast(`${files.length} foto siap diterapkan.`);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function applyImportedPhotosToTemplate(tplKey, images) {
  if (images && images.length > 0) {
    if (images.length === 1) {
      if (tplKey === 'tpl1_berita') {
        state.frames[0].img = images[0];
        state.activeFrameIndex = 0;
      } else if (tplKey === 'tpl2_dokumentasi') {
        state.frames[1].img = images[0];
        state.activeFrameIndex = 1;
      } else if (tplKey === 'tpl3_slogan') {
        state.frames[2].img = images[0];
        state.activeFrameIndex = 2;
      } else if (tplKey === 'tpl12_kolase3') {
        state.frames[0].img = images[0];
        state.activeFrameIndex = 0;
      }
    } else {
      images.forEach((img, idx) => {
        if (state.frames[idx]) {
          state.frames[idx].img = img;
        }
      });
      state.activeFrameIndex = 0;
    }
  }

  state.template = tplKey;
  if (tplKey === 'tpl1_berita') {
    state.title.enabled = true;
    state.date.enabled = true;
    state.badge.enabled = true;
    state.branding.watermarkEnabled = true;
  } else if (tplKey === 'tpl2_dokumentasi') {
    state.title.enabled = false;
    state.date.enabled = false;
    state.badge.enabled = false;
    state.branding.watermarkEnabled = true;
  } else if (tplKey === 'tpl3_slogan') {
    state.title.enabled = true;
    state.title.font = 'asset_png';
    state.date.enabled = false;
    state.badge.enabled = false;
    state.branding.watermarkEnabled = false;
  } else if (tplKey === 'tpl12_kolase3') {
    state.title.enabled = true;
    state.date.enabled = true;
    state.badge.enabled = true;
    state.branding.watermarkEnabled = false;
  }

  syncUIFromState();
  render();

  const tplNames = {
    tpl1_berita: 'Template 1: Sinergi & Berita',
    tpl2_dokumentasi: 'Template 2: Dokumentasi Bersih',
    tpl3_slogan: 'Template 3: Dari Piring Sehat (PNG Resmi)',
    tpl12_kolase3: 'Template 4: Kolase 3 Frame'
  };
  showToast(`${tplNames[tplKey] || 'Template'} berhasil diterapkan!`);
}

// APPLY PRESET
function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  document.querySelectorAll('.chip-btn').forEach(btn => btn.classList.remove('active'));
  const btnMap = {
    sinergi: 'presetSinergi',
    dokumentasi: 'presetDokumentasi',
    piringSehat: 'presetPiringSehat',
    kolaseLele: 'presetKolaseLele',
    reses: 'presetReses',
    masker: 'presetMasker',
    akreditasi: 'presetAkreditasi'
  };
  const activeBtn = document.getElementById(btnMap[key]);
  if (activeBtn) activeBtn.classList.add('active');

  // Set values
  state.template = p.template;
  state.badge.text = p.badgeText;
  state.badge.color = p.badgeColor;
  state.date.day = p.day;
  state.date.month = p.month;
  state.date.year = p.year;
  state.date.location = p.location;
  state.date.bgColor = p.dateBgColor || 'silver';
  state.title.text = p.titleText;
  state.title.font = p.font;
  state.title.size = p.titleSize || 38;
  state.title.subtitleEnabled = p.subtitleEnabled || false;
  state.title.subtitleText = p.subtitleText || '';
  state.activeFrameIndex = p.photoIndex !== undefined ? p.photoIndex : 0;
  state.title.enabled = p.titleEnabled !== undefined ? p.titleEnabled : true;
  state.date.enabled = p.dateEnabled !== undefined ? p.dateEnabled : true;
  state.badge.enabled = p.badgeEnabled !== undefined ? p.badgeEnabled : true;
  state.branding.watermarkEnabled = p.watermarkEnabled !== undefined ? p.watermarkEnabled : true;

  syncUIFromState();
  render();
  showToast(`Preset "${p.badgeText || 'Template'}" aktif.`);
}

// SYNC ALL UI ELEMENTS FROM STATE
function syncUIFromState() {
  // Sync Template Card
  document.querySelectorAll('.tpl-card').forEach(c => {
    c.classList.toggle('active', c.dataset.tpl === state.template);
  });

  // Sync Frame Tabs
  document.querySelectorAll('.frame-tab').forEach(t => {
    t.classList.toggle('active', parseInt(t.dataset.frame, 10) === state.activeFrameIndex);
  });

  // Sync Inputs
  const elBadgeText = document.getElementById('badgeText');
  if (elBadgeText) elBadgeText.value = state.badge.text;
  const elBadgeCustomColor = document.getElementById('badgeCustomColor');
  if (elBadgeCustomColor) elBadgeCustomColor.value = state.badge.color;
  const elToggleBadge = document.getElementById('toggleBadge');
  if (elToggleBadge) elToggleBadge.checked = state.badge.enabled;

  const elToggleDate = document.getElementById('toggleDate');
  if (elToggleDate) elToggleDate.checked = state.date.enabled;
  const elDateDay = document.getElementById('dateDay');
  if (elDateDay) elDateDay.value = state.date.day;
  const elDateMonth = document.getElementById('dateMonth');
  if (elDateMonth) elDateMonth.value = state.date.month;
  const elDateYear = document.getElementById('dateYear');
  if (elDateYear) elDateYear.value = state.date.year;
  const elDateLocation = document.getElementById('dateLocation');
  if (elDateLocation) elDateLocation.value = state.date.location;

  // Sync Date Background Color Palette
  const curDateBg = state.date.bgColor || 'silver';
  document.querySelectorAll('#dateColorPalette .color-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === curDateBg);
  });
  const dateCustInp = document.getElementById('dateCustomColor');
  if (dateCustInp && curDateBg !== 'silver') {
    dateCustInp.value = curDateBg;
  }

  const elToggleTitle = document.getElementById('toggleTitle');
  if (elToggleTitle) elToggleTitle.checked = state.title.enabled;
  const elTitleText = document.getElementById('titleText');
  if (elTitleText) elTitleText.value = state.title.text;
  const elTitleSize = document.getElementById('titleSize');
  if (elTitleSize) elTitleSize.value = state.title.size;
  const elTitleSizeVal = document.getElementById('titleSizeVal');
  if (elTitleSizeVal) elTitleSizeVal.textContent = state.title.size + 'px';

  const toggleSubtitle = document.getElementById('toggleSubtitle');
  const subtitleText = document.getElementById('subtitleText');
  if (toggleSubtitle) toggleSubtitle.checked = state.title.subtitleEnabled;
  if (subtitleText) subtitleText.value = state.title.subtitleText;

  const toggleWatermark = document.getElementById('toggleWatermark');
  if (toggleWatermark) toggleWatermark.checked = state.branding.watermarkEnabled;
  const watermarkOpacity = document.getElementById('watermarkOpacity');
  const watermarkOpacityVal = document.getElementById('watermarkOpacityVal');
  if (watermarkOpacity) watermarkOpacity.value = Math.round(state.branding.watermarkOpacity * 100);
  if (watermarkOpacityVal) watermarkOpacityVal.textContent = Math.round(state.branding.watermarkOpacity * 100) + '%';

  // Sync font radio
  document.querySelectorAll('input[name="fontFamily"]').forEach(r => {
    const match = (r.value === state.title.font);
    r.checked = match;
    const card = r.closest('.radio-card');
    if (card) card.classList.toggle('active', match);
  });

  updateFrameUIValues();
}

// ASPECT RATIO
function setAspectRatio(ratio) {
  state.aspectRatio = ratio;
  if (ratio === '4:5') {
    state.canvasW = 1080;
    state.canvasH = 1350;
    document.getElementById('btnRatio45').classList.add('active');
    document.getElementById('btnRatio11').classList.remove('active');
    document.getElementById('canvasDimLabel').textContent = '1080 × 1350 px (Instagram 4:5)';
  } else {
    state.canvasW = 1080;
    state.canvasH = 1080;
    document.getElementById('btnRatio11').classList.add('active');
    document.getElementById('btnRatio45').classList.remove('active');
    document.getElementById('canvasDimLabel').textContent = '1080 × 1080 px (Instagram 1:1)';
  }

  canvas.width = state.canvasW;
  canvas.height = state.canvasH;
  fitCanvasToScreen();
  render();
}

// HANDLE IMAGE UPLOAD
function handleImageUpload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      state.frames[state.activeFrameIndex].img = img;
      render();
      showToast(`Foto frame ${state.activeFrameIndex + 1} berhasil diperbarui.`);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// UPDATE FRAME CONTROLS UI
function updateFrameUIValues() {
  const fr = state.frames[state.activeFrameIndex];
  document.getElementById('frameZoom').value = Math.round(fr.zoom * 100);
  document.getElementById('frameZoomVal').textContent = Math.round(fr.zoom * 100) + '%';
  document.getElementById('framePanX').value = fr.panX;
  document.getElementById('framePanY').value = fr.panY;
  document.getElementById('frameBrightness').value = fr.brightness;
  document.getElementById('frameBrightnessVal').textContent = fr.brightness + '%';
  document.getElementById('frameContrast').value = fr.contrast;
  document.getElementById('frameContrastVal').textContent = fr.contrast + '%';
}

// FIT CANVAS TO WORKBENCH SCREEN
function fitCanvasToScreen() {
  const viewport = document.querySelector('.canvas-viewport');
  if (!viewport) return;

  const vpW = viewport.clientWidth - 48;
  const vpH = viewport.clientHeight - 48;

  const scaleW = vpW / state.canvasW;
  const scaleH = vpH / state.canvasH;
  state.zoomScale = Math.max(0.25, Math.min(scaleW, scaleH, 0.90));

  applyZoom();
  const btnFit = document.getElementById('btnZoomFit');
  if (btnFit) btnFit.classList.add('active');
}

function setZoom(val) {
  state.zoomScale = Math.max(0.20, Math.min(val, 1.80));
  applyZoom();
}

function applyZoom() {
  if (canvasWrapper) {
    canvasWrapper.style.transform = `scale(${state.zoomScale})`;
  }
  const pct = Math.round(state.zoomScale * 100);
  const display = document.getElementById('zoomLevelDisplay');
  if (display) display.textContent = pct + '%';
  const slider = document.getElementById('zoomSlider');
  if (slider) slider.value = pct;

  // Toggle active class on preset buttons
  const btnZoom50 = document.getElementById('btnZoom50');
  const btnZoom75 = document.getElementById('btnZoom75');
  const btnZoom100 = document.getElementById('btnZoom100');
  const btnFit = document.getElementById('btnZoomFit');
  if (btnZoom50) btnZoom50.classList.toggle('active', pct === 50);
  if (btnZoom75) btnZoom75.classList.toggle('active', pct === 75);
  if (btnZoom100) btnZoom100.classList.toggle('active', pct === 100);
  if (btnFit && (pct === 50 || pct === 75 || pct === 100)) {
    btnFit.classList.remove('active');
  }
}

// ==========================================
// HD ZOOM PREVIEW MODAL LOGIC
// ==========================================
let modalPreviewScale = 1.0;

function openPreviewModal() {
  const modal = document.getElementById('previewModal');
  const img = document.getElementById('previewModalImg');
  const subtitle = document.getElementById('previewModalSubtitle');
  if (!modal || !img) return;

  // Render high-res crisp snapshot
  const dataUrl = canvas.toDataURL('image/png');
  img.src = dataUrl;

  if (subtitle) {
    subtitle.innerHTML = `Resolusi Asli: <strong>${state.canvasW} &times; ${state.canvasH} px</strong> &bull; Template: ${state.template}`;
  }

  // Calculate fit scale for modal viewport
  const dialogBody = modal.querySelector('.modal-body');
  if (dialogBody) {
    const availW = dialogBody.clientWidth - 80;
    const availH = dialogBody.clientHeight - 80;
    if (availW > 0 && availH > 0) {
      modalPreviewScale = Math.min(availW / state.canvasW, availH / state.canvasH, 0.75);
    } else {
      modalPreviewScale = 0.55;
    }
  } else {
    modalPreviewScale = 0.55;
  }

  applyModalPreviewZoom();
  modal.classList.add('active');
}

function closePreviewModal() {
  const modal = document.getElementById('previewModal');
  if (modal) modal.classList.remove('active');
}

function setModalPreviewZoom(val) {
  modalPreviewScale = Math.max(0.20, Math.min(val, 2.5));
  applyModalPreviewZoom();
}

function applyModalPreviewZoom() {
  const img = document.getElementById('previewModalImg');
  const valDisplay = document.getElementById('modalZoomVal');
  if (img) {
    img.style.transform = `scale(${modalPreviewScale})`;
  }
  if (valDisplay) {
    valDisplay.textContent = Math.round(modalPreviewScale * 100) + '%';
  }
}

// ==========================================
// MASTER CANVAS RENDERING ENGINE
// ==========================================
function render() {
  const w = state.canvasW;
  const h = state.canvasH;

  // Clear Canvas with Deep Navy Slate Base
  ctx.save();
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0c121e');
  bgGrad.addColorStop(0.5, '#080c14');
  bgGrad.addColorStop(1, '#05070c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // Render according to selected template
  switch (state.template) {
    case 'tpl1_berita':
      renderTemplateSinergiBerita(w, h);
      break;
    case 'tpl2_dokumentasi':
      renderTemplateDokumentasi(w, h);
      break;
    case 'tpl3_slogan':
      renderTemplateSlogan(w, h);
      break;
    case 'tpl12_kolase3':
      renderTemplateKolase3(w, h);
      break;
    default:
      renderTemplateSinergiBerita(w, h);
  }
}

// ==========================================
// TEMPLATE 1: SINERGI & BERITA (COVER FEED)
// ==========================================
function renderTemplateSinergiBerita(w, h) {
  // 1. Full-bleed background photo (Frame 0)
  drawFullBleedPhoto(state.frames[0], w, h);

  // 2. Authentic PSD Design Overlay (Layer 1 + Brush aja + Layer 2)
  if (state.branding.brushEnabled) {
    const overlay = (state.aspectRatio === '1:1') ? state.assets.designOverlaySquare : state.assets.designOverlay;
    if (overlay) {
      ctx.save();
      ctx.globalAlpha = state.branding.brushOpacity || 1.0;
      ctx.drawImage(overlay, 0, 0, w, h);
      ctx.restore();
    } else {
      ctx.save();
      const gradY = (state.aspectRatio === '1:1') ? h * 0.42 : h * 0.48;
      const grad = ctx.createLinearGradient(0, gradY, 0, h);
      grad.addColorStop(0, 'rgba(8, 14, 25, 0)');
      grad.addColorStop(0.32, 'rgba(8, 14, 25, 0.55)');
      grad.addColorStop(0.68, 'rgba(6, 10, 19, 0.90)');
      grad.addColorStop(1, 'rgba(4, 7, 14, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, gradY, w, h - gradY);
      ctx.restore();
    }
  }

  // 3. Authentic Ethnic Papua Motif Border
  if (state.branding.motifEnabled) {
    renderPapuaMotif(w, h);
  }

  // 4. Authentic Large Metallic Gray Logo Watermark (Logo_Amungsa Asliiii Abu)
  if (state.branding.watermarkEnabled) {
    renderWatermarkLogo(w, h, state.branding.watermarkOpacity);
  }

  // 5. Top Header Logo (Glow Halo at top center)
  if (state.branding.logoEnabled) {
    renderHeaderLogo(w, h);
  }

  // 6. Left Info Block (Badge, Headline, Calendar Box)
  renderSinergiContent(w, h);

  // 7. Social Media & Web Footer
  if (state.branding.socialEnabled) {
    renderSocialFooter(w, h);
  }
}

// RENDER LEFT INFO BLOCK FOR TEMPLATE 1
function renderSinergiContent(w, h) {
  ctx.save();

  const isSquare = (state.aspectRatio === '1:1');
  const leftX = 55;
  let curY = isSquare ? Math.round(h * 0.53) : Math.round(h * 0.60);

  // 1. Badge Pill ("SINERGI AMUNGSA" / "RESPON AMUNGSA" etc.) - Font Resmi OCRAExtended
  if (state.badge.enabled && state.badge.text) {
    ctx.font = 'bold 24px "OCRAExtended", "OCR A Extended", monospace';
    const badgeText = state.badge.text.toUpperCase();
    const textW = ctx.measureText(badgeText).width;
    const padX = 22;
    const pillH = 50;
    const pillW = textW + padX * 2;

    // Drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;

    // Pill Background (Deep Navy Blue Sinergi Resmi)
    ctx.fillStyle = state.badge.color || '#0f3b6c';
    drawRoundedRectPath(ctx, leftX, curY, pillW, pillH, 8);
    ctx.fill();

    // Subtle Outline
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.stroke();

    // Text in Authentic OCRAExtended
    ctx.fillStyle = state.badge.textColor || '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '1.5px';
    ctx.fillText(badgeText, leftX + padX, curY + pillH / 2 + 1);

    curY += pillH + 20;
  }

  // 2. Bold Headline Text ("Memperkuat Ikatan dengan PUSKESMAS...")
  if (state.title.enabled && state.title.text) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = state.title.color || '#ffffff';
    ctx.textAlign = 'left';

    const fontSize = isSquare ? Math.min(34, state.title.size) : state.title.size;
    ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", Arial, sans-serif`;

    const lines = state.title.text.split('\n');
    const lineSpacing = fontSize * 1.26;

    lines.forEach((line) => {
      ctx.fillText(line, leftX, curY + fontSize * 0.88);
      curY += lineSpacing;
    });

    curY += 16;
  }

  // 3. Calendar Date Box ("13 / JUNI / 2026")
  if (state.date.enabled) {
    renderCalendarDateBox(ctx, leftX, curY);
  }

  ctx.restore();
}

// RENDER SIGNATURE CALENDAR DATE BOX (TEMPLATE 1 - Sesuai .PSD Asli)
function renderCalendarDateBox(c, boxX, boxY) {
  const d = state.date;
  c.save();

  if (d.style === 'pill') {
    const pillText = `${d.day} ${(d.month || '').toUpperCase()} ${d.year}`;
    c.font = '800 15px "Poppins", "Plus Jakarta Sans", Arial, sans-serif';
    const textW = c.measureText(pillText).width;
    const pillW = textW + 28;
    const pillH = 34;

    c.shadowColor = 'rgba(0, 0, 0, 0.65)';
    c.shadowBlur = 12;
    c.shadowOffsetY = 4;

    // Background: Silver Metalik Resmi
    if (!d.bgColor || d.bgColor === 'silver') {
      const sGrad = c.createLinearGradient(boxX, boxY, boxX, boxY + pillH);
      sGrad.addColorStop(0, '#caced4');
      sGrad.addColorStop(0.5, '#b4b9c1');
      sGrad.addColorStop(1, '#949ba6');
      c.fillStyle = sGrad;
    } else {
      c.fillStyle = d.bgColor;
    }
    drawRoundedRectPath(c, boxX, boxY, pillW, pillH, 8);
    c.fill();

    c.shadowColor = 'transparent';
    c.lineWidth = 1.8;
    c.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    drawRoundedRectPath(c, boxX, boxY, pillW, pillH, 8);
    c.stroke();

    c.shadowColor = 'rgba(0, 0, 0, 0.5)';
    c.shadowBlur = 3;
    c.shadowOffsetY = 1;
    c.fillStyle = '#ffffff';
    c.textAlign = 'center';
    c.fillText(pillText, boxX + pillW / 2, boxY + 22);

    c.restore();
    return;
  }

  const boxW = 82;
  const boxH = 117;
  const radius = 12;

  // Shadow
  c.shadowColor = 'rgba(0, 0, 0, 0.65)';
  c.shadowBlur = 14;
  c.shadowOffsetY = 5;

  // Background: Silver Metalik Resmi Amungsa
  if (!d.bgColor || d.bgColor === 'silver') {
    const silverGrad = c.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
    silverGrad.addColorStop(0, '#caced4');    // Polished bright silver
    silverGrad.addColorStop(0.35, '#b4b9c1');  // Classic metallic silver
    silverGrad.addColorStop(0.75, '#a1a7b1');  // Smooth silver shade
    silverGrad.addColorStop(1, '#949ba6');    // Silver edge
    c.fillStyle = silverGrad;
  } else {
    c.fillStyle = d.bgColor;
  }
  drawRoundedRectPath(c, boxX, boxY, boxW, boxH, radius);
  c.fill();

  // Crisp Bright Silver / White Border (5px stroke matching PSD Rectangle 1 copy 2)
  c.shadowColor = 'transparent';
  c.lineWidth = 2.4;
  c.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  drawRoundedRectPath(c, boxX, boxY, boxW, boxH, radius);
  c.stroke();

  // Subtle inner highlight
  c.lineWidth = 1;
  c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  drawRoundedRectPath(c, boxX + 1.5, boxY + 1.5, boxW - 3, boxH - 3, radius - 1);
  c.stroke();

  // Text Shadow so white text on silver pops with high readability
  c.shadowColor = 'rgba(0, 0, 0, 0.45)';
  c.shadowBlur = 4;
  c.shadowOffsetY = 1;

  // Day Number (Poppins-Black 36 in PSD)
  c.fillStyle = '#ffffff';
  c.font = '900 36px "Poppins", "Plus Jakarta Sans", Arial, sans-serif';
  c.textAlign = 'center';
  c.fillText(d.day, boxX + boxW / 2, boxY + 44);

  // Month (Poppins-ExtraBold 14 in PSD)
  c.fillStyle = '#ffffff';
  c.font = '800 14px "Poppins", "Plus Jakarta Sans", Arial, sans-serif';
  c.letterSpacing = '1.2px';
  c.fillText((d.month || '').toUpperCase(), boxX + boxW / 2, boxY + 75);

  // Year (Poppins-Medium 13 in PSD)
  c.fillStyle = 'rgba(255, 255, 255, 0.95)';
  c.font = '700 13px "Poppins", "Plus Jakarta Sans", Arial, sans-serif';
  c.letterSpacing = '0.5px';
  c.fillText(d.year, boxX + boxW / 2, boxY + 102);

  c.restore();
}

// ==========================================
// TEMPLATE 2: DOKUMENTASI BERSIH (SHOWCASE)
// Sesuai Template Asli PSD: Tanpa teks judul, fokus foto & watermark
// ==========================================
function renderTemplateDokumentasi(w, h) {
  // 1. Full-bleed background photo (Frame 1)
  drawFullBleedPhoto(state.frames[state.activeFrameIndex === 0 ? 1 : state.activeFrameIndex], w, h);

  // 2. Subtle bottom gradient overlay (lower 32% for maximum photo clarity)
  ctx.save();
  const gradY = (state.aspectRatio === '1:1') ? h * 0.60 : h * 0.68;
  const grad = ctx.createLinearGradient(0, gradY, 0, h);
  grad.addColorStop(0, 'rgba(8, 14, 25, 0)');
  grad.addColorStop(0.4, 'rgba(7, 12, 22, 0.65)');
  grad.addColorStop(1, 'rgba(5, 8, 15, 0.95)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, gradY, w, h - gradY);
  ctx.restore();

  // 3. Ethnic Papua Motif Border
  if (state.branding.motifEnabled) {
    renderPapuaMotif(w, h, 0.75);
  }

  // 4. Large Translucent Logo Watermark (Bottom Right)
  if (state.branding.watermarkEnabled) {
    renderWatermarkLogo(w, h, state.branding.watermarkOpacity);
  }

  // 5. Top Header Logo (Glow Halo at top center)
  if (state.branding.logoEnabled) {
    renderHeaderLogo(w, h);
  }

  // 6. Social Media Footer
  if (state.branding.socialEnabled) {
    renderSocialFooter(w, h);
  }
}

// ==========================================
// TEMPLATE 3: SLOGAN & PENUTUP ("DARI PIRING SEHAT...")
// Sesuai Template Asli PSD: Slogan Resmi PNG Tetap
// ==========================================
function renderTemplateSlogan(w, h) {
  // 1. Full-bleed background photo (Frame 2)
  drawFullBleedPhoto(state.frames[state.activeFrameIndex === 0 ? 2 : state.activeFrameIndex], w, h);

  // 2. Authentic PSD Design Overlay (Layer 1 + Brush aja + Layer 2)
  if (state.branding.brushEnabled) {
    const overlay = (state.aspectRatio === '1:1') ? state.assets.designOverlaySquare : state.assets.designOverlay;
    if (overlay) {
      ctx.save();
      ctx.globalAlpha = state.branding.brushOpacity || 1.0;
      ctx.drawImage(overlay, 0, 0, w, h);
      ctx.restore();
    } else {
      ctx.save();
      const gradY = (state.aspectRatio === '1:1') ? h * 0.55 : h * 0.62;
      const grad = ctx.createLinearGradient(0, gradY, 0, h);
      grad.addColorStop(0, 'rgba(8, 14, 25, 0)');
      grad.addColorStop(0.35, 'rgba(7, 12, 22, 0.65)');
      grad.addColorStop(0.85, 'rgba(5, 8, 15, 0.92)');
      grad.addColorStop(1, 'rgba(4, 7, 14, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, gradY, w, h - gradY);
      ctx.restore();
    }
  }

  // 3. Ethnic Papua Motif Border
  if (state.branding.motifEnabled) {
    renderPapuaMotif(w, h, 0.75);
  }

  // 4. Top Header Logo (Glow Halo at top center)
  if (state.branding.logoEnabled) {
    renderHeaderLogo(w, h);
  }

  // 5. Signature Cursive Slogan ("Dari Piring Sehat, Lahir Masa Depan Hebat") - Tetap Sesuai Desain Resmi
  renderSignatureSlogan(w, h);

  // 6. Social Media Footer
  if (state.branding.socialEnabled) {
    renderSocialFooter(w, h);
  }
}

// RENDER SIGNATURE SLOGAN FOR TEMPLATE 3 (Sesuai .PSD Asli)
function renderSignatureSlogan(w, h) {
  ctx.save();
  const isSquare = (state.aspectRatio === '1:1');
  const sImg = state.assets.sloganDefault;

  if (sImg) {
    // Exact PSD dimensions and placement (bbox: 229, 1003, 873, 1082) -> 644x79
    const sW = Math.min(644, w * 0.85);
    const scale = sW / sImg.width;
    const sH = sImg.height * scale;
    const sX = (w - sW) / 2;
    const sY = isSquare ? (h * 0.76) : 1003;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;
    ctx.drawImage(sImg, sX, sY, sW, sH);
  }

  ctx.restore();
}

// ==========================================
// TEMPLATE 4: 3-FRAME STAGGERED COLLAGE (Sesuai Lele.psd)
// Sesuai Template Asli PSD: 3 Frame Melayang + Slogan Resmi PNG
// ==========================================
function renderTemplateKolase3(w, h) {
  const fw = 376;
  const fh = 564;
  const radius = 28;
  const border = 8;
  const yShift = (state.aspectRatio === '1:1') ? -60 : 0;

  // Background: Deep Slate Blue Gradient with subtle ambient blur
  ctx.save();
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0a101d');
  bgGrad.addColorStop(0.5, '#070c16');
  bgGrad.addColorStop(1, '#04070d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // Frame 0: Left (Layer image 02 in Lele.psd: x=51, y=179)
  const x0 = 51;
  const y0 = 179 + yShift;
  drawRoundedFrame(state.frames[0], x0, y0, fw, fh, radius, border, 16);

  // Frame 2: Right (Layer image 03 in Lele.psd: x=661, y=272)
  const x2 = 661;
  const y2 = 272 + yShift;
  drawRoundedFrame(state.frames[2], x2, y2, fw, fh, radius, border, 16);

  // Frame 1: Center (Layer image 01 in Lele.psd: x=353, y=393 - foreground, overlaps)
  const x1 = 353;
  const y1 = 393 + yShift;
  drawRoundedFrame(state.frames[1], x1, y1, fw, fh + 1, radius, border, 24);

  // Authentic PSD Design Overlay at bottom
  if (state.branding.brushEnabled) {
    const overlay = (state.aspectRatio === '1:1') ? state.assets.designOverlaySquare : state.assets.designOverlay;
    if (overlay) {
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.drawImage(overlay, 0, 0, w, h);
      ctx.restore();
    }
  }

  // Motif
  if (state.branding.motifEnabled) {
    renderPapuaMotif(w, h, 0.7);
  }

  // Header Logo
  if (state.branding.logoEnabled) {
    renderHeaderLogo(w, h);
  }

  // Bottom Content: Selalu Slogan Resmi PNG sesuai Lele.psd
  renderSignatureSlogan(w, h);

  // Social Footer
  if (state.branding.socialEnabled) {
    renderSocialFooter(w, h);
  }
}

// ------------------------------------------
// HELPER: DRAW FULL BLEED COVER PHOTO
// ------------------------------------------
function drawFullBleedPhoto(fr, w, h) {
  if (!fr || !fr.img) return;

  ctx.save();
  ctx.filter = `brightness(${fr.brightness}%) contrast(${fr.contrast}%)`;

  const img = fr.img;
  const zoom = fr.zoom || 1.0;
  const panX = fr.panX || 0;
  const panY = fr.panY || 0;

  // Cover calculation
  const scale = Math.max(w / img.width, h / img.height) * zoom;
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  const drawX = (w - drawW) / 2 + panX;
  const drawY = (h - drawH) / 2 + panY;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
  ctx.restore();
}

// ------------------------------------------
// HELPER: RENDER TOP HEADER LOGO (Amungsa Cares Papua)
// Proporsional 100% bulat sempurna tanpa distorsi (sesuai PSD)
// ------------------------------------------
function renderHeaderLogo(w, h) {
  const logo = state.assets.logo;
  if (!logo) return;

  const isKolase = (state.template === 'tpl12_kolase3');
  // Ukuran proporsional sesuai PSD: Lele kolase (145px) vs Sinergi/Berita (100px)
  const logoH = isKolase ? 145 : 100;
  const aspect = (logo.width && logo.height) ? (logo.width / logo.height) : (2412 / 3248);
  const logoW = Math.round(logoH * aspect);
  const logoX = Math.round((w - logoW) / 2);
  const logoY = isKolase ? 18 : 24;

  ctx.save();

  // 1. Blue Glowing Halo Behind Top Circular Emblem (matches official templates)
  if (state.branding.logoGlow) {
    const iconCenterX = logoX + Math.round(logoW / 2);
    // Emblim bulat berada di bagian atas dari logo (center Y di ~45% dari lebar logo)
    const iconCenterY = logoY + Math.round(logoW * 0.48);
    const glowRadius = Math.round(logoW * 0.72);

    const haloGrad = ctx.createRadialGradient(
      iconCenterX, iconCenterY, 6,
      iconCenterX, iconCenterY, glowRadius
    );
    haloGrad.addColorStop(0, 'rgba(56, 189, 248, 0.52)');
    haloGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.22)');
    haloGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(iconCenterX, iconCenterY, glowRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Optional White Card Background
  if (state.branding.logoCardBg) {
    const padX = 14;
    const padY = 8;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    drawRoundedRectPath(ctx, logoX - padX, logoY - padY, logoW + padX * 2, logoH + padY * 2, 14);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = '#d4af37';
    ctx.stroke();
  }

  // 3. Draw Logo Image (Preserving exact aspect ratio so emblem is perfectly round)
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;
  ctx.drawImage(logo, logoX, logoY, logoW, logoH);

  ctx.restore();
}

// ------------------------------------------
// HELPER: RENDER LOGO KANAN BAWAH (Emblem Biru Resmi Tanpa Teks)
// ------------------------------------------
function renderWatermarkLogo(w, h, opacity = 0.70) {
  const wm = state.assets.watermark || state.assets.logo;
  if (!wm) return;

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

  // Authentic Blue Emblem without text
  // Maintain natural proportional aspect ratio (no vertical distortion)
  const isSquare = (state.aspectRatio === '1:1');
  const wmW = 272;
  const natW = wm.naturalWidth || wm.width || 272;
  const natH = wm.naturalHeight || wm.height || 266;
  const wmH = Math.round(wmW * (natH / natW));
  const wmX = isSquare ? (w - wmW - 25) : 720;
  const wmY = isSquare ? (h - wmH - 25) : 929;

  ctx.drawImage(wm, wmX, wmY, wmW, wmH);
  ctx.restore();
}

// ------------------------------------------
// HELPER: RENDER PAPUA MOTIF BORDER
// ------------------------------------------
function renderPapuaMotif(w, h, opacity = 1.0) {
  const isSquare = (state.aspectRatio === '1:1');
  const motif = isSquare ? (state.assets.motifSquare || state.assets.motif) : state.assets.motif;
  if (!motif) return;

  ctx.save();
  ctx.globalAlpha = opacity;
  if (motif.width === w && motif.height === h) {
    ctx.drawImage(motif, 0, 0, w, h);
  } else {
    const mH = 145;
    ctx.drawImage(motif, 0, h - mH, w, mH);
  }
  ctx.restore();
}

// ------------------------------------------
// HELPER: RENDER SOCIAL FOOTER
// ------------------------------------------
function renderSocialFooter(w, h) {
  const s = state.branding;
  ctx.save();

  const isSquare = (state.aspectRatio === '1:1');
  const cImg = state.assets.contactWide || state.assets.contact;

  if (cImg && s.socialUsername === 'amungsafoundation') {
    const cW = cImg.width;
    const cH = cImg.height;
    const cX = (state.assets.contactWide && !isSquare) ? 61 : ((w - cW) / 2);
    const cY = isSquare ? (h - cH - 20) : 1260;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 8;
    ctx.drawImage(cImg, cX, cY, cW, cH);
  } else {
    const footerY = h - 68;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 8;

    ctx.font = '600 15px "Plus Jakarta Sans", monospace';
    ctx.letterSpacing = '1.8px';
    ctx.fillText(s.socialUsername, w / 2, footerY - 8);

    const iconY = footerY + 22;
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('TikTok  •  Instagram  •  Facebook', w / 2, iconY);
  }

  ctx.restore();
}

// ------------------------------------------
// COLLAGE HELPERS
// ------------------------------------------
function drawRoundedFrame(frameData, x, y, width, height, radius, border, shadowBlur = 18) {
  if (!frameData || !frameData.img) return;

  const img = frameData.img;
  const zoom = frameData.zoom || 1.0;
  const panX = frameData.panX || 0;
  const panY = frameData.panY || 0;

  ctx.save();

  // Drop Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
  ctx.shadowBlur = shadowBlur * 1.5;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, x, y, width, height, radius);
  ctx.fill();
  ctx.restore();

  // Clip Rounded Rectangle
  drawRoundedRectPath(ctx, x, y, width, height, radius);
  ctx.clip();

  // Draw Image Inside Frame
  ctx.filter = `brightness(${frameData.brightness}%) contrast(${frameData.contrast}%)`;
  const scale = Math.max(width / img.width, height / img.height) * zoom;
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  const drawX = x + (width - drawW) / 2 + panX;
  const drawY = y + (height - drawH) / 2 + panY;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  // White Border Overlay
  ctx.restore();
  ctx.save();
  ctx.lineWidth = border;
  ctx.strokeStyle = '#ffffff';
  drawRoundedRectPath(ctx, x + border / 2, y + border / 2, width - border, height - border, radius - 2);
  ctx.stroke();
  ctx.restore();
}

function renderDateCollage(w, h) {
  const d = state.date;
  ctx.save();

  const boxW = 86;
  const boxH = 118;
  const boxX = 55;
  const boxY = 40;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 5;

  // Background: Silver Metalik Resmi Amungsa
  if (!d.bgColor || d.bgColor === 'silver') {
    const silverGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
    silverGrad.addColorStop(0, '#caced4');
    silverGrad.addColorStop(0.35, '#b4b9c1');
    silverGrad.addColorStop(0.75, '#a1a7b1');
    silverGrad.addColorStop(1, '#949ba6');
    ctx.fillStyle = silverGrad;
  } else {
    ctx.fillStyle = d.bgColor;
  }
  drawRoundedRectPath(ctx, boxX, boxY, boxW, boxH, 14);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  drawRoundedRectPath(ctx, boxX, boxY, boxW, boxH, 14);
  ctx.stroke();

  // Subtle inner highlight
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  drawRoundedRectPath(ctx, boxX + 1.5, boxY + 1.5, boxW - 3, boxH - 3, 13);
  ctx.stroke();

  // Text Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 1;

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(d.day, boxX + boxW / 2, boxY + 42);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText((d.month || '').toUpperCase(), boxX + boxW / 2, boxY + 76);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(d.year, boxX + boxW / 2, boxY + 104);

  ctx.restore();
}

function renderTitleCollage(w, h) {
  const t = state.title;
  ctx.save();

  let titleY = h * 0.77;
  ctx.textAlign = 'center';
  ctx.fillStyle = t.color;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;

  if (t.font === 'asset_png' && state.assets.sloganDefault) {
    const sImg = state.assets.sloganDefault;
    const sW = sImg.width * 1.15;
    const sH = sImg.height * 1.15;
    const sX = (w - sW) / 2;
    ctx.drawImage(sImg, sX, titleY - 20, sW, sH);
  } else {
    let fontName = t.font;
    let isCursive = (fontName === 'Alex Brush' || fontName === 'Great Vibes');

    const lines = t.text.split('\n');
    if (isCursive) {
      ctx.font = `${t.size * 1.35}px "${fontName}", cursive`;
      const lineGap = t.size * 1.4;
      lines.forEach((line, idx) => {
        ctx.fillText(line, w / 2, titleY + idx * lineGap);
      });
      titleY += (lines.length - 1) * lineGap;
    } else {
      ctx.font = `800 ${t.size}px "Plus Jakarta Sans", sans-serif`;
      const lineGap = t.size * 1.35;
      lines.forEach((line, idx) => {
        ctx.fillText(line, w / 2, titleY + idx * lineGap);
      });
      titleY += (lines.length - 1) * lineGap;
    }
  }

  if (t.subtitleEnabled && t.subtitleText) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(t.subtitleText, w / 2, titleY + 54);
  }

  ctx.restore();
}

function renderBadgeCollage(w, h) {
  const b = state.badge;
  ctx.save();

  ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
  const textW = ctx.measureText(b.text).width;
  const padX = 22;
  const padY = 9;
  const pillW = textW + padX * 2;
  const pillH = 15 + padY * 2;
  const pillX = (w - pillW) / 2;
  const pillY = h * 0.87;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;

  ctx.fillStyle = b.color;
  drawRoundedRectPath(ctx, pillX, pillY, pillW, pillH, pillH / 2);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.stroke();

  ctx.fillStyle = b.textColor || '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(b.text, pillX + pillW / 2, pillY + 22);

  ctx.restore();
}

// ------------------------------------------
// UTILITY: ROUNDED RECTANGLE PATH
// ------------------------------------------
function drawRoundedRectPath(c, x, y, width, height, radius) {
  c.beginPath();
  c.moveTo(x + radius, y);
  c.lineTo(x + width - radius, y);
  c.quadraticCurveTo(x + width, y, x + width, y + radius);
  c.lineTo(x + width, y + height - radius);
  c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  c.lineTo(x + radius, y + height);
  c.quadraticCurveTo(x, y + height, x, y + height - radius);
  c.lineTo(x, y + radius);
  c.quadraticCurveTo(x, y, x + radius, y);
  c.closePath();
}

// ------------------------------------------
// EXPORT & DOWNLOAD (PNG, JPG, WEBP)
// ------------------------------------------
function getFormatDetails(fmt) {
  const f = (fmt || state.exportFormat || 'png').toLowerCase();
  if (f === 'jpg' || f === 'jpeg' || f === 'image/jpeg') {
    return { mime: 'image/jpeg', ext: 'jpg', label: 'JPG', fullName: 'Format JPG' };
  } else if (f === 'webp' || f === 'image/webp') {
    return { mime: 'image/webp', ext: 'webp', label: 'WebP', fullName: 'Format WebP' };
  }
  return { mime: 'image/png', ext: 'png', label: 'PNG', fullName: 'Format PNG (HD)' };
}

function setExportFormat(fmt) {
  const details = getFormatDetails(fmt);
  state.exportFormat = details.ext === 'jpg' ? 'jpeg' : details.ext;

  // Update navbar main download button text
  const downloadBtnText = document.getElementById('downloadBtnText');
  if (downloadBtnText) {
    downloadBtnText.textContent = `Unduh ${details.label}`;
  }

  // Update navbar dropdown active highlight
  document.querySelectorAll('.download-menu-item').forEach(item => {
    const itemFmt = item.getAttribute('data-format');
    const isMatch = (itemFmt === 'jpeg' && (details.ext === 'jpg' || details.ext === 'jpeg')) || itemFmt === details.ext;
    item.classList.toggle('active', isMatch);
  });

  // Update sidebar buttons
  document.querySelectorAll('.btn-fmt-choice').forEach(btn => {
    const btnFmt = btn.getAttribute('data-fmt');
    const isMatch = (btnFmt === 'jpeg' && (details.ext === 'jpg' || details.ext === 'jpeg')) || btnFmt === details.ext;
    btn.classList.toggle('active', isMatch);
  });

  const sideDownloadText = document.getElementById('sideDownloadText');
  if (sideDownloadText) {
    sideDownloadText.textContent = `Simpan Hasil Foto (${details.label})`;
  }
}

function downloadCurrent(customFormat = null) {
  const details = getFormatDetails(customFormat || state.exportFormat);
  const tplName = (state.template || 'post').replace('tpl', '').replace('_', '-');
  const filename = `amungsa_${tplName}_${Date.now()}.${details.ext}`;
  exportImage(details.mime, filename);
}

function exportImage(format = 'image/png', filename = 'amungsa_post.png') {
  render();

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(format, 0.95);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`✅ Berhasil mengunduh: ${filename}`);
}

async function copyCanvasToClipboard() {
  render();

  try {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        showToast('❌ Gagal menghasilkan blob gambar.');
        return;
      }
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      showToast('📋 Gambar berhasil disalin ke Clipboard! Siap dipaste.');
    }, 'image/png');
  } catch (err) {
    console.error('Clipboard copy error:', err);
    showToast('⚠️ Gagal menyalin ke clipboard. Gunakan tombol Download PNG.');
  }
}

// TOAST HELPER
function showToast(msg) {
  const toast = document.getElementById('toastMessage');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
