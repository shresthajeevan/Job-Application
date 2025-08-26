# JobApp Frontend

This is an Angular application with Server-Side Rendering (SSR) capabilities.

## Development Commands

### For Client-Side Development (Recommended for most development)
```bash
npm run dev
# or
ng serve
```
This will start only the client-side development server on port 4200.

### For Server-Side Rendering Testing
```bash
# Build both client and server bundles
npm run build:ssr

# Serve the SSR application
npm run serve:ssr
```
This will start the Express server on port 4000 with SSR capabilities.

### For Static Site Generation
```bash
npm run prerender
```
This will generate static HTML files for all routes.

## Avoiding Dual URL Issues

**IMPORTANT**: Don't run both `ng serve` and the SSR server simultaneously. Choose one approach:

- **Use `npm run dev`** for regular development (single URL on port 4200)
- **Use `npm run serve:ssr`** for SSR testing (single URL on port 4000)

## Ports

- **Client Dev Server**: http://localhost:4200
- **SSR Server**: http://localhost:4000

## Troubleshooting

If you see two URLs opening:
1. **Use the updated scripts**: Always use `npm run dev` or `npm run start` instead of `ng serve`
2. **Check for multiple processes**: Run `ps aux | grep "ng serve"` to see if multiple instances are running
3. **Kill existing processes**: Use `pkill -f "ng serve"` to stop all Angular dev servers
4. **Manual browser opening**: After starting the server, manually open `http://localhost:4200` in your browser
5. **Check browser tabs**: Make sure your browser isn't configured to open multiple tabs automatically

## Common Issues

### Dual URL Problem
- **Cause**: Angular CLI auto-opening browser + potential SSR configuration conflicts
- **Solution**: Use `npm run dev` (which includes `--no-open` flag) or manually open browser
- **Alternative**: Run `ng serve --no-open` directly

### Port Conflicts
- **Port 4200**: Angular dev server (client-side)
- **Port 4000**: SSR server (if running `npm run serve:ssr`)
- **Solution**: Only run one server at a time
