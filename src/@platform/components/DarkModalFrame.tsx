/**
 * @platform/components/DarkModalFrame.tsx
 * Reusable dark modal frame component for dialogs
 */

import React from 'react';

interface DarkModalFrameProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  maxWidth?: string;
  showCloseButton?: boolean;
}

/**
 * Dark modal frame for displaying dialogs
 * Uses a dark background with centered white content
 *
 * @param isOpen - Whether modal is visible
 * @param title - Optional modal title
 * @param children - Modal content
 * @param onClose - Callback when closing
 * @param maxWidth - CSS max-width for modal content
 * @param showCloseButton - Whether to show close button
 */
export const DarkModalFrame: React.FC<DarkModalFrameProps> = ({
  isOpen,
  title,
  children,
  onClose,
  maxWidth = '600px',
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        className="relative bg-zinc-900 rounded-lg border-2 border-zinc-700 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ maxWidth }}
      >
        {/* Header */}
        {title && (
          <div className="sticky top-0 bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 text-white">
          {children}
        </div>

        {/* Optional close button overlay for background click */}
        {onClose && (
          <div
            className="fixed inset-0 -z-10"
            onClick={onClose}
            aria-label="Close modal backdrop"
          />
        )}
      </div>
    </div>
  );
};
