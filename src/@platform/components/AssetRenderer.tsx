/**
 * @platform/components/AssetRenderer.tsx
 * Generic asset renderer component
 * Works with any asset registry passed as prop or context
 */

import React from 'react';

/**
 * Asset type - can be SVG component, URL, or any renderable asset
 */
export type Asset = React.ComponentType<React.SVGProps<SVGSVGElement>> | string;

/**
 * Props for AssetRenderer
 */
interface AssetRendererProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  size?: number | string;
  registry?: Record<string, Asset>;
  fallback?: React.ReactNode;
}

let globalAssetRegistry: Record<string, Asset> = {};

export function setGlobalAssetRegistry(registry: Record<string, Asset>): void {
  globalAssetRegistry = registry;
}

/**
 * Generic asset renderer component
 * Renders SVG components or URLs from a provided registry
 *
 * @param id - Asset identifier
 * @param size - Optional size (width and height)
 * @param registry - Map of asset IDs to assets
 * @param fallback - Fallback content if asset not found
 * @param props - Additional SVG props
 */
export const AssetRenderer: React.FC<AssetRendererProps> = ({
  id,
  size,
  registry,
  fallback,
  ...props
}) => {
  const resolvedRegistry = registry || globalAssetRegistry;
  const asset = resolvedRegistry[id];

  if (!asset) {
    console.warn(`[AssetRenderer] Asset with id "${id}" not found in registry.`);
    return fallback ? <>{fallback}</> : null;
  }

  const style = size ? { width: size, height: size, ...props.style } : props.style;

  // If asset is a string (URL), render as img
  if (typeof asset === 'string') {
    return (
      <img
        src={asset}
        alt={id}
        className={props.className}
        style={style as React.CSSProperties}
      />
    );
  }

  // Otherwise treat as React component
  const Component = asset;
  return <Component {...props} style={style} />;
};
