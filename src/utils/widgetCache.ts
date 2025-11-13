/**
 * Widget caching utility for bridge pages
 * Provides in-memory caching with TTL for widget HTML content
 */

interface WidgetParams {
    account?: any;
    type?: any;
    minor?: any;
    member?: any;
    productcode?: any;
    atLimit?: any;
    scenario?: any;
    loanPurpose?: any;
    productQuestion?: any;
}

interface CacheEntry {
    html: string;
    expires: number;
    created: number;
}

class WidgetCache {
    private cache: Map<string, CacheEntry> = new Map();
    private ttl: number = 60 * 60 * 1000; // 60 minutes TTL
    private maxSize: number = 100; // Maximum cache entries

    /**
     * Generate cache key from widget parameters
     */
    generateKey(params: WidgetParams): string {
        const { account, type, minor, member, productcode, atLimit, scenario, loanPurpose, productQuestion } = params;
        return `widget_${account}_${type}_${minor}_${member}_${productcode}_${atLimit}_${scenario}_${loanPurpose}_${productQuestion}`;
    }

    /**
     * Get cached widget HTML
     */
    get(params: WidgetParams): string | null {
        const key = this.generateKey(params);
        const cached = this.cache.get(key);
        
        if (!cached) {
            return null;
        }

        // Check if expired
        if (Date.now() > cached.expires) {
            this.cache.delete(key);
            return null;
        }

        return cached.html;
    }

    /**
     * Set widget HTML in cache
     */
    set(params: WidgetParams, html: string): void {
        const key = this.generateKey(params);
        
        // Implement LRU eviction if at max size
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
            }
        }

        this.cache.set(key, {
            html,
            expires: Date.now() + this.ttl,
            created: Date.now()
        });
    }

    /**
     * Clear cache for specific account
     */
    clearAccount(account: string): void {
        for (const [key] of this.cache) {
            if (key.includes(`_${account}_`)) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Clear entire cache
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Get cache stats
     */
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            ttl: this.ttl
        };
    }

    /**
     * Clean expired entries
     */
    cleanup(): void {
        const now = Date.now();
        for (const [key, value] of this.cache) {
            if (now > value.expires) {
                this.cache.delete(key);
            }
        }
    }
}

// Export singleton instance
const widgetCache = new WidgetCache();

// Clean up expired entries every 2 minutes
setInterval(() => {
    widgetCache.cleanup();
}, 2 * 60 * 1000);

export default widgetCache;