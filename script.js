// Tuna Güvenlik - Analiz ve Simülasyon Motoru

// Ses Sentezleyici (Web Audio API) - Herhangi bir harici dosyaya ihtiyaç duymaz
class CyberAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    beep(freq = 600, type = 'sine', duration = 0.04, gain = 0.05) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gainNode.gain.setValueAtTime(gain, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // sessiz hata kontrolü
        }
    }

    completeSound() {
        if (!this.enabled) return;
        const freqs = [440, 554, 659, 880];
        freqs.forEach((f, idx) => {
            setTimeout(() => this.beep(f, 'triangle', 0.12, 0.08), idx * 80);
        });
    }
}

const audio = new CyberAudio();

// Kod Havuzları (Terminalde akacak rastgele siber güvenlik satırları)
const CODE_SNIPPETS = {
    network: [
        () => `[NET-SCAN] Hedef IP: 192.168.1.${Math.floor(Math.random() * 254) + 1} üzerinde ARP ping gönderiliyor...`,
        () => `[SYN-FLOOD-TEST] Port ${[21, 22, 53, 80, 443, 8080, 3306, 27015][Math.floor(Math.random() * 8)]} soketi inceleniyor... [DURUM: ${(Math.random() > 0.3 ? 'KORUMALI' : 'AÇIK')}]`,
        () => `[FIREWALL] NAT tablosu denetleniyor: ESTABLISHED,RELATED bağlantılar doğrulandı.`,
        () => `[DNS-LEAK] 8.8.8.8 ve 1.1.1.1 üzerinden DNS sorgu sızıntı kontrolü: ${Math.floor(Math.random() * 18)}ms yanıt süresi.`,
        () => `[PACKET-CAPTURE] Promiscuous mod testi yürütülüyor: Sniffer enjeksiyonu engellendi.`,
        () => `[TLS/SSL] Sertifika zinciri doğrulanıyor: TLS 1.3 / ECDHE-RSA-AES256-GCM-SHA384 onaylandı.`,
        () => `[DDOS-DEFENSE] BGP Anycast rota sapmaları filtreleniyor... 0 paket kaybı.`
    ],
    game: [
        () => `[ANTI-CHEAT] Ring-0 çekirdek sürücüsü (Kernel Hook) imzaları taranıyor...`,
        () => `[MEM-INTEGRITY] Adres: 0x${Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()} -> ReadProcessMemory / VirtualProtect tespiti aktif.`,
        () => `[DLL-INJECTION] Yüklenen kütüphaneler taranıyor: d3d9.dll, dxgi.dll, user32.dll [BÜTÜNLÜK: DOĞRULANDI]`,
        () => `[MACRO-DETECTOR] Ham girdi (Raw Input) jitter analizi: Sapma toleransı < 0.003ms`,
        () => `[GAME-SECURITY] Hızlı bellek yaması (No-Recoil / Aimbot şablonu) hash taraması yapılıyor...`,
        () => `[ANTICHEAT-HEURISTIC] CS:GO / Valorant / Rust uyumlu alt-sistem bellek taraması: Temiz`,
        () => `[FPS-LATENCY] Tick-rate senkronizasyon kontrolü: Packet de-sync = 0.0%`
    ],
    app: [
        () => `[APP-SEC] SQL Enjeksiyon vektörleri deneniyor: ' OR '1'='1' -- [ENGELLENDİ]`,
        () => `[XSS-FILTER] DOM tabanlı zararlı script kalıpları sanitize ediliyor: <script>alert(1)</script> [TEMİZLENDİ]`,
        () => `[JWT-AUTH] Token şifrelemesi test ediliyor: HS256 yerine RS256 zorunluluğu geçerli.`,
        () => `[OBFUSCATION] Tersine mühendislik koruması: Kontrol akışı düzleştirme (Control Flow Flattening) %100`,
        () => `[ZERO-DAY-DB] CVE-2026-${Math.floor(Math.random() * 9000) + 1000} zafiyet veri tabanı eşleştiriliyor...`,
        () => `[API-GATEWAY] Rate limiting sınırlandırma testi: 1000 req/sec limit devrede.`,
        () => `[CRYPTO-HASH] SHA-512 sağlama: ${Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('')}... doğrulanıyor.`
    ],
    generic: [
        () => `[SYS] İntel Core Thread #0${Math.floor(Math.random()*8)} güvenlik yönergeleri (AES-NI / SGX) aktif.`,
        () => `[HEX-DUMP] 0x7FFF${Math.floor(Math.random()*0xFFFF).toString(16).toUpperCase()}: 48 89 5C 24 08 48 89 6C 24 10 48 89 74 24 18`,
        () => `[SOCKET] TCP Handshake kuruldu -> ACK gönderildi -> Paket onaylandı.`,
        () => `[ENTROPY] Bellek entropi katsayısı: ${(Math.random() * (7.9 - 6.5) + 6.5).toFixed(3)} bits/byte (Şifrelenmiş)`,
        () => `[REGISTRY] Windows Kayıt Defteri güvenlik anahtarları denetleniyor: Tam Koruma`
    ]
};

// Durum Seviyeleri ve Öneriler
const OUTCOMES = {
    excellent: {
        min: 88, max: 99,
        badge: 'GÜVENLİ & DAYANIKLI',
        title: 'Mükemmel Güvenlik Durumu',
        desc: 'Sistem ağ duvarı, oyun anti-cheat katmanı ve uygulama şifrelemesi en yüksek güvenlik standartlarını karşılıyor.',
        color: '#00ff88',
        class: 'safe',
        status: 'TAM KORUMALI',
        net: { fw: 'Aktif (Kalkan)', port: 'Korumalı / Gizli', dns: 'Sızıntı Yok', ddos: 'L7 Koruması Devrede' },
        game: { dll: 'Engellendi', ac: 'Ultra Seviye', macro: 'Tespit Edilemez', packet: 'Bütünlük Tam' },
        app: { encrypt: 'AES-GCM-256', injection: 'Tamamen Korumalı', reverse: 'Yüksek Direnç', auth: 'Çift Aşamalı / Token' },
        advice: {
            net: 'Ağınız dış sızmalara ve port taramalarına karşı tamamen izole durumda.',
            game: 'Bellek manipülasyonu ve hile yazılımlarına karşı tam dayanıklılık sağlandı.',
            app: 'Veriler güvenli şifreleme ile korunuyor, açık port veya arka kapı bulunamadı.'
        }
    },
    moderate: {
        min: 65, max: 87,
        badge: 'ORTA DÜZEY RİSK',
        title: 'Kısmi Güvenlik Önlemleri Aktif',
        desc: 'Genel güvenlik iyi durumda ancak bazı portlarda ve oyun bellek bölgelerinde küçük zafiyetler mevcut.',
        color: '#ffb703',
        class: 'warning',
        status: 'DİKKAT GEREKTİRİR',
        net: { fw: 'Aktif', port: '1 Port Açık (8080)', dns: 'Küçük Gecikme Var', ddos: 'Standart Filtre' },
        game: { dll: 'İzleniyor', ac: 'Standart Mod', macro: 'Düşük Frekans Şüphesi', packet: 'Doğrulandı' },
        app: { encrypt: 'AES-128-CBC', injection: 'Korumalı', reverse: 'Orta Seviye', auth: 'Standart Oturum' },
        advice: {
            net: 'Açık portlar kapatılmalı ve DNS sızıntı koruması yenilenmeli.',
            game: 'Arka planda çalışan şüpheli makro araçlarını devre dışı bırakın.',
            app: 'Şifreleme standartlarını AES-256 seviyesine yükseltmeniz önerilir.'
        }
    },
    critical: {
        min: 30, max: 64,
        badge: 'KRİTİK GÜVENLİK RİSKİ',
        title: 'Tehditler Algılandı',
        desc: 'Sistemde potansiyel güvenlik açıkları, zayıf şifrelenmiş paketler veya hile/enjeksiyon riskleri tespit edildi!',
        color: '#ff3366',
        class: 'danger',
        status: 'TEHLİKEDE',
        net: { fw: 'Devre Dışı / Kısmi', port: 'Birden Çok Açık Port', dns: 'Sızıntı Tespit Edildi!', ddos: 'Korumasız' },
        game: { dll: 'Enjeksiyon İmzası!', ac: 'Pasif / Eski Sürüm', macro: 'Makro Algılandı', packet: 'Paket Bozulması' },
        app: { encrypt: 'Zayıf (MD5/SHA1)', injection: 'Risk Mevcut', reverse: 'Açık Kaynak Görünür', auth: 'Süresi Dolmuş Yetki' },
        advice: {
            net: 'Güvenlik duvarını acilen devreye alın ve modem/ağ parolanızı güncelleyin!',
            game: 'Anti-cheat çekirdek sürücüsü güncellenmeli ve üçüncü parti modlar temizlenmeli.',
            app: 'Kritik SQL/XSS zafiyet yamalarını derhal sisteme uygulayın.'
        }
    }
};

// UI Elementleri
const startScanBtn = document.getElementById('startScanBtn');
const retestBtn = document.getElementById('retestBtn');
const clearLogsBtn = document.getElementById('clearLogsBtn');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const targetChips = document.querySelectorAll('.target-chip');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const currentPhaseText = document.getElementById('currentPhaseText');
const terminalBody = document.getElementById('terminalBody');
const lineCounter = document.getElementById('lineCounter');
const resultSection = document.getElementById('resultSection');

// Sonuç Metrikleri
const overallScore = document.getElementById('overallScore');
const scoreRingProgress = document.getElementById('scoreRingProgress');
const overallBadge = document.getElementById('overallBadge');
const overallTitle = document.getElementById('overallTitle');
const overallDesc = document.getElementById('overallDesc');

let isScanning = false;
let processedLines = 0;
let selectedTarget = 'all';

// Kategori Seçimleri
targetChips.forEach(chip => {
    chip.addEventListener('click', () => {
        if (isScanning) return;
        targetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedTarget = chip.getAttribute('data-target');
        appendLog(`[HEDEF GÜNCELLENDİ] Tarama odağı: ${chip.textContent.trim()}`, 'info-line');
        audio.beep(800, 'sine', 0.05);
    });
});

// Ses Butonu
soundToggleBtn.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    soundToggleBtn.textContent = audio.enabled ? '🔊' : '🔇';
});

// Terminale Log Ekle
function appendLog(text, className = 'code-line') {
    processedLines++;
    lineCounter.textContent = `${processedLines} SATIR İŞLENDİ`;

    const line = document.createElement('div');
    line.className = `term-line ${className}`;
    line.textContent = text;
    terminalBody.appendChild(line);

    // Otomatik aşağı kaydırma
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Logları Temizle
clearLogsBtn.addEventListener('click', () => {
    terminalBody.innerHTML = '';
    processedLines = 0;
    lineCounter.textContent = `0 SATIR İŞLENDİ`;
    appendLog('[BİLGİ] Konsol temizlendi. Yeni tarama için hazır.', 'info-line');
});

// Güvenlik Testini Başlat
function startSecurityScan() {
    if (isScanning) return;
    isScanning = true;
    startScanBtn.disabled = true;
    if (retestBtn) retestBtn.disabled = true;

    // Arayüzü hazırla
    resultSection.classList.add('hidden');
    progressContainer.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressPercent.textContent = '0%';
    
    appendLog(`===========================================================`, 'info-line');
    appendLog(`[BAŞLATILDI] TUNA SİBER GÜVENLİK TESTİ BAŞLATILIYOR...`, 'info-line');
    appendLog(`[HEDEF BİLEŞENLER]: ${selectedTarget.toUpperCase()}`, 'muted-line');
    appendLog(`===========================================================`, 'info-line');

    let currentProgress = 0;
    const totalLinesToGenerate = Math.floor(Math.random() * 20) + 45; // 45-65 satır rastgele kod akışı
    let linesDone = 0;

    const phases = [
        { at: 10, text: 'Ağ portları ve IP rotaları taranıyor...' },
        { at: 35, text: 'Oyun istemcisi ve bellek blokları inceleniyor...' },
        { at: 65, text: 'Uygulama API güvenliği ve zafiyet veritabanı eşleştiriliyor...' },
        { at: 85, text: 'Kriptografik sağlama ve sonuçlar derleniyor...' }
    ];

    const scanInterval = setInterval(() => {
        linesDone++;
        currentProgress = Math.min(100, Math.floor((linesDone / totalLinesToGenerate) * 100));

        progressBar.style.width = `${currentProgress}%`;
        progressPercent.textContent = `${currentProgress}%`;

        // Aşama güncelleme
        for (let p of phases) {
            if (currentProgress >= p.at) {
                currentPhaseText.textContent = p.text;
            }
        }

        // Rastgele kod üret
        let pool = [];
        if (selectedTarget === 'network') pool = [...CODE_SNIPPETS.network, ...CODE_SNIPPETS.generic];
        else if (selectedTarget === 'game') pool = [...CODE_SNIPPETS.game, ...CODE_SNIPPETS.generic];
        else if (selectedTarget === 'app') pool = [...CODE_SNIPPETS.app, ...CODE_SNIPPETS.generic];
        else pool = [...CODE_SNIPPETS.network, ...CODE_SNIPPETS.game, ...CODE_SNIPPETS.app, ...CODE_SNIPPETS.generic];

        const randomFn = pool[Math.floor(Math.random() * pool.length)];
        const codeText = randomFn();

        let lineType = 'code-line';
        if (codeText.includes('ENGELLENDİ') || codeText.includes('onaylandı') || codeText.includes('DOĞRULANDI') || codeText.includes('Temiz')) {
            lineType = 'success-line';
        } else if (codeText.includes('Şüpheli') || codeText.includes('AÇIK') || codeText.includes('Gecikme')) {
            lineType = 'warning-line';
        } else if (codeText.includes('Risk') || codeText.includes('Zafiyet')) {
            lineType = 'error-line';
        }

        appendLog(codeText, lineType);

        // Siber bip sesi (her birkaç satırda bir)
        if (linesDone % 2 === 0) {
            const freq = 400 + Math.random() * 800;
            audio.beep(freq, 'sawtooth', 0.02, 0.025);
        }

        // Kod akışı tamamlandı mı?
        if (linesDone >= totalLinesToGenerate) {
            clearInterval(scanInterval);
            finishScan();
        }
    }, 70); // Satırların hızlı akma hızı (70ms)
}

// Kodlar Bitince Güvenlik Durumunu Rastgele Göster
function finishScan() {
    currentPhaseText.textContent = 'Analiz tamamlandı! Sonuçlar ekrana aktarılıyor...';
    progressBar.style.width = '100%';
    progressPercent.textContent = '100%';

    appendLog(`[BİTTİ] Güvenlik simülasyonu ve bütünlük doğrulaması sona erdi.`, 'success-line');
    appendLog(`[RAPOR HAZIR] Kategori bazlı değerlendirmeler açılıyor...\n`, 'info-line');

    audio.completeSound();

    setTimeout(() => {
        isScanning = false;
        startScanBtn.disabled = false;
        if (retestBtn) retestBtn.disabled = false;
        progressContainer.classList.add('hidden');

        // Rastgele sonuç senaryosu belirle (%50 Excellent, %35 Moderate, %15 Critical)
        const rand = Math.random();
        let outcomeKey = 'excellent';
        if (rand < 0.15) {
            outcomeKey = 'critical';
        } else if (rand < 0.50) {
            outcomeKey = 'moderate';
        } else {
            outcomeKey = 'excellent';
        }

        renderResults(outcomeKey);
    }, 600);
}

// Sonuçları Ekrana Yazdır
function renderResults(outcomeKey) {
    const outcome = OUTCOMES[outcomeKey];

    // Rastgele genel puan (örn: 92)
    const scoreVal = Math.floor(Math.random() * (outcome.max - outcome.min + 1)) + outcome.min;

    // SVG Çember doldurma
    const circleCircumference = 2 * Math.PI * 50; // r=50 -> ~314.16
    const offset = circleCircumference - (scoreVal / 100) * circleCircumference;

    overallScore.textContent = scoreVal;
    scoreRingProgress.style.strokeDashoffset = offset;
    scoreRingProgress.style.stroke = outcome.color;

    overallBadge.textContent = outcome.badge;
    overallBadge.style.color = outcome.color;
    overallBadge.style.borderColor = outcome.color;
    overallBadge.style.background = `${outcome.color}22`;

    overallTitle.textContent = outcome.title;
    overallDesc.textContent = outcome.desc;

    // 1. Ağ Güvenliği Detayları (Kendi içinde ufak rastgelelik ile)
    const netCardScore = Math.min(99, Math.max(30, scoreVal + Math.floor(Math.random() * 10) - 5));
    document.getElementById('netScore').textContent = `${netCardScore}%`;
    document.getElementById('netScore').style.color = getScoreColor(netCardScore);

    const netPill = document.getElementById('netStatusPill');
    netPill.textContent = outcome.status;
    netPill.className = `card-status-pill ${outcome.class}`;

    document.getElementById('netFw').textContent = outcome.net.fw;
    document.getElementById('netPort').textContent = outcome.net.port;
    document.getElementById('netDns').textContent = outcome.net.dns;
    document.getElementById('netDdos').textContent = outcome.net.ddos;
    document.getElementById('netAdvice').textContent = outcome.advice.net;

    // Renklendirme
    styleDetailValue('netFw', outcome.class);
    styleDetailValue('netPort', outcome.class);
    styleDetailValue('netDns', outcome.class);
    styleDetailValue('netDdos', outcome.class);

    // 2. Oyun Güvenliği Detayları
    const gameCardScore = Math.min(99, Math.max(30, scoreVal + Math.floor(Math.random() * 10) - 5));
    document.getElementById('gameScore').textContent = `${gameCardScore}%`;
    document.getElementById('gameScore').style.color = getScoreColor(gameCardScore);

    const gamePill = document.getElementById('gameStatusPill');
    gamePill.textContent = outcome.status;
    gamePill.className = `card-status-pill ${outcome.class}`;

    document.getElementById('gameDll').textContent = outcome.game.dll;
    document.getElementById('gameAc').textContent = outcome.game.ac;
    document.getElementById('gameMacro').textContent = outcome.game.macro;
    document.getElementById('gamePacket').textContent = outcome.game.packet;
    document.getElementById('gameAdvice').textContent = outcome.advice.game;

    styleDetailValue('gameDll', outcome.class);
    styleDetailValue('gameAc', outcome.class);
    styleDetailValue('gameMacro', outcome.class);
    styleDetailValue('gamePacket', outcome.class);

    // 3. Uygulama Güvenliği Detayları
    const appCardScore = Math.min(99, Math.max(30, scoreVal + Math.floor(Math.random() * 10) - 5));
    document.getElementById('appScore').textContent = `${appCardScore}%`;
    document.getElementById('appScore').style.color = getScoreColor(appCardScore);

    const appPill = document.getElementById('appStatusPill');
    appPill.textContent = outcome.status;
    appPill.className = `card-status-pill ${outcome.class}`;

    document.getElementById('appEncrypt').textContent = outcome.app.encrypt;
    document.getElementById('appInjection').textContent = outcome.app.injection;
    document.getElementById('appReverse').textContent = outcome.app.reverse;
    document.getElementById('appAuth').textContent = outcome.app.auth;
    document.getElementById('appAdvice').textContent = outcome.advice.app;

    styleDetailValue('appEncrypt', outcome.class);
    styleDetailValue('appInjection', outcome.class);
    styleDetailValue('appReverse', outcome.class);
    styleDetailValue('appAuth', outcome.class);

    // Sonuç alanını göster ve oraya pürüzsüz kaydır
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getScoreColor(score) {
    if (score >= 85) return 'var(--neon-green)';
    if (score >= 65) return 'var(--neon-yellow)';
    return 'var(--neon-red)';
}

function styleDetailValue(elementId, outcomeClass) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.remove('good', 'warn', 'bad');
    if (outcomeClass === 'safe') el.classList.add('good');
    else if (outcomeClass === 'warning') el.classList.add('warn');
    else el.classList.add('bad');
}

// Buton Olayları
startScanBtn.addEventListener('click', () => {
    audio.init();
    audio.beep(520, 'sine', 0.08, 0.08);
    startSecurityScan();
});

retestBtn.addEventListener('click', () => {
    audio.init();
    audio.beep(600, 'sine', 0.08, 0.08);
    startSecurityScan();
});
