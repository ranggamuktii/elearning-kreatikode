# Kreatikode - Final Project Fullstack Vocasia Batch #7

Ini adalah website couser Kreatikode MERN Stack (MongoDB, Express, React, dan Node.js) yang dibangun menggunakan Vite sebagai bundler untuk aplikasi React, Tailwind CSS untuk styling, dan React Router untuk navigasi antar halaman.

## Daftar Isi

- [Fitur](#fitur)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)

## Fitur

- **Create**: Tambahkan data baru ke dalam database.
- **Read**: Lihat data yang disimpan di dalam database.
- **Update**: Modifikasi data yang ada di dalam database.
- **Delete**: Hapus data dari database.

## Teknologi yang Digunakan

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Dependensi Lain**: Axios, Mongoose, CORS

## Prasyarat

- **Node.js**: Pastikan Node.js sudah terinstal di komputer Anda.
- **MongoDB**: Siapkan server MongoDB lokal atau gunakan MongoDB Atlas.

## Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/ranggamuktii/elearning-kreatikode.git
cd elearning-kreatikode
```

### 2. Instalasi Dependensi

#### Backend

Masuk ke folder `backend` dan install semua paket yang dibutuhkan.

```bash
cd backend
npm init -y
npm i express mongoose cors dotenv
npm i -g nodemon
```

#### Frontend

Masuk ke folder `frontend` dan install semua paket yang dibutuhkan.

```bash
cd ../frontend
npm install
npm i react-router-dom axios dotenv
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Menjalankan Aplikasi

### 1. Jalankan MongoDB

Pastikan MongoDB berjalan di komputer Anda atau terhubung ke MongoDB Atlas.

### 2. Jalankan Server Backend

Di folder `backend`, jalankan perintah berikut untuk memulai server backend:

```bash
nodemon app.js
```

atau

```bash
nodemon app
```

Ini akan memulai server di `http://localhost:5000`

### 3. Jalankan Server Frontend

Di folder `frontend`, jalankan perintah berikut untuk memulai aplikasi React:

```bash
npm start
```

Frontend akan berjalan di `http://localhost:5173`
