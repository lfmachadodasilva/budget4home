'use client';

import { ANIMATION_DELAY } from '@/utils/constants';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const B4hFade = ({
  children,
  direction = 'up',
  delay = ANIMATION_DELAY,
  duration = 0.5
}: {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    variants={{
      hidden: {
        opacity: 0,
        y: direction === 'up' ? 15 : direction === 'down' ? -15 : 0,
        x: direction === 'right' ? -15 : direction === 'left' ? 15 : 0
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0
      },
      exit: {
        opacity: 0,
        y: direction === 'up' ? 15 : direction === 'down' ? -15 : 0,
        x: direction === 'right' ? -15 : direction === 'left' ? 15 : 0
      }
    }}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    viewport={{ once: true }}
    transition={{ delay, type: 'spring', duration }}
  >
    {children}
  </motion.div>
);
