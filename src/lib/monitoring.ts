import { logger } from './logger';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count';
  timestamp: string;
  context?: Record<string, unknown>;
}

interface ErrorReport {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  userId?: string;
  timestamp: string;
  url?: string;
  userAgent?: string;
}

class MonitoringService {
  private isProduction = process.env.NODE_ENV === 'production';
  private isDevelopment = process.env.NODE_ENV === 'development';

  // Performance monitoring
  trackPerformance(metric: Omit<PerformanceMetric, 'timestamp'>): void {
    const fullMetric: PerformanceMetric = {
      ...metric,
      timestamp: new Date().toISOString(),
    };

    logger.performance(metric.name, metric.value, metric.context);

    // In production, send to monitoring service
    if (this.isProduction) {
      this.sendToMonitoringService('performance', fullMetric);
    }
  }

  // Error tracking
  trackError(error: Error, context?: Record<string, unknown>, userId?: string): void {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      context,
      userId,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    };

    logger.error('Application Error', error, context);

    // In production, send to error tracking service
    if (this.isProduction) {
      this.sendToMonitoringService('error', errorReport);
    }
  }

  // API monitoring
  trackApiCall(method: string, url: string, duration: number, status: number, context?: Record<string, unknown>): void {
    this.trackPerformance({
      name: `api.${method.toLowerCase()}`,
      value: duration,
      unit: 'ms',
      context: {
        url,
        status,
        ...context,
      },
    });
  }

  // Database monitoring
  trackDbQuery(query: string, duration: number, context?: Record<string, unknown>): void {
    this.trackPerformance({
      name: 'db.query',
      value: duration,
      unit: 'ms',
      context: {
        query: query.substring(0, 100), // Truncate long queries
        ...context,
      },
    });
  }

  // User interaction tracking
  trackUserAction(action: string, context?: Record<string, unknown>): void {
    this.trackPerformance({
      name: `user.${action}`,
      value: 1,
      unit: 'count',
      context,
    });
  }

  // Custom metrics
  trackCustomMetric(name: string, value: number, unit: 'ms' | 'bytes' | 'count' = 'count', context?: Record<string, unknown>): void {
    this.trackPerformance({
      name,
      value,
      unit,
      context,
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; details: Record<string, unknown> }> {
    const startTime = Date.now();
    const details: Record<string, unknown> = {};

    try {
      // Check database connection
      const dbStartTime = Date.now();
      // TODO: Add actual database health check
      const dbDuration = Date.now() - dbStartTime;
      details.database = { status: 'connected', responseTime: dbDuration };

      // Check external services
      const externalStartTime = Date.now();
      // TODO: Add external service health checks
      const externalDuration = Date.now() - externalStartTime;
      details.externalServices = { status: 'healthy', responseTime: externalDuration };

      const totalDuration = Date.now() - startTime;
      details.totalResponseTime = totalDuration;

      return {
        status: 'healthy',
        details,
      };
    } catch (error) {
      logger.error('Health check failed', error as Error, details);
      return {
        status: 'unhealthy',
        details: {
          ...details,
          error: (error as Error).message,
        },
      };
    }
  }

  // Private method to send data to monitoring service
  private async sendToMonitoringService(type: 'performance' | 'error', data: PerformanceMetric | ErrorReport): Promise<void> {
    try {
      // TODO: Implement actual monitoring service integration
      // Examples: Sentry, DataDog, New Relic, etc.
      
      if (type === 'error') {
        // Example Sentry integration:
        // Sentry.captureException(new Error(data.message), {
        //   extra: data.context,
        //   user: { id: data.userId },
        // });
      }

      if (type === 'performance') {
        // Example DataDog integration:
        // datadogRum.addAction('performance', {
        //   metric: data.name,
        //   value: data.value,
        //   unit: data.unit,
        //   context: data.context,
        // });
      }
    } catch (error) {
      logger.error('Failed to send monitoring data', error as Error, { type, data });
    }
  }
}

// Export singleton instance
export const monitoring = new MonitoringService();

// Export types
export type { PerformanceMetric, ErrorReport };
