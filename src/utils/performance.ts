/**
 * Performance utilities
 */

/**
 * Lazy load images
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        image.src = src;
        image.classList.remove('lazy');
        observer.unobserve(image);
      }
    });
  });

  imageObserver.observe(img);
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Measure performance
 */
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
    return end - start;
  }
  fn();
  return 0;
}

/**
 * Request animation frame wrapper
 */
export function raf(callback: () => void) {
  if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    return requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16);
}

/**
 * Cancel animation frame
 */
export function cancelRaf(id: number) {
  if (typeof window !== 'undefined' && 'cancelAnimationFrame' in window) {
    cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Throttle using requestAnimationFrame
 */
export function throttleRAF<T extends (...args: any[]) => any>(fn: T): T {
  let rafId: number | null = null;
  let lastArgs: Parameters<T>;

  const throttled = (...args: Parameters<T>) => {
    lastArgs = args;
    if (rafId === null) {
      rafId = raf(() => {
        fn(...lastArgs);
        rafId = null;
      });
    }
  };

  return throttled as T;
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get scroll position
 */
export function getScrollPosition(): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

