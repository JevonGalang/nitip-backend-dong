# 🎓 Sistem Mahasiswa — Backend API

> Backend REST API untuk sistem manajemen laboratorium mahasiswa dengan fitur autentikasi JWT, booking lab, dan notifikasi email.

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Tech Stack](#-tech-stack)
- [NPM Packages](#-npm-packages-yang-digunakan)
- [Arsitektur & Alur Aplikasi](#-arsitektur--alur-aplikasi)
- [Struktur Folder](#-struktur-folder)
- [Instalasi & Setup](#-instalasi--setup)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Middleware](#-middleware)
- [Helpers & Utilities](#-helpers--utilities)

---

## 📖 Tentang Project

Project ini adalah **backend REST API** yang dibangun menggunakan **Express.js v5** dan **MySQL** untuk mengelola:

- **Autentikasi** — Login mahasiswa dengan password hashing (bcrypt) dan token JWT
- **Booking Laboratorium** — Input dan kelola data peminjaman/penggunaan laboratorium
- **Manajemen Data** — CRUD data pengguna lab dengan validasi input
- **Notifikasi Email** — Kirim email melalui Nodemailer (Gmail SMTP)
- **Keamanan** — Proteksi endpoint menggunakan JWT token dan Helmet

---

## 🛠 Tech Stack

| Teknologi   | Versi    | Deskripsi                       |
| ----------- | -------- | ------------------------------- |
| Node.js     | —        | JavaScript runtime              |
| Express.js  | v5.2.1   | Web framework                   |
| MySQL       | —        | Relational database             |
| mysql2      | v3.22.1  | MySQL driver (promise-based)    |
| JWT         | v9.0.3   | Token-based authentication      |
| bcrypt      | v6.0.0   | Password hashing                |

---

## 📦 NPM Packages yang Digunakan

| Package          | Versi     | Fungsi                                                                 |
| ---------------- | --------- | ---------------------------------------------------------------------- |
| `express`        | ^5.2.1    | Web framework utama untuk routing dan HTTP server                      |
| `mysql2`         | ^3.22.1   | MySQL driver dengan dukungan `async/await` (promise-based)             |
| `jsonwebtoken`   | ^9.0.3    | Membuat dan memverifikasi JWT token untuk autentikasi                  |
| `bcrypt`         | ^6.0.0    | Hashing dan compare password secara aman                               |
| `body-parser`    | ^2.2.2    | Parsing request body format JSON                                       |
| `cors`           | ^2.8.6    | Mengizinkan Cross-Origin Resource Sharing (akses dari domain lain)     |
| `helmet`         | ^8.1.0    | Mengamankan HTTP headers untuk proteksi dari serangan umum             |
| `dotenv`         | ^17.4.2   | Memuat environment variables dari file `.env`                          |
| `nodemailer`     | ^8.0.7    | Mengirim email melalui SMTP (Gmail)                                    |

---

## 🔄 Arsitektur & Alur Aplikasi

Project ini menggunakan arsitektur **layered/service-based** dengan pemisahan tanggung jawab yang jelas:

```
Client Request
      │
      ▼
┌─────────────────┐
│   index.js      │  ← Entry point, setup Express, middleware global
│   (Express App) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Middleware     │  ← Session logging, input validation, JWT auth
│   (Global)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Routes       │  ← Definisi endpoint (GET, POST, DELETE)
│  get.js/post.js │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Middleware     │  ← Per-route: field check, log, JWT verify
│   (Per-Route)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Controller    │  ← Mengatur logic request & response
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Services     │  ← Business logic (login, logbook, hapus)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Models       │  ← Query database (MySQL)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MySQL DB      │  ← Database: systemmahasiswa
│  (mysql2 pool)  │
└─────────────────┘
```

### Alur Login

```
POST /post/login
      │
      ├── 1. Middleware: checkInput (validasi username & password tidak kosong)
      │
      ├── 2. Controller: masuk()
      │
      ├── 3. Service: login()
      │       ├── Query user dari tabel `allmahasiswa` berdasarkan `nama`
      │       ├── Compare password dengan bcrypt
      │       └── Return data user jika cocok
      │
      ├── 4. Helper: generateJwt() → buat JWT token (expired 1 jam)
      │
      └── 5. Helper: authres() → kirim response berisi userId, username, dan token
```

### Alur Booking/Input Lab

```
POST /post/form
      │
      ├── 1. Middleware: logInput (log method, url, dan timestamp)
      │
      ├── 2. Middleware: fieldCheck (validasi semua field wajib terisi)
      │
      ├── 3. Controller: post()
      │
      ├── 4. Service: logbook() → extract body dan format data
      │
      └── 5. Model: inputUsers() → INSERT ke tabel `users`
```

### Alur Get Data (Protected)

```
GET /get/timestamp
      │
      ├── 1. Middleware: validMiddleware (verifikasi JWT dari header Authorization)
      │
      ├── 2. Controller: history()
      │
      ├── 3. Service: spillall()
      │
      └── 4. Model: catchUsers() → SELECT * FROM users LEFT JOIN laboratorium
```

### Alur Delete Data (Protected)

```
DELETE /get/:id
      │
      ├── 1. Middleware: validMiddleware (verifikasi JWT)
      │
      ├── 2. Controller: hapus()
      │
      ├── 3. Service: hapusLog() → validasi data ada sebelum hapus
      │
      └── 4. Model: deleteLog() → DELETE FROM users WHERE id = ?
```

---

## 📁 Struktur Folder

```
📦 Bikin-sistem-login/
├── 📄 index.js                        # Entry point aplikasi
├── 📄 package.json                    # Konfigurasi project & dependencies
├── 📄 .env                           # Environment variables (tidak di-commit)
├── 📄 .gitignore                     # File yang diabaikan git
│
├── 📂 config/                         # Konfigurasi eksternal
│   ├── 📄 conection.js               # Koneksi MySQL pool (mysql2/promise)
│   └── 📄 mailservice.js             # Konfigurasi Nodemailer (Gmail SMTP)
│
├── 📂 Routes/                         # Definisi endpoint/routing
│   ├── 📄 get.js                     # GET & DELETE routes
│   ├── 📄 post.js                    # POST routes (form, login)
│   └── 📄 update.js                  # UPDATE routes (WIP)
│
├── 📂 middleware/                     # Middleware functions
│   ├── 📄 SeasionMiddleware.js       # Log timestamp setiap request
│   ├── 📄 logInput.js                # Log detail method, URL, dan waktu
│   ├── 📄 checkInput.js              # Validasi input login (username/password)
│   ├── 📄 fieldCheck.js              # Validasi semua field form booking
│   └── 📄 validMiddleware.js         # Verifikasi JWT token (protected routes)
│
├── 📂 controller/                     # Request/response handler
│   ├── 📄 alldatas.js                # Controller: get all data & hapus data
│   └── 📄 loginAndbooking.js         # Controller: login & input booking
│
├── 📂 services/                       # Business logic layer
│   ├── 📄 spillall.js                # Ambil semua data user
│   ├── 📄 logbook.js                 # Proses input booking lab
│   ├── 📄 login.js                   # Proses autentikasi login
│   ├── 📄 regist.js                  # Proses registrasi (commented out)
│   └── 📄 hapusLog.js                # Proses hapus data berdasarkan ID
│
├── 📂 models/                         # Database queries
│   ├── 📄 catchUsers.js              # SELECT users + JOIN laboratorium
│   ├── 📄 inputUsers.js              # INSERT data booking
│   ├── 📄 loginUsers.js              # SELECT user by nama (login)
│   ├── 📄 registUsers.js             # INSERT user baru (registrasi)
│   └── 📄 deleteLog.js               # DELETE user by ID
│
├── 📂 helpers/                        # Utility/helper functions
│   ├── 📄 response.js               # Standar format response API
│   ├── 📄 authres.js                 # Format response autentikasi (token)
│   ├── 📄 jwtToken.js               # Generate & verify JWT token
│   └── 📄 bycriptHash.js            # Hash & compare password (bcrypt)
│
└── 📂 utils/                         # Utility functions
    └── 📄 generateOtp.js             # Generate OTP 6 digit (crypto)
```

---

## ⚙ Instalasi & Setup

### Prasyarat

- **Node.js** (v18+)
- **MySQL** (v8+)
- **npm**

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/JevonGalang/nitip-backend-dong.git
cd nitip-backend-dong

# 2. Install dependencies
npm install

# 3. Setup file .env (lihat section Environment Variables)
cp .env.example .env

# 4. Buat database MySQL
mysql -u root -e "CREATE DATABASE systemmahasiswa;"

# 5. Jalankan server
node index.js
```

Server akan berjalan di: **http://localhost:3000**

---

## 🔐 Environment Variables

Buat file `.env` di root project:

```env
# Database
HOST=localhost
USER=root
PASSWORD=
DATABASE=systemmahasiswa

# Security
SALT=15
SECRET=your_jwt_secret_key

# Email (opsional)
GMAIL=your_email@gmail.com
PASSGMAIL=your_app_password
```

| Variable   | Deskripsi                                        |
| ---------- | ------------------------------------------------ |
| `HOST`     | Host database MySQL                              |
| `USER`     | Username database MySQL                          |
| `PASSWORD` | Password database MySQL                          |
| `DATABASE` | Nama database                                    |
| `SALT`     | Jumlah salt rounds untuk bcrypt hashing           |
| `SECRET`   | Secret key untuk signing JWT token                |
| `GMAIL`    | Alamat Gmail untuk mengirim email (Nodemailer)    |
| `PASSGMAIL`| App Password Gmail (bukan password biasa)         |

---

## 🗄 Database Schema

### Tabel `allmahasiswa` (Autentikasi)

| Kolom      | Tipe     | Deskripsi          |
| ---------- | -------- | ------------------ |
| `id`       | INT (PK) | ID mahasiswa       |
| `nama`     | VARCHAR  | Username/nama      |
| `password` | VARCHAR  | Hashed password    |

### Tabel `users` (Booking Laboratorium)

| Kolom                 | Tipe     | Deskripsi                    |
| --------------------- | -------- | ---------------------------- |
| `id`                  | INT (PK) | Auto increment               |
| `nama_lab`            | INT (FK) | ID laboratorium (FK)         |
| `nama_ketua_kelas`    | VARCHAR  | Nama ketua kelas             |
| `number_wa`           | VARCHAR  | Nomor WhatsApp               |
| `kegiatan_terjadwa`   | VARCHAR  | Status kegiatan terjadwal    |
| `matkul`              | VARCHAR  | Mata kuliah                  |
| `dosen_pengampu`      | VARCHAR  | Nama dosen pengampu          |
| `jumlah_peserta`      | INT      | Jumlah peserta               |
| `tanggal_kegiatan`    | DATE     | Tanggal kegiatan             |
| `jam_masuk`           | TIME     | Jam masuk                    |
| `keterangan`          | TEXT     | Keterangan tambahan          |

### Tabel `laboratorium`

| Kolom      | Tipe     | Deskripsi            |
| ---------- | -------- | -------------------- |
| `id_lab`   | INT (PK) | ID laboratorium      |
| *(kolom lainnya sesuai kebutuhan)* | — | Data lab |

---

## 🌐 API Endpoints

### Base URL

```
http://localhost:3000
```

---

### 🔓 Public Endpoints

#### `POST /post/login` — Login Dosen dan admin

Login dan dapatkan JWT token.

**Request Body:**

```json
{
  "username": "nama_dosen/admin",
  "password": "password123"
}
```

**Response Sukses (200):**

```json
{
  "users": {
    "userId": 1,
    "username": "nama_dosen/admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "status": 200
}
```

**Response Gagal (401):**

```json
{
  "error": "username tidak ditemukan"
}
```

```json
{
  "error": "password salah"
}
```

**Response Validasi Gagal:**

```json
{
  "message": "username/password tidak boleh kosong"
}
```

---

#### `POST /post/form` — Input Booking Laboratorium

Input data booking/peminjaman laboratorium.

**Request Body:**

```json
{
  "namalab": 1,
  "namaKetua": "Budi Santoso",
  "numberWa": "081234567890",
  "Terjadwal": "Ya",
  "matkul": "Pemrograman Web",
  "dosen": "Dr. Siti Aminah",
  "jumlahPeserta": 35,
  "tanggalKegiatan": "2026-06-20",
  "jamMasuk": "08:00",
  "keterangan": "Praktikum minggu ke-12"
}
```

**Response Sukses (200):**

```json
{
  "message": { "affectedRows": 1, "insertId": 10 },
  "status": 200,
  "token": "none"
}
```

**Response Validasi Gagal (400):**

```json
{
  "pesan": "field berikut tidak boleh kosong",
  "kurang": ["matkul", "dosen"]
}
```

---

#### `GET /get/` — Ambil Semua Data (dengan Logging)

Ambil semua data booking lab beserta detail laboratorium.

**Response Sukses (200):**

```json
{
  "message": [
    {
      "id": 1,
      "nama_lab": 1,
      "nama_ketua_kelas": "Budi",
      "number_wa": "081234567890",
      "matkul": "Pemrograman Web",
      "...": "..."
    }
  ],
  "status": 200,
  "token": "none"
}
```

---

### 🔒 Protected Endpoints (Butuh JWT Token)

> **Header yang diperlukan:**
> ```
> Authorization: Bearer <token>
> ```

#### `GET /get/timestamp` — Ambil Semua Data (Protected)

Sama seperti `GET /get/` tetapi membutuhkan JWT token.

**Response Sukses (200):** *(sama seperti di atas)*

**Response Gagal (401):**

```json
{
  "pesan": "username not exit"
}
```

**Response Token Invalid (403):**

```json
{
  "message": "Token tidak valid"
}
```

---

#### `DELETE /get/:id` — Hapus Data Booking

Hapus data booking berdasarkan ID.

**Contoh Request:**

```
DELETE /get/5
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
```

**Response Sukses (200):**

```json
{
  "message": { "affectedRows": 1 },
  "status": 200,
  "token": "none"
}
```

**Response Data Tidak Ditemukan (404):**

```json
{
  "error": "data dengan id tersebut tidak ditemukan"
}
```

---

### Ringkasan Endpoints

| Method   | Endpoint          | Auth  | Deskripsi                          |
| -------- | ----------------- | ----- | ---------------------------------- |
| `GET`    | `/get/`           | ❌    | Ambil semua data booking           |
| `GET`    | `/get/timestamp`  | ✅ JWT | Ambil semua data (protected)       |
| `DELETE` | `/get/:id`        | ✅ JWT | Hapus data booking by ID           |
| `POST`   | `/post/form`      | ❌    | Input data booking laboratorium    |
| `POST`   | `/post/login`     | ❌    | Login dan dapatkan JWT token       |

---

## 🛡 Middleware

### 1. Session Middleware (`SeasionMiddleware.js`)

Middleware global yang berjalan di setiap request. Mencatat timestamp ketika ada request masuk.

```
seasonMidSay: masuk nih tanggal: Wed Jun 18 2026 ...
```

### 2. Log Input (`logInput.js`)

Mencatat detail setiap request: HTTP method, URL, tanggal, bulan, tahun, dan jam.

```json
{
  "usedMethod": "GET",
  "usedUrl": "/",
  "times": {
    "date": 18,
    "mounth": 5,
    "years": 2026,
    "hour": "14:30"
  }
}
```

### 3. Field Check (`fieldCheck.js`)

Memvalidasi bahwa semua field yang diperlukan untuk booking lab terisi. Field yang dicek:

`namalab`, `namaKetua`, `numberWa`, `Terjadwal`, `matkul`, `dosen`, `jumlahPeserta`, `jamMasuk`, `keterangan`

### 4. Check Input (`checkInput.js`)

Memvalidasi bahwa `username` dan `password` tidak kosong saat login.

### 5. JWT Validation (`validMiddleware.js`)

Memverifikasi JWT token dari header `Authorization: Bearer <token>`. Jika valid, data user yang terdekripsi disimpan di `req.user`.

---

## 🔧 Helpers & Utilities

| File               | Fungsi                                                          |
| ------------------ | --------------------------------------------------------------- |
| `response.js`      | Standarisasi format response: `{ message, status, token }`      |
| `authres.js`       | Format response login: `{ users: { userId, username }, token }` |
| `jwtToken.js`      | `generateJwt(payload)` — buat token (exp: 1h) & `verify(token)` |
| `bycriptHash.js`   | `hash(password, salt)` — hash password & `compare(password, hashed)` |
| `generateOtp.js`   | Generate OTP 6 digit menggunakan `crypto.randomInt()` (lebih aman) |

---

## 👤 Author

**panggalih**

---

## 📄 License

ISC
