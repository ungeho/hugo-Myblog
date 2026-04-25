+++
title = '絶オメガ検証戦'
date = 2026-04-19T15:51:01+09:00
draft = false
description = "絶オメガ検証戦のSplatoonレイアウト"
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

> [!WARNING] 注意：制作中のプリセット
> このPresetは制作中です。  
> 今後しばらくは問題のある更新やその修正を含め、細かく更新されます。  
> 2026-04-19 16:03:07：P1の暫定版が完成。

---

## Waymark

フィールドマーカーはこちらの記事にあります。

{{< linkcard
  url="/posts/waymark-ultimate/"
  title="[FFXIV Waymark Presets] 絶レイド"
  desc="絶レイドのフィールドマーカー"
  meta="Related"
/>}}

---

## Strategy method

基本リリド 検知十字式

---

## Additional plugins

追加で導入することを推奨するプラグインです。

---

### Chibi Omega

P1とP3のボスのサイズを小さくして **視認性を向上** します。  
ギミックの性質上 **導入を推奨** します。  
導入後の **設定は不要** です。

#### Custom Plugin Repository

```url
https://github.com/paissaheavyindustries/Dalamud-Repo/raw/main/repo.json
```

---

## Script

---

### P1 サークルプログラム

公式から、サークルプログラムのスクリプト

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/refs/heads/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/Program%20Loop%20Priority.cs
```

#### Configurations - サークルプログラム

##### Tethers - サークルプログラム

- Tether's AOE color  
  `#1000FF46`
- Valid tether color  
  `#00FFFFFF`
- Invalid tether color  
  `#FFB500FF`  
  `#FF0000FF`
- Invalid tether reminder size  
  `2.0`
- Invalid tether reminder color  
  `#000000FF`
- Display AOE under incorrect tether  
  **チェックしない**
- Tether AOE proximity detector  
  **チェックしない**
- Display tether drop spots when it's my order to take it  
  **チェックする**
- Detect my designated spot based on same priority as towers  
  **チェックする**
- Safe spot indicator color  
  `#2FFF00FF`
- Detect tether that I'm supposed to pick based on same priority as towers and make it larger  
  **チェックする**

##### Towers - サークルプログラム

- Tower handling  
  `Start NorthWest`

##### Priority - サークルプログラム

優先度設定が必要

#### Registered elements - サークルプログラム

テザーの範囲の境界部分を強調するため、`TetherAOE`の`Thikness`を`8.0`に変更。  
お好みで

```json
{"Elements":{"TetherAOE1":{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":15.0,"color":1308557312,"Filled":true,"fillIntensity":0.6,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":8.0,"overlayText":"","refActorObjectID":0,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":2,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":true,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"TetherAOE2":{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":15.0,"color":1308557312,"Filled":true,"fillIntensity":0.6,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":8.0,"overlayText":"","refActorObjectID":0,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":2,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":true,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"Tether1":{"Name":"","type":2,"Enabled":false,"refX":0.0,"refY":0.0,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.0,"color":3355443455,"Filled":true,"fillIntensity":null,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorName":"","refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":0,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0}}}
```

---

### P2 連携プログラムPT

```url
https://github.com/PunishXIV/Splatoon/raw/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/Party%20Synergy.cs
```

#### Configurations - 連携プログラムPT

- `Decide left/right Function`  
  **チェックする**
- Adjustment considering eye distance for biased knock back.  
  `Furthest from eye adjusts`を**選択する**
- Adjustment Middle Position for Close knock back  
  `AdjustmentRight`を**選択する**
- `Print in chat info about not your adjusts`  
  **チェックしない**
- `Explicit position tether`  
  **チェックする**

#### Priority - 連携プログラムPT

優先度設定が必要

#### Registered Elements - 連携プログラムPT

導入は**必須**です。  
プレステ散開の位置を処理方に合わせて調整されています。

```json
{"Elements":{"FarRightCircle":{"Name":"FarRightCircle","type":1,"Enabled":false,"offX":-10.94,"offY":60.14,"offZ":-0.2,"radius":1.0,"color":4278190335,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarRightCross":{"Name":"FarRightCross","type":1,"Enabled":false,"offX":-18.24,"offY":49.78,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarRightTriangle":{"Name":"FarRightTriangle","type":1,"Enabled":false,"offX":-17.26,"offY":37.96,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarRightSquare":{"Name":"FarRightSquare","type":1,"Enabled":false,"offX":-11.0,"offY":30.04,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftSquare":{"Name":"FarLeftSquare","type":1,"Enabled":false,"offX":11.0,"offY":60.12,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftTriangle":{"Name":"FarLeftTriangle","type":1,"Enabled":false,"offX":17.18,"offY":52.6,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":true,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftCross":{"Name":"FarLeftCross","type":1,"Enabled":false,"offX":17.46,"offY":38.32,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":true,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftCircle":{"Name":"FarLeftCircle","type":1,"Enabled":false,"offX":11.0,"offY":29.88,"offZ":0.0,"radius":1.0,"color":4278190335,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0}}}
```

---

### P3 ハローワールド(日本語)

公式のハローワールドのスクリプトを元に、ガイドが日本語に変更されたもの

```C#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using Dalamud.Interface.Colors;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.Hooks;
using ECommons.ImGuiMethods;
using ECommons.Logging;
using Dalamud.Bindings.ImGui;
using Lumina.Data;
using Splatoon;
using Splatoon.SplatoonScripting;
using Splatoon.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol
{
    public class Hello_World_JP : SplatoonScript
    {
        public override Metadata? Metadata => new(9, "NightmareXIV");
        public override HashSet<uint> ValidTerritories => [1122];
        private bool RotPicker = false;
        private int counter = 0;
        private List<Element> AvoidAlerts = [];
        private Config Conf => Controller.GetConfig<Config>();

        private bool IsHelloWorldRunning => FakeParty.Get().Any(x => x.StatusList.Any(z => z.StatusId.EqualsAny(Effects.RedRot, Effects.BlueRot)));

        public class Effects
        {

            //  Underflow Debugger (3432), Remains = 0.0, Param = 0, Count = 0
            public const uint NoRedRot = 3432;

            //  _rsv_3433_-1_1_0_0_S74CFC3B0_E74CFC3B0 (3433), Remains = 0.0, Param = 0, Count = 0
            public const uint NoBlueRot = 3433;

            /// <summary>
            /// _rsv_3429_-1_1_0_0_S74CFC3B0_E74CFC3B0 (3429), Remains = 15.2, Param = 0, Count = 0
            /// </summary>
            public const uint BlueRot = 3429;

            public const uint RedRot = 3526;

            /// <summary>
            /// Critical Overflow Bug (3525), Remains = 9.2, Param = 0, Count = 0
            /// </summary>
            public const uint Defamation = 3525;

            public const uint StackTwoPeople = 3524;

            /// <summary>
            /// Remote Code Smell (3441), Remains = 8.0, Param = 0, Count = 0<br></br>
            /// tethers that break when far, must be <10 seconds remaining
            /// </summary>
            public const uint UpcomingFarTether = 3441;

            /// <summary>
            ///   Local Code Smell (3503), Remains = 50.0, Param = 0, Count = 0<br></br>
            ///   tethers that break when close, must be <10 seconds remaining
            /// </summary>
            public const uint UpcomingCloseTether = 3503;

            /// <summary>
            /// Remote Regression (3530), Remains = 9.6, Param = 0, Count = 0<br></br>
            /// must be broken first, picks up corresponding rot first
            /// </summary>
            public const uint FarTether = 3530;

            /// <summary>
            ///   Local Regression (3529), Remains = 9.6, Param = 0, Count = 0
            ///   must be broken second
            /// </summary>
            public const uint CloseTether = 3529;


        }

        public Vector4 ColorBlueTower = 0xFFFF0000.ToVector4();
        public Vector4 ColorRedTower = 0xFF0000FF.ToVector4();

        public override void OnSetup()
        {
            Controller.RegisterElementFromCode("RedTower", "{\"Name\":\"Red\",\"type\":1,\"Enabled\":false,\"radius\":6.0,\"thicc\":7.0,\"refActorName\":\"*\",\"refActorRequireCast\":true,\"refActorCastId\":[31583],\"includeRotation\":false,\"tether\":true}");
            Controller.RegisterElementFromCode("BlueTower", "{\"Name\":\"Blue\",\"type\":1,\"Enabled\":false,\"radius\":6.0,\"color\":3372220160,\"thicc\":7.0,\"refActorName\":\"*\",\"refActorRequireCast\":true,\"refActorCastId\":[31584],\"includeRotation\":false,\"tether\":true}");
            Controller.RegisterElementFromCode("RedTowerSolid", "{\"Name\":\"Red\",\"type\":1,\"Enabled\":false,\"radius\":6.0,\"thicc\":4.0,\"refActorName\":\"*\",\"refActorRequireCast\":true,\"refActorCastId\":[31583],\"includeRotation\":false,\"tether\":false}");
            Controller.RegisterElementFromCode("BlueTowerSolid", "{\"Name\":\"Blue\",\"type\":1,\"Enabled\":false,\"radius\":6.0,\"color\":3372220160,\"thicc\":4.0,\"refActorName\":\"*\",\"refActorRequireCast\":true,\"refActorCastId\":[31584],\"includeRotation\":false,\"tether\":false}");
            Controller.RegisterElementFromCode("Reminder", "{\"Name\":\"\",\"type\":1,\"Enabled\":false,\"offZ\":3.5,\"overlayBGColor\":4278190335,\"overlayTextColor\":4294967295,\"overlayFScale\":2.0,\"overlayText\":\"REMINDER\",\"refActorType\":1}");

            Controller.RegisterElementFromCode("DefaPartner", "{\"Name\":\"\",\"type\":1,\"Enabled\":false,\"radius\":0.5,\"color\":4294902015,\"overlayBGColor\":4294902015,\"overlayTextColor\":4294967295,\"overlayPlaceholders\":true,\"overlayText\":\"Defamation\\\\nTaker\",\"refActorObjectID\":11111,\"FillStep\":0.2,\"refActorComparisonType\":2,\"includeRotation\":true,\"Filled\":true}");
        }

        public override void OnMessage(string Message)
        {
            if(Message.Contains(">31599)"))
            {
                counter++;
                PluginLog.Debug("Counter: " + counter);
            }
        }

        public override void OnUpdate()
        {
            Controller.GetElementByName("DefaPartner").Enabled = false;
            AvoidAlerts.Each(x => x.Enabled = false);

            try
            {
                if(Conf.EnableAvoiders && IsHelloWorldRunning)
                {
                    var otherPlayers = FakeParty.Get().Where(x => x.Address != Svc.ClientState.LocalPlayer.Address);
                    if(HasEffect(Effects.BlueRot))
                    {
                        foreach(var x in otherPlayers)
                        {
                            if(!x.StatusList.Any(z => z.StatusId.EqualsAny(Effects.BlueRot, Effects.NoBlueRot)))
                            {
                                GetAvoidElementByOID(x.EntityId).Enabled = true;
                            }
                        }
                    }
                    else
                    {
                        if(!HasEffect(Effects.NoBlueRot))
                        {
                            foreach(var x in otherPlayers)
                            {
                                if(x.StatusList.Any(z => z.StatusId.EqualsAny(Effects.BlueRot)))
                                {
                                    GetAvoidElementByOID(x.EntityId).Enabled = true;
                                }
                            }
                        }
                    }
                    if(HasEffect(Effects.RedRot))
                    {
                        foreach(var x in otherPlayers)
                        {
                            if(!x.StatusList.Any(z => z.StatusId.EqualsAny(Effects.RedRot, Effects.NoRedRot)))
                            {
                                GetAvoidElementByOID(x.EntityId).Enabled = true;
                            }
                        }
                    }
                    else
                    {
                        if(!HasEffect(Effects.NoRedRot))
                        {
                            foreach(var x in otherPlayers)
                            {
                                if(x.StatusList.Any(z => z.StatusId.EqualsAny(Effects.RedRot)))
                                {
                                    GetAvoidElementByOID(x.EntityId).Enabled = true;
                                }
                            }
                        }
                    }
                }
            }
            catch(Exception e)
            {
                e.Log();
            }

            if((HasEffect(Effects.NoBlueRot) && HasEffect(Effects.NoRedRot)))
            {
                RotPicker = false;
            }
            if(Svc.Objects.Any(x => x is IBattleChara b && b.CastActionId == 31599))
            {
                var isDefamationRed = Svc.Objects.Any(x => x is IPlayerCharacter pc && HasEffect(Effects.Defamation, null, pc) && HasEffect(Effects.RedRot, null, pc));
                if(HasEffect(Effects.RedRot))
                {
                    if(Conf.EnableVisualElementsTowers) TowerRed(false);
                    if(HasEffect(Effects.Defamation))
                    {
                        if(Conf.EnableOverheadHintsGeneric) Reminder("円範囲：赤塔の外側", ImGuiColors.DalamudRed);
                    }
                    else
                    {
                        if(Conf.EnableOverheadHintsGeneric) Reminder("頭割り：赤塔の内側", ImGuiColors.DalamudRed);
                    }
                }
                else if(HasEffect(Effects.BlueRot))
                {
                    if(Conf.EnableVisualElementsTowers) TowerBlue(false);
                    if(HasEffect(Effects.Defamation))
                    {
                        if(Conf.EnableOverheadHintsGeneric) Reminder("円範囲：青塔の外側", ImGuiColors.TankBlue);
                    }
                    else
                    {
                        if(Conf.EnableOverheadHintsGeneric) Reminder("頭割り：青塔の内側", ImGuiColors.TankBlue);
                    }
                }
                else if(HasEffect(Effects.UpcomingCloseTether, 10f))
                {
                    if(counter != 4 && !(HasEffect(Effects.NoBlueRot) && HasEffect(Effects.NoRedRot))) RotPicker = true;
                    if(counter != 4)
                    {
                        var partner = FakeParty.Get().FirstOrDefault(x => x.Address != Svc.ClientState.LocalPlayer.Address && HasEffect(Effects.UpcomingCloseTether, 10f, x));
                        if(isDefamationRed)
                        {
                            if(Conf.EnableVisualElementsTowers) TowerRed(true);
                            if(Conf.EnableOverheadHintsGeneric) Reminder("赤塔の前で離れる - 円範囲を受ける", ImGuiColors.DalamudRed);
                        }
                        else
                        {
                            if(Conf.EnableVisualElementsTowers) TowerBlue(true);
                            if(Conf.EnableOverheadHintsGeneric) Reminder("青塔の前で離れる - 円範囲を受ける", ImGuiColors.TankBlue);
                        }
                        if(partner != null)
                        {
                            if(Conf.EnableDefamationPartner)
                            {
                                Controller.GetElementByName("DefaPartner").Enabled = true;
                                Controller.GetElementByName("DefaPartner").tether = Conf.EnableDefamationPartnerTether;
                                Controller.GetElementByName("DefaPartner").refActorObjectID = partner.EntityId;
                            }
                        }
                    }
                    else
                    {
                        if(isDefamationRed)
                        {
                            if(Conf.EnableVisualElementsTowers) TowerBlue(true);
                            if(Conf.EnableOverheadHintsGeneric) Reminder("青塔の間 - 最後の散開or頭割り", ImGuiColors.TankBlue);
                        }
                        else
                        {
                            if(Conf.EnableVisualElementsTowers) TowerRed(true);
                            if(Conf.EnableOverheadHintsGeneric) Reminder("赤塔の間 - 最後の散開or頭割り", ImGuiColors.DalamudRed);
                        }
                    }
                }
                else if(HasEffect(Effects.UpcomingFarTether, 10))
                {
                    if(counter != 4 && !(HasEffect(Effects.NoBlueRot) && HasEffect(Effects.NoRedRot))) RotPicker = true;
                    if(isDefamationRed)
                    {
                        if(Conf.EnableVisualElementsTowers) TowerBlue(true);
                        if(Conf.EnableOverheadHintsGeneric) Reminder("青塔の間" + (counter == 4 ? " - 最後の頭割り" : " - 頭割り"), ImGuiColors.TankBlue);
                    }
                    else
                    {
                        if(Conf.EnableVisualElementsTowers) TowerRed(true);
                        if(Conf.EnableOverheadHintsGeneric) Reminder("赤塔の間" + (counter == 4 ? " - 最後の頭割り" : " - 頭割り"), ImGuiColors.DalamudRed);
                    }
                }
            }
            else
            {
                TowerOff();
                Reminder(null);
                if(RotPicker)
                {
                    if(Conf.EnableRotPickerReminding) Reminder("デバフをもらう", 0xFF000000.ToVector4());
                    if(HasEffect(Effects.BlueRot) || HasEffect(Effects.RedRot))
                    {
                        RotPicker = false;
                    }
                }
                else
                {
                    if(HasEffect(Effects.FarTether))
                    {
                        if(Conf.EnableOverheadHintsTether) Reminder("線を切る - 離れる", ImGuiColors.HealerGreen);
                    }
                    if(HasEffect(Effects.CloseTether) && !Svc.Objects.Any(x => x is IPlayerCharacter pc && HasEffect(Effects.FarTether)))
                    {
                        if(Conf.EnableOverheadHintsTether) Reminder("線を切る - 近づく", ImGuiColors.ParsedBlue);
                    }
                }
            }
        }

        public override void OnEnable()
        {
            TowerOff();
            Reminder(null);
            counter = 0;
            RotPicker = false;
            Controller.GetElementByName("DefaPartner").Enabled = false;
            SetupElements();
            PluginLog.Information("Counter: " + counter);
        }

        private void SetupElements()
        {
            var list = FakeParty.Get().ToArray();
            PluginLog.Debug($"Party count is {list}");
            AvoidAlerts.Clear();
            for(var i = 0; i < list.Length; i++)
            {
                AvoidAlerts.Add(Controller.RegisterElementFromCode($"Avoid{i}", "{\"Name\":\"\",\"type\":3,\"Enabled\":false,\"refZ\":1.2,\"radius\":0.0,\"color\":3355473407,\"overlayFScale\":5.0,\"thicc\":25.0,\"refActorObjectID\":12345678,\"refActorComparisonType\":2}".Replace("12345678", $"{list[i].EntityId}")));
            }
        }

        public override void OnDirectorUpdate(DirectorUpdateCategory category)
        {
            if(category.EqualsAny(DirectorUpdateCategory.Recommence, DirectorUpdateCategory.Wipe, DirectorUpdateCategory.Commence))
            {
                OnEnable();
                if(category != DirectorUpdateCategory.Wipe)
                {
                    SetupElements();
                }
            }
        }

        private void TowerRed(bool filled)
        {
            Controller.GetElementByName("RedTower").Enabled = true;
            Controller.GetElementByName("BlueTower").Enabled = false;
            Controller.GetElementByName("RedTower").color = GradientColor.Get(ColorRedTower, ColorRedTower with { W = 0.5f }, 333).ToUint();
            Controller.GetElementByName("RedTowerSolid").Enabled = filled;
            if(filled)
            {
                Controller.GetElementByName("RedTowerSolid").Filled = true;
                Controller.GetElementByName("RedTowerSolid").color = (ColorRedTower with { W = 0.3f }).ToUint();
            }
        }

        private void TowerBlue(bool filled)
        {
            Controller.GetElementByName("RedTower").Enabled = false;
            Controller.GetElementByName("BlueTower").Enabled = true;
            Controller.GetElementByName("BlueTower").color = GradientColor.Get(ColorBlueTower, ColorBlueTower with { W = 0.5f }, 333).ToUint();
            Controller.GetElementByName("BlueTowerSolid").Enabled = filled;
            if(filled)
            {
                Controller.GetElementByName("BlueTowerSolid").Filled = true;
                Controller.GetElementByName("BlueTowerSolid").color = (ColorBlueTower with { W = 0.3f }).ToUint();
            }
        }

        private void TowerOff()
        {
            Controller.GetElementByName("RedTower").Enabled = false;
            Controller.GetElementByName("BlueTower").Enabled = false;
        }

        private static bool HasEffect(uint effect, float? remainingTile = null, IBattleChara? obj = null)
        {
            return (obj ?? Svc.ClientState.LocalPlayer).StatusList.Any(x => x.StatusId == effect && (remainingTile == null || x.RemainingTime < remainingTile));
        }

        private void Reminder(string? text, Vector4? color = null)
        {
            if(Controller.TryGetElementByName("Reminder", out var e))
            {
                if(text == null)
                {
                    e.Enabled = false;
                }
                else
                {
                    e.Enabled = true;
                    e.overlayText = text;
                }
                if(color != null)
                {
                    e.overlayBGColor = color.Value.ToUint();
                }
            }
        }

        private Element? GetAvoidElementByOID(uint oid)
        {
            foreach(var e in AvoidAlerts)
            {
                if(e.refActorObjectID == oid)
                {
                    return e;
                }
            }
            return null;
        }

        public override void OnSettingsDraw()
        {
            ImGui.Checkbox($"Highlight players contacting with which will result debuff to spread", ref Conf.EnableAvoiders);
            ImGui.Checkbox($"Display your defamation partner", ref Conf.EnableDefamationPartner);
            ImGui.SameLine();
            ImGui.Checkbox($"Tether to partner", ref Conf.EnableDefamationPartnerTether);
            ImGui.Checkbox($"Enable visual elements for towers", ref Conf.EnableVisualElementsTowers);
            ImGui.Checkbox($"Enable general mechanic overhead hints", ref Conf.EnableOverheadHintsGeneric);
            ImGui.Checkbox($"Enable rot picking overhead reminder", ref Conf.EnableRotPickerReminding);
            ImGui.Checkbox($"Enable tether break overhead reminder", ref Conf.EnableOverheadHintsTether);
        }
    }

    public class Config : IEzConfig
    {
        public bool EnableAvoiders = true;
        public bool EnableDefamationPartner = true;
        public bool EnableDefamationPartnerTether = false;
        public bool EnableVisualElementsTowers = true;
        public bool EnableOverheadHintsGeneric = true;
        public bool EnableOverheadHintsTether = true;
        public bool EnableRotPickerReminding = true;
    }
}
```

#### Configuration - ハローワールド

- `Highlight players constanting with which will result debuff to spread`  
  **チェックする**
- `Display your defamation partner`  
  **チェックする**
  - `Tether to partner`  
    **チェックしない**
- `Enable visual elements for towers`  
  **チェックする**
- `Enable general mechanic overhead hints`  
  **チェックする**
- `Enable rot picking overhead reminder`  
  **チェックする**
- `Enable tether break overhead reminder`  
  **チェックする**

#### Registered Elements - ハローワールド

塔の塗りつぶしを少し薄く変更  
お好みで

```json
{"Elements":{"RedTower":{"Name":"Red","type":1,"Enabled":true,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":6.0,"color":3321889023,"Filled":true,"fillIntensity":0.2,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":7.0,"overlayText":"","refActorName":"*","refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":true,"refActorCastReverse":false,"refActorCastId":[31583],"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":0,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"BlueTower":{"Name":"Blue","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":6.0,"color":3372220160,"Filled":true,"fillIntensity":0.2,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":7.0,"overlayText":"","refActorName":"*","refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":true,"refActorCastReverse":false,"refActorCastId":[31584],"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":0,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"RedTowerSolid":{"Name":"Red","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":6.0,"color":3355443455,"Filled":true,"fillIntensity":null,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorName":"*","refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":true,"refActorCastReverse":false,"refActorCastId":[31583],"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":0,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0}}}
```

---

## Layout

> [!IMPORTANT] Configurationの設定が必要
> **Configuration** の設定が必要なレイアウトが含まれています。  
> 導入後、**Configuration** から **ロールを選択** してください。

```json
~Lv2~{"Name":"P1 Basic Mulipreset / 基本繪制","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[2],"ElementsL":[{"Name":"Tower Finder / 塔 ","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"thicc":3.0,"refActorNPCID":2013245,"refActorObjectLife":true,"refActorLifetimeMin":0.0,"refActorLifetimeMax":9.0,"refActorComparisonType":4},{"Name":"Tower Reminder / 進塔提醒","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278253567,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TOWER !!! <<<","refActorRequireBuff":true,"refActorBuffId":[3456],"refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"onlyVisible":true},{"Name":"Laser / 集合提醒 (激光)","type":1,"Enabled":false,"radius":4.52,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":3355443200,"overlayTextColor":4294940160,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":5.0,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":5.0,"refActorComparisonType":5,"onlyVisible":true,"FillStep":0.778},{"Name":"Induced AOE / 靠近AOE","type":1,"radius":3.0,"color":4278255612,"fillIntensity":0.2,"overlayBGColor":3472883712,"overlayTextColor":4278255615,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":3.0,"refActorComparisonType":7,"includeRotation":true,"FaceMe":true,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":3000},{"Name":"Missile / 分散提醒 (射弾)","type":1,"Enabled":false,"radius":5.0,"color":3355507967,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":3355443200,"overlayTextColor":4278255600,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":4.9,"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":5.0,"refActorComparisonType":1,"onlyVisible":true}]}
~Lv2~{"Name":"◆サークルプログラム","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"1st","type":1,"offZ":2.76,"radius":0.0,"color":4294965504,"overlayBGColor":4294965504,"overlayTextColor":3355443200,"overlayFScale":2.0,"thicc":5.0,"overlayText":"1st","refActorRequireBuff":true,"refActorBuffId":[3004],"refActorComparisonType":1,"onlyVisible":true},{"Name":"2nd","type":1,"offZ":2.76,"radius":0.0,"color":3364749567,"overlayBGColor":3364749567,"overlayFScale":2.0,"thicc":5.0,"overlayText":"2nd","refActorRequireBuff":true,"refActorBuffId":[3005],"refActorComparisonType":1,"onlyVisible":true},{"Name":"3rd","type":1,"offZ":2.76,"radius":0.0,"color":3372156928,"overlayBGColor":3372156928,"overlayFScale":2.0,"thicc":5.0,"overlayText":"3rd","refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":1,"onlyVisible":true},{"Name":"4th","type":1,"offZ":2.76,"radius":0.0,"color":3359113471,"overlayBGColor":3359113471,"overlayFScale":2.0,"thicc":5.0,"overlayText":"4th","refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":1,"onlyVisible":true}]}
~Lv2~{"Enabled":false,"Name":"P1 サークルプログラム1_テキスト","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":13.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":5.0}],"ElementsL":[{"Name":"1","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3004],"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"tower","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371826944,"overlayVOffset":3.8,"overlayFScale":2.06,"thicc":0.0,"overlayText":">> Tower <<","refActorType":1},{"Name":"3","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"tether","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3357277952,"overlayVOffset":3.8,"overlayFScale":2.06,"thicc":0.0,"overlayText":">> Tether <<","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム 初期位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":"オメガは「サークルプログラム」の構え。"}],"ElementsL":[{"Name":"3","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"3","refX":100.0,"refY":105.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"3以外","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"3以外","refX":100.0,"refY":112.5,"refZ":-5.456968E-12,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD13","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":5.0}],"ElementsL":[{"Name":"13","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"13","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD12","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":6.0}],"ElementsL":[{"Name":"12","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"12","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD11","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":7.0}],"ElementsL":[{"Name":"11","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"11","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD10","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":8.0}],"ElementsL":[{"Name":"10","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"10","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":9.0}],"ElementsL":[{"Name":"9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":10.0}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":11.0}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":12.0}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":13.0}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":14.0}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":15.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":16.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム1_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":17.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":18.0}],"ElementsL":[{"Name":"9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":19.0}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":20.0}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":21.0}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":22.0}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":23.0}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":24.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":25.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム2_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":26.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":27.0}],"ElementsL":[{"Name":"9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":28.0}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":29.0}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":30.0}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":31.0}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":32.0}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":33.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":34.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム3_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":35.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":36.0}],"ElementsL":[{"Name":"9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":37.0}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":38.0}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":39.0}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":40.0}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":41.0}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":42.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":43.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P1 サークルプログラム4_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":44.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P1 高出力波動砲P","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372220160,"overlayFScale":2.0,"thicc":0.0,"overlayText":"Stack","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":5.0,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P1 誘導ミサイルP","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayFScale":2.0,"thicc":0.1,"overlayText":"Spread","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"AoE","type":1,"radius":5.0,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":5.0,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P1 高出力波動砲P AoE","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"<1>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<1>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <1>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true},{"Name":"<2>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<2>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <2>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<2>"},{"Name":"<3>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<3>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <3>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<3>"},{"Name":"<4>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<4>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <4>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<4>"},{"Name":"<5>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<5>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <5>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<5>"},{"Name":"<6>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<6>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <6>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<6>"},{"Name":"<7>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<7>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <7>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<7>"},{"Name":"<8>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <8>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<8>"}]}
~Lv2~{"Name":"P1 パントクラトル後_散開","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"97737092-97f4-418b-8d86-7d9f06b2979b","Name":"Tank","Elements":[{"Name":"Tank","refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"3211016b-a189-4f0a-ba4f-227fef31e6c3","Name":"H1","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"b861edcc-77f4-468b-afdc-32137f99eac6","Name":"H2","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"c57e4b2d-875a-4b10-b2ab-899fd2d0507e","Name":"D1","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"b47c327b-7b5f-4d4b-8fd2-9c809650792e","Name":"D2","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"d7e50361-51ad-4246-85df-460c625d37e1","Name":"D3","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"f0e03b6b-6364-454e-8f3d-c5e49165eb5d","Name":"D4","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":15.0,"Match":"オメガは「パントクラトル」の構え。","MatchDelay":38.0}],"ElementsL":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]}
~Lv2~{"Enabled":false,"Name":"P2 組分け (仮)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"UseTriggers":true,"Triggers":[{"Type":2,"Duration":5.0,"MatchIntl":{"Jp":"ワタシはオメガであり、アルファである……。 弱きヒトの特徴を実装し、真なる強きを求めましょう。"}}],"ElementsL":[]}
```
