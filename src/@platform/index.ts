/**
 * @platform/index.ts
 * Central export point for all platform layer APIs
 */

// Types
export * from './types/game';
export * from './types/economy';
export * from './types/event';

// Bridge
export type {
  GameConfigPayload,
  ShopConfigPayload,
  ThemeConfigPayload,
  EventConfigPayload,
  EnvironmentPayload,
  QuestionPoolPayload,
  HubConfigPayload,
  GameResultPayload,
  GamePurchasePayload,
  GameReadyPayload,
  GameOutboundMessage,
  GameInboundMessage,
} from './bridge/types';
export * from './bridge/receiver';
export * from './bridge/sender';

// Config
export * from './config/types';
export * from './config/manager';
export * from './config/context';

// Engine
export * from './engine/timer';
export * from './engine/prize';
export * from './engine/event-runtime';

// Theme
export * from './theme/types';
export * from './theme/applier';
export * from './theme/Provider';

// State
export * from './state/contracts';

// Components
export { AssetRenderer } from './components/AssetRenderer';
export { BaseButton } from './components/BaseButton';
export { ErrorBoundary } from './components/ErrorBoundary';
export { LoadingScreen } from './components/LoadingScreen';
export { default as LatexDisplay } from './components/LatexDisplay';
export { DarkModalFrame } from './components/DarkModalFrame';

// Hooks
export * from './hooks/useFullscreen';
export * from './hooks/useScaler';
export * from './hooks/useTimer';

// Audio
export { BaseAudioEngine } from './audio/BaseAudioEngine';

// Utils
export * from './utils/shuffle';
