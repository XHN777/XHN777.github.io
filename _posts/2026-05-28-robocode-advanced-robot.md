---
layout: post
title: "Robocode AdvancedRobot 开发笔记：从雷达锁定到智能移动"
date: 2026-05-28
category: Robocode
tags: [Java, Robocode, AdvancedRobot, AI]
---

## 什么是 Robocode？

[Robocode](https://robocode.sourceforge.io/) 是一个编程对战游戏，你需要用 Java 编写一个坦克机器人，在虚拟战场上与其他机器人对战。AdvancedRobot 是其中功能最强大的基类，支持独立控制雷达、炮塔和底盘。

## 雷达锁定策略

雷达锁定是战斗的第一步。在 Robocode 中，雷达、炮塔、底盘可以独立旋转，合理的雷达锁定策略能让你始终掌握敌人的位置。

```java
public void run() {
    setTurnRadarRight(Double.POSITIVE_INFINITY);
    while (true) {
        // 雷达持续旋转扫描
        execute();
    }
}

public void onScannedRobot(ScannedRobotEvent e) {
    // 锁定目标：将雷达对准敌人方向
    double angle = getHeadingRadians() + e.getBearingRadians();
    setTurnRadarRightRadians(
        robocode.util.Utils.normalRelativeAngle(angle - getRadarHeadingRadians()) * 2
    );
}
```

这段代码的要点是 `* 2`：雷达锁定角度乘以 2，确保雷达在目标两侧来回扫描，不会丢失目标。

## 非线性移动

最简单的移动是直线来回，但这在高级对战中很容易被预判。非线性移动的核心是**让敌人无法预测你的下一步位置**。

常用的策略包括：

- **随机角度偏移**：每次移动时随机偏转一个小角度
- **Wall Smoothing**：在接近墙壁时平滑转向，避免撞墙
- **反重力移动**：给敌人、墙壁等施加虚拟力场

## 实战经验

在测试中，我发现以下组合效果最好：

1. **雷达**：锁定角度乘 2.5（比默认 2 更好的覆盖）
2. **移动**：随机偏转 + Wall Smoothing
3. **火控**：根据距离动态调整火力

后续会继续记录能量管理、弹道预测等更深入的内容。
