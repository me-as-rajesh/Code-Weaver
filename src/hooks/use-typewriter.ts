"use client";

import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed: number = 5) {
  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeouts when the text changes
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    
    setDisplayText('');
    if (!text) return;

    let i = 0;
    const typeCharacter = () => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
        timeoutRef.current = setTimeout(typeCharacter, speed);
      }
    };

    typeCharacter();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed]);

  return displayText;
}
