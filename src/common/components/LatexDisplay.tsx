import React, { useEffect, useRef } from 'react';

interface LatexTextProps {
  text: string;
  className?: string;
}

const LatexDisplay: React.FC<LatexTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = text;
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([containerRef.current])
          .then(() => {})
          .catch((err: any) => console.error('MathJax typeset failed: ', err));
      }
    }
  }, [text]);

  return <span ref={containerRef} className={className} />;
};

export default LatexDisplay;