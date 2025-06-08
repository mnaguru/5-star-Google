# Troubleshooting Guide

## Common Issues and Solutions

### Build Issues

#### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript compilation errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update TypeScript
npm update typescript
```

#### Vite build failures
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Runtime Issues

#### Stars not clickable
- Check if event handlers are properly attached
- Verify no CSS is blocking pointer events
- Test in different browsers

#### Redirects not working
- Verify external URLs are accessible
- Check browser console for errors
- Test with different browsers (popup blockers)

#### Form submission issues
- Check form validation logic
- Verify all required fields are present
- Test with different input combinations

#### Animations not smooth
- Check if hardware acceleration is enabled
- Reduce animation complexity for low-end devices
- Test on different screen sizes

### Performance Issues

#### Slow page load
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/assets/*.js
```

#### Memory leaks
- Check for uncleared intervals/timeouts
- Verify useEffect cleanup functions
- Monitor browser dev tools memory tab

### Browser Compatibility

#### Internet Explorer (if required)
- Add polyfills for modern JavaScript features
- Test CSS Grid and Flexbox fallbacks
- Consider using Babel for broader compatibility

#### Safari issues
- Test CSS backdrop-filter support
- Verify touch events on mobile Safari
- Check for WebKit-specific bugs

### Mobile Issues

#### Touch responsiveness
- Increase touch target sizes (minimum 44px)
- Test on actual devices, not just browser dev tools
- Verify hover states don't interfere with touch

#### Viewport issues
```html
<!-- Ensure proper viewport meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Deployment Issues

#### 404 errors on refresh
- Configure hosting for SPA routing
- Add `_redirects` file for Netlify:
```
/*    /index.html   200
```

#### HTTPS mixed content warnings
- Ensure all external resources use HTTPS
- Check for hardcoded HTTP URLs
- Verify CSP headers if implemented

#### Domain not resolving
- Check DNS propagation (can take up to 48 hours)
- Verify CNAME records are correct
- Test with different DNS servers

### External Service Issues

#### Yelp redirect not working
- Verify Yelp URL is still valid
- Test URL accessibility from different networks
- Check for any URL encoding issues

#### Company website redirect failing
- Confirm assetgrowth.associates is accessible
- Test redirect timing and countdown
- Verify no ad blockers are interfering

### Development Environment Issues

#### Hot reload not working
```bash
# Restart development server
npm run dev

# Clear browser cache
# Check for firewall blocking port 5173
```

#### ESLint errors
```bash
# Fix auto-fixable issues
npm run lint -- --fix

# Update ESLint configuration if needed
```

### Debugging Tools

#### Browser Developer Tools
- Console: Check for JavaScript errors
- Network: Monitor API calls and resource loading
- Performance: Analyze runtime performance
- Application: Check local storage and session data

#### React Developer Tools
- Install React DevTools browser extension
- Inspect component state and props
- Profile component render performance

#### Lighthouse Audits
```bash
# Run Lighthouse audit
npx lighthouse http://localhost:5173 --view
```

### Getting Help

#### Log Collection
When reporting issues, include:
- Browser version and operating system
- Console error messages
- Network tab screenshots
- Steps to reproduce the issue

#### Support Channels
- GitHub Issues: For code-related problems
- Hosting Provider Support: For deployment issues
- Community Forums: For general React/Vite questions

### Emergency Procedures

#### Site Down
1. Check hosting provider status
2. Verify DNS resolution
3. Test from multiple locations
4. Implement maintenance page if needed

#### Data Loss Prevention
- Regular backups of form submissions (when database is implemented)
- Version control for all code changes
- Document all configuration changes

#### Security Incidents
- Immediately change all API keys and passwords
- Review access logs for suspicious activity
- Update dependencies to latest secure versions
- Consider temporary site shutdown if compromised