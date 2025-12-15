"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SiLala from "../components/SiLala";

export default function PetunjukPage() {
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
            Petunjuk 📖
          </h1>
          <div className="w-24"></div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Si Lala Introduction */}
        <motion.div
          className="bg-white/90 rounded-3xl p-8 shadow-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SiLala size={150} />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <h2
                className="text-3xl md:text-4xl font-bold text-green-800 mb-4"
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                Cara Bermain
              </h2>
              <p
                className="text-xl text-gray-700"
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                Ikuti petunjuk di bawah ini untuk memulai petualanganmu!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: "Klik Tombol START",
              description: "Tekan tombol START yang berwarna orange untuk mulai menjelajah!",
              emoji: "🚀",
              color: "from-orange-400 to-orange-600",
            },
            {
              step: 2,
              title: "Jelajahi Topik",
              description: "Klik pada setiap kartu untuk belajar tentang topik yang menarik!",
              emoji: "🔍",
              color: "from-blue-400 to-blue-600",
            },
            {
              step: 3,
              title: "Lihat Gambar",
              description: "Setiap topik punya gambar dan cerita yang seru untuk dipelajari!",
              emoji: "🖼️",
              color: "from-green-400 to-green-600",
            },
            {
              step: 4,
              title: "Belajar dengan Si Lala",
              description: "Si Lala akan menemani kamu di setiap langkah petualangan!",
              emoji: "👋",
              color: "from-purple-400 to-purple-600",
            },
          ].map((instruction, index) => (
            <motion.div
              key={instruction.step}
              className="bg-white/90 rounded-3xl p-6 shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <div className="flex items-center gap-6">
                <motion.div
                  className={`bg-gradient-to-r ${instruction.color} rounded-2xl p-6 text-6xl flex-shrink-0`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  {instruction.emoji}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                      {instruction.step}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-gray-800"
                      style={{ fontFamily: 'var(--font-baloo)' }}
                    >
                      {instruction.title}
                    </h3>
                  </div>
                  <p
                    className="text-lg md:text-xl text-gray-600"
                    style={{ fontFamily: 'var(--font-baloo)' }}
                  >
                    {instruction.description}
                  </p>
                </div>
                {index === 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <SiLala size={100} animate={false} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/explore">
            <motion.button
              className="bg-orange-500 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-lg hover:bg-orange-600 transition-colors border-4 border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Mulai Petualangan! 🎉
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

