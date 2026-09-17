// Import and initialize Vercel Speed Insights
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights when the DOM is ready
injectSpeedInsights({
    debug: false // Set to true to enable debug logging in development
});
