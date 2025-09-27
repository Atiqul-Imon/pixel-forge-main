// Performance monitoring utilities

export class PerformanceMonitor {
  private static timers = new Map<string, number>();

  static startTimer(label: string): void {
    this.timers.set(label, Date.now());
  }

  static endTimer(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      console.warn(`Timer '${label}' was not started`);
      return 0;
    }

    const duration = Date.now() - startTime;
    this.timers.delete(label);
    
    // Log slow queries (> 100ms)
    if (duration > 100) {
      console.warn(`Slow operation detected: ${label} took ${duration}ms`);
    }
    
    return duration;
  }

  static measureAsync<T>(
    label: string,
    operation: () => Promise<T>
  ): Promise<T> {
    this.startTimer(label);
    return operation().finally(() => {
      this.endTimer(label);
    });
  }

  static logQuery(label: string, query: any, duration: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[QUERY] ${label}: ${duration}ms`, {
        query: typeof query === 'string' ? query : JSON.stringify(query),
        duration
      });
    }
  }
}

// Database query wrapper with performance monitoring
export async function withPerformanceMonitoring<T>(
  label: string,
  query: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();
  
  try {
    const result = await query();
    const duration = Date.now() - startTime;
    
    PerformanceMonitor.logQuery(label, 'query', duration);
    
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[QUERY ERROR] ${label}: ${duration}ms`, error);
    throw error;
  }
}

// API response time middleware
export function logApiResponseTime(route: string, duration: number): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] ${route}: ${duration}ms`);
  }
  
  // Log slow API calls (> 500ms)
  if (duration > 500) {
    console.warn(`Slow API call detected: ${route} took ${duration}ms`);
  }
}

export default PerformanceMonitor;
