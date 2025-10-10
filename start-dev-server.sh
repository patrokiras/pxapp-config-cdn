#!/bin/bash

# Simple development server for testing Proximator announcements locally
# Usage: ./start-dev-server.sh

echo "🚀 Starting local announcement server..."
echo "📁 Serving files from: $(pwd)"
echo "🌐 Local server URL: http://localhost:8000"
echo "📋 Test announcement URL: http://localhost:8000/dev-announcements.json"
echo ""
echo "In your Flutter app, temporarily change the base URL to:"
echo "  static const String _baseUrl = 'http://localhost:8000';"
echo "  static const String _announcementsEndpoint = '/dev-announcements.json';"
echo ""
echo "Press Ctrl+C to stop the server"
echo "============================================"

# Start Python HTTP server
python3 -m http.server 8000