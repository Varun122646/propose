'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Component() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const [confetti, setConfetti] = useState<JSX.Element[]>([])
  const yesButtonSize = noCount * 10 + 16

  const handleNoClick = () => {
    setNoCount(noCount + 1)
  }

  const handleYesClick = () => {
    setYesPressed(true)
    createConfetti()
  }

  const createConfetti = () => {
    const newConfetti: JSX.Element[] = []
    for (let i = 0; i < 100; i++) {
      newConfetti.push(
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
          }}
        />
      )
    }
    setConfetti(newConfetti)
  }

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely you're joking?",
    "You're breaking my heart ;(",
    "I'm gonna cry...",
    "You're making a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
      <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>{confetti}</AnimatePresence>
      </div>
      {yesPressed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <h1 className="text-4xl font-bold mb-4">Yay! I love you the most meri jaannn! 💖</h1>
          <p className="text-xl mb-8">I promise to love you forever and ever keep you happy take care of you kabhi tumhe kuch takleef nhi aane dunga humesha tera saath rhunga har situation mein!</p>
          <motion.img
            src="/yes.jpg"
            alt="Happy couple"
            className="rounded-lg shadow-lg mb-4 w-full max-w-sm mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-8">Mujhse Shaadi kregi Rekhaaaaaa</h1>
          </motion.div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleYesClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: Math.min(yesButtonSize, 32) }}
            >
              Yes <Heart className="inline ml-1" />
            </motion.button>
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleNoClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {phrases[Math.min(noCount, phrases.length - 1)]}
            </motion.button>
          </div>
        </>
      )}
      <AnimatePresence>
        {noCount > 0 && !yesPressed && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <img
              src="/please.jpg"
              alt="Funny pleading meme"
              className="mx-auto rounded-lg shadow-lg mb-4 w-64 h-64 object-cover"
            />
            <p className="text-xl font-semibold">Please say yes! 🥺</p>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .confetti-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1000;
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #f00;
          animation: fall 5s linear infinite;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  )
}