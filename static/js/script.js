const recordBtn = document.getElementById('recordBtn');
const micIcon = document.getElementById('micIcon');
const resultText = document.getElementById('resultText');
const infoText = document.getElementById('infoText');
const statusDot = document.getElementById('statusDot');
const ttsInput = document.getElementById('ttsInput');
const speakBtn = document.getElementById('speakBtn');

let recognition;
let isRecording = false;

const audioMap = {
    // Dataset Angka (Dhea) - Diperbaiki typo spasi pada '0'
    '0': '0.wav', 'nol': '0.wav', '1': '1.wav', 'satu': '1.wav', '2': '2.wav', 'dua': '2.wav',
    '3': '3.wav', 'tiga': '3.wav', '4': '4.wav', 'empat': '4.wav', '5': '5.wav', 'lima': '5.wav',
    '6': '6.wav', 'enam': '6.wav', '7': '7.wav', 'tujuh': '7.wav', '8': '8.wav', 'delapan': '8.wav',
    '9': '9.wav', 'sembilan': '9.wav', '10': '10.wav', 'sepuluh': '10.wav',

    // Operator Aritmatika (Jihan)
    '+': 'tambah.wav', 'tambah': 'tambah.wav',
    '-': 'kurang.wav', 'kurang': 'kurang.wav',
    '*': 'kali.wav', 'kali': 'kali.wav',
    '/': 'bagi.wav', ':': 'bagi.wav', 'bagi': 'bagi.wav',
    '=': 'samadengan.wav', 'samadengan': 'samadengan.wav', 'sama dengan': 'samadengan.wav',

    // Kalimat Lirik Lagu (Aqil)
    '123': '123.wav',
    'sayang semuanya': 'sayang semuanya.wav',

    // Kalimat Custom Gabungan Utuh (Sesuai Screenshot File Lu)
    '1+1=2': 'satu tambah satu sama dengan dua.wav',
    '1+2=3': 'satu tambah dua samadengan tiga.wav',
    '3+1=4': 'tiga tambah satu samadengan empat.wav',
    'aku cinta ibu': 'aku cinta ibu.wav',

    // Alphabet Bersama
    'a': 'a.wav', 'b': 'b.wav', 'c': 'c.wav', 'd': 'd.wav', 'e': 'e.wav', 'f': 'f.wav', 'g': 'g.wav',
    'h': 'h.wav', 'i': 'i.wav', 'j': 'j.wav', 'k': 'k.wav', 'l': 'l.wav', 'm': 'm.wav', 'n': 'n.wav',
    'o': 'o.wav', 'p': 'p.wav', 'q': 'q.wav', 'r': 'r.wav', 's': 's.wav', 't': 't.wav', 'u': 'u.wav',
    'v': 'v.wav', 'w': 'w.wav', 'x': 'x.wav', 'y': 'y.wav', 'z': 'z.wav'
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Browser tidak mendukung Web Speech API. Gunakan Google Chrome!");
} else {
    recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = true;

    recordBtn.addEventListener('click', () => {
        if (!isRecording) { recognition.start(); } else { recognition.stop(); }
    });

    recognition.onstart = () => {
        isRecording = true;

        // Ubah tombol jadi merah (recording)
        recordBtn.className = "btn-mic border-none outline-none animate-pulse";
        recordBtn.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
        recordBtn.style.color = "#fff";
        recordBtn.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.45)";
        micIcon.className = "fa-solid fa-stop text-sm";

        infoText.innerText = "MEREKAM... SILAKAN NGOMONG LALU KLIK STOP KELAR";
        statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#ef4444;box-shadow:0 0 14px #ef4444;animation:ping 1s cubic-bezier(0,0,0.2,1) infinite;";
        resultText.innerHTML = '<span class="not-spotify text-slate-500 text-xs font-normal italic">Mendengarkan...</span>';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) { finalTranscript += event.results[i][0].transcript; }
            else { interimTranscript += event.results[i][0].transcript; }
        }
        let currentText = finalTranscript || interimTranscript;
        if (currentText.trim() !== "") {
            resultText.innerHTML = `<span>${currentText}</span>`;
        }
    };

    recognition.onend = () => {
        isRecording = false;

        // Reset tombol balik ke hijau
        recordBtn.className = "btn-mic cursor-pointer border-none outline-none";
        recordBtn.style.background = "";
        recordBtn.style.color = "";
        recordBtn.style.boxShadow = "";
        micIcon.className = "fa-solid fa-microphone text-sm";

        // Reset status dot
        statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.08);transition:all 0.3s ease;";

        let containerSpan = resultText.querySelector('span');
        let textResult = containerSpan ? containerSpan.innerText.trim() : "";

        if (textResult !== "" && !textResult.includes('Mendengarkan')) {
            infoText.innerText = "BERHASIL MENANGKAP SUARA";
            resultText.innerHTML = `<span>${textResult}</span>`;
            executeAutoTTS(textResult);
        }
    };
}

speakBtn.addEventListener('click', () => {
    const textValue = ttsInput.value.trim();
    if (textValue !== "") {
        resultText.innerHTML = `<span>${textValue}</span>`;
        executeAutoTTS(textValue);
    }
});

function executeAutoTTS(text) {
    let rawText = text.toLowerCase().trim();

    // 1. CEK GABUNGAN UTUH TERLEBIH DAHULU (Menghilangkan spasi berlebih untuk format ketat "1+1=2")
    let unifiedText = rawText.replace(/\s+/g, '');
    
    // Cek versi murni kalimat utuh dengan spasi normal (Misal: "aku cinta ibu")
    let plainText = rawText.replace(/[^a-z0-9+\-*/:= ]/g, '').replace(/\s+/g, ' ');

    let matchedKey = null;
    if (audioMap[plainText]) {
        matchedKey = plainText;
    } else if (audioMap[unifiedText]) {
        matchedKey = unifiedText;
    }

    // Jika inputan langsung cocok dengan key kalimat utuh di database
    if (matchedKey) {
        statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#f43f5e;box-shadow:0 0 14px #f43f5e;animation:ping 1s cubic-bezier(0,0,0.2,1) infinite;";
        let audio = new Audio(`/static/audio/${audioMap[matchedKey]}`);
        audio.play().catch(err => console.log("Gagal memutar audio utuh:", err));
        audio.onended = () => {
            statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#f43f5e;box-shadow:0 0 12px #f43f5e;transition:all 0.3s ease;";
        };
        return; // Mengunci eksekusi agar tidak turun ke metode eceran per kata
    }

    // 2. CEK VARIASI RUMUS MATEMATIKA DARI INPUT SUARA STT (Misal ditangkap: "1 tambah 1 sama dengan 2")
    let sanitizedText = rawText
        .replace(/\+/g, ' tambah ')
        .replace(/-/g, ' kurang ')
        .replace(/\*/g, ' kali ')
        .replace(/[\/:]/g, ' bagi ')
        .replace(/=/g, ' samadengan ')
        .replace(/sama dengan/g, ' samadengan ')
        .replace(/\s+/g, ' ').trim();

    // Transformasi balik ke string formula tanpa spasi untuk cek kecocokan key "1+1=2"
    let mathFormulaKey = sanitizedText
        .replace(/ tambah /g, '+')
        .replace(/ kurang /g, '-')
        .replace(/ kali /g, '*')
        .replace(/ bagi /g, '/')
        .replace(/ samadengan /g, '=');

    if (audioMap[mathFormulaKey]) {
        statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#f43f5e;box-shadow:0 0 14px #f43f5e;animation:ping 1s cubic-bezier(0,0,0.2,1) infinite;";
        let audio = new Audio(`/static/audio/${audioMap[mathFormulaKey]}`);
        audio.play().catch(err => console.log("Gagal memutar audio formula:", err));
        audio.onended = () => {
            statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#f43f5e;box-shadow:0 0 12px #f43f5e;transition:all 0.3s ease;";
        };
        return;
    }

    // 3. JIKA TIDAK ADA KALIMAT UTUH YANG COCOK, MASUK MODE ECERAN PER KATA (Mode Default)
    let tokens = [];
    const words = sanitizedText.split(/\s+/);
    words.forEach(word => { if (audioMap[word]) { tokens.push(audioMap[word]); } });

    if (tokens.length > 0) {
        let index = 0;
        statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#f43f5e;box-shadow:0 0 14px #f43f5e;animation:ping 1s cubic-bezier(0,0,0.2,1) infinite;";

        function playNext() {
            if (index < tokens.length) {
                let audio = new Audio(`/static/audio/${tokens[index]}`);
                audio.play().catch(() => { index++; playNext(); });
                audio.onended = () => { index++; playNext(); };
            } else {
                statusDot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#f43f5e;box-shadow:0 0 12px #f43f5e;transition:all 0.3s ease;";
            }
        }
        playNext();
    }
}