import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1
          }
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </ThemeProvider>
  );
}
