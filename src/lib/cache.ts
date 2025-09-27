// Simple in-memory cache implementation
// In production, replace with Redis

interface CacheItem {
  value: any;
  expires: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem>();
  private defaultTTL = 300; // 5 minutes

  set(key: string, value: any, ttl: number = this.defaultTTL): void {
    const expires = Date.now() + (ttl * 1000);
    this.cache.set(key, { value, expires });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Create singleton instance
const cache = new MemoryCache();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  cache.cleanup();
}, 5 * 60 * 1000);

export default cache;

// Cache key generators
export const cacheKeys = {
  blogPosts: (filter: any, page: number, limit: number) => 
    `blog_posts_${JSON.stringify(filter)}_${page}_${limit}`,
  
  blogPost: (slug: string) => 
    `blog_post_${slug}`,
  
  user: (userId: string) => 
    `user_${userId}`,
  
  userByEmail: (email: string) => 
    `user_email_${email}`,
  
  messages: () => 
    'admin_messages',
  
  contact: (id: string) => 
    `contact_${id}`,
};

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
  BLOG_POSTS: 300, // 5 minutes
  BLOG_POST: 600, // 10 minutes
  USER: 1800, // 30 minutes
  MESSAGES: 60, // 1 minute
  CONTACT: 300, // 5 minutes
};
