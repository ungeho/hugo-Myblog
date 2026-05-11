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

> [!WARNING] 注意：未完成のプリセット
> このPresetは**未完成**です。

> [!WARNING] 注意：製作中のプリセット
> このPresetは**製作中**です。  
> 今後しばらくは問題のある更新やその修正を含め、細かく更新されます。  
> 2026-04-19 16:03:07：P1の暫定版が完成。  
> 2026-04-25 20:32:48：P4までの暫定版が完成。

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

### Chibi Omega

P1とP3のボスのサイズを小さくして **視認性を向上** します。  
ギミックの性質上 **導入を推奨** します。  
導入後の **設定は不要** です。

#### Custom Plugin Repository

```url
https://github.com/paissaheavyindustries/Dalamud-Repo/raw/main/repo.json
```

## Script

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

#### Priority - サークルプログラム

優先度設定が必要  
上から`H1,MT,ST,D1,D2,D3,D4,H2`

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

- Decide left/right Function  
  **チェックする**
- Adjustment considering eye distance for biased knock back.  
  `Furthest from eye adjusts`を**選択する**
- Adjustment Middle Position for Close knock back  
  `AdjustmentRight`を**選択する**
- Print in chat info about not your adjusts  
  **チェックしない**
- Explicit position tether  
  **チェックする**

#### Priority - 連携プログラムPT

優先度設定が必要  
上から`H1,MT,D1,D3,D4,D2,ST,H2`

#### Registered Elements - 連携プログラムPT

導入は**必須**です。  
プレステ散開の位置を処理方に合わせて調整されています。

```json
{"Elements":{"FarRightCircle":{"Name":"FarRightCircle","type":1,"Enabled":false,"offX":-10.94,"offY":60.14,"offZ":-0.2,"radius":1.0,"color":4278190335,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarRightCross":{"Name":"FarRightCross","type":1,"Enabled":false,"offX":-18.24,"offY":49.78,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarRightTriangle":{"Name":"FarRightTriangle","type":1,"Enabled":false,"offX":-17.26,"offY":37.96,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarRightSquare":{"Name":"FarRightSquare","type":1,"Enabled":false,"offX":-11.0,"offY":30.04,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftSquare":{"Name":"FarLeftSquare","type":1,"Enabled":false,"offX":11.0,"offY":60.12,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftTriangle":{"Name":"FarLeftTriangle","type":1,"Enabled":false,"offX":17.18,"offY":52.6,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":true,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftCross":{"Name":"FarLeftCross","type":1,"Enabled":false,"offX":17.46,"offY":38.32,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":true,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0},"FarLeftCircle":{"Name":"FarLeftCircle","type":1,"Enabled":false,"offX":11.0,"offY":29.88,"offZ":0.0,"radius":1.0,"color":4278190335,"Filled":true,"fillIntensity":null,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorTargetingYou":0,"refActorNPCNameID":7640,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":6,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0}}}
```

---

### P3 コロッサスブロー

mirage様が作成した「コロッサスブロー」のガイドスクリプトです。  
優先度設定に基づき、散開位置およびAoE回避用の移動先を案内します。  
使用するには、優先度設定と各デバフごとの担当散開位置の設定が必要です。  


ここではrawコードを掲載していますが、必要に応じて**P3 Transition**から導入してください。  
[**オメガ スクリプト(P3 Transition : mirage様作)**](https://github.com/exatrines/SplatoonPresets/tree/main/Presets/Endwalker/TOP#p3-transition)

```C#
using Dalamud.Bindings.ImGui;
using Dalamud.Game.ClientState.Objects.Enums;
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using ECommons;
using ECommons.Configuration;
using ECommons.GameFunctions;
using ECommons.DalamudServices;
using ECommons.GameHelpers;
using ECommons.Hooks.ActionEffectTypes;
using ECommons.Logging;
using Splatoon;
using Splatoon.SplatoonScripting;
using Splatoon.SplatoonScripting.Priority;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using static Splatoon.Splatoon;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

public class P3_Transition : SplatoonScript
{
    #region Metadata
    public override Metadata? Metadata => new(1, "mirage");
    public override HashSet<uint>? ValidTerritories => [TerritoryTop];
    #endregion

    #region Constant

    // TOP (The Omega Protocol) territory id.
    private const uint TerritoryTop = 1122;

    // Sniper debuffs: high-power cannon / wave cannon.
    private const uint StatusSniperCannon = 3426;
    private const uint StatusSniperWave = 3425;

    // Transition start: rapid burst; waves: incremental casts.
    private const uint StartTransitionCastId = 31567;
    private static readonly uint[] WaveIncrementCastIds = [31568, 31569, 31570];

    // Triangle marker arms (left/right).
    private const uint DataIdTriangleMarkerA = 0x3D66;
    private const uint DataIdTriangleMarkerB = 0x3D67;
    private const int MarkerCountForTriangleReverse = 3;
    private const int MarkerCountEndDetermination = 6;
    private const float MarkerAnchorX = 100f;
    private const float MarkerAnchorZ = 86f;
    private const float MarkerPositionEpsilon = 1.5f;

    private const string ElUnDetermined = "UnDetermined";
    private const string ElLeftOutside = "Left_Determined_Outside";
    private const string ElLeftInside = "Left_Determined_Inside";
    private const string ElLeftAvoid = "Left_Determined_Avoid";
    private const string ElRightOutside = "Right_Determined_Outside";
    private const string ElRightInside = "Right_Determined_Inside";
    private const string ElRightAvoid = "Right_Determined_Avoid";

    private static readonly string[] AllWaveOverlayElementNames =
    [
        ElUnDetermined,
        ElLeftOutside,
        ElLeftInside,
        ElLeftAvoid,
        ElRightOutside,
        ElRightInside,
        ElRightAvoid,
    ];

    private const int MaxWaveStage = 6;
    private const int WaveStageIdle = -1;
    private const int MinPartySize = 8;
    private const double RainbowHueCycleSeconds = 4d;

    #endregion

    #region Config
    private Config C => Controller.GetConfig<Config>();
    #endregion

    #region State

    private int _waveStage = WaveStageIdle;
    private GroupAssignment? _debugMyGroup;
    private int _debugPartyCountObjects;

    private TransitionPatternType _transitionPatternType = TransitionPatternType.Unknown;
    private bool _markerSnapshotCaptured;
    private bool _markerDeterminationEnded;
    private int _lastMarkerObjectCount;

    #endregion

    // True when scene id is P3 transition (3 or 4).
    private static bool IsP3TransitionScene(int scene) => scene is 3 or 4;

    #region LifeCycle

    public override void OnSetup()
    {
        RegisterWaveOverlayElements();
        DisableAllWaveOverlayElements();
    }

    // Registers wave overlay elements from preset JSON (values stay literal in JSON).
    private void RegisterWaveOverlayElements()
    {
        Controller.RegisterElementFromCode(ElUnDetermined,
            """{"Name":"UnDetermined","Enabled":false,"type":1,"offY":-17.3,"radius":2.17,"thicc":10.0,"fillIntensity":0.5,"refActorDataID":15717,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":0.0,"tether":true}""");
        Controller.RegisterElementFromCode(ElLeftOutside,
            """{"Name":"Left_Determined_Outside","Enabled":false,"type":1,"offX":3.5,"offY":-18.4,"radius":0.8,"thicc":10.0,"fillIntensity":0.5,"refActorDataID":15717,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":0.0,"tether":true}""");
        Controller.RegisterElementFromCode(ElLeftInside,
            """{"Name":"Left_Determined_Inside","Enabled":false,"type":1,"offX":3.0,"offY":-16.5,"radius":0.8,"thicc":10.0,"fillIntensity":0.5,"refActorDataID":15717,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":0.0,"tether":true}""");
        Controller.RegisterElementFromCode(ElLeftAvoid,
            """{"Name":"Left_Determined_Avoid","Enabled":false,"type":1,"offX":-4.5,"offY":-16.0,"radius":0.8,"thicc":10.0,"fillIntensity":0.5,"refActorDataID":15717,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":0.0,"tether":true}""");
        Controller.RegisterElementFromCode(ElRightOutside,
            """{"Name":"Right_Determined_Outside","Enabled":false,"type":1,"offX":-3.5,"offY":-18.4,"radius":0.8,"thicc":10.0,"fillIntensity":0.5,"refActorDataID":15717,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":0.0,"tether":true}""");
        Controller.RegisterElementFromCode(ElRightInside,
            """{"Name":"Right_Determined_Inside","Enabled":false,"type":1,"offX":-3.0,"offY":-16.5,"radius":0.8,"thicc":10.0,"fillIntensity":0.5,"refActorDataID":15717,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":0.0,"tether":true}""");
        Controller.RegisterElementFromCode(ElRightAvoid,
            """{"Name":"Right_Determined_Avoid","Enabled":false,"type":1,"offX":4.5,"offY":-16.0,"radius":0.8,"thicc":10.0,"fillIntensity":0.5,"refActorDataID":15717,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":0.0,"tether":true}""");
    }

    public override void OnUpdate()
    {
        if(!IsP3TransitionScene(Controller.Scene))
        {
            if(_waveStage != WaveStageIdle) EndTransitionPhase();
            return;
        }

        UpdateDebugMyGroup();
        UpdateTransitionPatternMarkers();
        ApplyGuideVisibility();
    }

    public override void OnReset()
    {
        _waveStage = WaveStageIdle;
        _debugMyGroup = null;
        ResetTransitionPatternState();
        DisableAllWaveOverlayElements();
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if(castId == StartTransitionCastId)
        {
            BeginTransitionFromCast();
        }
    }

    public override void OnActionEffectEvent(ActionEffectSet set)
    {
        if(_waveStage == WaveStageIdle) return;
        if(!IsP3TransitionScene(Controller.Scene)) return;
        if(set.Action == null || set.Source == null) return;
        if(set.Source is not IBattleNpc sourceBattleNpc) return;
        if(sourceBattleNpc.ObjectKind != ObjectKind.BattleNpc && sourceBattleNpc.ObjectKind != ObjectKind.EventNpc) return;

        var actionId = set.Action.Value.RowId;

        if(!WaveIncrementCastIds.Contains(actionId)) return;

        _waveStage = Math.Min(_waveStage + 1, MaxWaveStage);
        PluginLog.Information($"[P3 Transition] Wave via ActionEffect actionId={actionId}, waveStage={_waveStage}, sourceDataId={sourceBattleNpc.DataId}");

        if(_waveStage == MaxWaveStage) EndTransitionPhase();
    }

    // Clears overlays and idle wave state when the transition sequence ends.
    private void EndTransitionPhase()
    {
        DisableAllWaveOverlayElements();
        _waveStage = WaveStageIdle;
        ResetTransitionPatternState();
    }

    // Starts counting waves when the transition opener cast begins.
    private void BeginTransitionFromCast()
    {
        if(!IsP3TransitionScene(Controller.Scene)) return;
        if(_waveStage != WaveStageIdle) return;

        _waveStage = 0;
        ResetTransitionPatternState();
    }

    public override void OnSettingsDraw()
    {
        ImGui.Text("Priority settings");
        C.PriorityData.Draw();

        ImGui.Text("\nGroup direction settings");
        DrawDirectionSelector("Stack1 (High 1 + None 1)", GroupAssignment.Stack1);
        DrawDirectionSelector("Stack2 (High 2 + None 2)", GroupAssignment.Stack2);
        DrawDirectionSelector("Spread1", GroupAssignment.Spread1);
        DrawDirectionSelector("Spread2", GroupAssignment.Spread2);
        DrawDirectionSelector("Spread3", GroupAssignment.Spread3);
        DrawDirectionSelector("Spread4", GroupAssignment.Spread4);

        if(ImGui.CollapsingHeader("Debug"))
        {
            ImGui.Text($"Wave stage ({WaveStageIdle} = idle / NotTransition): {_waveStage}");
            ImGui.Text($"Phase: {GetTransitionPhaseState()}");
            ImGui.Text($"BasePlayer: {BasePlayer?.Name.ToString() ?? "Unknown"}");
            ImGui.Text($"My Group: {_debugMyGroup?.ToString() ?? "Unknown"}");
            ImGui.Text($"Type: {_transitionPatternType}");
            ImGui.Text($"Controller.Scene (3 or 4): {Controller.Scene}");
        }
    }

    #endregion

    #region Private Method

    // ImGui combo to pick arena direction for one group assignment slot.
    private void DrawDirectionSelector(string label, GroupAssignment group)
    {
        var currentDirectionSpot = C.GroupDirection[group];
        if(ImGui.BeginCombo(label, currentDirectionSpot.ToString()))
        {
            foreach(var spot in Enum.GetValues<DirectionSpot>())
            {
                var selected = currentDirectionSpot == spot;
                if(ImGui.Selectable(spot.ToString(), selected))
                {
                    C.GroupDirection[group] = spot;
                }

                if(selected) ImGui.SetItemDefaultFocus();
            }

            ImGui.EndCombo();
        }
    }

    // Maps wave stage and marker pattern to a coarse UI phase label.
    private TransitionPhaseState GetTransitionPhaseState()
    {
        if(_waveStage == WaveStageIdle) return TransitionPhaseState.NotTransition;

        if(_waveStage >= 1)
        {
            return _waveStage switch
            {
                1 => TransitionPhaseState.Wave1,
                2 => TransitionPhaseState.Wave2,
                3 => TransitionPhaseState.Wave3,
                4 => TransitionPhaseState.Wave4,
                5 => TransitionPhaseState.Wave5,
                6 => TransitionPhaseState.Wave6,
            };
        }

        if(_transitionPatternType != TransitionPatternType.Unknown) return TransitionPhaseState.DeterminedGuide;

        return TransitionPhaseState.UnDeterminedGuide;
    }

    // Tracks triangle markers on field to decide triangle vs reverse pattern.
    private void UpdateTransitionPatternMarkers()
    {
        if(_waveStage == WaveStageIdle || _markerDeterminationEnded) return;

        var markers = Svc.Objects
            .Where(x => x.DataId.EqualsAny<uint>(DataIdTriangleMarkerA, DataIdTriangleMarkerB))
            .Where(IsTransitionMarkerEligible)
            .ToList();

        _lastMarkerObjectCount = markers.Count;

        if(!_markerSnapshotCaptured && markers.Count >= MarkerCountForTriangleReverse)
        {
            _markerSnapshotCaptured = true;
            var hasAnchor = markers.Any(IsAtTriangleAnchorPosition);
            _transitionPatternType = hasAnchor ? TransitionPatternType.Triangle : TransitionPatternType.Reverse;
        }

        if(markers.Count >= MarkerCountEndDetermination)
        {
            _markerDeterminationEnded = true;
        }
    }

    // True when a marker sits on the fixed triangle anchor near north edge.
    private static bool IsAtTriangleAnchorPosition(IGameObject obj)
    {
        var position = obj.Position;
        return MathF.Abs(position.X - MarkerAnchorX) < MarkerPositionEpsilon && MathF.Abs(position.Z - MarkerAnchorZ) < MarkerPositionEpsilon;
    }

    // Filters objects that count as transition triangle markers.
    private static bool IsTransitionMarkerEligible(IGameObject obj)
    {
        if(obj.EntityId == 0) return false;

        return obj is ICharacter character && character.IsCharacterVisible();
    }

    // Clears marker snapshot flags when leaving transition logic.
    private void ResetTransitionPatternState()
    {
        _transitionPatternType = TransitionPatternType.Unknown;
        _markerSnapshotCaptured = false;
        _markerDeterminationEnded = false;
        _lastMarkerObjectCount = 0;
    }

    // Nearest living PCs to local player for role resolution (up to 8).
    private List<IPlayerCharacter> GetPartyMembers()
    {
        var partyMembersSortedByDistance = Svc.Objects
            .OfType<IPlayerCharacter>()
            .Where(x => !x.IsDead && x.CurrentHp > 0)
            .OrderBy(x => Vector3.Distance(x.Position, Player.Object?.Position ?? x.Position))
            .Take(MinPartySize)
            .ToList();
        _debugPartyCountObjects = partyMembersSortedByDistance.Count;
        return partyMembersSortedByDistance;
    }

    // Resolves which stack/spread slot the configured player occupies from debuffs.
    private bool TryResolveCurrentAssignment(out GroupAssignment? assignment)
    {
        assignment = null;
        var partyMembers = GetPartyMembers();
        if(partyMembers.Count < MinPartySize) return false;

        var targetPlayer = GetProcessingPlayer();
        if(targetPlayer == null) return false;

        assignment = ResolveGroupAssignment(targetPlayer.EntityId, partyMembers);
        return true;
    }

    // Maps local player entity id to group using sniper debuff ordering rules.
    private GroupAssignment? ResolveGroupAssignment(uint localPlayerEntityId, IReadOnlyList<IPlayerCharacter> partyMembers)
    {
        var sniperCannonOrdered = OrderByPriority(partyMembers.Where(x => HasStatus(x, StatusSniperCannon))).ToList();
        var sniperWaveOrdered = OrderByPriority(partyMembers.Where(x => HasStatus(x, StatusSniperWave))).ToList();
        var neitherDebuffOrdered = OrderByPriority(partyMembers.Where(x => !HasStatus(x, StatusSniperCannon) && !HasStatus(x, StatusSniperWave))).ToList();

        if(sniperCannonOrdered.Count >= 1 && sniperCannonOrdered[0].EntityId == localPlayerEntityId) return GroupAssignment.Stack1;
        if(sniperCannonOrdered.Count >= 2 && sniperCannonOrdered[1].EntityId == localPlayerEntityId) return GroupAssignment.Stack2;
        if(neitherDebuffOrdered.Count >= 1 && neitherDebuffOrdered[0].EntityId == localPlayerEntityId) return GroupAssignment.Stack1;
        if(neitherDebuffOrdered.Count >= 2 && neitherDebuffOrdered[1].EntityId == localPlayerEntityId) return GroupAssignment.Stack2;
        if(sniperWaveOrdered.Count >= 1 && sniperWaveOrdered[0].EntityId == localPlayerEntityId) return GroupAssignment.Spread1;
        if(sniperWaveOrdered.Count >= 2 && sniperWaveOrdered[1].EntityId == localPlayerEntityId) return GroupAssignment.Spread2;
        if(sniperWaveOrdered.Count >= 3 && sniperWaveOrdered[2].EntityId == localPlayerEntityId) return GroupAssignment.Spread3;
        if(sniperWaveOrdered.Count >= 4 && sniperWaveOrdered[3].EntityId == localPlayerEntityId) return GroupAssignment.Spread4;

        return null;
    }

    // Refreshes debug-only cached group for the operating player.
    private void UpdateDebugMyGroup()
    {
        _debugMyGroup = TryResolveCurrentAssignment(out var assignment) ? assignment : null;
    }

    // Player this script uses for assignment (BasePlayer / playback override).
    private IPlayerCharacter? GetProcessingPlayer() => BasePlayer;

    // Orders players by script priority list then entity id.
    private IEnumerable<IPlayerCharacter> OrderByPriority(IEnumerable<IPlayerCharacter> players)
        => players.OrderBy(GetPriorityIndex).ThenBy(x => x.EntityId);

    // Zero-based index in priority config, or max when unknown.
    private int GetPriorityIndex(IPlayerCharacter player)
    {
        var priorityList = C.PriorityData.GetPlayers(_ => true)?.ToList();
        if(priorityList == null) return int.MaxValue;

        var name = player.Name.ToString();
        for(var index = 0; index < priorityList.Count; index++)
        {
            if(priorityList[index].Name == name) return index;
        }

        return int.MaxValue;
    }

    // True if the player currently has the given status id.
    private static bool HasStatus(IPlayerCharacter player, uint statusId)
        => player.StatusList.Any(x => x.StatusId == statusId);

    // Each frame: refresh overlay when in waves, otherwise hide all.
    private void ApplyGuideVisibility()
    {
        if(_waveStage != WaveStageIdle) UpdateWaveOverlayVisibility();
        else DisableAllWaveOverlayElements();
    }

    // Disables every registered wave overlay element.
    private void DisableAllWaveOverlayElements()
    {
        foreach(var elementName in AllWaveOverlayElementNames)
        {
            if(Controller.TryGetElementByName(elementName, out var element))
            {
                element.Enabled = false;
                element.tether = false;
            }
        }
    }

    // Chooses which overlay to show from wave index and resolved group direction.
    private void UpdateWaveOverlayVisibility()
    {
        if(_waveStage == WaveStageIdle) return;

        _ = TryResolveCurrentAssignment(out var resolvedGroupAssignment);
        var directionSpot = resolvedGroupAssignment != null ? C.GroupDirection[resolvedGroupAssignment.Value] : DirectionSpot.NorthEast;
        var additionalRotationRadians = DirectionSpotToAdditionalRotation(directionSpot);

        DisableAllWaveOverlayElements();

        if(_waveStage >= MaxWaveStage)
        {
            return;
        }

        if(_waveStage >= 1)
        {
            switch(_waveStage)
            {
                case 1:
                case 3:
                case 4:
                    EnableDeterminedSideGuide(DeterminedSideGuideKind.Outside, additionalRotationRadians, directionSpot);
                    break;
                case 2:
                    EnableDeterminedSideGuide(DeterminedSideGuideKind.Inside, additionalRotationRadians, directionSpot);
                    break;
                case 5:
                    EnableDeterminedSideGuide(DeterminedSideGuideKind.Avoid, additionalRotationRadians, directionSpot);
                    break;
            }

            return;
        }

        switch(GetTransitionPhaseState())
        {
            case TransitionPhaseState.UnDeterminedGuide:
                SetNonWaveOverlayElement(ElUnDetermined, additionalRotationRadians);
                break;
            case TransitionPhaseState.DeterminedGuide:
                EnableDeterminedSideGuide(DeterminedSideGuideKind.Outside, additionalRotationRadians, directionSpot);
                break;
        }
    }

    // Turns on left/right outside/inside/avoid overlay for current pattern and facing.
    private void EnableDeterminedSideGuide(DeterminedSideGuideKind guideKind, float additionalRotationRadians, DirectionSpot directionSpot)
    {
        var displaySide = ResolveDisplaySide(directionSpot, _transitionPatternType);
        var elementName = displaySide == DisplaySide.Left
            ? guideKind switch
            {
                DeterminedSideGuideKind.Outside => ElLeftOutside,
                DeterminedSideGuideKind.Inside => ElLeftInside,
                DeterminedSideGuideKind.Avoid => ElLeftAvoid,
            }
            : guideKind switch
            {
                DeterminedSideGuideKind.Outside => ElRightOutside,
                DeterminedSideGuideKind.Inside => ElRightInside,
                DeterminedSideGuideKind.Avoid => ElRightAvoid,
            };
        SetNonWaveOverlayElement(elementName, additionalRotationRadians);
    }

    // Extra rotation (radians) applied to tether overlay for a compass slot.
    private static float DirectionSpotToAdditionalRotation(DirectionSpot spot)
        => spot switch
        {
            DirectionSpot.NorthEast => DegreesToRadians(30f),
            DirectionSpot.East => DegreesToRadians(90f),
            DirectionSpot.SouthEast => DegreesToRadians(150f),
            DirectionSpot.SouthWest => DegreesToRadians(210f),
            DirectionSpot.West => DegreesToRadians(270f),
            DirectionSpot.NorthWest => DegreesToRadians(330f),
            _ => 0f,
        };

    // Converts degrees to radians for element rotation fields.
    private static float DegreesToRadians(float deg) => deg * (MathF.PI / 180f);

    // Enables a named overlay element with tether, tint, and optional rotation.
    private void SetNonWaveOverlayElement(string elementName, float? additionalRotationRadians)
    {
        if(!Controller.TryGetElementByName(elementName, out var element)) return;
        element.Enabled = true;
        element.tether = true;
        element.color = GetRainbowColor(RainbowHueCycleSeconds).ToUint();
        if(additionalRotationRadians.HasValue)
        {
            element.AdditionalRotation = additionalRotationRadians.Value;
        }
    }

    // Full-saturation hue cycle for highlight tint on overlays.
    private Vector4 GetRainbowColor(double cycleSeconds)
    {
        if(cycleSeconds <= 0d)
        {
            cycleSeconds = 1d;
        }

        var tickMilliseconds = Environment.TickCount64;
        var normalizedTime = tickMilliseconds / 1000d / cycleSeconds;
        var hue = normalizedTime % 1f;
        return HsvToVector4(hue, 1f, 1f);
    }

    // HSV in 0–1 space to RGBA for ImGui tint conversion.
    private static Vector4 HsvToVector4(double h, double s, double v)
    {
        double r = 0f, g = 0f, b = 0f;
        var i = (int)(h * 6f);
        var f = h * 6f - i;
        var p = v * (1f - s);
        var q = v * (1f - f * s);
        var t = v * (1f - (1f - f) * s);

        switch(i % 6)
        {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }

        return new Vector4((float)r, (float)g, (float)b, 1f);
    }

    // Maps compass slot and triangle/reverse pattern to left vs right overlay set.
    private static DisplaySide ResolveDisplaySide(DirectionSpot spot, TransitionPatternType patternType)
    {
        if(patternType == TransitionPatternType.Reverse)
        {
            return spot switch
            {
                DirectionSpot.NorthEast => DisplaySide.Left,
                DirectionSpot.East => DisplaySide.Right,
                DirectionSpot.SouthEast => DisplaySide.Left,
                DirectionSpot.SouthWest => DisplaySide.Right,
                DirectionSpot.West => DisplaySide.Left,
                DirectionSpot.NorthWest => DisplaySide.Right,
                _ => DisplaySide.Right,
            };
        }

        return spot switch
        {
            DirectionSpot.NorthEast => DisplaySide.Right,
            DirectionSpot.East => DisplaySide.Left,
            DirectionSpot.SouthEast => DisplaySide.Right,
            DirectionSpot.SouthWest => DisplaySide.Left,
            DirectionSpot.West => DisplaySide.Right,
            DirectionSpot.NorthWest => DisplaySide.Left,
            _ => DisplaySide.Right,
        };
    }

    #endregion

    #region Private Class

    private enum DeterminedSideGuideKind
    {
        Outside,
        Inside,
        Avoid,
    }

    private enum GroupAssignment
    {
        Stack1,
        Stack2,
        Spread1,
        Spread2,
        Spread3,
        Spread4,
    }

    private enum DirectionSpot
    {
        NorthEast,
        East,
        SouthEast,
        SouthWest,
        West,
        NorthWest,
    }

    private enum DisplaySide
    {
        Left,
        Right,
    }

    private enum TransitionPatternType
    {
        Unknown,
        Triangle,
        Reverse,
    }

    private enum TransitionPhaseState
    {
        NotTransition,
        UnDeterminedGuide,
        DeterminedGuide,
        Wave1,
        Wave2,
        Wave3,
        Wave4,
        Wave5,
        Wave6,
    }

    #endregion

    #region Config

    private class Config : IEzConfig
    {
        public PriorityData PriorityData = new();
        public Dictionary<GroupAssignment, DirectionSpot> GroupDirection = new()
        {
            [GroupAssignment.Stack1] = DirectionSpot.NorthWest,
            [GroupAssignment.Stack2] = DirectionSpot.NorthEast,
            [GroupAssignment.Spread1] = DirectionSpot.West,
            [GroupAssignment.Spread2] = DirectionSpot.SouthWest,
            [GroupAssignment.Spread3] = DirectionSpot.SouthEast,
            [GroupAssignment.Spread4] = DirectionSpot.East,
        };
    }

    #endregion
}
```

#### Configuration - コロッサスブロー

##### Priority - コロッサスブロー

優先度設定が必要  
上から`H1,MT,ST,D1,D2,D3,D4,H2`

##### Group directon settings - コロッサスブロー

- Stack (High 1 + None 1)  
    `NorthWest`
- Stack (High 2 + None 2)  
    `NorthEast`
- Spread1  
    `West`
- Spread2  
    `SouthWest`
- Spread3  
    `SouthEast`
- Spread4  
    `East`

#### Registered Elements - コロッサスブロー

塗りつぶしを無効にし、線の太さを4に設定しています。  
お好みに応じて導入や調整を行ってください。

```json
{"Elements":{"UnDetermined":{"Name":"UnDetermined","type":1,"Enabled":false,"offX":0.0,"offY":-17.3,"offZ":0.0,"radius":2.0,"color":4278228479,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15717,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.5235988,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"Left_Determined_Outside":{"Name":"Left_Determined_Outside","type":1,"Enabled":false,"offX":3.5,"offY":-18.4,"offZ":0.0,"radius":0.8,"color":4294907392,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15717,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.5235988,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"Left_Determined_Inside":{"Name":"Left_Determined_Inside","type":1,"Enabled":false,"offX":3.0,"offY":-16.5,"offZ":0.0,"radius":0.8,"color":4278240767,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15717,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.5235988,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"Left_Determined_Avoid":{"Name":"Left_Determined_Avoid","type":1,"Enabled":false,"offX":-4.5,"offY":-16.0,"offZ":0.0,"radius":0.8,"color":4278255613,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15717,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.5235988,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"Right_Determined_Outside":{"Name":"Right_Determined_Outside","type":1,"Enabled":false,"offX":-3.5,"offY":-18.4,"offZ":0.0,"radius":0.8,"color":4286709504,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15717,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.5235988,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"Right_Determined_Inside":{"Name":"Right_Determined_Inside","type":1,"Enabled":false,"offX":-3.0,"offY":-16.5,"offZ":0.0,"radius":0.8,"color":4283563776,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15717,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.5235988,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"Right_Determined_Avoid":{"Name":"Right_Determined_Avoid","type":1,"Enabled":false,"offX":4.5,"offY":-16.0,"offZ":0.0,"radius":0.8,"color":4287102720,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15717,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.5235988,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false}}}
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

### P3 検知式波動砲 (十字式)

AIに作成させた十字処理での検知式波動砲のスクリプト  
リリドで採用されてるast式?が必要な場合は公式のリポジトリを参照してください。

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using Dalamud.Bindings.ImGui;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.DalamudServices.Legacy;
using ECommons.GameHelpers;
using ECommons.ImGuiMethods;
using Splatoon.SplatoonScripting;
using Splatoon.SplatoonScripting.Priority;
using System.Collections.Generic;
using System.Linq;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

public unsafe class TOP_Cross_Oversampled_Wave_Cannon : SplatoonScript
{
    private static readonly string[] Slots = { "MT", "ST", "H1", "H2", "D1", "D2", "D3", "D4" };
    private static readonly string[] THSlots = { "MT", "ST", "H1", "H2" };
    private static readonly string[] DPSSlots = { "D1", "D2", "D3", "D4" };

    public override HashSet<uint> ValidTerritories { get; } = new HashSet<uint>() { 1122 };
    public override Metadata Metadata => new(2, "kudry + Codex");

    private Config Conf => Controller.GetConfig<Config>();
    private PriorityData PriorityData
    {
        get
        {
            if (Conf.PriorityData == null)
                Conf.PriorityData = new PriorityData();

            return Conf.PriorityData;
        }
    }

    public override void OnSetup()
    {
        Controller.RegisterElementFromCode("RoleMonitorCount", "{\"Name\":\"RoleMonitorCount\",\"Enabled\":false,\"refX\":100.0,\"refY\":100.0,\"refZ\":0.0,\"radius\":0.0,\"overlayBGColor\":3355443200,\"overlayTextColor\":3355508480,\"overlayVOffset\":3.0,\"overlayFScale\":5.0,\"thicc\":5.0,\"overlayText\":\"TH 0/4\",\"tether\":false}");

        RegisterGuide("検知なし Tank 北 31595 Right", 98.26352f, 90.15192f);
        RegisterGuide("検知あり Tank  北 31595 Right", 94.26424f, 91.80848f);
        RegisterGuide("検知なし Tank 北 31596 Left", 101.73648f, 90.15192f);
        RegisterGuide("検知あり Tank 北 31596 Left", 105.73576f, 91.80848f);
        RegisterGuide("検知なし Tank 東", 110.0f, 100.0f);
        RegisterGuide("検知あり Tank 東 + 南", 108.19152f, 105.73576f);
        RegisterGuide("検知あり Tank 東 + 北", 108.19152f, 94.26424f);

        RegisterGuide("検知なし Healer 北 31595 Right", 98.38762f, 81.5704f);
        RegisterGuide("検知あり Healer  北 31595 Right", 94.59112f, 82.30836f);
        RegisterGuide("検知なし Healer 北 31596 Left", 101.61238f, 81.5704f);
        RegisterGuide("検知あり Healer 北 31596 Left", 105.40888f, 82.30836f);
        RegisterGuide("検知なし Healer 東", 118.5f, 100.0f);
        RegisterGuide("検知あり Healer 東 + 南", 117.69164f, 105.40888f);

        RegisterGuide("検知なし Melee 南 31595 Right", 98.26352f, 109.84808f);
        RegisterGuide("検知あり Melee  南 31595 Right", 94.26424f, 108.19152f);
        RegisterGuide("検知なし Melee 南 31596 Left", 101.73648f, 109.84808f);
        RegisterGuide("検知あり Melee 南 31596 Left", 105.73576f, 108.19152f);
        RegisterGuide("検知なし Melee 西", 90.0f, 100.0f);
        RegisterGuide("検知あり Melee 西 + 北", 91.80848f, 94.26424f);
        RegisterGuide("検知あり Melee 西 + 南", 91.80848f, 105.73576f);

        RegisterGuide("検知なし Range 南 31595 Right", 98.38762f, 118.4296f);
        RegisterGuide("検知あり Range 南 31595 Right", 94.59112f, 117.69164f);
        RegisterGuide("検知なし Range 南 31596 Left", 101.61238f, 118.4296f);
        RegisterGuide("検知あり Range 南 31596 Left", 105.40888f, 117.69164f);
        RegisterGuide("検知なし Range 西", 81.5f, 100.0f);
        RegisterGuide("検知あり Range 西 + 北", 82.30836f, 94.59112f);
    }

    public override void OnUpdate()
    {
        OffAll();

        if (!IsMechanicRunning(out var castId))
            return;

        var localPlayer = GetBasePlayer();
        if (localPlayer == null)
            return;

        var mySlot = GetPrioritySlot(localPlayer);
        if (mySlot == "Unknown")
            return;

        var isSupport = IsTHSlot(mySlot);
        var monitorSlots = GetMonitorSlots(isSupport);
        var monitorCount = monitorSlots.Count;

        var countElement = Controller.GetElementByName("RoleMonitorCount");
        countElement.overlayText = $"{(isSupport ? "TH" : "DPS")} {monitorCount}/4";
        countElement.Enabled = true;

        var guideName = ResolveGuideName(isSupport, castId, mySlot, GetMonitorKey(monitorSlots));
        if (guideName == null)
            return;

        Controller.GetElementByName(guideName).Enabled = true;
    }

    private void RegisterGuide(string name, float x, float y)
    {
        Controller.RegisterElementFromCode(name, $"{{\"Name\":\"{name}\",\"Enabled\":false,\"refX\":{x},\"refY\":{y},\"refZ\":0.0,\"radius\":1.0,\"color\":3358064384,\"Filled\":false,\"fillIntensity\":0.5,\"overlayBGColor\":1879048192,\"overlayTextColor\":3372220415,\"thicc\":4.0,\"overlayText\":\"\",\"tether\":true}}");
    }

    private void OffAll()
    {
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
    }

    public override void OnSettingsDraw()
    {
        ImGuiEx.Text("Priority list: MT, ST, H1, H2, D1, D2, D3, D4");
        ImGuiEx.Text("Set players in this exact order.");
        PriorityData.Draw();

        ImGui.Separator();
        ImGui.SetNextItemWidth(220);
        if (ImGui.BeginCombo("Script Override", string.IsNullOrEmpty(Conf.BasePlayerOverride) ? "No Override" : Conf.BasePlayerOverride))
        {
            if (ImGui.Selectable("No Override", string.IsNullOrEmpty(Conf.BasePlayerOverride)))
                Conf.BasePlayerOverride = "";

            foreach (var player in Svc.Objects.OfType<IPlayerCharacter>())
            {
                var name = player.Name.ToString();
                if (ImGui.Selectable(name, Conf.BasePlayerOverride == name))
                    Conf.BasePlayerOverride = name;
            }

            ImGui.EndCombo();
        }

        ImGui.Checkbox("PrintDebug", ref Conf.IsDebug);
        if (ImGui.CollapsingHeader("Debug"))
        {
            var localPlayer = GetBasePlayer();
            var mySlot = localPlayer == null ? "Unknown" : GetPrioritySlot(localPlayer);
            var isSupport = mySlot == "Unknown" ? false : IsTHSlot(mySlot);
            var monitorSlots = mySlot == "Unknown" ? new List<string>() : GetMonitorSlots(isSupport);
            var castText = IsMechanicRunning(out var castId) ? castId.ToString() : "None";

            ImGuiEx.Text($"My priority slot: {mySlot}");
            ImGuiEx.Text($"My role group: {(isSupport ? "TH" : "DPS")}");
            ImGuiEx.Text($"Script Override: {(string.IsNullOrEmpty(Conf.BasePlayerOverride) ? "No Override" : Conf.BasePlayerOverride)}");
            ImGuiEx.Text($"Base player: {(localPlayer == null ? "None" : localPlayer.Name.ToString())}");
            ImGuiEx.Text($"Boss cast: {castText}");
            ImGuiEx.Text($"Role group monitor count: {monitorSlots.Count}/4");
            ImGuiEx.Text($"Role group monitor slots: {GetMonitorKey(monitorSlots)}");
            ImGuiEx.Text($"Guide: {ResolveGuideName(isSupport, castId, mySlot, GetMonitorKey(monitorSlots)) ?? "None"}");
        }
    }

    private List<string> GetMonitorSlots(bool isSupport)
    {
        var groupSlots = isSupport ? THSlots : DPSSlots;
        var priorityPlayers = PriorityData.GetPlayers(x => x.IGameObject is IPlayerCharacter);
        var result = new List<string>();

        if (priorityPlayers == null)
            return result;

        var players = priorityPlayers.ToList();

        for (var i = 0; i < players.Count && i < Slots.Length; i++)
        {
            if (!groupSlots.Contains(Slots[i]))
                continue;

            if (players[i].IGameObject is IPlayerCharacter player && player.HasOversampledMonitor())
                result.Add(Slots[i]);
        }

        return result;
    }

    private string GetMonitorKey(List<string> monitorSlots)
    {
        var order = monitorSlots.Any(x => IsTHSlot(x)) ? THSlots : DPSSlots;
        return string.Join(",", order.Where(monitorSlots.Contains));
    }

    private static bool IsMechanicRunning(out uint castId)
    {
        var caster = Svc.Objects.FirstOrDefault(x => x is IBattleChara b && (b.CastActionId == 31595 || b.CastActionId == 31596)) as IBattleChara;
        if (caster != null)
        {
            castId = caster.CastActionId;
            return true;
        }

        castId = 0;
        return false;
    }

    private string GetPrioritySlot(IPlayerCharacter player)
    {
        var priorityPlayers = PriorityData.GetPlayers(x => x.IGameObject is IPlayerCharacter);
        if (priorityPlayers == null)
            return "Unknown";

        var players = priorityPlayers.ToList();

        for (var i = 0; i < players.Count && i < Slots.Length; i++)
        {
            if (players[i].Name.ToString() == player.Name.ToString())
                return Slots[i];
        }

        return "Unknown";
    }

    private IPlayerCharacter GetBasePlayer()
    {
        if (!string.IsNullOrEmpty(Conf.BasePlayerOverride))
        {
            var overridePlayer = Svc.Objects
                .OfType<IPlayerCharacter>()
                .FirstOrDefault(x => string.Equals(x.Name.ToString(), Conf.BasePlayerOverride, System.StringComparison.OrdinalIgnoreCase));

            if (overridePlayer != null)
                return overridePlayer;
        }

        return Player.Object;
    }

    private static bool IsTHSlot(string slot)
    {
        return slot is "MT" or "ST" or "H1" or "H2";
    }

    private static string ResolveGuideName(bool isSupport, uint castId, string slot, string monitorKey)
    {
        if (isSupport)
            return ResolveTHGuideName(castId, slot, monitorKey);

        return ResolveDPSGuideName(castId, slot, monitorKey);
    }

    private static string ResolveTHGuideName(uint castId, string slot, string monitorKey)
    {
        return monitorKey switch
        {
            "" => slot switch
            {
                "MT" => TankNorth(castId, false),
                "ST" => "検知なし Tank 東",
                "H1" => HealerNorth(castId, false),
                "H2" => "検知なし Healer 東",
                _ => null
            },
            "MT" or "ST" => slot switch
            {
                "MT" => monitorKey == "MT" ? "検知あり Tank 東 + 南" : TankNorth(castId, false),
                "ST" => monitorKey == "ST" ? "検知あり Tank 東 + 南" : TankNorth(castId, false),
                "H1" => HealerNorth(castId, false),
                "H2" => "検知なし Healer 東",
                _ => null
            },
            "H1" or "H2" => slot switch
            {
                "MT" => TankNorth(castId, false),
                "ST" => "検知なし Tank 東",
                "H1" => monitorKey == "H1" ? "検知あり Healer 東 + 南" : HealerNorth(castId, false),
                "H2" => monitorKey == "H2" ? "検知あり Healer 東 + 南" : HealerNorth(castId, false),
                _ => null
            },
            "MT,ST" => slot switch
            {
                "MT" => TankNorth(castId, true),
                "ST" => "検知あり Tank 東 + 南",
                "H1" => HealerNorth(castId, false),
                "H2" => "検知なし Healer 東",
                _ => null
            },
            "MT,H1" => slot switch
            {
                "MT" => "検知あり Tank 東 + 南",
                "ST" => TankNorth(castId, false),
                "H1" => HealerNorth(castId, true),
                "H2" => "検知なし Healer 東",
                _ => null
            },
            "MT,H2" => slot switch
            {
                "MT" => TankNorth(castId, true),
                "ST" => "検知なし Tank 東",
                "H1" => HealerNorth(castId, false),
                "H2" => "検知あり Healer 東 + 南",
                _ => null
            },
            "ST,H1" => slot switch
            {
                "MT" => TankNorth(castId, false),
                "ST" => "検知あり Tank 東 + 南",
                "H1" => HealerNorth(castId, true),
                "H2" => "検知なし Healer 東",
                _ => null
            },
            "ST,H2" => slot switch
            {
                "MT" => "検知なし Tank 東",
                "ST" => TankNorth(castId, true),
                "H1" => HealerNorth(castId, false),
                "H2" => "検知あり Healer 東 + 南",
                _ => null
            },
            "H1,H2" => slot switch
            {
                "MT" => TankNorth(castId, false),
                "ST" => "検知なし Tank 東",
                "H1" => HealerNorth(castId, true),
                "H2" => "検知あり Healer 東 + 南",
                _ => null
            },
            "MT,ST,H1" => slot switch
            {
                "MT" => TankNorth(castId, true),
                "ST" => "検知あり Tank 東 + 北",
                "H1" => "検知あり Healer 東 + 南",
                "H2" => HealerNorth(castId, false),
                _ => null
            },
            "MT,ST,H2" => slot switch
            {
                "MT" => TankNorth(castId, true),
                "ST" => "検知あり Tank 東 + 北",
                "H1" => HealerNorth(castId, false),
                "H2" => "検知あり Healer 東 + 南",
                _ => null
            },
            "MT,H1,H2" => slot switch
            {
                "MT" => "検知あり Tank 東 + 北",
                "ST" => TankNorth(castId, false),
                "H1" => HealerNorth(castId, true),
                "H2" => "検知あり Healer 東 + 南",
                _ => null
            },
            "ST,H1,H2" => slot switch
            {
                "MT" => TankNorth(castId, false),
                "ST" => "検知あり Tank 東 + 北",
                "H1" => HealerNorth(castId, true),
                "H2" => "検知あり Healer 東 + 南",
                _ => null
            },
            _ => null
        };
    }

    private static string ResolveDPSGuideName(uint castId, string slot, string monitorKey)
    {
        return monitorKey switch
        {
            "" => slot switch
            {
                "D1" => "検知なし Melee 西",
                "D2" => MeleeSouth(castId, false),
                "D3" => "検知なし Range 西",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D1" => slot switch
            {
                "D1" => "検知あり Melee 西 + 北",
                "D2" => MeleeSouth(castId, false),
                "D3" => "検知なし Range 西",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D2" => slot switch
            {
                "D1" => MeleeSouth(castId, false),
                "D2" => "検知あり Melee 西 + 北",
                "D3" => "検知なし Range 西",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D3" => slot switch
            {
                "D1" => "検知なし Melee 西",
                "D2" => MeleeSouth(castId, false),
                "D3" => "検知あり Range 西 + 北",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D4" => slot switch
            {
                "D1" => "検知なし Melee 西",
                "D2" => MeleeSouth(castId, false),
                "D3" => RangeSouth(castId, false),
                "D4" => "検知あり Range 西 + 北",
                _ => null
            },
            "D1,D2" => slot switch
            {
                "D1" => "検知あり Melee 西 + 北",
                "D2" => MeleeSouth(castId, true),
                "D3" => "検知なし Range 西",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D1,D3" => slot switch
            {
                "D1" => MeleeSouth(castId, true),
                "D2" => "検知なし Melee 西",
                "D3" => "検知あり Range 西 + 北",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D1,D4" => slot switch
            {
                "D1" => "検知あり Melee 西 + 北",
                "D2" => MeleeSouth(castId, false),
                "D3" => "検知なし Range 西",
                "D4" => RangeSouth(castId, true),
                _ => null
            },
            "D2,D3" => slot switch
            {
                "D1" => "検知なし Melee 西",
                "D2" => MeleeSouth(castId, true),
                "D3" => "検知あり Range 西 + 北",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D2,D4" => slot switch
            {
                "D1" => MeleeSouth(castId, false),
                "D2" => "検知あり Melee 西 + 北",
                "D3" => "検知なし Range 西",
                "D4" => RangeSouth(castId, true),
                _ => null
            },
            "D3,D4" => slot switch
            {
                "D1" => "検知なし Melee 西",
                "D2" => MeleeSouth(castId, false),
                "D3" => "検知あり Range 西 + 北",
                "D4" => RangeSouth(castId, true),
                _ => null
            },
            "D1,D2,D3" => slot switch
            {
                "D1" => "検知あり Melee 西 + 南",
                "D2" => MeleeSouth(castId, true),
                "D3" => "検知あり Range 西 + 北",
                "D4" => RangeSouth(castId, false),
                _ => null
            },
            "D1,D2,D4" => slot switch
            {
                "D1" => "検知あり Melee 西 + 南",
                "D2" => MeleeSouth(castId, true),
                "D3" => RangeSouth(castId, false),
                "D4" => "検知あり Range 西 + 北",
                _ => null
            },
            "D1,D3,D4" => slot switch
            {
                "D1" => "検知あり Melee 西 + 南",
                "D2" => MeleeSouth(castId, false),
                "D3" => "検知あり Range 西 + 北",
                "D4" => RangeSouth(castId, true),
                _ => null
            },
            "D2,D3,D4" => slot switch
            {
                "D1" => MeleeSouth(castId, false),
                "D2" => "検知あり Melee 西 + 南",
                "D3" => "検知あり Range 西 + 北",
                "D4" => RangeSouth(castId, true),
                _ => null
            },
            _ => null
        };
    }

    private static string TankNorth(uint castId, bool monitor)
    {
        if (castId == 31595)
            return monitor ? "検知あり Tank  北 31595 Right" : "検知なし Tank 北 31595 Right";

        if (castId == 31596)
            return monitor ? "検知あり Tank 北 31596 Left" : "検知なし Tank 北 31596 Left";

        return null;
    }

    private static string HealerNorth(uint castId, bool monitor)
    {
        if (castId == 31595)
            return monitor ? "検知あり Healer  北 31595 Right" : "検知なし Healer 北 31595 Right";

        if (castId == 31596)
            return monitor ? "検知あり Healer 北 31596 Left" : "検知なし Healer 北 31596 Left";

        return null;
    }

    private static string MeleeSouth(uint castId, bool monitor)
    {
        if (castId == 31595)
            return monitor ? "検知あり Melee  南 31595 Right" : "検知なし Melee 南 31595 Right";

        if (castId == 31596)
            return monitor ? "検知あり Melee 南 31596 Left" : "検知なし Melee 南 31596 Left";

        return null;
    }

    private static string RangeSouth(uint castId, bool monitor)
    {
        if (castId == 31595)
            return monitor ? "検知あり Range 南 31595 Right" : "検知なし Range 南 31595 Right";

        if (castId == 31596)
            return monitor ? "検知あり Range 南 31596 Left" : "検知なし Range 南 31596 Left";

        return null;
    }

    public class Config : IEzConfig
    {
        public bool IsDebug = false;
        public string BasePlayerOverride = "";
        public PriorityData PriorityData = new PriorityData();
    }
}

public static class CrossOWCExtensions
{
    public static bool HasOversampledMonitor(this IPlayerCharacter player)
    {
        return player.StatusList.Any(x => x.StatusId == 3452 || x.StatusId == 3453);
    }
}
```

#### Priority - 検知式波動砲(十字式)

優先度設定が必要  
上から`MT,ST,H1,H2,D1,D2,D3,D4`

---

### P5 ハローワールド ニア/ファー

デバフ残り4秒でハローワールド：ニア/ファーデバフの範囲を表示します。  
設定不要

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using ECommons;
using ECommons.DalamudServices;
using ECommons.DalamudServices.Legacy;
using ECommons.GameHelpers;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

internal class TOP_P5_Hello_World_Near_Far : SplatoonScript
{
    private const uint NearStatusId = 3442;
    private const uint FarStatusId = 3443;
    private const float StatusThresholdSeconds = 4.0f;
    private const uint GreenColor = 4278255360;
    private const uint BlueColor = 3372154880;

    public override HashSet<uint>? ValidTerritories => [1122];
    public override Metadata? Metadata => new(1, "kudry + Codex");

    public override void OnSetup()
    {
        RegisterElement("NearOwner", 7.0f, GreenColor);
        RegisterElement("NearClosest1", 3.0f, GreenColor);
        RegisterElement("NearClosest2", 3.0f, GreenColor);
        RegisterElement("FarOwner", 7.0f, BlueColor);
        RegisterElement("FarFarthest1", 3.0f, BlueColor);
        RegisterElement("FarFarthest2", 3.0f, BlueColor);
    }

    public override void OnUpdate()
    {
        OffAll();

        var party = GetPlayers();

        var nearOwner = GetStatusOwner(party, NearStatusId);
        var farOwner = GetStatusOwner(party, FarStatusId);

        if(nearOwner != null)
        {
            Show("NearOwner", nearOwner);

            var closest = party
                .Where(x => !SamePlayer(x, nearOwner))
                .OrderBy(x => Distance2D(x, nearOwner))
                .Take(2)
                .ToList();

            if(closest.Count > 0)
                Show("NearClosest1", closest[0]);
            if(closest.Count > 1)
                Show("NearClosest2", closest[1]);
        }

        if(farOwner != null)
            Show("FarOwner", farOwner);

        if(farOwner == null)
            return;

        var farthest1 = party
            .Where(x => !SamePlayer(x, farOwner))
            .OrderByDescending(x => Distance2D(x, farOwner))
            .FirstOrDefault();

        Show("FarFarthest1", farthest1);

        if(farthest1 == null)
            return;

        var farthest2 = party
            .Where(x => !SamePlayer(x, farthest1) && !SamePlayer(x, farOwner))
            .OrderByDescending(x => Distance2D(x, farthest1))
            .FirstOrDefault();

        Show("FarFarthest2", farthest2);
    }

    public override void OnReset()
    {
        OffAll();
    }

    private void RegisterElement(string name, float radius, uint color)
    {
        Controller.RegisterElementFromCode(name, $$"""
        {
            "Name":"",
            "type":1,
            "Enabled":false,
            "radius":{{radius}},
            "Donut":1.0,
            "color":{{color}},
            "Filled":true,
            "fillIntensity":0.5,
            "overlayBGColor":1879048192,
            "overlayTextColor":3372220415,
            "thicc":4.0,
            "refActorObjectID":0,
            "refActorComparisonType":2
        }
        """);
    }

    private void Show(string elementName, IPlayerCharacter player)
    {
        var element = Controller.GetElementByName(elementName);
        element.refActorObjectID = player.EntityId;
        element.Enabled = true;
    }

    private static IPlayerCharacter GetStatusOwner(IEnumerable<IPlayerCharacter> party, uint statusId)
    {
        foreach(var player in party)
        {
            var remaining = GetRemainingTime(player, statusId);
            if(remaining > 0.0f && remaining <= StatusThresholdSeconds)
                return player;
        }

        return null;
    }

    private static float GetRemainingTime(IPlayerCharacter player, uint statusId)
    {
        foreach(var status in player.StatusList)
        {
            if(status.StatusId == statusId)
                return status.RemainingTime;
        }

        return 0.0f;
    }

    private static float Distance2D(IPlayerCharacter a, IPlayerCharacter b)
    {
        var dx = a.Position.X - b.Position.X;
        var dz = a.Position.Z - b.Position.Z;
        return (float)Math.Sqrt(dx * dx + dz * dz);
    }

    private static bool SamePlayer(IPlayerCharacter a, IPlayerCharacter b)
    {
        return a.Address == b.Address || a.EntityId == b.EntityId || a.Name.ToString() == b.Name.ToString();
    }

    private List<IPlayerCharacter> GetPlayers()
    {
        return Svc.Objects
            .OfType<IPlayerCharacter>()
            .ToList();
    }

    private void OffAll()
    {
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
    }
}
```

---

### P5 シグマ 塔Wingman式

公式のシグマ(Wingman)スクリプト`Saved Configuration`による設定が必要

```url
https://github.com/PunishXIV/Splatoon/raw/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/Dynamis%20Sigma.cs
```

#### Saved Configuration（LilyDoll Macro） - シグマ 塔Wingman式

TK様による`LilyDoll Macro Configuraton`

1. `Saved Configurations`タブを開く  
2. 下記のjsonをコピー  
3. `Paste from clipboard`をクリック  
    クリックすると`LilyDoll Macro`が表示されます。
4. `LilyDoll Macro`をクリック  
    有効化されると、`LilyDoll Macro`が緑色で表示されます。  

```json
{"TargetScriptName":"SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol@Dynamis_Sigma","ConfigurationName":"LilyDoll Macro","Configuration":"Gz4DABwHbqwza9RoKC+lTsN7suz+Wrrpa9TnhGq3ZjpQvCLIuRzp35/T9QOd6e6rxCq0sADn3ebWsLaL8BHUUFdi9DkWmNyfxQT1OZUT+lhWzdr/Htxn0iAS1GpOpJ2LUjSOEq+rzJQq5WzyooCBK7CQg4IEUtDXDK5UGlPLNp4LIylsKTnGrcc41MwG/0rrp3rXyU3/TVpMqoaKKocO7+Hx0bByIAnT7LxMOfpQ4q+Fn9KcqZytkI9A/KTcJ0eDCkivRaCqNrbRHmaWghZwquqQsskItslC6ptHFKk0V3o7G/Vi5G1m/c7XnVDKWw/5wRcoaY4KlTQmIg==","Overrides":null}
```

#### Registered Elements - シグマ 塔Wingman式

塗りつぶしを無効にしています。  
必要に応じてお好みで調整してください。

```json
{"Elements":{"0":{"Name":"","type":0,"Enabled":false,"refX":115.706,"refY":106.5056,"refZ":8.303346E-06,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":2.5,"Donut":0.5,"color":4278255615,"Filled":true,"fillIntensity":null,"overlayBGColor":4110417920,"overlayTextColor":4278255615,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":true,"thicc":4.0,"overlayText":"3","refActorDataID":2013244,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"BlueCrossR":{"Name":"cross right","type":1,"Enabled":true,"offX":-3.0,"offY":4.0,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"BlueCrossL":{"Name":"cross left","type":1,"Enabled":true,"offX":3.0,"offY":4.0,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"PurpleSquareR":{"Name":"square right","type":1,"Enabled":true,"offX":-3.0,"offY":10.0,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"PurpleSquareL":{"Name":"square left","type":1,"Enabled":true,"offX":3.0,"offY":10.0,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"RedCircleR":{"Name":"circle right","type":1,"Enabled":true,"offX":-3.0,"offY":1.0,"offZ":0.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"RedCircleL":{"Name":"circle left","type":1,"Enabled":true,"offX":3.0,"offY":1.0,"offZ":0.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"GreenTriangleR":{"Name":"triangle right","type":1,"Enabled":true,"offX":-3.0,"offY":7.0,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"GreenTriangleL":{"Name":"triangle left","type":1,"Enabled":true,"offX":3.0,"offY":7.0,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"BlueCrossU":{"Name":"cross up","type":1,"Enabled":false,"offX":4.5,"offY":3.5,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"BlueCrossD":{"Name":"cross down","type":1,"Enabled":false,"offX":4.5,"offY":8.5,"offZ":0.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"PurpleSquareU":{"Name":"square up","type":1,"Enabled":false,"offX":1.5,"offY":3.5,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"PurpleSquareD":{"Name":"square down","type":1,"Enabled":false,"offX":1.5,"offY":8.5,"offZ":0.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"RedCircleU":{"Name":"circle up","type":1,"Enabled":false,"offX":-1.5,"offY":3.5,"offZ":0.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"RedCircleD":{"Name":"circle down","type":1,"Enabled":false,"offX":-1.5,"offY":8.5,"offZ":0.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"GreenTriangleU":{"Name":"triangle up","type":1,"Enabled":false,"offX":-4.5,"offY":3.5,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"GreenTriangleD":{"Name":"triangle down","type":1,"Enabled":false,"offX":-4.5,"offY":8.5,"offZ":0.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayVOffset":0.0,"overlayFScale":2.0,"overlayPlaceholders":false,"thicc":5.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"TetherToCenter":{"Name":"","type":0,"Enabled":false,"refX":100.0,"refY":100.0,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.0,"color":4278255615,"Filled":true,"fillIntensity":null,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorName":"","refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":0,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseBottomRight":{"Name":"","type":1,"Enabled":false,"offX":-8.0,"offY":28.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseBottomLeft":{"Name":"","type":1,"Enabled":true,"offX":8.0,"offY":28.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseFrontRight":{"Name":"","type":1,"Enabled":false,"offX":-8.0,"offY":12.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseFrontLeft":{"Name":"","type":1,"Enabled":false,"offX":8.0,"offY":12.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseRight":{"Name":"","type":1,"Enabled":false,"offX":-11.0,"offY":20.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":true,"fillIntensity":null,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseLeft":{"Name":"","type":1,"Enabled":false,"offX":11.0,"offY":20.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseBottom":{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":31.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"CloseFront":{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":8.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarBottomRight":{"Name":"","type":1,"Enabled":false,"offX":-13.5,"offY":33.5,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarBottomLeft":{"Name":"","type":1,"Enabled":false,"offX":13.5,"offY":33.5,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarFrontRight":{"Name":"","type":1,"Enabled":false,"offX":-13.5,"offY":6.5,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarFrontLeft":{"Name":"","type":1,"Enabled":false,"offX":13.5,"offY":6.5,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarRight":{"Name":"","type":1,"Enabled":false,"offX":-19.0,"offY":20.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarLeft":{"Name":"","type":1,"Enabled":false,"offX":19.0,"offY":20.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarBottom":{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":39.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"FarFront":{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":1.0,"offZ":0.0,"radius":1.0,"color":4278255615,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorDataID":15720,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false}}}
```

---

### P5 シグマ ハロワ

mirage様が作成した「P5 シグマ ハロワ」のガイドスクリプトです。  
マーカー、デバフ、および各種AoEに応じて散開位置へガイドします。  
使用するには、Configurationの設定が必要です。

ここではrawコードを掲載していますが、必要に応じて**P5 Dynamis Sigma Hello World**から導入してください。  
[**オメガ スクリプト(P5 Dynamis Sigma Hello World : mirage様作)**](https://github.com/exatrines/SplatoonPresets/tree/main/Presets/Endwalker/TOP#p5-dynamis-sigma-hello-world)  

```c#
using Dalamud.Bindings.ImGui;
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.GameHelpers;
using ECommons.ImGuiMethods;
using ECommons.MathHelpers;
using ECommons.Hooks.ActionEffectTypes;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using static Splatoon.Splatoon;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

public class P5_Dynamis_Sigma_Hello_World : SplatoonScript
{
    #region Metadata
    public override Metadata Metadata { get; } = new(1, "mirage");
    public override HashSet<uint>? ValidTerritories => [TerritoryTop];
    #endregion

    #region Constant
    private const uint TerritoryTop = 1122;
    private const uint SceneId = 6;
    private const uint DataIdOmegaFemale = 0x3D68;
    private const uint ActionCodeDynamisSigma = 32788;
    private const uint ActionLearRazor = 31631;
    private const uint ActionOmegaFemaleFoot = 31530;
    private const uint ActionOmegaFemaleStaff = 31533;
    private const uint ActionHelloWorldNearThird = 31626;
    private const uint StatusHelloNear = 3442;
    private const uint StatusHelloFar = 3443;
    private const string VfxClockwise = "vfx/lockon/eff/m0515_turning_right01c.avfx";
    private const string VfxCounterClockwise = "vfx/lockon/eff/m0515_turning_left01c.avfx";
    private const ushort TransformOmegaFemaleFoot = 4;
    private const ushort TransformOmegaFemaleStaff = 11;
    private static readonly Vector3 ArenaCenter = new(100f, 0f, 100f);
    private const float SpreadConfigDegreesMin = 0f;
    private const float SpreadConfigDegreesMax = 355.9f;
    private const float SpreadRadiusMin = 0f;
    private const float SettingsCellWidth = 150f;
    private const string NaviElement = "navi";
    private const string NaviSubElement = "navi_sub";
    private const float DefaultHelloSpreadRadius = 9.75f;
    private const float DefaultOtherSpreadRadius = 19f;
    private const uint MarkerP1Unset = uint.MaxValue;

    // Marker presets for settings / debug combos (Attack1–6, Bind1–2, Stop1–2).
    private static readonly MarkerType[] MarkerPresetOrder =
    [
        MarkerType.Attack1,
        MarkerType.Attack2,
        MarkerType.Attack3,
        MarkerType.Attack4,
        MarkerType.Attack5,
        MarkerType.Attack6,
        MarkerType.Bind1,
        MarkerType.Bind2,
        MarkerType.Stop1,
        MarkerType.Stop2
    ];

    private static readonly string[] MarkerPresetComboLabels =
    [
        "Attack1",
        "Attack2",
        "Attack3",
        "Attack4",
        "Attack5",
        "Attack6",
        "Bind1",
        "Bind2",
        "Stop1",
        "Stop2"
    ];

    private static readonly string[] DebugMarkerComboLabelsWithUnset =
    [
        "(unset)",
        "Attack1",
        "Attack2",
        "Attack3",
        "Attack4",
        "Attack5",
        "Attack6",
        "Bind1",
        "Bind2",
        "Stop1",
        "Stop2"
    ];

    #endregion

    #region Config

    public sealed class Config : IEzConfig
    {
        public MarkerType BaitArm1Marker = MarkerType.Attack1;
        public MarkerType BaitArm2Marker = MarkerType.Attack2;
        public MarkerType BaitFar1Marker = MarkerType.Attack3;
        public MarkerType BaitFar2Marker = MarkerType.Attack4;
        public MarkerType BaitNear1Marker = MarkerType.Attack5;
        public MarkerType BaitNear2Marker = MarkerType.Attack6;

        public bool ResolveBaitNearWithoutMarker = false;

        public float DegSpreadHelloNear = 180f;
        public float DegSpreadHelloNearCcw = 180f;
        public float DegSpreadHelloFar = 270f;
        public float DegSpreadHelloFarCcw = 90f;
        public float RadiusHelloNear = DefaultHelloSpreadRadius;
        public float RadiusHelloFar = DefaultHelloSpreadRadius;

        public Group SpreadGroupHelloNear = Group.South;
        public Group SpreadGroupHelloFar = Group.South;
        public Group SpreadGroupBaitArm1 = Group.North;
        public Group SpreadGroupBaitArm2 = Group.North;
        public Group SpreadGroupBaitFar1 = Group.North;
        public Group SpreadGroupBaitFar2 = Group.South;
        public Group SpreadGroupBaitNear1 = Group.South;
        public Group SpreadGroupBaitNear2 = Group.South;

        public float DegSpreadBaitArm1 = 317.5f;
        public float DegSpreadBaitArm1Ccw = 317.5f;
        public float DegSpreadBaitArm2 = 42.5f;
        public float DegSpreadBaitArm2Ccw = 42.5f;
        public float RadiusBaitArm1 = DefaultOtherSpreadRadius;
        public float RadiusBaitArm2 = DefaultOtherSpreadRadius;
        public float DegSpreadBaitFar1 = 90f;
        public float DegSpreadBaitFar1Ccw = 270f;
        public float DegSpreadBaitFar2 = 270f;
        public float DegSpreadBaitFar2Ccw = 90f;
        public float RadiusBaitFar1 = DefaultOtherSpreadRadius;
        public float RadiusBaitFar2 = DefaultOtherSpreadRadius;

        public float DegSpreadBaitNear1 = 192.5f;
        public float DegSpreadBaitNear1Ccw = 192.5f;
        public float DegSpreadBaitNear2 = 167.5f;
        public float DegSpreadBaitNear2Ccw = 167.5f;
        public float RadiusBaitNear1 = DefaultOtherSpreadRadius;
        public float RadiusBaitNear2 = DefaultOtherSpreadRadius;
    }

    private Config C => Controller.GetConfig<Config>();

    #endregion

    #region State
    private readonly Dictionary<ulong, PlayerData> _players = [];
    private State _state = State.Wait;
    private bool _isClockwise;
    private float _initAngle;
    #endregion

    #region Private Class

    private enum State
    {
        Wait,
        Calc,
        AvoidRazor,
        AvoidOmegaFAction,
        SpreadHelloWorld
    }

    private enum Role
    {
        None,
        BaitArm1,
        BaitArm2,
        BaitFar1,
        BaitFar2,
        BaitNear1,
        BaitNear2,
        HelloNear,
        HelloFar
    }

    public enum Group
    {
        North,
        South
    }

    // Values match MarkingController marker indices (see Splatoon.Memory.Marking).
    public enum MarkerType : uint
    {
        None = 999,
        Attack1 = 0,
        Attack2 = 1,
        Attack3 = 2,
        Attack4 = 3,
        Attack5 = 4,
        Bind1 = 5,
        Bind2 = 6,
        Bind3 = 7,
        Stop1 = 8,
        Stop2 = 9,
        Square = 10,
        Circle = 11,
        Cross = 12,
        Triangle = 13,
        Attack6 = 14,
        Attack7 = 15,
        Attack8 = 16
    }

    private sealed class PlayerData
    {
        public ulong ObjectId;
        public string Name = string.Empty;
        public uint MarkerP1 = MarkerP1Unset;
        public Role Role = Role.None;
    }

    #endregion

    #region LifeCycle
    public override void OnSetup()
    {
        Controller.RegisterElementFromCode(NaviElement, """{"Name":"navi","refX":100.0,"refY":100.0,"radius":0.5,"fillIntensity":0.5,"thicc":5.0,"tether":true}""", overwrite: true);
        Controller.RegisterElementFromCode(NaviSubElement, """{"Name":"navi_sub","refX":100.0,"refY":100.0,"radius":0.5,"fillIntensity":0.5,"thicc":5.0,"tether":true}""", overwrite: true);
    }

    public override void OnUpdate()
    {
        DisableNavigationElements();

        if(_players.Count < 7)
            BuildPartySnapshot();

        if(!IsPhaseFive() || _state == State.Wait || BasePlayer == null || _players.Count != 8) return;

        if(!_players.TryGetValue(BasePlayer.GameObjectId, out var me)) return;
        
        RecomputeDerivedRoles();

        if(_state == State.Calc) return;

        if(_state == State.AvoidRazor)
        {
            var pos = GetRazorSafePosition(me.Role);
            UpdateNavigation(NaviElement, pos, true);
            DisableElement(NaviSubElement);
            return;
        }

        if(_state == State.AvoidOmegaFAction)
        {
            var omegaFemale = FindNpcByDataId(DataIdOmegaFemale);
            if(omegaFemale == null)
            {
                DisableNavigationElements();
                return;
            }

            var transformId = omegaFemale.GetTransformationID();
            if(transformId == TransformOmegaFemaleStaff)
            {
                var pos = GetRazorSafePosition(me.Role);
                UpdateNavigation(NaviElement, pos, true);
                DisableElement(NaviSubElement);
            }
            else if(transformId == TransformOmegaFemaleFoot)
            {
                var pos = CalculatePointFromCenterByDegree(ArenaCenter, DefaultOtherSpreadRadius, GetGroup(me.Role) == Group.North ? _initAngle : _initAngle + 180f);
                UpdateNavigation(NaviElement, pos, true);
                DisableElement(NaviSubElement);
            }
            else
            {
                DisableNavigationElements();
            }
            return;
        }

        if(_state == State.SpreadHelloWorld)
            UpdateSpreadNavigation(me.Role);
    }

    public override void OnReset()
    {
        _players.Clear();
        _state = State.Wait;
        _isClockwise = false;
        _initAngle = 0f;
        DisableNavigationElements();
    }

    public override void OnActionEffectEvent(ActionEffectSet set)
    {
        if(!IsPhaseFive() || set.Action == null) return;
        var actionId = set.Action.Value.RowId;

        if(actionId == ActionCodeDynamisSigma)
        {
            _state = State.Calc;
            return;
        }

        if(_state == State.AvoidRazor && actionId == ActionLearRazor)
        {
            _state = State.AvoidOmegaFAction;
            return;
        }

        if(_state == State.AvoidOmegaFAction && (actionId == ActionOmegaFemaleFoot || actionId == ActionOmegaFemaleStaff))
        {
            _state = State.SpreadHelloWorld;
            return;
        }

        if(_state == State.SpreadHelloWorld && actionId == ActionHelloWorldNearThird)
        {
            OnReset();
        }
    }

    public override void OnVFXSpawn(uint target, string vfxPath)
    {
        if(!IsPhaseFive() || _state != State.Calc || _players.Count != 8) return;
        if(!vfxPath.Equals(VfxClockwise, StringComparison.OrdinalIgnoreCase)
           && !vfxPath.Equals(VfxCounterClockwise, StringComparison.OrdinalIgnoreCase))
            return;

        _isClockwise = vfxPath.Equals(VfxClockwise, StringComparison.OrdinalIgnoreCase);

        var omegaFemale = FindNpcByDataId(DataIdOmegaFemale);
        if(omegaFemale != null)
            _initAngle = NormalizeDegrees(GetRelativeAngleFromArenaCenter(omegaFemale.Position));

        _state = State.AvoidRazor;
    }

    public override void OnActorControl(uint sourceId, uint command, uint p1, uint p2, uint p3, uint p4, uint p5, uint p6, uint p7, uint p8, ulong targetId, byte replaying)
    {
        if(!IsPhaseFive()) return;
        if(command != 502) return;

        _ = sourceId;

        ulong markedGoId = 0;
        PlayerData? data = null;
        if(targetId != 0 && _players.TryGetValue(targetId, out var byTarget))
        {
            markedGoId = targetId;
            data = byTarget;
        }
        else if(p2 != 0 && _players.TryGetValue(p2, out var byP2))
        {
            markedGoId = p2;
            data = byP2;
        }

        if(data == null)
            return;

        data.MarkerP1 = p1;
        if(data.Name.Length == 0)
            data.Name = Svc.Objects.FirstOrDefault(x => x.GameObjectId == markedGoId)?.Name.ToString() ?? string.Empty;
            
        RecomputeDerivedRoles();
    }

    public override void OnSettingsDraw()
    {
        ImGui.TextWrapped("This Script guides next 3 steps:");
        ImGui.Indent();
        ImGui.TextWrapped("Step1: Avoid Razor.");
        ImGui.TextWrapped("Step2: Avoid Omega-F actions (Foot or Staff).");
        ImGui.TextWrapped("Step3: Spread Hello World.");
        ImGui.Unindent();
        ImGui.NewLine();

        if(ImGuiEx.BeginDefaultTable("P5SigmaHelloWorldSettings", ["Role", "Marker", "Group", "Spread Angle (Cw)", "Spread Angle (Ccw)", "Range from Center"]))
        {
            DrawRoleSettingsRowHelloDual("HelloNear", ref C.SpreadGroupHelloNear, ref C.DegSpreadHelloNear, ref C.DegSpreadHelloNearCcw, ref C.RadiusHelloNear);
            DrawRoleSettingsRowHelloDual("HelloFar", ref C.SpreadGroupHelloFar, ref C.DegSpreadHelloFar, ref C.DegSpreadHelloFarCcw, ref C.RadiusHelloFar);
            DrawRoleSettingsRowMarkerSpreadDual("#baitArm1", ref C.BaitArm1Marker, ref C.SpreadGroupBaitArm1, ref C.DegSpreadBaitArm1, ref C.DegSpreadBaitArm1Ccw, ref C.RadiusBaitArm1);
            DrawRoleSettingsRowMarkerSpreadDual("#baitArm2", ref C.BaitArm2Marker, ref C.SpreadGroupBaitArm2, ref C.DegSpreadBaitArm2, ref C.DegSpreadBaitArm2Ccw, ref C.RadiusBaitArm2);
            DrawRoleSettingsRowMarkerSpreadDual("#baitFar1", ref C.BaitFar1Marker, ref C.SpreadGroupBaitFar1, ref C.DegSpreadBaitFar1, ref C.DegSpreadBaitFar1Ccw, ref C.RadiusBaitFar1);
            DrawRoleSettingsRowMarkerSpreadDual("#baitFar2", ref C.BaitFar2Marker, ref C.SpreadGroupBaitFar2, ref C.DegSpreadBaitFar2, ref C.DegSpreadBaitFar2Ccw, ref C.RadiusBaitFar2);
            if(C.ResolveBaitNearWithoutMarker)
            {
                DrawRoleSettingsRowSpreadHintDual("#baitNear1", "(remaining)", ref C.SpreadGroupBaitNear1, ref C.DegSpreadBaitNear1, ref C.DegSpreadBaitNear1Ccw, ref C.RadiusBaitNear1);
                DrawRoleSettingsRowSpreadHintDual("#baitNear2", "(remaining)", ref C.SpreadGroupBaitNear2, ref C.DegSpreadBaitNear2, ref C.DegSpreadBaitNear2Ccw, ref C.RadiusBaitNear2);
            }
            else
            {
                DrawRoleSettingsRowMarkerSpreadDual("#baitNear1", ref C.BaitNear1Marker, ref C.SpreadGroupBaitNear1, ref C.DegSpreadBaitNear1, ref C.DegSpreadBaitNear1Ccw, ref C.RadiusBaitNear1);
                DrawRoleSettingsRowMarkerSpreadDual("#baitNear2", ref C.BaitNear2Marker, ref C.SpreadGroupBaitNear2, ref C.DegSpreadBaitNear2, ref C.DegSpreadBaitNear2Ccw, ref C.RadiusBaitNear2);
            }
            ImGui.EndTable();
        }
        ImGui.Checkbox("Resolve BaitNear without Marker. Tether to 2 BaitNear Positions##sigma", ref C.ResolveBaitNearWithoutMarker);
        ImGui.TextDisabled("Cw: Clockwise, Ccw: Counter-Clockwise. Angle is relative to Omega-F, which is true north.");
        ImGui.NewLine();

        DrawImportButtons();
        ImGui.TextWrapped("If other configurations are needed, please adjust the settings manually.");
        ImGui.NewLine();

        if(ImGui.CollapsingHeader("Debug"))
            DrawDebugSection();
    }

    #endregion

    #region Private Method
    // Settings button that fills config from a fixed JP-style strat preset.
    private void DrawImportButtons()
    {
        if(ImGui.Button("Import Japanese Strat"))
            ApplyJapaneseStrat(C);
        ImGuiEx.HelpMarker("Macro: https://jp.finalfantasyxiv.com/lodestone/character/34120564/blog/5178791/\nRaidPlan: https://raidplan.io/plan/u98293e225836jcy");
    }

    // Debug table: state, rotation, and per-player marker / role.
    private void DrawDebugSection()
    {
        ImGui.Text($"State: {_state}");
        ImGui.Text($"IsClockwise: {_isClockwise}");
        ImGui.Text($"InitAngle (ΩF, north=0°): {_initAngle:0.00}");
        if(!ImGuiEx.BeginDefaultTable("P5SigmaHelloWorldRoles", ["Name", "GameObjectId", "Marker (debug)", "Role"]))
            return;

        foreach(var player in _players.Values.OrderBy(x => x.Name).ThenBy(x => x.ObjectId))
        {
            ImGui.TableNextRow();
            ImGui.TableNextColumn();
            ImGui.Text(player.Name);
            ImGui.TableNextColumn();
            ImGui.Text($"0x{player.ObjectId:X8}");
            ImGui.TableNextColumn();
            DrawDebugMarkerCombo(player);
            ImGui.TableNextColumn();
            ImGui.Text(player.Role.ToString());
        }

        ImGui.EndTable();
    }

    // One settings row: marker column shows a hint only (no raid marker combo).
    private static void DrawRoleSettingsRowSpreadHintDual(string roleLabel, string markerHint, ref Group spreadGroup, ref float spreadCwDeg, ref float spreadCcwDeg, ref float radius)
    {
        ImGui.TableNextRow();
        ImGui.TableNextColumn();
        ImGui.Text(roleLabel);
        ImGui.TableNextColumn();
        ImGui.TextDisabled(markerHint);
        DrawSpreadCells(roleLabel, ref spreadGroup, ref spreadCwDeg, ref spreadCcwDeg, ref radius);
    }

    // One settings row for hello roles (spread only, debuff-assigned).
    private static void DrawRoleSettingsRowHelloDual(string roleLabel, ref Group spreadGroup, ref float spreadCwDeg, ref float spreadCcwDeg, ref float radius)
        => DrawRoleSettingsRowSpreadHintDual(roleLabel, "(debuff assigned)", ref spreadGroup, ref spreadCwDeg, ref spreadCcwDeg, ref radius);

    // One settings row: raid marker combo plus spread group and angles.
    private static void DrawRoleSettingsRowMarkerSpreadDual(string roleLabel, ref MarkerType marker, ref Group spreadGroup, ref float spreadCwDeg, ref float spreadCcwDeg, ref float radius)
    {
        ImGui.TableNextRow();
        ImGui.TableNextColumn();
        ImGui.Text(roleLabel);
        ImGui.TableNextColumn();
        DrawMarkerCell(roleLabel + "_mk", ref marker);
        DrawSpreadCells(roleLabel, ref spreadGroup, ref spreadCwDeg, ref spreadCcwDeg, ref radius);
    }

    // Narrow combo: Attack1–6, Bind1–2, Stop1–2 only (invalid saved values coerced to Attack1).
    private static void DrawMarkerCell(string id, ref MarkerType marker)
    {
        var idx = Array.IndexOf(MarkerPresetOrder, marker);
        if(idx < 0)
        {
            marker = MarkerPresetOrder[0];
            idx = 0;
        }

        ImGui.PushID(id);
        ImGui.SetNextItemWidth(SettingsCellWidth);
        if(ImGui.Combo("##marker", ref idx, MarkerPresetComboLabels, MarkerPresetComboLabels.Length))
            marker = MarkerPresetOrder[idx];
        ImGui.PopID();
    }

    // Table cells: spread hemisphere, cw angle, ccw angle, radius for one role row.
    private static void DrawSpreadCells(string idPrefix, ref Group spreadGroup, ref float spreadCwDeg, ref float spreadCcwDeg, ref float radius)
    {
        ImGui.TableNextColumn();
        ImGui.PushID(idPrefix + "_grp");
        ImGui.SetNextItemWidth(SettingsCellWidth);
        ImGuiEx.EnumCombo("##group", ref spreadGroup);
        ImGui.PopID();

        ImGui.TableNextColumn();
        ImGui.PushID(idPrefix + "_cw");
        DrawSpreadConfigDegreesInput(ref spreadCwDeg);
        ImGui.PopID();

        ImGui.TableNextColumn();
        ImGui.PushID(idPrefix + "_ccw");
        DrawSpreadConfigDegreesInput(ref spreadCcwDeg);
        ImGui.PopID();

        ImGui.TableNextColumn();
        ImGui.PushID(idPrefix + "_radius");
        DrawSpreadRadiusInput(ref radius);
        ImGui.PopID();
    }

    // ImGui float input for a spread angle in degrees with clamping.
    private static void DrawSpreadConfigDegreesInput(ref float degrees)
    {
        degrees = ClampSpreadConfigDegrees(degrees);
        ImGui.SetNextItemWidth(SettingsCellWidth);
        ImGui.InputFloat("##spread", ref degrees, 1f, 5f, "%.2f°");
        degrees = ClampSpreadConfigDegrees(degrees);
    }

    // Clamps configured spread angle to the allowed editor range.
    private static float ClampSpreadConfigDegrees(float degrees)
        => Math.Clamp(degrees, SpreadConfigDegreesMin, SpreadConfigDegreesMax);

    // ImGui float input for spread radius with clamping.
    private static void DrawSpreadRadiusInput(ref float radius)
    {
        radius = ClampSpreadRadius(radius);
        ImGui.SetNextItemWidth(SettingsCellWidth);
        ImGui.InputFloat("##radius", ref radius, 0.1f, 1f, "%.2f");
        radius = ClampSpreadRadius(radius);
    }

    // Ensures spread radius is not below the configured minimum.
    private static float ClampSpreadRadius(float radius)
        => Math.Max(SpreadRadiusMin, radius);

    // Applies default JP strat markers, angles, and shared spread groups to config.
    private static void ApplyJapaneseStrat(Config c)
    {
        SetMarkers(c, MarkerType.Attack1, MarkerType.Attack2, MarkerType.Attack3, MarkerType.Attack4);
        SetSpread(ref c.DegSpreadHelloNear, ref c.DegSpreadHelloNearCcw, 180f, 180f);
        SetSpread(ref c.DegSpreadHelloFar, ref c.DegSpreadHelloFarCcw, 270f, 90f);
        SetSpread(ref c.DegSpreadBaitArm1, ref c.DegSpreadBaitArm1Ccw, 317.5f, 317.5f);
        SetSpread(ref c.DegSpreadBaitArm2, ref c.DegSpreadBaitArm2Ccw, 42.5f, 42.5f);
        SetSpread(ref c.DegSpreadBaitFar1, ref c.DegSpreadBaitFar1Ccw, 90f, 270f);
        SetSpread(ref c.DegSpreadBaitFar2, ref c.DegSpreadBaitFar2Ccw, 270f, 90f);
        SetSpread(ref c.DegSpreadBaitNear1, ref c.DegSpreadBaitNear1Ccw, 192.5f, 192.5f);
        SetSpread(ref c.DegSpreadBaitNear2, ref c.DegSpreadBaitNear2Ccw, 167.5f, 167.5f);
        ApplySharedSpreadGroups(c);
        c.ResolveBaitNearWithoutMarker = true;
    }

    // Writes bait marker enum fields on config in one call.
    private static void SetMarkers(Config c, MarkerType arm1, MarkerType arm2, MarkerType far1, MarkerType far2)
    {
        c.BaitArm1Marker = arm1;
        c.BaitArm2Marker = arm2;
        c.BaitFar1Marker = far1;
        c.BaitFar2Marker = far2;
        c.BaitNear1Marker = MarkerType.Bind1;
        c.BaitNear2Marker = MarkerType.Bind2;
    }

    // Sets both cw and ccw spread degree fields to fixed preset values.
    private static void SetSpread(ref float cw, ref float ccw, float cwValue, float ccwValue)
    {
        cw = cwValue;
        ccw = ccwValue;
    }

    // Default north/south group picks for each bait spread slot (JP preset).
    private static void ApplySharedSpreadGroups(Config c)
    {
        c.SpreadGroupHelloNear = Group.South;
        c.SpreadGroupHelloFar = Group.South;
        c.SpreadGroupBaitArm1 = Group.North;
        c.SpreadGroupBaitArm2 = Group.North;
        c.SpreadGroupBaitFar1 = Group.North;
        c.SpreadGroupBaitFar2 = Group.South;
        c.SpreadGroupBaitNear1 = Group.South;
        c.SpreadGroupBaitNear2 = Group.South;
    }

    // Re-runs marker roles, hello debuffs, then assigns the two remaining players as bait-near.
    private void RecomputeDerivedRoles()
    {
        ApplyMarkerRoles();
        ApplyNearFarRoles();
        ResolveRemainingNearRoles();
    }

    // Debug UI: change raid marker P1 for a row and optionally recompute roles when party is full.
    private void DrawDebugMarkerCombo(PlayerData player)
    {
        ImGui.PushID($"m{player.ObjectId:X16}");
        var choice = ToEditableMarkerType(player.MarkerP1);
        var before = player.MarkerP1;
        ImGui.SetNextItemWidth(MathF.Min(240f, ImGui.GetContentRegionAvail().X));
        DrawPresetMarkerComboUnset("##dbgMarker", ref choice);
        var after = FromEditableMarkerType(choice);
        if(after != before)
        {
            player.MarkerP1 = after;
            if(_players.Count == 8)
                RecomputeDerivedRoles();
        }

        if(player.MarkerP1 != MarkerP1Unset && !Enum.IsDefined(typeof(MarkerType), player.MarkerP1))
            ImGui.TextDisabled($"non-enum p1={player.MarkerP1}");
        ImGui.PopID();
    }

    // Debug marker combo: (unset) plus the same presets as settings.
    private static void DrawPresetMarkerComboUnset(string label, ref MarkerType marker)
    {
        int idx;
        if(marker == MarkerType.None)
            idx = 0;
        else
        {
            var p = Array.IndexOf(MarkerPresetOrder, marker);
            idx = p >= 0 ? p + 1 : 0;
        }

        if(ImGui.Combo(label, ref idx, DebugMarkerComboLabelsWithUnset, DebugMarkerComboLabelsWithUnset.Length))
            marker = idx == 0 ? MarkerType.None : MarkerPresetOrder[idx - 1];
    }

    // Maps raw marker P1 to editor enum (unset or unknown become None).
    private static MarkerType ToEditableMarkerType(uint p1)
    {
        if(p1 == MarkerP1Unset)
            return MarkerType.None;
        return Enum.IsDefined(typeof(MarkerType), p1) ? (MarkerType)p1 : MarkerType.None;
    }

    // Maps editor marker choice back to game P1 value (None → unset sentinel).
    private static uint FromEditableMarkerType(MarkerType m)
        => m == MarkerType.None ? MarkerP1Unset : (uint)m;

    // True when duty scene is P5 Dynamis.
    private bool IsPhaseFive() => Controller.Scene == SceneId;

    // Rebuilds the eight-player snapshot from the current party list.
    private void BuildPartySnapshot()
    {
        _players.Clear();
        foreach(var pc in Controller.GetPartyMembers().OfType<IPlayerCharacter>())
        {
            _players[pc.GameObjectId] = new PlayerData
            {
                ObjectId = pc.GameObjectId,
                Name = pc.Name.ToString(),
                MarkerP1 = MarkerP1Unset,
                Role = Role.None
            };
        }
    }

    // Assigns bait arm/far roles from configured marker ids on each player row.
    private void ApplyMarkerRoles()
    {
        foreach(var player in _players.Values)
        {
            player.Role = player.MarkerP1 switch
            {
                var x when x == (uint)C.BaitArm1Marker => Role.BaitArm1,
                var x when x == (uint)C.BaitArm2Marker => Role.BaitArm2,
                var x when x == (uint)C.BaitFar1Marker => Role.BaitFar1,
                var x when x == (uint)C.BaitFar2Marker => Role.BaitFar2,
                var x when !C.ResolveBaitNearWithoutMarker && x == (uint)C.BaitNear1Marker => Role.BaitNear1,
                var x when !C.ResolveBaitNearWithoutMarker && x == (uint)C.BaitNear2Marker => Role.BaitNear2,
                _ => Role.None
            };
        }
    }

    // Overwrites roles from hello near/far status on live characters.
    private void ApplyNearFarRoles()
    {
        foreach(var (objectId, player) in _players.ToArray())
        {
            var obj = Svc.Objects.FirstOrDefault(x => x.GameObjectId == objectId) as IPlayerCharacter;
            if(obj == null) continue;
            if(obj.StatusList.Any(x => x.StatusId == StatusHelloNear))
                player.Role = Role.HelloNear;
            else if(obj.StatusList.Any(x => x.StatusId == StatusHelloFar))
                player.Role = Role.HelloFar;
        }
    }

    // When resolving near without markers, assigns BaitNear1/2 to the two remaining players (sorted by object id).
    private void ResolveRemainingNearRoles()
    {
        if(!C.ResolveBaitNearWithoutMarker)
            return;

        var remaining = _players.Values.Where(x => x.Role == Role.None).ToList();
        if(remaining.Count != 2) return;

        remaining.Sort((a, b) => a.ObjectId.CompareTo(b.ObjectId));
        remaining[0].Role = Role.BaitNear1;
        remaining[1].Role = Role.BaitNear2;
    }

    // Stand position for razor dodge using init angle, cw flag, and north/south group.
    private Vector3 GetRazorSafePosition(Role role)
    {
        var group = GetGroup(role);
        var angle = _isClockwise
            ? (group == Group.North ? _initAngle - 22.5f : _initAngle - 22.5f + 180f)
            : (group == Group.North ? _initAngle + 22.5f : _initAngle + 22.5f + 180f);
        return CalculatePointFromCenterByDegree(ArenaCenter, DefaultOtherSpreadRadius, angle);
    }

    // Updates main (and optional sub) nav elements for hello spread from role config.
    private void UpdateSpreadNavigation(Role role)
    {
        DisableElement(NaviSubElement);
        if(!TryGetSpreadAngles(role, out var angle, out var subAngle))
        {
            DisableElement(NaviElement);
            return;
        }

        UpdateNavigation(NaviElement, CalculatePointFromCenterByDegree(ArenaCenter, GetSpreadRadius(role), angle), true);
        if(subAngle != null)
            UpdateNavigation(NaviSubElement, CalculatePointFromCenterByDegree(ArenaCenter, GetSpreadSubRadius(role), subAngle.Value), true);
    }

    // Computes final spread angles from init facing plus configured cw/ccw offsets.
    private bool TryGetSpreadAngles(Role role, out float angle, out float? subAngle)
    {
        if(!TryGetSpreadOffsets(role, out var primaryOffset, out var secondaryOffset))
        {
            angle = default;
            subAngle = null;
            return false;
        }

        angle = _initAngle + primaryOffset;
        subAngle = secondaryOffset != null ? _initAngle + secondaryOffset.Value : null;
        return true;
    }

    // Primary (and optional secondary) degree offset from config for a resolved role.
    private bool TryGetSpreadOffsets(Role role, out float primaryOffset, out float? secondaryOffset)
    {
        secondaryOffset = null;
        switch(role)
        {
            case Role.HelloNear:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadHelloNear, C.DegSpreadHelloNearCcw);
                return true;
            case Role.HelloFar:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadHelloFar, C.DegSpreadHelloFarCcw);
                return true;
            case Role.BaitArm1:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadBaitArm1, C.DegSpreadBaitArm1Ccw);
                return true;
            case Role.BaitArm2:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadBaitArm2, C.DegSpreadBaitArm2Ccw);
                return true;
            case Role.BaitFar1:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadBaitFar1, C.DegSpreadBaitFar1Ccw);
                return true;
            case Role.BaitFar2:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadBaitFar2, C.DegSpreadBaitFar2Ccw);
                return true;
            case Role.BaitNear1:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadBaitNear1, C.DegSpreadBaitNear1Ccw);
                secondaryOffset = C.ResolveBaitNearWithoutMarker
                    ? SpreadOffsetByDirection(C.DegSpreadBaitNear2, C.DegSpreadBaitNear2Ccw)
                    : null;
                return true;
            case Role.BaitNear2:
                primaryOffset = SpreadOffsetByDirection(C.DegSpreadBaitNear2, C.DegSpreadBaitNear2Ccw);
                secondaryOffset = C.ResolveBaitNearWithoutMarker
                    ? SpreadOffsetByDirection(C.DegSpreadBaitNear1, C.DegSpreadBaitNear1Ccw)
                    : null;
                return true;
            default:
                primaryOffset = default;
                return false;
        }
    }

    // Picks cw vs ccw configured angle based on current rotation sense flag.
    private float SpreadOffsetByDirection(float clockwiseDegrees, float counterClockwiseDegrees)
        => _isClockwise ? ClampSpreadConfigDegrees(clockwiseDegrees) : ClampSpreadConfigDegrees(counterClockwiseDegrees);

    // North/south spread group from config for a role.
    private Group GetGroup(Role role)
        => role switch
        {
            Role.HelloNear => C.SpreadGroupHelloNear,
            Role.HelloFar => C.SpreadGroupHelloFar,
            Role.BaitArm1 => C.SpreadGroupBaitArm1,
            Role.BaitArm2 => C.SpreadGroupBaitArm2,
            Role.BaitFar1 => C.SpreadGroupBaitFar1,
            Role.BaitFar2 => C.SpreadGroupBaitFar2,
            Role.BaitNear1 => C.SpreadGroupBaitNear1,
            Role.BaitNear2 => C.SpreadGroupBaitNear2,
            _ => Group.South
        };

    // World XZ from arena center, radius, and compass angle in degrees.
    private static Vector3 CalculatePointFromCenterByDegree(Vector3 center, float radius, float degree)
    {
        var rad = degree.DegToRad();
        return new Vector3(
            center.X + MathF.Sin(rad) * radius,
            center.Y,
            center.Z - MathF.Cos(rad) * radius
        );
    }

    // First battle NPC on the object table matching data id.
    private IBattleNpc? FindNpcByDataId(uint dataId)
        => Svc.Objects.OfType<IBattleNpc>().FirstOrDefault(x => x.DataId == dataId);

    // Enables a nav element at position with rainbow tint and optional tether.
    private void UpdateNavigation(string elementName, Vector3 position, bool tether)
    {
        if(!Controller.TryGetElementByName(elementName, out var element)) return;
        element.color = ImGui.ColorConvertFloat4ToU32(GetRainbowColor(4d));
        element.SetRefPosition(position);
        element.tether = tether;
        element.Enabled = true;
    }

    // Configured spread radius for the role (hello, bait, bait-near).
    private float GetSpreadRadius(Role role)
        => role switch
        {
            Role.HelloNear => ClampSpreadRadius(C.RadiusHelloNear),
            Role.HelloFar => ClampSpreadRadius(C.RadiusHelloFar),
            Role.BaitArm1 => ClampSpreadRadius(C.RadiusBaitArm1),
            Role.BaitArm2 => ClampSpreadRadius(C.RadiusBaitArm2),
            Role.BaitFar1 => ClampSpreadRadius(C.RadiusBaitFar1),
            Role.BaitFar2 => ClampSpreadRadius(C.RadiusBaitFar2),
            Role.BaitNear1 => ClampSpreadRadius(C.RadiusBaitNear1),
            Role.BaitNear2 => ClampSpreadRadius(C.RadiusBaitNear2),
            _ => DefaultOtherSpreadRadius
        };

    // Secondary nav radius; for bait-near roles, shows the paired near slot on nav_sub.
    private float GetSpreadSubRadius(Role role)
        => role switch
        {
            Role.BaitNear1 => ClampSpreadRadius(C.RadiusBaitNear2),
            Role.BaitNear2 => ClampSpreadRadius(C.RadiusBaitNear1),
            _ => GetSpreadRadius(role)
        };

    // Hides both registered nav elements.
    private void DisableNavigationElements()
    {
        DisableElement(NaviElement);
        DisableElement(NaviSubElement);
    }

    // Turns off a registered element by name if it exists.
    private void DisableElement(string elementName)
    {
        if(Controller.TryGetElementByName(elementName, out var element))
            element.Enabled = false;
    }

    // Compass degrees from arena center to a world position (north-based).
    private static float GetRelativeAngleFromArenaCenter(Vector3 position)
        => MathHelper.GetRelativeAngle(ArenaCenter, position);

    // Wraps degrees into [0, 360).
    private static float NormalizeDegrees(float degrees)
    {
        var n = degrees % 360f;
        return n < 0f ? n + 360f : n;
    }

    // Full-saturation RGBA that cycles hue over wall-clock time.
    private Vector4 GetRainbowColor(double cycleSeconds)
    {
        if(cycleSeconds <= 0d) cycleSeconds = 1d;
        var normalizedTime = Environment.TickCount64 / 1000d / cycleSeconds;
        var hue = normalizedTime % 1f;
        return HsvToVector4(hue, 1f, 1f);
    }

    // Converts HSV in [0,1] to linear RGB with alpha 1.
    private static Vector4 HsvToVector4(double h, double s, double v)
    {
        double r = 0d;
        double g = 0d;
        double b = 0d;
        var i = (int)(h * 6d);
        var f = h * 6d - i;
        var p = v * (1d - s);
        var q = v * (1d - f * s);
        var t = v * (1d - (1d - f) * s);

        switch(i % 6)
        {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }

        return new Vector4((float)r, (float)g, (float)b, 1f);
    }
    #endregion
}
```

#### Configuration - シグマ ハロワ

1. `P5 Dynamis Sigma Hello World`の設定を開く  
2. `Import Japanese Strat`をクリックする

#### Registered Elements - シグマ ハロワ

塗りつぶしを無効に変更しています。  
必要に応じてお好みで調整してください。

```json
{"Elements":{"navi":{"Name":"navi","type":0,"Enabled":false,"refX":116.02445,"refY":110.20867,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.5,"color":4294901995,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorName":"","refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":0,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"navi_sub":{"Name":"navi_sub","type":0,"Enabled":false,"refX":110.20871,"refY":116.02443,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.5,"color":4294901995,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":4.0,"overlayText":"","refActorName":"","refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":0,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false}}}
```

---

### P5 オメガ 安置ガイド

mirage様が作成した「P5 オメガ 安置ガイド」のスクリプトです。  
各種AoEに応じた安置パターンをもとに、安全地帯へガイドします。  
設定は不要です。

ここではrawコードを掲載していますが、必要に応じて**P5 Dynamis Omega Safe Guide**から導入してください。  
[**オメガ スクリプト(P5 Dynamis Omega Safe Guide : mirage様作)**](https://github.com/exatrines/SplatoonPresets/tree/main/Presets/Endwalker/TOP#p5-dynamis-omega-safe-guide)  

```c#
using Dalamud.Bindings.ImGui;
using Dalamud.Game.ClientState.Objects.Types;
using ECommons;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.Hooks.ActionEffectTypes;
using ECommons.MathHelpers;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

public class P5_Dynamis_Omega_Safe_Guide : SplatoonScript
{
    #region Metadata
    public override Metadata Metadata { get; } = new(1, "mirage");
    public override HashSet<uint>? ValidTerritories => [TerritoryTop];
    #endregion

    #region Constant
    private const uint TerritoryTop = 1122;
    private const uint SceneId = 6;
    private const uint CastWaveFirstHorizontal = 31644;
    private const uint CastWaveFirstVertical = 31643;
    private const uint CastWaveSecondHorizontal = 31608;
    private const uint CastWaveSecondVertical = 31607;
    private const uint OmegaMaleDataId = 0x3D69;
    private const uint OmegaFemaleDataId = 0x3D6A;

    private const uint TransformSword = 0;
    private const uint TransformShield = 4;
    private const uint TransformStaff = 0;
    private const uint TransformFoot = 4;

    private const float AngleSnap45 = 45f;
    private const float OuterSafeRadius = 10f;
    private const float InnerSafeRadius = 5f;
    private static readonly Vector3 ArenaCenter = new(100f, 0f, 100f);

    private const int StepAwaitingFirstWave = 0;
    private const int StepAwaitingSecondWave = 1;
    private const int StepComplete = 2;

    private const int FirstOmegaPairVisibleCount = 2;
    private const int SecondOmegaPairMinVisibleCount = 4;

    private const float SwordStaffQuadrantOffsetDegrees = 67.5f;
    private const float SwordFootQuadrantOffsetDegrees = 32.5f;
    private const float ShieldStaffQuadrantOffsetDegrees = 45f;
    private const float ShieldFootQuadrantOffsetDegrees = 32.5f;

    private const float NeSwDiagonalAngle1 = 45f;
    private const float NeSwDiagonalAngle2 = 225f;

    // Not from RegisterElementFromCode JSON; used as tower line offZ in UpdateTowerNavigation.
    private const float TowerVerticalOffset = 10f;

    private const double RainbowHueCycleSeconds = 4d;
    #endregion

    #region Config
    // No IEZConfig in this script.
    #endregion

    #region State
    private readonly OmegaPairInfo _firstInfo = new();
    private readonly OmegaPairInfo _secondInfo = new();
    private int _step = StepAwaitingFirstWave;
    #endregion

    #region Private Class
    private sealed class OmegaPairInfo
    {
        public uint MaleObjectId;
        public uint FemaleObjectId;
        public uint OmegaCastId;

        public bool HasObjects => MaleObjectId != 0 && FemaleObjectId != 0;
        public bool IsReady => HasObjects && OmegaCastId != 0;
    }
    #endregion

    #region LifeCycle
    public override void OnSetup()
    {
        Controller.RegisterElementFromCode("first_navi", """{"Name":"first_navi","radius":0,"fillIntensity":0.5,"thicc":25.0,"refActorDataID":14669,"refActorComparisonType":3}""", overwrite: true);
        Controller.RegisterElementFromCode("second_navi", """{"Name":"second_navi","radius":0,"fillIntensity":0.5,"thicc":25.0,"refActorDataID":14669,"refActorComparisonType":3}""", overwrite: true);
        Controller.RegisterElementFromCode("first_navi_tower", """{"Name":"first_navi_tower","type":2,"refX":100.0,"refY":100.0,"offX":100.0,"offY":100.0,"offZ":10.0,"radius":0.0,"Filled":false,"fillIntensity":0.5,"thicc":50.0,"refActorDataID":15708,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":3.3684855}""", overwrite: true);
        Controller.RegisterElementFromCode("second_navi_tower", """{"Name":"second_navi_tower","type":2,"refX":100.0,"refY":100.0,"offX":100.0,"offY":100.0,"offZ":10.0,"radius":0.0,"Filled":false,"fillIntensity":0.5,"thicc":50.0,"refActorDataID":15708,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":3.3684855}""", overwrite: true);
    }

    public override void OnUpdate()
    {
        if(!IsPhaseFive())
        {
            DisableElement("first_navi");
            DisableElement("second_navi");
            DisableElement("first_navi_tower");
            DisableElement("second_navi_tower");
            return;
        }

        PopulatePairObjectIds();
        var firstReady = TryGetSafePosition(_firstInfo, out var firstPos);
        var secondReady = TryGetSafePosition(_secondInfo, out var secondPos);

        if(_step == StepAwaitingFirstWave)
        {
            UpdateNavigation("first_navi", firstReady, firstPos, tether: true, rainbow: true);
            UpdateNavigation("second_navi", secondReady, secondPos, tether: false, rainbow: true);
            UpdateTowerNavigation("first_navi_tower", firstReady, firstPos, rainbow: true);
            UpdateTowerNavigation("second_navi_tower", secondReady, secondPos, rainbow: true);
        }
        else if(_step == StepAwaitingSecondWave)
        {
            UpdateNavigation("first_navi", shouldEnable: false, firstPos, tether: false, rainbow: false);
            UpdateNavigation("second_navi", secondReady, secondPos, tether: true, rainbow: true);
            UpdateTowerNavigation("first_navi_tower", shouldEnable: false, firstPos, rainbow: false);
            UpdateTowerNavigation("second_navi_tower", secondReady, secondPos, rainbow: true);
        }
        else
        {
            UpdateNavigation("first_navi", shouldEnable: false, firstPos, tether: false, rainbow: false);
            UpdateNavigation("second_navi", shouldEnable: false, secondPos, tether: false, rainbow: false);
            UpdateTowerNavigation("first_navi_tower", shouldEnable: false, firstPos, rainbow: false);
            UpdateTowerNavigation("second_navi_tower", shouldEnable: false, secondPos, rainbow: false);
        }
    }

    public override void OnReset()
    {
        _firstInfo.MaleObjectId = 0;
        _firstInfo.FemaleObjectId = 0;
        _firstInfo.OmegaCastId = 0;
        _secondInfo.MaleObjectId = 0;
        _secondInfo.FemaleObjectId = 0;
        _secondInfo.OmegaCastId = 0;
        _step = StepAwaitingFirstWave;
        DisableElement("first_navi");
        DisableElement("second_navi");
        DisableElement("first_navi_tower");
        DisableElement("second_navi_tower");
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if(!IsPhaseFive()) return;
        if(castId != CastWaveFirstHorizontal && castId != CastWaveFirstVertical) return;
        if(_firstInfo.OmegaCastId != 0 && _secondInfo.OmegaCastId != 0) return;

        _firstInfo.OmegaCastId = castId;
        _secondInfo.OmegaCastId = castId == CastWaveFirstHorizontal ? CastWaveSecondVertical : CastWaveSecondHorizontal;
    }

    public override void OnActionEffectEvent(ActionEffectSet set)
    {
        if(!IsPhaseFive()) return;
        if(set.Action == null) return;

        var castId = set.Action.Value.RowId;
        if(castId == _firstInfo.OmegaCastId)
            _step = StepAwaitingSecondWave;
        if(castId == _secondInfo.OmegaCastId)
            _step = StepComplete;
    }

    public override void OnSettingsDraw()
    {
        ImGui.Text($"BasePlayer: {Controller.BasePlayer?.Name.ToString() ?? "null"}");
        ImGui.Text($"Scene: {Controller.Scene} (P5={SceneId})");
        ImGui.Text($"Step: {_step}");
        ImGui.Text($"First Cast: {FormatCast(_firstInfo.OmegaCastId)}");
        ImGui.Text($"Second Cast: {FormatCast(_secondInfo.OmegaCastId)}");
        ImGui.Separator();
        DrawPairDebug("First", _firstInfo);
        ImGui.Separator();
        DrawPairDebug("Second", _secondInfo);
    }
    #endregion

    #region Private Method
    // True when the duty scene id matches P5 Dynamis.
    private bool IsPhaseFive()
        => Controller.Scene == SceneId;

    // Fills first/second pair object ids from visible Omega NPCs when still unknown.
    private void PopulatePairObjectIds()
    {
        var omegaObjects = Svc.Objects
            .OfType<IBattleNpc>()
            .Where(x => x.DataId == OmegaMaleDataId || x.DataId == OmegaFemaleDataId)
            .Where(x => x.IsCharacterVisible())
            .ToList();

        if(!_firstInfo.HasObjects && omegaObjects.Count == FirstOmegaPairVisibleCount)
        {
            _firstInfo.MaleObjectId = omegaObjects.FirstOrDefault(x => x.DataId == OmegaMaleDataId)?.ObjectId ?? 0;
            _firstInfo.FemaleObjectId = omegaObjects.FirstOrDefault(x => x.DataId == OmegaFemaleDataId)?.ObjectId ?? 0;
        }

        if(!_secondInfo.HasObjects && omegaObjects.Count >= SecondOmegaPairMinVisibleCount)
        {
            _secondInfo.MaleObjectId = omegaObjects
                .FirstOrDefault(x => x.DataId == OmegaMaleDataId && x.ObjectId != _firstInfo.MaleObjectId)
                ?.ObjectId ?? 0;
            _secondInfo.FemaleObjectId = omegaObjects
                .FirstOrDefault(x => x.DataId == OmegaFemaleDataId && x.ObjectId != _firstInfo.FemaleObjectId)
                ?.ObjectId ?? 0;
        }
    }

    // Resolves safe world position for a pair from current transforms and cast id.
    private bool TryGetSafePosition(OmegaPairInfo info, out Vector3 safePosition)
    {
        safePosition = default;
        if(!info.IsReady) return false;

        var male = Svc.Objects.FirstOrDefault(x => x.ObjectId == info.MaleObjectId) as IBattleNpc;
        var female = Svc.Objects.FirstOrDefault(x => x.ObjectId == info.FemaleObjectId) as IBattleNpc;
        if(male == null || female == null || !male.IsCharacterVisible() || !female.IsCharacterVisible())
            return false;

        var pos = GetSafePosition(male, female, info.OmegaCastId);
        if(pos == null) return false;

        safePosition = pos.Value;
        return true;
    }

    // Updates point nav element: position, tether, optional rainbow tint, enable state.
    private void UpdateNavigation(string elementName, bool shouldEnable, Vector3 safePosition, bool tether, bool rainbow)
    {
        if(!Controller.TryGetElementByName(elementName, out var element)) return;
        if(!shouldEnable)
        {
            element.Enabled = false;
            return;
        }

        element.SetRefPosition(safePosition);
        element.tether = tether;
        if(rainbow)
            element.color = ImGui.ColorConvertFloat4ToU32(GetRainbowColor(RainbowHueCycleSeconds));
        element.Enabled = true;
    }

    // Updates tower line element ref position, XZ offsets, height, rainbow, enable state.
    private void UpdateTowerNavigation(string elementName, bool shouldEnable, Vector3 safePosition, bool rainbow)
    {
        if(!Controller.TryGetElementByName(elementName, out var element)) return;
        if(!shouldEnable)
        {
            element.Enabled = false;
            return;
        }

        element.SetRefPosition(safePosition);
        element.offX = safePosition.X;
        element.offY = safePosition.Z;
        element.offZ = TowerVerticalOffset;
        if(rainbow)
            element.color = ImGui.ColorConvertFloat4ToU32(GetRainbowColor(RainbowHueCycleSeconds));
        element.Enabled = true;
    }

    // Draws ImGui debug lines for one Omega pair in script settings.
    private void DrawPairDebug(string label, OmegaPairInfo info)
    {
        ImGui.Text($"{label} Pair");
        ImGui.Text($"- Male ObjectId: {info.MaleObjectId}");
        ImGui.Text($"- Female ObjectId: {info.FemaleObjectId}");
        ImGui.Text($"- Ready: {info.IsReady}");

        var male = Svc.Objects.FirstOrDefault(x => x.ObjectId == info.MaleObjectId) as IBattleNpc;
        var female = Svc.Objects.FirstOrDefault(x => x.ObjectId == info.FemaleObjectId) as IBattleNpc;
        if(male == null || female == null)
        {
            ImGui.Text("- Objects: missing");
            return;
        }

        var maleTransform = male.GetTransformationID();
        var femaleTransform = female.GetTransformationID();
        var maleAngle = SnapTo45(GetRelativeAngleFromArenaCenter(male.Position));
        var femaleAngle = SnapTo45(GetRelativeAngleFromArenaCenter(female.Position));
        var safePos = GetSafePosition(male, female, info.OmegaCastId);

        ImGui.Text($"- Male Transform/Angle: {maleTransform} ({FormatMaleTransform(maleTransform)}) / {maleAngle:0.##}");
        ImGui.Text($"- Female Transform/Angle: {femaleTransform} ({FormatFemaleTransform(femaleTransform)}) / {femaleAngle:0.##}");
        ImGui.Text($"- Pair Type: {GetPairType(maleTransform, femaleTransform)}");
        ImGui.Text(safePos == null
            ? "- Safe Position: unresolved"
            : $"- Safe Position: X={safePos.Value.X:0.00}, Y={safePos.Value.Y:0.00}, Z={safePos.Value.Z:0.00}");
    }

    // Safe spot from male/female transformation pair and wave cast id; null if unsupported.
    private static Vector3? GetSafePosition(IBattleNpc male, IBattleNpc female, uint omegaCastId)
    {
        var maleTransform = male.GetTransformationID();
        var femaleTransform = female.GetTransformationID();
        var maleAngle = SnapTo45(GetRelativeAngleFromArenaCenter(male.Position));
        var femaleAngle = SnapTo45(GetRelativeAngleFromArenaCenter(female.Position));
        float angle;
        var radius = OuterSafeRadius;

        if(maleTransform == TransformSword && femaleTransform == TransformStaff)
        {
            var offset = GetQuadrantOffset(maleAngle, omegaCastId, SwordStaffQuadrantOffsetDegrees, invertHorizontal: true);
            angle = femaleAngle + offset;
        }
        else if(maleTransform == TransformSword && femaleTransform == TransformFoot)
        {
            var offset = GetQuadrantOffset(femaleAngle, omegaCastId, SwordFootQuadrantOffsetDegrees, invertHorizontal: true);
            angle = femaleAngle + offset;
            radius = InnerSafeRadius;
        }
        else if(maleTransform == TransformShield && femaleTransform == TransformStaff)
        {
            var offset = GetQuadrantOffset(maleAngle, omegaCastId, ShieldStaffQuadrantOffsetDegrees, invertHorizontal: true);
            angle = maleAngle + offset;
        }
        else if(maleTransform == TransformShield && femaleTransform == TransformFoot)
        {
            var offset = GetQuadrantOffset(maleAngle, omegaCastId, ShieldFootQuadrantOffsetDegrees, invertHorizontal: true);
            angle = maleAngle + offset;
            radius = InnerSafeRadius;
        }
        else
        {
            return null;
        }

        return CalculatePointFromCenterByDegree(ArenaCenter, radius, angle);
    }

    // Signed angle offset (degrees) from horizontal vs vertical wave and NE/SW diagonal stance.
    private static float GetQuadrantOffset(float angle, uint omegaCastId, float amount, bool invertHorizontal = false)
    {
        var isNeSw = angle == NeSwDiagonalAngle1 || angle == NeSwDiagonalAngle2;
        var horizontalSign = isNeSw ? 1f : -1f;
        if(invertHorizontal) horizontalSign *= -1f;
        var sign = 0f;
        if(omegaCastId == CastWaveFirstHorizontal || omegaCastId == CastWaveFirstVertical)
            sign = omegaCastId == CastWaveFirstHorizontal ? horizontalSign : -horizontalSign;
        if(omegaCastId == CastWaveSecondHorizontal || omegaCastId == CastWaveSecondVertical)
            sign = omegaCastId == CastWaveSecondHorizontal ? horizontalSign : -horizontalSign;
        return amount * sign;
    }

    // Rounds angle to nearest 45° step in 0–360 range.
    private static float SnapTo45(float angle)
    {
        var normalized = NormalizeAngle(angle);
        return (float)(System.Math.Round(normalized / AngleSnap45) * AngleSnap45) % 360f;
    }

    // Wraps angle to [0, 360).
    private static float NormalizeAngle(float angle)
        => (angle % 360f + 360f) % 360f;

    // World XZ from center, radius, and compass angle in degrees (game convention).
    private static Vector3 CalculatePointFromCenterByDegree(Vector3 center, float radius, float degree)
    {
        var rad = degree.DegToRad();
        return new Vector3(
            center.X + System.MathF.Sin(rad) * radius,
            center.Y,
            center.Z - System.MathF.Cos(rad) * radius
        );
    }

    // Degrees from arena center toward position (same basis as safe spot math).
    private static float GetRelativeAngleFromArenaCenter(Vector3 position)
        => MathHelper.GetRelativeAngle(ArenaCenter, position);

    // Short debug label for male+female transformation id pair.
    private static string GetPairType(ushort maleTransform, ushort femaleTransform)
    {
        if(maleTransform == TransformSword && femaleTransform == TransformStaff) return "Sword+Staff";
        if(maleTransform == TransformSword && femaleTransform == TransformFoot) return "Sword+Foot";
        if(maleTransform == TransformShield && femaleTransform == TransformStaff) return "Shield+Staff";
        if(maleTransform == TransformShield && femaleTransform == TransformFoot) return "Shield+Foot";
        return "Unknown";
    }

    // Display name for male Omega transformation id.
    private static string FormatMaleTransform(ushort transform)
    {
        if(transform == TransformSword) return "Sword";
        if(transform == TransformShield) return "Shield";
        return "Unknown";
    }

    // Display name for female Omega transformation id.
    private static string FormatFemaleTransform(ushort transform)
    {
        if(transform == TransformStaff) return "Staff";
        if(transform == TransformFoot) return "Foot";
        return "Unknown";
    }

    // Human-readable text for a tracked P5 wave cast id (settings UI).
    private static string FormatCast(uint castId)
    {
        if(castId == CastWaveFirstHorizontal) return $"{CastWaveFirstHorizontal} (First Horizontal)";
        if(castId == CastWaveFirstVertical) return $"{CastWaveFirstVertical} (First Vertical)";
        if(castId == CastWaveSecondHorizontal) return $"{CastWaveSecondHorizontal} (Second Horizontal)";
        if(castId == CastWaveSecondVertical) return $"{CastWaveSecondVertical} (Second Vertical)";
        return "0 (unset)";
    }

    // Full-saturation RGBA with hue cycling over time (highlight effect).
    private Vector4 GetRainbowColor(double cycleSeconds)
    {
        if(cycleSeconds <= 0d) cycleSeconds = 1d;
        var normalizedTime = Environment.TickCount64 / 1000d / cycleSeconds;
        var hue = normalizedTime % 1f;
        return HsvToVector4(hue, 1f, 1f);
    }

    // Converts HSV in 0–1 space to opaque RGBA for ImGui.ColorConvertFloat4ToU32.
    private static Vector4 HsvToVector4(double h, double s, double v)
    {
        double r = 0d;
        double g = 0d;
        double b = 0d;
        var i = (int)(h * 6d);
        var f = h * 6d - i;
        var p = v * (1d - s);
        var q = v * (1d - f * s);
        var t = v * (1d - (1d - f) * s);

        switch(i % 6)
        {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = t; break;
            case 4: r = t; g = p; b = q; break;
            case 5: r = v; g = p; b = q; break;
        }

        return new Vector4((float)r, (float)g, (float)b, 1f);
    }

    // Turns off a layout element by name if it exists.
    private void DisableElement(string name)
    {
        if(Controller.TryGetElementByName(name, out var element))
            element.Enabled = false;
    }
    #endregion
}
```

#### Registered Element - P5 オメガ 安置ガイド

テザーおよび直線の太さを調整しています。  
必要に応じてお好みで調整してください。

```json
{"Elements":{"first_navi_tower":{"Name":"first_navi_tower","type":2,"Enabled":false,"refX":104.88148,"refY":101.0822,"refZ":0.0,"offX":104.88148,"offY":101.0822,"offZ":10.0,"radius":0.0,"color":4278386432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":16.0,"overlayText":"","refActorDataID":15708,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":3.3684855,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"second_navi_tower":{"Name":"second_navi_tower","type":2,"Enabled":false,"refX":100.0,"refY":90.0,"refZ":0.0,"offX":100.0,"offY":90.0,"offZ":10.0,"radius":0.0,"color":4293328640,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":16.0,"overlayText":"","refActorDataID":15708,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":3.3684855,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"second_navi":{"Name":"second_navi","type":0,"Enabled":false,"refX":100.0,"refY":90.0,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.0,"color":4278255426,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":8.0,"overlayText":"","refActorDataID":14669,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"first_navi":{"Name":"first_navi","type":0,"Enabled":false,"refX":104.88148,"refY":101.0822,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.0,"color":4278255376,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":8.0,"overlayText":"","refActorDataID":14669,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false}}}
```

---

### P5 オメガ ハロワ

mirage様が作成した「P5 オメガ ハロワ」のガイドスクリプトです。  
デバフおよびマーカーに応じて、ハローワールドの散開位置へ案内します。  
優先度による割り当ては行わないため、必ずマーカーの付与が必要です。

ここではrawコードを掲載していますが、必要に応じて**P5 Dynamis Omega Hello World**から導入してください。  
[**オメガ スクリプト(P5 Dynamis Omega Hello World : mirage様作)**](https://github.com/exatrines/SplatoonPresets/tree/main/Presets/Endwalker/TOP#p5-dynamis-omega-hello-world)  

```c#
using Dalamud.Bindings.ImGui;
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.ImGuiMethods;
using ECommons.Hooks.ActionEffectTypes;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using static Splatoon.Splatoon;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

public class P5_Dynamis_Omega_Hello_World : SplatoonScript
{
    #region Metadata
    public override Metadata Metadata { get; } = new(1, "mirage");
    public override HashSet<uint>? ValidTerritories => [TerritoryTop];
    #endregion

    #region Constant
    private const uint TerritoryTop = 1122;
    private const uint SceneId = 6;
    private const uint CastCodeDynamisOmega = 32789;
    private const uint CastMonitorWaveCannonLeft = 31638;
    private const uint CastMonitorWaveCannonRight = 31639;
    private const uint ActionHelloWorldNear = 31625;
    private const uint StatusHelloNear = 3442;
    private const uint StatusHelloFar = 3443;
    private const uint StatusFirstTarget = 3004;
    private const uint StatusSecondTarget = 3005;
    private const uint StatusDynamis = 3444;
    private const byte StatusDynamisTetherParam = 3;
    private const uint MarkerP1Unset = uint.MaxValue;
    private const float SettingsCellWidth = 150f;
    private const double RainbowHueCycleSeconds = 4d;

    private const string ElSep = "Spread1_Separator";
    private const string ElS1C38_BaitFar1 = "S1_C38_BaitFar1";
    private const string ElS1C38_BaitFar2 = "S1_C38_BaitFar2";
    private const string ElS1C38_BaitMon1 = "S1_C38_BaitMon1";
    private const string ElS1C38_BaitMon2 = "S1_C38_BaitMon2";
    private const string ElS1C39_BaitFar1 = "S1_C39_BaitFar1";
    private const string ElS1C39_BaitFar2 = "S1_C39_BaitFar2";
    private const string ElS1C39_BaitMon1 = "S1_C39_BaitMon1";
    private const string ElS1C39_BaitMon2 = "S1_C39_BaitMon2";
    private const string ElS2_BaitFar1 = "S2_BaitFar1";
    private const string ElS2_BaitFar2 = "S2_BaitFar2";
    private const string ElS2_Tether1 = "S2_Tether1";
    private const string ElS2_Tether2 = "S2_Tether2";

    private const string ElS1C38_FarSource = "S1_C38_FarSource";
    private const string ElS1C38_CloseSource = "S1_C38_CloseSource";
    private const string ElS1C38_NearA = "S1_C38_NearA";
    private const string ElS1C38_NearB = "S1_C38_NearB";
    private const string ElS1C39_FarSource = "S1_C39_FarSource";
    private const string ElS1C39_CloseSource = "S1_C39_CloseSource";
    private const string ElS1C39_NearA = "S1_C39_NearA";
    private const string ElS1C39_NearB = "S1_C39_NearB";
    private const string ElS2_FarSource = "S2_FarSource";
    private const string ElS2_NearSource = "S2_NearSource";
    private const string ElS2_NearA = "S2_NearA";
    private const string ElS2_NearB = "S2_NearB";

    private static readonly string[] AllSpreadElementNames =
    [
        ElSep,
        ElS1C38_FarSource,
        ElS1C38_BaitFar1,
        ElS1C38_CloseSource,
        ElS1C38_BaitFar2,
        ElS1C38_NearA,
        ElS1C38_NearB,
        ElS1C38_BaitMon1,
        ElS1C38_BaitMon2,
        ElS1C39_FarSource,
        ElS1C39_BaitFar1,
        ElS1C39_BaitFar2,
        ElS1C39_NearA,
        ElS1C39_NearB,
        ElS1C39_BaitMon1,
        ElS1C39_BaitMon2,
        ElS1C39_CloseSource,
        ElS2_FarSource,
        ElS2_BaitFar1,
        ElS2_NearSource,
        ElS2_BaitFar2,
        ElS2_NearA,
        ElS2_NearB,
        ElS2_Tether1,
        ElS2_Tether2
    ];

    private static readonly MarkerType[] MarkerPresetOrder =
    [
        MarkerType.Attack1,
        MarkerType.Attack2,
        MarkerType.Attack3,
        MarkerType.Attack4,
        MarkerType.Attack5,
        MarkerType.Attack6,
        MarkerType.Bind1,
        MarkerType.Bind2,
        MarkerType.Stop1,
        MarkerType.Stop2
    ];

    private static readonly string[] MarkerPresetComboLabels =
    [
        "Attack1",
        "Attack2",
        "Attack3",
        "Attack4",
        "Attack5",
        "Attack6",
        "Bind1",
        "Bind2",
        "Stop1",
        "Stop2"
    ];

    #endregion

    #region Config

    public sealed class Config : IEzConfig
    {
        public MarkerType Spread1BaitMonitor1Marker = MarkerType.Bind1;
        public MarkerType Spread1BaitMonitor2Marker = MarkerType.Bind2;
        public MarkerType Spread1BaitFar1Marker = MarkerType.Attack1;
        public MarkerType Spread1BaitFar2Marker = MarkerType.Attack2;
        public MarkerType Spread1BaitNear1Marker = MarkerType.Attack3;
        public MarkerType Spread1BaitNear2Marker = MarkerType.Attack4;

        public MarkerType Spread2BaitTether1Marker = MarkerType.Bind1;
        public MarkerType Spread2BaitTether2Marker = MarkerType.Bind2;
        public MarkerType Spread2BaitFar1Marker = MarkerType.Attack1;
        public MarkerType Spread2BaitFar2Marker = MarkerType.Attack2;
        public MarkerType Spread2BaitNear1Marker = MarkerType.Attack3;
        public MarkerType Spread2BaitNear2Marker = MarkerType.Attack4;

        public bool Spread1ResolveBaitNearWithoutMarker = false;
        public bool Spread2ResolveBaitNearWithoutMarker = false;

        public bool Spread2ResolveBaitTetherByStatus = false;
    }

    private Config C => Controller.GetConfig<Config>();

    #endregion

    #region State
    private readonly Dictionary<ulong, PlayerData> _players = [];
    private ScriptState _state = ScriptState.None;
    private bool _monitorIsLeft;
    #endregion

    #region Private Class

    private enum ScriptState
    {
        None,
        Wait,
        Spread1,
        Spread2
    }

    private enum Role
    {
        None,
        BaitFar1,
        BaitFar2,
        BaitMonitor1,
        BaitMonitor2,
        HelloNear,
        HelloFar,
        BaitNear1,
        BaitNear2
    }

    public enum MarkerType : uint
    {
        None = 999,
        Attack1 = 0,
        Attack2 = 1,
        Attack3 = 2,
        Attack4 = 3,
        Attack5 = 4,
        Bind1 = 5,
        Bind2 = 6,
        Bind3 = 7,
        Stop1 = 8,
        Stop2 = 9,
        Square = 10,
        Circle = 11,
        Cross = 12,
        Triangle = 13,
        Attack6 = 14,
        Attack7 = 15,
        Attack8 = 16
    }

    private sealed class PlayerData
    {
        public ulong ObjectId;
        public string Name = string.Empty;
        public uint MarkerP1 = MarkerP1Unset;
        public Role Role = Role.None;
    }

    private readonly record struct Spread1Pack(
        string Mon1,
        string Mon2,
        string NearA,
        string NearB,
        string BaitFar1,
        string BaitFar2,
        string FarSource,
        string HelloNearSource);

    #endregion

    #region LifeCycle

    public override void OnSetup()
    {
        Controller.RegisterElementFromCode(ElSep, """{"Name":"Separator","Enabled":false,"type":3,"refY":20.0,"offY":-20.0,"radius":0.0,"color":4294967295,"overlayBGColor":4278190335,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"MONITOR BAITER","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639,31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);

        Controller.RegisterElementFromCode(ElS1C38_FarSource, """{"Name":"Monitor right - HelloWorldFar","Enabled":false,"type":1,"offX":-2.0,"offY":-11.0,"radius":0.5,"color":4288326400,"overlayBGColor":4285363712,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C38_CloseSource, """{"Name":"Monitor right - HelloWorldNear","Enabled":false,"type":1,"offX":-10.96,"radius":0.5,"color":4278225677,"overlayBGColor":4278220288,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C38_BaitMon1, """{"Name":"Monitor right - BaitMonitor1","Enabled":false,"type":1,"offX":9.0,"offY":9.0,"radius":0.5,"color":4278190335,"overlayBGColor":4278190335,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C38_BaitMon2, """{"Name":"Monitor right - BaitMonitor2","Enabled":false,"type":1,"offX":9.0,"offY":-9.0,"radius":0.5,"color":4278190335,"overlayBGColor":4278190335,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C38_BaitFar1, """{"Name":"Monitor right - BaitFar1","Enabled":false,"type":1,"offX":-2.0,"offY":19.0,"radius":0.5,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C38_BaitFar2, """{"Name":"Monitor right - BaitFar2","Enabled":false,"type":1,"offX":-2.0,"offY":-18.5,"radius":0.5,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C38_NearA, """{"Name":"Monitor right - BaitNear1","Enabled":false,"type":1,"offX":-18.0,"offY":2.56,"radius":0.5,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C38_NearB, """{"Name":"Monitor right - BaitNear2","Enabled":false,"type":1,"offX":-18.18,"offY":-3.68,"radius":0.5,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);

        Controller.RegisterElementFromCode(ElS1C39_FarSource, """{"Name":"Monitor left - HelloWorldFar","Enabled":false,"type":1,"offX":2.0,"offY":-11.0,"radius":0.5,"color":4288326400,"overlayBGColor":4285363712,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C39_CloseSource, """{"Name":"Monitor left - HelloWorldNear","Enabled":false,"type":1,"offX":10.96,"radius":0.5,"color":4278225677,"overlayBGColor":4278220288,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C39_BaitMon1, """{"Name":"Monitor left - BaitMonitor1","Enabled":false,"type":1,"offX":-9.0,"offY":-9.0,"radius":0.5,"color":4278190335,"overlayBGColor":4278190335,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C39_BaitMon2, """{"Name":"Monitor left - BaitMonitor2","Enabled":false,"type":1,"offX":-9.0,"offY":9.0,"radius":0.5,"color":4278190335,"overlayBGColor":4278190335,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C39_BaitFar2, """{"Name":"Monitor left - BaitFar2", "Enabled":false,"type":1,"offX":2.0,"offY":19.0,"radius":0.5,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C39_BaitFar1, """{"Name":"Monitor left - BaitFar1", "Enabled":false,"type":1,"offX":2.0,"offY":-18.5,"radius":0.5,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C39_NearA, """{"Name":"Monitor left - BaitNear1","Enabled":false,"type":1,"offX":18.18,"offY":-3.68,"radius":0.5,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS1C39_NearB, """{"Name":"Monitor left - BaitNear2","Enabled":false,"type":1,"offX":18.0,"offY":2.56,"radius":0.5,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorComparisonType":6,"includeRotation":true}""", overwrite: true);

        Controller.RegisterElementFromCode(ElS2_FarSource, """{"Name":"HelloWorldFar","Enabled":false,"type":1,"offX":-8.5,"offY":20.0,"radius":0.5,"color":4288326400,"overlayBGColor":4285363712,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"","refActorNPCNameID":7695,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS2_NearSource, """{"Name":"HelloWorldNear","Enabled":false,"type":1,"offY":30.34,"radius":0.5,"color":4278225677,"overlayBGColor":4278220288,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"","refActorNPCNameID":7695,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS2_Tether1, """{"Name":"BaitTether1","Enabled":false,"type":1,"offX":11.0,"offY":5.25,"radius":0.5,"color":4278190335,"overlayBGColor":4278190335,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS2_Tether2, """{"Name":"BaitTether2","Enabled":false,"type":1,"offX":-11.0,"offY":5.25,"radius":0.5,"color":4278190335,"overlayBGColor":4278190335,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS2_BaitFar1, """{"Name":"BaitFar1","Enabled":false,"type":1,"offX":19.0,"offY":20.0,"radius":0.5,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"","refActorNPCNameID":7695,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS2_BaitFar2, """{"Name":"BaitFar2","Enabled":false,"type":1,"offX":-19.0,"offY":20.0,"radius":0.5,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"","refActorNPCNameID":7695,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS2_NearA, """{"Name":"BaitNear1","Enabled":false,"type":1,"offX":4.76,"offY":38.0,"radius":0.5,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7695,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
        Controller.RegisterElementFromCode(ElS2_NearB, """{"Name":"BaitNear2","Enabled":false,"type":1,"offX":-2.86,"offY":38.22,"radius":0.5,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"","refActorNPCNameID":7695,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true}""", overwrite: true);
    }

    public override void OnUpdate()
    {
        DisableAllSpreadElements();

        if(Controller.Scene != SceneId)
            return;

        if(_players.Count < 8)
            BuildPartySnapshot();

        if(BasePlayer == null || _players.Count != 8)
            return;

        if(!_players.TryGetValue(BasePlayer.GameObjectId, out var me))
            return;

        RecomputeDerivedRoles();

        if(me.Role == Role.None)
            return;

        if(_state == ScriptState.Spread1)
        {
            EnableElement(ElSep, false);
            EnableSpread1Element(me.Role, _monitorIsLeft);
            return;
        }

        if(_state == ScriptState.Spread2)
            EnableSpread2Element(me.Role);
    }

    public override void OnReset()
    {
        _players.Clear();
        _state = ScriptState.None;
        _monitorIsLeft = false;
        DisableAllSpreadElements();
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if(!IsPhaseFive())
            return;

        if(_state == ScriptState.None && castId == CastCodeDynamisOmega)
        {
            _state = ScriptState.Wait;
            return;
        }

        if(_state == ScriptState.Wait && castId == CastMonitorWaveCannonLeft)
        {
            _state = ScriptState.Spread1;
            _monitorIsLeft = true;
            return;
        }

        if(_state == ScriptState.Wait && castId == CastMonitorWaveCannonRight)
        {
            _state = ScriptState.Spread1;
            _monitorIsLeft = false;
            return;
        }
    }

    public override void OnActionEffectEvent(ActionEffectSet set)
    {
        if(!IsPhaseFive() || set.Action == null)
            return;

        var actionId = set.Action.Value.RowId;
        if(actionId != ActionHelloWorldNear)
            return;

        if(_state == ScriptState.Spread1)
            _state = ScriptState.Spread2;
        else if(_state == ScriptState.Spread2)
            OnReset();
    }

    public override void OnActorControl(uint sourceId, uint command, uint p1, uint p2, uint p3, uint p4, uint p5, uint p6, uint p7, uint p8, ulong targetId, byte replaying)
    {
        if(!IsPhaseFive() || command != 502)
            return;

        if(!TryGetMarkedPlayer(targetId, p2, out var markedGoId, out var data))
            return;

        data.MarkerP1 = p1;
        if(data.Name.Length == 0)
            data.Name = TryGetObjectName(markedGoId);

        RecomputeDerivedRoles();
    }

    public override void OnSettingsDraw()
    {
        ImGui.TextWrapped("This Script Resolve Spread Roles from marker and status.");
        ImGui.Spacing();

        ImGui.Text("Spread1 (North: Monitor)");
        if(ImGuiEx.BeginDefaultTable("P5OmegaHelloWorldS1", ["Role", "Marker"]))
        {
            DrawHintOnlyRow("HelloNear", "Status: HelloWorldNear & FirstTarget");
            DrawHintOnlyRow("HelloFar", "Status: HelloWorldFar & FirstTarget");
            DrawMarkerOnlyRow("BaitMonitor1", ref C.Spread1BaitMonitor1Marker);
            DrawMarkerOnlyRow("BaitMonitor2", ref C.Spread1BaitMonitor2Marker);
            DrawMarkerOnlyRow("BaitFar1", ref C.Spread1BaitFar1Marker);
            DrawMarkerOnlyRow("BaitFar2", ref C.Spread1BaitFar2Marker);
            if(C.Spread1ResolveBaitNearWithoutMarker)
            {
                DrawHintOnlyRow("BaitNear1", "Remaining");
                DrawHintOnlyRow("BaitNear2", "Remaining");
            }
            else
            {
                DrawMarkerOnlyRow("BaitNear1", ref C.Spread1BaitNear1Marker);
                DrawMarkerOnlyRow("BaitNear2", ref C.Spread1BaitNear2Marker);
            }
            ImGui.EndTable();
        }

        ImGui.Checkbox("Resolve BaitNear without Marker. Tether to 2 BaitNear Positions##s1", ref C.Spread1ResolveBaitNearWithoutMarker);

        ImGui.Spacing();
        ImGui.Text("Spread2 (North: Omega Beetle)");
        if(ImGuiEx.BeginDefaultTable("P5OmegaHelloWorldS2", ["Role", "Marker"]))
        {
            DrawHintOnlyRow("HelloNear", "Status: HelloWorldNear & SecondTarget");
            DrawHintOnlyRow("HelloFar", "Status: HelloWorldFar & SecondTarget");
            if(C.Spread2ResolveBaitTetherByStatus)
            {
                DrawHintOnlyRow("BaitTether1", "Status: Dynamis 3 stack");
                DrawHintOnlyRow("BaitTether2", "Status: Dynamis 3 stack");
            }
            else
            {
                DrawMarkerOnlyRow("BaitTether1", ref C.Spread2BaitTether1Marker);
                DrawMarkerOnlyRow("BaitTether2", ref C.Spread2BaitTether2Marker);
            }
            DrawMarkerOnlyRow("BaitFar1", ref C.Spread2BaitFar1Marker);
            DrawMarkerOnlyRow("BaitFar2", ref C.Spread2BaitFar2Marker);
            if(C.Spread2ResolveBaitNearWithoutMarker)
            {
                DrawHintOnlyRow("BaitNear1", "Remaining");
                DrawHintOnlyRow("BaitNear2", "Remaining");
            }
            else
            {
                DrawMarkerOnlyRow("BaitNear1", ref C.Spread2BaitNear1Marker);
                DrawMarkerOnlyRow("BaitNear2", ref C.Spread2BaitNear2Marker);
            }
            ImGui.EndTable();
        }

        ImGui.Checkbox("Resolve BaitNear without Marker. Tether to 2 BaitNear Positions##s2", ref C.Spread2ResolveBaitNearWithoutMarker);
        ImGui.Checkbox("Resolve BaitTether by status. (Dynamis 3 stack). Tether to 2 BaitTether Positions.", ref C.Spread2ResolveBaitTetherByStatus);

        ImGui.Spacing();
        if(ImGui.CollapsingHeader("Debug"))
            DrawDebugStateSection();
    }

    #endregion

    #region Private Method

    private bool TryGetMarkedPlayer(ulong targetId, ulong p2, out ulong markedGoId, out PlayerData? data)
    {
        markedGoId = 0;
        data = null;
        if(targetId != 0 && _players.TryGetValue(targetId, out var byTarget))
        {
            markedGoId = targetId;
            data = byTarget;
            return true;
        }

        if(p2 != 0 && _players.TryGetValue(p2, out var byP2))
        {
            markedGoId = p2;
            data = byP2;
            return true;
        }

        return false;
    }

    private static string TryGetObjectName(ulong gameObjectId)
        => Svc.Objects.FirstOrDefault(x => x.GameObjectId == gameObjectId)?.Name.ToString() ?? string.Empty;

    private static IPlayerCharacter? FindPartyCharacter(ulong gameObjectId)
        => Svc.Objects.FirstOrDefault(x => x.GameObjectId == gameObjectId) as IPlayerCharacter;

    private static bool HasStatus(IPlayerCharacter obj, uint statusId)
        => obj.StatusList.Any(s => s != null && s.StatusId == statusId);

    private static bool HasStatus(IPlayerCharacter obj, uint statusId, byte param)
        => obj.StatusList.Any(s => s != null && s.StatusId == statusId && s.Param == param);

    private static readonly Comparison<PlayerData> ByObjectId = (a, b) => a.ObjectId.CompareTo(b.ObjectId);

    private static Spread1Pack Spread1PackForSide(bool monitorIsLeft)
        => monitorIsLeft
            ? new Spread1Pack(
                ElS1C38_BaitMon1,
                ElS1C38_BaitMon2,
                ElS1C38_NearA,
                ElS1C38_NearB,
                ElS1C38_BaitFar1,
                ElS1C38_BaitFar2,
                ElS1C38_FarSource,
                ElS1C38_CloseSource)
            : new Spread1Pack(
                ElS1C39_BaitMon1,
                ElS1C39_BaitMon2,
                ElS1C39_NearA,
                ElS1C39_NearB,
                ElS1C39_BaitFar1,
                ElS1C39_BaitFar2,
                ElS1C39_FarSource,
                ElS1C39_CloseSource);

    // Spread1: one monitor spot per Bind role (Mon1 / Mon2). BaitNear follows Spread1 near option.
    private void EnableSpread1Element(Role role, bool monitorIsLeft)
    {
        var pack = Spread1PackForSide(monitorIsLeft);

        if(role == Role.BaitMonitor1)
        {
            EnableElement(pack.Mon1);
            return;
        }

        if(role == Role.BaitMonitor2)
        {
            EnableElement(pack.Mon2);
            return;
        }

        if(role is Role.BaitNear1 or Role.BaitNear2)
        {
            if(C.Spread1ResolveBaitNearWithoutMarker)
                EnableElements(pack.NearA, pack.NearB);
            else if(role == Role.BaitNear1)
                EnableElement(pack.NearA);
            else
                EnableElement(pack.NearB);
            return;
        }

        var name = role switch
        {
            Role.BaitFar1 => pack.BaitFar1,
            Role.BaitFar2 => pack.BaitFar2,
            Role.HelloFar => pack.FarSource,
            Role.HelloNear => pack.HelloNearSource,
            _ => null
        };

        if(name != null)
            EnableElement(name);
    }

    // Spread2: marker tether → one spot per Bind (Tether1 / Tether2). Status tether → both spots with tethers.
    // BaitNear follows Spread2 near option.
    private void EnableSpread2Element(Role role)
    {
        if(role is Role.BaitMonitor1 or Role.BaitMonitor2)
        {
            if(C.Spread2ResolveBaitTetherByStatus)
                EnableElements(ElS2_Tether1, ElS2_Tether2);
            else if(role == Role.BaitMonitor1)
                EnableElement(ElS2_Tether1);
            else
                EnableElement(ElS2_Tether2);
            return;
        }

        if(role is Role.BaitNear1 or Role.BaitNear2)
        {
            if(C.Spread2ResolveBaitNearWithoutMarker)
                EnableElements(ElS2_NearA, ElS2_NearB);
            else if(role == Role.BaitNear1)
                EnableElement(ElS2_NearA);
            else
                EnableElement(ElS2_NearB);
            return;
        }

        var name = role switch
        {
            Role.BaitFar1 => ElS2_BaitFar1,
            Role.BaitFar2 => ElS2_BaitFar2,
            Role.HelloFar => ElS2_FarSource,
            Role.HelloNear => ElS2_NearSource,
            _ => null
        };

        if(name != null)
            EnableElement(name);
    }

    private void EnableElements(params string[] names)
    {
        foreach(var n in names)
            EnableElement(n, true);
    }

    // Turns on a registered layout element with tether and cycling rainbow tint (Sigma-style nav).
    private void EnableElement(string elementName, bool isRainbow = true)
    {
        if(!Controller.TryGetElementByName(elementName, out var element))
            return;
        if(isRainbow)
            element.color = ImGui.ColorConvertFloat4ToU32(GetRainbowColor(RainbowHueCycleSeconds));
        element.tether = true;
        element.Enabled = true;
    }

    // Full-saturation RGBA that cycles hue over wall-clock time.
    private Vector4 GetRainbowColor(double cycleSeconds)
    {
        if(cycleSeconds <= 0d)
            cycleSeconds = 1d;
        var normalizedTime = Environment.TickCount64 / 1000d / cycleSeconds;
        var hue = normalizedTime % 1f;
        return HsvToVector4(hue, 1f, 1f);
    }

    // Converts HSV in [0,1] to linear RGB with alpha 1.
    private static Vector4 HsvToVector4(double h, double s, double v)
    {
        double r = 0d;
        double g = 0d;
        double b = 0d;
        var i = (int)(h * 6d);
        var f = h * 6d - i;
        var p = v * (1d - s);
        var q = v * (1d - f * s);
        var t = v * (1d - (1d - f) * s);

        switch(i % 6)
        {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }

        return new Vector4((float)r, (float)g, (float)b, 1f);
    }

    // Disables every registered spread layout element.
    private void DisableAllSpreadElements()
    {
        foreach(var n in AllSpreadElementNames)
            DisableElement(n);
    }

    // Disables one element by name if present.
    private void DisableElement(string elementName)
    {
        if(Controller.TryGetElementByName(elementName, out var element))
            element.Enabled = false;
    }

    // One settings row with marker combo only.
    private static void DrawMarkerOnlyRow(string roleLabel, ref MarkerType marker)
    {
        ImGui.TableNextRow();
        ImGui.TableNextColumn();
        ImGui.Text(roleLabel);
        ImGui.TableNextColumn();
        DrawMarkerCell(roleLabel + "_mk", ref marker);
    }

    // One settings row: fixed hint text in the marker column (no combo).
    private static void DrawHintOnlyRow(string roleLabel, string markerColumnHint)
    {
        ImGui.TableNextRow();
        ImGui.TableNextColumn();
        ImGui.Text(roleLabel);
        ImGui.TableNextColumn();
        ImGui.TextDisabled(markerColumnHint);
    }

    // Narrow combo: Attack1–6, Bind1–2, Stop1–2 only.
    private static void DrawMarkerCell(string id, ref MarkerType marker)
    {
        var idx = Array.IndexOf(MarkerPresetOrder, marker);
        if(idx < 0)
        {
            marker = MarkerPresetOrder[0];
            idx = 0;
        }

        ImGui.PushID(id);
        ImGui.SetNextItemWidth(SettingsCellWidth);
        if(ImGui.Combo("##marker", ref idx, MarkerPresetComboLabels, MarkerPresetComboLabels.Length))
            marker = MarkerPresetOrder[idx];
        ImGui.PopID();
    }

    // Debug panel: state machine and scene for troubleshooting.
    private void DrawDebugStateSection()
    {
        ImGui.Text($"State: {_state}");
        ImGui.Text($"MonitorIsLeft: {_monitorIsLeft}");
        ImGui.Text($"Scene: {Controller.Scene} (expected P5: {SceneId})");
        ImGui.Text($"Party snapshot: {_players.Count} / 8");
        ImGui.Text(_state == ScriptState.Spread2
            ? C.Spread2ResolveBaitTetherByStatus
                ? "Marker mapping: Spread2 columns (tether: Status 3444 param 3)"
                : "Marker mapping: Spread2 columns"
            : "Marker mapping: Spread1 columns");
        ImGui.TextDisabled($"IsPhaseFive (scene == {SceneId}): {IsPhaseFive()}");

        ImGui.Separator();
        ImGui.TextUnformatted("BasePlayer:");
        if(BasePlayer == null)
        {
            ImGui.TextDisabled("(null)");
            return;
        }

        if(!_players.TryGetValue(BasePlayer.GameObjectId, out var me))
        {
            ImGui.TextDisabled("Not in party snapshot.");
            return;
        }

        RecomputeDerivedRoles();

        var displayName = me.Name.Length > 0 ? me.Name : BasePlayer.Name.ToString();
        ImGui.Text($"Name: {displayName}");
        ImGui.Text($"Role: {me.Role}");
        ImGui.Text($"Marker P1: {FormatMarkerP1(me.MarkerP1)}");
    }

    // Raid marker P1 for debug label (unset vs enum name vs raw id).
    private static string FormatMarkerP1(uint p1)
    {
        if(p1 == MarkerP1Unset)
            return "(unset)";
        return Enum.IsDefined(typeof(MarkerType), p1)
            ? $"{(MarkerType)p1} ({p1})"
            : $"{p1}";
    }

    // True when duty scene is P5 Dynamis (Omega section).
    private bool IsPhaseFive()
        => Controller.Scene == SceneId;

    // Rebuilds the eight-player snapshot from the current party list.
    private void BuildPartySnapshot()
    {
        _players.Clear();
        foreach(var pc in Controller.GetPartyMembers().OfType<IPlayerCharacter>())
        {
            _players[pc.GameObjectId] = new PlayerData
            {
                ObjectId = pc.GameObjectId,
                Name = pc.Name.ToString(),
                MarkerP1 = MarkerP1Unset,
                Role = Role.None
            };
        }
    }

    // Assigns bait roles from raid markers using Spread1 mapping in Wait/Spread1, Spread2 mapping in Spread2.
    private void ApplyMarkerRoles()
    {
        GetMarkerSlotIds(out var far1, out var far2, out var sec1, out var sec2, out var skipSpread2TetherMarkers);

        var useNearMarkers = _state == ScriptState.Spread2
            ? !C.Spread2ResolveBaitNearWithoutMarker
            : !C.Spread1ResolveBaitNearWithoutMarker;
        uint nearM1 = 0;
        uint nearM2 = 0;
        if(useNearMarkers)
        {
            if(_state == ScriptState.Spread2)
            {
                nearM1 = (uint)C.Spread2BaitNear1Marker;
                nearM2 = (uint)C.Spread2BaitNear2Marker;
            }
            else
            {
                nearM1 = (uint)C.Spread1BaitNear1Marker;
                nearM2 = (uint)C.Spread1BaitNear2Marker;
            }
        }

        foreach(var player in _players.Values)
        {
            Role role = Role.None;
            if(player.MarkerP1 == far1)
                role = Role.BaitFar1;
            else if(player.MarkerP1 == far2)
                role = Role.BaitFar2;
            else if(!skipSpread2TetherMarkers && player.MarkerP1 == sec1)
                role = Role.BaitMonitor1;
            else if(!skipSpread2TetherMarkers && player.MarkerP1 == sec2)
                role = Role.BaitMonitor2;
            else if(useNearMarkers && player.MarkerP1 == nearM1)
                role = Role.BaitNear1;
            else if(useNearMarkers && player.MarkerP1 == nearM2)
                role = Role.BaitNear2;
            player.Role = role;
        }
    }

    private void GetMarkerSlotIds(out uint far1, out uint far2, out uint sec1, out uint sec2, out bool skipSpread2TetherMarkers)
    {
        skipSpread2TetherMarkers = _state == ScriptState.Spread2 && C.Spread2ResolveBaitTetherByStatus;
        if(_state == ScriptState.Spread2)
        {
            far1 = (uint)C.Spread2BaitFar1Marker;
            far2 = (uint)C.Spread2BaitFar2Marker;
            sec1 = (uint)C.Spread2BaitTether1Marker;
            sec2 = (uint)C.Spread2BaitTether2Marker;
            return;
        }

        far1 = (uint)C.Spread1BaitFar1Marker;
        far2 = (uint)C.Spread1BaitFar2Marker;
        sec1 = (uint)C.Spread1BaitMonitor1Marker;
        sec2 = (uint)C.Spread1BaitMonitor2Marker;
    }

    // Spread2 + option: two tether baiters from Dynamis (3444) param 3 (order arbitrary; slots fixed by ObjectId sort).
    private void ApplySpread2TetherRolesFromStatus()
    {
        if(_state != ScriptState.Spread2 || !C.Spread2ResolveBaitTetherByStatus)
            return;

        var tetherPlayers = new List<PlayerData>();
        foreach(var (objectId, player) in _players.ToArray())
        {
            var obj = FindPartyCharacter(objectId);
            if(obj == null)
                continue;
            if(HasStatus(obj, StatusDynamis, StatusDynamisTetherParam))
                tetherPlayers.Add(player);
        }

        if(tetherPlayers.Count != 2)
            return;

        tetherPlayers.Sort(ByObjectId);
        tetherPlayers[0].Role = Role.BaitMonitor1;
        tetherPlayers[1].Role = Role.BaitMonitor2;
    }

    // Spread1: Hello near/far only when FirstTarget (3004) is present; Spread2: only when SecondTarget (3005).
    private bool PassesNearFarTargetGate(IPlayerCharacter obj)
        => _state switch
        {
            ScriptState.Spread1 => HasStatus(obj, StatusFirstTarget),
            ScriptState.Spread2 => HasStatus(obj, StatusSecondTarget),
            _ => false
        };

    // Overwrites roles from hello near/far debuffs on live characters.
    private void ApplyNearFarRoles()
    {
        foreach(var (objectId, player) in _players.ToArray())
        {
            var obj = FindPartyCharacter(objectId);
            if(obj == null)
                continue;
            if(!PassesNearFarTargetGate(obj))
                continue;
            if(HasStatus(obj, StatusHelloNear))
                player.Role = Role.HelloNear;
            else if(HasStatus(obj, StatusHelloFar))
                player.Role = Role.HelloFar;
        }
    }

    // Assigns near-bait roles to the two remaining players when not using BaitNear markers.
    private void ResolveRemainingNearRoles()
    {
        var useRemaining = _state == ScriptState.Spread2
            ? C.Spread2ResolveBaitNearWithoutMarker
            : C.Spread1ResolveBaitNearWithoutMarker;
        if(!useRemaining)
            return;

        var remaining = _players.Values.Where(x => x.Role == Role.None).ToList();
        if(remaining.Count != 2)
            return;

        remaining.Sort(ByObjectId);
        remaining[0].Role = Role.BaitNear1;
        remaining[1].Role = Role.BaitNear2;
    }

    // Marker roles, hello debuffs, then remaining near bait assignment.
    private void RecomputeDerivedRoles()
    {
        ApplyMarkerRoles();
        ApplyNearFarRoles();
        ApplySpread2TetherRolesFromStatus();
        ResolveRemainingNearRoles();
    }

    #endregion
}
```

#### Configuration - オメガ ハロワ

**空気読み処理（マーカー非依存時）の設定**  
ニア誘導およびテザー誘導の候補を、ロールの割り当てやデュナミスデバフのパラメーターに基づいて選出し、誘導位置候補2ヶ所を同時に表示するよう変更します。  

**マーカー処理を使用する場合、この設定は不要です。**

- Spread1  
  - Resolve Bait Near without Marker.Tether to 2 BaitNear Positions  
    **チェックする**
- Spread2  
  - Resolve BaitNear without Marker.Tether to 2 BaitNear Positions  
    **チェックする**
  - Resolve BaitTether by status.(Dynamis 3 stack).Tether to 2 BaitTether Positions.  
    **チェックする**

---

### P6 コスモアロー

公式から、コスモアローのAoEを表示するスクリプト

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/Exasquares.cs
```

---

### P6 MultiScript

公式のマルチスクリプトをベースに、表示部分へ調整を加えています。  
Configuratonの設定が必要です。

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.ExcelServices;
using ECommons.GameFunctions;
using ECommons.GameHelpers;
using ECommons.Hooks.ActionEffectTypes;
using ECommons.ImGuiMethods;
using ECommons.Schedulers;
using ECommons.Throttlers;
using FFXIVClientStructs.FFXIV.Client.Game.Object;
using Dalamud.Bindings.ImGui;
using Splatoon.SplatoonScripting;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

using ECommons.DalamudServices.Legacy;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;
internal unsafe class P6_MultiScript : SplatoonScript
{
    #region privateTypes
    private class DistanceCheck
    {
        public float Distance { get; set; }
        public IPlayerCharacter Player { get; set; }
    }

    private class CastID
    {
        public const uint BlindFaith = 31623;
        public const uint CosmoMemory = 31649;
        public const uint LimiterCut = 31660;
        public const uint RunDunamis = 31648;
        public const uint CosmoArrow = 31650;
        public const uint CosmoDive = 31654;
        public const uint CosmoDiveT = 31655;
        public const uint CosmoDiveHD = 31656;
        public const uint WaveCannonStack = 31657; // and 31658
        public const uint WaveCannonSpread = 31659;
        public const uint LimiterCutWaveCannon = 31663;
        public const uint CosmoMeteor = 31664;
        public const uint FlashWind = 32223;
        public const uint CosmoMeteorSpread = 32699;
    }

    private enum Gimmick
    {
        None = 0,
        CosmoDive,
        LimiterCut,
        FlashWind,
        WaveCannonSpread1,
        WaveCannonSpread2,
        WaveCannonStack,
        CosmoMeteor
    }
    #endregion

    #region privateStructs
    public enum SpreadMarker
    {
        NotUse = 0,
        North,
        NorthEast,
        East,
        EastSouth,
        South,
        SouthWest,
        West,
        NorthWest
    }
    #endregion

    #region publicDefine
    public override Metadata Metadata => new(7, "Redmoon, kudry + Codex");
    public override HashSet<uint>? ValidTerritories => [1122];
    #endregion

    #region privateDefine
    private bool _isP6Started = false;
    private Gimmick _currentGimmick = Gimmick.None;
    private Gimmick _prevGimmick = Gimmick.None;
    private IBattleNpc? _targetableNpc = null;
    private bool _isSecondHalf = false;
    private bool _showElement = false;
    private bool _shownOpeningFlashWind = false;
    private int _cosmoMeteorCount = 0;
    private int _limiterCutCount = 0;
    private const uint WaveCannonSpreadColor = 3355508719;
    private const uint WaveCannonStackColor = 3372220160; // 0xC8FFFF00, cyan in ImGui ABGR
    private SpreadMarker _prevSpreadMarker = SpreadMarker.NotUse;
    private SpreadMarker _prevCosmoSpreadMarker = SpreadMarker.NotUse;
    private GameObjectManager* _gom = GameObjectManager.Instance();
    private Config C => Controller.GetConfig<Config>();
    #endregion

    #region publicMethods
    public override void OnSetup()
    {
        void Register(string name, string json) => Controller.RegisterElementFromCode(name, json);

        Register("North", """{"Name":"","type":0,"Enabled":false,"refX":100.0,"refY":87.0,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("NorthEast", """{"Name":"","type":0,"Enabled":false,"refX":109.0,"refY":91.0,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("East", """{"Name":"","type":0,"Enabled":false,"refX":113.0,"refY":100.0,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("EastSouth", """{"Name":"","type":0,"Enabled":false,"refX":109.0,"refY":109.0,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("South", """{"Name":"","type":0,"Enabled":false,"refX":100.0,"refY":112.5,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("SouthWest", """{"Name":"","type":0,"Enabled":false,"refX":91.0,"refY":109.0,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("West", """{"Name":"","type":0,"Enabled":false,"refX":87.0,"refY":100.0,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("NorthWest", """{"Name":"","type":0,"Enabled":false,"refX":91.0,"refY":91.0,"refZ":-5.456968E-12,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":1.0,"color":4278255432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":8.0,"refActorTargetingYou":1,"refActorComparisonType":6,"includeRotation":true,"tether":true}""");
        Register("CosmoDiveTank1", """{"Name":"","type":1,"Enabled":false,"radius":7.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355506687,"thicc":4.0,"overlayText":"Tank Buster","refActorObjectID":270081324,"refActorComparisonType":2}""");
        Register("CosmoDiveTank2", """{"Name":"","type":1,"Enabled":false,"radius":7.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508712,"thicc":4.0,"overlayText":"Tank Buster","refActorObjectID":271585447,"refActorComparisonType":2}""");
        Register("CosmoDiveShare", """{"Name":"","type":1,"Enabled":false,"radius":5.0,"Donut":1.0,"color":3369795328,"Filled":true,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"thicc":4.0,"overlayText":"Stack","refActorObjectID":271230421,"refActorComparisonType":2}""");
        Register("FlashWind1", """{"Name":"","type":1,"Enabled":false,"radius":4.0,"Donut":1.0,"color":3355508515,"Filled":true,"fillIntensity":0.4,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"thicc":4.0,"overlayText":"AA","refActorObjectID":271585447,"refActorComparisonType":2}""");
        Register("FlashWind2", """{"Name":"","type":1,"Enabled":false,"radius":4.0,"Donut":1.0,"color":3355508509,"Filled":true,"fillIntensity":0.4,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"thicc":4.0,"overlayText":"AA","refActorObjectID":270081324,"refActorComparisonType":2}""");
        Register("WaveCannonSpreadStack1", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":110.73462,"offY":100.1449,"offZ":-5.4569686E-12,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("WaveCannonSpreadStack2", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":99.73465,"offY":110.13868,"offZ":-5.456968E-12,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("WaveCannonSpreadStack3", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":107.499756,"offY":107.927,"offZ":-5.456968E-12,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("WaveCannonSpreadStack4", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":89.34155,"offY":99.412476,"offZ":-5.456968E-12,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("WaveCannonSpreadStack5", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":91.47778,"offY":91.05054,"offZ":-5.456968E-12,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("WaveCannonSpreadStack6", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":99.74817,"offY":91.99658,"offZ":-5.4569678E-12,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("WaveCannonSpreadStack7", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":108.140625,"offY":91.26416,"offZ":-5.4569678E-12,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("WaveCannonSpreadStack8", """{"Name":"","type":2,"Enabled":true,"refX":99.99231,"refY":99.99231,"refZ":-5.456968E-12,"offX":92.48486,"offY":107.46924,"offZ":-0.0001000762,"radius":4.0,"color":3355508719,"Filled":false,"fillIntensity":0.1,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":1073798629,"refActorTargetingYou":1,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange1", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":271567273,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange2", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":270081324,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange3", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":270995253,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange4", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":271230421,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange5", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":268635045,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange6", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":271585447,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange7", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":269073269,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CosmoMeteorRange8", """{"Name":"","type":1,"Enabled":false,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":4.0,"Donut":1.0,"color":3355443455,"Filled":true,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"thicc":4.0,"refActorObjectID":271658871,"refActorComparisonType":2,"includeRotation":true,"tether":false}""");
        Register("CountReminder", """{"Name":"","type":1,"Enabled":false,"radius":0.0,"color":3355443455,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3388997632,"overlayTextColor":4278255413,"overlayVOffset":2.5,"overlayFScale":3.0,"thicc":1.0,"overlayText":"0/6","refActorObjectID":271567273,"refActorComparisonType":2,"FillStep":0.501}""");
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if(castId == CastID.CosmoArrow)
        {
            if(_targetableNpc == null)
            {
                if(source.GetObject() is not IBattleNpc npc || npc == null)
                {
                    return;
                }

                _targetableNpc = npc;
            }

            if(_isSecondHalf)
            {
                Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
                Controller.GetRegisteredElements().Each(x => x.Value.tether = false);
                _ = new TickScheduler(() =>
                {
                    ChangeGimmick(Gimmick.WaveCannonSpread1);
                }, 14000);
            }
        }
        else if(castId == CastID.CosmoMemory)
        {
            if(!_isSecondHalf && !_shownOpeningFlashWind)
            {
                if(source.GetObject() is IBattleNpc npc)
                {
                    _targetableNpc = npc;
                }

                _isP6Started = true;
                _shownOpeningFlashWind = true;
                ChangeGimmick(Gimmick.FlashWind);

                _ = new TickScheduler(() =>
                {
                    if(_currentGimmick == Gimmick.FlashWind)
                    {
                        ChangeGimmick(Gimmick.None);
                    }
                }, 14000);
            }
        }
        else if(castId == CastID.CosmoDive)
        {
            ChangeGimmick(Gimmick.CosmoDive);
        }
        else if(castId == CastID.LimiterCut)
        {
            ChangeGimmick(Gimmick.LimiterCut);
        }
        else if(castId == CastID.LimiterCutWaveCannon)
        {
            if(EzThrottler.Throttle("LimiterCutWaveCannon", 500))
            {
                ++_limiterCutCount;
                if(_limiterCutCount >= 7)
                {
                    if(!_isSecondHalf)
                    {
                        ChangeGimmick(Gimmick.WaveCannonSpread1);
                    }
                    else
                    {
                        ChangeGimmick(Gimmick.CosmoDive);
                    }
                }
                else
                {
                    EzThrottler.Throttle("LimiterCutWaveCannon", 500, true);
                }

            }
        }
        else if(castId == CastID.WaveCannonStack)
        {
            if(_currentGimmick != Gimmick.WaveCannonSpread1 && !_isSecondHalf)
            {
                ChangeGimmick(Gimmick.WaveCannonSpread1);
            }
        }
        else if(castId == CastID.CosmoMeteor)
        {
            ChangeGimmick(Gimmick.CosmoMeteor);
        }
        else if(castId == CastID.RunDunamis)
        {
            ChangeGimmick(Gimmick.None);
        }
    }

    public override void OnActionEffectEvent(ActionEffectSet set)
    {
        if(set.Action == null) return;

        if(set.Action.Value.RowId == CastID.CosmoDive || set.Action.Value.RowId == CastID.WaveCannonStack)
        {
            ChangeGimmick(Gimmick.FlashWind);
        }
        else if(set.Action.Value.RowId == CastID.WaveCannonSpread)
        {
            if(EzThrottler.Throttle("WaveCannonSpread", 500))
            {
                if(_currentGimmick == Gimmick.WaveCannonSpread1)
                {
                    ChangeGimmick(Gimmick.WaveCannonSpread2);
                }
                else
                {
                    ChangeGimmick(Gimmick.WaveCannonStack);
                }
                EzThrottler.Throttle("WaveCannonSpread", 500, true);
            }
        }
        else if(set.Action.Value.RowId == CastID.BlindFaith)
        {
            _isP6Started = true;
        }
        else if(set.Action.Value.RowId == CastID.CosmoMeteorSpread)
        {
            ++_cosmoMeteorCount;
            if(_cosmoMeteorCount >= 16)
            {
                ChangeGimmick(Gimmick.None);
            }
        }
    }

    public override void OnUpdate()
    {
        if(_currentGimmick == Gimmick.None || _targetableNpc == null || _isP6Started == false)
        {
            return;
        }

        switch(_currentGimmick)
        {
            case Gimmick.CosmoDive:
                ShowCosmoDive();
                break;
            case Gimmick.LimiterCut:
                ShowLimiterCut();
                break;
            case Gimmick.FlashWind:
                ShowFlashWind();
                break;
            case Gimmick.WaveCannonSpread1:
            case Gimmick.WaveCannonSpread2:
                ShowWaveCannonSpread();
                break;
            case Gimmick.WaveCannonStack:
                ShowWaveCannonStack();
                break;
            case Gimmick.CosmoMeteor:
                ShowCosmoMeteor();
                break;
            default:
                break;
        }
    }

    public override void OnReset()
    {
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
        Controller.GetRegisteredElements().Each(x => x.Value.tether = false);
        _isP6Started = false;
        _currentGimmick = Gimmick.None;
        _prevGimmick = Gimmick.None;
        _targetableNpc = null;
        _isSecondHalf = false;
        _showElement = false;
        _shownOpeningFlashWind = false;
        _limiterCutCount = 0;
        _cosmoMeteorCount = 0;
        _prevSpreadMarker = SpreadMarker.NotUse;
        _prevCosmoSpreadMarker = SpreadMarker.NotUse;
        EzThrottler.Reset("WaveCannonSpread");
        EzThrottler.Reset("LimiterCutWaveCannon");
    }

    public class Config : IEzConfig
    {
        public bool Debug = false;
        public SpreadMarker spreadMarker = SpreadMarker.NotUse;
        public SpreadMarker cosmoSpreadMarker = SpreadMarker.NotUse;
    }

    public override void OnSettingsDraw()
    {
        ImGui.Text("P6 MultiScript Settings");
        ImGui.Text("#Wave Cannon Spread Marker");
        if(ImGui.BeginCombo("##SpreadPos", ConvertSpreadMarker(C.spreadMarker)))
        {
            for(var i = 0; i < 9; i++)
            {
                var marker = (SpreadMarker)i;
                if(ImGui.Selectable(ConvertSpreadMarker(marker), C.spreadMarker == marker))
                {
                    C.spreadMarker = marker;
                }
            }

            ImGui.EndCombo();
        }

        ImGui.Text("#Cosmo Dive Spread Marker");
        if(ImGui.BeginCombo("##CosmoSpreadPos", ConvertSpreadMarker(C.cosmoSpreadMarker)))
        {
            for(var i = 0; i < 9; i++)
            {
                var marker = (SpreadMarker)i;
                if(ImGui.Selectable(ConvertSpreadMarker(marker), C.cosmoSpreadMarker == marker))
                {
                    C.cosmoSpreadMarker = marker;
                }
            }

            ImGui.EndCombo();
        }

        if(ImGuiEx.CollapsingHeader("Debug"))
        {
            ImGui.Text("Is P6 Started: " + _isP6Started);
            ImGui.Text("Current Gimmick: " + _currentGimmick);
            ImGui.Text("Prev Gimmick: " + _prevGimmick);
            ImGui.Text("Is Second Half: " + _isSecondHalf);
            ImGui.Text("Limiter Cut Count: " + _limiterCutCount);
            ImGui.Text("_showElement: " + _showElement);
            ImGui.Text("Cosmo Meteor Count: " + _cosmoMeteorCount);
        }
    }
    #endregion

    #region privateMethods
    private void ChangeGimmick(Gimmick gimmick)
    {
        if(_isP6Started == false)
        {
            return;
        }

        if(gimmick == Gimmick.CosmoDive && _currentGimmick == Gimmick.LimiterCut)
        {
            _showElement = false;
            _ = new TickScheduler(() =>
            {
                Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
                _limiterCutCount = 0;
                _prevGimmick = _currentGimmick;
                _currentGimmick = gimmick;
                EzThrottler.Reset("WaveCannonSpread");
                EzThrottler.Reset("LimiterCutWaveCannon");
                EzThrottler.Reset("SpreadShowDelay");
            }, 2500);
        }
        else if(_currentGimmick != Gimmick.CosmoDive)
        {
            Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
            _showElement = false;
            _limiterCutCount = 0;
            _prevGimmick = _currentGimmick;
            _currentGimmick = gimmick;
            EzThrottler.Reset("WaveCannonSpread");
            EzThrottler.Reset("LimiterCutWaveCannon");
            EzThrottler.Reset("SpreadShowDelay");
        }
        else
        {
            _ = new TickScheduler(() =>
            {
                Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
                _showElement = false;
                _limiterCutCount = 0;

                _prevGimmick = _currentGimmick;
                _currentGimmick = gimmick;
                EzThrottler.Reset("WaveCannonSpread");
                EzThrottler.Reset("LimiterCutWaveCannon");
                EzThrottler.Reset("SpreadShowDelay");
            }, 3000);
        }

        if(!_isSecondHalf && gimmick == Gimmick.WaveCannonStack)
        {
            _isSecondHalf = true;
        }
    }

    private void ShowCosmoDive()
    {
        // This Gimmick Always Update Element
        if(_targetableNpc == null || _targetableNpc.TargetObject == null)
        {
            return;
        }

        // Most 2 Closest Player from AlphaOmega
        var playerCharacters = FakeParty.Get();
        List<DistanceCheck> distanceCheckList = [];

        foreach(var character in playerCharacters)
        {
            if(character == null)
            {
                continue;
            }

            distanceCheckList.Add(new DistanceCheck
            {
                Distance = DistanceTo(character, _targetableNpc),
                Player = character
            });
        }

        var SortedList = distanceCheckList.OrderBy(x => x.Distance).ToList();

        Controller.GetElementByName("CosmoDiveTank1").refActorObjectID = SortedList[0].Player.EntityId;
        Controller.GetElementByName("CosmoDiveTank1").Enabled = true;

        Controller.GetElementByName("CosmoDiveTank2").refActorObjectID = SortedList[1].Player.EntityId;
        Controller.GetElementByName("CosmoDiveTank2").Enabled = true;

        Controller.GetElementByName("CosmoDiveShare").refActorObjectID = SortedList[2].Player.EntityId;
        Controller.GetElementByName("CosmoDiveShare").Enabled = true;
    }

    private void ShowLimiterCut()
    {
        // This Gimmick Always Update Element
        Controller.GetElementByName("CountReminder").refActorObjectID = Svc.ClientState.LocalPlayer.EntityId;
        Controller.GetElementByName("CountReminder").overlayText = $"{_limiterCutCount}/6";
        if(!_showElement)
        {
            Controller.GetElementByName("CountReminder").Enabled = true;
        }
        if(_limiterCutCount >= 6 && !_isSecondHalf)
        {
            // Show Spread Position
            if(!_isSecondHalf && (_prevSpreadMarker != C.spreadMarker || !_showElement))
            {
                if(_prevSpreadMarker != SpreadMarker.NotUse)
                {
                    Controller.GetElementByName(_prevSpreadMarker.ToString()).tether = false;
                    Controller.GetElementByName(_prevSpreadMarker.ToString()).Enabled = false;
                }

                Controller.GetElementByName(C.spreadMarker.ToString()).tether = true;
                Controller.GetElementByName(C.spreadMarker.ToString()).Enabled = true;

                _prevSpreadMarker = C.spreadMarker; // for Debug
            }
        }
        _showElement = true;
    }

    private void ShowFlashWind()
    {
        if(_targetableNpc == null || _targetableNpc.TargetObject == null)
        {
            return;
        }

        // This Gimmick Always Update Element
        var playerCharacters = FakeParty.Get();
        List<DistanceCheck> distanceCheckList = [];

        foreach(var character in playerCharacters)
        {
            if(character == null)
            {
                continue;
            }

            distanceCheckList.Add(new DistanceCheck
            {
                Distance = DistanceTo(character, _targetableNpc),
                Player = character
            });
        }

        var SortedList = distanceCheckList.OrderByDescending(x => x.Distance).ToList();

        // MT
        Controller.GetElementByName("FlashWind1").refActorObjectID = _targetableNpc.TargetObject.EntityId;
        if(!_showElement)
            Controller.GetElementByName("FlashWind1").Enabled = true;

        // OT (Farthest Player)
        Controller.GetElementByName("FlashWind2").refActorObjectID = SortedList[0].Player.EntityId;
        if(!_showElement)
            Controller.GetElementByName("FlashWind2").Enabled = true;

        _showElement = true;
    }

    private void ShowWaveCannonSpread()
    {
        // This Gimmick Always Update Element
        var playerCharacters = FakeParty.Get();
        var i = 1;
        foreach(var character in playerCharacters)
        {
            if(character == null)
            {
                continue;
            }

            var element = Controller.GetElementByName($"WaveCannonSpreadStack{i}");
            element.color = WaveCannonSpreadColor;
            element.SetRefPosition(_targetableNpc.Position);
            element.SetOffPosition(character.Position);

            if(!_showElement)
            {
                element.Enabled = true;
            }

            ++i;
        }

        // Show Spread Position
        if(!_isSecondHalf && (_prevSpreadMarker != C.spreadMarker || !_showElement))
        {
            if(_prevSpreadMarker != SpreadMarker.NotUse)
            {
                Controller.GetElementByName(_prevSpreadMarker.ToString()).tether = false;
                Controller.GetElementByName(_prevSpreadMarker.ToString()).Enabled = false;
            }

            Controller.GetElementByName(C.spreadMarker.ToString()).tether = true;
            Controller.GetElementByName(C.spreadMarker.ToString()).Enabled = true;

            _prevSpreadMarker = C.spreadMarker; // for Debug
        }

        _showElement = true;
    }

    private void ShowWaveCannonStack()
    {
        // This Gimmick Always Update Element
        var playerCharacters = FakeParty.Get();
        List<DistanceCheck> distanceCheckList = [];

        foreach(var character in playerCharacters)
        {
            if(character == null)
            {
                continue;
            }

            distanceCheckList.Add(new DistanceCheck
            {
                Distance = DistanceTo(character, _targetableNpc),
                Player = character
            });
        }

        var sortedList = distanceCheckList.OrderBy(x => x.Distance).ToList();

        var extendPos = GetExtendedAndClampedPosition(_targetableNpc.Position, sortedList[0].Player.Position, 30f, 20f);

        var element = Controller.GetElementByName("WaveCannonSpreadStack1");
        element.color = WaveCannonStackColor;
        element.SetRefPosition(_targetableNpc.Position);
        element.SetOffPosition(extendPos);
        if(!_showElement)
        {
            element.Enabled = true;
            _showElement = true;
        }
    }

    private void ShowCosmoMeteor()
    {
        var playerCharacters = FakeParty.Get();
        var i = 1;
        foreach(var character in playerCharacters)
        {
            if(character == null)
            {
                continue;
            }

            Controller.GetElementByName($"CosmoMeteorRange{i}").refActorObjectID = character.EntityId;

            if(!_showElement)
            {
                Controller.GetElementByName($"CosmoMeteorRange{i}").Enabled = true;
            }

            ++i;
        }

        // Show Spread Position
        if(C.cosmoSpreadMarker != SpreadMarker.NotUse)
        {
            if(_prevCosmoSpreadMarker != C.cosmoSpreadMarker || !_showElement)
            {
                if(_prevCosmoSpreadMarker != SpreadMarker.NotUse)
                {
                    Controller.GetElementByName(_prevCosmoSpreadMarker.ToString()).tether = false;
                    Controller.GetElementByName(_prevCosmoSpreadMarker.ToString()).Enabled = false;
                }

                Controller.GetElementByName(C.cosmoSpreadMarker.ToString()).tether = true;
                Controller.GetElementByName(C.cosmoSpreadMarker.ToString()).Enabled = true;
            }

            _prevCosmoSpreadMarker = C.cosmoSpreadMarker; // for Debug
        }

        _showElement = true;
    }

    private string ConvertSpreadMarker(SpreadMarker marker)
    {
        switch(marker)
        {
            case SpreadMarker.North:
                return "North";
            case SpreadMarker.NorthEast:
                return "NorthEast";
            case SpreadMarker.East:
                return "East";
            case SpreadMarker.EastSouth:
                return "EastSouth";
            case SpreadMarker.South:
                return "South";
            case SpreadMarker.SouthWest:
                return "SouthWest";
            case SpreadMarker.West:
                return "West";
            case SpreadMarker.NorthWest:
                return "NorthWest";
            default:
                return "NotUse";
        }
    }

    private float DistanceTo(IPlayerCharacter player, IBattleNpc npc) => Vector3.Distance(player.Position, npc.Position);

    /// <summary>
    /// Calculates the vector from the center point to the current position, extends it by the specified distance,
    /// and if a limit is specified, clamps the position within the limit.
    /// </summary>
    /// <param name="center">The coordinates of the center point</param>
    /// <param name="currentPos">The current position coordinates</param>
    /// <param name="extensionLength">The distance to extend the vector</param>
    /// <param name="limit">The maximum allowable distance from the center (if null, no clamping is applied)</param>
    /// <returns>The new extended and optionally clamped position</returns>
    private static Vector3 GetExtendedAndClampedPosition(Vector3 center, Vector3 currentPos, float extensionLength, float? limit)
    {
        // Calculate the normalized direction vector from the center to the current position
        var direction = Vector3.Normalize(currentPos - center);

        // Extend the position by the specified length
        var extendedPos = currentPos + (direction * extensionLength);

        // If limit is null, return the extended position without clamping
        if(!limit.HasValue)
        {
            return extendedPos;
        }

        // Calculate the distance from the center to the extended position
        var distanceFromCenter = Vector3.Distance(center, extendedPos);

        // If the extended position exceeds the limit, clamp it within the limit
        if(distanceFromCenter > limit.Value)
        {
            return center + (direction * limit.Value);
        }

        // If within the limit, return the extended position as is
        return extendedPos;
    }
    #endregion
}
```

#### Configuraton - P6 MultiScript

|                            | MT        | ST    | H1   | H2   | D1        | D2        | D3        | D4        |
|----------------------------|-----------|-------|------|------|-----------|-----------|-----------|-----------|
| Wave Cannon Spread Marker  | North     | South | West | East | SouthWest | EastSouth | NorthWest | NorthEast |
| Cosmo Dive Spread Marker   | NorthWest | South | West | East | SouthWest | EastSouth | North     | NorthEast |

---

### P6 コスモメテオ

公式スクリプトをベースに、表示内容および優先度設定項目を変更しています。  
使用するには、優先度設定が必要です。

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.ExcelServices;
using ECommons.GameFunctions;
using ECommons.GameHelpers;
using ECommons.GameHelpers.LegacyPlayer;
using ECommons.Hooks.ActionEffectTypes;
using ECommons.ImGuiMethods;
using ECommons.Schedulers;
using FFXIVClientStructs.FFXIV.Client.Game.Object;
using Dalamud.Bindings.ImGui;
using Splatoon.SplatoonScripting;
using Splatoon.SplatoonScripting.Priority;
using System.Collections.Generic;
using System.Linq;

using ECommons.DalamudServices.Legacy;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;
internal unsafe class Cosmo_Meteor_Adjuster_Priority : SplatoonScript
{
    #region PublicDef
    public override HashSet<uint> ValidTerritories => [1122];
    public override Metadata? Metadata => new(3, "Redmoon, kudry + Codex");
    #endregion

    #region PrivateDef
    private class FlareContainer
    {
        public IPlayerCharacter character;
        public bool mine = false;
        public float NorthDistance = 0;
        public float EastDistance = 0;
        public float WestDistance = 0;
        public float SouthDistance = 0;

        public FlareContainer(IPlayerCharacter character, bool mine)
        {
            this.character = character;
            this.mine = mine;
        }
    }

    private class CastID
    {
        public const uint CosmoMeteor = 31664;
        public const uint CosmoMeteorFlare = 31668;
    }

    private class VfxPath
    {
        public const string Flare = "vfx/lockon/eff/all_at8s_0v.avfx";
    }

    private enum StackPos
    {
        Undefined = 0,
        North = 1,
        South = 2
    }
    private const uint GuideColor = 4278255360;
    private readonly string[] GuideElements = { "FlareNorth", "FlareEast", "FlareWest", "FlareSouth", "StackNorth", "StackSouth" };
    private readonly Job[] RangedDps = { Job.BRD, Job.MCH, Job.DNC };
    private StackPos _stackPos = StackPos.Undefined;
    private List<FlareContainer> _flarePos = [];
    private bool _gimmickActive = false;
    private bool _isFlareMine = false;
    private bool _isFindRange = false;
    private bool _scheduledFlareHide = false;
    private GameObjectManager* _gom = GameObjectManager.Instance();
    private (string, string)[] _flareData = new (string, string)[3];
    private Config C => Controller.GetConfig<Config>();
    private PriorityData PriorityData => C.PriorityData ??= new();
    #endregion

    #region public
    public override void OnSetup()
    {
        Controller.RegisterElementFromCode("FlareNorth", "{\"Name\":\"\",\"type\":0,\"Enabled\":false,\"refX\":100.0,\"refY\":85.5,\"refZ\":-5.4569678E-12,\"offX\":0.0,\"offY\":0.0,\"offZ\":0.0,\"radius\":1.0,\"color\":3355508546,\"Filled\":false,\"fillIntensity\":0.5,\"thicc\":8.0,\"tether\":false,\"includeRotation\":false}");
        Controller.RegisterElementFromCode("FlareEast", "{\"Name\":\"\",\"type\":0,\"Enabled\":false,\"refX\":114.5,\"refY\":100.0,\"refZ\":-5.4569678E-12,\"offX\":0.0,\"offY\":0.0,\"offZ\":0.0,\"radius\":1.0,\"color\":3355508546,\"Filled\":false,\"fillIntensity\":0.5,\"thicc\":8.0,\"tether\":false,\"includeRotation\":false}");
        Controller.RegisterElementFromCode("StackNorth", "{\"Name\":\"\",\"type\":0,\"Enabled\":false,\"refX\":100.0,\"refY\":85.5,\"refZ\":-5.4569678E-12,\"offX\":0.0,\"offY\":0.0,\"offZ\":0.0,\"radius\":1.0,\"color\":4278245160,\"Filled\":false,\"fillIntensity\":0.5,\"thicc\":8.0,\"tether\":true,\"includeRotation\":false}");
        Controller.RegisterElementFromCode("StackSouth", "{\"Name\":\"\",\"type\":0,\"Enabled\":false,\"refX\":100.0,\"refY\":114.5,\"refZ\":-5.4569678E-12,\"offX\":0.0,\"offY\":0.0,\"offZ\":0.0,\"radius\":1.0,\"color\":3355508546,\"Filled\":false,\"fillIntensity\":0.5,\"thicc\":8.0,\"tether\":true,\"includeRotation\":false}");
        Controller.RegisterElementFromCode("FlareWest", "{\"Name\":\"\",\"type\":0,\"Enabled\":false,\"refX\":85.5,\"refY\":100.0,\"refZ\":-5.4569678E-12,\"offX\":0.0,\"offY\":0.0,\"offZ\":0.0,\"radius\":1.0,\"color\":3355508546,\"Filled\":false,\"fillIntensity\":0.5,\"thicc\":8.0,\"tether\":true,\"includeRotation\":false}");
        Controller.RegisterElementFromCode("FlareSouth", "{\"Name\":\"\",\"type\":0,\"Enabled\":false,\"refX\":100.0,\"refY\":114.5,\"refZ\":-5.4569678E-12,\"offX\":0.0,\"offY\":0.0,\"offZ\":0.0,\"radius\":1.0,\"color\":3355508546,\"Filled\":false,\"fillIntensity\":0.5,\"thicc\":8.0,\"tether\":true,\"includeRotation\":false}");
    }

    public override void OnVFXSpawn(uint target, string vfxPath)
    {
        if(target.GetObject() is IPlayerCharacter character && _gimmickActive)
        {
            if(vfxPath == VfxPath.Flare)
            {
                _flarePos.Add(new FlareContainer(character, false));
                ScheduleFlareHide();

                if(character.Address == Svc.ClientState.LocalPlayer.Address)
                {
                    _flarePos.Last().mine = true;
                    _isFlareMine = true;
                }

                if(RangedDps.Contains(character.GetJob()))
                {
                    _isFindRange = true;
                    _stackPos = StackPos.South;
                }
                else if(_flarePos.Count >= 3 && _isFindRange == false)
                {
                    _stackPos = StackPos.North;
                }

                if(_flarePos.Count >= 3)
                {
                    RefreshGuides();
                }
            }
        }
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if(castId == CastID.CosmoMeteor)
        {
            _gimmickActive = true;
        }
    }

    public override void OnActionEffectEvent(ActionEffectSet set)
    {
        if(set.Action == null)
            return;

        if(set.Action.Value.RowId == 40165)
        {
            OnReset();
        }
    }

    public override void OnUpdate()
    {
        foreach(var elementName in GuideElements)
        {
            var element = Controller.GetElementByName(elementName);
            if(element.Enabled)
            {
                element.color = GuideColor;
            }
        }
    }

    public override void OnReset()
    {
        _flarePos.Clear();
        _stackPos = StackPos.Undefined;
        _isFlareMine = false;
        _gimmickActive = false;
        _flareData = new (string, string)[3];
        _isFindRange = false;
        _scheduledFlareHide = false;
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
    }

    public class Config : IEzConfig
    {
        public bool Debug = false;
        public string BasePlayerOverride = "";
        public PriorityData PriorityData = new();
    }

    public override void OnSettingsDraw()
    {
        ImGuiEx.Text("# How to determine left/right priority:");
        ImGuiEx.Text("Set players in clockwise priority order from north ranged DPS to northwest.");
        PriorityData.Draw();

        DrawOverrideCombo();

        if(ImGui.SmallButton("Test priority"))
        {
            if(TryGetPriorityList(out var list))
            {
                ImGui.SetClipboardText(string.Join(", ", list.Select(x => x.Name.ToString())));
            }
        }

        if(ImGui.CollapsingHeader("Debug"))
        {
            ImGui.Text("Stack Position: " + _stackPos.ToString());
            ImGui.Text("Gimmick Active: " + _gimmickActive.ToString());
            ImGui.Text("Flare Mine: " + _isFlareMine.ToString());
            ImGui.Text("Script Override: " + (string.IsNullOrEmpty(C.BasePlayerOverride) ? "No Override" : C.BasePlayerOverride));
            ImGui.Text("Base Player: " + (GetBasePlayer()?.Name.ToString() ?? "None"));

            foreach(var data in _flareData)
            {
                if(data.Item1 == null || data.Item2 == null) continue;
                ImGui.Text(data.Item1 + ": " + data.Item2);
            }

            List<ImGuiEx.EzTableEntry> entries = [];
            foreach(var character in _flarePos)
            {
                entries.Add(new ImGuiEx.EzTableEntry("Name", () => ImGui.Text(character.character.Name.ToString())));
                entries.Add(new ImGuiEx.EzTableEntry("Mine", () => ImGui.Text(character.mine.ToString())));
                entries.Add(new ImGuiEx.EzTableEntry("East", () => ImGui.Text(character.EastDistance.ToString())));
                entries.Add(new ImGuiEx.EzTableEntry("West", () => ImGui.Text(character.WestDistance.ToString())));
                entries.Add(new ImGuiEx.EzTableEntry("North", () => ImGui.Text(character.NorthDistance.ToString())));
                entries.Add(new ImGuiEx.EzTableEntry("South", () => ImGui.Text(character.SouthDistance.ToString())));
            }
            ImGuiEx.EzTable(entries);
        }
    }
    #endregion

    #region private
    private bool TryGetPriorityList(out List<IPlayerCharacter> values)
    {
        var priorityPlayers = PriorityData.GetPlayers(x => x.IGameObject is IPlayerCharacter)?.ToList() ?? [];
        values = [];

        foreach(var priorityPlayer in priorityPlayers)
        {
            if(priorityPlayer.IGameObject is IPlayerCharacter player)
            {
                values.Add(player);
            }
        }

        return values.Count > 0;
    }

    private void ArbitPosition()
    {
        string[] northElementsArray = { "FlareEast", "FlareSouth", "FlareWest" };
        string[] southElementsArray = { "FlareNorth", "FlareEast", "FlareWest" };
        var basePlayer = GetBasePlayer();

        List<IPlayerCharacter> priorityList = [];

        if(!TryGetPriorityList(out priorityList)) return;

        if(_stackPos == StackPos.North)
        {
            var i = 0;
            foreach(var priorityMember in priorityList)
            {
                if(i >= northElementsArray.Length) break;

                if(_flarePos.Any(x => x.character.Address == priorityMember.Address))
                {
                    _flareData[i] = (northElementsArray[i], priorityMember.Name.ToString());
                    if(basePlayer != null && basePlayer.Address == priorityMember.Address)
                    {
                        EnableGuide(northElementsArray[i]);
                    }
                    i++;
                }
            }
        }
        else if(_stackPos == StackPos.South)
        {
            var i = 0;
            foreach(var priorityMember in priorityList)
            {
                if(i >= southElementsArray.Length) break;

                if(_flarePos.Any(x => x.character.Address == priorityMember.Address))
                {
                    _flareData[i] = (southElementsArray[i], priorityMember.Name.ToString());
                    if(basePlayer != null && basePlayer.Address == priorityMember.Address)
                    {
                        EnableGuide(southElementsArray[i]);
                    }
                    i++;
                }
            }
        }
    }

    private void EnableGuide(string elementName)
    {
        var element = Controller.GetElementByName(elementName);
        element.Enabled = true;
        element.tether = true;
        element.color = GuideColor;
    }

    private void DrawOverrideCombo()
    {
        ImGui.Separator();
        ImGui.SetNextItemWidth(220);
        if(ImGui.BeginCombo("Script Override", string.IsNullOrEmpty(C.BasePlayerOverride) ? "No Override" : C.BasePlayerOverride))
        {
            if(ImGui.Selectable("No Override", string.IsNullOrEmpty(C.BasePlayerOverride)))
            {
                C.BasePlayerOverride = "";
                RefreshGuidesIfReady();
            }

            foreach(var player in Svc.Objects.OfType<IPlayerCharacter>())
            {
                var name = player.Name.ToString();
                if(ImGui.Selectable(name, C.BasePlayerOverride == name))
                {
                    C.BasePlayerOverride = name;
                    RefreshGuidesIfReady();
                }
            }

            ImGui.EndCombo();
        }
    }

    private IPlayerCharacter? GetBasePlayer()
    {
        if(!string.IsNullOrEmpty(C.BasePlayerOverride))
        {
            var overridePlayer = Svc.Objects
                .OfType<IPlayerCharacter>()
                .FirstOrDefault(x => string.Equals(x.Name.ToString(), C.BasePlayerOverride, System.StringComparison.OrdinalIgnoreCase));

            if(overridePlayer != null)
            {
                return overridePlayer;
            }
        }

        return Svc.ClientState.LocalPlayer as IPlayerCharacter;
    }

    private void RefreshGuidesIfReady()
    {
        if(_flarePos.Count >= 3)
        {
            RefreshGuides();
        }
    }

    private void RefreshGuides()
    {
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
        ArbitPosition();

        var basePlayer = GetBasePlayer();
        var isBasePlayerFlare = basePlayer != null && _flarePos.Any(x => x.character.Address == basePlayer.Address);

        if(isBasePlayerFlare) return;

        if(_stackPos == StackPos.North)
        {
            EnableGuide("StackNorth");
        }
        else if(_stackPos == StackPos.South)
        {
            EnableGuide("StackSouth");
        }
    }

    private void ScheduleFlareHide()
    {
        if(_scheduledFlareHide) return;

        _scheduledFlareHide = true;
        _ = new TickScheduler(() =>
        {
            Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
        }, 8000);
    }
    #endregion
}
```

#### Priority - コスモメテオ

上から`D3,D4,H2,D2,ST,D1,H1,MT`  

---

### P6 波動砲：リミッターカット

波動砲：リミッターカットの誘導スクリプト  
設定不要

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.ImGuiMethods;
using Dalamud.Bindings.ImGui;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

internal class TOP_P6_Limiter_Cut_Wave_Cannon : SplatoonScript
{
    private const uint LimiterCutCast = 31660;
    private const uint WaveCannonSourceCast = 31661;
    private const uint LimiterCutWaveCannonCast = 31663;
    private const uint WaveCannonNpcDataId = 0x2FE0;
    private const float CenterX = 100f;
    private const float CenterZ = 100f;
    private const float OuterRadius = 24f;
    private const float FirstGuideRadius = 8f;
    private const float GuideRadius = 16f;
    private const float HalfOctant = 0.5f;
    private const int FirstGuideDelayMs = 9700;
    private const int FirstDistance16DelayMs = 2500;
    private const int Distance16StepDelayMs = 1700;
    private const int FirstPreviewLeadMs = 3000;
    private const int PreviewLeadMs = 1000;
    private const uint GuideColor = 4278255360;
    private const uint PreviewGuideColor = 4278255615;

    private readonly List<int> _waveCannonIndices = [];
    private List<GuideStep> _guideSteps = [];
    private bool _limiterCutActive = false;
    private bool _waveCannonCastStarted = false;
    private bool _sequenceStarted = false;
    private int _limiterCutWaveCannonCount = 0;
    private int _sequenceId = 0;
    private long _limiterCutStartedAt = 0;
    private int? _firstIndex = null;
    private int? _rotationDirection = null;
    private Config C => Controller.GetConfig<Config>();

    public override HashSet<uint>? ValidTerritories => [1122];
    public override Metadata? Metadata => new(1, "kudry + Codex");

    public override void OnSetup()
    {
        Controller.RegisterElementFromCode("Guide", """
        {
            "Name":"",
            "type":0,
            "Enabled":false,
            "refX":100.0,
            "refY":100.0,
            "refZ":0.0,
            "radius":1.0,
            "color":4278255360,
            "Filled":false,
            "fillIntensity":0.2,
            "overlayBGColor":1879048192,
            "overlayTextColor":3372220415,
            "thicc":8.0,
            "overlayText":"",
            "tether":true
        }
        """);
        Controller.RegisterElementFromCode("PreviewGuide", """
        {
            "Name":"",
            "type":0,
            "Enabled":false,
            "refX":100.0,
            "refY":100.0,
            "refZ":0.0,
            "radius":1.0,
            "color":4278255615,
            "Filled":false,
            "fillIntensity":0.2,
            "overlayBGColor":1879048192,
            "overlayTextColor":3372220415,
            "thicc":8.0,
            "overlayText":"",
            "tether":true
        }
        """);
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if(castId == LimiterCutCast)
        {
            ResetState();
            OffPreviewGuide();
            _limiterCutActive = true;
            _limiterCutStartedAt = Environment.TickCount64;
            MoveGuide(new Vector3(CenterX, 0f, CenterZ));
            return;
        }

        if(!_limiterCutActive) return;

        if(castId == WaveCannonSourceCast)
        {
            RecordWaveCannonSource(source);
            ScanWaveCannonSources();
            TryStartGuideSequence();
            return;
        }

        if(castId == LimiterCutWaveCannonCast)
        {
            _limiterCutWaveCannonCount++;
            _waveCannonCastStarted = true;
            TryStartGuideSequence();
        }
    }

    public override void OnUpdate()
    {
        if(!_limiterCutActive) return;

        ScanWaveCannonSources();
        TryStartGuideSequence();
        UpdateGuideByTimeline();
    }

    private void ScanWaveCannonSources()
    {
        foreach(var npc in Svc.Objects.OfType<IBattleChara>())
        {
            if(IsWaveCannonNpc(npc) && npc.CastActionId == WaveCannonSourceCast)
            {
                RecordWaveCannonSource(npc);
            }
        }
    }

    public override void OnReset()
    {
        ResetState();
        OffGuide();
        OffPreviewGuide();
    }

    public override void OnSettingsDraw()
    {
        ImGui.Checkbox("Debug", ref C.Debug);

        if(ImGui.CollapsingHeader("Debug"))
        {
            ImGuiEx.Text($"Limiter cut active: {_limiterCutActive}");
            ImGuiEx.Text($"31663 started: {_waveCannonCastStarted}");
            ImGuiEx.Text($"31663 count: {_limiterCutWaveCannonCount}");
            ImGuiEx.Text($"Sequence started: {_sequenceStarted}");
            ImGuiEx.Text($"Elapsed ms: {GetElapsedMs()}");
            ImGuiEx.Text($"Current step: {GetCurrentStepIndex()}");
            ImGuiEx.Text($"First index: {(_firstIndex?.ToString() ?? "None")}");
            ImGuiEx.Text($"Direction: {GetDirectionText()}");
            ImGuiEx.Text($"31661 indices: {string.Join(", ", _waveCannonIndices)}");
        }
    }

    private void RecordWaveCannonSource(uint source)
    {
        if(source.GetObject() is not IBattleChara npc) return;

        RecordWaveCannonSource(npc);
    }

    private void RecordWaveCannonSource(IBattleChara npc)
    {
        var index = GetOctantIndex(npc.Position);
        if(_waveCannonIndices.Contains(index)) return;

        _waveCannonIndices.Add(index);
        _firstIndex ??= index;

        if(_rotationDirection == null && _waveCannonIndices.Count >= 2)
        {
            _rotationDirection = GetRotationDirection(_waveCannonIndices[0], _waveCannonIndices[1]);
        }
    }

    private static bool IsWaveCannonNpc(IBattleChara npc)
    {
        var distanceFromCenter = Math.Sqrt(Math.Pow(npc.Position.X - CenterX, 2) + Math.Pow(npc.Position.Z - CenterZ, 2));
        return npc.DataId == WaveCannonNpcDataId || Math.Abs(distanceFromCenter - OuterRadius) <= 3f;
    }

    private void TryStartGuideSequence()
    {
        if(_sequenceStarted || _firstIndex == null || _rotationDirection == null) return;
        if(!_waveCannonCastStarted && _waveCannonIndices.Count < 2) return;

        _sequenceStarted = true;
        _sequenceId++;
        _guideSteps = BuildGuideSteps(_firstIndex.Value, _rotationDirection.Value);
        UpdateGuideByTimeline();
    }

    private void UpdateGuideByTimeline()
    {
        if(!_limiterCutActive) return;

        if(!_sequenceStarted)
        {
            MoveGuide(new Vector3(CenterX, 0f, CenterZ));
            OffPreviewGuide();
            return;
        }

        UpdatePreviewGuideByTimeline();

        var stepIndex = GetCurrentStepIndex();
        if(stepIndex < 0)
        {
            MoveGuide(new Vector3(CenterX, 0f, CenterZ));
            return;
        }

        if(stepIndex >= _guideSteps.Count)
        {
            OffGuide();
            OffPreviewGuide();
            return;
        }

        var step = _guideSteps[stepIndex];
        MoveGuide(PositionFromIndex(step.Index, step.Distance));
    }

    private static List<GuideStep> BuildGuideSteps(int firstIndex, int direction)
    {
        var oppositeFirstIndex = NormalizeIndex(firstIndex - direction);
        return
        [
            new(oppositeFirstIndex, FirstGuideRadius),
            new(oppositeFirstIndex, GuideRadius),
            new(oppositeFirstIndex + direction * HalfOctant, GuideRadius),
            new(oppositeFirstIndex + direction, GuideRadius),
            new(oppositeFirstIndex + direction * 1.5f, GuideRadius),
            new(oppositeFirstIndex + direction * 2f, GuideRadius),
        ];
    }

    private static int GetRotationDirection(int firstIndex, int secondIndex)
    {
        var diff = NormalizeIndex(secondIndex - firstIndex);
        return diff <= 4 ? 1 : -1;
    }

    private static int GetOctantIndex(Vector3 position)
    {
        var degrees = Math.Atan2(position.X - CenterX, CenterZ - position.Z) * 180.0 / Math.PI;
        var index = (int)Math.Round(degrees / 45.0);
        return NormalizeIndex(index);
    }

    private static Vector3 PositionFromIndex(float index, float distance)
    {
        var radians = NormalizeIndex(index) * Math.PI / 4.0;
        return new Vector3(
            CenterX + (float)Math.Sin(radians) * distance,
            0f,
            CenterZ - (float)Math.Cos(radians) * distance);
    }

    private void MoveGuide(Vector3 position)
    {
        var element = Controller.GetElementByName("Guide");
        element.refX = position.X;
        element.refY = position.Z;
        element.refZ = position.Y;
        element.radius = 1f;
        element.thicc = 8f;
        element.tether = true;
        element.color = GuideColor;
        element.Enabled = true;
    }

    private void MovePreviewGuide(Vector3 position)
    {
        var element = Controller.GetElementByName("PreviewGuide");
        element.refX = position.X;
        element.refY = position.Z;
        element.refZ = position.Y;
        element.radius = 1f;
        element.thicc = 8f;
        element.tether = true;
        element.color = PreviewGuideColor;
        element.Enabled = true;
    }

    private void OffGuide()
    {
        Controller.GetElementByName("Guide").Enabled = false;
    }

    private void OffPreviewGuide()
    {
        Controller.GetElementByName("PreviewGuide").Enabled = false;
    }

    private void ResetState()
    {
        _sequenceId++;
        _waveCannonIndices.Clear();
        _guideSteps.Clear();
        _limiterCutActive = false;
        _waveCannonCastStarted = false;
        _sequenceStarted = false;
        _limiterCutWaveCannonCount = 0;
        _limiterCutStartedAt = 0;
        _firstIndex = null;
        _rotationDirection = null;
    }

    private string GetDirectionText()
    {
        return _rotationDirection switch
        {
            1 => "Clockwise",
            -1 => "Counterclockwise",
            _ => "Unknown",
        };
    }

    private int GetCurrentStepIndex()
    {
        var elapsed = GetElapsedMs();
        if(elapsed < FirstGuideDelayMs) return -1;
        if(_guideSteps.Count > 0 && elapsed >= GetStepStartMs(_guideSteps.Count)) return _guideSteps.Count;

        for(var i = _guideSteps.Count - 1; i >= 0; i--)
        {
            if(elapsed >= GetStepStartMs(i))
            {
                return i;
            }
        }

        return -1;
    }

    private void UpdatePreviewGuideByTimeline()
    {
        var elapsed = GetElapsedMs();
        var nextStepIndex = GetNextStepIndex(elapsed);

        if(nextStepIndex < 0)
        {
            OffPreviewGuide();
            return;
        }

        var leadMs = nextStepIndex == 0 ? FirstPreviewLeadMs : PreviewLeadMs;
        var stepStartMs = GetStepStartMs(nextStepIndex);

        if(elapsed < stepStartMs - leadMs || elapsed >= stepStartMs)
        {
            OffPreviewGuide();
            return;
        }

        var step = _guideSteps[nextStepIndex];
        MovePreviewGuide(PositionFromIndex(step.Index, step.Distance));
    }

    private int GetNextStepIndex(long elapsed)
    {
        for(var i = 0; i < _guideSteps.Count; i++)
        {
            if(elapsed < GetStepStartMs(i))
            {
                return i;
            }
        }

        return -1;
    }

    private static int GetStepStartMs(int stepIndex)
    {
        if(stepIndex <= 0) return FirstGuideDelayMs;

        return FirstGuideDelayMs + FirstDistance16DelayMs + (stepIndex - 1) * Distance16StepDelayMs;
    }

    private long GetElapsedMs()
    {
        return _limiterCutStartedAt == 0 ? 0 : Environment.TickCount64 - _limiterCutStartedAt;
    }

    private static int NormalizeIndex(int index)
    {
        return (index % 8 + 8) % 8;
    }

    private static float NormalizeIndex(float index)
    {
        return (index % 8f + 8f) % 8f;
    }

    private readonly record struct GuideStep(float Index, float Distance);

    public class Config : IEzConfig
    {
        public bool Debug = false;
    }
}
```

---

### P6 マジックナンバー LB

ロール設定が必要  
対応ジョブはナイト、戦士、暗黒、ガンブレ、白魔、占星、学者、賢者

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Bindings.ImGui;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.DalamudServices.Legacy;
using ECommons.GameFunctions;
using ECommons.GameHelpers;
using ECommons.ImGuiMethods;
using ECommons.Logging;
using FFXIVClientStructs.FFXIV.Client.Game;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

internal unsafe class TOP_P6_Magic_Number_LB : SplatoonScript
{
    private const uint TopTerritory = 1122;
    private const uint MagicNumberCast = 31670;
    private const uint MagicNumberStatus = 0xDCC;
    private const uint DefaultTankLb3ActionId = 199;
    private const uint DefaultHealerLb3ActionId = 208;
    private static readonly LbRole[] RoleOptions = { LbRole.None, LbRole.MT, LbRole.ST, LbRole.H1, LbRole.H2 };

    public override HashSet<uint>? ValidTerritories => null;
    public override Metadata? Metadata => new(1, "kudry + Codex");

    private Config Conf => Controller.GetConfig<Config>();
    private int _magicNumberCastCount = 0;
    private bool _waitingForFirstHealerLb = false;
    private bool _waitingForSecondHealerLb = false;
    private bool _usedFirstLb = false;
    private bool _usedSecondLb = false;
    private long _lastCastStartedAt = 0;
    private long _lastStatusCheckAt = 0;
    private string _lastEvent = "Ready";
    private string _lastAttempt = "None";
    private string _lastPlannedLb = "None";
    private int _plannedLbCount = 0;
    private long _lastPlannedLbAt = 0;
    private bool? _lastUseResult = null;

    public override void OnStartingCast(uint source, uint castId)
    {
        if(castId != MagicNumberCast || Conf.SelectedRole == LbRole.None)
            return;

        if(Conf.AutomationOnlyInTop && Svc.ClientState.TerritoryType != TopTerritory)
        {
            DebugLog($"Ignoring cast {castId}; current territory is {Svc.ClientState.TerritoryType}");
            return;
        }

        _magicNumberCastCount++;
        _lastCastStartedAt = Environment.TickCount64;
        _lastEvent = $"Magic Number cast #{_magicNumberCastCount} started by {source.GetObject()?.Name ?? "Unknown"}";
        DebugLog(_lastEvent);

        if(_magicNumberCastCount == 1)
        {
            if(Conf.SelectedRole == LbRole.MT)
                TryUseLimitBreak("MT: first Magic Number cast");
            else if(Conf.SelectedRole == LbRole.H1)
                StartHealerWait(first: true);
        }
        else if(_magicNumberCastCount == 2)
        {
            if(Conf.SelectedRole == LbRole.ST)
                TryUseLimitBreak("ST: second Magic Number cast");
            else if(Conf.SelectedRole == LbRole.H2)
                StartHealerWait(first: false);
        }
    }

    public override void OnUpdate()
    {
        if(Conf.SelectedRole == LbRole.None)
            return;

        if(Conf.AutomationOnlyInTop && Svc.ClientState.TerritoryType != TopTerritory)
            return;

        if(!_waitingForFirstHealerLb && !_waitingForSecondHealerLb)
            return;

        if(Environment.TickCount64 - _lastStatusCheckAt < 100)
            return;

        _lastStatusCheckAt = Environment.TickCount64;

        var statusCount = CountPartyMembersWithMagicNumber();
        var partyCount = GetParty().Count;
        _lastEvent = $"Waiting status 0xDCC: {statusCount}/{partyCount}";

        if(!AllPartyMembersHaveMagicNumber())
            return;

        if(_waitingForFirstHealerLb && !_usedFirstLb)
            TryUseLimitBreak("H1: all party members have 0xDCC after first cast");
        else if(_waitingForSecondHealerLb && !_usedSecondLb)
            TryUseLimitBreak("H2: all party members have 0xDCC after second cast");

        _waitingForFirstHealerLb = false;
        _waitingForSecondHealerLb = false;
    }

    public override void OnReset()
    {
        ClearState();
    }

    public override void OnSettingsDraw()
    {
        DrawRoleCombo();

        ImGui.Checkbox("Automation only in TOP", ref Conf.AutomationOnlyInTop);
        ImGui.Checkbox("DebugPrint", ref Conf.DebugPrint);

        ImGui.Separator();
        ImGuiEx.Text("Debug LB Button");
        ImGui.SameLine();
        if(ImGui.Button("Use selected LB action"))
            TryUseLimitBreak("Manual debug button", markAutomatedUse: false);

        ImGui.Checkbox("Use job-specific LB3 action ID", ref Conf.UseJobSpecificActionId);

        ImGui.SetNextItemWidth(120);
        var tankLb = (int)Conf.FallbackTankLb3ActionId;
        if(ImGui.InputInt("Fallback Tank LB3 Action ID", ref tankLb))
            Conf.FallbackTankLb3ActionId = Math.Max(0, tankLb);

        ImGui.SetNextItemWidth(120);
        var healerLb = (int)Conf.FallbackHealerLb3ActionId;
        if(ImGui.InputInt("Fallback Healer LB3 Action ID", ref healerLb))
            Conf.FallbackHealerLb3ActionId = Math.Max(0, healerLb);

        if(ImGui.Button("Reset internal state"))
            ClearState();

        if(ImGui.CollapsingHeader("Debug"))
        {
            var party = GetParty();
            ImGuiEx.Text($"Selected role: {Conf.SelectedRole}");
            ImGuiEx.Text($"Current territory: {Svc.ClientState.TerritoryType}");
            ImGuiEx.Text($"Magic Number cast count: {_magicNumberCastCount}");
            ImGuiEx.Text($"Waiting H1/H2: {_waitingForFirstHealerLb}/{_waitingForSecondHealerLb}");
            ImGuiEx.Text($"Party status 0xDCC: {CountPartyMembersWithMagicNumber()}/{party.Count}");
            ImGuiEx.Text($"Last cast age ms: {GetAgeMs(_lastCastStartedAt)}");
            ImGuiEx.Text($"Last event: {_lastEvent}");
            ImGuiEx.Text($"Planned LB count: {_plannedLbCount}");
            ImGuiEx.Text($"Last planned LB: {_lastPlannedLb}");
            ImGuiEx.Text($"Last planned LB age ms: {GetAgeMs(_lastPlannedLbAt)}");
            ImGuiEx.Text($"Last attempt: {_lastAttempt}");
            ImGuiEx.Text($"Last UseAction result: {(_lastUseResult?.ToString() ?? "None")}");
            ImGuiEx.Text($"Selected action id: {GetSelectedActionId()}");
            ImGuiEx.Text($"Local job row id: {Player.Object?.ClassJob.RowId.ToString() ?? "None"}");
        }
    }

    private void DrawRoleCombo()
    {
        ImGui.SetNextItemWidth(160);
        if(ImGui.BeginCombo("LB Role", Conf.SelectedRole.ToString()))
        {
            foreach(var role in RoleOptions)
            {
                if(ImGui.Selectable(role.ToString(), Conf.SelectedRole == role))
                {
                    Conf.SelectedRole = role;
                    DebugLog($"Role changed to {role}");
                }
            }

            ImGui.EndCombo();
        }
    }

    private void StartHealerWait(bool first)
    {
        if(first)
        {
            _waitingForFirstHealerLb = true;
            _lastEvent = "H1 waiting for all party members to receive 0xDCC";
        }
        else
        {
            _waitingForSecondHealerLb = true;
            _lastEvent = "H2 waiting for all party members to receive 0xDCC";
        }

        DebugLog(_lastEvent);
    }

    private bool TryUseLimitBreak(string reason, bool markAutomatedUse = true)
    {
        var actionId = GetSelectedActionId();
        _lastAttempt = $"{reason}, action={actionId}, role={Conf.SelectedRole}";
        RecordPlannedLimitBreak(reason, actionId);

        if(actionId == 0)
        {
            _lastUseResult = false;
            DebugLog($"{_lastAttempt}: skipped because action id is 0");
            return false;
        }

        var result = ActionManager.Instance()->UseAction(ActionType.Action, actionId);
        _lastUseResult = result;

        if(markAutomatedUse && result)
        {
            if(_magicNumberCastCount <= 1)
                _usedFirstLb = true;
            else
                _usedSecondLb = true;
        }

        DebugLog($"{_lastAttempt}: UseAction result={result}");
        return result;
    }

    private void RecordPlannedLimitBreak(string reason, uint actionId)
    {
        _plannedLbCount++;
        _lastPlannedLbAt = Environment.TickCount64;
        _lastPlannedLb = $"{reason}, action={actionId}, castAgeMs={GetAgeMs(_lastCastStartedAt)}, party0xDCC={CountPartyMembersWithMagicNumber()}/{GetParty().Count}";
        DebugLog($"Would use LB now: {_lastPlannedLb}");
    }

    private uint GetSelectedActionId()
    {
        if(Conf.UseJobSpecificActionId)
        {
            var jobActionId = GetCurrentJobLimitBreak3ActionId();
            if(jobActionId != 0)
                return jobActionId;
        }

        return Conf.SelectedRole switch
        {
            LbRole.MT or LbRole.ST => (uint)Conf.FallbackTankLb3ActionId,
            LbRole.H1 or LbRole.H2 => (uint)Conf.FallbackHealerLb3ActionId,
            _ => 0
        };
    }

    private static uint GetCurrentJobLimitBreak3ActionId()
    {
        return Player.Object?.ClassJob.RowId switch
        {
            19 => 199,   // PLD: Last Bastion
            21 => 4240,  // WAR: Land Waker
            32 => 4241,  // DRK: Dark Force
            37 => 17105, // GNB: Gunmetal Soul
            24 => 208,   // WHM: Pulse of Life
            28 => 4247,  // SCH: Angel Feathers
            33 => 4248,  // AST: Astral Stasis
            40 => 24859, // SGE: Techne Makre
            _ => 0
        };
    }

    private List<IPlayerCharacter> GetParty()
    {
        return Svc.Objects
            .OfType<IPlayerCharacter>()
            .ToList();
    }

    private bool AllPartyMembersHaveMagicNumber()
    {
        var party = GetParty();
        return party.Count >= Conf.RequiredPartyCount && party.All(HasMagicNumberStatus);
    }

    private int CountPartyMembersWithMagicNumber()
    {
        return GetParty().Count(HasMagicNumberStatus);
    }

    private static bool HasMagicNumberStatus(IPlayerCharacter player)
    {
        return player.StatusList.Any(x => x.StatusId == MagicNumberStatus);
    }

    private static long GetAgeMs(long startedAt)
    {
        return startedAt == 0 ? 0 : Environment.TickCount64 - startedAt;
    }

    private void ClearState()
    {
        _magicNumberCastCount = 0;
        _waitingForFirstHealerLb = false;
        _waitingForSecondHealerLb = false;
        _usedFirstLb = false;
        _usedSecondLb = false;
        _lastCastStartedAt = 0;
        _lastStatusCheckAt = 0;
        _lastEvent = "Ready";
        _lastAttempt = "None";
        _lastPlannedLb = "None";
        _plannedLbCount = 0;
        _lastPlannedLbAt = 0;
        _lastUseResult = null;
    }

    private void DebugLog(string message)
    {
        if(Conf.DebugPrint)
            DuoLog.Information($"[TOP P6 Magic Number LB] {message}");
    }

    public class Config : IEzConfig
    {
        public LbRole SelectedRole = LbRole.None;
        public bool AutomationOnlyInTop = true;
        public bool DebugPrint = true;
        public bool UseJobSpecificActionId = true;
        public int FallbackTankLb3ActionId = (int)DefaultTankLb3ActionId;
        public int FallbackHealerLb3ActionId = (int)DefaultHealerLb3ActionId;
        public int RequiredPartyCount = 8;
    }

    public enum LbRole
    {
        None,
        MT,
        ST,
        H1,
        H2
    }
}
```

#### Configuration - マジックナンバー LBスクリプト

LBの使用順は MT -> H1 -> ST -> H2 を想定しています。  



## Layout

> [!IMPORTANT] Configurationの設定が必要
> **Configuration** の設定が必要なレイアウトが含まれています。  
> 導入後、**Configuration** から **ロールを選択** してください。  
>
> 1. ゲーム内チャットで **/splatoon** と入力  
> 2. **Configurations** タブを開く  
> 3. **Select Zone...** を選択  
> 4. **1122 次元の狭間** を選択  
> 5. `Default Configuration`を全て **自身のロール** に変更

```json
~Lv2~{"Name":"P1 番号デバフ NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"self - 1","type":1,"offZ":2.76,"radius":0.0,"color":4294965504,"overlayBGColor":4294965504,"overlayTextColor":3355443200,"overlayFScale":2.0,"thicc":5.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3004],"refActorComparisonType":5,"refActorType":1,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"1","type":1,"radius":0.0,"color":4294965504,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":4294965504,"overlayTextColor":3355443200,"overlayVOffset":0.5,"overlayFScale":1.5,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3004],"refActorComparisonType":5,"onlyVisible":true},{"Name":"1.NAME","type":1,"radius":0.0,"color":3372156928,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayFScale":1.2,"overlayPlaceholders":true,"thicc":0.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3004],"refActorComparisonType":5,"onlyVisible":true},{"Name":"self - 2","type":1,"offZ":2.76,"radius":0.0,"color":3364749567,"overlayBGColor":3364749567,"overlayFScale":2.0,"thicc":5.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3005],"refActorComparisonType":5,"refActorType":1,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"2","type":1,"radius":0.0,"color":3364749567,"fillIntensity":0.5,"overlayBGColor":3364749567,"overlayVOffset":0.5,"overlayFScale":1.5,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3005],"refActorComparisonType":5,"onlyVisible":true},{"Name":"2.NAME","type":1,"radius":0.0,"color":3372156928,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayFScale":1.2,"overlayPlaceholders":true,"thicc":0.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3005],"refActorComparisonType":5,"onlyVisible":true},{"Name":"self - 3","type":1,"offZ":2.76,"radius":0.0,"color":3372156928,"overlayBGColor":3372156928,"overlayFScale":2.0,"thicc":5.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"refActorType":1,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"3","type":1,"radius":0.0,"color":3372156928,"fillIntensity":0.5,"overlayBGColor":3372156928,"overlayVOffset":0.5,"overlayFScale":1.5,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"onlyVisible":true},{"Name":"3.NAME","type":1,"radius":0.0,"color":3372156928,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayFScale":1.2,"overlayPlaceholders":true,"thicc":0.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"onlyVisible":true},{"Name":"self - 4","type":1,"offZ":2.76,"radius":0.0,"color":3359113471,"overlayBGColor":3359113471,"overlayFScale":2.0,"thicc":5.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"refActorType":1,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"4","type":1,"radius":0.0,"color":3359113471,"fillIntensity":0.5,"overlayBGColor":3359113471,"overlayVOffset":0.5,"overlayFScale":1.5,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"onlyVisible":true},{"Name":"NAME","type":1,"radius":0.0,"color":3372156928,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayFScale":1.2,"overlayPlaceholders":true,"thicc":0.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 塔 配置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[2],"ElementsL":[{"Name":"塔 - 北","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayFScale":2.0,"thicc":3.0,"overlayText":"北 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":87.6,"DistanceMax":6.0},{"Name":"塔 - 東","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"東 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":112.4,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"塔 - 南","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayFScale":2.0,"thicc":3.0,"overlayText":"南 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":112.4,"DistanceMax":6.0},{"Name":"塔 - 西","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3369992447,"overlayFScale":2.0,"thicc":3.0,"overlayText":"西 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":87.6,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"Induced AOE / 靠近AOE","type":1,"Enabled":false,"radius":3.0,"color":4278255612,"fillIntensity":0.2,"overlayBGColor":3472883712,"overlayTextColor":4278255615,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":3.0,"refActorComparisonType":7,"includeRotation":true,"FaceMe":true,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":3000}]}
~Lv2~{"Name":"P1 サークルプログラム テザー 配置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[2],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":36.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":9.0}],"ElementsL":[{"Name":"塔 - 北","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"北 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":87.6,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 北","refX":100.0,"refY":87.6,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayFScale":2.0,"thicc":4.0,"overlayText":"北 - Tether"},{"Name":"塔 - 東","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"東 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":112.4,"DistanceSourceY":100.0,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 東","refX":112.4,"refY":100.0,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508725,"overlayFScale":2.0,"thicc":4.0,"overlayText":"東 - Tether"},{"Name":"塔 - 南","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"南 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":112.4,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 南","refX":100.0,"refY":112.4,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372218624,"overlayFScale":2.0,"thicc":4.0,"overlayText":"南 - Tether"},{"Name":"塔 - 西","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"西 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":87.6,"DistanceSourceY":100.0,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 西","refX":87.6,"refY":100.0,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372024063,"overlayFScale":2.0,"thicc":4.0,"overlayText":"西 - Tether"}]}
~Lv2~{"Name":"P1 サークルプログラム 塔 予告-通知","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"Tower Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278253567,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TOWER !!! <<<","refActorRequireBuff":true,"refActorBuffId":[3456],"refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true},{"Name":"Tower 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278253567,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TOWER","refActorRequireBuff":true,"refActorBuffId":[3456],"refActorUseBuffTime":true,"refActorBuffTimeMin":11.0,"refActorBuffTimeMax":17.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":13.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":5.0}],"ElementsL":[{"Name":"","type":1,"refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 予告2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":12.0}],"ElementsL":[{"Name":"","type":1,"refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TETHER","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":9.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":18.0}],"ElementsL":[{"Name":"","type":1,"refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 予告3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":21.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(8s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":8.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TETHER","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 予告4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":30.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(8s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":8.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TETHER","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知3 (刻印5s以下)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":5.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":27.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(5s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":5.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知4 (刻印5s以下)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":5.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":36.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(5s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":5.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知3-4 (刻印なし)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":18.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":27.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and not刻印","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
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
~Lv2~{"Name":"P1 パントクラトル 円周","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"円周 - ボス近捨て","type":4,"radius":3.0,"Donut":1.5,"coneAngleMin":31,"coneAngleMax":149,"color":3355508540,"Filled":false,"fillIntensity":0.0,"thicc":8.0,"refActorNPCID":7695,"refActorRequireCast":true,"refActorCastId":[32368],"refActorUseCastTime":true,"refActorCastTimeMin":1.6,"refActorCastTimeMax":3.7,"refActorComparisonType":4,"includeRotation":true},{"Name":"円周 - 頭割り組","type":4,"radius":10.5,"Donut":1.5,"coneAngleMin":31,"coneAngleMax":149,"color":3371433728,"Filled":false,"fillIntensity":0.0,"thicc":8.0,"refActorNPCID":7695,"refActorRequireCast":true,"refActorCastId":[32368],"refActorUseCastTime":true,"refActorCastTimeMin":1.6,"refActorCastTimeMax":3.7,"refActorComparisonType":4,"includeRotation":true},{"Name":"円周 - 外捨て","type":4,"radius":17.5,"Donut":1.5,"coneAngleMin":30,"coneAngleMax":150,"color":3372155125,"Filled":false,"fillIntensity":0.0,"thicc":8.0,"refActorNPCID":7695,"refActorRequireCast":true,"refActorCastId":[32368],"refActorUseCastTime":true,"refActorCastTimeMin":1.6,"refActorCastTimeMax":3.7,"refActorComparisonType":4,"includeRotation":true}]}
~Lv2~{"Name":"P1 パントクラトル 火炎放射","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"0-1.6","type":4,"radius":20.8,"coneAngleMin":-30,"coneAngleMax":30,"color":3355508725,"fillIntensity":0.05,"thicc":4.0,"refActorNPCID":7695,"refActorRequireCast":true,"refActorCastId":[32368],"refActorUseCastTime":true,"refActorCastTimeMax":1.6,"refActorComparisonType":4,"includeRotation":true},{"Name":"1.6-3.7","type":4,"radius":20.8,"coneAngleMin":-30,"coneAngleMax":30,"fillIntensity":0.3,"thicc":4.0,"refActorNPCID":7695,"refActorRequireCast":true,"refActorCastId":[32368],"refActorUseCastTime":true,"refActorCastTimeMin":1.6,"refActorCastTimeMax":3.7,"refActorComparisonType":4,"includeRotation":true}]}
~Lv2~{"Name":"P1 パントクラトル 高出力波動砲P","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372220160,"overlayFScale":1.2,"thicc":0.0,"overlayText":"Stack","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":5.0,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"refActorType":1},{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5,"refActorType":1},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5,"refActorType":1},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5,"refActorType":1},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5,"refActorType":1},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5,"refActorType":1},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5,"refActorType":1},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5,"refActorType":1},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5,"refActorType":1},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5,"refActorType":1},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5,"refActorType":1},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5,"refActorType":1},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5,"refActorType":1},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5,"refActorType":1},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5,"refActorType":1}]}
~Lv2~{"Name":"P1 パントクラトル 誘導ミサイルP(開幕)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":7.0,"Match":"オメガは「パントクラトル」の構え。","MatchDelay":4.7}],"ElementsL":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayFScale":1.2,"thicc":0.1,"overlayText":"Spread","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":6.0,"refActorBuffTimeMax":13.0,"refActorComparisonType":5,"refActorType":1},{"Name":"AoE<1>","type":1,"radius":5.0,"color":3356032768,"Filled":false,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"refActorPlaceholder":["<1>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":6.0,"refActorBuffTimeMax":13.0,"refActorComparisonType":5},{"Name":"AoE<2-8>","type":1,"radius":5.0,"color":3356032768,"fillIntensity":0.2,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":6.0,"refActorBuffTimeMax":13.0,"refActorComparisonType":5},{"Name":"13","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"13","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":12.0,"refActorBuffTimeMax":13.0,"refActorComparisonType":5,"refActorType":1},{"Name":"12","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"12","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":11.0,"refActorBuffTimeMax":12.0,"refActorComparisonType":5,"refActorType":1},{"Name":"11","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"11","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"refActorType":1},{"Name":"10","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"10","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":9.0,"refActorBuffTimeMax":10.0,"refActorComparisonType":5,"refActorType":1},{"Name":"9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356425984,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":8.0,"refActorBuffTimeMax":9.0,"refActorComparisonType":5,"refActorType":1},{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":7.0,"refActorBuffTimeMax":8.0,"refActorComparisonType":5,"refActorType":1},{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":6.0,"refActorBuffTimeMax":7.0,"refActorComparisonType":5,"refActorType":1}]}
~Lv2~{"Name":"P1 パントクラトル 誘導ミサイルP","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayFScale":1.2,"thicc":0.1,"overlayText":"Spread","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"refActorType":1},{"Name":"AoE<1>","type":1,"radius":5.0,"color":3356032768,"Filled":false,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"refActorPlaceholder":["<1>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"AoE<2-8>","type":1,"radius":5.0,"color":3356032768,"fillIntensity":0.2,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5},{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":5.0,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"refActorType":1},{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5,"refActorType":1},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5,"refActorType":1},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5,"refActorType":1},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5,"refActorType":1},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5,"refActorType":1},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5,"refActorType":1},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5,"refActorType":1},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5,"refActorType":1},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5,"refActorType":1},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5,"refActorType":1},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5,"refActorType":1},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5,"refActorType":1},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5,"refActorType":1},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3424,3495,3496,3497],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5,"refActorType":1}]}
~Lv2~{"Name":"P1 パントクラトル 高出力波動砲P AoE","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"<1>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<1>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <1>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true},{"Name":"<2>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<2>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <2>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<2>"},{"Name":"<3>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<3>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <3>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<3>"},{"Name":"<4>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<4>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <4>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<4>"},{"Name":"<5>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<5>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <5>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<5>"},{"Name":"<6>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<6>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <6>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<6>"},{"Name":"<7>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<7>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <7>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<7>"},{"Name":"<8>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"refActorPlaceholder":["<8>"],"refActorRequireBuff":true,"refActorBuffId":[3507,3508,3509,3510],"refActorUseBuffTime":true,"refActorBuffTimeMax":6.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"AoE <8>","type":3,"refY":20.0,"radius":3.0,"color":3370974976,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyTargetable":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<8>"}]}
~Lv2~{"Name":"P1 パントクラトル 後_散開","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"97737092-97f4-418b-8d86-7d9f06b2979b","Name":"Tank","Elements":[{"Name":"Tank","refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"thicc":4.0,"overlayText":"Tank","tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"3211016b-a189-4f0a-ba4f-227fef31e6c3","Name":"H1","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"b861edcc-77f4-468b-afdc-32137f99eac6","Name":"H2","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356425984,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"c57e4b2d-875a-4b10-b2ab-899fd2d0507e","Name":"D1","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"b47c327b-7b5f-4d4b-8fd2-9c809650792e","Name":"D2","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"d7e50361-51ad-4246-85df-460c625d37e1","Name":"D3","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355506687,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"f0e03b6b-6364-454e-8f3d-c5e49165eb5d","Name":"D4","Elements":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayTextColor":3355508223,"thicc":4.0,"overlayText":"D4","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":15.0,"Match":"オメガは「パントクラトル」の構え。","MatchDelay":38.0}],"ElementsL":[{"Name":"Tank","Enabled":false,"refX":100.0,"refY":86.3,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1","Enabled":false,"refX":97.24363,"refY":109.61262,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H2","Enabled":false,"refX":102.92372,"refY":109.56305,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D1","Enabled":false,"refX":92.33956,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D2","Enabled":false,"refX":107.66044,"refY":106.42788,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D3","Enabled":false,"refX":90.03805,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"D4","Enabled":false,"refX":109.96195,"refY":99.12844,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]}
~Lv2~{"Name":"P1 波動砲 タンク範囲","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":5.0,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on"}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"t1","type":4,"radius":20.5,"coneAngleMin":-60,"coneAngleMax":60,"color":3372154983,"fillIntensity":0.08,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<t2>"},{"Name":"t2","type":4,"radius":20.5,"coneAngleMin":-60,"coneAngleMax":60,"color":3372154983,"fillIntensity":0.08,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<t1>"}]}
~Lv2~{"Name":"P1 波動砲 タンク以外","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"<h1>","type":1,"Filled":false,"fillIntensity":0.5,"thicc":0.0,"refActorPlaceholder":["<h1>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":5000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<h1>","type":3,"refY":21.0,"radius":3.0,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<h1>"},{"Name":"<h2>","type":1,"Filled":false,"fillIntensity":0.5,"thicc":0.0,"refActorPlaceholder":["<h2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":5000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<h2>","type":3,"refY":21.0,"radius":3.0,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<h2>"},{"Name":"<d1>","type":1,"Filled":false,"fillIntensity":0.5,"thicc":0.0,"refActorPlaceholder":["<d1>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":5000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<d1>","type":3,"refY":21.0,"radius":3.0,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<d1>"},{"Name":"<d2>","type":1,"Filled":false,"fillIntensity":0.5,"thicc":0.0,"refActorPlaceholder":["<d2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":5000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<d2>","type":3,"refY":21.0,"radius":3.0,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<d2>"},{"Name":"<d3>","type":1,"Filled":false,"fillIntensity":0.5,"thicc":0.0,"refActorPlaceholder":["<d3>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":5000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<d3>","type":3,"refY":21.0,"radius":3.0,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<d3>"},{"Name":"<d4>","type":1,"Filled":false,"fillIntensity":0.5,"thicc":0.0,"refActorPlaceholder":["<d4>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":5000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<d4>","type":3,"refY":21.0,"radius":3.0,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<d4>"}]}
~Lv2~{"Name":"P1 波動砲_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on"}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":1.0}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":2.0}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":3.0}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.0}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.1}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.2}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.3}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.4}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.5}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.6}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.7}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.8}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P1 波動砲_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/lockon5_t0h.avfx spawned on","MatchDelay":4.9}],"ElementsL":[{"Name":"not 被魔法ダメージ増加<1-8>","type":1,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":11.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P2 組分け(リリド)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"8c19a3a2-8f0e-4f3c-a371-88651ee1661f","Name":"MT組","Elements":[{"Name":"MT組","refX":95.0,"refY":100.0,"refZ":-5.456968E-12,"radius":3.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT組","tether":true},{"Name":"ST組","Enabled":false,"refX":105.0,"refY":100.0,"refZ":-5.456968E-12,"radius":3.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST組"}]},{"Guid":"24dc2087-f63a-4514-8c56-6db0d1131db9","Name":"ST組","Elements":[{"Name":"MT組","Enabled":false,"refX":95.0,"refY":100.0,"refZ":-5.456968E-12,"radius":3.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT組"},{"Name":"ST組","refX":105.0,"refY":100.0,"refZ":-5.456968E-12,"radius":3.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST組","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":7.0,"MatchIntl":{"Jp":"ワタシはオメガであり、アルファである……。 弱きヒトの特徴を実装し、真なる強きを求めましょう。"}}],"ElementsL":[{"Name":"MT組","Enabled":false,"refX":95.0,"refY":100.0,"refZ":-5.456968E-12,"radius":3.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT組"},{"Name":"ST組","Enabled":false,"refX":105.0,"refY":100.0,"refZ":-5.456968E-12,"radius":3.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST組"}]}
~Lv2~{"Name":"P2 ソーラレイ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"e33f86ab-3436-4999-99f9-fb391c8a3904","Name":"MT","Elements":[{"Name":"MT","refX":95.0,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":105.0,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"overlayFScale":2.0,"thicc":4.0}]},{"Guid":"cfe851a2-9b1b-4168-b605-0700640ca3c6","Name":"ST","Elements":[{"Name":"MT","Enabled":false,"refX":95.0,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0},{"Name":"ST","refX":105.0,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"MatchIntl":{"Jp":"ワタシはオメガであり、アルファである……。 弱きヒトの特徴を実装し、真なる強きを求めましょう。"},"MatchDelay":7.0}],"ElementsL":[{"Name":"MT","Enabled":false,"refX":95.0,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0},{"Name":"ST","Enabled":false,"refX":105.0,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"overlayFScale":2.0,"thicc":4.0}]}
~Lv2~{"Name":"P2 連携プログラムPT(リリド)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"3c17408d-a607-4cd3-b2ea-a23e0ec19916","Name":"MT","Elements":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"4cb57f18-c3ec-4b09-9f6c-39153b546e84","Name":"ST","Elements":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"62b29d30-4ec9-4c3f-81fa-1982845a48bf","Name":"H1","Elements":[{"Name":"H1","refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"0bb55e01-b370-46ec-8d9f-adcdeb396511","Name":"H2","Elements":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"309c417b-ec14-4f40-ba97-17b857a79759","Name":"D1","Elements":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"9d1ca3f4-bd28-42e7-9f63-131b29345e18","Name":"D2","Elements":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"1d7ba52d-7048-4257-99cd-4be7ba578cd9","Name":"D3","Elements":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"c144adfd-c153-4423-a785-bf6bbce881ed","Name":"D4","Elements":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":16.0,"MatchIntl":{"Jp":"ワタシはオメガであり、アルファである……。 弱きヒトの特徴を実装し、真なる強きを求めましょう。"},"MatchDelay":14.0}],"ElementsL":[{"Name":"H1","Enabled":false,"refX":92.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"MT","Enabled":false,"refX":92.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D1","Enabled":false,"refX":92.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D3","Enabled":false,"refX":92.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356032768,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H2","Enabled":false,"refX":107.5,"refY":94.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"ST","Enabled":false,"refX":107.5,"refY":98.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D2","Enabled":false,"refX":107.5,"refY":102.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D4","Enabled":false,"refX":107.5,"refY":106.0,"refZ":-5.456968E-12,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356884736,"overlayFScale":2.0,"thicc":4.0,"overlayText":"D4","tether":true}]}
~Lv2~{"Name":"P2 ソーラレイ_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(7635>32362)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7635>32362)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7635>32362)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7635>32362)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":3.8}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":3.9}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":4.0}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":4.1}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":4.2}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":4.3}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":4.4}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":4.5}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P2 ソーラレイ_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7635>32362)","MatchDelay":4.6}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P2 Playstation Partner","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[3],"ElementsL":[{"Name":"me ","type":1,"refActorPlaceholder":["<me>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_01c.avfx","refActorVFXMax":25000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"Tether  ","type":1,"radius":0.0,"color":4278190259,"overlayBGColor":0,"overlayTextColor":4278190259,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_01c.avfx","refActorVFXMax":25000},{"Name":"me ","type":1,"refActorPlaceholder":["<me>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_03c.avfx","refActorVFXMax":25000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"Tether ","type":1,"radius":0.0,"color":4290904258,"overlayBGColor":0,"overlayTextColor":4290904258,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_03c.avfx","refActorVFXMax":25000},{"Name":"me ","type":1,"refActorPlaceholder":["<me>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_04c.avfx","refActorVFXMax":25000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"Tether ","type":1,"radius":0.0,"color":4294932224,"overlayBGColor":0,"overlayTextColor":4294932224,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_04c.avfx","refActorVFXMax":25000},{"Name":"me ","type":1,"refActorPlaceholder":["<me>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_02c.avfx","refActorVFXMax":25000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"Tether ","type":1,"radius":0.0,"color":4278236428,"overlayBGColor":0,"overlayTextColor":4278236428,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_02c.avfx","refActorVFXMax":25000}]}
~Lv2~{"Name":"P2 プレステ散開CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"CD3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayVOffset":2.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorRequireBuff":true,"refActorBuffId":[3428,3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":16.0,"refActorType":1},{"Name":"CD2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508731,"overlayVOffset":2.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorRequireBuff":true,"refActorBuffId":[3428,3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":14.0,"refActorBuffTimeMax":15.0,"refActorType":1},{"Name":"CD1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":2.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorRequireBuff":true,"refActorBuffId":[3428,3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":13.0,"refActorBuffTimeMax":14.0,"refActorType":1}]}
~Lv2~{"Name":"P2 プレステ散開ファー 警告","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"ファー 散開","type":1,"refActorRequireBuff":true,"refActorBuffId":[3428],"refActorUseBuffTime":true,"refActorBuffTimeMin":13.0,"refActorBuffTimeMax":16.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"被ダメージ上昇","type":1,"refActorRequireBuff":true,"refActorBuffId":[3366],"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"警告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508731,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"離れる","refActorType":1}]}
~Lv2~{"Name":"P2 プレステ散開ミドル 警告","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"ミドル 散開","type":1,"refActorRequireBuff":true,"refActorBuffId":[3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":13.0,"refActorBuffTimeMax":16.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"被ダメージ上昇","type":1,"refActorRequireBuff":true,"refActorBuffId":[3366],"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"警告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372220160,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"近づく","refActorType":1}]}
~Lv2~{"Name":"P2 プレステ頭割りCD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"CD3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayVOffset":2.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorRequireBuff":true,"refActorBuffId":[3428,3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorType":1},{"Name":"CD2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508731,"overlayVOffset":2.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorRequireBuff":true,"refActorBuffId":[3428,3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorType":1},{"Name":"CD1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":2.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorRequireBuff":true,"refActorBuffId":[3428,3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorType":1}]}
~Lv2~{"Name":"P2 プレステ頭割りファー 警告","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"ファー 頭割り","type":1,"refActorRequireBuff":true,"refActorBuffId":[3428],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":5.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"被ダメージ上昇","type":1,"refActorRequireBuff":true,"refActorBuffId":[3366],"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"警告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508712,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"離れる","refActorType":1}]}
~Lv2~{"Name":"P2 プレステ頭割りミドル 警告","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"ミドル 頭割り","type":1,"refActorRequireBuff":true,"refActorBuffId":[3427],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":5.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"被ダメージ上昇","type":1,"refActorRequireBuff":true,"refActorBuffId":[3366],"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"警告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372220160,"overlayVOffset":3.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"近づく","refActorType":1}]}
~Lv2~{"Name":"P2 Omega-M aoe","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":12.0,"Match":"(7635>31550)","MatchDelay":20.0}],"ElementsL":[{"Name":"","type":1,"radius":10.0,"color":4278190335,"fillIntensity":0.3,"thicc":5.0,"refActorDataID":15714,"refActorComparisonType":3,"onlyVisible":true},{"Name":"","type":1,"radius":10.0,"color":4278190335,"fillIntensity":0.3,"overlayBGColor":4278190080,"overlayTextColor":4278190335,"overlayFScale":3.0,"thicc":5.0,"overlayText":"NORTH","refActorDataID":15713,"refActorComparisonType":3,"onlyVisible":true}]}
~Lv2~{"Name":"P2 Playstation Extender","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122,990],"ElementsL":[{"Name":"","type":1,"radius":0.0,"overlayBGColor":0,"overlayTextColor":4278190259,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_01c.avfx","refActorVFXMin":7000,"refActorVFXMax":15000},{"Name":"","type":1,"radius":0.0,"overlayBGColor":0,"overlayTextColor":4290904258,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_03c.avfx","refActorVFXMin":7000,"refActorVFXMax":15000},{"Name":"","type":1,"radius":0.0,"overlayBGColor":0,"overlayTextColor":4294932224,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_04c.avfx","refActorVFXMin":7000,"refActorVFXMax":15000},{"Name":"","type":1,"radius":0.0,"overlayBGColor":0,"overlayTextColor":4278236428,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_02c.avfx","refActorVFXMin":7000,"refActorVFXMax":15000}]}
~Lv2~{"Name":"P2 M/F clones attacks","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":4.5,"Match":"(7635>31550)","MatchDelay":8.2}],"ElementsL":[{"Name":"Omega-M shield","type":1,"radius":10.0,"Donut":20.0,"color":4278190335,"fillIntensity":0.5,"thicc":4.0,"refActorDataID":15714,"refActorComparisonType":3,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorDataID":15715,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorDataID":15715,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"AdditionalRotation":1.5707964,"refActorUseTransformation":true},{"Name":"Omega-F feetfighter","type":3,"refX":16.0,"refY":40.0,"offX":16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorDataID":15715,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-F feetfighter","type":3,"refX":-16.0,"refY":40.0,"offX":-16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorDataID":15715,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-M blade","type":1,"radius":10.2,"color":4278190335,"fillIntensity":0.3,"thicc":3.0,"refActorDataID":15714,"refActorComparisonType":3,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true}]}
~Lv2~{"Name":"P2 Optmized Fire III","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"MaxDistance":7.2,"UseDistanceLimit":true,"DistanceLimitType":1,"Triggers":[{"Type":2,"Duration":5.0,"Match":"(7635>31550)","MatchDelay":15.0}],"ElementsL":[{"Name":"Self","type":1,"radius":7.0,"color":3355508490,"Filled":false,"fillIntensity":0.6857143,"thicc":4.0,"refActorType":1},{"Name":"Others","type":1,"radius":7.0,"color":3355508490,"fillIntensity":0.3,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P2 KB spots far","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[3],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":12.0,"MatchIntl":{"En":"You suffer the effect of Remote Glitch.","Jp":"「グリッチ：ファー」の効果。"},"MatchDelay":14.0}],"ElementsL":[{"Name":"Left","type":1,"offX":2.5,"offY":13.0,"radius":1.0,"color":4278190335,"overlayBGColor":4278190080,"overlayTextColor":4278190335,"thicc":5.0,"overlayText":"Left","refActorDataID":15713,"refActorComparisonType":3,"includeRotation":true,"onlyVisible":true},{"Name":"Right","type":1,"offX":-2.5,"offY":13.0,"radius":1.0,"color":4278255615,"overlayBGColor":4278190080,"overlayTextColor":4278252031,"thicc":5.0,"overlayText":"Right","refActorDataID":15713,"refActorComparisonType":3,"includeRotation":true,"onlyVisible":true}]}
~Lv2~{"Enabled":false,"Name":"P2 KB spots close","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[3],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":12.0,"MatchIntl":{"En":"You suffer the effect of Mid Glitch.","Jp":"「グリッチ：ミドル」の効果。"},"MatchDelay":14.0}],"ElementsL":[{"Name":"Bottom","type":1,"offY":15.5,"radius":1.0,"color":4278255615,"overlayBGColor":4278190080,"overlayTextColor":4278252031,"thicc":5.0,"overlayText":"Right","refActorDataID":15713,"refActorComparisonType":3,"includeRotation":true,"onlyVisible":true},{"Name":"Left","type":1,"offX":2.5,"offY":13.0,"radius":1.0,"color":4278190335,"overlayBGColor":4278190080,"overlayTextColor":4278190335,"thicc":5.0,"overlayText":"Left","refActorDataID":15713,"refActorComparisonType":3,"includeRotation":true,"onlyVisible":true},{"Name":"Right","type":1,"Enabled":false,"offX":-2.5,"offY":13.0,"radius":1.0,"color":4278255615,"overlayBGColor":4278190080,"overlayTextColor":4278252031,"thicc":5.0,"overlayText":"Right","refActorDataID":15713,"refActorComparisonType":3,"includeRotation":true,"onlyVisible":true}]}
~Lv2~{"Name":"P2 Optical unit finder - line","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":7.3,"Match":"(7635>31550)","MatchDelay":12.7}],"ElementsL":[{"Name":"","type":3,"refY":35.0,"offY":65.0,"radius":8.0,"color":4294966272,"fillIntensity":0.5,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":3,"offY":35.0,"radius":8.0,"color":4244635903,"fillIntensity":0.5,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"Circle with tether","type":1,"Enabled":false,"offY":27.04,"radius":5.0,"color":4294967040,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true,"tether":true}]}
~Lv2~{"Name":"P2 Optical unit finder - early beam","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":"(7635>31550)","MatchDelay":5.0}],"ElementsL":[{"Name":"","type":3,"refY":25.0,"refZ":20.0,"offY":25.0,"radius":2.0,"color":3372220160,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":3,"refX":-25.0,"refZ":20.0,"offX":-25.0,"radius":2.0,"color":3372220160,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true,"AdditionalRotation":1.5707964}]}
~Lv2~{"Name":"P2 連携プログラムLB C集合","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":"(7635>31545)"}],"ElementsL":[{"Name":"","refX":100.0,"refY":106.5,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508503,"overlayFScale":2.0,"thicc":4.0,"overlayText":"集合","tether":true}]}
~Lv2~{"Name":"P2 Optimized Sagittarius Arrow","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"","type":3,"refY":45.0,"radius":5.0,"color":4278190335,"fillIntensity":0.1,"thicc":5.0,"refActorNPCNameID":7633,"refActorRequireCast":true,"refActorCastId":[31539],"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Enabled":false,"Name":"P2 Playstation new toolbox - Close","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[3],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":13.0,"MatchIntl":{"En":"You suffer the effect of Mid Glitch.","Jp":"「グリッチ：ミドル」の効果。"},"MatchDelay":3.0}],"ElementsL":[{"Name":" right","type":1,"offX":-11.0,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-11.0,"offY":60.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-11.0,"offY":30.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-11.0,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":60.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":30.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Enabled":false,"Name":"P2 Playstation new toolbox - far (right flip)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[3],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":13.0,"MatchIntl":{"En":"You suffer the effect of Remote Glitch.","Jp":"「グリッチ：ファー」の効果。"},"MatchDelay":3.0}],"ElementsL":[{"Name":" right","type":1,"offX":-12.0,"offY":60.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-18.5,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-18.5,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-12.0,"offY":30.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":12.0,"offY":30.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":18.5,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":18.5,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":12.0,"offY":60.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Name":"P2 ブレードダンス","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"e2297f23-e833-4a52-addc-26868e62ca38","Name":"MT","Elements":[{"Name":"オメガM Tether","type":1,"radius":0.0,"color":3370188544,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorComparisonType":4,"tether":true},{"Name":"オメガM 捨て位置1","type":1,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877},{"Name":"オメガM 捨て位置2","type":1,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.0471976},{"Name":"オメガF Tether","type":1,"Enabled":false,"radius":0.0,"color":3372155131,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorComparisonType":4,"tether":true},{"Name":"オメガF 捨て位置1","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877},{"Name":"オメガF 捨て位置2","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.0471976}]},{"Guid":"d8f58a18-3c5e-4701-be66-2257e06484af","Name":"ST","Elements":[{"Name":"オメガM Tether","type":1,"Enabled":false,"radius":0.0,"color":3370188544,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorComparisonType":4,"tether":true},{"Name":"オメガM 捨て位置1","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877},{"Name":"オメガM 捨て位置2","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.0471976},{"Name":"オメガF Tether","type":1,"radius":0.0,"color":3372155131,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorComparisonType":4,"tether":true},{"Name":"オメガF 捨て位置1","type":1,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877},{"Name":"オメガF 捨て位置2","type":1,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.0471976}]}],"ElementsL":[{"Name":"オメガM Tether","type":1,"Enabled":false,"radius":0.0,"color":3370188544,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorComparisonType":4,"tether":true},{"Name":"オメガM 捨て位置1","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877},{"Name":"オメガM 捨て位置2","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.0471976},{"Name":"オメガF Tether","type":1,"Enabled":false,"radius":0.0,"color":3372155131,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorComparisonType":4,"tether":true},{"Name":"オメガF 捨て位置1","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877},{"Name":"オメガF 捨て位置2","type":1,"Enabled":false,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.0471976}]}
~Lv2~{"Name":"P2 ブレードダンス_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31540)"}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31540)","MatchDelay":1.0}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31540)","MatchDelay":2.0}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31540)","MatchDelay":3.0}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31540)","MatchDelay":4.0}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31540)","MatchDelay":5.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31540)","MatchDelay":6.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31540)","MatchDelay":7.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P2 ブレードダンス_Go","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":2.0,"Match":"(7633>31540)","MatchDelay":7.0}],"ElementsL":[{"Name":"Go","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3356425984,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Go","refActorRequireBuff":true,"refActorBuffId":[56,126,200,493,657,695,934,2090,2123,2882,2940,3415,4162,2882],"refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"a6015c21-36b9-48cf-abd9-d1ffd317317f","Name":"MT","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true},{"Name":"シールドコンボS ST","type":1,"Enabled":false,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"Enabled":false,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]},{"Guid":"4cc3c954-2c1f-4abe-a886-8c836f07adbe","Name":"ST","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"Enabled":false,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true},{"Name":"シールドコンボS タンク以外","type":1,"Enabled":false,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]},{"Guid":"2a6e1960-6394-4e7a-862a-958f95376e05","Name":"DPS and Healer","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"Enabled":false,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"Enabled":false,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true}]}],"ElementsL":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]}
~Lv2~{"Name":"P2 パイルピッチ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"a6015c21-36b9-48cf-abd9-d1ffd317317f","Name":"MT","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorUseCastTime":true,"refActorCastTimeMin":5.0,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS キャスト中","type":1,"radius":4.6,"Donut":0.4,"color":3372220160,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorUseCastTime":true,"refActorCastTimeMin":5.0,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"回避","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":1.5,"thicc":0.0,"overlayText":"逃げて","refActorPlaceholder":["<t1>","<t2>"],"refActorRequireBuff":true,"refActorBuffId":[2534],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":7.0,"refActorComparisonType":5,"refActorType":1},{"Name":"参加","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372213760,"overlayFScale":1.5,"thicc":0.0,"overlayText":"中央","refActorPlaceholder":["<t1>","<t2>"],"refActorRequireBuff":true,"refActorBuffId":[2534],"refActorRequireAllBuffs":true,"refActorRequireBuffsInvert":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":7.0,"refActorComparisonType":5,"refActorType":1}]},{"Guid":"4cc3c954-2c1f-4abe-a886-8c836f07adbe","Name":"ST","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"Enabled":false,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true},{"Name":"シールドコンボS タンク以外","type":1,"Enabled":false,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]},{"Guid":"2a6e1960-6394-4e7a-862a-958f95376e05","Name":"DPS and Healer","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"Enabled":false,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"Enabled":false,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true}]}],"ElementsL":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.6,"Match":"(7633>31527)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31527)","MatchDelay":0.6}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31527)","MatchDelay":1.6}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31527)","MatchDelay":2.6}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":3.6}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":3.7}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":3.8}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":3.9}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":4.0}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":4.1}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":4.2}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":4.3}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":4.4}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P2 シールドバッシュ_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":4.5}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31527)","MatchDelay":5.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7633>31527)","MatchDelay":6.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P2 パイルピッチ_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7633>31527)","MatchDelay":7.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P3/P4 Wave Repeater 1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":5.2,"Match":">31567)"}],"ElementsL":[{"Name":"1","refX":100.0,"refY":100.0,"radius":6.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":7636,"refActorUseCastTime":true,"refActorCastTimeMax":5.5,"refActorUseOvercast":true,"refActorComparisonType":6}]}
~Lv2~{"Name":"P3/P4 Wave Repeater 2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":2.0,"Match":">31567)","MatchDelay":5.2}],"ElementsL":[{"Name":"2","refX":100.0,"refY":100.0,"radius":6.0,"Donut":6.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31567],"refActorUseCastTime":true,"refActorCastTimeMin":5.5,"refActorCastTimeMax":7.5,"refActorUseOvercast":true,"refActorComparisonType":6}]}
~Lv2~{"Name":"P3/P4 Wave Repeater 3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":2.0,"Match":">31567)","MatchDelay":7.2}],"ElementsL":[{"Name":"3","refX":100.0,"refY":100.0,"radius":12.0,"Donut":6.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31567],"refActorUseCastTime":true,"refActorCastTimeMin":7.5,"refActorCastTimeMax":9.5,"refActorUseOvercast":true,"refActorComparisonType":6}]}
~Lv2~{"Name":"P3/P4 Wave Repeater 4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":2.0,"Match":">31567)","MatchDelay":9.2}],"ElementsL":[{"Name":"4","refX":100.0,"refY":100.0,"radius":18.0,"Donut":6.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31567],"refActorUseCastTime":true,"refActorCastTimeMin":9.5,"refActorCastTimeMax":11.5,"refActorUseOvercast":true,"refActorComparisonType":6}]}
~Lv2~{"Name":"P3 開幕 真心(リリド)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":12.0,"Match":"判定……ヒトの姿や行動を模倣することは、 戦闘能力の向上に、寄与しないと判断します……。"}],"ElementsL":[{"Name":"白1","refX":86.56497,"refY":86.56497,"radius":1.0,"color":3371826944,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371826944,"overlayFScale":1.3,"thicc":4.0,"overlayText":"1"},{"Name":"白2","refX":113.43503,"refY":86.56497,"radius":1.0,"color":3371826944,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371826944,"overlayFScale":1.3,"thicc":4.0,"overlayText":"2"},{"Name":"紫1","refX":81.0,"refY":100.0,"radius":1.0,"color":3372155112,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372155112,"overlayFScale":1.3,"thicc":4.0,"overlayText":"1"},{"Name":"紫2","refX":86.56497,"refY":113.43503,"radius":1.0,"color":3372155112,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372155112,"overlayFScale":1.3,"thicc":4.0,"overlayText":"2"},{"Name":"紫3","refX":113.43503,"refY":113.43503,"radius":1.0,"color":3372155112,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372155112,"overlayFScale":1.3,"thicc":4.0,"overlayText":"3"},{"Name":"紫4","refX":119.0,"refY":100.0,"radius":1.0,"color":3372155112,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372155112,"overlayFScale":1.3,"thicc":4.0,"overlayText":"4"},{"Name":"白1ライン","type":2,"refX":100.0,"refY":100.0,"offX":87.27208,"offY":87.27208,"radius":0.0,"color":3371826944,"fillIntensity":0.345,"thicc":4.0},{"Name":"白2ライン","type":2,"refX":100.0,"refY":100.0,"offX":112.72792,"offY":87.27208,"radius":0.0,"color":3371826944,"fillIntensity":0.345,"thicc":4.0},{"Name":"紫1ライン","type":2,"refX":100.0,"refY":100.0,"offX":82.0,"offY":100.0,"radius":0.0,"color":3372155112,"fillIntensity":0.345,"thicc":4.0},{"Name":"紫2ライン","type":2,"refX":100.0,"refY":100.0,"offX":87.27208,"offY":112.72792,"radius":0.0,"color":3372155112,"fillIntensity":0.345,"thicc":4.0},{"Name":"紫3ライン","type":2,"refX":100.0,"refY":100.0,"offX":112.72792,"offY":112.72792,"radius":0.0,"color":3372155112,"fillIntensity":0.345,"thicc":4.0},{"Name":"紫4ライン","type":2,"refX":100.0,"refY":100.0,"offX":118.0,"offY":100.0,"radius":0.0,"color":3372155112,"fillIntensity":0.345,"thicc":4.0}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が散開 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371237631,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"Spread","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"other NAME","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が頭割り NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372218624,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"Stack","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"other NAME","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が無職 <2>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<2> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<2>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<2> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<2>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<2>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<2>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が無職 <3>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<3> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<3>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<3> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<3>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<3>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<3>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が無職 <4>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<4> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<4>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<4> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<4>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<4>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<4>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が無職 <5>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<5> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<5>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<5> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<5>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<5>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<5>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が無職 <6>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<6> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<6>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<6> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<6>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<6>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<6>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が無職 <7>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<7> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<7>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<7> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<7>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<7>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<7>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 開幕デバフ 自分が無職 <8>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<8> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<8> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<8>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<8>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<8>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 Stack/spread debuffs","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122,990],"ElementsL":[{"Name":"stack late AOE","type":1,"radius":5.0,"Donut":0.5,"color":4294965504,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3426],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0},{"Name":"spread late AOE","type":1,"radius":5.5,"color":4294705407,"Filled":false,"fillIntensity":0.21568628,"thicc":4.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0}]}
~Lv2~{"Name":"P3 Hands explosion - 1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Freezing":true,"FreezeFor":13.5,"IntervalBetweenFreezes":20.0,"Triggers":[{"Type":2,"Duration":1.0,"MatchIntl":{"En":"Final analysis. Drastic overhaul of combat logic required.","Jp":"最終解析……戦略戦術ロジックを大幅に変更……","De":"Abschlussanalyse: Grundsätzlich neue Kampflogik erforderlich. Initiiere Rekonfigurationssequenz."}}],"ElementsL":[{"Name":"","type":1,"radius":11.0,"color":4278255103,"Filled":false,"fillIntensity":0.3,"thicc":4.0,"refActorNameIntl":{"En":" arm unit","Jp":"トアームユニット"},"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0}]}
~Lv2~{"Name":"P3 Hands explosion - 2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Freezing":true,"FreezeFor":5.0,"IntervalBetweenFreezes":5.0,"FreezeDisplayDelay":1.0,"Triggers":[{"Type":2,"Duration":1.0,"Match":">31566)","MatchDelay":0.5,"FireOnce":true}],"ElementsL":[{"Name":"","type":1,"radius":11.0,"color":4278255103,"Filled":false,"fillIntensity":0.3,"thicc":4.0,"refActorNameIntl":{"En":" arm unit","Jp":"トアームユニット","De":"Arm"},"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[31566],"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0}]}
~Lv2~{"Name":"P3 アームユニット","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"UseTriggers":true,"Triggers":[{"Type":2,"Duration":30.0,"MatchIntl":{"Jp":"最終解析……戦略戦術ロジックを大幅に変更……"}}],"ElementsL":[{"Name":"レフトアームユニット","type":1,"radius":11.0,"fillIntensity":0.2,"thicc":4.0,"refActorNPCNameID":7637,"refActorRequireCast":true,"refActorCastId":[31566],"refActorComparisonType":6,"onlyVisible":true},{"Name":"ライトアームユニット","type":1,"radius":11.0,"fillIntensity":0.2,"thicc":4.0,"refActorNPCNameID":7638,"refActorRequireCast":true,"refActorCastId":[31566],"refActorComparisonType":6,"onlyVisible":true}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：サークル_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：シェア_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：デグレート_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：パフォーマンス_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 Hello World highlights","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"Stack","type":1,"radius":6.0,"color":3355506687,"Filled":false,"fillIntensity":0.39215687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"onlyTargetable":true},{"Name":"Red rot","type":1,"radius":0.5,"Donut":0.6,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3526,3438],"refActorBuffTimeMax":10.0,"FillStep":0.2},{"Name":"Blue rot","type":1,"radius":0.5,"Donut":0.6,"color":4294901760,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3429,3439],"refActorBuffTimeMax":10.0,"FillStep":0.2},{"Name":"Defamation near","type":3,"refY":2.0,"offY":-2.0,"radius":0.0,"color":4294902015,"thicc":10.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"FillStep":0.2},{"Name":"Defamation near","type":3,"refX":2.0,"offX":-2.0,"radius":0.0,"color":4294902015,"thicc":10.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"FillStep":0.2},{"Name":"Defamation FAR","type":1,"radius":19.0,"Donut":1.0,"color":4294902015,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Red rot - almost exploding","type":1,"radius":5.0,"color":1342177535,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMax":3.0,"FillStep":0.2},{"Name":"Blue rot - almost exploding","type":1,"radius":5.0,"color":1358888960,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMax":3.0,"FillStep":0.2},{"Name":"Stack arrow L","type":3,"refX":1.0,"refY":-5.0,"offY":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow L","type":3,"refX":-1.0,"refY":-5.0,"offY":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow T","type":3,"refX":-5.0,"refY":1.0,"offX":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow T","type":3,"refX":-5.0,"refY":-1.0,"offX":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow R","type":3,"refX":1.0,"refY":5.0,"offY":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow R","type":3,"refX":-1.0,"refY":5.0,"offY":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow B","type":3,"refX":5.0,"refY":1.0,"offX":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow B","type":3,"refX":5.0,"refY":-1.0,"offX":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true}]}
~Lv2~{"Name":"P3 - 検知円範囲","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":4.7,"Match":">31595)","MatchDelay":5.0},{"Type":2,"Duration":4.7,"Match":">31596)","MatchDelay":5.0}],"ElementsL":[{"Name":"Self","type":1,"radius":7.0,"color":4278253567,"Filled":false,"fillIntensity":0.6857143,"thicc":4.0,"refActorPlaceholder":[],"refActorComparisonType":5,"refActorType":1},{"Name":"Others","type":1,"radius":7.0,"color":4278253567,"fillIntensity":0.3,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 検知式波動砲","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[4],"ElementsL":[{"Name":"Omega Right","type":4,"refX":10.0,"refY":20.0,"radius":20.0,"coneAngleMax":180,"color":2516647935,"fillIntensity":0.05,"thicc":16.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"FillStep":20.0},{"Name":"Omega Right Arrow -3","type":3,"refX":4.0,"refY":-15.0,"offY":-15.0,"radius":0.0,"color":3355508735,"Filled":false,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Right Arrow -2","type":3,"refX":4.0,"refY":-10.0,"offY":-10.0,"radius":0.0,"color":3355508735,"Filled":false,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Right Arrow -1","type":3,"refX":4.0,"refY":-5.0,"offY":-5.0,"radius":0.0,"color":3355508735,"Filled":false,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Right Arrow 0","type":3,"refX":4.0,"radius":0.0,"color":3355508735,"Filled":false,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Right Arrow 1","type":3,"refX":4.0,"refY":5.0,"offY":5.0,"radius":0.0,"color":3355508735,"Filled":false,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Right Arrow 2","type":3,"refX":4.0,"refY":10.0,"offY":10.0,"radius":0.0,"color":3355508735,"Filled":false,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Right Arrow 3","type":3,"refX":4.0,"refY":15.0,"offY":15.0,"radius":0.0,"color":3355508735,"Filled":false,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31595],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Left","type":4,"refX":-10.0,"refY":20.0,"radius":20.0,"coneAngleMin":180,"coneAngleMax":360,"color":3355508223,"fillIntensity":0.05,"thicc":16.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"FillStep":20.0},{"Name":"Omega Left Arrow -3","type":3,"refX":-4.0,"refY":-15.0,"offY":-15.0,"radius":0.0,"color":3355508223,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Left Arrow -2","type":3,"refX":-4.0,"refY":-10.0,"offY":-10.0,"radius":0.0,"color":3355508223,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Left Arrow -1","type":3,"refX":-4.0,"refY":-5.0,"offY":-5.0,"radius":0.0,"color":3355508223,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Left Arrow 0","type":3,"refX":-4.0,"radius":0.0,"color":3355508223,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Left Arrow 1","type":3,"refX":-4.0,"refY":5.0,"offY":5.0,"radius":0.0,"color":3355508223,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Left Arrow 2","type":3,"refX":-4.0,"refY":10.0,"offY":10.0,"radius":0.0,"color":3355508223,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Omega Left Arrow 3","type":3,"refX":-4.0,"refY":15.0,"offY":15.0,"radius":0.0,"color":3355508223,"fillIntensity":0.1,"thicc":12.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31596],"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"LineEndA":1,"FillStep":20.0},{"Name":"Self left","type":4,"refX":-4.0,"refY":15.0,"radius":4.0,"coneAngleMax":180,"color":3372155135,"fillIntensity":0.2,"overlayBGColor":3355443200,"overlayFScale":3.0,"thicc":4.0,"overlayText":"←","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3453],"refActorComparisonType":5,"refActorType":1,"includeRotation":true,"AdditionalRotation":3.1415927,"FillStep":2.0},{"Name":"Self right","type":4,"radius":4.0,"coneAngleMax":180,"color":3372155135,"fillIntensity":0.2,"overlayBGColor":3355443200,"overlayFScale":3.0,"thicc":4.0,"overlayText":"→","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3452],"refActorComparisonType":5,"refActorType":1,"includeRotation":true,"FillStep":2.0}]}
~Lv2~{"Name":"P3 検知 [十字式] - 初期散開","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"9cb05546-ba5e-4a9b-805c-f64dd4f7fef1","Name":"MT","Elements":[{"Name":"MT","refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]},{"Guid":"9d73e5e4-606e-4be0-afbe-cd2937994f47","Name":"ST","Elements":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]},{"Guid":"a5716fc5-3a49-4a78-aff7-99ebbd15bb46","Name":"H1","Elements":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]},{"Guid":"8f2847d9-99d2-40a9-90a6-061dd5632574","Name":"H2","Elements":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]},{"Guid":"6d9ee461-b0ed-482c-a130-f3696142123a","Name":"D1","Elements":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]},{"Guid":"970b7466-0cdb-4fab-8617-8ed26353f3e3","Name":"D2","Elements":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]},{"Guid":"1995f2af-9160-48d6-8350-08ce1f2b6661","Name":"D3","Elements":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]},{"Guid":"282fadc0-18de-45f7-b070-4f1735528a32","Name":"D4","Elements":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":12.0,"Match":"(7636>31588)","MatchDelay":8.0}],"ElementsL":[{"Name":"MT","Enabled":false,"refX":104.5,"refY":92.20577,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":107.79423,"refY":95.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST"},{"Name":"H1","Enabled":false,"refX":107.45649,"refY":89.35102,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1"},{"Name":"H2","Enabled":false,"refX":110.64898,"refY":92.54351,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2"},{"Name":"D1","Enabled":false,"refX":92.20577,"refY":104.5,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1"},{"Name":"D2","Enabled":false,"refX":95.5,"refY":107.79423,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2"},{"Name":"D3","Enabled":false,"refX":89.35102,"refY":107.45649,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3"},{"Name":"D4","Enabled":false,"refX":92.54351,"refY":110.64898,"radius":1.0,"color":3355508527,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4"}]}
~Lv2~{"Name":"P3 検知式波動砲_CD10","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(7636>31595)"},{"Type":2,"Duration":0.7,"Match":"(7636>31596)"}],"ElementsL":[{"Name":"10","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"10","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":0.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":0.7}],"ElementsL":[{"Name":"9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"9","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":1.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":1.7}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":2.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":2.7}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":3.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":3.7}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":4.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":4.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":5.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":5.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":6.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":6.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(7636>31595)","MatchDelay":7.7},{"Type":2,"Duration":1.0,"Match":"(7636>31596)","MatchDelay":7.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":8.7},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":8.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":8.8},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":8.8}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":8.9},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":8.9}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":9.0},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":9.0}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":9.1},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":9.1}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":9.2},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":9.2}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":9.3},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":9.3}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":9.4},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":9.4}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":9.5},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":9.5}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"P3 検知式波動砲_CD0.1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(7636>31595)","MatchDelay":9.6},{"Type":2,"Duration":0.1,"Match":"(7636>31596)","MatchDelay":9.6}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"P4 Wave Cannon","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"Snapshot","type":3,"refY":20.0,"radius":3.0,"color":4294966272,"fillIntensity":0.2,"thicc":4.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31616],"refActorComparisonType":6,"includeRotation":true},{"Name":"Target you (1st)","type":3,"refY":20.0,"radius":3.0,"color":4278190335,"Filled":false,"fillIntensity":0.1,"thicc":4.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31617],"refActorComparisonType":6,"includeRotation":true,"FaceMe":true}]}
~Lv2~{"Name":"P4 散開位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"9a36cdcc-b797-4806-8cbf-775a17887837","Name":"MT","Elements":[{"Name":"MT","refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]},{"Guid":"9eba3fcb-1abe-412a-a44d-3051e95335ba","Name":"ST","Elements":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]},{"Guid":"5db20793-5757-4219-b1a7-09946bfb5d00","Name":"H1","Elements":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]},{"Guid":"3551b08c-a0d8-41bc-b148-f0f2e20fe4cd","Name":"H2","Elements":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]},{"Guid":"8f79c77a-be68-4d76-ab16-b95e8fcd2b99","Name":"D1","Elements":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]},{"Guid":"36410343-9dc3-48b6-836b-a797642f6966","Name":"D2","Elements":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]},{"Guid":"f6de69b3-e746-4491-9964-dace56f73082","Name":"D3","Elements":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]},{"Guid":"4c609a76-975d-4395-abf3-f17f06089bb5","Name":"D4","Elements":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":51.0,"Match":"ガガ……ガガガガ……深刻なダメージを検知…… システム……シャットダウン……。"}],"ElementsL":[{"Name":"MT","Enabled":false,"refX":87.06569,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"D3","Enabled":false,"refX":86.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"H1","Enabled":false,"refX":87.06569,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"D1","Enabled":false,"refX":90.10051,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"ST","Enabled":false,"refX":112.93431,"refY":94.64243,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"D4","Enabled":false,"refX":114.0,"refY":100.0,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true},{"Name":"H2","Enabled":false,"refX":112.93431,"refY":105.35757,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D2","Enabled":false,"refX":109.89949,"refY":109.89949,"radius":1.0,"color":3358850816,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true}]}
~Lv2~{"Name":"P5 デルタ 目玉ビーム","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":">31624)","MatchDelay":8.0}],"ElementsL":[{"Name":"","type":3,"refY":35.0,"offY":65.0,"radius":8.0,"color":4294966272,"fillIntensity":0.5,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":3,"offY":35.0,"radius":8.0,"color":4278190335,"fillIntensity":0.5,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Name":"P5 デルタ 青線(ファー) 立ち位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":">31624)","MatchDelay":8.0}],"ElementsL":[{"Name":"Outer","type":3,"refX":3.0,"refY":9.0,"offX":-3.0,"offY":9.0,"radius":0.0,"color":3372154880,"thicc":5.0,"refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true},{"Name":"Inner","type":3,"refX":7.0,"refY":11.0,"offX":-7.0,"offY":11.0,"radius":0.0,"color":3372154880,"thicc":5.0,"refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true},{"Name":"Swapper","type":1,"Enabled":false,"offY":11.0,"radius":0.0,"color":3372154880,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"thicc":0.0,"overlayText":"Swappers + go mid","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true}]}
~Lv2~{"Name":"P5 デルタ 緑線(ニアー) 立ち位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":">31624)","MatchDelay":8.0}],"ElementsL":[{"Name":"Outer","type":3,"refX":10.0,"refY":9.0,"offX":-10.0,"offY":9.0,"radius":0.0,"color":3355508480,"thicc":5.0,"refActorModelID":3775,"refActorComparisonType":1,"includeRotation":true},{"Name":"Inner","type":3,"refX":10.0,"refY":11.0,"offX":-10.0,"offY":11.0,"radius":0.0,"color":3355508480,"thicc":5.0,"refActorModelID":3775,"refActorComparisonType":1,"includeRotation":true},{"Name":"Swapper","type":1,"Enabled":false,"offY":11.0,"radius":0.0,"color":3372154880,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"thicc":0.0,"overlayText":"Swappers","refActorModelID":3775,"refActorComparisonType":1,"includeRotation":true}]}
```
