+++
title = '絶オメガ検証戦'
date = 2026-04-19T15:51:01+09:00
draft = false
description = "絶オメガ検証戦のSplatoonレイアウト"
categories = ["FFXIV"]
tags = ["FFXIV","Splatoon","TOP","絶オメガ","絶"]
series = ["FFXIV Splatoon Presets"]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = true
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = true
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = false
+++

> [!WARNING] 注意：製作中のプリセット
> このPresetは**製作中**です。  
> 今後しばらくは問題のある更新やその修正を含め、細かく更新されます。  
> 
> 最終フェーズまでの暫定版は完成しました。  
> **実戦による調整は全てのフェーズで未完了**です。

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

{{< linkcard
  url="https://jp.finalfantasyxiv.com/lodestone/character/34120564/blog/5178791/"
  title="◆絶オメガマクロ◆カンペ付き"
  desc="リリド 絶オメガマクロ"
  meta="Related"
/>}}

{{< linkcard
  url="https://www.youtube.com/watch?v=3E6KprobQuo"
  title="【十字式】絶オメガ検証戦　P3 検知式波動砲 ｰパターン集ｰ"
  desc="検知式波動砲 十字式"
  meta="Related"
/>}}

### 他の攻略法で処理を行う場合

**基本リリド 検知十字式で処理する場合は、この項目を無視して問題ありません。**  
すべてリリド（検知Ast式）で処理する場合は、以下のように導入してください。  

> [!TIP] 検知Ast式
> 
> - Script  
>   - P3 検知式波動砲 (十字式)  
>     **導入しない**
>   - P3 検知式波動砲（Ast式）  
>     公式のリポジトリから導入
> - レイアウト
>   - P3 検知 [十字式] - 初期散開
>     `Configurations` を `Default Configuration` に設定

#### P3 検知式波動砲（Ast式）のスクリプト

公式のスクリプト

```url
https://github.com/PunishXIV/Splatoon/raw/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/Oversampled%20Wave%20Cannon.cs
```

#### P3 検知式波動砲(Ast式)のスクリプトの設定

検知式波動砲(Ast)のスクリプト設定はMirage様の絶オメガまとめが参考になると思います。  

{{< linkcard
  url="https://exatrines.github.io/SplatoonWorkspace/Endwalker/TOP/Presets/P3_Final_Omega/#p3_3"
  title="検知式波砲(Ast式)設定"
  desc="検知式波動砲(Ast) スクリプト設定"
  meta="Related"
/>}}

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

**TOP P1 Program Loop Priority With Self Priority**  

公式の「サークルプログラム」スクリプトをベースに、自身が担当するテザーについても、優先度設定に基づいて太く表示されるよう調整しています。  
役割がない時の誘導ガイドも追加しています。  
また、各種表示も視認性向上のために変更しています。  

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using Dalamud.Interface.Colors;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.Hooks;
using ECommons.ImGuiMethods;
using ECommons.MathHelpers;
using ECommons.Schedulers;
using Dalamud.Bindings.ImGui;
using Splatoon.SplatoonScripting;
using Splatoon.SplatoonScripting.Priority;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Numerics;

using ECommons.DalamudServices.Legacy;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

public unsafe class TOP_P1_Program_Loop_Priority_With_Self_Priority : SplatoonScript
{
    private const uint ProgramLoopCast = 31491;
    private const uint PantokratorCast = 31501;
    private const uint PantokratorFlameThrowerCast = 32368;
    private const uint PantokratorStatus1 = 0xBBC;
    private const uint PantokratorStatus2 = 0xBBD;
    private const uint PantokratorStatus3 = 0xBBE;
    private const uint PantokratorStatus4 = 0xD7B;

    public override HashSet<uint> ValidTerritories => [1122];
    public override Metadata Metadata => new(19, "NightmareXIV, damolitionn, kudry");
    private Config Conf => Controller.GetConfig<Config>();
    private HashSet<uint> TetheredPlayers = [];
    private List<uint> Towers = [];
    private List<uint> TowerOrder = [];
    private List<uint> TetherOrder = [];
    private string NewPlayer = "";
    private uint myTether = 0;
    private DateTime programLoopPriorityDisplayUntil = DateTime.MinValue;

    public override void OnSetup()
    {
        SetupElements();
    }

    private void SetupElements()
    {
        Controller.Clear();
        Controller.RegisterElement("dbg1", new(1) { Enabled = false, refActorComparisonType = 2, overlayVOffset = 1, radius = 3f, color = Conf.TowerColor1.ToUint() });
        Controller.RegisterElement("dbg2", new(1) { Enabled = false, refActorComparisonType = 2, overlayVOffset = 1, radius = 3f, color = Conf.TowerColor1.ToUint() });
        Controller.RegisterElementFromCode("TetherAOE1", "{\"Name\":\"\",\"type\":1,\"Enabled\":false,\"radius\":14.0,\"Donut\":1.0,\"color\":3372155125,\"fillIntensity\":0.6857143,\"thicc\":4.0,\"refActorObjectID\":268635045,\"refActorComparisonType\":2,\"onlyTargetable\":true}");
        Controller.RegisterElementFromCode("TetherAOE2", "{\"Name\":\"\",\"type\":1,\"Enabled\":false,\"radius\":14.0,\"Donut\":1.0,\"color\":3372155125,\"fillIntensity\":0.6857143,\"thicc\":4.0,\"refActorObjectID\":268635045,\"refActorComparisonType\":2,\"onlyTargetable\":true}");
        Controller.RegisterElement("Tether1", new(2) { thicc = 5f, radius = 0f });
        Controller.RegisterElement("Tether2", new(2) { thicc = 5f, radius = 0f });
        Controller.RegisterElement("SelfTetherReminder", new(1) { Enabled = false, refActorType = 1, radius = 0, overlayVOffset = 2f, overlayTextColor = ImGuiColors.DalamudWhite.ToUint() });
        Controller.RegisterElement("SelfTower", new(1) { Enabled = false, refActorComparisonType = 2, radius = 3f, thicc = 7f, Filled = false, fillIntensity = 0f, overlayText = "Take tower", overlayTextColor = 0xFF000000, tether = true, overlayBGColor = ImGuiColors.ParsedPink.ToUint() });
        Controller.RegisterElementFromCode("SelfPairPriority", "{\"Enabled\":false,\"Name\":\"\",\"refX\":100.0,\"refY\":100.0,\"radius\":0.0,\"overlayBGColor\":3355443200,\"overlayTextColor\":3355508527,\"overlayVOffset\":2.0,\"overlayFScale\":3.0,\"thicc\":1.0,\"overlayText\":\"Priority 2\"}");
        Controller.TryRegisterLayoutFromCode("Proximity", "~Lv2~{\"Enabled\":false,\"Name\":\"Proximity\",\"Group\":\"\",\"ZoneLockH\":[1122],\"ElementsL\":[{\"Name\":\"\",\"type\":1,\"radius\":0.0,\"color\":4278129920,\"thicc\":4.0,\"refActorPlaceholder\":[\"<2>\",\"<3>\",\"<4>\",\"<5>\",\"<6>\",\"<7>\",\"<8>\"],\"refActorComparisonType\":5,\"tether\":true}],\"MaxDistance\":15.2,\"UseDistanceLimit\":true,\"DistanceLimitType\":1}", out _);
        Controller.RegisterElementFromCode("SafeNorth", "{\"Enabled\":false,\"Name\":\"\",\"refX\":100.0,\"refY\":84.0,\"radius\":4.0,\"color\":4278190080,\"Filled\":false,\"fillIntensity\":0.0,\"thicc\":5.0}");
        Controller.RegisterElementFromCode("SafeSouth", "{\"Enabled\":false,\"Name\":\"\",\"refX\":100.0,\"refY\":116.0,\"radius\":4.0,\"color\":4278190080,\"Filled\":false,\"fillIntensity\":0.0,\"thicc\":5.0}");
        Controller.RegisterElementFromCode("SafeWest", "{\"Enabled\":false,\"Name\":\"\",\"refX\":84.0,\"refY\":100.0,\"radius\":4.0,\"color\":4278190080,\"Filled\":false,\"fillIntensity\":0.0,\"thicc\":5.0}");
        Controller.RegisterElementFromCode("SafeEast", "{\"Enabled\":false,\"Name\":\"\",\"refX\":116.0,\"refY\":100.0,\"radius\":4.0,\"color\":4278190080,\"Filled\":false,\"fillIntensity\":0.0,\"thicc\":5.0}");
        Controller.RegisterElementFromCode("NonRoleSafeSpot", "{\"Name\":\"\",\"type\":0,\"Enabled\":false,\"refX\":100.0,\"refY\":100.0,\"radius\":0.8,\"color\":4278255360,\"Filled\":false,\"fillIntensity\":0.0,\"thicc\":8.0,\"tether\":true}");
    }

    public override void OnUpdate()
    {
        if (TetherOrder.Count == 8)
        {
            UpdateTethers();
        }
        UpdateSelfPairPriority();
    }

    public override void OnTetherCreate(uint source, uint target, uint data2, uint data3, uint data5)
    {
        if (IsOmega(target, out _))
        {
            TetheredPlayers.Add(source);
            //UpdateTethers();
        }
    }

    public override void OnTetherRemoval(uint source, uint data2, uint data3, uint data5)
    {
        TetheredPlayers.Remove(source);
        //UpdateTethers();
    }

    private void UpdateTethers()
    {
        var tetheredPlayers = TetheredPlayers.ToArray();
        if (Controller.Scene == 2 && tetheredPlayers.Length >= 2)
        {
            var omega = GetOmega();
            if (Conf.Debug && Conf.Towers != TowerStartPoint.Disable_towers)
            {
                var cTowers = Towers.TakeLast(2).ToArray();
                if (cTowers.Length == 2)
                {
                    {
                        if (Controller.TryGetElementByName("dbg1", out var e))
                        {
                            e.Enabled = true;
                            e.refActorObjectID = cTowers[0];
                            e.overlayText = Conf.Debug ? $"{GetTowerAngle(cTowers[0].GetObject().Position.ToVector2())}" : "";
                        }
                    }
                    {
                        if (Controller.TryGetElementByName("dbg2", out var e))
                        {
                            e.Enabled = true;
                            e.refActorObjectID = cTowers[1];
                            e.overlayText = Conf.Debug ? $"{GetTowerAngle(cTowers[1].GetObject().Position.ToVector2())}" : "";
                        }
                    }
                }
            }

            {
                if (Controller.TryGetElementByName("SelfTetherReminder", out var e))
                {
                    if (IsTakingCurrentTether(Svc.ClientState.LocalPlayer.EntityId))
                    {
                        e.Enabled = true;
                        myTether = 0;

                        if (Conf.DisplayTetherSafeSpots)
                        {
                            SwitchTetherSafeSpots(true);
                            var currentTowers = GetCurrentTowers();
                            if (currentTowers.Length == 2)
                            {
                                { if (Controller.TryGetElementByName($"Safe{MathHelper.GetCardinalDirection(new(100, 100), currentTowers[0].GetObject().Position.ToVector2())}", out var s)) { s.Enabled = false; } }
                                { if (Controller.TryGetElementByName($"Safe{MathHelper.GetCardinalDirection(new(100, 100), currentTowers[1].GetObject().Position.ToVector2())}", out var s)) { s.Enabled = false; } }
                            }
                        }
                        else
                        {
                            SwitchTetherSafeSpots(false);
                        }

                        if (tetheredPlayers.Contains(Svc.ClientState.LocalPlayer.EntityId))
                        {
                            e.overlayBGColor = Conf.ValidTetherColor.ToUint();
                            e.overlayTextColor = Conf.OverlayTextColor.ToUint();
                            e.overlayFScale = 1;
                            e.overlayText = "Tether";
                            if (Conf.UseProximity && Controller.TryGetLayoutByName("Proximity", out var l))
                            {
                                l.ElementsL[0].color = Conf.ProximityColor.ToUint();
                                l.Enabled = true;
                            }

                            if (Conf.DisplayTetherSafeSpots && Conf.TetherSafeSpotEnableDetect)
                            {
                                var SafeSpots = Enum.GetValues<CardinalDirection>().Select(x => Controller.GetElementByName($"Safe{x}")).Where(x => x != null && x.Enabled).OrderBy(x => GetTowerAngle(new Vector2(x.refX, x.refY))).ToArray();

                                if (SafeSpots.Length == 2)
                                {
                                    var pair = GetPairNumber(TowerOrder, GetTetherMechanicStep());
                                    if (pair.Count() == 2)
                                    {
                                        var players = Conf.PriorityData.GetPlayers(player => pair.Any(pairMember => pairMember == player.IGameObject.EntityId));

                                        if (players == null) return;

                                        if (players[0].IGameObject.EntityId == Svc.ClientState.LocalPlayer.EntityId)
                                        {
                                            SafeSpots[0].tether = true;
                                        }
                                        else
                                        {
                                            SafeSpots[1].tether = true;
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            e.overlayBGColor = GradientColor.Get(Conf.InvalidTetherColor1, Conf.InvalidTetherColor2, 500).ToUint();
                            e.overlayTextColor = Conf.OverlayTextColor.ToUint();
                            e.overlayFScale = Conf.InvalidOverlayScale;
                            e.overlayText = "!!! PICK UP TETHER !!!";
                            if (Conf.EnlargeMyTether)
                            {
                                myTether = GetMyTetherToPick(tetheredPlayers);
                            }
                        }
                    }
                    else
                    {
                        myTether = 0;
                        if (Controller.TryGetLayoutByName("Proximity", out var l))
                        {
                            l.Enabled = false;
                        }
                        e.Enabled = false;
                        SwitchTetherSafeSpots(false);
                    }
                }
            }
            {
                if (Controller.TryGetElementByName("TetherAOE1", out var e))
                {
                    e.Enabled = IsTakingCurrentTether(tetheredPlayers[0]) || tetheredPlayers[0] == myTether || Conf.ShowAOEAlways;
                    e.refActorObjectID = tetheredPlayers[0];
                    e.radius = 14f;
                    e.Donut = 1f;
                    e.color = Conf.TetherAOECol.ToUint();
                    e.fillIntensity = 0.6857143f;
                    e.thicc = 4f;
                }
            }
            {
                if (Controller.TryGetElementByName("Tether1", out var e))
                {
                    e.Enabled = true;
                    e.SetRefPosition(omega.Position);
                    e.SetOffPosition(tetheredPlayers[0].GetObject().Position);
                    e.thicc = tetheredPlayers[0] == myTether ? 12f : 5f;
                    e.overlayText = tetheredPlayers[0] == myTether ? "Pick this tether" : "";
                    e.color = (IsTakingCurrentTether(tetheredPlayers[0]) ? Conf.ValidTetherColor : GradientColor.Get(Conf.InvalidTetherColor1, Conf.InvalidTetherColor2, 500)).ToUint();
                }
            }
            {
                if (Controller.TryGetElementByName("TetherAOE2", out var e))
                {
                    e.Enabled = IsTakingCurrentTether(tetheredPlayers[1]) || tetheredPlayers[1] == myTether || Conf.ShowAOEAlways;
                    e.refActorObjectID = tetheredPlayers[1];
                    e.radius = 14f;
                    e.Donut = 1f;
                    e.color = Conf.TetherAOECol.ToUint();
                    e.fillIntensity = 0.6857143f;
                    e.thicc = 4f;
                }
            }
            {
                if (Controller.TryGetElementByName("Tether2", out var e))
                {
                    e.Enabled = true;
                    e.SetRefPosition(omega.Position);
                    e.SetOffPosition(tetheredPlayers[1].GetObject().Position);
                    e.thicc = tetheredPlayers[1] == myTether ? 12f : 5f;
                    e.overlayText = tetheredPlayers[1] == myTether ? "Pick this tether" : "";
                    e.color = (IsTakingCurrentTether(tetheredPlayers[1]) ? Conf.ValidTetherColor : GradientColor.Get(Conf.InvalidTetherColor1, Conf.InvalidTetherColor2, 500)).ToUint();
                }
            }
            {
                if (Conf.Towers != TowerStartPoint.Disable_towers && Controller.TryGetElementByName("SelfTower", out var e))
                {
                    if (IsTakingCurrentTower(Svc.ClientState.LocalPlayer.EntityId))
                    {
                        e.Enabled = true;
                        e.color = GradientColor.Get(Conf.TowerColor1, Conf.TowerColor2).ToUint();
                        e.Filled = false;
                        e.fillIntensity = 0f;
                        e.overlayBGColor = e.color;
                        e.overlayTextColor = Conf.OverlayTextColor.ToUint();
                        var currentTowers = GetCurrentTowers();
                        if (currentTowers.Length == 2)
                        {
                            var players = Conf.PriorityData.GetPlayers(player => IsTakingCurrentTower(player.IGameObject.EntityId));

                            if (players == null) return;

                            if (players[0].IGameObject.EntityId == Svc.ClientState.LocalPlayer.EntityId)
                            {
                                e.refActorObjectID = currentTowers[0];

                            }
                            else
                            {
                                e.refActorObjectID = currentTowers[1];

                            }
                        }
                    }
                    else
                    {
                        e.Enabled = false;
                    }
                }
            }
            UpdateNonRoleSafeSpot();
        }
        else
        {
            Controller.GetElementByName("TetherAOE1").Enabled = false;
            Controller.GetElementByName("TetherAOE2").Enabled = false;
            Controller.GetElementByName("Tether1").Enabled = false;
            Controller.GetElementByName("Tether2").Enabled = false;
            Controller.GetElementByName("SelfTetherReminder").Enabled = false;
            Controller.GetElementByName("SelfPairPriority").Enabled = false;
            Controller.GetElementByName("dbg1").Enabled = false;
            Controller.GetElementByName("dbg2").Enabled = false;
            Controller.GetElementByName("NonRoleSafeSpot").Enabled = false;
            if (Controller.TryGetLayoutByName("Proximity", out var l)) { l.Enabled = false; }
            SwitchTetherSafeSpots(false);
        }
    }

    private void UpdateNonRoleSafeSpot()
    {
        if (!Controller.TryGetElementByName("NonRoleSafeSpot", out var e))
        {
            return;
        }

        var localPlayer = Svc.ClientState.LocalPlayer;
        if (localPlayer == null
            || Conf.Towers == TowerStartPoint.Disable_towers
            || IsTakingCurrentTether(localPlayer.EntityId)
            || IsTakingCurrentTower(localPlayer.EntityId))
        {
            e.Enabled = false;
            return;
        }

        var currentTowers = GetCurrentTowers();
        if (currentTowers.Length != 2)
        {
            e.Enabled = false;
            return;
        }

        var candidates = GetNonRoleSafeSpotCandidates(currentTowers);
        if (candidates.Length == 0)
        {
            e.Enabled = false;
            return;
        }

        var currentPosition = localPlayer.Position.ToVector2();
        var safeSpot = candidates.OrderBy(candidate => Vector2.DistanceSquared(currentPosition, candidate)).First();
        e.Enabled = true;
        e.refX = safeSpot.X;
        e.refY = safeSpot.Y;
        e.radius = 0.8f;
        e.color = 0xFF00FF00;
        e.thicc = 8f;
        e.Filled = false;
        e.fillIntensity = 0f;
        e.tether = true;
    }

    private Vector2[] GetNonRoleSafeSpotCandidates(uint[] currentTowers)
    {
        var directions = currentTowers
            .Select(tower => MathHelper.GetCardinalDirection(new(100, 100), tower.GetObject().Position.ToVector2()))
            .Distinct()
            .ToArray();

        if (directions.Length != 2)
        {
            return [];
        }

        var first = directions[0];
        var second = directions[1];

        if (AreOpposite(first, second))
        {
            return directions.Select(GetTowerSideSafeSpot).ToArray();
        }

        return [GetBetweenTowersSafeSpot(first, second)];
    }

    private static bool AreOpposite(CardinalDirection first, CardinalDirection second)
    {
        return (first == CardinalDirection.North && second == CardinalDirection.South)
            || (first == CardinalDirection.South && second == CardinalDirection.North)
            || (first == CardinalDirection.East && second == CardinalDirection.West)
            || (first == CardinalDirection.West && second == CardinalDirection.East);
    }

    private static Vector2 GetTowerSideSafeSpot(CardinalDirection direction)
    {
        return direction switch
        {
            CardinalDirection.North => new(100f, 91f),
            CardinalDirection.East => new(109f, 100f),
            CardinalDirection.South => new(100f, 109f),
            CardinalDirection.West => new(91f, 100f),
            _ => new(100f, 100f),
        };
    }

    private static Vector2 GetBetweenTowersSafeSpot(CardinalDirection first, CardinalDirection second)
    {
        if (HasDirections(first, second, CardinalDirection.North, CardinalDirection.East)) return new(107.071f, 92.928f);
        if (HasDirections(first, second, CardinalDirection.East, CardinalDirection.South)) return new(107.071f, 107.071f);
        if (HasDirections(first, second, CardinalDirection.South, CardinalDirection.West)) return new(92.928f, 107.071f);
        if (HasDirections(first, second, CardinalDirection.West, CardinalDirection.North)) return new(92.928f, 92.928f);
        return new(100f, 100f);
    }

    private static bool HasDirections(CardinalDirection first, CardinalDirection second, CardinalDirection expectedFirst, CardinalDirection expectedSecond)
    {
        return (first == expectedFirst && second == expectedSecond)
            || (first == expectedSecond && second == expectedFirst);
    }

    private void SwitchTetherSafeSpots(bool enabled)
    {
        {
            if (Controller.TryGetElementByName("SafeNorth", out var e))
            {
                e.Enabled = enabled;
                e.tether = false;
                e.Filled = false;
                e.fillIntensity = 0f;
                if (enabled) e.color = Conf.TetherSafeSpotColor.ToUint();
            }
        }
        {
            if (Controller.TryGetElementByName("SafeSouth", out var e))
            {
                e.Enabled = enabled;
                e.tether = false;
                e.Filled = false;
                e.fillIntensity = 0f;
                if (enabled) e.color = Conf.TetherSafeSpotColor.ToUint();
            }
        }
        {
            if (Controller.TryGetElementByName("SafeWest", out var e))
            {
                e.Enabled = enabled;
                e.tether = false;
                e.Filled = false;
                e.fillIntensity = 0f;
                if (enabled) e.color = Conf.TetherSafeSpotColor.ToUint();
            }
        }
        {
            if (Controller.TryGetElementByName("SafeEast", out var e))
            {
                e.Enabled = enabled;
                e.tether = false;
                e.Filled = false;
                e.fillIntensity = 0f;
                if (enabled) e.color = Conf.TetherSafeSpotColor.ToUint();
            }
        }
    }

    private uint[] GetCurrentTowers()
    {
        return GetPairNumber(Towers, GetCurrentMechanicStep()).OrderBy(x => GetTowerAngle(x.GetObject().Position.ToVector2())).ToArray();
    }

    private uint GetMyTetherToPick(uint[] tetheredPlayers)
    {
        var localPlayer = Svc.ClientState.LocalPlayer;
        if (localPlayer == null || tetheredPlayers.Contains(localPlayer.EntityId))
        {
            return 0;
        }

        var pair = GetPairNumber(TowerOrder, GetTetherMechanicStep()).ToArray();
        if (pair.Length != 2 || !pair.Contains(localPlayer.EntityId))
        {
            return 0;
        }

        var incorrectTethers = tetheredPlayers.Where(player => !pair.Contains(player)).ToArray();
        if (incorrectTethers.Length == 1)
        {
            return incorrectTethers[0];
        }

        if (incorrectTethers.Length != 2)
        {
            return 0;
        }

        var players = Conf.PriorityData.GetPlayers(player => pair.Any(pairMember => pairMember == player.IGameObject.EntityId))?.ToArray();
        if (players == null || players.Length != 2)
        {
            return 0;
        }

        var orderedTethers = OrderTethersByConfiguredAngle(incorrectTethers);
        var priorityIndex = players[0].IGameObject.EntityId == localPlayer.EntityId ? 0 : 1;
        return orderedTethers.Length > priorityIndex ? orderedTethers[priorityIndex] : 0;
    }

    private uint[] OrderTethersByConfiguredAngle(uint[] tetheredPlayers)
    {
        return tetheredPlayers
            .OrderBy(player => GetTowerAngle(player.GetObject().Position.ToVector2()))
            .ToArray();
    }

    private float GetTowerAngle(Vector2 x)
    {
        var firstTower =
            Conf.Towers == TowerStartPoint.Start_NorthEast ? 45 :
            Conf.Towers == TowerStartPoint.Start_SouthEast ? 45 + 90 :
            Conf.Towers == TowerStartPoint.Start_SouthWest ? 45 + 90 * 2 :
            Conf.Towers == TowerStartPoint.Start_NorthWest ? 45 + 90 * 3 : throw new Exception("There is a problem in GetTowerAngle function");
        return (MathHelper.GetRelativeAngle(new(100f, 100f), x) + 360 - firstTower) % 360;
    }

    private bool IsTakingCurrentTether(uint p)
    {
        var step = GetCurrentMechanicStep();
        return GetPairNumber(TetherOrder, step).Contains(p);
    }

    private bool IsTakingCurrentTower(uint p)
    {
        var step = GetCurrentMechanicStep();
        return GetPairNumber(TowerOrder, step).Contains(p);
    }

    public override void OnObjectCreation(nint newObjectPtr)
    {
        new TickScheduler(delegate
        {
            var obj = Svc.Objects.FirstOrDefault(x => x.Address == newObjectPtr);
            if (obj != null)
            {
                if (obj.ObjectKind == Dalamud.Game.ClientState.Objects.Enums.ObjectKind.EventObj)
                {
                    //PluginLog.Information($"Event obj spawn: {obj} {obj.DataId}");
                }
                if (obj.DataId == 2013244 && GetOmega() != null)
                {
                    Towers.Add(obj.EntityId);
                    if (TowerOrder.Count == 0)
                    {
                        GetPlayersWithNumber(1).Each(x => TowerOrder.Add(x.EntityId));
                        GetPlayersWithNumber(2).Each(x => TowerOrder.Add(x.EntityId));
                        GetPlayersWithNumber(3).Each(x => TowerOrder.Add(x.EntityId));
                        GetPlayersWithNumber(4).Each(x => TowerOrder.Add(x.EntityId));
                        GetPlayersWithNumber(3).Each(x => TetherOrder.Add(x.EntityId));
                        GetPlayersWithNumber(4).Each(x => TetherOrder.Add(x.EntityId));
                        GetPlayersWithNumber(1).Each(x => TetherOrder.Add(x.EntityId));
                        GetPlayersWithNumber(2).Each(x => TetherOrder.Add(x.EntityId));
                    }
                }
            }
        });
    }

    public override void OnMessage(string Message)
    {
        if (Message.Contains($"{ProgramLoopCast} (7695>{ProgramLoopCast})")) //starts casting program loop
        {
            Reset();
            programLoopPriorityDisplayUntil = DateTime.Now.AddSeconds(40);
        }
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if (castId == PantokratorCast || castId == PantokratorFlameThrowerCast)
        {
            programLoopPriorityDisplayUntil = DateTime.MinValue;
            if (Controller.TryGetElementByName("SelfPairPriority", out var e))
            {
                e.Enabled = false;
            }
        }
    }

    public override void OnDirectorUpdate(DirectorUpdateCategory category)
    {
        if (category.EqualsAny(DirectorUpdateCategory.Commence, DirectorUpdateCategory.Recommence, DirectorUpdateCategory.Wipe))
        {
            Reset();
        }
    }

    private void Reset()
    {
        programLoopPriorityDisplayUntil = DateTime.MinValue;
        TetheredPlayers.Clear();
        UpdateTethers();
        Controller.GetElementByName("SelfPairPriority").Enabled = false;
        Towers.Clear();
        TowerOrder.Clear();
        TetherOrder.Clear();
    }

    private int GetCurrentMechanicStep()
    {
        if (GetPlayersWithNumber(1).Any()) return 1;
        if (GetPlayersWithNumber(2).Any()) return 2;
        if (GetPlayersWithNumber(3).Any()) return 3;
        if (GetPlayersWithNumber(4).Any()) return 4;
        return 0;
    }

    private int GetTetherMechanicStep()
    {
        if (GetPlayersWithNumber(1).Any()) return 3;
        if (GetPlayersWithNumber(2).Any()) return 4;
        if (GetPlayersWithNumber(3).Any()) return 1;
        if (GetPlayersWithNumber(4).Any()) return 2;
        return 0;
    }

    private IEnumerable<IPlayerCharacter> GetPlayersWithNumber(int n)
    {
        var debuff = GetDebuffByNumber(n);
        foreach (var x in Svc.Objects)
        {
            if (x is IPlayerCharacter p && p.StatusList.Any(z => z.StatusId == debuff))
            {
                yield return (IPlayerCharacter)x;
            }
        }
    }

    private int GetDebuffByNumber(int n)
    {
        if (n == 1) return 3004;
        if (n == 2) return 3005;
        if (n == 3) return 3006;
        if (n == 4) return 3451;
        throw new Exception($"Invalid GetDebuffByNumber query {n}");
    }

    private IBattleChara? GetOmega()
    {
        return Svc.Objects.FirstOrDefault(x => x is IBattleChara o && o.NameId == 7695 && o.IsTargetable()) as IBattleChara;
    }

    private bool IsOmega(uint oid, [NotNullWhen(true)] out IBattleChara? omega)
    {
        if (oid.TryGetObject(out var obj) && obj is IBattleChara o && o.NameId == 7695)
        {
            omega = o;
            return true;
        }
        omega = null;
        return false;
    }

    public override void OnSettingsDraw()
    {
        ImGuiEx.Text("TOP P1 - Program Loop Priority");
        ImGui.Separator();

        ImGuiEx.Text($"Tethers:");
        ImGui.ColorEdit4("Tether's AOE color", ref Conf.TetherAOECol, ImGuiColorEditFlags.NoInputs);
        ImGui.ColorEdit4("Valid tether color", ref Conf.ValidTetherColor, ImGuiColorEditFlags.NoInputs);
        ImGui.ColorEdit4("##Invalid1", ref Conf.InvalidTetherColor1, ImGuiColorEditFlags.NoInputs);
        ImGui.SameLine();
        ImGui.ColorEdit4("Invalid tether colors", ref Conf.InvalidTetherColor2, ImGuiColorEditFlags.NoInputs);
        ImGui.SetNextItemWidth(100f);
        ImGui.SliderFloat("Invalid tether reminder size", ref Conf.InvalidOverlayScale.ValidateRange(1, 5), 1, 5);
        ImGui.ColorEdit4("Invalid tether reminder color", ref Conf.OverlayTextColor, ImGuiColorEditFlags.NoInputs);
        ImGui.Checkbox($"Display AOE under incorrect tether", ref Conf.ShowAOEAlways);
        ImGui.Checkbox($"Tether AOE proximity detector", ref Conf.UseProximity);
        if (Conf.UseProximity)
        {
            ImGui.SameLine();
            ImGui.ColorEdit4("Proximity tether color", ref Conf.ProximityColor, ImGuiColorEditFlags.NoInputs);
        }
        ImGui.Checkbox($"Display tether drop spots when it's my order to take it", ref Conf.DisplayTetherSafeSpots);
        if (Conf.DisplayTetherSafeSpots)
        {
            ImGui.Checkbox($"Detect my designated spot based on same priority as towers", ref Conf.TetherSafeSpotEnableDetect);
            ImGui.ColorEdit4("Safe spot indicator color", ref Conf.TetherSafeSpotColor, ImGuiColorEditFlags.NoInputs);
        }
        ImGui.Checkbox($"Detect tether that I'm supposed to pick up from the same start direction as towers and make it larger", ref Conf.EnlargeMyTether);


        ImGui.Separator();

        ImGuiEx.Text($"Towers:");
        ImGui.SetNextItemWidth(200f);
        ImGuiEx.EnumCombo($"Tower handling", ref Conf.Towers);

        ImGuiEx.Text($"P1 Program Loop priority from North going Clockwise:");
        if (ImGui.Button("Configure for NAUR"))
        {
            Conf.Towers = TowerStartPoint.Start_NorthWest;
            //h2 r2 m2 t2 t1 m1 r1 h1
            Conf.PriorityData.PriorityLists =
            [
                new()
                {
                    IsRole = true,
                    List =
                    [
                        new() { Role = RolePosition.H2},
                        new() { Role = RolePosition.R2},
                        new() { Role = RolePosition.M2},
                        new() { Role = RolePosition.T2},
                        new() { Role = RolePosition.T1},
                        new() { Role = RolePosition.M1},
                        new() { Role = RolePosition.R1},
                        new() { Role = RolePosition.H1}
                    ]
                }
            ];
        }
        ImGui.SameLine();
        if (ImGui.Button("Configure for LPDU"))
        {
            Conf.Towers = TowerStartPoint.Start_NorthWest;
            //m1 m2 t1 t2 r1 r2 h1 h2
            Conf.PriorityData.PriorityLists =
            [
                new()
                {
                    IsRole = true,
                    List =
                    [
                        new() { Role = RolePosition.M1},
                        new() { Role = RolePosition.M2},
                        new() { Role = RolePosition.T1},
                        new() { Role = RolePosition.T2},
                        new() { Role = RolePosition.R1},
                        new() { Role = RolePosition.R2},
                        new() { Role = RolePosition.H1},
                        new() { Role = RolePosition.H2}
                    ]
                }
            ];
        }
        Conf.PriorityData.Draw();

        ImGui.ColorEdit4("Primary tower color", ref Conf.TowerColor1, ImGuiColorEditFlags.NoInputs);
        ImGui.SameLine();
        ImGui.ColorEdit4("Secondary tower color", ref Conf.TowerColor2, ImGuiColorEditFlags.NoInputs);

        ImGui.Separator();

        SetupElements();


        ImGui.Separator();

        if (ImGui.CollapsingHeader("Debug"))
        {
            ImGui.Checkbox($"Debug info", ref Conf.Debug);

            foreach (var x in TetheredPlayers)
            {
                ImGuiEx.Text($"Tether Player: {x} {x.GetObject()}");
            }
            ImGui.Separator();
            TetherOrder.Each(x => ImGuiEx.Text($"Tether order: {x.GetObject()}"));
            TowerOrder.Each(x => ImGuiEx.Text($"Tower order: {x.GetObject()}"));
            ImGuiEx.Text($"GetCurrentMechanicStep() {GetCurrentMechanicStep()}");
            ImGuiEx.Text($"GetTetherMechanicStep() {GetTetherMechanicStep()}");
            Towers.Each(x => ImGuiEx.Text($"Towers: {x.GetObject()?.Position.ToString() ?? "unk position"}"));
        }
    }

    private void UpdateSelfPairPriority()
    {
        if (!Controller.TryGetElementByName("SelfPairPriority", out var e))
        {
            return;
        }

        if (DateTime.Now > programLoopPriorityDisplayUntil || IsPantokratorActive())
        {
            e.Enabled = false;
            return;
        }

        var priority = GetSelfPairPriority();
        if (priority == 0)
        {
            e.Enabled = false;
            return;
        }

        e.Enabled = true;
        e.refX = 100f;
        e.refY = 100f;
        e.overlayText = $"Priority {priority}";
    }

    private int GetSelfPairPriority()
    {
        var localPlayer = Svc.ClientState.LocalPlayer;
        if (localPlayer == null)
        {
            return 0;
        }

        var number = GetPlayerNumber(localPlayer);
        if (number == 0)
        {
            return 0;
        }

        var pair = GetPlayersWithNumber(number).ToList();
        if (pair.Count != 2)
        {
            return 0;
        }

        var players = Conf.PriorityData.GetPlayers(player => pair.Any(pairMember => pairMember.EntityId == player.IGameObject.EntityId))?.ToList();
        if (players == null || players.Count != 2)
        {
            return 0;
        }

        var index = players.FindIndex(player => player.IGameObject.EntityId == localPlayer.EntityId);
        return index >= 0 ? index + 1 : 0;
    }

    private int GetPlayerNumber(IPlayerCharacter player)
    {
        for (var i = 1; i <= 4; i++)
        {
            var debuff = GetDebuffByNumber(i);
            if (player.StatusList.Any(status => status.StatusId == debuff))
            {
                return i;
            }
        }

        return 0;
    }

    private bool IsPantokratorActive()
    {
        if (Svc.Objects.OfType<IBattleChara>().Any(x => x.CastActionId == PantokratorCast || x.CastActionId == PantokratorFlameThrowerCast))
        {
            return true;
        }

        return Svc.Objects.OfType<IPlayerCharacter>().Any(HasPantokratorStatus);
    }

    private static bool HasPantokratorStatus(IPlayerCharacter player)
    {
        return player.StatusList.Any(status => status.StatusId == PantokratorStatus1
            || status.StatusId == PantokratorStatus2
            || status.StatusId == PantokratorStatus3
            || status.StatusId == PantokratorStatus4);
    }

    public class Config : IEzConfig
    {
        public Vector4 TetherAOECol = 0xFF00E4C8u.ToVector4();
        public Vector4 TowerColor1 = 0x23FF00FFu.ToVector4();
        public Vector4 TowerColor2 = 0x23FF00FFu.ToVector4();
        public Vector4 ValidTetherColor = 0x00FFFFFFu.ToVector4();
        public Vector4 InvalidTetherColor1 = 0xFFB500FFu.ToVector4();
        public Vector4 InvalidTetherColor2 = 0xFF0000FFu.ToVector4();
        public Vector4 OverlayTextColor = 0xFF000000u.ToVector4();
        public bool UseProximity = false;
        public Vector4 ProximityColor = ImGuiColors.ParsedBlue;
        public float InvalidOverlayScale = 2f;
        public bool ShowAOEAlways = false;
        public Direction MyDirection = Direction.Clockwise;
        public bool Debug = false;
        public TowerStartPoint Towers = TowerStartPoint.Start_NorthEast;
        public bool DisplayTetherSafeSpots = true;
        public bool TetherSafeSpotEnableDetect = true;
        public Vector4 TetherSafeSpotColor = 0xFF000000u.ToVector4();
        public bool EnlargeMyTether = true;
        public PriorityData PriorityData = new();
    }

    public enum Direction { Clockwise, Counter_clockwise }
    public enum TowerStartPoint { Disable_towers, Start_NorthEast, Start_SouthEast, Start_SouthWest, Start_NorthWest }

    internal static IEnumerable<T> GetPairNumber<T>(IEnumerable<T> e, int n)
    {
        var s = e.ToArray();
        if (n == 1 && s.Length >= 2)
        {
            yield return s[0];
            yield return s[1];
        }
        if (n == 2 && s.Length >= 4)
        {
            yield return s[2];
            yield return s[3];
        }
        if (n == 3 && s.Length >= 6)
        {
            yield return s[4];
            yield return s[5];
        }
        if (n == 4 && s.Length >= 8)
        {
            yield return s[6];
            yield return s[7];
        }
    }
}
```

#### Configurations - サークルプログラム

##### Tethers - サークルプログラム

- Tether's AOE color  
  `#FF00E4C8`
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

#### tower color

- Primary tower color  
  `23FF00FF`
- Secondary tower color  
  `#23FF00FF`

---

### P1 パントクラトル

**TOP P1 Pantokrator Initial Position Priority**  

パントクラトルの優先度ガイド  
優先度設定が必要

```c#
using Dalamud.Bindings.ImGui;
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameHelpers;
using ECommons.ImGuiMethods;
using Splatoon.SplatoonScripting;
using Splatoon.SplatoonScripting.Priority;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

internal class TOP_P1_Pantokrator_Initial_Position_Priority : SplatoonScript
{
    private const uint PantokratorCast = 31501;
    private const uint FlameThrowerCast = 32368;
    private const uint Status1 = 0xBBC;
    private const uint Status2 = 0xBBD;
    private const uint Status3 = 0xBBE;
    private const uint Status4 = 0xD7B;
    private const float CenterX = 100f;
    private const float CenterZ = 100f;
    private const float InitialDistance = 10f;
    private const float FlameGuideDistance = 10f;
    private const uint GuideColor = 4278255360;
    private const int InitialGuideDelayMs = 2200;
    private const int InitialGuideDurationMs = 4500;
    private const int FlameGuideDelayMs = 1800;
    private const int FlameGuideDurationMs = 3500;
    private const float SameAxisTolerance = 5f;

    private readonly List<CastRecord> _flameCasts = [];
    private float? _pantokratorAngle = null;
    private float? _firstFlameAngle = null;
    private int _flameDirection = 0;
    private long _pantokratorStartedAt = 0;
    private long _firstFlameStartedAt = 0;
    private long _secondFlameStartedAt = 0;
    private string _lastEvent = "";
    private string _lastSkipReason = "";
    private string _lastGuide = "";

    private Config C => Controller.GetConfig<Config>();

    public override HashSet<uint>? ValidTerritories => [1122];
    public override Metadata? Metadata => new(1, "kudry + Codex");

    public override void OnSetup()
    {
        Controller.RegisterElementFromCode("Guide", $$"""
        {
            "Name":"",
            "type":0,
            "Enabled":false,
            "refX":100.0,
            "refY":100.0,
            "refZ":0.0,
            "radius":1.0,
            "color":{{GuideColor}},
            "Filled":false,
            "fillIntensity":0.2,
            "overlayBGColor":1879048192,
            "overlayTextColor":3372220415,
            "thicc":8.0,
            "overlayText":"",
            "tether":true
        }
        """);
        Controller.RegisterElementFromCode("PreGuide", $$"""
        {
            "Name":"",
            "type":0,
            "Enabled":false,
            "refX":100.0,
            "refY":100.0,
            "refZ":0.0,
            "radius":2.0,
            "color":{{GuideColor}},
            "Filled":false,
            "fillIntensity":0.2,
            "overlayBGColor":1879048192,
            "overlayTextColor":3372220415,
            "thicc":8.0,
            "overlayText":"",
            "tether":true
        }
        """);
        Controller.RegisterElementFromCode("RotationText", """
        {
            "Name":"",
            "type":0,
            "Enabled":false,
            "refX":100.0,
            "refY":100.0,
            "refZ":0.0,
            "radius":0.0,
            "overlayBGColor":3355443200,
            "overlayTextColor":3355508527,
            "overlayVOffset":2.5,
            "overlayFScale":3.0,
            "thicc":1.0,
            "overlayText":"",
            "tether":false
        }
        """);
    }

    public override void OnStartingCast(uint source, uint castId)
    {
        if (castId == PantokratorCast)
        {
            ResetState();
            _pantokratorAngle = GetCastAngle(source);
            _pantokratorStartedAt = Environment.TickCount64;
            _lastEvent = $"31501 angle={FormatAngle(_pantokratorAngle)}";
            return;
        }

        if (castId != FlameThrowerCast)
        {
            return;
        }

        RecordFlameCast(source);
    }

    public override void OnUpdate()
    {
        ScanActiveCasts();
        OffGuide();

        var player = GetBasePlayer();
        if (player == null)
        {
            _lastSkipReason = "No base player";
            return;
        }

        if (!TryGetMyStatusNumber(player, out var number))
        {
            _lastSkipReason = "Base player has no Pantokrator number status";
            return;
        }

        var pairPriorityIndex = GetPairPriorityIndex(player, number);
        if (pairPriorityIndex < 0)
        {
            _lastSkipReason = "Could not resolve pair priority";
            return;
        }

        var position = ResolveGuidePosition(number, pairPriorityIndex);
        if (position != null)
        {
            _lastSkipReason = "";
            MoveGuide("Guide", position.Value);
            return;
        }

        var prePosition = ResolvePreGuidePosition(number, pairPriorityIndex);
        if (prePosition != null)
        {
            _lastSkipReason = "";
            MoveGuide("PreGuide", prePosition.Value);
            UpdateRotationText();
            return;
        }

        UpdateRotationText();
        _lastSkipReason = "Could not resolve guide position";
    }

    public override void OnReset()
    {
        ResetState();
        OffGuide();
    }

    public override void OnSettingsDraw()
    {
        ImGuiEx.Text("TOP P1 Pantokrator initial position priority");
        ImGuiEx.Text("In each debuff pair, higher priority goes North/East and lower priority goes South/West.");
        C.PriorityData.Draw();

        ImGui.Separator();
        ImGui.SetNextItemWidth(220);
        if (ImGui.BeginCombo("Script Override", string.IsNullOrEmpty(C.BasePlayerOverride) ? "No Override" : C.BasePlayerOverride))
        {
            if (ImGui.Selectable("No Override", string.IsNullOrEmpty(C.BasePlayerOverride)))
            {
                C.BasePlayerOverride = "";
            }

            foreach (var player in Svc.Objects.OfType<IPlayerCharacter>().OrderBy(x => x.Name.ToString()))
            {
                var name = player.Name.ToString();
                if (ImGui.Selectable(name, C.BasePlayerOverride == name))
                {
                    C.BasePlayerOverride = name;
                }
            }

            ImGui.EndCombo();
        }

        ImGui.Checkbox("Debug", ref C.Debug);
        if (C.Debug)
        {
            var player = GetBasePlayer();
            ImGuiEx.Text($"Base player: {player?.Name.ToString() ?? "None"}");
            if (player != null && TryGetMyStatusNumber(player, out var number))
            {
                var pairPriority = GetPairPriorityIndex(player, number);
                ImGuiEx.Text($"Base player debuff number: {number}");
                ImGuiEx.Text($"Same debuff players in priority list: {CountPriorityPlayersWithNumber(number)}");
                ImGuiEx.Text($"Base player pair priority: {(pairPriority < 0 ? "Unknown" : (pairPriority + 1).ToString())}");
            }
            ImGuiEx.Text($"31501 angle: {FormatAngle(_pantokratorAngle)}");
            ImGuiEx.Text($"First 32368 angle: {FormatAngle(_firstFlameAngle)}");
            ImGuiEx.Text($"32368 direction: {(_flameDirection > 0 ? "Clockwise" : _flameDirection < 0 ? "Counter-clockwise" : "Unknown")}");
            ImGuiEx.Text($"32368 axes: {string.Join(", ", _flameCasts.Select(x => FormatAngle(x.Angle)))}");
            ImGuiEx.Text($"31501 age ms: {GetPantokratorAgeMs()}");
            ImGuiEx.Text($"First 32368 age ms: {GetFirstFlameAgeMs()}");
            ImGuiEx.Text($"Second 32368 age ms: {GetSecondFlameAgeMs()}");
            ImGuiEx.Text($"Last guide: {(string.IsNullOrEmpty(_lastGuide) ? "None" : _lastGuide)}");
            ImGuiEx.Text($"Last event: {_lastEvent}");
            ImGuiEx.Text($"Last skip reason: {(string.IsNullOrEmpty(_lastSkipReason) ? "None" : _lastSkipReason)}");
        }
    }

    private void ScanActiveCasts()
    {
        foreach (var caster in Svc.Objects.OfType<IBattleChara>())
        {
            if (caster.CastActionId == PantokratorCast && _pantokratorAngle == null)
            {
                _pantokratorAngle = GetCastAngle(caster);
                _pantokratorStartedAt = Environment.TickCount64;
                _lastEvent = $"31501 scan angle={FormatAngle(_pantokratorAngle)}";
            }

            if (caster.CastActionId == FlameThrowerCast)
            {
                RecordFlameCast(caster);
            }
        }
    }

    private void RecordFlameCast(uint source)
    {
        if (source.GetObject() is not IBattleChara caster)
        {
            return;
        }

        RecordFlameCast(caster);
    }

    private void RecordFlameCast(IBattleChara caster)
    {
        if (_flameCasts.Any(x => x.Source == caster.EntityId))
        {
            return;
        }

        float? angle = GetCastAngle(caster);
        float? axisAngle = null;
        if (angle.HasValue)
        {
            axisAngle = NormalizeAxisAngle(angle.Value);
        }

        if (axisAngle != null && _flameCasts.Any(x => x.Angle != null && GetAxisDistance(x.Angle.Value, axisAngle.Value) <= SameAxisTolerance))
        {
            return;
        }

        _flameCasts.Add(new(caster.EntityId, axisAngle, Environment.TickCount64));
        _lastEvent = $"32368 #{_flameCasts.Count} angle={FormatAngle(angle)} axis={FormatAngle(axisAngle)}";

        if (_flameCasts.Count == 1)
        {
            _firstFlameAngle = axisAngle;
            _firstFlameStartedAt = Environment.TickCount64;
            _flameDirection = 0;
            return;
        }

        if (_flameCasts.Count == 2 && _firstFlameAngle != null && axisAngle != null)
        {
            _secondFlameStartedAt = Environment.TickCount64;
            _flameDirection = GetClockwiseDirection(_firstFlameAngle.Value, axisAngle.Value);
        }
    }

    private Vector3? ResolveGuidePosition(int number, int pairPriorityIndex)
    {
        if (_firstFlameAngle != null && IsFlameGuideWindow() && _flameDirection != 0)
        {
            return null;
        }

        if (_firstFlameAngle != null)
        {
            return null;
        }

        if (_pantokratorAngle == null)
        {
            return null;
        }

        if (!IsInitialGuideWindow())
        {
            return null;
        }

        var useNorthSouth = ShouldUseNorthSouth(_pantokratorAngle.Value, _firstFlameAngle);
        var highPriority = pairPriorityIndex == 0;

        if (useNorthSouth)
        {
            var angle = highPriority ? 0f : 180f;
            _lastGuide = $"Initial angle={angle:0.0}";
            return PositionFromAngle(angle, InitialDistance);
        }

        {
            var angle = highPriority ? 90f : 270f;
            _lastGuide = $"Initial angle={angle:0.0}";
            return PositionFromAngle(angle, InitialDistance);
        }
    }

    private Vector3? ResolvePreGuidePosition(int number, int pairPriorityIndex)
    {
        if (_firstFlameAngle != null && IsFlamePreGuideWindow())
        {
            return ResolveAxisPreGuidePosition(pairPriorityIndex);
        }

        return null;
    }

    private Vector3? ResolveAxisPreGuidePosition(int pairPriorityIndex)
    {
        if (_firstFlameAngle == null)
        {
            return null;
        }

        var highPriority = pairPriorityIndex == 0;
        var angle = GetPriorityNinetyDegreeAngle(highPriority);

        _lastGuide = $"Pre angle={angle:0.0}";
        return PositionFromAngle(angle, FlameGuideDistance);
    }

    private void UpdateRotationText()
    {
        if (!Controller.TryGetElementByName("RotationText", out var element))
        {
            return;
        }

        if (_flameDirection == 0 || !IsRotationTextWindow())
        {
            element.Enabled = false;
            return;
        }

        element.Enabled = true;
        element.overlayText = _flameDirection > 0 ? "CW" : "CCW";
    }

    private float GetPriorityNinetyDegreeAngle(bool highPriority)
    {
        var firstFlameAngle = _firstFlameAngle ?? 0f;
        var useNorthSouth = ShouldUseNorthSouth(_pantokratorAngle ?? firstFlameAngle, _firstFlameAngle);
        var targetAngle = useNorthSouth
            ? (highPriority ? 0f : 180f)
            : (highPriority ? 90f : 270f);

        var clockwiseCandidate = NormalizeAngle(firstFlameAngle + 90f);
        var counterClockwiseCandidate = NormalizeAngle(firstFlameAngle - 90f);
        return GetAngleDistance(clockwiseCandidate, targetAngle) <= GetAngleDistance(counterClockwiseCandidate, targetAngle)
            ? clockwiseCandidate
            : counterClockwiseCandidate;
    }

    private static bool ShouldUseNorthSouth(float pantokratorAngle, float? firstFlameAngle)
    {
        if (firstFlameAngle != null && IsNearCardinal(firstFlameAngle.Value, 0f, 20f))
        {
            return false;
        }

        if (firstFlameAngle != null && IsNearCardinal(firstFlameAngle.Value, 180f, 20f))
        {
            return false;
        }

        if (IsNearCardinal(pantokratorAngle, 315f, 25f) || IsNearCardinal(pantokratorAngle, 135f, 25f))
        {
            return true;
        }

        return true;
    }

    private int GetPairPriorityIndex(IPlayerCharacter player, int number)
    {
        var priorityPlayers = C.PriorityData.GetPlayers(priority => priority.IGameObject is IPlayerCharacter)?.ToList();
        if (priorityPlayers == null)
        {
            return -1;
        }

        var pair = priorityPlayers
            .Where(priority => priority.IGameObject is IPlayerCharacter candidate && HasNumberStatus(candidate, number))
            .ToList();

        if (pair.Count != 2)
        {
            return -1;
        }

        return pair.FindIndex(priority => priority.IGameObject.EntityId == player.EntityId);
    }

    private int CountPriorityPlayersWithNumber(int number)
    {
        var priorityPlayers = C.PriorityData.GetPlayers(priority => priority.IGameObject is IPlayerCharacter)?.ToList();
        if (priorityPlayers == null)
        {
            return 0;
        }

        return priorityPlayers.Count(priority => priority.IGameObject is IPlayerCharacter candidate && HasNumberStatus(candidate, number));
    }

    private IPlayerCharacter? GetBasePlayer()
    {
        if (!string.IsNullOrEmpty(C.BasePlayerOverride))
        {
            var overridePlayer = Svc.Objects
                .OfType<IPlayerCharacter>()
                .FirstOrDefault(x => string.Equals(x.Name.ToString(), C.BasePlayerOverride, StringComparison.OrdinalIgnoreCase));

            if (overridePlayer != null)
            {
                return overridePlayer;
            }
        }

        return Player.Object;
    }

    private static bool TryGetMyStatusNumber(IPlayerCharacter player, out int number)
    {
        if (HasStatus(player, Status1))
        {
            number = 1;
            return true;
        }

        if (HasStatus(player, Status2))
        {
            number = 2;
            return true;
        }

        if (HasStatus(player, Status3))
        {
            number = 3;
            return true;
        }

        if (HasStatus(player, Status4))
        {
            number = 4;
            return true;
        }

        number = 0;
        return false;
    }

    private static bool HasStatus(IPlayerCharacter player, uint statusId)
    {
        return player.StatusList.Any(x => x.StatusId == statusId);
    }

    private static bool HasNumberStatus(IPlayerCharacter player, int number)
    {
        return number switch
        {
            1 => HasStatus(player, Status1),
            2 => HasStatus(player, Status2),
            3 => HasStatus(player, Status3),
            4 => HasStatus(player, Status4),
            _ => false,
        };
    }

    private bool IsInitialGuideWindow()
    {
        var age = GetPantokratorAgeMs();
        return age >= InitialGuideDelayMs && age <= InitialGuideDelayMs + InitialGuideDurationMs;
    }

    private bool IsFlameGuideWindow()
    {
        var age = GetSecondFlameAgeMs();
        return age >= FlameGuideDelayMs && age <= FlameGuideDelayMs + FlameGuideDurationMs;
    }

    private bool IsFlamePreGuideWindow()
    {
        var age = _secondFlameStartedAt == 0 ? GetFirstFlameAgeMs() : GetSecondFlameAgeMs();
        if (age < 0)
        {
            return false;
        }

        return _secondFlameStartedAt == 0 || age <= FlameGuideDelayMs + FlameGuideDurationMs;
    }

    private bool IsRotationTextWindow()
    {
        var age = GetSecondFlameAgeMs();
        return age >= 0 && age <= FlameGuideDelayMs + FlameGuideDurationMs;
    }

    private long GetPantokratorAgeMs()
    {
        return _pantokratorStartedAt == 0 ? -1 : Environment.TickCount64 - _pantokratorStartedAt;
    }

    private long GetFirstFlameAgeMs()
    {
        return _firstFlameStartedAt == 0 ? -1 : Environment.TickCount64 - _firstFlameStartedAt;
    }

    private long GetSecondFlameAgeMs()
    {
        return _secondFlameStartedAt == 0 ? -1 : Environment.TickCount64 - _secondFlameStartedAt;
    }

    private static int GetClockwiseDirection(float firstAngle, float secondAngle)
    {
        var diff = NormalizeAxisDelta(secondAngle - firstAngle);
        return diff >= 0f ? 1 : -1;
    }

    private static float? GetCastAngle(uint source)
    {
        if (source.GetObject() is not IBattleChara caster)
        {
            return null;
        }

        return GetCastAngle(caster);
    }

    private static float? GetCastAngle(IBattleChara caster)
    {
        var distanceFromCenter = MathF.Sqrt(MathF.Pow(caster.Position.X - CenterX, 2f) + MathF.Pow(caster.Position.Z - CenterZ, 2f));
        return distanceFromCenter > 1.5f
            ? PositionToAngle(caster.Position)
            : RotationToAngle(caster.Rotation);
    }

    private static float RotationToAngle(float rotation)
    {
        return NormalizeAngle(rotation * 180f / MathF.PI);
    }

    private static float PositionToAngle(Vector3 position)
    {
        return NormalizeAngle(MathF.Atan2(position.X - CenterX, CenterZ - position.Z) * 180f / MathF.PI);
    }

    private static Vector3 PositionFromAngle(float angle, float distance)
    {
        var radians = NormalizeAngle(angle) * MathF.PI / 180f;
        return new Vector3(
            CenterX + MathF.Sin(radians) * distance,
            0f,
            CenterZ - MathF.Cos(radians) * distance);
    }

    private static bool IsNearCardinal(float angle, float target, float tolerance)
    {
        var diff = MathF.Abs(NormalizeAngle(angle - target));
        return MathF.Min(diff, 360f - diff) <= tolerance;
    }

    private static float GetAngleDistance(float a, float b)
    {
        var diff = MathF.Abs(NormalizeAngle(a - b));
        return MathF.Min(diff, 360f - diff);
    }

    private static float GetAxisDistance(float a, float b)
    {
        return MathF.Abs(NormalizeAxisDelta(a - b));
    }

    private static float NormalizeAngle(float angle)
    {
        angle %= 360f;
        return angle < 0 ? angle + 360f : angle;
    }

    private static float NormalizeAxisAngle(float angle)
    {
        var normalized = NormalizeAngle(angle);
        return normalized >= 180f ? normalized - 180f : normalized;
    }

    private static float NormalizeAxisDelta(float angle)
    {
        angle %= 180f;
        if (angle > 90f)
        {
            angle -= 180f;
        }
        else if (angle < -90f)
        {
            angle += 180f;
        }

        return angle;
    }

    private static string FormatAngle(float? angle)
    {
        return angle == null ? "None" : $"{angle.Value:0.0}";
    }

    private void MoveGuide(string name, Vector3 position)
    {
        var element = Controller.GetElementByName(name);
        element.Enabled = true;
        element.refX = position.X;
        element.refY = position.Z;
        element.refZ = position.Y;
    }

    private void OffGuide()
    {
        if (Controller.TryGetElementByName("Guide", out var element))
        {
            element.Enabled = false;
        }

        if (Controller.TryGetElementByName("PreGuide", out var preElement))
        {
            preElement.Enabled = false;
        }

        if (Controller.TryGetElementByName("RotationText", out var rotationElement))
        {
            rotationElement.Enabled = false;
        }
    }

    private void ResetState()
    {
        _flameCasts.Clear();
        _pantokratorAngle = null;
        _firstFlameAngle = null;
        _flameDirection = 0;
        _pantokratorStartedAt = 0;
        _firstFlameStartedAt = 0;
        _secondFlameStartedAt = 0;
        _lastEvent = "";
        _lastSkipReason = "";
        _lastGuide = "";
    }

    private readonly record struct CastRecord(uint Source, float? Angle, long StartedAt);

    public class Config : IEzConfig
    {
        public bool Debug = false;
        public string BasePlayerOverride = "";
        public PriorityData PriorityData = new();
    }
}
```

#### Priority - パントクラトル

上から`H1,MT,ST,D1,D2,D3,D4,H2`

---

### P2 連携プログラムPT

**Party Synrgy**  

公式から、連携プログラムPTのガイドスクリプト  

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

### P2 連携プログラムLB

**TOP P2 Limitless Synergy LB Tether**  

連携プログラムLBの取得テザー、誘導先の表示スクリプト  

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using Dalamud.Bindings.ImGui;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.Hooks;
using ECommons.ImGuiMethods;
using ECommons.MathHelpers;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

using ECommons.DalamudServices.Legacy;

namespace SplatoonScriptsOfficial.Duties.Endwalker.The_Omega_Protocol;

public class TOP_P2_Limitless_Synergy_LB_Tether : SplatoonScript
{
    private const uint LimitlessSynergyCast = 31544;
    private const uint OmegaMBladeDanceCast = 31540;
    private const uint OmegaFBladeDanceCast = 31541;
    private const uint OmegaMNameId = 7633;
    private const uint OmegaFNameId = 7634;
    private const float CenterX = 100f;
    private const float CenterZ = 100f;
    private const float TetherSourceDistance = 22f;
    private const float TetherSourceDistanceTolerance = 5f;
    private const float DropAdditionalRotation = 5.2359877f;
    private const uint TakenTetherColor = 3372220160;
    private const uint UntakenTetherColor = 3355508735;
    private const uint DropColor = 3355508509;

    public override Metadata? Metadata => new(1, "kudry + Codex");
    public override HashSet<uint> ValidTerritories => [1122];

    private readonly Dictionary<uint, uint> _tethers = [];
    private bool _allowed = false;
    private Config Conf => Controller.GetConfig<Config>();

    public override void OnSetup()
    {
        Controller.RegisterElement("TetherLine", new(2) { Enabled = false, radius = 0f, thicc = 8f, color = UntakenTetherColor });
        Controller.RegisterElementFromCode("DropGuide", """
        {
            "Name":"",
            "type":1,
            "Enabled":false,
            "offY":10.0,
            "radius":0.5,
            "color":3355508509,
            "Filled":false,
            "fillIntensity":0.5,
            "thicc":8.0,
            "refActorObjectID":0,
            "refActorComparisonType":2,
            "includeRotation":true,
            "AdditionalRotation":5.2359877,
            "tether":true
        }
        """);
    }

    public override void OnMessage(string Message)
    {
        if (Message.Contains($"(7635>{LimitlessSynergyCast})"))
        {
            ResetState();
            _allowed = true;
        }
    }

    public override void OnTetherCreate(uint source, uint target, uint data2, uint data3, uint data5)
    {
        if (!_allowed || Conf.Assignment == TetherAssignment.None)
            return;

        var normalizedTether = NormalizeTether(source, target);
        if (normalizedTether == null)
            return;

        var (sourceObjId, targetObjId) = normalizedTether.Value;
        if (!IsAssignedTetherSource(sourceObjId))
            return;

        _tethers[sourceObjId] = targetObjId;
    }

    public override void OnTetherRemoval(uint source, uint data2, uint data3, uint data5)
    {
        _tethers.Remove(source);
        var pair = _tethers.FirstOrDefault(x => x.Value == source);
        if (pair.Key != 0)
            _tethers.Remove(pair.Key);
    }

    public override void OnUpdate()
    {
        OffAll();

        if (!_allowed || Conf.Assignment == TetherAssignment.None)
            return;

        var tether = GetAssignedTether();
        if (tether == null)
            return;

        var (source, target) = tether.Value;
        if (source.GetObject() is not IBattleChara)
            return;

        var basePlayer = GetBasePlayer();
        var hasTether = basePlayer != null && IsPlayerObject(target, basePlayer);

        UpdateTetherLine(source, target, hasTether);
        UpdateDropGuide(source);
    }

    public override void OnDirectorUpdate(DirectorUpdateCategory category)
    {
        if (category.EqualsAny(DirectorUpdateCategory.Wipe, DirectorUpdateCategory.Commence, DirectorUpdateCategory.Recommence))
        {
            ResetState();
            OffAll();
        }
    }

    public override void OnReset()
    {
        ResetState();
        OffAll();
    }

    public override void OnSettingsDraw()
    {
        ImGuiEx.Text("TOP P2 - Limitless Synergy LB Tether");
        ImGui.SetNextItemWidth(160f);
        ImGuiEx.EnumCombo("Assignment", ref Conf.Assignment);

        ImGui.SetNextItemWidth(220f);
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

        ImGui.Checkbox("Debug", ref Conf.Debug);

        if (ImGui.CollapsingHeader("Debug"))
        {
            ImGuiEx.Text($"Allowed: {_allowed}");
            ImGuiEx.Text($"Assignment: {Conf.Assignment}");
            ImGuiEx.Text($"Base player: {(GetBasePlayer() == null ? "None" : GetBasePlayer().Name.ToString())}");
            ImGuiEx.Text($"Recorded tethers: {_tethers.Count}");

            foreach (var tether in _tethers)
            {
                var source = tether.Key.GetObject();
                var target = tether.Value.GetObject();
                ImGuiEx.Text($"Source: {source} angle {GetSourceAngleText(tether.Key)} -> Target: {target}");
            }

            foreach (var source in Svc.Objects.OfType<IBattleChara>().Where(IsPotentialTetherSource))
            {
                ImGuiEx.Text($"Potential: {source} angle {GetSourceAngle(source.Position):0.0} assignment {GetSourceAssignment(source.Position)}");
            }
        }
    }

    private (uint Source, uint Target)? GetAssignedTether()
    {
        foreach (var tether in _tethers)
        {
            if (IsAssignedTetherSource(tether.Key))
                return (tether.Key, tether.Value);
        }

        return null;
    }

    private (uint Source, uint Target)? NormalizeTether(uint first, uint second)
    {
        if (IsAssignedTetherSource(first))
            return (first, second);

        if (IsAssignedTetherSource(second))
            return (second, first);

        if (IsPotentialTetherSource(first))
            return (first, second);

        if (IsPotentialTetherSource(second))
            return (second, first);

        return null;
    }

    private bool IsAssignedTetherSource(uint source)
    {
        if (source.GetObject() is not IBattleChara sourceObj)
            return false;

        if (!IsPotentialTetherSource(sourceObj))
            return false;

        return GetSourceAssignment(sourceObj.Position) == Conf.Assignment;
    }

    private static bool IsPotentialTetherSource(uint source)
    {
        return source.GetObject() is IBattleChara sourceObj && IsPotentialTetherSource(sourceObj);
    }

    private static bool IsPotentialTetherSource(IBattleChara source)
    {
        var distance = Vector2.Distance(new Vector2(CenterX, CenterZ), source.Position.ToVector2());
        var isKnownOmega = source.NameId == OmegaMNameId || source.NameId == OmegaFNameId;
        var isBladeDanceCaster = source.CastActionId == OmegaMBladeDanceCast || source.CastActionId == OmegaFBladeDanceCast;
        return (isKnownOmega || isBladeDanceCaster) && Math.Abs(distance - TetherSourceDistance) <= TetherSourceDistanceTolerance;
    }

    private IPlayerCharacter? GetBasePlayer()
    {
        if (!string.IsNullOrEmpty(Conf.BasePlayerOverride))
        {
            var overridePlayer = Svc.Objects
                .OfType<IPlayerCharacter>()
                .FirstOrDefault(x => string.Equals(x.Name.ToString(), Conf.BasePlayerOverride, StringComparison.OrdinalIgnoreCase));

            if (overridePlayer != null)
                return overridePlayer;
        }

        return Svc.ClientState.LocalPlayer;
    }

    private static bool IsPlayerObject(uint objectId, IPlayerCharacter player)
    {
        if (objectId == player.EntityId)
            return true;

        return objectId.GetObject() is IPlayerCharacter targetPlayer
            && string.Equals(targetPlayer.Name.ToString(), player.Name.ToString(), StringComparison.OrdinalIgnoreCase);
    }

    private static TetherAssignment GetSourceAssignment(Vector3 position)
    {
        var roundedAngle = RoundToNearest45(GetSourceAngle(position));
        return roundedAngle switch
        {
            90 or 135 or 180 or -135 => TetherAssignment.MT,
            45 or 0 or -45 or -90 => TetherAssignment.ST,
            _ => TetherAssignment.None,
        };
    }

    private static float GetSourceAngle(Vector3 position)
    {
        var degrees = MathF.Atan2(CenterZ - position.Z, position.X - CenterX) * 180f / MathF.PI;
        return NormalizeAngle(degrees);
    }

    private static int RoundToNearest45(float degrees)
    {
        var rounded = (int)MathF.Round(degrees / 45f) * 45;
        return (int)NormalizeAngle(rounded);
    }

    private static float NormalizeAngle(float degrees)
    {
        while (degrees > 180f) degrees -= 360f;
        while (degrees <= -180f) degrees += 360f;
        return degrees;
    }

    private static string GetSourceAngleText(uint source)
    {
        if (source.GetObject() is not IBattleChara sourceObj)
            return "Unknown";

        return $"{GetSourceAngle(sourceObj.Position):0.0} / {RoundToNearest45(GetSourceAngle(sourceObj.Position))}";
    }

    private void UpdateTetherLine(uint source, uint target, bool hasTether)
    {
        if (!Controller.TryGetElementByName("TetherLine", out var element))
            return;

        var sourceObj = source.GetObject();
        var targetObj = target.GetObject();
        if (sourceObj == null || targetObj == null)
            return;

        element.Enabled = true;
        element.SetRefPosition(sourceObj.Position);
        element.SetOffPosition(targetObj.Position);
        element.color = hasTether ? TakenTetherColor : UntakenTetherColor;
        element.thicc = 8f;
        element.overlayText = "";
    }

    private void UpdateDropGuide(uint source)
    {
        if (!Controller.TryGetElementByName("DropGuide", out var element))
            return;

        element.Enabled = true;
        element.refActorObjectID = source;
        element.color = DropColor;
        element.thicc = 8f;
        element.radius = 0.5f;
        element.tether = true;
        element.includeRotation = true;
        element.AdditionalRotation = DropAdditionalRotation;
    }

    private void OffAll()
    {
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
    }

    private void ResetState()
    {
        _tethers.Clear();
        _allowed = false;
    }

    public class Config : IEzConfig
    {
        public TetherAssignment Assignment = TetherAssignment.None;
        public string BasePlayerOverride = "";
        public bool Debug = false;
    }

    public enum TetherAssignment
    {
        None,
        MT,
        ST,
    }
}
```

#### Configuration

- Assignment  
  ロールを選択  
  タンク以外は`None`
  - `MT`  
  - `ST`  
  - `None`  

---

### P2 MF Target Enforcer

**MF Target Enforcer**  

公式から、オメガM/Fの誤ターゲットを補正するスクリプト  
設定不要（任意導入）

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/refs/heads/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/MF%20Target%20Enforcer.cs
```

---

### P3 コロッサスブロー

**P3 Transition**  

公式から、コロッサスブローのガイドスクリプト  

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/refs/heads/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/P3_Transition.cs
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

**Hello World JP**  

公式のハローワールドのスクリプトを元に、ガイドが日本語に変更されたもの  

```C#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using Dalamud.Interface.Colors;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.GameHelpers;
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

            var localPlayer = Player.Object;
            if(localPlayer == null) return;

            try
            {
                if(Conf.EnableAvoiders && IsHelloWorldRunning)
                {
                    var otherPlayers = FakeParty.Get().Where(x => x.Address != localPlayer.Address);
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
                        var partner = FakeParty.Get().FirstOrDefault(x => x.Address != localPlayer.Address && HasEffect(Effects.UpcomingCloseTether, 10f, x));
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
                        if(Conf.EnableOverheadHintsTether) Reminder("線を切る- 離れる", ImGuiColors.HealerGreen);
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
            var target = obj ?? Player.Object;
            return target != null && target.StatusList.Any(x => x.StatusId == effect && (remainingTile == null || x.RemainingTime < remainingTile));
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
---

### P3 検知式波動砲 (十字式)

**TOP Cross Oversampled Wave Cannon**  

AIに作成させた十字処理での検知式波動砲のスクリプト  
リリドで採用されてるAst式が必要な場合は公式のリポジトリを参照してください。

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

**TOP P5 Hello World Near Far**  

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

            var closest1 = party
                .Where(x => !SamePlayer(x, nearOwner))
                .OrderBy(x => Distance2D(x, nearOwner))
                .FirstOrDefault();

            Show("NearClosest1", closest1);

            if(closest1 != null)
            {
                var closest2 = party
                    .Where(x => !SamePlayer(x, closest1) && !SamePlayer(x, nearOwner))
                    .OrderBy(x => Distance2D(x, closest1))
                    .FirstOrDefault();

                Show("NearClosest2", closest2);
            }
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

**P5 Dynamis Sigma**  

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

**P5 Dynamis Sigma Hello World**  

公式から、P5 シグマのハロニア/ファー ガイドスクリプト

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/refs/heads/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/P5_Dynamis_Sigma_Hello_World.cs
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

**P5 Dynamis Omega Safe Guide**  

公式から、P5 オメガ 安置ガイドスクリプト

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/refs/heads/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/P5_Dynamis_Omega_Safe_Guide.cs
```

#### Registered Element - P5 オメガ 安置ガイド

テザーおよび直線の太さを調整しています。  
必要に応じてお好みで調整してください。

```json
{"Elements":{"first_navi_tower":{"Name":"first_navi_tower","type":2,"Enabled":false,"refX":104.88148,"refY":101.0822,"refZ":0.0,"offX":104.88148,"offY":101.0822,"offZ":10.0,"radius":0.0,"color":4278386432,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":16.0,"overlayText":"","refActorDataID":15708,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":3.3684855,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"second_navi_tower":{"Name":"second_navi_tower","type":2,"Enabled":false,"refX":100.0,"refY":90.0,"refZ":0.0,"offX":100.0,"offY":90.0,"offZ":10.0,"radius":0.0,"color":4293328640,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":16.0,"overlayText":"","refActorDataID":15708,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":true,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":false,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":3.3684855,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"second_navi":{"Name":"second_navi","type":0,"Enabled":false,"refX":100.0,"refY":90.0,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.0,"color":4278255426,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":8.0,"overlayText":"","refActorDataID":14669,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false},"first_navi":{"Name":"first_navi","type":0,"Enabled":false,"refX":104.88148,"refY":101.0822,"refZ":0.0,"offX":0.0,"offY":0.0,"offZ":0.0,"radius":0.0,"color":4278255376,"Filled":false,"fillIntensity":0.5,"overlayBGColor":1879048192,"overlayTextColor":3372220415,"overlayVOffset":0.0,"overlayFScale":1.0,"overlayPlaceholders":false,"thicc":8.0,"overlayText":"","refActorDataID":14669,"refActorTargetingYou":0,"refActorNamePlateIconID":0,"refActorComparisonAnd":false,"refActorRequireCast":false,"refActorCastReverse":false,"refActorUseCastTime":false,"refActorCastTimeMin":0.0,"refActorCastTimeMax":0.0,"refActorUseOvercast":false,"refTargetYou":false,"refActorRequireBuff":false,"refActorRequireAllBuffs":false,"refActorRequireBuffsInvert":false,"refActorUseBuffTime":false,"refActorUseBuffParam":false,"refActorBuffTimeMin":0.0,"refActorBuffTimeMax":0.0,"refActorObjectLife":false,"TargetAlteration":0,"refActorComparisonType":3,"refActorType":0,"includeHitbox":false,"includeOwnHitbox":false,"includeRotation":false,"onlyTargetable":false,"onlyUnTargetable":false,"onlyVisible":false,"tether":true,"ExtraTetherLength":0.0,"LineEndA":0,"LineEndB":0,"AdditionalRotation":0.0,"LineAddHitboxLengthX":false,"LineAddHitboxLengthY":false,"LineAddHitboxLengthZ":false,"LineAddHitboxLengthXA":false,"LineAddHitboxLengthYA":false,"LineAddHitboxLengthZA":false,"LineAddPlayerHitboxLengthX":false,"LineAddPlayerHitboxLengthY":false,"LineAddPlayerHitboxLengthZ":false,"LineAddPlayerHitboxLengthXA":false,"LineAddPlayerHitboxLengthYA":false,"LineAddPlayerHitboxLengthZA":false,"FaceMe":false,"LimitDistance":false,"LimitDistanceInvert":false,"DistanceSourceX":0.0,"DistanceSourceY":0.0,"DistanceSourceZ":0.0,"DistanceMin":0.0,"DistanceMax":0.0,"UseDistanceSourcePlaceholder":false,"LimitRotation":false,"refActorTether":false,"refActorTetherTimeMin":0.0,"refActorTetherTimeMax":0.0,"refActorTetherParam1":null,"refActorTetherParam2":null,"refActorTetherParam3":null,"refActorIsTetherSource":null,"refActorIsTetherInvert":false,"refActorIsTetherLive":false,"refActorUseTransformation":false,"mechanicType":0,"refMark":false,"refMarkID":0,"faceplayer":"<1>","FaceInvert":false,"FillStep":0.5,"LegacyFill":false,"RenderEngineKind":0,"Conditional":false,"RotationOverride":false,"IsCapturing":false,"Nodraw":false,"UseHitboxRadius":false,"MapEffectInvert":false,"MapEffectAnd":false,"UseCastRotation":false,"UseCastPosition":false,"UseCastTarget":false,"IsDead":null,"Enumeration":0,"AnimationInverted":false}}}
```

---

### P5 オメガ ハロワ

**P5 Dynamis Omega Hello World**  

公式から、P5 オメガ ハロワ ニア/ファー ガイドスクリプト

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/refs/heads/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/P5_Dynamis_Omega_Hello_World.cs
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

**Exasquares**  

公式から、コスモアローのAoEを表示するスクリプト

```url
https://raw.githubusercontent.com/PunishXIV/Splatoon/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol/Exasquares.cs
```

---

### P6 MultiScript

**P6 MultiScript**  

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
---

### P6 コスモメテオ

**Cosmo Meteor Adjuster Priority**  

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
    private readonly string[] PrioritySlots = { "D3", "D4", "H2", "D2", "ST", "D1", "H1", "MT" };
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
        public bool SwapH1MtWhenD3H1MtStackSouth = false;
    }

    public override void OnSettingsDraw()
    {
        ImGuiEx.Text("# How to determine left/right priority:");
        ImGuiEx.Text("Set players in clockwise priority order from north ranged DPS to northwest.");
        PriorityData.Draw();
        ImGui.Checkbox("StackSouth D3/H1/MT: swap H1 and MT", ref C.SwapH1MtWhenD3H1MtStackSouth);

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
            ApplyStackSouthSpecialPriority(priorityList);

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

    private void ApplyStackSouthSpecialPriority(List<IPlayerCharacter> priorityList)
    {
        if(!C.SwapH1MtWhenD3H1MtStackSouth)
            return;

        if(!IsD3H1MtFlareSet(priorityList))
            return;

        var h1Index = GetPrioritySlotIndex(priorityList, "H1");
        var mtIndex = GetPrioritySlotIndex(priorityList, "MT");

        if(h1Index < 0 || mtIndex < 0)
            return;

        var temporary = priorityList[h1Index];
        priorityList[h1Index] = priorityList[mtIndex];
        priorityList[mtIndex] = temporary;
    }

    private bool IsD3H1MtFlareSet(List<IPlayerCharacter> priorityList)
    {
        List<string> flareSlots = [];

        for(var i = 0; i < priorityList.Count && i < PrioritySlots.Length; i++)
        {
            if(_flarePos.Any(x => x.character.Address == priorityList[i].Address))
            {
                flareSlots.Add(PrioritySlots[i]);
            }
        }

        return flareSlots.Count == 3
            && flareSlots.Contains("D3")
            && flareSlots.Contains("H1")
            && flareSlots.Contains("MT");
    }

    private int GetPrioritySlotIndex(List<IPlayerCharacter> priorityList, string slot)
    {
        for(var i = 0; i < priorityList.Count && i < PrioritySlots.Length; i++)
        {
            if(PrioritySlots[i] == slot)
                return i;
        }

        return -1;
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

#### Priority

上から`D3,D4,H2,D2,ST,D1,H1,MT`

#### Configuration

優先度順に、D3へフレアマーカーが付与されなかった場合は「東 → 南 → 西」の順で誘導されます。  
D3へフレアマーカーが付与された場合は、D3を北へ固定したうえで、「東 → 西」の順で誘導されます。  

~~基本的には優先度順に従うことで自然な処理になりますが、フレアマーカー対象者が「H1（西）・D3（北）・MT（北西）」となった場合のみ、西のH1が東、北西のMTが西へ誘導される不自然な配置になります。~~  

~~そのため、D3へフレアマーカーが付与された際に、H1とMTの優先度を入れ替えるオプションを追加しています。~~  
~~基本的に**チェックすることを推奨**します。~~

ヒーラーは中央付近でヒールをしている都合上、通常の優先度のままでも問題ないかもしれません。  
実際の処理を見て、場合によってはD3,ヒーラー（H1/H2）,ヒーラーの両隣の組み合わせがフレア選出されたパターンのみ空気読み表示（ヒーラーと両隣のロールは東と西の両方に案内される）にすることも検討します。

- StackSouth D3/H1/MT:swap H1 and MT  
    **チェックしない**  

---

### P6 波動砲：リミッターカット

**P6 Limitter Cut Wave Cannon**  

波動砲：リミッターカットのガイドスクリプト  
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
>     ※ **自身のロール** がない場合は`Default Configuration`を選択

```json
~Lv2~{"Name":"P1 サークルプログラム 番号","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":40.0,"Match":"オメガは「サークルプログラム」の構え。"}],"ElementsL":[{"Name":"1st me","type":1,"offZ":2.76,"radius":0.0,"color":4294965504,"overlayBGColor":4294965504,"overlayTextColor":3355443200,"thicc":5.0,"overlayText":"1st","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3004],"refActorComparisonType":5,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"1st","type":1,"radius":0.0,"color":4294965504,"overlayBGColor":4294965504,"overlayTextColor":3355443200,"overlayVOffset":0.8,"overlayFScale":1.5,"thicc":5.0,"overlayText":"1","refActorRequireBuff":true,"refActorBuffId":[3004],"refActorComparisonType":1,"onlyVisible":true},{"Name":"2nd me","type":1,"offZ":2.76,"radius":0.0,"color":3364749567,"overlayBGColor":3364749567,"thicc":5.0,"overlayText":"2nd","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3005],"refActorComparisonType":5,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"2nd","type":1,"radius":0.0,"color":3364749567,"overlayBGColor":3364749567,"overlayVOffset":0.8,"overlayFScale":1.5,"thicc":5.0,"overlayText":"2","refActorRequireBuff":true,"refActorBuffId":[3005],"refActorComparisonType":1,"onlyVisible":true},{"Name":"3rd me","type":1,"offZ":2.76,"radius":0.0,"color":3372156928,"overlayBGColor":3372156928,"thicc":5.0,"overlayText":"3rd","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"3rd","type":1,"radius":0.0,"color":3372156928,"overlayBGColor":3372156928,"overlayVOffset":0.8,"overlayFScale":1.5,"thicc":5.0,"overlayText":"3","refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":1,"onlyVisible":true},{"Name":"4th me","type":1,"offZ":2.76,"radius":0.0,"color":3359113471,"overlayBGColor":3359113471,"thicc":5.0,"overlayText":"4th","refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"onlyVisible":true,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"4th","type":1,"radius":0.0,"color":3359113471,"overlayBGColor":3359113471,"overlayVOffset":0.8,"overlayFScale":1.5,"thicc":5.0,"overlayText":"4","refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 塔 配置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[2],"ElementsL":[{"Name":"塔 - 北","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayFScale":2.0,"thicc":3.0,"overlayText":"北 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":87.6,"DistanceMax":6.0},{"Name":"塔 - 東","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"東 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":112.4,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"塔 - 南","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayFScale":2.0,"thicc":3.0,"overlayText":"南 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":112.4,"DistanceMax":6.0},{"Name":"塔 - 西","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3369992447,"overlayFScale":2.0,"thicc":3.0,"overlayText":"西 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":87.6,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"Induced AOE / 靠近AOE","type":1,"Enabled":false,"radius":3.0,"color":4278255612,"fillIntensity":0.2,"overlayBGColor":3472883712,"overlayTextColor":4278255615,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":3.0,"refActorComparisonType":7,"includeRotation":true,"FaceMe":true,"refActorVFXPath":"vfx/lockon/eff/lockon5_t0h.avfx","refActorVFXMax":3000}]}
~Lv2~{"Name":"P1 サークルプログラム テザー 配置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[2],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":36.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":9.0}],"ElementsL":[{"Name":"塔 - 北","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"北 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":87.6,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 北","refX":100.0,"refY":87.6,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayFScale":2.0,"thicc":4.0,"overlayText":"北 - Tether"},{"Name":"塔 - 東","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"東 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":112.4,"DistanceSourceY":100.0,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 東","refX":112.4,"refY":100.0,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508725,"overlayFScale":2.0,"thicc":4.0,"overlayText":"東 - Tether"},{"Name":"塔 - 南","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"南 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":100.0,"DistanceSourceY":112.4,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 南","refX":100.0,"refY":112.4,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372218624,"overlayFScale":2.0,"thicc":4.0,"overlayText":"南 - Tether"},{"Name":"塔 - 西","type":1,"radius":2.5,"Donut":0.5,"color":4278255612,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayFScale":2.0,"thicc":3.0,"overlayText":"西 - Tower","refActorNPCID":2013245,"refActorComparisonType":4,"LimitDistance":true,"DistanceSourceX":87.6,"DistanceSourceY":100.0,"DistanceMax":6.0,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"線 - 西","refX":87.6,"refY":100.0,"radius":2.5,"Donut":0.5,"color":3355639552,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372024063,"overlayFScale":2.0,"thicc":4.0,"overlayText":"西 - Tether"}]}
~Lv2~{"Name":"P1 サークルプログラム 塔 予告-通知","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":40.0,"Match":"オメガは「サークルプログラム」の構え。"}],"ElementsL":[{"Name":"Tower Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278253567,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TOWER !!! <<<","refActorRequireBuff":true,"refActorBuffId":[3456],"refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true},{"Name":"Tower 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278253567,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TOWER","refActorRequireBuff":true,"refActorBuffId":[3456],"refActorUseBuffTime":true,"refActorBuffTimeMin":11.0,"refActorBuffTimeMax":17.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":13.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":5.0}],"ElementsL":[{"Name":"","type":1,"refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 予告2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":12.0}],"ElementsL":[{"Name":"","type":1,"refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TETHER","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":9.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":18.0}],"ElementsL":[{"Name":"","type":1,"refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3451],"refActorComparisonType":5,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 予告3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":21.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(8s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":8.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TETHER","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 予告4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":30.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(8s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":8.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether 予告","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":"NEXT -> TETHER","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知3 (刻印5s以下)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":5.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":27.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(5s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":5.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知4 (刻印5s以下)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":5.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":36.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and 刻印(5s↓)","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorUseBuffTime":true,"refActorBuffTimeMax":5.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 線 通知3-4 (刻印なし)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":18.0,"Match":"オメガは「サークルプログラム」の構え。","MatchDelay":27.0}],"ElementsL":[{"Name":"notサークルプログラム","type":1,"refActorRequireBuff":true,"refActorBuffId":[1624,1704,3456],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and not刻印","type":1,"refActorRequireBuff":true,"refActorBuffId":[2483,2485,2534],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"Tether Reminder","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":2684354560,"overlayTextColor":4278255383,"overlayVOffset":2.0,"overlayFScale":2.0,"thicc":0.0,"overlayText":">>> !!! TETHER !!! <<<","refActorUseBuffTime":true,"refActorBuffTimeMax":11.0,"refActorComparisonType":1,"refActorType":1,"onlyVisible":true}]}
~Lv2~{"Name":"P1 サークルプログラム 初期位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":"オメガは「サークルプログラム」の構え。"}],"ElementsL":[{"Name":"3","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"3","refX":100.0,"refY":105.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":8.0,"tether":true},{"Name":"3以外","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3006],"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"3以外","refX":100.0,"refY":112.5,"refZ":-5.456968E-12,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":8.0,"tether":true}]}
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
~Lv2~{"Name":"P2 連携プログラムLB C集合","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":"(7635>31545)"}],"ElementsL":[{"Name":"","refX":100.0,"refY":106.5,"radius":1.0,"color":3355508496,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508503,"overlayFScale":2.0,"thicc":8.0,"overlayText":"集合","tether":true}]}
~Lv2~{"Name":"P2 Optimized Sagittarius Arrow","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"","type":3,"refY":45.0,"radius":5.0,"color":4278190335,"fillIntensity":0.1,"thicc":5.0,"refActorNPCNameID":7633,"refActorRequireCast":true,"refActorCastId":[31539],"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Enabled":false,"Name":"P2 Playstation new toolbox - Close","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[3],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":13.0,"MatchIntl":{"En":"You suffer the effect of Mid Glitch.","Jp":"「グリッチ：ミドル」の効果。"},"MatchDelay":3.0}],"ElementsL":[{"Name":" right","type":1,"offX":-11.0,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-11.0,"offY":60.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-11.0,"offY":30.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-11.0,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":60.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":30.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":11.0,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Enabled":false,"Name":"P2 Playstation new toolbox - far (right flip)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[3],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":13.0,"MatchIntl":{"En":"You suffer the effect of Remote Glitch.","Jp":"「グリッチ：ファー」の効果。"},"MatchDelay":3.0}],"ElementsL":[{"Name":" right","type":1,"offX":-12.0,"offY":60.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-18.5,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-18.5,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" right","type":1,"offX":-12.0,"offY":30.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":12.0,"offY":30.0,"radius":1.0,"color":4278190335,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":18.5,"offY":40.0,"radius":1.0,"color":4294967040,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294967040,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":18.5,"offY":50.0,"radius":1.0,"color":4278255360,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4278255360,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":" left","type":1,"offX":12.0,"offY":60.0,"radius":1.0,"color":4294902015,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":0,"overlayTextColor":4294902015,"overlayFScale":2.0,"thicc":5.0,"overlayText":"","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Enabled":false,"Name":"P2 ブレードダンス","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"オメガM Tether","type":1,"radius":0.0,"color":3370188544,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorComparisonType":4,"tether":true},{"Name":"オメガM 捨て位置1","type":1,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31540],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877},{"Name":"オメガF Tether","type":1,"radius":0.0,"color":3372155131,"fillIntensity":0.5,"thicc":8.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorComparisonType":4,"tether":true},{"Name":"オメガF 捨て位置1","type":1,"offY":10.0,"radius":0.5,"color":3355508509,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7634,"refActorRequireCast":true,"refActorCastId":[31541],"refActorUseCastTime":true,"refActorCastTimeMax":8.0,"refActorUseOvercast":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":5.2359877}]}
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
~Lv2~{"Name":"P2 シールドバッシュ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"a6015c21-36b9-48cf-abd9-d1ffd317317f","Name":"MT","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":4.0,"Donut":1.0,"color":3355503359,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":4.0,"Donut":1.0,"color":3355503359,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true},{"Name":"シールドコンボS ST","type":1,"Enabled":false,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"Enabled":false,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]},{"Guid":"4cc3c954-2c1f-4abe-a886-8c836f07adbe","Name":"ST","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"Enabled":false,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true},{"Name":"シールドコンボS タンク以外","type":1,"Enabled":false,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]},{"Guid":"2a6e1960-6394-4e7a-862a-958f95376e05","Name":"DPS and Healer","Elements":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"Enabled":false,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"Enabled":false,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true,"tether":true}]}],"ElementsL":[{"Name":"シールドコンボS キャスト中","type":1,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"シールドコンボS 近1","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1100,"refActorComparisonType":4},{"Name":"シールドコンボS 近2","type":1,"radius":5.0,"color":3355503359,"fillIntensity":0.1,"thicc":4.0,"refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"TargetAlteration":1101,"refActorComparisonType":4},{"Name":"シールドコンボS MT","type":1,"offX":3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayFScale":2.0,"thicc":4.0,"overlayText":"MT","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS ST","type":1,"offX":-3.0,"offY":15.0,"radius":1.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"ST","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true},{"Name":"シールドコンボS タンク以外","type":1,"offY":22.0,"radius":2.0,"color":3355508521,"fillIntensity":0.1,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"overlayFScale":2.0,"thicc":4.0,"overlayText":"タンク以外","refActorNPCID":7633,"refActorRequireCast":true,"refActorCastId":[31527],"refActorComparisonType":4,"includeRotation":true}]}
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
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が散開 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371237631,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"Spread","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"other NAME","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が頭割り NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372218624,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"Stack","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"other NAME","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が無職 <2>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<2> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<2>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<2> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<2>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<2>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<2>"],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が無職 <3>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<3> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<3>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<3> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<3>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<3>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<3>"],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が無職 <4>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<4> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<4>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<4> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<4>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<4>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<4>"],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が無職 <5>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<5> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<5>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<5> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<5>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<5>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<5>"],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が無職 <6>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<6> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<6>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<6> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<6>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<6>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<6>"],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が無職 <7>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<7> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<7>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<7> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<7>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<7>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<7>"],"refActorComparisonType":5}]}
~Lv2~{"Enabled":false,"Name":"P3 開幕デバフ 自分が無職 <8>無職 NAME","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"DCond":5,"ElementsL":[{"Name":"散開 (10-19s)","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMin":10.0,"refActorBuffTimeMax":19.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"self not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"and self not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"refActorType":1,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<8> not 散開","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<8>"],"refActorRequireBuff":true,"refActorBuffId":[3425],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<8> and not 頭割り","type":1,"radius":0.0,"color":1358954495,"overlayBGColor":4294902015,"overlayTextColor":4278190080,"overlayVOffset":1.7,"overlayFScale":1.5,"thicc":0.0,"overlayText":"SPREAD","refActorPlaceholder":["<8>"],"refActorRequireBuff":true,"refActorBuffId":[3426],"refActorBuffTimeMin":15.0,"refActorBuffTimeMax":9999.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"self","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"無職","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"refActorType":1},{"Name":"<8>","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3370974976,"overlayVOffset":2.0,"overlayFScale":2.0,"overlayText":"$NAME","refActorPlaceholder":["<8>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 Stack/spread debuffs","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122,990],"ElementsL":[{"Name":"stack late AOE","type":1,"radius":5.0,"Donut":0.5,"color":4294965504,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3426],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0},{"Name":"spread late AOE","type":1,"radius":5.5,"color":4294705407,"Filled":false,"fillIntensity":0.21568628,"thicc":4.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3425],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0}]}
~Lv2~{"Name":"P3 Hands explosion - 1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Freezing":true,"FreezeFor":13.5,"IntervalBetweenFreezes":20.0,"Triggers":[{"Type":2,"Duration":1.0,"MatchIntl":{"En":"Final analysis. Drastic overhaul of combat logic required.","Jp":"最終解析……戦略戦術ロジックを大幅に変更……","De":"Abschlussanalyse: Grundsätzlich neue Kampflogik erforderlich. Initiiere Rekonfigurationssequenz."}}],"ElementsL":[{"Name":"","type":1,"radius":11.0,"color":4278255103,"Filled":false,"fillIntensity":0.3,"thicc":4.0,"refActorNameIntl":{"En":" arm unit","Jp":"トアームユニット"},"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0}]}
~Lv2~{"Name":"P3 Hands explosion - 2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Freezing":true,"FreezeFor":5.0,"IntervalBetweenFreezes":5.0,"FreezeDisplayDelay":1.0,"Triggers":[{"Type":2,"Duration":1.0,"Match":">31566)","MatchDelay":0.5,"FireOnce":true}],"ElementsL":[{"Name":"","type":1,"radius":11.0,"color":4278255103,"Filled":false,"fillIntensity":0.3,"thicc":4.0,"refActorNameIntl":{"En":" arm unit","Jp":"トアームユニット","De":"Arm"},"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[31566],"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0}]}
~Lv2~{"Name":"P3 アームユニット","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"UseTriggers":true,"Triggers":[{"Type":2,"Duration":30.0,"MatchIntl":{"Jp":"最終解析……戦略戦術ロジックを大幅に変更……"}}],"ElementsL":[{"Name":"レフトアームユニット","type":1,"radius":11.0,"fillIntensity":0.2,"thicc":4.0,"refActorNPCNameID":7637,"refActorRequireCast":true,"refActorCastId":[31566],"refActorComparisonType":6,"onlyVisible":true},{"Name":"ライトアームユニット","type":1,"radius":11.0,"fillIntensity":0.2,"thicc":4.0,"refActorNPCNameID":7638,"refActorRequireCast":true,"refActorCastId":[31566],"refActorComparisonType":6,"onlyVisible":true}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：サークル_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：シェア_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：デグレート_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 ハローワールド クリティカルバグ：パフォーマンス_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorComparisonType":5},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorComparisonType":5},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorComparisonType":5},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorComparisonType":5},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorComparisonType":5},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorComparisonType":5},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorComparisonType":5},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorComparisonType":5},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorComparisonType":5},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorComparisonType":5}]}
~Lv2~{"Name":"P3 Hello World highlights","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"Stack","type":1,"radius":5.0,"Donut":1.0,"color":3372217088,"fillIntensity":0.39215687,"overlayBGColor":3355443200,"overlayTextColor":3372215296,"thicc":4.0,"overlayText":"Stack","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"onlyTargetable":true},{"Name":"Red rot","type":1,"radius":0.5,"Donut":0.6,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3526,3438],"refActorBuffTimeMax":10.0,"FillStep":0.2},{"Name":"Blue rot","type":1,"radius":0.5,"Donut":0.6,"color":4294901760,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3429,3439],"refActorBuffTimeMax":10.0,"FillStep":0.2},{"Name":"Defamation near","type":3,"refY":2.0,"offY":-2.0,"radius":0.0,"color":4294902015,"thicc":10.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"FillStep":0.2},{"Name":"Defamation near","type":3,"refX":2.0,"offX":-2.0,"radius":0.0,"color":4294902015,"thicc":10.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"FillStep":0.2},{"Name":"Defamation FAR","type":1,"radius":19.0,"Donut":1.0,"color":4294902015,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3525],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Red rot - almost exploding","type":1,"radius":5.0,"color":1342177535,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3526],"refActorUseBuffTime":true,"refActorBuffTimeMax":3.0,"FillStep":0.2},{"Name":"Blue rot - almost exploding","type":1,"radius":5.0,"color":1358888960,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3429],"refActorUseBuffTime":true,"refActorBuffTimeMax":3.0,"FillStep":0.2},{"Name":"Stack arrow L","type":3,"Enabled":false,"refX":1.0,"refY":-5.0,"offY":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow L","type":3,"Enabled":false,"refX":-1.0,"refY":-5.0,"offY":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow T","type":3,"Enabled":false,"refX":-5.0,"refY":1.0,"offX":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow T","type":3,"Enabled":false,"refX":-5.0,"refY":-1.0,"offX":-4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow R","type":3,"Enabled":false,"refX":1.0,"refY":5.0,"offY":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow R","type":3,"Enabled":false,"refX":-1.0,"refY":5.0,"offY":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow B","type":3,"Enabled":false,"refX":5.0,"refY":1.0,"offX":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true},{"Name":"Stack arrow B","type":3,"Enabled":false,"refX":5.0,"refY":-1.0,"offX":4.0,"radius":0.0,"color":3355506687,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3524],"refActorUseBuffTime":true,"refActorBuffTimeMax":10.0,"includeRotation":true,"onlyTargetable":true}]}
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
~Lv2~{"Name":"P5 デルタ 目玉ビーム","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":">31624)","MatchDelay":8.0}],"ElementsL":[{"Name":"","type":3,"refY":35.0,"offY":65.0,"radius":8.0,"color":4294966272,"fillIntensity":0.3,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":4.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":3,"offY":35.0,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":4.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Name":"P5 デルタ 青線(ファー) 立ち位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":">31624)","MatchDelay":8.0}],"ElementsL":[{"Name":"Outer","type":3,"refX":3.0,"refY":9.0,"offX":-3.0,"offY":9.0,"radius":0.0,"color":3372154880,"thicc":5.0,"refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true},{"Name":"Inner","type":3,"refX":7.0,"refY":11.0,"offX":-7.0,"offY":11.0,"radius":0.0,"color":3372154880,"thicc":5.0,"refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true},{"Name":"Swapper","type":1,"Enabled":false,"offY":11.0,"radius":0.0,"color":3372154880,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"thicc":0.0,"overlayText":"Swappers + go mid","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true},{"Name":"コードスメール：ファー","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371826944,"thicc":0.0,"overlayText":"ファー","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3441,3504],"refActorComparisonType":5}]}
~Lv2~{"Name":"P5 デルタ 緑線(ニアー) 立ち位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":">31624)","MatchDelay":8.0}],"ElementsL":[{"Name":"Outer","type":3,"refX":10.0,"refY":9.0,"offX":-10.0,"offY":9.0,"radius":0.0,"color":3355508480,"thicc":5.0,"refActorModelID":3775,"refActorComparisonType":1,"includeRotation":true},{"Name":"Inner","type":3,"refX":10.0,"refY":11.0,"offX":-10.0,"offY":11.0,"radius":0.0,"color":3355508480,"thicc":5.0,"refActorModelID":3775,"refActorComparisonType":1,"includeRotation":true},{"Name":"Swapper","type":1,"Enabled":false,"offY":11.0,"radius":0.0,"color":3372154880,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"thicc":0.0,"overlayText":"Swappers","refActorModelID":3775,"refActorComparisonType":1,"includeRotation":true},{"Name":"コードスメール：ニアー","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508564,"thicc":0.0,"overlayText":"ニアー","refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3440,3503],"refActorComparisonType":5}]}
~Lv2~{"Name":"P5 D1 ロケットパンチ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"黄","type":1,"radius":0.0,"Donut":0.61,"color":3355508223,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355506687,"thicc":4.0,"overlayText":"ロケットパンチ","refActorModelID":2375,"refActorRequireCast":true,"refActorCastId":[31482],"refActorComparisonType":1,"includeHitbox":true,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"青","type":1,"radius":0.0,"Donut":0.61,"color":3368550144,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3368550144,"thicc":4.0,"overlayText":"ロケットパンチ","refActorModelID":2374,"refActorRequireCast":true,"refActorCastId":[31482],"refActorComparisonType":1,"includeHitbox":true,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"黄","type":1,"radius":0.0,"Donut":0.61,"color":3355508223,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355506687,"thicc":4.0,"overlayText":"ロケットパンチ","refActorModelID":2375,"refActorComparisonType":1,"includeHitbox":true},{"Name":"青","type":1,"radius":0.0,"Donut":0.61,"color":3368550144,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3368550144,"thicc":4.0,"overlayText":"ロケットパンチ","refActorModelID":2374,"refActorComparisonType":1,"includeHitbox":true}]}
~Lv2~{"Name":"P5 D1 Optical unit finder - early beam","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":28.0,"Match":">31624)","MatchDelay":8.0}],"ElementsL":[{"Name":"","type":3,"refY":25.0,"refZ":20.0,"offY":25.0,"radius":2.0,"color":4294966272,"fillIntensity":0.3,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":3,"refX":-25.0,"refZ":20.0,"offX":-25.0,"radius":2.0,"color":4294966272,"fillIntensity":0.3,"overlayBGColor":0,"overlayTextColor":4278190080,"overlayFScale":7.0,"thicc":5.0,"overlayText":"EYE","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true,"AdditionalRotation":1.5707964}]}
~Lv2~{"Name":"P5 D1 green spot reminder","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":">31624)","MatchDelay":25.0}],"ElementsL":[{"Name":"","type":1,"offX":-10.0,"offY":32.0,"radius":2.0,"color":4278298880,"fillIntensity":0.5,"overlayBGColor":1879857664,"thicc":5.0,"overlayText":"Green","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":1,"offY":32.0,"radius":2.0,"color":4278298880,"fillIntensity":0.5,"overlayBGColor":1879857664,"thicc":5.0,"overlayText":"Green","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":1,"offX":-10.0,"offY":58.0,"radius":2.0,"color":4278298880,"fillIntensity":0.5,"overlayBGColor":1879857664,"thicc":5.0,"overlayText":"Green","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":1,"offY":58.0,"radius":2.0,"color":4278298880,"fillIntensity":0.5,"overlayBGColor":1879857664,"thicc":5.0,"overlayText":"Green","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":3,"refY":32.0,"offY":58.0,"radius":0.0,"color":4278298880,"fillIntensity":0.5,"overlayBGColor":1879857664,"thicc":5.0,"overlayText":"Green","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true},{"Name":"","type":3,"refX":-10.0,"refY":32.0,"offX":-10.0,"offY":58.0,"radius":0.0,"color":4278298880,"fillIntensity":0.5,"overlayBGColor":1879857664,"thicc":5.0,"overlayText":"Green","refActorNPCNameID":7640,"refActorComparisonType":6,"includeRotation":true}]}
~Lv2~{"Name":"P5 D1 Arms Turning Bait Spots","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":120.0,"Match":">31624)"}],"ElementsL":[{"Name":"right circle(レフトアームユニット)","type":1,"offY":3.0,"radius":0.5,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7637,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.3962634,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000},{"Name":"right line(レフトアームユニット)","type":3,"offY":3.0,"radius":0.0,"color":3355508533,"fillIntensity":0.345,"thicc":4.0,"refActorNPCID":7637,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.3962634,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000},{"Name":"left circle(レフトアームユニット)","type":1,"offY":3.0,"radius":0.5,"color":3355508490,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7637,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":4.886922,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"left line(レフトアームユニット)","type":3,"offY":3.0,"radius":0.0,"color":3355508533,"fillIntensity":0.345,"thicc":4.0,"refActorNPCID":7637,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":4.886922,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"right circle(ライトアームユニット)","type":1,"offY":3.0,"radius":0.5,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7638,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.3962634,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000},{"Name":"right line(ライトアームユニット)","type":3,"offY":3.0,"radius":0.0,"color":3355508533,"fillIntensity":0.345,"thicc":4.0,"refActorNPCID":7638,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":1.3962634,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000},{"Name":"left circle(ライトアームユニット)","type":1,"offY":3.0,"radius":0.5,"color":3355508490,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":7638,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":4.886922,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"left line(ライトアームユニット)","type":3,"offY":3.0,"radius":0.0,"color":3355508533,"fillIntensity":0.345,"thicc":4.0,"refActorNPCID":7638,"refActorPlaceholder":[],"refActorComparisonAnd":true,"refActorComparisonType":4,"includeRotation":true,"AdditionalRotation":4.886922,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000}]}
~Lv2~{"Name":"P5 D1 Oversampled Wave Cannon","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"ElementsL":[{"Name":"Self right","type":4,"refY":40.0,"radius":4.5,"coneAngleMax":180,"color":4294705407,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":4294967295,"overlayFScale":3.0,"thicc":5.0,"overlayText":"→","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3452],"refActorComparisonType":5,"refActorType":1,"includeRotation":true,"FillStep":10.0},{"Name":"Self left","type":4,"refY":40.0,"radius":4.5,"coneAngleMin":180,"coneAngleMax":360,"color":4294705407,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":4294967295,"overlayFScale":3.0,"thicc":4.0,"overlayText":"←","refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3453],"refActorComparisonType":5,"refActorType":1,"includeRotation":true,"FillStep":10.0},{"Name":"Omega Right","type":3,"refX":10.0,"refY":40.0,"offX":10.0,"radius":10.0,"color":4278255612,"fillIntensity":0.1,"thicc":4.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorUseCastTime":true,"refActorCastTimeMin":3.0,"refActorCastTimeMax":999.0,"refActorComparisonType":6,"includeRotation":true,"FillStep":2.0},{"Name":"Omega Right - Alignment spot","type":3,"Enabled":false,"refX":-12.0,"refY":30.0,"offX":-12.0,"offY":15.0,"radius":5.0,"color":4278190335,"fillIntensity":0.5,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31638],"refActorUseCastTime":true,"refActorCastTimeMin":3.0,"refActorCastTimeMax":999.0,"refActorComparisonType":6,"includeRotation":true,"FillStep":2.0},{"Name":"Omega Left","type":3,"refX":-10.0,"refY":40.0,"offX":-10.0,"radius":10.0,"color":4278255612,"fillIntensity":0.1,"thicc":4.0,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorUseCastTime":true,"refActorCastTimeMin":3.0,"refActorCastTimeMax":999.0,"refActorComparisonType":6,"includeRotation":true,"FillStep":2.0},{"Name":"Omega Left - Alignment spot","type":3,"Enabled":false,"refX":12.0,"refY":30.0,"offX":12.0,"offY":15.0,"radius":5.0,"color":4278190335,"fillIntensity":0.5,"refActorNPCNameID":7636,"refActorRequireCast":true,"refActorCastId":[31639],"refActorUseCastTime":true,"refActorCastTimeMin":3.0,"refActorCastTimeMax":999.0,"refActorComparisonType":6,"includeRotation":true,"FillStep":2.0}]}
~Lv2~{"Name":"P5 D1 - Oversampled Wave Cannon explosion","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"MaxDistance":7.2,"UseDistanceLimit":true,"DistanceLimitType":1,"Triggers":[{"Type":2,"Duration":5.0,"Match":">31638)","MatchDelay":5.0},{"Type":2,"Duration":5.0,"Match":">31639)","MatchDelay":5.0}],"ElementsL":[{"Name":"Self","type":1,"radius":7.0,"color":4278255582,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorRequireBuff":true,"refActorBuffId":[3440,1672],"refActorType":1},{"Name":"Others","type":1,"radius":7.0,"color":4278255582,"fillIntensity":0.3,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[3440,1672],"refActorComparisonType":5}]}
~Lv2~{"Name":"P5 D1 Stack reminder","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":4.0,"Match":">31624)","MatchDelay":34.2}],"ElementsL":[{"Name":"Don't stack","type":1,"color":4278190335,"fillIntensity":0.5,"overlayBGColor":4278190335,"overlayTextColor":3355443200,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"DON'T STACK!","refActorRequireBuff":true,"refActorBuffId":[2534],"refActorType":1},{"Name":"Stack","type":1,"color":4278255426,"fillIntensity":0.5,"overlayBGColor":4278255383,"overlayTextColor":3355443200,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":">>> stack <<<","refActorRequireBuff":true,"refActorBuffId":[2534,1672],"refActorRequireBuffsInvert":true,"refActorType":1}]}
~Lv2~{"Name":"P5 D1 Omega right","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":" (7695>31637)"}],"ElementsL":[{"Name":"OMJ","type":3,"offY":-27.0,"radius":50.0,"color":4278190335,"fillIntensity":0.2,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"AdditionalRotation":1.8325957}]}
~Lv2~{"Name":"P5 D1 Omega left","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":" (7695>31636)"}],"ElementsL":[{"Name":"omj","type":3,"refY":27.0,"radius":50.0,"color":4278190335,"fillIntensity":0.2,"thicc":4.0,"refActorNPCID":7695,"refActorComparisonType":4,"includeRotation":true,"onlyVisible":true,"AdditionalRotation":1.3089969}]}
~Lv2~{"Name":"P5 D1 Hello near/far world distance check","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":90.0,"Match":">31624)"}],"ElementsL":[{"Name":"","type":1,"Enabled":false,"radius":8.0,"color":4294901760,"fillIntensity":0.5,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3442,3443],"refActorUseBuffTime":true,"refActorBuffTimeMax":8.0},{"Name":"","type":1,"radius":0.0,"color":4294901760,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":4278255413,"overlayVOffset":2.0,"thicc":0.0,"overlayText":"NEAR WORLD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3442],"refActorUseBuffTime":true,"refActorBuffTimeMax":15.0},{"Name":"","type":1,"radius":0.0,"color":4294901760,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":4294180608,"overlayVOffset":2.0,"thicc":0.0,"overlayText":"FAR WORLD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3443],"refActorUseBuffTime":true,"refActorBuffTimeMax":15.0}]}
~Lv2~{"Name":"P5 D1 Arms First Attack Line","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":50.0,"Match":">31624)"}],"ElementsL":[{"Name":"Arms Line RIGHT","type":3,"refY":19.0,"offY":-1.0,"radius":4.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":7638,"refActorRequireCast":true,"refActorCastId":[31600],"refActorComparisonType":6,"includeRotation":true,"FillStep":2.0},{"Name":"Arms Line LEFT","type":3,"refY":19.0,"offY":-1.0,"radius":4.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":7637,"refActorRequireCast":true,"refActorCastId":[31600],"refActorComparisonType":6,"includeRotation":true,"FillStep":2.0}]}
~Lv2~{"Name":"P5 D1 Omega - final positions left HT","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":" (7695>31636)"}],"ElementsL":[{"Name":"LASOR","type":3,"refX":15.0,"refY":43.0,"offX":15.0,"offY":-10.0,"radius":15.0,"color":1342242815,"overlayBGColor":4294967295,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Broken green","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":6.021386},{"Name":"green near omega","type":1,"offY":1.78,"radius":1.0,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"Green","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":5.3965583},{"Name":"green far from omega","type":1,"offY":37.1,"radius":1.0,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"Green","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":5.98997},{"Name":"near source","type":1,"offY":20.8,"radius":1.0,"color":4278225677,"overlayBGColor":4278220288,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Near debuff","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":5.9934607},{"Name":"near taker inner","type":1,"offY":24.8,"radius":1.0,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Near taker (blue)","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":5.6409044},{"Name":"near taker outer","type":1,"offY":30.44,"radius":1.0,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Near taker (blue)","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":5.609488},{"Name":"broken tether chill spot","type":1,"offY":34.54,"radius":1.0,"color":4294967295,"overlayBGColor":4294967295,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Broken green (chill)","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":5.801474},{"Name":"far source","type":1,"offY":14.38,"radius":1.0,"color":4288326400,"overlayBGColor":4285363712,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Far debuff","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":5.1696653}]}
~Lv2~{"Name":"P5 D1 Omega - final positions right HT","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":" (7695>31637)"}],"ElementsL":[{"Name":"LASOR","type":3,"refX":15.0,"refY":10.0,"offX":15.0,"offY":-43.0,"radius":15.0,"color":1342242815,"overlayBGColor":4294967295,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Broken green","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":3.403392},{"Name":"green near omega","type":1,"offY":1.78,"radius":1.0,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"Green","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":0.8953539},{"Name":"green far from omega","type":1,"offY":37.1,"radius":1.0,"color":3355508503,"overlayBGColor":2617245696,"overlayTextColor":4278255360,"thicc":3.0,"overlayText":"Green","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":0.2932153},{"Name":"near source","type":1,"offY":20.74,"radius":1.0,"color":4278225677,"overlayBGColor":4278220288,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Near debuff","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":0.3333579},{"Name":"far source","type":1,"offY":14.28,"radius":1.0,"color":4288326400,"overlayBGColor":4285363712,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Far debuff","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":1.1623893},{"Name":"near taker inner","type":1,"offY":22.44,"radius":1.0,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Near taker (blue)","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":0.73129296},{"Name":"near taker outer","type":1,"offY":27.78,"radius":1.0,"color":4278237622,"overlayBGColor":4278236333,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Near taker (blue)","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":0.8080874},{"Name":"broken tether chill spot","type":1,"offY":34.54,"radius":1.0,"color":4294967295,"overlayBGColor":4294967295,"overlayTextColor":4278190080,"thicc":5.0,"overlayText":"Broken green (chill)","refActorModelID":3771,"refActorComparisonType":1,"includeRotation":true,"AdditionalRotation":0.48171088}]}
~Lv2~{"Enabled":false,"Name":"P5 D2 ニアファー開始位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":12.0,"Match":"(12257>32788)","MatchDelay":43.0}],"ElementsL":[{"Name":"時計_北","type":1,"offX":6.5,"offY":-17.5,"color":4294967295,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"overlayVOffset":6.0,"overlayFScale":5.0,"thicc":5.0,"overlayText":"①②③","refActorComparisonType":7,"includeRotation":true,"onlyVisible":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000},{"Name":"反時計_南","type":1,"offX":6.5,"offY":17.5,"color":4294967295,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"overlayVOffset":6.0,"overlayFScale":5.0,"thicc":5.0,"overlayText":"④⑤⑥無職ニアファー","refActorComparisonType":7,"includeRotation":true,"onlyVisible":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"反時計_北","type":1,"offX":-6.5,"offY":-17.5,"color":4294967295,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"overlayVOffset":6.0,"overlayFScale":5.0,"thicc":5.0,"overlayText":"①②③","refActorComparisonType":7,"includeRotation":true,"onlyVisible":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"時計_南","type":1,"offX":-6.5,"offY":17.5,"color":4294967295,"Filled":false,"fillIntensity":0.39215687,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"overlayVOffset":6.0,"overlayFScale":5.0,"thicc":5.0,"overlayText":"④⑤⑥無職ニアファー","refActorComparisonType":7,"includeRotation":true,"onlyVisible":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000}]}
~Lv2~{"Name":"P5 - Playstation Partner ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":35.0,"Match":"VFX vfx/lockon/eff/z3oz_firechain_01c.avfx spawned on me npc"}],"ElementsL":[{"Name":"","type":1,"radius":0.0,"color":4278190259,"overlayBGColor":0,"overlayTextColor":4278190259,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_01c.avfx","refActorVFXMax":33000}]}
~Lv2~{"Name":"P5 - Playstation Partner ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":35.0,"Match":"VFX vfx/lockon/eff/z3oz_firechain_03c.avfx spawned on me npc"}],"ElementsL":[{"Name":"","type":1,"radius":0.0,"color":4290904258,"overlayBGColor":0,"overlayTextColor":4290904258,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_03c.avfx","refActorVFXMax":33000}]}
~Lv2~{"Name":"P5 - Playstation Partner ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":35.0,"Match":"VFX vfx/lockon/eff/z3oz_firechain_04c.avfx spawned on me npc"}],"ElementsL":[{"Name":"","type":1,"radius":0.0,"color":4294932224,"overlayBGColor":0,"overlayTextColor":4294932224,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_04c.avfx","refActorVFXMax":33000}]}
~Lv2~{"Name":"P5 - Playstation Partner ","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":35.0,"Match":"VFX vfx/lockon/eff/z3oz_firechain_02c.avfx spawned on me npc"}],"ElementsL":[{"Name":"","type":1,"radius":0.0,"color":4278236428,"overlayBGColor":0,"overlayTextColor":4278236428,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":4.0,"overlayText":"","refActorComparisonType":7,"tether":true,"refActorVFXPath":"vfx/lockon/eff/z3oz_firechain_02c.avfx","refActorVFXMax":33000}]}
~Lv2~{"Name":"P5 D3 - M/F 1st clones attacks","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Freezing":true,"FreezeFor":12.2,"Triggers":[{"Type":2,"Duration":1.0,"Match":">32789)","MatchDelay":10.7}],"ElementsL":[{"Name":"Omega-M shield","type":1,"radius":10.0,"Donut":20.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15721,"refActorComparisonType":3,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-M blade","type":1,"radius":10.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15721,"refActorComparisonType":3,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"AdditionalRotation":1.5707964,"refActorUseTransformation":true},{"Name":"Omega-F feetfighter","type":3,"refX":16.0,"refY":40.0,"offX":16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-F feetfighter","type":3,"refX":-16.0,"refY":40.0,"offX":-16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4}]}
~Lv2~{"Name":"P5 D3 - M/F 2nd clones attacks","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Freezing":true,"FreezeFor":4.8,"FreezeDisplayDelay":0.73,"Triggers":[{"Type":2,"Duration":0.5,"Match":">32789)","MatchDelay":22.3}],"ElementsL":[{"Name":"Omega-M shield","type":1,"radius":10.0,"Donut":20.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15721,"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[13061,13062,13063,13103,13104,13105,31530,31531,31532,13059,13060,13106,13107,31533,13043,13055,13097,13098,31526,13056,13096,31525],"refActorComparisonType":3,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-M blade","type":1,"radius":10.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15721,"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[13061,13062,13063,13103,13104,13105,31530,31531,31532,13059,13060,13106,13107,31533,13043,13055,13097,13098,31526,13056,13096,31525],"refActorComparisonType":3,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[13061,13062,13063,13103,13104,13105,31530,31531,31532,13059,13060,13106,13107,31533,13043,13055,13097,13098,31526,13056,13096,31525],"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[13061,13062,13063,13103,13104,13105,31530,31531,31532,13059,13060,13106,13107,31533,13043,13055,13097,13098,31526,13056,13096,31525],"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"AdditionalRotation":1.5707964,"refActorUseTransformation":true},{"Name":"Omega-F feetfighter","type":3,"refX":16.0,"refY":40.0,"offX":16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[13061,13062,13063,13103,13104,13105,31530,31531,31532,13059,13060,13106,13107,31533,13043,13055,13097,13098,31526,13056,13096,31525],"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-F feetfighter","type":3,"refX":-16.0,"refY":40.0,"offX":-16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15722,"refActorRequireCast":true,"refActorCastReverse":true,"refActorCastId":[13061,13062,13063,13103,13104,13105,31530,31531,31532,13059,13060,13106,13107,31533,13043,13055,13097,13098,31526,13056,13096,31525],"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4}]}
~Lv2~{"Name":"P5 D3 Diffuse Wave Cannon","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"Diffuse sides 1","type":4,"radius":20.0,"coneAngleMin":30,"coneAngleMax":150,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31644],"refActorUseCastTime":true,"refActorCastTimeMax":8.8,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true},{"Name":"Diffuse sides 1","type":4,"radius":20.0,"coneAngleMin":210,"coneAngleMax":330,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31644],"refActorUseCastTime":true,"refActorCastTimeMax":8.8,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true},{"Name":"Diffuse sides 2","type":4,"radius":20.0,"coneAngleMin":30,"coneAngleMax":150,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31644],"refActorUseCastTime":true,"refActorCastTimeMin":8.8,"refActorCastTimeMax":13.0,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":1.5707964},{"Name":"Diffuse sides 2","type":4,"radius":20.0,"coneAngleMin":210,"coneAngleMax":330,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31644],"refActorUseCastTime":true,"refActorCastTimeMin":8.8,"refActorCastTimeMax":13.0,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":1.5707964},{"Name":"Diffuse sides 1","type":4,"radius":20.0,"coneAngleMin":30,"coneAngleMax":150,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31643],"refActorUseCastTime":true,"refActorCastTimeMax":8.8,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":1.5707964},{"Name":"Diffuse sides 1","type":4,"radius":20.0,"coneAngleMin":210,"coneAngleMax":330,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31643],"refActorUseCastTime":true,"refActorCastTimeMax":8.8,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":1.5707964},{"Name":"Diffuse sides 2","type":4,"radius":20.0,"coneAngleMin":30,"coneAngleMax":150,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31643],"refActorUseCastTime":true,"refActorCastTimeMin":8.8,"refActorCastTimeMax":13.0,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true},{"Name":"Diffuse sides 2","type":4,"radius":20.0,"coneAngleMin":210,"coneAngleMax":330,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":14669,"refActorRequireCast":true,"refActorCastId":[31643],"refActorUseCastTime":true,"refActorCastTimeMin":8.8,"refActorCastTimeMax":13.0,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true},{"Name":"dbg","type":3,"Enabled":false,"refY":5.0,"radius":0.66,"refActorDataID":14669,"refActorUseCastTime":true,"refActorCastTimeMin":8.8,"refActorCastTimeMax":13.0,"refActorUseOvercast":true,"refActorComparisonType":3,"includeRotation":true,"AdditionalRotation":1.5707964}]}
~Lv2~{"Name":"P5 D3 Hello near/far world distance check","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":90.0,"Match":">32789)"}],"ElementsL":[{"Name":"","type":1,"Enabled":false,"radius":8.0,"color":4294901760,"fillIntensity":0.5,"thicc":5.0,"refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3442,3443],"refActorUseBuffTime":true,"refActorBuffTimeMax":8.0},{"Name":"","type":1,"radius":0.0,"color":4294901760,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":4278255413,"overlayVOffset":2.0,"thicc":0.0,"overlayText":"NEAR WORLD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3442,3004],"refActorRequireAllBuffs":true,"refActorUseBuffTime":true,"refActorBuffTimeMax":30.0},{"Name":"","type":1,"radius":0.0,"color":4294901760,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":4294180608,"overlayVOffset":2.0,"thicc":0.0,"overlayText":"FAR WORLD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3443,3004],"refActorRequireAllBuffs":true,"refActorUseBuffTime":true,"refActorBuffTimeMax":30.0},{"Name":"","type":1,"radius":0.0,"color":4294901760,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":4278255413,"overlayVOffset":2.0,"thicc":0.0,"overlayText":"NEAR WORLD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3442,3005],"refActorRequireAllBuffs":true,"refActorUseBuffTime":true,"refActorBuffTimeMax":15.0},{"Name":"","type":1,"radius":0.0,"color":4294901760,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":4294180608,"overlayVOffset":2.0,"thicc":0.0,"overlayText":"FAR WORLD","refActorName":"*","refActorRequireBuff":true,"refActorBuffId":[3443,3005],"refActorRequireAllBuffs":true,"refActorUseBuffTime":true,"refActorBuffTimeMax":15.0}]}
~Lv2~{"Name":"P5 D3 ブラスター範囲","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":14.0,"Match":"(12257>32789)","MatchDelay":45.0}],"ElementsL":[{"Name":"サークル","type":1,"radius":15.0,"color":4278190335,"Filled":false,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":4294967295,"overlayVOffset":1.0,"overlayFScale":2.0,"thicc":5.0,"overlayText":"ブラスター担当","refActorRequireBuff":true,"refActorBuffId":[3444],"refActorUseBuffParam":true,"refActorBuffParam":3,"refActorComparisonType":1,"includeRotation":true}]}
~Lv2~{"Name":"P6 Exaflares 1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":12.5,"IntervalBetweenFreezes":0.75,"ElementsL":[{"Name":"","type":1,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5}]}
~Lv2~{"Name":"P6 Exaflares 2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":13.5,"IntervalBetweenFreezes":0.75,"ElementsL":[{"Name":"","type":1,"offY":8.0,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5,"includeRotation":true}]}
~Lv2~{"Name":"P6 Exaflares 3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":14.5,"IntervalBetweenFreezes":0.75,"FreezeDisplayDelay":11.5,"ElementsL":[{"Name":"","type":1,"offY":16.0,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5,"includeRotation":true}]}
~Lv2~{"Name":"P6 Exaflares 4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":15.5,"IntervalBetweenFreezes":0.75,"FreezeDisplayDelay":12.54,"ElementsL":[{"Name":"","type":1,"offY":24.0,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5,"includeRotation":true}]}
~Lv2~{"Name":"P6 Exaflares 5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":16.5,"IntervalBetweenFreezes":0.75,"FreezeDisplayDelay":13.5,"ElementsL":[{"Name":"","type":1,"offY":32.0,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5,"includeRotation":true}]}
~Lv2~{"Name":"P6 Exaflares 6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":17.5,"IntervalBetweenFreezes":0.75,"FreezeDisplayDelay":14.5,"ElementsL":[{"Name":"","type":1,"offY":40.0,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5,"includeRotation":true}]}
~Lv2~{"Name":"P6 Exaflares 7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":18.5,"IntervalBetweenFreezes":0.75,"FreezeDisplayDelay":15.5,"ElementsL":[{"Name":"","type":1,"offY":48.0,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"thicc":4.0,"refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5,"includeRotation":true}]}
~Lv2~{"Name":"P6 Exaflares First flare indicator","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Freezing":true,"FreezeFor":12.5,"IntervalBetweenFreezes":20.0,"ElementsL":[{"Name":"","type":1,"radius":8.0,"color":4278190335,"fillIntensity":0.3,"overlayBGColor":4278190080,"overlayTextColor":4278190335,"overlayFScale":2.0,"thicc":4.0,"overlayText":"!!! First Exaflare !!!","refActorName":"*","refActorRequireCast":true,"refActorCastId":[31661],"refActorUseCastTime":true,"refActorCastTimeMax":0.5}]}
~Lv2~{"Enabled":false,"Name":"P5 D2 - F clone attack","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":">32788)","MatchDelay":42.0}],"ElementsL":[{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278255612,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":11},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278255612,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"AdditionalRotation":1.5707964,"refActorUseTransformation":true,"refActorTransformationID":11},{"Name":"Omega-F feetfighter","type":3,"refX":16.0,"refY":40.0,"offX":16.0,"offY":-40.0,"radius":12.0,"color":4278255612,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-F feetfighter","type":3,"refX":-16.0,"refY":40.0,"offX":-16.0,"offY":-40.0,"radius":12.0,"color":4278255612,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4}]}
~Lv2~{"Name":"P5 D2 - F clone attack 2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":">32788)","MatchDelay":52.0}],"ElementsL":[{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":11},{"Name":"Omega-F staff","type":3,"refY":40.0,"offY":-40.0,"radius":5.2,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"AdditionalRotation":1.5707964,"refActorUseTransformation":true,"refActorTransformationID":11},{"Name":"Omega-F feetfighter","type":3,"refX":16.0,"refY":40.0,"offX":16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4},{"Name":"Omega-F feetfighter","type":3,"refX":-16.0,"refY":40.0,"offX":-16.0,"offY":-40.0,"radius":12.0,"color":4278190335,"fillIntensity":0.1,"thicc":4.0,"refActorDataID":15720,"refActorComparisonType":3,"includeRotation":true,"onlyUnTargetable":true,"onlyVisible":true,"refActorUseTransformation":true,"refActorTransformationID":4}]}
~Lv2~{"Name":"P5 D2 rear power unit attack","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"ElementsL":[{"Name":"Main attack","type":3,"refY":20.0,"offY":-20.0,"radius":6.0,"color":4278255612,"fillIntensity":0.1,"overlayPlaceholders":true,"thicc":4.0,"refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"Main attack","type":3,"refY":20.0,"offY":-20.0,"radius":6.0,"color":4278255612,"fillIntensity":0.1,"overlayPlaceholders":true,"thicc":4.0,"refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000},{"Name":"Unsafe left","type":3,"refX":-15.0,"refY":20.0,"offX":-15.0,"radius":9.0,"color":4278255612,"fillIntensity":0.1,"overlayPlaceholders":true,"thicc":4.0,"refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"Unsafe left","type":3,"refX":15.0,"refY":-20.0,"offX":15.0,"radius":9.0,"color":4278255612,"fillIntensity":0.1,"overlayPlaceholders":true,"thicc":4.0,"refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":10000},{"Name":"Unsafe right","type":3,"refX":-15.0,"refY":-20.0,"offX":-15.0,"radius":9.0,"color":4278255612,"fillIntensity":0.1,"overlayPlaceholders":true,"thicc":4.0,"refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000},{"Name":"Unsafe right","type":3,"refX":15.0,"refY":20.0,"offX":15.0,"radius":9.0,"color":4278255612,"fillIntensity":0.1,"overlayPlaceholders":true,"thicc":4.0,"refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":10000}]}
~Lv2~{"Name":"P5 D2 Arm unit","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":8.0,"Match":">32788)","MatchDelay":58.0}],"ElementsL":[{"Name":"","type":3,"refY":40.0,"radius":3.2,"color":4294901760,"fillIntensity":0.1,"thicc":4.0,"refActorNameIntl":{"En":"arm unit","Jp":"トアームユニット"},"includeRotation":true,"onlyVisible":true}]}
~Lv2~{"Enabled":false,"Name":"P5 D2 Final pos","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Scenes":[6],"Freezing":true,"FreezeFor":20.0,"IntervalBetweenFreezes":20.0,"FreezeDisplayDelay":9.0,"ElementsL":[{"Name":"ATTACK 1 LEFT","type":1,"offY":-19.08,"radius":1.0,"color":4278255615,"overlayBGColor":4278253567,"overlayTextColor":4278190080,"overlayText":"ATTACK 1","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":0.7661996,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":1000},{"Name":"ATTACK 2 LEFT","type":1,"offY":-18.86,"radius":1.0,"color":4278255615,"overlayBGColor":4278255605,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"ATTACK 2","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":5.5431657,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":1000},{"Name":"ATTACK 3 LEFT","type":1,"offX":-18.8,"radius":1.0,"color":4278255615,"overlayBGColor":4278255103,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"ATTACK 3","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":3.1415927,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":1000},{"Name":"ATTACK 4 LEFT","type":1,"offX":19.04,"radius":1.0,"color":4278255615,"overlayBGColor":4278250239,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"ATTACK 4","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":3.1415927,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":1000},{"Name":"NEET 1 LEFT","type":1,"offY":18.8,"radius":1.0,"color":4278255615,"overlayBGColor":4278252031,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"NEET 1","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":0.2617994,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":1000},{"Name":"NEET 2 LEFT","type":1,"offX":18.7,"radius":1.0,"color":4278255615,"overlayBGColor":4278252031,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"NEET 2","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":4.4505897,"refActorVFXPath":"vfx/common/eff/m0489_stlp_left01f_c0d1.avfx","refActorVFXMax":1000},{"Name":"near source LEFT","type":1,"offY":9.86,"radius":1.0,"color":4278225677,"overlayBGColor":4278220288,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Near debuff","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":1000},{"Name":"far source LEFT","type":1,"offX":-9.88,"radius":1.0,"color":4288326400,"overlayBGColor":4285363712,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Far debuff","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_left01c.avfx","refActorVFXMax":1000},{"Name":"ATTACK 1 RIGHT","type":1,"offY":-18.86,"radius":1.0,"color":4278255615,"overlayBGColor":4278255605,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"ATTACK 1","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":5.5431657,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000},{"Name":"ATTACK 2 RIGHT","type":1,"offY":-19.08,"radius":1.0,"color":4278255615,"overlayBGColor":4278253567,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"ATTACK 2","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":0.7661996,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000},{"Name":"ATTACK 3 RIGHT","type":1,"offX":18.8,"radius":1.0,"color":4278255615,"overlayBGColor":4278255103,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"ATTACK 3","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":3.1415927,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000},{"Name":"ATTACK 4 RIGHT","type":1,"offX":-19.04,"radius":1.0,"color":4278255615,"overlayBGColor":4278250239,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"ATTACK 4","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":3.1415927,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000},{"Name":"NEET 1 RIGHT","type":1,"offY":18.8,"radius":1.0,"color":4278255615,"overlayBGColor":4278252031,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"NEET 1","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":0.2617994,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000},{"Name":"NEET 2 RIGHT","type":1,"offX":18.7,"radius":1.0,"color":4278255615,"overlayBGColor":4278252031,"overlayTextColor":4278190080,"overlayPlaceholders":true,"overlayText":"NEET 2","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"AdditionalRotation":4.4505897,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000},{"Name":"near source RIGHT","type":1,"offY":9.86,"radius":1.0,"color":4278225677,"overlayBGColor":4278220288,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Near debuff","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000},{"Name":"far source RIGHT","type":1,"offX":9.88,"radius":1.0,"color":4288326400,"overlayBGColor":4285363712,"overlayTextColor":4294967295,"thicc":5.0,"overlayText":"Far debuff","refActorPlaceholder":[],"refActorNPCNameID":7639,"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/m0515_turning_right01c.avfx","refActorVFXMax":1000}]}
~Lv2~{"Name":"P6 初期AA配置 ST TLB","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"6eff132b-5041-4f48-9b92-343e5a633606","Name":"MT","Elements":[{"Name":"MT","refX":100.0,"refY":92.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST","Enabled":false,"refX":110.25305,"refY":110.25305,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"HD","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":3355508712,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":">> TLB <<","refActorType":1},{"Name":"not コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB(予告)","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":"この後TLB","refActorType":1}]},{"Guid":"9c7a8858-7e50-4209-b079-475cedaf5595","Name":"ST","Elements":[{"Name":"MT","Enabled":false,"refX":100.0,"refY":92.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST","refX":110.25305,"refY":110.25305,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"HD","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":3355508712,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":">> TLB <<","refActorType":1},{"Name":"not コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB(予告)","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":"この後TLB","refActorType":1}]},{"Guid":"d24d3e78-34f5-4a85-8d42-ed3f44225454","Name":"Healer or DPS","Elements":[{"Name":"MT","Enabled":false,"refX":100.0,"refY":92.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST","Enabled":false,"refX":110.25305,"refY":110.25305,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"HD","refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":3355508712,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":">> TLB <<","refActorType":1},{"Name":"not コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB(予告)","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":"この後TLB","refActorType":1}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":20.0,"Match":"ワタシはオメガであり、アルファとともに歩む者……。 終わりを始まりとし、先へと進みます！"}],"ElementsL":[{"Name":"MT","Enabled":false,"refX":100.0,"refY":92.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST","Enabled":false,"refX":110.25305,"refY":110.25305,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"HD","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":4278190080,"overlayTextColor":3355508712,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":">> TLB <<","refActorType":1},{"Name":"not コスモメモリー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[13083,13084,13085,13122,13123,13124,13291,13292,13293,31522,31523,31524,31649],"refActorComparisonType":4,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"ST TLB(予告)","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508540,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":"この後TLB","refActorType":1}]}
~Lv2~{"Name":"P6 コスモアロー 開幕立ち位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"958d2251-48a9-410c-a906-0b852697ee24","Name":"MTD3","Elements":[{"Name":"コスモアロー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31650],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"H2/D4","Enabled":false,"refX":107.77817,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"MT/D3","refX":92.22183,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1/D1","Enabled":false,"refX":92.22183,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST/D2","Enabled":false,"refX":107.77817,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"0bc6e92a-68ee-498a-ac3c-3283350f5703","Name":"STD2","Elements":[{"Name":"コスモアロー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31650],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"H2/D4","Enabled":false,"refX":107.77817,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"MT/D3","Enabled":false,"refX":92.22183,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1/D1","Enabled":false,"refX":92.22183,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST/D2","refX":107.77817,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"ada14215-76a8-4368-8e19-1d09802116a9","Name":"H1D1","Elements":[{"Name":"コスモアロー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31650],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"H2/D4","Enabled":false,"refX":107.77817,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"MT/D3","Enabled":false,"refX":92.22183,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1/D1","refX":92.22183,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST/D2","Enabled":false,"refX":107.77817,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]},{"Guid":"693b915e-b046-4ff9-9920-f1cbcc444e98","Name":"H2D4","Elements":[{"Name":"コスモアロー cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31650],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"H2/D4","refX":107.77817,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"MT/D3","Enabled":false,"refX":92.22183,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1/D1","Enabled":false,"refX":92.22183,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST/D2","Enabled":false,"refX":107.77817,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]}],"ElementsL":[{"Name":"H2/D4","Enabled":false,"refX":107.77817,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"MT/D3","Enabled":false,"refX":92.22183,"refY":92.22183,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"H1/D1","Enabled":false,"refX":92.22183,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true},{"Name":"ST/D2","Enabled":false,"refX":107.77817,"refY":107.77817,"radius":1.0,"color":3355508533,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"tether":true}]}
~Lv2~{"Name":"P6 コスモダイブ 立ち位置目安","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"b13af1f4-d020-4b99-8934-83393ae84fa8","Name":"Tank","Elements":[{"Name":"コスモダイブ cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31653,31654,31655,31656],"refActorUseCastTime":true,"refActorCastTimeMax":7.7,"refActorUseOvercast":true,"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"Tank","refX":100.0,"refY":100.0,"radius":6.0,"Donut":1.34,"color":3372160256,"fillIntensity":0.1,"thicc":4.0},{"Name":"Healer or DPS","Enabled":false,"refX":100.0,"refY":100.0,"radius":11.6,"Donut":1.34,"color":3372218624,"fillIntensity":0.1,"thicc":4.0}]},{"Guid":"d2b2eab9-8c7c-4c86-b6cc-467bf458b1fa","Name":"Healer or DPS","Elements":[{"Name":"コスモダイブ cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31653,31654,31655,31656],"refActorUseCastTime":true,"refActorCastTimeMax":7.7,"refActorUseOvercast":true,"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"Tank","Enabled":false,"refX":100.0,"refY":100.0,"radius":6.0,"Donut":1.34,"color":3372160256,"fillIntensity":0.1,"thicc":4.0},{"Name":"Healer or DPS","refX":100.0,"refY":100.0,"radius":11.6,"Donut":1.34,"color":3372218624,"fillIntensity":0.1,"thicc":4.0}]}],"ElementsL":[{"Name":"コスモダイブ cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31653,31654,31655,31656],"refActorUseCastTime":true,"refActorCastTimeMax":7.7,"refActorUseOvercast":true,"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"Tank","Enabled":false,"refX":100.0,"refY":100.0,"radius":6.0,"Donut":1.34,"color":3372160256,"fillIntensity":0.1,"thicc":4.0},{"Name":"Healer or DPS","Enabled":false,"refX":100.0,"refY":100.0,"radius":11.6,"Donut":1.34,"color":3372218624,"fillIntensity":0.1,"thicc":4.0}]}
~Lv2~{"Name":"P6 コスモメテオ 開幕立ち位置","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"コスモメテオ cast","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31664],"refActorCastTimeMax":7.7,"refActorUseOvercast":true,"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"中央へ","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメモリー_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12256>31649)"}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメモリー_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31649)","MatchDelay":0.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメモリー_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31649)","MatchDelay":1.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメモリー_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31649)","MatchDelay":2.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメモリー_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31649)","MatchDelay":3.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメモリー_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31649)","MatchDelay":4.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P6 コスモアロー_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12256>31650)"}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P6 コスモアロー_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31650)","MatchDelay":0.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 コスモアロー_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31650)","MatchDelay":1.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 コスモアロー_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31650)","MatchDelay":2.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 コスモアロー_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31650)","MatchDelay":3.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 コスモアロー_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31650)","MatchDelay":4.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12256>31654)"}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31654)","MatchDelay":0.7}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31654)","MatchDelay":1.7}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31654)","MatchDelay":2.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31654)","MatchDelay":3.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31654)","MatchDelay":4.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31654)","MatchDelay":5.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 コスモダイブ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31654)","MatchDelay":6.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD10","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12256>31660)"}],"ElementsL":[{"Name":"10","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"10","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD9","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":0.7}],"ElementsL":[{"Name":"9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"9","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD8","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":1.7}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD7","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":2.7}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":3.7}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":4.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":5.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":6.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":7.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲：リミッターカット_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31660)","MatchDelay":8.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(散開)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"Subconfigurations":[{"Guid":"c24e9c6f-21a2-4b2c-a98d-22781ea19319","Name":"MT","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"ef815998-4f0d-4aeb-92b5-82267c884cea","Name":"ST","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"bbef3f03-2d61-463c-a5ab-87b7aabb555e","Name":"H1","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"b60023ec-54c1-4bb0-b3e6-f268049458a8","Name":"H2","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"3810e28a-5037-4d30-a668-2e1f6db6c659","Name":"D1","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"ada2bc95-757f-415a-9083-9cef861fb848","Name":"D2","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"629a465e-446d-4e40-9d1c-42da5f343c52","Name":"D3","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"f961e0ef-3272-4f56-a4d0-e8c2d2d58b9b","Name":"D4","Elements":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":6.0,"Match":"(12256>31657)","MatchDelay":0.6}],"ElementsL":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Spread","refActorType":1},{"Name":"MT","Enabled":false,"refX":100.0,"refY":90.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":90.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508521,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":110.0,"refY":100.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508484,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":92.92893,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":107.07107,"refY":107.07107,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":92.92893,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":107.07107,"refY":92.92893,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"thicc":4.0,"overlayText":"D4","tether":true}]}
~Lv2~{"Name":"P6 波動砲(散開)_CD6","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":0.6}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(散開)_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":1.6}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(散開)_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":2.6}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(散開)_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":3.6}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(散開)_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":4.6}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(散開)_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":5.6}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(頭割り)","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":4.0,"Match":"(12256>31657)","MatchDelay":6.6}],"ElementsL":[{"Name":"テキスト","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371433728,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Stack","refActorType":1},{"Name":"頭割り","refX":100.0,"refY":110.0,"radius":1.0,"color":3355508503,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"tether":true}]}
~Lv2~{"Name":"P6 波動砲(頭割り)_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":6.6}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(頭割り)_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":7.6}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(頭割り)_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":8.6}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 波動砲(頭割り)_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31657)","MatchDelay":9.6}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメテオ_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12256>31664)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメテオ_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31664)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメテオ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31664)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメテオ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31664)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 コスモメテオ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31664)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P6 フレア_CD","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMax":1000},{"Name":"7","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMin":1000,"refActorVFXMax":2000},{"Name":"6","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMin":2000,"refActorVFXMax":3000},{"Name":"5","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMin":3000,"refActorVFXMax":4000},{"Name":"4","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMin":4000,"refActorVFXMax":5000},{"Name":"3","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508527,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMin":5000,"refActorVFXMax":6000},{"Name":"2","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508731,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMin":6000,"refActorVFXMax":7000},{"Name":"1","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/all_at8s_0v.avfx","refActorVFXMin":7000,"refActorVFXMax":8000}]}
~Lv2~{"Name":"P6 マジックナンバー_TLBリマインダー","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"cast マジックナンバー","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31670],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"<t1> デュナミス","type":1,"refActorPlaceholder":["<t1>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"<t2> デュナミス","type":1,"refActorPlaceholder":["<t2>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"1st TLB","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3372218624,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1st - TLB","refActorType":1},{"Name":"cast マジックナンバー","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31670],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"not <t1> デュナミス","type":1,"refActorPlaceholder":["<t1>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<t2> デュナミス","type":1,"refActorPlaceholder":["<t2>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"2nd TLB","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2nd TLB","refActorType":1},{"Name":"cast マジックナンバー","type":1,"refActorNPCID":12256,"refActorRequireCast":true,"refActorCastId":[31670],"refActorComparisonType":4,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<t1> デュナミス","type":1,"refActorPlaceholder":["<t1>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"<t2> デュナミス","type":1,"refActorPlaceholder":["<t2>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"2nd TLB","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355505151,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2nd TLB","refActorType":1}]}
~Lv2~{"Name":"P6 マジックナンバー_HLBリマインダー","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"マジックナンバー <me>","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3532],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"<h1> デュナミス","type":1,"refActorPlaceholder":["<h1>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"<h2> デュナミス","type":1,"refActorPlaceholder":["<h2>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"1st HLB","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508496,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1st - HLB","refActorType":1},{"Name":"マジックナンバー <me>","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3532],"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"not <h1> デュナミス","type":1,"refActorPlaceholder":["<h1>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"<h2> デュナミス","type":1,"refActorPlaceholder":["<h2>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"2nd HLB","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2nd HLB","refActorType":1},{"Name":"マジックナンバー <me>","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[3532],"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"<h1> デュナミス","type":1,"refActorPlaceholder":["<h1>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"not <h2> デュナミス","type":1,"refActorPlaceholder":["<h2>"],"refActorRequireBuff":true,"refActorBuffId":[3446],"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"2nd HLB","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2nd HLB","refActorType":1}]}
~Lv2~{"Name":"P6 マジックナンバー_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12256>31670)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P6 マジックナンバー_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31670)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P6 マジックナンバー_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31670)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P6 マジックナンバー_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31670)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P6 マジックナンバー_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12256>31670)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12257>33196)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33196)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33196)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33196)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33196)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)2回目_CDCD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33196)","MatchDelay":5.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)2回目_CDCD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33196)","MatchDelay":4.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(M)2回目_CDCD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33196)","MatchDelay":6.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 デルタ_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12257>31624)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P5 デルタ_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>31624)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P5 デルタ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>31624)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P5 デルタ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>31624)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P5 デルタ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>31624)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 シグマ_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12257>32788)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P5 シグマ_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32788)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P5 シグマ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32788)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P5 シグマ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32788)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P5 シグマ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32788)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12257>33197)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)2回目_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":4.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)2回目_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":5.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)2回目_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":6.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P5 ソーラーレイ(F)2回目_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>33197)","MatchDelay":7.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 オメガ_CD5","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(12257>32789)"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"P5 オメガ_CD4","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32789)","MatchDelay":0.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"P5 オメガ_CD3","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32789)","MatchDelay":1.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"P5 オメガ_CD2","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32789)","MatchDelay":2.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"P5 オメガ_CD1","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(12257>32789)","MatchDelay":3.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"P5 ハロワ-デルタ ニア切断","Group":"Ultimate The Omega Protocol","ZoneLockH":[1122],"ConditionalAnd":true,"ElementsL":[{"Name":"エンバグ：ニアー 7s↓","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[1672,3529],"refActorUseBuffTime":true,"refActorBuffTimeMax":7.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"被魔法ダメージ増加","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":7.0,"refActorComparisonType":5,"Conditional":true,"Nodraw":true},{"Name":"切断防止","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508731,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"まだ切らない","refActorType":1},{"Name":"切断範囲？","type":1,"radius":8.0,"Donut":1.0,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[1672,3529],"refActorComparisonType":5},{"Name":"エンバグ：ニアー 7s↓","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[1672,3529],"refActorUseBuffTime":true,"refActorBuffTimeMax":7.0,"refActorComparisonType":5,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"not被魔法ダメージ増加","type":1,"refActorPlaceholder":["<me>"],"refActorRequireBuff":true,"refActorBuffId":[60,494,658,1138,2091,2941,3414,3516],"refActorBuffTimeMax":7.0,"refActorComparisonType":5,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"切断防止","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508515,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"近づく","refActorType":1},{"Name":"切断範囲？","type":1,"radius":8.0,"Donut":1.0,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorRequireBuff":true,"refActorBuffId":[1672,3529],"refActorComparisonType":5}]}
```

## Thanks

- [Splatoon公式（Presets）](https://github.com/PunishXIV/Splatoon/tree/main/Presets/Endwalker/Duties/Ultimate%20-%20The%20Omega%20Protocol)  
- [Splatoon公式（Scripts）](https://github.com/PunishXIV/Splatoon/tree/main/SplatoonScripts/Duties/Endwalker/The%20Omega%20Protocol)  
- [FF14 Splatoon 絶オメガで便利なレイアウトとスクリプトまとめ - 光のツーラー](https://tooleroflight.blog.jp/archives/24065980.html)  
- [絶オメガ検証戦 Splatoonプリセット まとめ - Mirage](https://exatrines.github.io/SplatoonWorkspace/Endwalker/TOP/)  
- その他、スクリプト・レイアウト・設定作成者様  
