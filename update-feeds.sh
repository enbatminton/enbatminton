#!/bin/bash

# エンバドフィード更新スクリプト
# フィードを更新し、PubSubHubbubハブに通知を送信します

set -e

# 設定
SITE_URL="https://www.enbatminton.com"
FEED_DIR="/Users/haruto_tanabe/Desktop/enbatminton"
CURRENT_DATE=$(date -R)

echo "🔄 エンバドフィード更新を開始します..."

# 現在の日時を取得（RFC 2822形式）
TIMESTAMP=$(date '+%a, %d %b %Y %H:%M:%S %z')
ISO_TIMESTAMP=$(date '+%Y-%m-%dT%H:%M:%S+09:00')

echo "📅 更新日時: $TIMESTAMP"

# RSSフィードの更新
echo "📝 RSSフィードを更新中..."
sed -i.bak "s/<lastBuildDate>.*<\/lastBuildDate>/<lastBuildDate>$TIMESTAMP<\/lastBuildDate>/" "$FEED_DIR/feed.xml"
sed -i.bak "s/<pubDate>.*<\/pubDate>/<pubDate>$TIMESTAMP<\/pubDate>/" "$FEED_DIR/feed.xml"

# Atomフィードの更新
echo "📝 Atomフィードを更新中..."
sed -i.bak "s/<updated>.*<\/updated>/<updated>$ISO_TIMESTAMP<\/updated>/" "$FEED_DIR/atom.xml"

# サイトマップの更新
echo "📝 サイトマップを更新中..."
sed -i.bak "s/<lastmod>.*<\/lastmod>/<lastmod>$ISO_TIMESTAMP<\/lastmod>/" "$FEED_DIR/sitemap.xml"

# バックアップファイルを削除
rm -f "$FEED_DIR/feed.xml.bak" "$FEED_DIR/atom.xml.bak" "$FEED_DIR/sitemap.xml.bak"

echo "✅ フィードファイルが更新されました"

# 更新されたファイルの確認
echo "📋 更新されたファイル:"
echo "  - feed.xml"
echo "  - atom.xml" 
echo "  - sitemap.xml"

# PubSubHubbubハブに通知
echo "📡 PubSubHubbubハブに通知を送信中..."

# Pythonスクリプトを実行
if command -v python3 &> /dev/null; then
    python3 "$FEED_DIR/notify-hub.py"
else
    echo "❌ Python3が見つかりません。手動でハブに通知してください。"
    echo "フィードURL: $SITE_URL/feed.xml"
    echo "フィードURL: $SITE_URL/atom.xml"
fi

echo "🎉 フィード更新が完了しました！"
echo "🌐 サイトマップ: $SITE_URL/sitemap.xml"
echo "📰 RSSフィード: $SITE_URL/feed.xml"
echo "📰 Atomフィード: $SITE_URL/atom.xml"
