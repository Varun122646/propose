'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Stars, Volume2, VolumeX } from 'lucide-react'

export default function Component() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const [confetti, setConfetti] = useState<JSX.Element[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const yesButtonSize = noCount * 10 + 16

  const handleNoClick = () => {
    setNoCount(noCount + 1)
  }

  const handleYesClick = () => {
    setYesPressed(true)
    createConfetti()
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const createConfetti = () => {
    const newConfetti: JSX.Element[] = []
    for (let i = 0; i < 100; i++) {
      newConfetti.push(
        <motion.div
          key={i}
          className="confetti"
          initial={{ y: -10, opacity: 1 }}
          animate={{
            y: '100vh',
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            position: 'absolute',
            width: '10px',
            height: '10px',
            transform: `rotate(${Math.random() * 360}deg)`,
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>{confetti}</AnimatePresence>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="z-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-xl max-w-md w-full">
        {yesPressed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4 text-pink-600">Yay! I love you the most meri jaannn! 💖</h1>
            <p className="text-xl mb-8 text-purple-700">I promise to love you forever and ever, keep you happy, take care of you, kabhi tumhe kuch takleef nhi aane dunga, humesha tera saath rhunga har situation mein!</p>
            <motion.img
              src="/yes.jpg"
              alt="Happy couple"
              className="rounded-lg shadow-lg mb-4 w-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            >
              <Stars className="text-yellow-400 w-16 h-16 mx-auto" />
            </motion.div>
            <button
              onClick={toggleAudio}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isPlaying ? <VolumeX className="inline" /> : <Volume2 className="inline" />}
              {isPlaying ? " Mute" : " Unmute"} Music
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold mb-4 text-pink-600">Will you be my girlfriend?</h1>
              <p className="text-lg text-purple-700">Every moment with you is a dream come true. Let's make it official!</p>
            </motion.div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={handleYesClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontSize: Math.min(yesButtonSize, 24) }}
              >
                Yes <Heart className="inline ml-1" />
              </motion.button>
              <motion.button
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={handleNoClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {phrases[Math.min(noCount, phrases.length - 1)]}
              </motion.button>
            </div>
          </>
        )}
      </div>
      <AnimatePresence>
        {noCount > 0 && !yesPressed && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center z-10"
          >
            <img
              src="/please.jpg"
              alt="Funny pleading meme"
              className="mx-auto rounded-lg shadow-lg mb-4 w-64 h-64 object-cover"
            />
            <p className="text-xl font-semibold text-pink-600">Please say yes! 🥺</p>
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={audioRef} loop>
        <source src="/romantic-background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}