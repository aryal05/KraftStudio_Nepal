import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

/**
 * Flying Product Animation
 * Products fly in from random directions when appearing in search results
 */
export const FlyingProduct = ({
  children,
  index = 0,
  delay = 0,
}: {
  children: ReactNode;
  index?: number;
  delay?: number;
}) => {
  const directions = [
    { x: -100, y: -50, rotate: -15 },
    { x: 100, y: -50, rotate: 15 },
    { x: -50, y: -100, rotate: -10 },
    { x: 50, y: -100, rotate: 10 },
  ];

  const direction = directions[index % directions.length];

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
        ...direction,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        x: direction.x / 2,
        y: direction.y / 2,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay + index * 0.05,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Search Result Animation
 * Smooth slide and fade for search results
 */
export const SearchResultItem = ({
  children,
  index = 0,
}: {
  children: ReactNode;
  index?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.95 }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Card Hover Float Effect
 * Cards slightly float up on hover with shadow
 */
export const FloatingCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered Grid Animation
 * Grid items appear in a staggered wave pattern
 */
export const StaggeredGrid = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredGridItem = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Shimmer Loading Effect
 * Skeleton loader with shimmer animation
 */
export const ShimmerLoader = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
}: {
  width?: string;
  height?: string;
  borderRadius?: string;
}) => {
  return (
    <motion.div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["200% 0", "-200% 0"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

/**
 * Number Counter Animation
 * Animates number changes smoothly
 */
export const CounterAnimation = ({
  value,
  duration = 1,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: duration * 0.5 }}
      className={className}
    >
      {value}
    </motion.span>
  );
};

/**
 * Slide In Panel
 * Panel slides in from the side
 */
export const SlideInPanel = ({
  children,
  from = "right",
  isOpen = true,
}: {
  children: ReactNode;
  from?: "left" | "right" | "top" | "bottom";
  isOpen?: boolean;
}) => {
  const variants = {
    left: { x: "-100%" },
    right: { x: "100%" },
    top: { y: "-100%" },
    bottom: { y: "100%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={variants[from]}
          animate={{ x: 0, y: 0 }}
          exit={variants[from]}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Pulsing Badge
 * Badge with pulsing animation for notifications
 */
export const PulsingBadge = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Smooth Height Animation
 * Animates height changes smoothly
 */
export const SmoothHeight = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={false}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Notification Toast Animation
 * Toast notification slide in from top
 */
export const NotificationToast = ({
  children,
  isVisible = true,
}: {
  children: ReactNode;
  isVisible?: boolean;
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Tab Switch Animation
 * Smooth transition between tabs
 */
export const TabContent = ({
  children,
  activeTab,
  tabId,
}: {
  children: ReactNode;
  activeTab: string;
  tabId: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      {activeTab === tabId && (
        <motion.div
          key={tabId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Progress Bar Animation
 * Animated progress bar with smooth fill
 */
export const ProgressBar = ({
  progress,
  color = "#10b981",
  height = "8px",
  className = "",
}: {
  progress: number;
  color?: string;
  height?: string;
  className?: string;
}) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        style={{
          height: "100%",
          backgroundColor: color,
        }}
      />
    </div>
  );
};

/**
 * Spin Animation
 * Continuous spinning animation
 */
export const SpinLoader = ({
  size = 24,
  color = "#2d4a3e",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className={className}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </motion.div>
  );
};

/**
 * Bounce In Animation
 * Element bounces in on mount
 */
export const BounceIn = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Ripple Effect
 * Click ripple effect on buttons
 */
export const RippleButton = ({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.span
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-white rounded-full"
      />
      {children}
    </motion.button>
  );
};
