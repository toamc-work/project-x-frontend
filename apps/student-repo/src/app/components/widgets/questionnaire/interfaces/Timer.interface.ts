export interface TimerProps {
  expiryTimestamp: number;
  onExpire: () => void;
}
