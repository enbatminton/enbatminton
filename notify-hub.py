#!/usr/bin/env python3
"""
PubSubHubbub通知スクリプト
フィードが更新された際にハブに通知を送信します
"""

import urllib.request
import urllib.parse
import ssl
import sys
from datetime import datetime

def notify_hub(feed_url, hub_url="https://pubsubhubbub.appspot.com/"):
    """
    PubSubHubbubハブにフィード更新を通知
    
    Args:
        feed_url (str): 更新されたフィードのURL
        hub_url (str): PubSubHubbubハブのURL
    """
    
    # 通知用のデータ
    data = {
        'hub.mode': 'publish',
        'hub.url': feed_url
    }
    
    try:
        # データをURLエンコード
        data_encoded = urllib.parse.urlencode(data).encode('utf-8')
        
        # SSL証明書検証を無効化（開発環境用）
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        # ハブにPOSTリクエストを送信
        req = urllib.request.Request(hub_url, data=data_encoded, method='POST')
        req.add_header('Content-Type', 'application/x-www-form-urlencoded')
        
        with urllib.request.urlopen(req, timeout=30, context=ssl_context) as response:
            if response.status == 204:
                print(f"✅ フィード更新通知が正常に送信されました: {feed_url}")
                return True
            else:
                print(f"❌ 通知送信に失敗しました: HTTP {response.status}")
                return False
            
    except urllib.error.URLError as e:
        print(f"❌ リクエストエラー: {e}")
        return False
    except Exception as e:
        print(f"❌ 予期しないエラー: {e}")
        return False

def main():
    """メイン関数"""
    
    # フィードURL
    feed_urls = [
        "https://www.enbatminton.com/feed.xml",
        "https://www.enbatminton.com/atom.xml"
    ]
    
    print(f"📡 PubSubHubbub通知を開始します... ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')})")
    
    success_count = 0
    
    for feed_url in feed_urls:
        print(f"\n🔄 フィード通知中: {feed_url}")
        
        if notify_hub(feed_url):
            success_count += 1
    
    print(f"\n📊 結果: {success_count}/{len(feed_urls)} のフィード通知が成功しました")
    
    if success_count == len(feed_urls):
        print("🎉 すべての通知が正常に完了しました！")
        sys.exit(0)
    else:
        print("⚠️  一部の通知に失敗しました")
        sys.exit(1)

if __name__ == "__main__":
    main()
