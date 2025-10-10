# Proximator Announcement Configuration

This repository hosts the announcement configuration for the Proximator app.

## Files

- `announcements.json` - Main announcement configuration file
- `v1.json` - Legacy file (can be deleted after migration)

## URL Structure

**Live URL**: `https://patrokiras.github.io/pxapp-config-cdn/announcements.json`

## How to Update Announcements

1. **Edit `announcements.json`** in GitHub web interface
2. **Commit changes** - deploys automatically in ~1 minute
3. **App fetches updates** on next launch (or within 1 hour)

## App Store URL Configuration

**Important**: Before publishing, update the App Store URL in the app code:

**File**: `lib/services/announcement_checker.dart`
**Line**: ~126
**Current**: `https://apps.apple.com/app/proximator/id[YOUR_APP_ID]`
**Update to**: `https://apps.apple.com/app/proximator/id1234567890` (your actual app ID)

### How to Get Your App Store URL:
1. **After App Store submission** → Get your app ID from App Store Connect
2. **URL format**: `https://apps.apple.com/app/proximator/id[YOUR_APP_ID]`
3. **Update the code** with your real URL

## Example Announcement Types

### App Update Announcement
```json
{
  "id": "app_update_v1_2",
  "type": "modal",
  "title": "New Update Available!",
  "message": "Version 1.2 includes new features...",
  "cta_text": "Go App Store",
  "cta_action": "open_app_store",
  "show_conditions": {
    "min_app_version": "1.0.0",
    "max_app_version": "1.1.99",
    "max_shows": 2
  }
}
```

### Feature Announcement
```json
{
  "id": "new_pro_features",
  "type": "modal",
  "title": "Unlock Pro Features",
  "message": "Get unlimited exports and custom LUTs...",
  "cta_text": "Learn More",
  "cta_action": "open_pro_upgrade",
  "show_conditions": {
    "user_segments": ["free"],
    "max_shows": 3
  }
}
```

### Tips & Tricks
```json
{
  "id": "workflow_tip_1",
  "type": "banner",
  "title": "Pro Tip",
  "message": "Use custom LUTs for cinematic color grading",
  "show_conditions": {
    "user_segments": ["pro"],
    "max_shows": 1
  }
}
```

## Available CTA Actions

- `open_app_store` - Opens app in App Store for updates
- `open_pro_upgrade` - Navigate to Pro upgrade screen (future)
- `open_settings` - Navigate to Settings (future)
- `open_tutorial` - Open help/tutorial (future)
- `dismiss` - Just dismiss (no action)

## User Segments

- `["all"]` - Show to everyone
- `["free"]` - Free users only
- `["pro"]` - Pro users only
- `["new_user"]` - First-time users (future)

## Version Targeting

```json
"show_conditions": {
  "min_app_version": "1.0.0",      // Show to v1.0.0+
  "max_app_version": "1.0.99",     // Hide from v1.1.0+
  "start_date": "2024-12-09",      // Start showing
  "end_date": "2024-12-31",        // Stop showing
  "max_shows": 2                   // Max times per user
}
```

## Testing

1. **Local testing**: Change dates to current date
2. **Clear app cache**: Reinstall app or wait 1 hour
3. **Version testing**: Adjust `min_app_version` constraints

## Deployment

- **Automatic**: GitHub Pages deploys on commit
- **Speed**: ~1 minute from commit to live
- **Caching**: App caches for 1 hour maximum