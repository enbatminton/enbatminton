# PubSubHubbub (WebSub) 設定ガイド

## 概要
PubSubHubbub（現在はWebSub）を実装することで、フィードが更新された際にリアルタイムで購読者に通知を送信できます。

## 実装内容

### 1. フィードファイルの更新
- `feed.xml` と `atom.xml` にハブリンクを追加
- ハブURL: `https://pubsubhubbub.appspot.com/`

### 2. 通知スクリプト
- `notify-hub.py`: Pythonスクリプトでハブに通知を送信
- `update-feeds.sh`: フィード更新と通知を自動化

## 使用方法

### フィード更新と通知の実行
```bash
# フィードを更新してハブに通知
./update-feeds.sh
```

### 手動でハブに通知
```bash
# Pythonスクリプトを直接実行
python3 notify-hub.py
```

## 対応しているハブサービス

### 1. Google PubSubHubbub Hub
- URL: `https://pubsubhubbub.appspot.com/`
- 無料で利用可能
- Googleが提供

### 2. Superfeedr
- URL: `https://push.superfeedr.com/`
- 商用サービス（有料）
- より高度な機能

### 3. 自前のハブサーバー
- 独自のWebSubハブを構築可能
- より細かい制御が可能

## フィード購読者の設定

購読者は以下の方法でフィードを購読できます：

### 1. フィードリーダーでの購読
- RSSリーダーアプリでフィードURLを追加
- リアルタイム更新が可能

### 2. ブラウザでの購読
- ブラウザのRSS機能を使用
- ブックマークとして保存

## トラブルシューティング

### 通知が送信されない場合
1. フィードURLが正しくアクセス可能か確認
2. ハブサービスが稼働中か確認
3. ネットワーク接続を確認

### フィードが更新されない場合
1. フィードファイルの形式が正しいか確認
2. 日時フォーマットが正しいか確認
3. ハブリンクが正しく設定されているか確認

## 今後の拡張

### 1. 自動更新システム
- GitHub Actionsやcronジョブで定期実行
- コンテンツ更新時の自動通知

### 2. 複数フィード対応
- 複数のフィードを管理
- 一括更新機能

### 3. 統計機能
- 購読者数の追跡
- 更新頻度の分析

## 参考リンク
- [WebSub仕様](https://www.w3.org/TR/websub/)
- [PubSubHubbub仕様](https://pubsubhubbub.github.io/PubSubHubbub/pubsubhubbub-core-0.4.html)
- [Google PubSubHubbub Hub](https://pubsubhubbub.appspot.com/)
