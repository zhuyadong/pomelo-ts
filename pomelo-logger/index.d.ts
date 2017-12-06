import { EventEmitter } from "events";

export interface Logger extends EventEmitter {
  readonly DEFAULT_CATEGORY: string;
  readonly level: LogLevel;
  setLevel(level: string | LogLevel): void;
  removeLevel(): void;
  log(...args: any[]): void;
  isLevelEnabled(otherLevel: LogLevel): boolean;
  isTraceEnabled(): boolean;
  isDebugEnabled(): boolean;
  isInfoEnabled(): boolean;
  isWarnEnabled(): boolean;
  isErrorEnabled(): boolean;
  isFatalEnabled(): boolean;
}

export interface LogLevel {
  readonly level: number;
  readonly levelStr: string;
  isLessThanOrEqualTo(otherLevel: LogLevel): boolean;
  isGreaterThanOrEqualTo(otherLevel: LogLevel): boolean;
  isEqualTo(otherLevel: LogLevel): boolean;
}

export function getLogger(categoryName: string): Logger;
export function getDefaultLogger(): Logger;
export function addAppender(...args: any[]): void;
export function loadAppender(appender: string, appenderModule?: any): void;
export function clearAppenders(): void;
export function configure(config: string | object, opts?: object): void;
export function replaceConsole(logger: Logger): void;
export function restoreConsole(): void;
export const levels: {
  ALL: LogLevel;
  TRACE: LogLevel;
  DEBUG: LogLevel;
  INFO: LogLevel;
  WARN: LogLevel;
  ERROR: LogLevel;
  FATAL: LogLevel;
  OFF: LogLevel;
  toLevel(level: string | LogLevel, defaultLevel: LogLevel): LogLevel;
};
export function setGlobalLogLevel(level:LogLevel):void;