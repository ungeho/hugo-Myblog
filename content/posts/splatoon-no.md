+++
title = '極エヌオー討滅戦'
date = 2026-05-01T17:02:50+09:00
draft = false
description = "極エヌオー討滅戦のSplatoonレイアウト"
categories = ["FFXIV"]
tags = ["FFXIV","Splatoon"]
series = ["FFXIV Splatoon Presets"]
# 目次を付与するオプション <!-- omit in toc -->
showtoc = false
# 目次を開いた状態にする <!-- omit in toc -->
tocopen = false
# 数式を使いたい場合はtrueに設定する。 <!-- omit in toc -->
math = false
+++

---

## Waymark

フィールドマーカーはこちらの記事にあります。

{{< linkcard
  url="/posts/waymark-dt-ex/"
  title="[FFXIV Waymark Presets] 黄金のレガシー 極討滅戦"
  desc="黄金のレガシー 極討滅戦のフィールドマーカー"
  meta="Related"
/>}}

---

## Script

> [!CAUTION] AIにより生成されたテスト不十分のスクリプト
> リプレイでの動作確認のみ行っており、実運用では問題が発生する可能性があります。  
> そのため、スクリプトと同様の役割を持つレイアウトを併用できるよう残しています。

### 混沌の激流 (EX7 Chaotic Torrent Orbs)

基本的に設定不要  
D2にキャスターを配置する場合や、新ジョブなどでロール判定が合わない場合は設定してください。  
ロールに応じて、担当する玉の受け位置へ誘導します。  
  
誘導はタンク玉を基準に時計回りで近接->遠隔->ヒーラー

```c#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using Dalamud.Bindings.ImGui;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameHelpers;
using ECommons.ImGuiMethods;
using ECommons.Logging;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace SplatoonScriptsOfficial.Duties.Dawntrail;

internal class EX7_Chaotic_Torrent_Orbs : SplatoonScript
{
    private const uint Territory = 1362;
    private const uint TankOrbDataId = 0x4DC6;
    private const uint AssignmentOrbDataId = 0x4DC5;
    private const uint OrbStatusId = 2234;
    private const uint FirstOrbSoakStatusId = 2941;
    private const ushort Param75 = 75;
    private const ushort Param88 = 88;
    private const float CenterX = 100.0f;
    private const float CenterY = 100.0f;
    private const float Param75GuideDistance = 12.5f;
    private const float Param88GuideDistance = 7.0f;

    public override HashSet<uint> ValidTerritories => [Territory];
    public override Metadata? Metadata => new(1, "kudry + Codex");

    private Config Conf => Controller.GetConfig<Config>();
    private bool _gotFirstOrb = false;
    private Vector3? _param75GuidePosition = null;
    private Vector3? _param88GuidePosition = null;
    private bool _param75TargetVisible = false;
    private bool _param88TargetVisible = false;
    private nint _param75TargetAddress = nint.Zero;
    private nint _param88TargetAddress = nint.Zero;
    private bool _hadFirstOrbSoakStatus = false;

    public override void OnSetup()
    {
        RegisterGuide("Guide");
    }

    public override void OnUpdate()
    {
        OffAll();

        var role = GetLocalRole();
        if (role == Role.Unknown)
            return;

        var tankOrbs = GetOrbs(TankOrbDataId).ToList();
        var assignmentOrbs = GetOrbs(AssignmentOrbDataId).ToList();
        UpdateTargetCache(role, tankOrbs, assignmentOrbs);

        var hasFirstOrbSoakStatus = HasBasePlayerStatus(FirstOrbSoakStatusId);

        if (!_gotFirstOrb && _param75TargetVisible && !_hadFirstOrbSoakStatus && hasFirstOrbSoakStatus)
            _gotFirstOrb = true;

        if (!_gotFirstOrb && _param75TargetAddress != nint.Zero && !_param75TargetVisible && _param88TargetVisible)
            _gotFirstOrb = true;

        _hadFirstOrbSoakStatus = hasFirstOrbSoakStatus;

        var activeParam = _gotFirstOrb ? Param88 : Param75;
        var guidePosition = activeParam == Param88 ? _param88GuidePosition : _param75GuidePosition;

        if (guidePosition == null || (!_param75TargetVisible && !_param88TargetVisible))
        {
            if (_param75TargetAddress != nint.Zero && _param88TargetAddress != nint.Zero)
                ClearTargetCache();

            return;
        }

        MoveGuide(guidePosition.Value);
        DebugLog($"Role {role}, Param {activeParam}, Visible75 {_param75TargetVisible}, Visible88 {_param88TargetVisible}");
    }

    public override void OnReset()
    {
        OffAll();
        _gotFirstOrb = false;
        ClearTargetCache();
    }

    public override void OnSettingsDraw()
    {
        DrawOverrideCombo();
        DrawRoleOverrideCombo();
        ImGui.Checkbox("DebugPrint", ref Conf.DebugPrint);

        if (ImGui.CollapsingHeader("Debug"))
        {
            var tankOrbs = GetOrbs(TankOrbDataId).ToList();
            var assignmentOrbs = GetOrbs(AssignmentOrbDataId).ToList();

            ImGuiEx.Text($"Tank orbs 0x4DC6: {tankOrbs.Count}");
            ImGuiEx.Text($"Assignment orbs 0x4DC5: {assignmentOrbs.Count}");
            ImGuiEx.Text($"Param 75 orbs: {assignmentOrbs.Count(x => HasOrbStatusParam(x, Param75))}");
            ImGuiEx.Text($"Param 88 orbs: {assignmentOrbs.Count(x => HasOrbStatusParam(x, Param88))}");
            ImGuiEx.Text($"Got first orb: {_gotFirstOrb}");
            ImGuiEx.Text($"Param75 target visible: {_param75TargetVisible}");
            ImGuiEx.Text($"Param88 target visible: {_param88TargetVisible}");
            ImGuiEx.Text($"Base player: {GetBasePlayer()?.Name.ToString() ?? "None"}");
            ImGuiEx.Text($"Base player status 2941: {HasBasePlayerStatus(FirstOrbSoakStatusId)}");
            ImGuiEx.Text($"Assignment role: {GetLocalRole()}");
        }
    }

    private void DrawOverrideCombo()
    {
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
    }

    private void DrawRoleOverrideCombo()
    {
        ImGui.SetNextItemWidth(220);
        if (ImGui.BeginCombo("Assignment Role", GetRoleOverrideLabel(Conf.RoleOverride)))
        {
            foreach (var role in new[] { RoleOverride.Auto, RoleOverride.Tank, RoleOverride.Melee, RoleOverride.Ranged, RoleOverride.Healer })
            {
                if (ImGui.Selectable(GetRoleOverrideLabel(role), Conf.RoleOverride == role))
                    Conf.RoleOverride = role;
            }

            ImGui.EndCombo();
        }
    }

    private void RegisterGuide(string name)
    {
        Controller.RegisterElementFromCode(name, $$"""
        {
            "Name":"",
            "Enabled":false,
            "refX":100.0,
            "refY":100.0,
            "refZ":0.0,
            "radius":1.0,
            "color":3355508480,
            "Filled":false,
            "fillIntensity":0.2,
            "overlayBGColor":3355443200,
            "overlayTextColor":3372220415,
            "overlayVOffset":0.0,
            "overlayFScale":2.2,
            "thicc":8.0,
            "overlayText":"",
            "tether":true
        }
        """);
    }

    private void MoveGuide(Vector3 position)
    {
        var element = Controller.GetElementByName("Guide");
        element.refX = position.X;
        element.refY = position.Z;
        element.refZ = position.Y;
        element.Enabled = true;
    }

    private IEnumerable<IBattleChara> GetOrbs(uint dataId)
    {
        return Svc.Objects
            .OfType<IBattleChara>()
            .Where(x => x.DataId == dataId);
    }

    private static bool HasOrbStatusParam(IBattleChara orb, ushort param)
    {
        return orb.StatusList.Any(x => x.StatusId == OrbStatusId && x.Param == param);
    }

    private bool HasBasePlayerStatus(uint statusId)
    {
        return GetBasePlayer()?.StatusList.Any(x => x.StatusId == statusId) == true;
    }

    private void UpdateTargetCache(Role role, List<IBattleChara> tankOrbs, List<IBattleChara> assignmentOrbs)
    {
        var allOrbs = tankOrbs.Concat(assignmentOrbs).ToList();
        _param75TargetVisible = _param75TargetAddress != nint.Zero && allOrbs.Any(x => x.Address == _param75TargetAddress);
        _param88TargetVisible = _param88TargetAddress != nint.Zero && allOrbs.Any(x => x.Address == _param88TargetAddress);

        if (tankOrbs.Count < 2)
            return;

        var center = new Vector3(CenterX, 0.0f, CenterY);
        var northAngle = GetNorthAngle(tankOrbs, center);

        var param75Target = GetTargetOrb(role, Param75, tankOrbs, assignmentOrbs, center, northAngle);
        if (param75Target != null)
        {
            if (_param75TargetAddress == nint.Zero)
            {
                _hadFirstOrbSoakStatus = HasBasePlayerStatus(FirstOrbSoakStatusId);
            }
            else if (_param75TargetAddress != param75Target.Address)
            {
                _gotFirstOrb = false;
                _hadFirstOrbSoakStatus = HasBasePlayerStatus(FirstOrbSoakStatusId);
                _param88GuidePosition = null;
                _param88TargetAddress = nint.Zero;
                _param88TargetVisible = false;
            }

            _param75TargetVisible = true;
            _param75TargetAddress = param75Target.Address;
            _param75GuidePosition = GetGuidePosition(param75Target.Position, Param75GuideDistance);
        }

        var param88Target = GetTargetOrb(role, Param88, tankOrbs, assignmentOrbs, center, northAngle);
        if (param88Target != null)
        {
            _param88TargetVisible = true;
            _param88TargetAddress = param88Target.Address;
            _param88GuidePosition = GetGuidePosition(param88Target.Position, Param88GuideDistance);
        }
    }

    private void ClearTargetCache()
    {
        _gotFirstOrb = false;
        _param75GuidePosition = null;
        _param88GuidePosition = null;
        _param75TargetVisible = false;
        _param88TargetVisible = false;
        _param75TargetAddress = nint.Zero;
        _param88TargetAddress = nint.Zero;
        _hadFirstOrbSoakStatus = HasBasePlayerStatus(FirstOrbSoakStatusId);
    }

    private static IBattleChara? GetTargetOrb(Role role, ushort activeParam, List<IBattleChara> tankOrbs, List<IBattleChara> assignmentOrbs, Vector3 center, double northAngle)
    {
        if (role == Role.Tank)
        {
            return tankOrbs.FirstOrDefault(x => HasOrbStatusParam(x, activeParam));
        }

        var roleIndex = role switch
        {
            Role.Melee => 0,
            Role.Ranged => 1,
            Role.Healer => 2,
            _ => -1
        };

        if (roleIndex == -1)
            return null;

        var sorted = assignmentOrbs
            .Where(x => HasOrbStatusParam(x, activeParam))
            .OrderBy(x => ClockwiseAngleFromNorth(x.Position, center, northAngle))
            .ToList();

        return sorted.Count > roleIndex ? sorted[roleIndex] : null;
    }

    private Role GetLocalRole()
    {
        if (Conf.RoleOverride != RoleOverride.Auto)
        {
            return Conf.RoleOverride switch
            {
                RoleOverride.Tank => Role.Tank,
                RoleOverride.Melee => Role.Melee,
                RoleOverride.Ranged => Role.Ranged,
                RoleOverride.Healer => Role.Healer,
                _ => Role.Unknown
            };
        }

        return GetBasePlayer()?.ClassJob.RowId switch
        {
            1 or 3 or 19 or 21 or 32 or 37 => Role.Tank,
            2 or 4 or 20 or 22 or 29 or 30 or 34 or 39 or 41 => Role.Melee,
            5 or 7 or 23 or 25 or 26 or 27 or 31 or 35 or 36 or 38 or 42 => Role.Ranged,
            6 or 24 or 28 or 33 or 40 => Role.Healer,
            _ => Role.Unknown
        };
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

        return Player.Object;
    }

    private static Vector3 GetGuidePosition(Vector3 orbPosition, float distance)
    {
        var angle = Math.Atan2(orbPosition.Z - CenterY, orbPosition.X - CenterX);
        return new Vector3(
            CenterX + MathF.Cos((float)angle) * distance,
            orbPosition.Y,
            CenterY + MathF.Sin((float)angle) * distance);
    }

    private static Vector3 GetCenter(IEnumerable<IBattleChara> orbs)
    {
        var positions = orbs.Select(x => x.Position).ToList();
        return new Vector3(
            positions.Average(x => x.X),
            positions.Average(x => x.Y),
            positions.Average(x => x.Z));
    }

    private static double GetNorthAngle(List<IBattleChara> tankOrbs, Vector3 center)
    {
        var tankCenter = GetCenter(tankOrbs);
        return Math.Atan2(tankCenter.Z - center.Z, tankCenter.X - center.X);
    }

    private static double ClockwiseAngleFromNorth(Vector3 position, Vector3 center, double northAngle)
    {
        var angle = Math.Atan2(position.Z - center.Z, position.X - center.X);
        var clockwise = angle - northAngle;

        while (clockwise < 0)
            clockwise += Math.Tau;

        while (clockwise >= Math.Tau)
            clockwise -= Math.Tau;

        return clockwise;
    }

    private void OffAll()
    {
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
    }

    private void DebugLog(string message)
    {
        if (Conf.DebugPrint)
            DuoLog.Information($"[混沌の激流] {message}");
    }

    private static string GetRoleOverrideLabel(RoleOverride role)
    {
        return role switch
        {
            RoleOverride.Auto => "Auto",
            RoleOverride.Tank => "Tank",
            RoleOverride.Melee => "Melee (D1D2)",
            RoleOverride.Ranged => "Ranged (D3D4)",
            RoleOverride.Healer => "Healer",
            _ => "Auto"
        };
    }

    public class Config : IEzConfig
    {
        public bool DebugPrint = false;
        public string BasePlayerOverride = "";
        public RoleOverride RoleOverride = RoleOverride.Auto;
    }

    public enum RoleOverride
    {
        Auto,
        Tank,
        Melee,
        Ranged,
        Healer
    }

    private enum Role
    {
        Unknown,
        Tank,
        Melee,
        Ranged,
        Healer
    }
}
```

#### Configuration

- Assignment Role  
  - Auto  
    ジョブによるロール判定で誘導
  - Tank  
    タンクロールの位置へ誘導
  - Melee(D1D2)  
    近接DPSロールの位置へ誘導
  - Ranged(D3D4)  
    遠隔DPSロールの位置へ誘導
  - Healer  
    ヒーラーロールの位置へ誘導

---

### 無の追跡(EX7 Void Pursuit)

設定不要  
  
2回目の追跡対象に自身が選出された場合、玉の位置を基準に90度反時計回りの位置へ誘導します。

```C#
using Dalamud.Game.ClientState.Objects.SubKinds;
using Dalamud.Game.ClientState.Objects.Types;
using Dalamud.Bindings.ImGui;
using ECommons;
using ECommons.Configuration;
using ECommons.DalamudServices;
using ECommons.GameFunctions;
using ECommons.GameHelpers;
using ECommons.ImGuiMethods;
using Splatoon.SplatoonScripting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace SplatoonScriptsOfficial.Duties.Dawntrail;

internal class EX7_Void_Pursuit : SplatoonScript
{
    private const uint Territory = 1362;
    private const uint OrbDataId = 0x4EB5;
    private const uint TetherData2 = 0;
    private const uint OrbChaseTetherData3 = 404;
    private const uint PlayerFollowTetherData3 = 405;
    private const uint TetherData5 = 15;
    private const float CenterX = 100.0f;
    private const float CenterY = 100.0f;
    private const float GuideDistance = 8.4f;
    private const long TetherMemoryMs = 20000;
    private const long TetherPairWindowMs = 20000;

    public override HashSet<uint> ValidTerritories => [Territory];
    public override Metadata? Metadata => new(1, "kudry + Codex");

    private Config Conf => Controller.GetConfig<Config>();
    private readonly Dictionary<string, OrbRecord> _playerToOrb = [];
    private string _followSourcePlayerName = "";
    private long _followTetherMs = 0;

    public override void OnSetup()
    {
        Controller.RegisterElementFromCode("Guide", """
        {
            "Name":"",
            "Enabled":false,
            "refX":100.0,
            "refY":100.0,
            "refZ":0.0,
            "radius":1.0,
            "color":3355508480,
            "Filled":false,
            "fillIntensity":0.2,
            "overlayText":"",
            "tether":true,
            "thicc":8.0
        }
        """);
    }

    public override void OnTetherCreate(uint source, uint target, uint data2, uint data3, uint data5)
    {
        DebugLog($"Tether source={source}, target={target}, param=({data2}, {data3}, {data5}), sourceObj={source.GetObject()?.Name}, targetObj={target.GetObject()?.Name}");

        if (data2 != TetherData2 || data5 != TetherData5)
            return;

        if (data3 == OrbChaseTetherData3)
        {
            if (IsSelfTether(source, target))
            {
                OffAll();
                ClearState();
                DebugLog("Self tether switched to 404, hiding guide");
                return;
            }

            RecordOrbChaseTether(source, target);
            return;
        }

        if (data3 == PlayerFollowTetherData3)
            RecordPlayerFollowTether(source, target);
    }

    public override void OnUpdate()
    {
        OffAll();

        if (string.IsNullOrEmpty(_followSourcePlayerName))
            return;

        if (Environment.TickCount64 - _followTetherMs > TetherMemoryMs)
        {
            ClearState();
            return;
        }

        if (!_playerToOrb.TryGetValue(_followSourcePlayerName, out var orbRecord))
            return;

        if (Math.Abs(orbRecord.TimestampMs - _followTetherMs) > TetherPairWindowMs)
            return;

        var orb = Svc.Objects
            .OfType<IBattleChara>()
            .FirstOrDefault(x => x.Address == orbRecord.Address && x.DataId == OrbDataId);

        if (orb == null)
            return;

        MoveGuide(GetGuidePosition(orb.Position));
    }

    public override void OnReset()
    {
        OffAll();
        ClearState();
    }

    public override void OnSettingsDraw()
    {
        ImGui.Checkbox("DebugPrint", ref Conf.DebugPrint);

        if (ImGui.CollapsingHeader("Debug"))
        {
            ImGuiEx.Text($"Follow source player: {_followSourcePlayerName}");
            ImGuiEx.Text($"Tracked orb count: {_playerToOrb.Count}");
            ImGuiEx.Text($"Follow tether age ms: {(Environment.TickCount64 - _followTetherMs)}");
        }
    }

    private void RecordOrbChaseTether(uint source, uint target)
    {
        var sourceObject = source.GetObject();
        var targetObject = target.GetObject();

        if (sourceObject is IBattleChara sourceOrb && sourceOrb.DataId == OrbDataId && targetObject is IPlayerCharacter targetPlayer)
        {
            _playerToOrb[targetPlayer.Name.ToString()] = new(sourceOrb.Address, Environment.TickCount64);
            DebugLog($"Orb {sourceOrb.EntityId} chasing {targetPlayer.Name}");
        }
        else if (targetObject is IBattleChara targetOrb && targetOrb.DataId == OrbDataId && sourceObject is IPlayerCharacter sourcePlayer)
        {
            _playerToOrb[sourcePlayer.Name.ToString()] = new(targetOrb.Address, Environment.TickCount64);
            DebugLog($"Orb {targetOrb.EntityId} chasing {sourcePlayer.Name}");
        }
    }

    private void RecordPlayerFollowTether(uint source, uint target)
    {
        if (Player.Object == null)
            return;

        var sourceObject = source.GetObject();
        var targetObject = target.GetObject();

        if (SamePlayer(targetObject, Player.Object) && sourceObject is IPlayerCharacter sourcePlayer)
        {
            PruneOldOrbRecords();
            _followSourcePlayerName = sourcePlayer.Name.ToString();
            _followTetherMs = Environment.TickCount64;
            DebugLog($"Follow source: {sourcePlayer.Name}");
        }
        else if (SamePlayer(sourceObject, Player.Object) && targetObject is IPlayerCharacter targetPlayer)
        {
            PruneOldOrbRecords();
            _followSourcePlayerName = targetPlayer.Name.ToString();
            _followTetherMs = Environment.TickCount64;
            DebugLog($"Follow target: {targetPlayer.Name}");
        }
    }

    private static bool IsSelfTether(uint source, uint target)
    {
        if (Player.Object == null)
            return false;

        return SamePlayer(source.GetObject(), Player.Object) || SamePlayer(target.GetObject(), Player.Object);
    }

    private static bool SamePlayer(IGameObject? a, IGameObject? b)
    {
        return a != null && b != null && (a.Address == b.Address || a.Name.ToString() == b.Name.ToString());
    }

    private static Vector3 GetGuidePosition(Vector3 orbPosition)
    {
        var angle = Math.Atan2(orbPosition.Z - CenterY, orbPosition.X - CenterX) - Math.PI / 2.0;
        return new Vector3(
            CenterX + MathF.Cos((float)angle) * GuideDistance,
            orbPosition.Y,
            CenterY + MathF.Sin((float)angle) * GuideDistance);
    }

    private void MoveGuide(Vector3 position)
    {
        var element = Controller.GetElementByName("Guide");
        element.refX = position.X;
        element.refY = position.Z;
        element.refZ = position.Y;
        element.Enabled = true;
    }

    private void OffAll()
    {
        Controller.GetRegisteredElements().Each(x => x.Value.Enabled = false);
    }

    private void ClearState()
    {
        _playerToOrb.Clear();
        _followSourcePlayerName = "";
        _followTetherMs = 0;
    }

    private void PruneOldOrbRecords()
    {
        var now = Environment.TickCount64;
        foreach (var key in _playerToOrb.Where(x => now - x.Value.TimestampMs > TetherPairWindowMs).Select(x => x.Key).ToList())
            _playerToOrb.Remove(key);
    }

    private void DebugLog(string message)
    {
        if (Conf.DebugPrint)
            ECommons.Logging.DuoLog.Information($"[無の追跡] {message}");
    }

    public class Config : IEzConfig
    {
        public bool DebugPrint = false;
    }

    private readonly record struct OrbRecord(nint Address, long TimestampMs);
}
```

## Layout

> [!CAUTION] PTリストに依存したレイアウト
> **PTリストの先頭`<1>`が自身のプレイヤーでない環境** では、以下のレイアウトに注意してください。  
>
> - メルトダウン_散開  
>   - 他人  
>     Placeholder <2-8> (PTリストの上から2~8番目)に、塗りつぶしの円を表示  
>
> **「メルトダウン_散開 → 他人」** のレイアウトは、**他プレイヤーの散開AoEのみ** を **塗りつぶしあり** で表示する目的で設定しています。  
> **「メルトダウン_散開 → 自分」** のレイアウトは、**自プレイヤーの散開AoEのみ** を **塗りつぶしなし** で表示します。こちらは **「self」設定による表示のため、PTリストには依存しません。**  
>
> 必要に応じて設定を変更するか、無効化してください。

> [!IMPORTANT] Configurationの設定が必要
> **Configuration** の設定が必要なレイアウトが含まれています。  
> 導入後、**Configuration** から **ロールを選択** してください。  
>
> 1. ゲーム内チャットで **/splatoon** と入力  
> 2. **Configurations** タブを開く  
> 3. **Select Zone...** を選択  
> 4. **1362 無の領域** を選択  
> 5. `Default Configuration`を全て **自身のロール** に変更

> [!TIP] 雑魚フェーズでマーカー担当になった場合の表示
> 雑魚フェーズで自身がマーカー担当になった場合、以下のように表示されます。  
>
> - 自身の扇範囲  
>   **塗りつぶしなし** の🟢**緑色の扇**で表示
> - 他プレイヤーの扇範囲  
>   **塗りつぶしあり** の🔴**赤色の扇**で表示
> - 塔と扇が重なる範囲  
>   **塗りつぶしあり** の🟡**黄色の扇**で表示
>
> 優先度に従って立ち位置を決め、**塗りつぶされていないエリア**に立てば問題ありません。

```json
~Lv2~{"Name":"無の肥大","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"玉円範囲","type":1,"radius":40.0,"fillIntensity":0.3,"thicc":4.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49977],"refActorComparisonType":3},{"Name":"玉円範囲8人頭割りライン","type":3,"refY":40.0,"offY":60.0,"radius":0.0,"color":3356032768,"fillIntensity":0.345,"thicc":8.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49977],"refActorComparisonType":3,"includeRotation":true},{"Name":"玉円範囲MT組ライン","type":3,"refY":40.0,"offX":14.14214,"offY":54.14214,"radius":0.0,"color":3372155094,"fillIntensity":0.345,"thicc":8.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49977],"refActorComparisonType":3,"includeRotation":true},{"Name":"玉円範囲ST組ライン","type":3,"refY":40.0,"offX":-14.14214,"offY":54.14214,"radius":0.0,"color":3355508731,"fillIntensity":0.345,"thicc":8.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49977],"refActorComparisonType":3,"includeRotation":true},{"Name":"ドーナツ","type":1,"radius":40.0,"Donut":20.0,"fillIntensity":0.3,"thicc":4.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49978],"refActorComparisonType":3},{"Name":"玉ドーナツ8人頭割りライン","type":3,"refY":20.0,"offY":40.0,"radius":0.0,"color":3356032768,"fillIntensity":0.3,"thicc":8.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49978],"refActorComparisonType":3,"includeRotation":true},{"Name":"玉ドーナツMT組ライン","type":3,"refX":-14.14214,"refY":25.85786,"offY":40.0,"radius":0.0,"color":3372155094,"fillIntensity":0.3,"thicc":8.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49978],"refActorComparisonType":3,"includeRotation":true},{"Name":"玉ドーナツST組ライン","type":3,"refX":14.14214,"refY":25.85786,"offY":40.0,"radius":0.0,"color":3355508731,"fillIntensity":0.3,"thicc":8.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49978],"refActorComparisonType":3,"includeRotation":true},{"Name":"本体円範囲","type":1,"radius":12.0,"fillIntensity":0.3,"thicc":4.0,"refActorNameIntl":{"Jp":"エヌオー"},"refActorRequireCast":true,"refActorCastId":[49979]},{"Name":"本体ドーナツ","type":1,"radius":6.0,"Donut":13.77,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[49980],"refActorComparisonType":6},{"Name":"小直線1","type":3,"refX":13.4,"offX":13.4,"offY":59.94,"radius":6.0,"color":3355508735,"fillIntensity":0.1,"castAnimation":3,"animationColor":1677721855,"thicc":4.0,"refActorDataID":19907,"refActorRequireCast":true,"refActorCastId":[49986],"refActorComparisonType":3,"includeRotation":true},{"Name":"小直線2","type":3,"refX":-14.0,"offX":-14.0,"offY":59.94,"radius":6.0,"color":3355508735,"fillIntensity":0.1,"castAnimation":3,"animationColor":1677721855,"thicc":4.0,"refActorDataID":19907,"refActorRequireCast":true,"refActorCastId":[49986],"refActorComparisonType":3,"includeRotation":true},{"Name":"大直線","type":3,"offY":60.04,"radius":8.0,"color":3355508735,"fillIntensity":0.1,"castAnimation":3,"animationColor":1677721855,"thicc":4.0,"refActorDataID":19906,"refActorRequireCast":true,"refActorCastId":[49985],"refActorComparisonType":3,"includeRotation":true}]}
~Lv2~{"Name":"炎の枷","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"テキスト","type":1,"Enabled":false,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508712,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":"動かない","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorType":1},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorType":1},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorType":1},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorType":1},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorType":1},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorType":1},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorType":1},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorType":1},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorType":1},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorType":1},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorType":1},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorType":1},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorType":1}]}
~Lv2~{"Name":"拡散波動 / 収束波動","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"Subconfigurations":[{"Guid":"546c897f-0075-4de8-bbc3-0e32833296d9","Name":"MT D3","Elements":[{"Name":"拡散波動_H1D1","type":1,"Enabled":false,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H1/D1","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6},{"Name":"拡散波動_H2D4","type":1,"Enabled":false,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H2/D4","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_MTD3","type":1,"offY":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"MT/D3","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_STD2","type":1,"Enabled":false,"offY":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"ST/D2","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"収束波動_MT組","type":1,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"MT組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"tether":true},{"Name":"収束波動_ST組","type":1,"Enabled":false,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"ST組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"tether":true}]},{"Guid":"bb5b4eda-57e7-4380-860f-46d50b58a816","Name":"ST D2","Elements":[{"Name":"拡散波動_H1D1","type":1,"Enabled":false,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H1/D1","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6},{"Name":"拡散波動_H2D4","type":1,"Enabled":false,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H2/D4","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_MTD3","type":1,"Enabled":false,"offY":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"MT/D3","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_STD2","type":1,"offY":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"ST/D2","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"収束波動_MT組","type":1,"Enabled":false,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"MT組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"tether":true},{"Name":"収束波動_ST組","type":1,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"ST組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"tether":true}]},{"Guid":"3c04f728-bce1-486d-91a8-98d1f2c9c04b","Name":"H1 D1","Elements":[{"Name":"拡散波動_H1D1","type":1,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H1/D1","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6},{"Name":"拡散波動_H2D4","type":1,"Enabled":false,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H2/D4","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_MTD3","type":1,"Enabled":false,"offY":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"MT/D3","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_STD2","type":1,"Enabled":false,"offY":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"ST/D2","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"収束波動_MT組","type":1,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"MT組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"onlyVisible":true,"tether":true},{"Name":"収束波動_ST組","type":1,"Enabled":false,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"ST組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"tether":true}]},{"Guid":"a23ed290-1920-4b7e-b376-934859669df5","Name":"H2 D4","Elements":[{"Name":"拡散波動_H1D1","type":1,"Enabled":false,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H1/D1","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6},{"Name":"拡散波動_H2D4","type":1,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H2/D4","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_MTD3","type":1,"Enabled":false,"offY":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"MT/D3","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_STD2","type":1,"Enabled":false,"offY":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"ST/D2","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"収束波動_MT組","type":1,"Enabled":false,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"MT組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"onlyVisible":true,"tether":true},{"Name":"収束波動_ST組","type":1,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"ST組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"tether":true}]}],"ElementsL":[{"Name":"拡散波動_H1D1","type":1,"Enabled":false,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H1/D1","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6},{"Name":"拡散波動_H2D4","type":1,"Enabled":false,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"H2/D4","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_MTD3","type":1,"Enabled":false,"offY":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"MT/D3","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"拡散波動_STD2","type":1,"Enabled":false,"offY":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayText":"ST/D2","refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50032],"refActorComparisonType":6,"tether":true},{"Name":"収束波動_MT組","type":1,"Enabled":false,"offX":-6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"MT組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"onlyVisible":true,"tether":true},{"Name":"収束波動_ST組","type":1,"Enabled":false,"offX":6.6,"radius":1.38,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508509,"overlayFScale":1.5,"thicc":4.0,"overlayTextIntl":{"Jp":"ST組"},"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50033],"refActorComparisonType":6,"tether":true}]}
~Lv2~{"Name":"混沌の渦","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"大玉","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4294967040,"overlayVOffset":5.5,"overlayFScale":5.52,"thicc":0.0,"overlayTextIntl":{"Jp":"タンク"},"refActorDataID":19910,"refActorComparisonType":3,"IsCapturing":true},{"Name":"補助線","type":3,"offY":20.0,"radius":0.5,"color":3372220160,"fillIntensity":0.345,"overlayVOffset":5.5,"overlayFScale":5.52,"overlayTextIntl":{"Jp":"タンク"},"refActorNPCNameID":14749,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"FaceMe":true,"faceplayer":"<element:大玉>"},{"Name":"早玉","type":1,"radius":0.0,"color":3355508223,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":14751,"refActorRequireBuff":true,"refActorBuffId":[2234],"refActorUseBuffParam":true,"refActorBuffParam":75,"refActorComparisonType":4,"includeHitbox":true},{"Name":"遅玉","type":1,"radius":0.0,"color":3372155045,"fillIntensity":0.5,"thicc":4.0,"refActorNPCID":14751,"refActorRequireBuff":true,"refActorBuffId":[2234],"refActorUseBuffParam":true,"refActorBuffParam":88,"refActorComparisonType":4,"includeHitbox":true},{"Name":"大玉範囲","type":1,"radius":5.4,"Donut":0.6,"color":3356425984,"fillIntensity":0.5,"thicc":4.0,"refActorDataID":19910,"refActorComparisonType":3},{"Name":"小玉範囲","type":1,"radius":3.4,"Donut":0.6,"color":3355508533,"fillIntensity":0.5,"thicc":4.0,"refActorDataID":19909,"refActorComparisonType":3},{"Name":"トリガー紫線あり","type":1,"Enabled":false,"fillIntensity":0.5,"thicc":26.2,"refActorName":"*","refActorTether":true,"refActorTetherParam2":406,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":[],"Conditional":true,"Nodraw":true},{"Name":"デバフ5","type":1,"Enabled":false,"radius":1.0,"Donut":1.0,"color":3372220415,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4177461398,"overlayVOffset":2.0,"overlayFScale":3.0,"overlayText":"5","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorComparisonType":5,"refActorType":1},{"Name":"デバフ4","type":1,"Enabled":false,"radius":1.0,"Donut":1.0,"color":3372220415,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4177461398,"overlayVOffset":2.0,"overlayFScale":3.0,"overlayText":"4","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorComparisonType":5,"refActorType":1},{"Name":"デバフ3","type":1,"Enabled":false,"radius":1.0,"Donut":1.0,"color":3372220415,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4177461398,"overlayVOffset":2.0,"overlayFScale":3.0,"overlayText":"3","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorComparisonType":5,"refActorType":1},{"Name":"デバフ2","type":1,"Enabled":false,"radius":1.0,"Donut":1.0,"color":3372220415,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4177461398,"overlayVOffset":2.0,"overlayFScale":3.0,"overlayText":"2","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":5,"refActorType":1},{"Name":"デバフ1","type":1,"Enabled":false,"radius":1.0,"Donut":1.0,"color":3372220415,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4177461398,"overlayVOffset":2.0,"overlayFScale":3.0,"overlayText":"1","refActorPlaceholder":[],"refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMax":1.0,"refActorComparisonType":5,"refActorType":1}]}
~Lv2~{"Name":"混沌の渦_被魔法ダメージ増加","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"トリガー紫線あり","type":1,"fillIntensity":0.5,"thicc":26.2,"refActorName":"*","refActorTether":true,"refActorTetherParam2":406,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":[],"Conditional":true,"Nodraw":true},{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":4.0,"refActorBuffTimeMax":5.0,"refActorType":1},{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":3.0,"refActorBuffTimeMax":4.0,"refActorType":1},{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":2.0,"refActorBuffTimeMax":3.0,"refActorType":1},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorType":1},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorType":1},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorType":1},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorType":1},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorType":1},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorType":1},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorType":1},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorType":1},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorType":1},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorType":1},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorRequireBuff":true,"refActorBuffId":[2941],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorType":1}]}
~Lv2~{"Name":"冷却","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"テキスト","type":1,"Enabled":false,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3371826944,"overlayVOffset":2.6,"overlayFScale":3.0,"thicc":0.0,"overlayText":"動く","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":3,"refActorType":1},{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":1.0,"refActorBuffTimeMax":2.0,"refActorComparisonType":3,"refActorType":1},{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.9,"refActorBuffTimeMax":1.0,"refActorType":1},{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.8,"refActorBuffTimeMax":0.9,"refActorType":1},{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.7,"refActorBuffTimeMax":0.8,"refActorType":1},{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.6,"refActorBuffTimeMax":0.7,"refActorType":1},{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.5,"refActorBuffTimeMax":0.6,"refActorType":1},{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.4,"refActorBuffTimeMax":0.5,"refActorType":1},{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.3,"refActorBuffTimeMax":0.4,"refActorType":1},{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.2,"refActorBuffTimeMax":0.3,"refActorType":1},{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMin":0.1,"refActorBuffTimeMax":0.2,"refActorType":1},{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443455,"overlayVOffset":1.5,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorRequireBuff":true,"refActorBuffId":[3523],"refActorUseBuffTime":true,"refActorBuffTimeMax":0.1,"refActorType":1}]}
~Lv2~{"Name":"雑魚扇","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"vfx2-28","type":1,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":15000,"IsCapturing":true,"Nodraw":true},{"Name":"28扇","type":4,"radius":30.0,"coneAngleMin":-31,"coneAngleMax":31,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":14752,"refActorRequireCast":true,"refActorCastId":[50036],"refActorComparisonType":6,"includeRotation":true,"onlyTargetable":true,"FaceMe":true,"faceplayer":"<element:vfx2-28>"},{"Name":"vfx2-self","type":1,"refActorPlaceholder":["<me>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"includeRotation":true,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":15000,"Conditional":true,"IsCapturing":true,"Nodraw":true},{"Name":"self扇","type":4,"radius":30.0,"coneAngleMin":-31,"coneAngleMax":31,"color":3355508564,"Filled":false,"fillIntensity":0.3,"overlayBGColor":3355443200,"overlayTextColor":3355639552,"thicc":4.0,"overlayText":"マーカー","refActorNPCNameID":14752,"refActorRequireCast":true,"refActorCastId":[50036],"refActorComparisonType":6,"includeRotation":true,"onlyTargetable":true,"FaceMe":true,"faceplayer":"<element:vfx2-self>"},{"Name":"tower","type":1,"refActorNPCNameID":14752,"refActorRequireCast":true,"refActorCastId":[50013],"refActorComparisonType":6,"IsCapturing":true,"Nodraw":true},{"Name":"tower被せない目安","type":4,"radius":30.0,"coneAngleMin":-38,"coneAngleMax":38,"color":3355508731,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":14752,"refActorRequireCast":true,"refActorCastId":[50036],"refActorComparisonType":6,"includeRotation":true,"onlyTargetable":true,"FaceMe":true,"faceplayer":"<element:tower>"},{"Name":"南北ライン","type":2,"refX":100.0,"refY":60.0,"offX":100.0,"offY":140.0,"radius":0.0,"color":3372155125,"Filled":false,"fillIntensity":0.345,"thicc":8.0}]}
~Lv2~{"Name":"無の肥大_小玉","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"VFX","type":1,"radius":6.77,"refActorComparisonType":7,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"IsCapturing":true,"Nodraw":true},{"Name":"直線範囲","type":3,"refY":20.0,"radius":3.0,"color":3371433728,"fillIntensity":0.08,"thicc":4.0,"refActorNPCNameID":14749,"refActorComparisonType":6,"includeRotation":true,"onlyVisible":true,"ExtraTetherLength":7.21,"FaceMe":true,"refActorTetherParam2":430,"refActorIsTetherLive":true,"faceplayer":"<element:VFX>"}]}
~Lv2~{"Name":"ディープフリーズ","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"Subconfigurations":[{"Guid":"cc68905e-fe0a-4cdc-839b-18f20489dfe3","Name":"MT","Elements":[{"Name":"動き続ける","type":1,"color":255,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4294967040,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"氷結デバフ\\n動き続ける","refActorType":1},{"Name":"MT","refX":91.0,"refY":91.0,"refZ":3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":109.0,"refY":91.0,"refZ":-3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ST"},{"Name":"ヒラDPS","Enabled":false,"refX":100.0,"refY":112.5,"radius":4.0,"color":3355508480,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244700928,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ヒラDPS"}]},{"Guid":"b6296d84-e9f9-4ba9-b530-98ba684f1776","Name":"ST","Elements":[{"Name":"動き続ける","type":1,"color":255,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4294967040,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"氷結デバフ\\n動き続ける","refActorType":1},{"Name":"MT","Enabled":false,"refX":91.0,"refY":91.0,"refZ":3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"MT"},{"Name":"ST","refX":109.0,"refY":91.0,"refZ":-3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ST","tether":true},{"Name":"ヒラDPS","Enabled":false,"refX":100.0,"refY":112.5,"radius":4.0,"color":3355508480,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244700928,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ヒラDPS"}]},{"Guid":"2dbcb848-b2c4-4dc8-a655-aa23b11af344","Name":"Healer or DPS","Elements":[{"Name":"動き続ける","type":1,"color":255,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4294967040,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"氷結デバフ\\n動き続ける","refActorType":1},{"Name":"MT","Enabled":false,"refX":91.0,"refY":91.0,"refZ":3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":109.0,"refY":91.0,"refZ":-3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ST"},{"Name":"ヒラDPS","refX":100.0,"refY":112.5,"radius":4.0,"color":3355508480,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244700928,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ヒラDPS","tether":true}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":10.0,"Match":">50043"},{"Type":3,"Match":"[buff-]You:3523"}],"ElementsL":[{"Name":"動き続ける","type":1,"Enabled":false,"color":255,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4294967040,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"氷結デバフ\\n動き続ける","refActorType":1},{"Name":"MT","Enabled":false,"refX":91.0,"refY":91.0,"refZ":3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"MT"},{"Name":"ST","Enabled":false,"refX":109.0,"refY":91.0,"refZ":-3.8146973E-06,"radius":4.0,"color":3372220160,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244635392,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ST"},{"Name":"ヒラDPS","Enabled":false,"refX":100.0,"refY":112.5,"radius":4.0,"color":3355508480,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4244700928,"overlayVOffset":2.0,"overlayFScale":3.0,"thicc":5.0,"overlayText":"ヒラDPS"}]}
~Lv2~{"Name":"メルトダウン_タケノコ","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Freezing":true,"FreezeFor":4.7,"FreezeDisplayDelay":2.0,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14749>50042)"}],"ElementsL":[{"Name":"円範囲","type":1,"radius":5.0,"fillIntensity":0.3,"thicc":4.0,"refActorPlaceholder":["<1>","<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"メルトダウン_散開","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"Subconfigurations":[{"Guid":"fbee83b2-5631-4022-bc79-ae24fc257550","Name":"MT","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"cc7bb590-eaea-460e-bf0c-d1fff3cbfd43","Name":"ST","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"5f002a87-2d96-421b-99bb-c114e7881077","Name":"H1","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"6c40f51d-fdc7-42dc-acb4-aedf7e5c803a","Name":"H2","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"2f1bbcca-b80b-4913-9ebe-58cb4ccdafc6","Name":"D1","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"c4e67de4-8241-4c9c-b532-72c176ca2586","Name":"D2","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"324c9cfd-4877-45be-b3cb-e633f6be9fb8","Name":"D3","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]},{"Guid":"f9bd2740-2cf7-496b-8d4f-ecbba83951f0","Name":"D4","Elements":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]}],"ElementsL":[{"Name":"ヒート注意","type":1,"radius":1.0,"Donut":1.0,"color":3355481855,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278228735,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayText":"ヒート注意","refActorRequireBuff":true,"refActorBuffId":[4562],"refActorType":1},{"Name":"トリガー本体詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50040],"refActorComparisonType":6,"Conditional":true,"Nodraw":true},{"Name":"タケノコ、ヒート注意","type":1,"radius":4.5,"Donut":0.5,"color":3372154880,"fillIntensity":0.5,"overlayBGColor":3372154880,"overlayTextColor":4294967295,"overlayVOffset":3.0,"overlayFScale":2.0,"overlayPlaceholders":true,"overlayText":"タケノコ\\nヒート注意","refActorType":1},{"Name":"トリガー散開詠唱中","type":1,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50042],"refActorComparisonType":6,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"自分","type":1,"radius":5.0,"color":3355508570,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorType":1,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"他人","type":1,"radius":5.0,"color":3355508558,"fillIntensity":0.5,"thicc":4.0,"refActorPlaceholder":["<2>","<3>","<4>","<5>","<6>","<7>","<8>"],"refActorComparisonType":5,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":6.0},{"Name":"MT","Enabled":false,"refX":100.0,"refY":91.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT","tether":true},{"Name":"ST","Enabled":false,"refX":100.0,"refY":109.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST","tether":true},{"Name":"H1","Enabled":false,"refX":91.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H1","tether":true},{"Name":"H2","Enabled":false,"refX":109.0,"refY":100.0,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"H2","tether":true},{"Name":"D1","Enabled":false,"refX":93.63604,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D1","tether":true},{"Name":"D2","Enabled":false,"refX":106.36396,"refY":106.36396,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D2","tether":true},{"Name":"D3","Enabled":false,"refX":93.63604,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D3","tether":true},{"Name":"D4","Enabled":false,"refX":106.36396,"refY":93.63604,"radius":1.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508490,"overlayFScale":1.2,"thicc":4.0,"overlayText":"D4","tether":true}]}
~Lv2~{"Name":"無の領域_塔","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"Scenes":[2],"ConditionalAnd":true,"Subconfigurations":[{"Guid":"e39df928-49ae-4e33-9b85-d63935c4c258","Name":"MT D1","Elements":[{"Name":"トリガーマーカー誰かあり","type":1,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"Nodraw":true},{"Name":"トリガーマーカー自分なし","type":1,"refActorPlaceholder":["<1>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"MT/D1","type":1,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[1],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"ST/D2","type":1,"Enabled":false,"radius":6.0,"color":3355639552,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[2],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H1/D3","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[3],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H2/D4","type":1,"Enabled":false,"radius":6.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[4],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}}]},{"Guid":"2ffa6aaa-2c9f-4295-9687-af20a0ed550e","Name":"ST D2","Elements":[{"Name":"トリガーマーカー誰かあり","type":1,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"Nodraw":true},{"Name":"トリガーマーカー自分なし","type":1,"refActorPlaceholder":["<1>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"MT/D1","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[1],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"ST/D2","type":1,"radius":6.0,"color":3355639552,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[2],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H1/D3","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[3],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H2/D4","type":1,"Enabled":false,"radius":6.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[4],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}}]},{"Guid":"180a2361-d2cf-4cce-8726-1cca5cc69e3f","Name":"H1 D3","Elements":[{"Name":"トリガーマーカー誰かあり","type":1,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"Nodraw":true},{"Name":"トリガーマーカー自分なし","type":1,"refActorPlaceholder":["<1>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"MT/D1","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[1],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"ST/D2","type":1,"Enabled":false,"radius":6.0,"color":3355639552,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[2],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H1/D3","type":1,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[3],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H2/D4","type":1,"Enabled":false,"radius":6.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[4],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}}]},{"Guid":"b71af397-8b3c-49c2-8d96-a8e710d9f0b6","Name":"H2 D4","Elements":[{"Name":"トリガーマーカー誰かあり","type":1,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"Nodraw":true},{"Name":"トリガーマーカー自分なし","type":1,"refActorPlaceholder":["<1>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"MT/D1","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[1],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"ST/D2","type":1,"Enabled":false,"radius":6.0,"color":3355639552,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[2],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H1/D3","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[3],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H2/D4","type":1,"radius":6.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[4],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}}]}],"ElementsL":[{"Name":"トリガーマーカー誰かあり","type":1,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"Nodraw":true},{"Name":"トリガーマーカー自分なし","type":1,"refActorPlaceholder":["<1>"],"refActorComparisonAnd":true,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_trg07_0a1.avfx","refActorVFXMax":7000,"Conditional":true,"ConditionalInvert":true,"Nodraw":true},{"Name":"MT/D1","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[1],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"ST/D2","type":1,"Enabled":false,"radius":6.0,"color":3355639552,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[2],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H1/D3","type":1,"Enabled":false,"radius":6.0,"color":3356032768,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[3],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}},{"Name":"H2/D4","type":1,"Enabled":false,"radius":6.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"thicc":4.0,"refActorNPCNameID":14752,"refActorComparisonType":6,"onlyUnTargetable":true,"tether":true,"LimitDistance":true,"LimitDistanceInvert":true,"DistanceSourceX":100.0,"DistanceSourceY":100.0,"DistanceMax":1.0,"Enumeration":1,"EnumerationOrder":[4],"EnumerationCenter":{"X":100.0,"Y":100.0},"EnumerationStart":{"X":100.0,"Y":80.0}}]}
~Lv2~{"Name":"無の追跡","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"線1回目枠","type":1,"radius":0.0,"color":4278190080,"fillIntensity":1.0,"thicc":15.0,"refActorName":"*","tether":true,"ExtraTetherLength":2.8,"refActorTether":true,"refActorTetherParam2":404,"refActorIsTetherSource":true,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":["<me>"]},{"Name":"線1回目","type":1,"radius":0.0,"color":4278255432,"fillIntensity":1.0,"thicc":10.0,"refActorName":"*","tether":true,"ExtraTetherLength":3.0,"LineEndB":1,"refActorTether":true,"refActorTetherParam2":404,"refActorIsTetherSource":true,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":["<me>"]},{"Name":"線2回目枠","type":1,"radius":0.0,"color":4278190080,"fillIntensity":1.0,"thicc":15.0,"refActorName":"*","tether":true,"ExtraTetherLength":2.8,"refActorTether":true,"refActorTetherParam2":405,"refActorIsTetherSource":true,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":["<me>"]},{"Name":"線2回目","type":1,"radius":0.0,"color":4278255615,"fillIntensity":1.0,"thicc":10.0,"refActorName":"*","tether":true,"ExtraTetherLength":3.0,"refActorTether":true,"refActorTetherParam2":405,"refActorIsTetherSource":true,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":["<me>"]},{"Name":"線1","type":1,"radius":0.0,"color":4278190080,"fillIntensity":1.0,"thicc":15.0,"refActorName":"*","tether":true,"ExtraTetherLength":2.8,"refActorTether":true,"refActorTetherParam2":404,"refActorIsTetherSource":true,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":[],"Conditional":true,"Nodraw":true},{"Name":"線2","type":1,"radius":0.0,"color":4278190080,"fillIntensity":1.0,"thicc":15.0,"refActorName":"*","tether":true,"ExtraTetherLength":2.8,"refActorTether":true,"refActorTetherParam2":405,"refActorIsTetherSource":true,"refActorIsTetherLive":true,"refActorTetherConnectedWithPlayer":[],"Conditional":true,"Nodraw":true},{"Name":"追尾玉 範囲","type":1,"radius":6.0,"color":3355508490,"fillIntensity":0.3,"thicc":4.0,"refActorDataID":20149,"refActorComparisonType":3},{"Name":"ランニング目安","refX":100.0,"refY":100.0,"radius":14.5,"Donut":2.0,"color":3372217088,"fillIntensity":0.2,"thicc":4.0,"includeRotation":true},{"Name":"真心AC","type":2,"refX":100.0,"refY":83.5,"offX":100.0,"offY":116.5,"radius":0.0,"color":3372199680,"fillIntensity":0.345,"thicc":8.0},{"Name":"真心BD","type":2,"refX":116.5,"refY":100.0,"offX":83.5,"offY":100.0,"radius":0.0,"color":3372199680,"fillIntensity":0.345,"thicc":8.0},{"Name":"真心13","type":2,"refX":88.33274,"refY":88.33274,"offX":111.66726,"offY":111.66726,"radius":0.0,"color":3372155131,"fillIntensity":0.345,"thicc":8.0},{"Name":"真心24","type":2,"refX":111.66726,"refY":88.33274,"offX":88.33274,"offY":111.66726,"radius":0.0,"color":3372155131,"fillIntensity":0.345,"thicc":8.0}]}
~Lv2~{"Name":"無の渦","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"長","type":1,"offY":18.0,"radius":7.0,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[50000],"refActorComparisonType":6,"includeRotation":true,"AdditionalRotation":5.7595863},{"Name":"中","type":1,"offY":12.3,"radius":7.0,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[49999],"refActorComparisonType":6,"includeRotation":true,"AdditionalRotation":5.934119},{"Name":"短","type":1,"offY":6.3,"radius":7.0,"fillIntensity":0.3,"thicc":4.0,"refActorNPCNameID":14749,"refActorRequireCast":true,"refActorCastId":[49998],"refActorComparisonType":6,"includeRotation":true,"AdditionalRotation":6.1086526}]}
~Lv2~{"Name":"シャドウホーリー","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"Subconfigurations":[{"Guid":"9a219543-b118-42cf-98e7-378d5b1e2c33","Name":"MT組(MTH1D1D3)","Elements":[{"Name":"4:4頭割り","type":1,"radius":5.6,"Donut":0.4,"color":3372218624,"fillIntensity":0.5,"thicc":4.0,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_share3_6s0p.avfx","refActorVFXMax":6000,"Conditional":true},{"Name":"MT組","refX":92.0,"refY":100.0,"radius":1.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3358850816,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT組","tether":true},{"Name":"ST組","Enabled":false,"refX":108.0,"refY":100.0,"radius":1.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3358850816,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST組","tether":true}]},{"Guid":"a263f75f-2be0-4d55-8eca-5bd6df04ec76","Name":"ST組(STH2D2D4)","Elements":[{"Name":"4:4頭割り","type":1,"radius":5.6,"Donut":0.4,"color":3372218624,"fillIntensity":0.5,"thicc":4.0,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_share3_6s0p.avfx","refActorVFXMax":6000,"Conditional":true},{"Name":"MT組","Enabled":false,"refX":92.0,"refY":100.0,"radius":1.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3358850816,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT組","tether":true},{"Name":"ST組","refX":108.0,"refY":100.0,"radius":1.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3358850816,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST組","tether":true}]}],"ElementsL":[{"Name":"4:4頭割り","type":1,"radius":5.6,"Donut":0.4,"color":3372218624,"fillIntensity":0.5,"thicc":4.0,"refActorComparisonType":7,"refActorVFXPath":"vfx/lockon/eff/com_share3_6s0p.avfx","refActorVFXMax":6000,"Conditional":true},{"Name":"MT組","Enabled":false,"refX":92.0,"refY":100.0,"radius":1.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3358850816,"overlayFScale":1.2,"thicc":4.0,"overlayText":"MT組","tether":true},{"Name":"ST組","Enabled":false,"refX":108.0,"refY":100.0,"radius":1.0,"color":3355508490,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3358850816,"overlayFScale":1.2,"thicc":4.0,"overlayText":"ST組","tether":true}]}
~Lv2~{"Name":"ディープフリーズ_CD6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(14749>50043)"}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14749>50043)","MatchDelay":0.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14749>50043)","MatchDelay":1.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14749>50043)","MatchDelay":2.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14749>50043)","MatchDelay":3.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":4.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.9","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":4.8}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.8","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":4.9}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":5.0}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":5.1}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":5.2}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":5.3}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":5.4}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":5.5}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"ディープフリーズ_CD0.1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14749>50043)","MatchDelay":5.6}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(14752>50013)"}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14752>50013)","MatchDelay":0.7}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14752>50013)","MatchDelay":1.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14752>50013)","MatchDelay":2.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14752>50013)","MatchDelay":3.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14752>50013)","MatchDelay":4.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":5.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.9","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":5.8}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.8","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":5.9}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":6.0}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":6.1}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":6.2}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":6.3}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":6.4}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":6.5}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"虚ろなる衝撃_CD0.1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14752>50013)","MatchDelay":6.6}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"無の肥大_THD","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":9.0,"Match":"エヌオーは「無の肥大」の構え。"}],"ElementsL":[{"Name":"T","type":1,"radius":0.0,"color":3372155392,"fillIntensity":0.5,"thicc":12.0,"refActorPlaceholder":["<t1>","<t2>"],"refActorComparisonType":5},{"Name":"H","type":1,"radius":0.0,"color":3355508490,"fillIntensity":0.5,"thicc":12.0,"refActorPlaceholder":["<h1>","<h2>"],"refActorComparisonType":5},{"Name":"D","type":1,"radius":0.0,"color":3355470335,"fillIntensity":0.5,"thicc":12.0,"refActorPlaceholder":["<d1>","<d2>","<d3>","<d4>"],"refActorComparisonType":5}]}
~Lv2~{"Name":"無の肥大_8 or 4:4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ConditionalAnd":true,"Subconfigurations":[{"Guid":"3802920f-a024-485d-8cf6-4f30280b1d99","Name":"MT組(MTH1D1D3)","Elements":[{"Name":"not h1 vfx","type":1,"refActorPlaceholder":["<h1>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"8人頭割り","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255420,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8 Stack","refActorType":1},{"Name":"not h2 vfx","type":1,"refActorPlaceholder":["<h2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"8人頭割り","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255420,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8 Stack","refActorType":1},{"Name":"h1 vfx","type":1,"refActorPlaceholder":["<h1>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"h2 vfx","type":1,"refActorPlaceholder":["<h2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"Nodraw":true},{"Name":"4 - 4 頭割り MT組","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4293984511,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4 Stack","refActorType":1},{"Name":"4 - 4 頭割り ST組","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255611,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4 Stack","refActorType":1}]},{"Guid":"edeed8e6-ff4f-4ac6-a495-8f39ad1e81c8","Name":"ST組(STH2D2D4)","Elements":[{"Name":"not h1 vfx","type":1,"refActorPlaceholder":["<h1>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"8人頭割り","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255420,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8 Stack","refActorType":1},{"Name":"not h2 vfx","type":1,"refActorPlaceholder":["<h2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"8人頭割り","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255420,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8 Stack","refActorType":1},{"Name":"h1 vfx","type":1,"refActorPlaceholder":["<h1>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"h2 vfx","type":1,"refActorPlaceholder":["<h2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"Nodraw":true},{"Name":"4 - 4 頭割り MT組","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4293984511,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4 Stack","refActorType":1},{"Name":"4 - 4 頭割り ST組","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255611,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4 Stack","refActorType":1}]}],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":7.0,"Match":"エヌオーは「無の肥大」の構え。"}],"ElementsL":[{"Name":"not h1 vfx","type":1,"refActorPlaceholder":["<h1>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"8人頭割り","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255420,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8 Stack","refActorType":1},{"Name":"not h2 vfx","type":1,"refActorPlaceholder":["<h2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"8人頭割り","type":1,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255420,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8 Stack","refActorType":1},{"Name":"h1 vfx","type":1,"refActorPlaceholder":["<h1>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"h2 vfx","type":1,"refActorPlaceholder":["<h2>"],"refActorComparisonAnd":true,"refActorComparisonType":5,"refActorVFXPath":"vfx/channeling/eff/chn_z5fd19_0a1.avfx","refActorVFXMax":8000,"Conditional":true,"Nodraw":true},{"Name":"4 - 4 頭割り MT組","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4293984511,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4 Stack","refActorType":1},{"Name":"4 - 4 頭割り ST組","type":1,"Enabled":false,"radius":0.0,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":4278255611,"overlayVOffset":2.7,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4 Stack","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD8","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"エヌオーは「無の肥大」の構え。"}],"ElementsL":[{"Name":"8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"8","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":0.7}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":1.7}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":2.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":3.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":4.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":5.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":6.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.9","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":6.8}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.8","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":6.9}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.0}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.1}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.2}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.3}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.4}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.5}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"無の肥大_CD0.1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.6}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"無の肥大_頭割り","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":2.0,"Match":"エヌオーは「無の肥大」の構え。","MatchDelay":7.7}],"ElementsL":[{"Name":"被魔法ダメージ増加","type":1,"refActorRequireBuff":true,"refActorBuffId":[2941],"refActorType":1,"Conditional":true,"ConditionalInvert":true,"ConditionalReset":true,"Nodraw":true},{"Name":"Wait","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355494597,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Wait","refActorType":1},{"Name":"被魔法ダメージ増加","type":1,"refActorRequireBuff":true,"refActorBuffId":[2941],"refActorType":1,"Conditional":true,"ConditionalReset":true,"Nodraw":true},{"Name":"Go","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3358443520,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"Go","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.7,"Match":"(14750>49985)"}],"ElementsL":[{"Name":"7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"7","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14750>49985)","MatchDelay":0.7}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14750>49985)","MatchDelay":1.7}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14750>49985)","MatchDelay":2.7}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14750>49985)","MatchDelay":3.7}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"(14750>49985)","MatchDelay":4.7}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":5.7}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.9","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":5.8}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.8","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":5.9}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":6.0}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":6.1}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":6.2}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":6.3}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":6.4}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":6.5}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"集積波動_CD0.1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"(14750>49985)","MatchDelay":6.6}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU"}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":1.0}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":2.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":3.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.9","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.8","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"追跡_2回目_CD0.1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"TetherParam:(0, 405, 15) TetherTarget:YOU","MatchDelay":4.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me"}],"ElementsL":[{"Name":"6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"6","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":1.0}],"ElementsL":[{"Name":"5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"5","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":2.0}],"ElementsL":[{"Name":"4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"4","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":3.0}],"ElementsL":[{"Name":"3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508480,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"3","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":1.0,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":4.0}],"ElementsL":[{"Name":"2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355508735,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"2","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.0}],"ElementsL":[{"Name":"1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"1","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.9","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.1}],"ElementsL":[{"Name":"0.9","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.9","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.8","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.2}],"ElementsL":[{"Name":"0.8","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.8","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.7","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.3}],"ElementsL":[{"Name":"0.7","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.7","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.6","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.4}],"ElementsL":[{"Name":"0.6","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.6","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.5","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.5}],"ElementsL":[{"Name":"0.5","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.5","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.4","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.6}],"ElementsL":[{"Name":"0.4","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.4","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.3","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.7}],"ElementsL":[{"Name":"0.3","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.3","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.2","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.8}],"ElementsL":[{"Name":"0.2","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.2","refActorType":1}]}
~Lv2~{"Name":"追跡_1回目_CD0.1","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"DCond":5,"UseTriggers":true,"Triggers":[{"Type":2,"Duration":0.1,"Match":"vfx/lockon/eff/com_trg06_0v.avfx spawned on me","MatchDelay":5.9}],"ElementsL":[{"Name":"0.1","type":1,"radius":0.0,"Filled":false,"fillIntensity":0.5,"overlayBGColor":3355443200,"overlayTextColor":3355443400,"overlayVOffset":1.3,"overlayFScale":3.0,"thicc":0.0,"overlayText":"0.1","refActorType":1}]}
~Lv2~{"Name":"無の追跡","Group":"7.5 Extreme N-O","ZoneLockH":[1362],"ElementsL":[{"Name":"cast 無の追跡","type":1,"refActorNPCID":14749,"refActorRequireCast":true,"refActorCastId":[49992],"refActorComparisonType":4,"Conditional":true,"Nodraw":true},{"Name":"矢印","type":3,"refX":-5.90885,"refY":15.95811,"radius":0.0,"color":3355508509,"fillIntensity":0.345,"thicc":8.0,"refActorDataID":20149,"refActorComparisonType":3,"includeRotation":true,"LineEndA":1},{"Name":"円","type":1,"offX":-6.0,"offY":17.0,"radius":1.0,"color":3355508509,"Filled":false,"fillIntensity":0.345,"thicc":4.0,"refActorDataID":20149,"refActorComparisonType":3,"includeRotation":true,"LineEndA":1}]}
```
