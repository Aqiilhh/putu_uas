# 🚀 Web App Speech To Text & Text To Speech

Sistem konversi matriks bilangan (0-10), alfabet (A-Z), operator aritmatika dasar, serta kalimat kustom berbasis **Web Speech API (Client-Side)** dengan backend **Flask (Python)**. Interface aplikasi ini didesain menggunakan **Tailwind CSS** dengan mengusung tema *Synthwave / Spotify Premium Gradient* (Cyan-Purple-Pink).

---

## 👥 Anggota Kelompok (IFB-306)

Berikut adalah daftar anggota Kelompok Collab pengembangan sistem:

| NRP | Nama Anggota | Kontribusi Dataset Audio |
| :--- | :--- | :--- |
| **15-2023-044** | Rizky Dwi Akmalrio Praditha | Rekaman Audio Alfabet (A-Z) Bersama |
| **15-2023-052** | Rizky Aqil Hibatullah | Rekaman Lirik Kustom (Variasi Poin D) & Integrasi JS |
| **15-2023-211** | Dhea Rohana | Rekaman Matriks Bilangan Dasar (0 - 10) & Desain UI |
| **15-2023-215** | Jihan Nur Alfiah | Rekaman Simbol & Kata Operator Aritmatika Dasar |

---

## ✨ Fitur Utama

* **Fitur 01 // Speech To Text (STT):** Menangkap input suara live dari mikrofon secara *real-time* menggunakan Google Chrome Web Speech API.
* **Fitur 02 // Text To Speech (TTS):** Memutar rangkaian file audio `.wav` asli milik kelompok berdasarkan input teks kustom atau rumus matematika yang diketik.
* **System Monitor // Rendered Matrix:** Menampilkan hasil transkrip teks secara presisi dengan indikator status dot interaktif ala neon.
* **Full Background Gradient:** Latar belakang dinamis transisition *Cyan-Purple-Pink* sesuai permintaan estetik tim.

---

## 📁 Struktur Proyek

Proyek ini dibangun secara modular untuk memisahkan logika backend, struktur halaman, gaya visual, dan database audio:

```text
uas-stt-tts/
│
├── app.py                      # Backend Flask (Routing & Server)
├── README.md                   # Dokumentasi Proyek
│
├── templates/
│   └── index.html              # Struktur Antarmuka Halaman Web (HTML)
│
└── static/
    ├── css/
    │   └── style.css           # Desain Tema & Gaya Visual (CSS)
    ├── js/
    │   └── script.js           # Logika Core Speech API & Audio Controller (JS)
    └── audio/                  # Database File WAV Rekaman Suara Kelompok
        ├── 0.wav s.d 10.wav    # Dataset Angka Dasar
        ├── tambah.wav, dll     # Dataset Operator Aritmatika
        └── aku cinta ibu.wav   # Dataset Kalimat Kustom Gabungan Utuh
