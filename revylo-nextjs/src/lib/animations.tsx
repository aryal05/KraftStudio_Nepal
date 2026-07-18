"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Smooth fade in/out looping animation with direction change
export const FadeLoopText = ({ 
  texts, 
  className = "", 
  duration = 4 
}: { 
  texts: string[]; 
  className?: string; 
  duration?: number 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(prev => Math.random() > 0.5 ? 'forward' : 'backward');
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <div className={`relative ${className}`} style={{ minHeight: '1em' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            x: direction === 'forward' ? 100 : -100,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            filter: 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            x: direction === 'forward' ? -100 : 100,
            filter: 'blur(10px)'
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Letter-by-letter dropping animation - each letter drops individually
export const DroppingLetters = ({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  delay?: number 
}) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariant = {
    hidden: {
      opacity: 1,
      y: -50,
      x: 0,
      rotate: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      key={text} // Add key to force re-render on text change
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}-${Math.random()}`} // Unique key for each animation
          variants={letterVariant}
          style={{ display: "inline-block", whiteSpace: letter === " " ? "normal" : "nowrap" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Walking text animation - letters walking into position
export const WalkingText = ({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  delay?: number 
}) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      x: -20,
      y: 20,
      scale: 0.3,
      rotate: -45,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "inline-block" }}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Word-by-word dropping animation
export const AnimatedText = ({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string 
}) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: -60,
      x: Math.random() * 40 - 20,
      rotate: Math.random() * 10 - 5,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.4em", display: "inline-block" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Fade slide in from direction
export const FadeSlideIn = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale fade animation
export const ScaleFade = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating animation - smooth up and down motion
export const FloatingText = ({
  children,
  duration = 4,
  distance = 15,
}: {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
}) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};
