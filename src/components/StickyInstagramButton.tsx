import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const StickyInstagramButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 md:right-6"
    >
      <motion.a
        href="https://instagram.com/cucinanostrard"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {/* Main button */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-dusty-rose to-sage rounded-full shadow-lg flex items-center justify-center text-white">
            <Instagram className="w-6 h-6" />
          </div>
          
          {/* Soft pulse effect */}
          <motion.div
            className="absolute inset-0 bg-dusty-rose/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Expandable text */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden ml-2"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg whitespace-nowrap">
            <span className="text-sm font-source-serif text-dark-cocoa">
              @cucinanostrard
            </span>
          </div>
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default StickyInstagramButton;
