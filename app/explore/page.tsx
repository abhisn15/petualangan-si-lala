"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SiLala from "../components/SiLala";

const educationalTopics = [
  {
    id: 1,
    title: "Hutan Hujan Tropis",
    emoji: "🌳",
    visualEmojis: ["🌳", "🦋", "🐒", "🌿"],
    description: "Rumah bagi banyak hewan dan tumbuhan!",
    color: "from-green-400 to-green-600",
    facts: [
      { icon: "💨", text: "Menghasilkan oksigen" },
      { icon: "🦁", text: "Banyak hewan hidup di sini" },
      { icon: "🌲", text: "Pohon melindungi kita" },
    ],
  },
  {
    id: 2,
    title: "Lautan Biru",
    emoji: "🌊",
    visualEmojis: ["🌊", "🐠", "🐙", "🐬"],
    description: "Penuh dengan kehidupan menakjubkan!",
    color: "from-blue-400 to-blue-600",
    facts: [
      { icon: "🌍", text: "Menutupi 70% bumi" },
      { icon: "🐠", text: "Ikan dan karang hidup di sini" },
      { icon: "🧹", text: "Jaga laut tetap bersih" },
    ],
  },
  {
    id: 3,
    title: "Hewan Liar",
    emoji: "🦁",
    visualEmojis: ["🦁", "🐻", "🦊", "🐯"],
    description: "Setiap hewan punya tempat khusus!",
    color: "from-orange-400 to-orange-600",
    facts: [
      { icon: "⚖️", text: "Menjaga keseimbangan alam" },
      { icon: "🛡️", text: "Kita harus melindungi mereka" },
      { icon: "⭐", text: "Setiap hewan penting" },
    ],
  },
  {
    id: 4,
    title: "Tumbuhan Hijau",
    emoji: "🌿",
    visualEmojis: ["🌿", "🌱", "🌺", "🍃"],
    description: "Memberi udara bersih dan makanan!",
    color: "from-emerald-400 to-emerald-600",
    facts: [
      { icon: "💨", text: "Membuat oksigen" },
      { icon: "🌬️", text: "Menyerap karbon dioksida" },
      { icon: "🌳", text: "Tanam lebih banyak pohon" },
    ],
  },
  {
    id: 5,
    title: "Sungai dan Danau",
    emoji: "💧",
    visualEmojis: ["💧", "🌊", "🦆", "🐟"],
    description: "Sumber kehidupan yang penting!",
    color: "from-cyan-400 to-cyan-600",
    facts: [
      { icon: "💧", text: "Kita butuh air untuk hidup" },
      { icon: "🌊", text: "Sungai membawa air" },
      { icon: "🧹", text: "Jaga air tetap bersih" },
    ],
  },
  {
    id: 6,
    title: "Recycle & Reuse",
    emoji: "♻️",
    visualEmojis: ["♻️", "🗑️", "🌱", "♻️"],
    description: "Membantu menjaga bumi sehat!",
    color: "from-purple-400 to-purple-600",
    facts: [
      { icon: "♻️", text: "Gunakan kembali barang" },
      { icon: "🗑️", text: "Kurangi sampah" },
      { icon: "👥", text: "Semua bisa membantu!" },
    ],
  },
];

export default function ExplorePage() {
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
            Eksplorasi Alam 🌍
          </h1>
          <div className="w-24"></div>
        </div>
      </motion.header>

      {/* Si Lala Introduction */}
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto mb-8 border-4 border-green-300">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <SiLala size={180} />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-green-800 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                Halo! Aku Si Lala! 👋
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                Yuk, kita belajar tentang alam bersama! 🎉
              </motion.p>
              <motion.div
                className="flex gap-3 justify-center md:justify-start text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {["🌳", "🌊", "🦁", "🌿", "💧", "♻️"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Educational Topics Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationalTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                type: "spring",
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
            >
              {/* Topic Header */}
              <div
                className={`bg-gradient-to-r ${topic.color} rounded-2xl p-6 mb-4 text-center relative overflow-hidden`}
              >
                {/* Visual Emojis Background */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-20">
                  {topic.visualEmojis.map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-4xl"
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  className="text-7xl mb-2 relative z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {topic.emoji}
                </motion.div>
                <h3
                  className="text-2xl font-bold text-white drop-shadow-lg relative z-10"
                  style={{ fontFamily: 'var(--font-baloo)' }}
                >
                  {topic.title}
                </h3>
              </div>

              {/* Si Lala appears in each card with animation */}
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <SiLala size={100} animate={false} />
              </motion.div>

              {/* Description - Shorter and more visual */}
              <motion.p
                className="text-xl text-gray-800 mb-4 text-center font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                {topic.description}
              </motion.p>

              {/* Facts - More visual with icons */}
              <div className="space-y-3">
                {topic.facts.map((fact, factIndex) => (
                  <motion.div
                    key={factIndex}
                    className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border-2 border-green-200"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + index * 0.1 + factIndex * 0.1,
                      type: "spring",
                    }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <motion.span
                      className="text-3xl"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: factIndex * 0.5,
                      }}
                    >
                      {fact.icon}
                    </motion.span>
                    <p
                      className="text-gray-700 text-base md:text-lg font-semibold flex-1"
                      style={{ fontFamily: 'var(--font-baloo)' }}
                    >
                      {fact.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="container mx-auto px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center shadow-xl max-w-4xl mx-auto">
          <motion.div
            className="mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SiLala size={120} animate={false} />
          </motion.div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Ayo, Jaga Bumi Kita! 🌍
          </h2>
          <p
            className="text-xl md:text-2xl text-white mb-6"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Setiap tindakan kecil kita bisa membuat perbedaan besar! ✨
          </p>
          <Link href="/">
            <motion.button
              className="bg-white text-orange-600 px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-gray-100 transition-colors border-4 border-white"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Kembali ke Beranda 🏠
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

