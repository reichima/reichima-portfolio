---
name: changelog
description: 実装完了後に変更ログページへエントリを追記するスキル。コード変更を行った後や、ユーザーが「変更ログに追記」「changelogを更新」「ログに記録」「更新履歴に追加」と言った場合に使用する。実装作業が完了したタイミングで積極的に使用すること。
---

# Changelog Update Skill

実装が完了した際に、ポートフォリオの変更ログページ (`src/app/(portfolio)/changelog/page.tsx`) にエントリを自動追記する。

## 手順

### 1. 変更内容の把握

現在の会話で行った実装内容を振り返り、以下を決定する:

- **title**: 変更内容を簡潔に日本語で記述（1行、ユーザー向けの説明）
- **date**: 今日の日付（YYYY-MM-DD形式、system promptの `currentDate` から取得）
- **type**: 以下から最も適切なものを選択
  - `feature` — 新しい機能やページの追加
  - `improvement` — 既存機能の改善・調整
  - `fix` — バグ修正
  - `style` — デザイン・見た目の変更
  - `dependency` — ライブラリの追加・更新
  - `performance` — パフォーマンス改善

### 2. エントリの追記

`src/app/(portfolio)/changelog/page.tsx` の `changelog` 配列の**先頭**に新しいエントリを追加する。配列は日付の降順（新しい順）で並んでいる。

**追記位置**: `const changelog: ChangelogEntry[] = [` の直後

**フォーマット例**:
```typescript
const changelog: ChangelogEntry[] = [
  {
    date: "2026-03-14",
    title: "KVアニメーション中のヘッダー非表示・スクロールロックを追加",
    type: "feature",
  },
  // ...既存エントリ
];
```

### 3. 注意点

- 1つの実装セッションで複数の独立した変更を行った場合は、それぞれ別のエントリとして追記する
- title は技術的すぎず、ユーザーが見て理解できる表現にする（例: "KvAnimationContextを追加" ではなく "KVアニメーション中のヘッダー非表示を追加"）
- 既存エントリと重複しないよう、追記前に現在の配列を確認する
- リファクタリングのみで機能的な変更がない場合は追記不要
