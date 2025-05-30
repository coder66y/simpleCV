/**
 * 性能监控工具
 */

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fmp: number; // First Meaningful Paint
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<PerformanceMetrics> = {};

  private constructor() {
    this.init();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private init() {
    if (window.performance) {
      // 监听性能指标
      this.observePerformanceMetrics();
      // 监听资源加载
      this.observeResourceTiming();
    }
  }

  private observePerformanceMetrics() {
    if ('PerformanceObserver' in window) {
      // FCP
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          this.metrics.fcp = entries[0].startTime;
        }
      }).observe({ entryTypes: ['paint'] });

      // LCP
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          this.metrics.lcp = entries[entries.length - 1].startTime;
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          this.metrics.fid = entries[0].duration;
        }
      }).observe({ entryTypes: ['first-input'] });

      // CLS
      new PerformanceObserver(entryList => {
        let clsValue = 0;
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  private observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
          if (entry.initiatorType === 'navigation') {
            this.metrics.ttfb = entry.responseStart - entry.requestStart;
            this.metrics.fmp = entry.responseEnd - entry.startTime;
          }
        }
      }).observe({ entryTypes: ['resource'] });
    }
  }

  /**
   * 获取性能指标
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * 记录性能指标
   */
  logMetrics() {
    console.log('Performance Metrics:', this.metrics);
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
