type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private formatMessage(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;
    let formattedMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (context && Object.keys(context).length > 0) {
      formattedMessage += ` | Context: ${JSON.stringify(context)}`;
    }
    
    if (error) {
      formattedMessage += ` | Error: ${error.message}`;
      if (this.isDevelopment) {
        formattedMessage += ` | Stack: ${error.stack}`;
      }
    }
    
    return formattedMessage;
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };

    const formattedMessage = this.formatMessage(entry);

    // In production, you might want to send logs to a service like Sentry, DataDog, etc.
    if (this.isProduction) {
      // TODO: Send to external logging service
      // For now, we'll still use console but with structured format
    }

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage);
        }
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log('error', message, context, error);
  }

  // API-specific logging methods
  apiRequest(method: string, url: string, context?: Record<string, unknown>): void {
    this.info(`API Request: ${method} ${url}`, context);
  }

  apiResponse(method: string, url: string, status: number, context?: Record<string, unknown>): void {
    const level = status >= 400 ? 'error' : 'info';
    this.log(level, `API Response: ${method} ${url} - ${status}`, context);
  }

  // Database-specific logging methods
  dbQuery(query: string, context?: Record<string, unknown>): void {
    this.debug(`DB Query: ${query}`, context);
  }

  dbError(query: string, error: Error, context?: Record<string, unknown>): void {
    this.error(`DB Error: ${query}`, error, context);
  }

  // Performance logging
  performance(operation: string, duration: number, context?: Record<string, unknown>): void {
    this.info(`Performance: ${operation} took ${duration}ms`, context);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export types for use in other files
export type { LogLevel, LogEntry };
