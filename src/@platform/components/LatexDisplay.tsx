/**
 * @platform/components/LatexDisplay.tsx
 * Component to render LaTeX/MathJax content
 */

import React, { useEffect, useRef } from 'react';

interface LatexDisplayProps {
  text: string;
  className?: string;
}

/**
 * Component to render LaTeX content using MathJax
 * Requires MathJax to be loaded in the page
 *
 * @param text - LaTeX content to render
 * @param className - CSS classes to apply
 */
const LatexDisplay: React.FC<LatexDisplayProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = text;

      // Typeset with MathJax if available
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([containerRef.current])
          .then(() => {})
          .catch((err: any) => console.error('MathJax typeset failed:', err));
      }
    }
  }, [text]);

  return <span ref={containerRef} className={className} />;
};

export default LatexDisplay;
