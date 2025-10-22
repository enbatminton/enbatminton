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

# RSSフィードの更新
echo "📝 RSSフィードを更新中..."
sed -i.bak "s/<lastBuildDate>.*<\/lastBuildDate>/<lastBuildDate>$TIMESTAMP<\/lastBuildDate>/" "$FEED_DIR/feed.xml"
sed -i.bak "s/<pubDate>.*<\/pubDate>/<pubDate>$TIMESTAMP<\/pubDate>/" "$FEED_DIR/feed.xml"

# Atomフィードの更新
echo "📝 Atomフィードを更新中..."
sed -i.bak "s/<updated>.*<\/updated>/<updated>$(date -u '+%Y-%m-%dT%H:%M:%S+09:00')<\/updated>/" "$FEED_DIR/atom.xml"

# バックアップファイルを削除
rm -f "$FEED_DIR/feed.xml.bak" "$FEED_DIR/atom.xml.bak"

echo "✅ フィードファイルが更新されました"

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
