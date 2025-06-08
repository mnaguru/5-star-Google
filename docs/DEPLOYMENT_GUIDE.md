# Deployment Guide

## Quick Deployment Checklist

### Pre-Deployment
- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Verify all external URLs are accessible
- [ ] Check domain DNS configuration
- [ ] Ensure SSL certificate is ready

### Netlify Deployment

#### Method 1: Drag and Drop
1. Run `npm run build`
2. Go to [Netlify](https://app.netlify.com)
3. Drag the `dist` folder to the deployment area
4. Configure custom domain: ratemojo.top

#### Method 2: Git Integration
1. Connect GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
3. Deploy automatically on git push

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure domain
vercel domains add ratemojo.top
```

### AWS S3 + CloudFront
```bash
# Build the project
npm run build

# Sync to S3 bucket
aws s3 sync dist/ s3://ratemojo-bucket --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id ABCDEFGHIJK --paths "/*"
```

### Domain Configuration

#### DNS Settings for ratemojo.top
```
Type: CNAME
Name: @
Value: [hosting-provider-url]
TTL: 300

Type: CNAME  
Name: www
Value: ratemojo.top
TTL: 300
```

#### SSL Certificate
- Most hosting providers offer automatic SSL
- Ensure HTTPS redirect is enabled
- Test certificate with SSL Labs

### Post-Deployment Verification
- [ ] Site loads at https://ratemojo.top
- [ ] All star ratings are functional
- [ ] 5-star rating redirects to Yelp
- [ ] Feedback form submits successfully
- [ ] Mobile responsiveness works
- [ ] Page load speed < 3 seconds

### Rollback Procedure
1. Keep previous build in `dist-backup/`
2. For quick rollback: replace `dist/` with `dist-backup/`
3. For git-based deployments: revert commit and redeploy

### Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry)
- Monitor Core Web Vitals (PageSpeed Insights)