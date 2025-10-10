# 🧪 Local Development Workflow for Announcements

## Quick Setup

### 1. Start Local Server
```bash
cd /Users/punctum/dev/ProximatorApp/pxapp-config-cdn
./start-dev-server.sh
```

This will serve files at: `http://localhost:8000`

### 2. Enable Local Mode in Flutter App
**File**: `lib/services/announcement_service.dart`
**Line**: ~11

```dart
static const bool _useLocalServer = true; // Change false → true
```

### 3. Edit Test Announcements
Edit `dev-announcements.json` (not the production `announcements.json`)

### 4. Test in App
- Run Flutter app
- Announcements will load from your local file
- Make changes → refresh app to see updates

### 5. When Ready for Production
1. **Copy changes** from `dev-announcements.json` to `announcements.json`
2. **Switch back to production**: Set `_useLocalServer = false`
3. **Commit and push** to GitHub

## Development Files

- `dev-announcements.json` - Local testing file (never commit to production)
- `announcements.json` - Production file (what users see)
- `start-dev-server.sh` - Convenience script

## Testing Different Scenarios

### Test App Update Notification
```json
{
  "id": "test_update",
  "title": "Test: Update Available",
  "cta_action": "open_app_store",
  "show_conditions": {
    "min_app_version": "1.0.0",
    "max_app_version": "1.0.99"
  }
}
```

### Test Pro Upgrade
```json
{
  "id": "test_pro",
  "title": "Test: Unlock Pro",
  "cta_action": "open_pro_upgrade",
  "show_conditions": {
    "user_segments": ["free"]
  }
}
```

### Test Banner (Non-Modal)
```json
{
  "id": "test_banner",
  "type": "banner",
  "title": "Test Banner",
  "message": "This appears as an inline banner"
}
```

## Quick Reset (Clear Cache)

If announcements aren't updating:

1. **Clear app cache**: Delete and reinstall app
2. **Or change announcement ID**: `test_1` → `test_2`
3. **Or reduce max_shows**: Set to higher number

## Production Deployment Checklist

- [ ] Test locally with `_useLocalServer = true`
- [ ] Verify CTA actions work correctly
- [ ] Check version targeting works
- [ ] Copy final JSON from `dev-announcements.json` → `announcements.json`
- [ ] Set `_useLocalServer = false`
- [ ] Commit and push to GitHub
- [ ] Verify live at: https://patrokiras.github.io/pxapp-config-cdn/announcements.json

## Troubleshooting

### "Connection refused" error
- Make sure dev server is running: `./start-dev-server.sh`
- Check URL in browser: http://localhost:8000/dev-announcements.json

### Announcements not updating
- Change the announcement `id` to force refresh
- Clear app cache (reinstall)
- Check Flutter console for fetch errors

### App Store button not working
- Verify `cta_action: "open_app_store"`
- Update App Store URL after publishing

## File Structure
```
pxapp-config-cdn/
├── announcements.json          # 🔴 PRODUCTION (live users)
├── dev-announcements.json      # 🟡 DEVELOPMENT (local testing)
├── start-dev-server.sh         # 🔧 Dev server script
├── README.md                   # 📚 Production documentation
└── DEVELOPMENT.md              # 🧪 This file
```

Remember: Always test locally before pushing to production! 🚀