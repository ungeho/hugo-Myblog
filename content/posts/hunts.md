+++
title = 'モブハント用'
date = 2024-09-13T03:13:38+09:00
draft = true
categories = ["FFXIV"]
tags = ["FFXIV,Sonar,Faloop"]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = true
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = true
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = false
+++


# 必要なプラグイン

* Yes Already  
  Lifestreamプラグインを使用する為に必須。
* Lifestream  
  DC移動、サーバー移動、インスタンス切り替えなどエーテライト周りの動作を自動で行うプラグイン。  
  YesAlreadyプラグインが必須。  
  * 通常版はリポジトリなし（初期の状態で使用可能）  
* Sonar  
  リスキーモブの位置やHP状況を共有するプラグイン。  
  基本的に通常版を使用。  
  * 通常版はリポジトリなし（初期の状態で使用可能）  
  * プレビュー版のリポジトリ  
```
https://raw.githubusercontent.com/FFXIV-Sonar/SonarRepo/main/pluginmaster.json
```
* Divination.FaloopIntegration  
  Faloopに報告された情報を、チャットに表示するプラグイン  
  役割はSonarとほぼ同じ。  
* Divination.AetheryteLinkInChat  
  座標付きのチャットが表示された時、一番近いエーテライトのリンク（クリックするとテレポートを行う）が付与されるプラグイン。  
  lifestreamにも対応。
  * リポジトリ(Divination.~~)  
```
https://xiv.starry.blue/plugins/master.json
```
* Lemegeton  
  現地に到着した後の、Sモブの位置とHP確認に使用。  
  * リポジトリ
```
https://raw.githubusercontent.com/paissaheavyindustries/Dalamud-Repo/main/repo.json
```


# 設定の変更が不要なプラグイン

多分不要。

* Yes Already
* Lifestream

# 設定の変更が必要なプラグイン

## Sonar

目的別に設定を行う。  

### 共通設定

ゲーム内チャットで`/sonarcfg`と入力。  
* モブの情報を受信する範囲の設定をリージョンに変更  
  `General`タブ  
  `Receive Jurisdiction`を`Region`に設定にする。  

### Sモブを狩りたい時の設定

ゲーム内チャットで`/sonarcfg`と入力。  
* 特定の地域のSモブの情報をリージョンの範囲で通知させる。  
  `Hunts`タブ  
  `Hunt Report Notifications`  
  `Granular Hunt Reporting Settings`にチェック。  
  必要な地域のSモブを`Region`に設定。  
  必要のない地域は`None`に設定。  
* 通知時に音を鳴らす。  
  `Hunts`タブ  
  `Hunt Sound Alerts Configuration`  
  `Play sound on Rank S`にチェック  
  音の種類はお好み。

### Aモブ連戦に参加したいときの設定

ゲーム内チャットで`/sonarcfg`と入力。  
* 特定の地域のAモブの情報をリージョンの範囲で通知させる。  
  `Hunts`タブ  
  `Hunt Report Notifications`  
  `Granular Hunt Reporting Settings`にチェック。  
  必要な地域のAモブを`Data Center`に設定。  
  必要のない地域は`None`に設定。  

## Divination.FaloopIntegration

ゲーム内チャットで`/faloop`と入力。  
`Sモブ`タブ  
`通知先`をお好みで設定  
`モブが沸いた時の通知`のみチェック  
`モブの管轄`から必要な地域のSモブを`リージョン(物理DC)`に設定。

## 公式

`Sonar`と`Divination.FaloopIntegration`の通知先のチャットの色を目立つ色に変更する。

## Divination.AetheryteLinkInChat

ゲーム内チャットで`/alic`と入力。  
`General`タブ  
`テレポを予約可能にする`にチェック  
遅延時間をお好みで設定  
`優先する三国エーテライト`をお好みで設定  
`他ワールドへのテレポを経路計算に考慮する`にチェック  
`Lifestream`との連携機能を有効にするにチェック  
テレポ実行時にチャット通知を有効にするにチェック  
テレポ実行時にトースト通知を有効にするにチェック  
保存して閉じる  

## Lemegeton

ゲーム内チャットで`/lemmy`と入力。  
`その他`タブ  
`その他`  
`有効`にチェック  
`レーダー`  
`有効`にチェック  
`ファインダー`  
`有効`と`Sランクを全て選択`にチェック


# 使用方法

## Sonar

基本的にSモブを監視している時は、常時`/sonar`を開いておく。  
Sモブの見逃しの回避や、HP状況の確認（討伐開始されたか）を確認出来る。  
右クリックをする事で、フラグ付きのマップを開く事が出来る。  

## lifestream + AetheryteLinkInChat

`/li サーバー名`によるテレポ  
または  
チャットに付与された`Lifestream`を左クリックする事で移動する。  
状況によって使い分けると良い。  

PTを組んでいる状態でも、サーバーテレポやDCテレポ前に自動で抜けてくれる。  



以下、注意事項など  
* Lifestream Overlayが表示されない場合。  
  マップを開いていると非表示になる。表示したい場合はマップを閉じる。  
  インスタンスのオーバーレイが表示されない場合は、一度エーテライトを右クリックすることで表示されるようになる。  
  それでも解決しない場合、一度エーテライトから十分な距離離れて、再度近づく。
* Lifestreamを途中で止めた。または途中で止まってしまった場合。  
  画面下部の紫色のバーを右クリックする事で中断する事が出来る。  
  中断しないと、その間Lifestreamが機能しなくなる。  
