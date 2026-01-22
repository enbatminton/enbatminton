#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
画像最適化スクリプト
PNG画像をWebP形式に変換し、適切なサイズにリサイズ
"""

from PIL import Image
import os
import sys

def optimize_image(input_path, output_path_webp=None, max_size=(240, 240), quality=85):
    """
    画像を最適化してWebP形式で保存
    
    Args:
        input_path: 入力画像のパス
        output_path_webp: WebP出力パス（Noneの場合は自動生成）
        max_size: 最大サイズ (width, height)
        quality: WebP品質 (1-100)
    """
    try:
        # 画像を開く
        img = Image.open(input_path)
        
        # RGBAモードに変換（透明度を保持）
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # リサイズ（アスペクト比を保持）
        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # WebP出力パスを決定
        if output_path_webp is None:
            base_name = os.path.splitext(input_path)[0]
            output_path_webp = f"{base_name}.webp"
        
        # WebP形式で保存
        img.save(output_path_webp, 'WEBP', quality=quality, method=6)
        
        # 元のファイルサイズと最適化後のサイズを比較
        original_size = os.path.getsize(input_path)
        optimized_size = os.path.getsize(output_path_webp)
        reduction = ((original_size - optimized_size) / original_size) * 100
        
        print(f"✓ {os.path.basename(input_path)}")
        print(f"  元のサイズ: {original_size / 1024:.1f} KiB")
        print(f"  最適化後: {optimized_size / 1024:.1f} KiB")
        print(f"  削減率: {reduction:.1f}%")
        print(f"  出力: {output_path_webp}")
        print()
        
        return True
        
    except Exception as e:
        print(f"✗ エラー: {input_path} - {e}", file=sys.stderr)
        return False

def main():
    """メイン処理"""
    images_dir = os.path.join(os.path.dirname(__file__), 'images')
    
    # 最適化する画像ファイル
    target_images = [
        'ennbado_logo_sns_300ppi.png',
        'ennbado_logo.png'
    ]
    
    print("画像最適化を開始します...")
    print("=" * 60)
    print()
    
    success_count = 0
    
    for image_name in target_images:
        input_path = os.path.join(images_dir, image_name)
        
        if not os.path.exists(input_path):
            print(f"⚠ ファイルが見つかりません: {input_path}")
            continue
        
        # アバター用の最適化（120px x 120px、最大240pxで2倍解像度対応）
        if 'logo' in image_name.lower():
            output_path = os.path.join(images_dir, 'ennbado_logo.webp')
            if optimize_image(input_path, output_path, max_size=(240, 240), quality=85):
                success_count += 1
    
    print("=" * 60)
    print(f"完了: {success_count}個の画像を最適化しました")
    
    if success_count > 0:
        print("\n次のステップ:")
        print("1. HTMLでWebP形式が使用されるように設定済みです")
        print("2. ブラウザで画像が正しく表示されるか確認してください")

if __name__ == '__main__':
    try:
        main()
    except ImportError:
        print("エラー: Pillowライブラリが必要です")
        print("インストール: pip install Pillow")
        sys.exit(1)
