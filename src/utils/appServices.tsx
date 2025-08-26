// Types and Interfaces
interface AppRatingServiceConfig {
  cacheTime?: number;
  apiKey?: string;
  baseUrl?: string;
  maxRequestsPerMinute?: number;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface AppRating {
  rating: number;
  reviewCount: number;
  appName: string;
  version?: string;
  platform: 'iOS' | 'Android';
}

interface AppleAppData {
  averageUserRating?: number;
  userRatingCount?: number;
  trackName?: string;
  version?: string;
}

interface AppleApiResponse {
  results: AppleAppData[];
}

interface BothRatingsResult {
  apple?: AppRating;
  google?: AppRating;
}

type Platform = 'apple' | 'google';

// Custom Error Classes
class AppRatingError extends Error {
  constructor(
    message: string,
    public readonly platform: Platform,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'AppRatingError';
  }
}

// API Service Class
class AppRatingService {
  private readonly cache: Map<string, CacheItem<AppRating>>;
  private readonly cacheTime: number;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly maxRequestsPerMinute: number;

  constructor(config: AppRatingServiceConfig = {}) {
    this.cache = new Map();
    this.cacheTime = config.cacheTime || 3600000; // 1 hour
    this.apiKey = config.apiKey || '';
    this.baseUrl = config.baseUrl || '';
    this.maxRequestsPerMinute = config.maxRequestsPerMinute || 60;
  }

  // Cache helper methods
  private getCacheKey(platform: Platform, id: string): string {
    return `${platform}_${id}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTime;
  }

  private getFromCache(key: string): AppRating | null {
    const item = this.cache.get(key);
    return item && this.isCacheValid(item.timestamp) ? item.data : null;
  }

  private setCache(key: string, data: AppRating): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Cache management
  public clearExpiredCache(): void {
    for (const [key, value] of this.cache.entries()) {
      if (!this.isCacheValid(value.timestamp)) {
        this.cache.delete(key);
      }
    }
  }

  public clearAllCache(): void {
    this.cache.clear();
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  // Fetch Apple App Store rating (free iTunes API)
  async fetchAppleRating(appId: string): Promise<AppRating> {
    if (!appId || typeof appId !== 'string') {
      throw new AppRatingError('Invalid Apple App ID provided', 'apple', 'INVALID_ID');
    }

    const cacheKey = this.getCacheKey('apple', appId);
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=US`);
      
      if (!response.ok) {
        throw new AppRatingError(
          `HTTP error! status: ${response.status}`,
          'apple',
          `HTTP_${response.status}`
        );
      }
      
      const data: AppleApiResponse = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new AppRatingError('App not found', 'apple', 'APP_NOT_FOUND');
      }

      const app = data.results[0];
      const result: AppRating = {
        rating: Number(app.averageUserRating) || 0,
        reviewCount: Number(app.userRatingCount) || 0,
        appName: app.trackName || 'Unknown App',
        version: app.version || 'Unknown',
        platform: 'iOS'
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      if (error instanceof AppRatingError) {
        throw error;
      }
      
      console.error(`Error fetching Apple rating for ${appId}:`, error);
      throw new AppRatingError(
        `Failed to fetch Apple rating: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'apple',
        'FETCH_ERROR'
      );
    }
  }

  // Mock Google Play rating (replace with actual third-party API)
  async fetchGooglePlayRating(packageName: string): Promise<AppRating> {
    if (!packageName || typeof packageName !== 'string') {
      throw new AppRatingError('Invalid Google Play package name provided', 'google', 'INVALID_PACKAGE');
    }

    const cacheKey = this.getCacheKey('google', packageName);
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      // Simulating API call - replace with actual third-party service
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API response
      const mockData: AppRating = {
        rating: Number((4.2 + Math.random() * 0.8).toFixed(1)),
        reviewCount: Math.floor(Math.random() * 100000) + 10000,
        appName: `Sample Android App`,
        platform: 'Android'
      };

      this.setCache(cacheKey, mockData);
      return mockData;
    } catch (error) {
      console.error(`Error fetching Google Play rating for ${packageName}:`, error);
      throw new AppRatingError(
        `Failed to fetch Google Play rating: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'google',
        'FETCH_ERROR'
      );
    }
  }

  // Fetch both ratings
  async fetchBothRatings(appleId?: string, googlePackage?: string): Promise<BothRatingsResult> {
    if (!appleId && !googlePackage) {
      throw new Error('At least one app identifier must be provided');
    }

    const promises: Promise<AppRating>[] = [];
    const platformMap: Platform[] = [];
    
    if (appleId) {
      promises.push(this.fetchAppleRating(appleId));
      platformMap.push('apple');
    }
    
    if (googlePackage) {
      promises.push(this.fetchGooglePlayRating(googlePackage));
      platformMap.push('google');
    }
    
    try {
      const results = await Promise.allSettled(promises);
      const ratings: BothRatingsResult = {};
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const platform = platformMap[index];
          ratings[platform] = result.value;
        } else {
          console.warn(`Failed to fetch ${platformMap[index]} rating:`, result.reason);
        }
      });
      
      return ratings;
    } catch (error) {
      throw new Error(`Error fetching ratings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Utility method to get average rating across platforms
  getAverageRating(ratings: BothRatingsResult): number | null {
    const validRatings = Object.values(ratings)
      .filter((rating): rating is AppRating => rating !== undefined)
      .map(rating => rating.rating)
      .filter(rating => rating > 0);

    if (validRatings.length === 0) return null;
    
    return Number((validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length).toFixed(1));
  }

  // Utility method to get total review count across platforms
  getTotalReviewCount(ratings: BothRatingsResult): number {
    return Object.values(ratings)
      .filter((rating): rating is AppRating => rating !== undefined)
      .reduce((total, rating) => total + rating.reviewCount, 0);
  }
}

export { 
  AppRatingService, 
  AppRatingError, 
  type AppRatingServiceConfig, 
  type AppRating, 
  type BothRatingsResult,
  type Platform 
};