+++
title = '汎用レイアウト'
date = 2026-05-15T14:39:18+09:00
draft = false
description = "汎用的なSplatoonレイアウト"
categories = ["FFXIV"]
tags = ["FFXIV","Splatoon"]
series = ["FFXIV Splatoon Presets"]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = true
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = true
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = false
+++

> [!WARNING] 古いレイアウト
> レイアウト作成から1年以上が経過しています。  
> 現在のバージョンのSplatoonでは動作確認をしていません。  
> そのため **正常に動作しない可能性**があります。
>
> 最終アップロード日時：2026-05-15

---

githubからの移植です。

## Layout

現在では役に立たないレイアウトから、今でも有用なレイアウトまで、さまざまなものが含まれています。

### General

#### Cardinals

このレイアウトの作成者は私ではありません。  
どこで入手したプリセットかは不明ですが、自身のプレイヤー周辺に方角の目安を表示するレイアウトです。

```json
~Lv2~{"Name":"Cardinals","DCond":4,"ElementsL":[{"Name":"N","type":1,"offY":-0.5,"Filled":false,"overlayTextColor":3355443455,"thicc":0.0,"overlayText":"N","refActorType":1},{"Name":"S","type":1,"offY":0.5,"Filled":false,"overlayTextColor":3372206336,"thicc":0.0,"overlayText":"S","refActorType":1},{"Name":"W","type":1,"offX":-0.5,"Filled":false,"overlayTextColor":3371697391,"thicc":0.0,"overlayText":"W","refActorType":1},{"Name":"E","type":1,"offX":0.5,"Filled":false,"overlayTextColor":3355769060,"thicc":0.0,"overlayText":"E","refActorType":1}]}
```

#### Aether Current

風脈

```json
~Lv2~{"Name":"aether current","Group":"Aether current","DisableInDuty":true,"ElementsL":[{"Name":"1","type":1,"Filled":false,"overlayBGColor":1879048447,"thicc":5.0,"overlayText":"風脈","refActorNameIntl":{"Jp":"風脈の泉"},"includeHitbox":true,"onlyTargetable":true,"tether":true}]}
```

### Battle

#### GeneralLayout

自身のキャラクターのHitBoxと自身を中心とした6mの範囲を表示  
過去には6m範囲表示は、不可視範囲を含む散開距離の多くが6mであることや、ヒーラーの攻撃詠唱時間＝GCDだった時代における、滑り撃ちがギリギリ可能な足元設置AoEの目安として非常に役立ちました。

```json
~Lv2~{"Name":"General","Group":"Buttle Jobs","DCond":1,"ElementsL":[{"Name":"6mAoE","type":1,"radius":6.0,"color":3355508515,"Filled":false,"thicc":0.2,"refActorType":1},{"Name":"HitBox","type":1,"radius":0.0,"color":3355508515,"Filled":false,"fillIntensity":0.5,"thicc":2.2,"refActorType":1}]}
```

#### SCH Fairy

学者の妖精 ヒールレンジ

```json
~Lv2~{"Name":"SCH","Group":"Buttle Jobs","DCond":2,"JobLockH":[28],"ElementsL":[{"Name":"Fairy1","type":1,"radius":15.0,"Filled":false,"refActorNPCNameID":1398,"refActorComparisonType":6},{"Name":"Fairy2","type":1,"radius":15.0,"Filled":false,"refActorNPCNameID":1399,"refActorComparisonType":6}]}
```

#### Heal Range

ヒールレンジ

```json
~Lv2~{"Name":"Heal Range","Group":"Buttle Jobs","DCond":1,"JobLockH":[6,24,28,33,40],"ElementsL":[{"Name":"15m Heal","type":1,"radius":15.0,"color":3372156928,"Filled":false,"thicc":1.0,"refActorType":1},{"Name":"20m Heal","type":1,"radius":20.0,"color":3369350365,"Filled":false,"thicc":1.0,"refActorType":1}]}
```

#### Heal Range (AST)

運命の輪のレンジ

```json
{"Name":"運命の輪","type":1,"radius":8.0,"color":3371826944,"Filled":false,"thicc":1.0,"refActorType":1}
```

#### Target Circle

ターゲットした敵のターゲットサークル範囲の数値を表示

```json
~Lv2~{"Name":"Target Circle","Group":"Buttle Jobs","ElementsL":[{"Name":"Target Circle Range","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayVOffset":1.0,"overlayPlaceholders":true,"thicc":0.0,"overlayText":"HITBOXR->$HITBOXR","refActorType":2}]}
```

#### MNK_VPR

モンクやヴァイパーの移動可能範囲

```json
~Lv2~{"Name":"MNK_VPR","Group":"Buttle Jobs","DCond":2,"JobLockH":[2,20,41],"ElementsL":[{"Name":"抜重_蛇行","type":1,"radius":20.0,"color":3369206015,"Filled":false,"refActorType":1,"includeOwnHitbox":true}]}
```

#### Melee LB Range

近接ジョブのLBレンジ

```json
~Lv2~{"Name":"Melee","Group":"Buttle Jobs","ZoneLockH":[888,554,431,376,1058,1032,1033,1059,1116,1117,1138,1139,729,791,250,149],"IsZoneBlacklist":true,"DCond":2,"JobLockH":[2,4,20,22,29,30,34,39,41],"ElementsL":[{"Name":"LB Range","type":1,"radius":8.5,"color":3355481343,"Filled":false,"refActorType":2,"includeHitbox":true}]}
```

### Gather

#### Node

```json
~Lv2~{"Name":"Mining Nodes","Group":"Gatherers","JobLockH":[16],"ElementsL":[{"Name":"1","type":1,"radius":2.0,"Filled":false,"refActorNameIntl":{"Jp":"岩場"},"includeHitbox":true,"onlyTargetable":true,"tether":true},{"Name":"2","type":1,"radius":2.0,"Filled":false,"refActorNameIntl":{"Jp":"採掘場"},"includeHitbox":true,"onlyTargetable":true,"tether":true}]}
~Lv2~{"Name":"Botany Nodes","Group":"Gatherers","JobLockH":[17],"ElementsL":[{"Name":"1","type":1,"radius":2.0,"Filled":false,"refActorNameIntl":{"Jp":"草刈場"},"includeHitbox":true,"onlyTargetable":true,"tether":true},{"Name":"2","type":1,"radius":2.0,"Filled":false,"refActorNameIntl":{"Jp":"良木"},"includeHitbox":true,"onlyTargetable":true,"tether":true}]}
```
