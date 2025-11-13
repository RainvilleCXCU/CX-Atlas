/**
 * Product caching utility for bridge pages
 * Provides in-memory caching with longer TTL for product data
 */

interface Product {
    id: string;
    title: string;
    displayName: string;
    memberApplyNowURL: string;
    memberQuickApplyURL: string;
    memberQuickApplyMobileURL: string;
    minorMemberApplyNowURL: string;
    minorNonMemberApplyNowURL: string;
    nonMemberApplyNowURL: string;
    hasProductQuestion: boolean;
    productPageURL: string;
    limitedProductCodes: string[];
}

interface ProductCacheEntry {
    product: Product;
    expires: number;
    created: number;
}

class ProductCache {
    private cache: Map<string, ProductCacheEntry> = new Map();
    private ttl: number = 15 * 60 * 1000; // 15 minutes TTL (products change less frequently)
    private maxSize: number = 50; // Maximum product entries

    /**
     * Generate cache key from account name
     */
    generateKey(account?: any): string {
        return `product_${account?.toLowerCase().replace(/\s+/g, '-')}`;
    }

    /**
     * Get cached product data
     */
    get(account?: any): Product | null {
        const key = this.generateKey(account);
        const cached = this.cache.get(key);
        
        if (!cached) {
            return null;
        }

        // Check if expired
        if (Date.now() > cached.expires) {
            this.cache.delete(key);
            return null;
        }

        return cached.product;
    }

    /**
     * Set product data in cache
     */
    set(account: any, product: Product): void {
        const key = this.generateKey(account);
        
        // Implement LRU eviction if at max size
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
            }
        }

        this.cache.set(key, {
            product,
            expires: Date.now() + this.ttl,
            created: Date.now()
        });
    }

    /**
     * Clear cache for specific product
     */
    clearProduct(account: string): void {
        const key = this.generateKey(account);
        this.cache.delete(key);
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
const productCache = new ProductCache();

// Clean up expired entries every 5 minutes
setInterval(() => {
    productCache.cleanup();
}, 5 * 60 * 1000);

export default productCache;