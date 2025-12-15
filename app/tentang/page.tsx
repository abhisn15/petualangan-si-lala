"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SiLala from "../components/SiLala";

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-green-100 to-green-200">
      {/* Header */}
      <motion.header
        className="bg-green-600 text-white py-6 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <motion.button
              className="text-2xl font-bold hover:text-yellow-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              ← Kembali
            </motion.button>
          </Link>
          <h1
            className="text-3xl md:text-4xl font-bold text-center"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Tentang 🌟
          </h1>
          <div className="w-24"></div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Main Content */}
        <motion.div
          className="bg-white/90 rounded-3xl p-8 md:p-12 shadow-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SiLala size={200} />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Tentang Petualangan Lingkungan Si Lala
            </motion.h2>
          </div>

          <div
            className="space-y-6 text-lg md:text-xl text-gray-700"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <strong className="text-green-700">Petualangan Lingkungan Si Lala</strong> adalah
              platform edukasi interaktif yang dirancang khusus untuk anak-anak
              agar belajar tentang alam dan lingkungan dengan cara yang menyenangkan!
            </motion.p>

            <motion.div
              className="bg-green-50 rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-green-800 mb-4 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                <span>🎯</span> Tujuan Kami
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Mengajarkan anak-anak tentang pentingnya menjaga lingkungan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Membuat pembelajaran tentang alam menjadi menyenangkan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Menggunakan visual dan gambar yang menarik untuk anak-anak</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Menginspirasi generasi muda untuk peduli pada bumi</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-blue-50 rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                <span>👋</span> Kenalan dengan Si Lala
              </h3>
              <p style={{ fontFamily: 'var(--font-baloo)' }}>
                Si Lala adalah teman petualanganmu! Dia akan menemani kamu
                menjelajahi berbagai topik tentang alam, dari hutan hujan hingga
                lautan biru. Si Lala suka belajar dan bermain, sama seperti kamu!
              </p>
            </motion.div>

            <motion.div
              className="bg-yellow-50 rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-yellow-800 mb-4 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                <span>🌍</span> Mari Jaga Bumi Kita!
              </h3>
              <p style={{ fontFamily: 'var(--font-baloo)' }}>
                Setiap tindakan kecil kita bisa membuat perbedaan besar. Yuk,
                bersama-sama kita belajar dan beraksi untuk menjaga bumi kita
                tetap hijau dan sehat!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link href="/explore">
            <motion.button
              className="bg-orange-500 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-lg hover:bg-orange-600 transition-colors border-4 border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Mulai Belajar! 🚀
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

