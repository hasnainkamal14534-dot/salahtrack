"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-950: #0a2218;
    --green-900: #0e3222;
    --green-800: #14472f;
    --green-700: #1a5e3c;
    --green-600: #1f7549;
    --green-500: #258c56;
    --green-400: #34a96a;
    --green-300: #5dc48a;
    --green-200: #9dddb8;
    --green-100: #cdf0df;
    --green-50:  #ecfbf3;
    --green-25:  #f5fdf8;

    --gold-500: #c49a3c;
    --gold-400: #d4aa52;
    --gold-300: #e8c878;
    --gold-100: #fef7e6;

    --sand-100: #faf8f4;
    --sand-200: #f2ede4;
    --sand-300: #e5ddd0;
    --sand-400: #c9bfae;
    --sand-500: #a09080;

    --night-900: #0d1117;
    --night-800: #161b22;
    --night-700: #21262d;
    --night-600: #30363d;
    --night-500: #484f58;
    --night-400: #656d76;
    --night-300: #8b949e;
    --night-200: #b1bac4;
    --night-100: #e6edf3;

    --surface-bg:    #f8faf9;
    --surface-card:  #ffffff;
    --surface-hover: #f0f9f4;
    --border-light:  rgba(26,110,60,0.1);
    --border-medium: rgba(26,110,60,0.18);

    --text-primary:   #0e2a1c;
    --text-secondary: #3d6450;
    --text-muted:     #6b8f7a;
    --text-inverse:   #ffffff;

    --shadow-sm: 0 1px 3px rgba(14,42,28,0.06), 0 1px 2px rgba(14,42,28,0.04);
    --shadow-md: 0 4px 12px rgba(14,42,28,0.08), 0 2px 4px rgba(14,42,28,0.04);
    --shadow-lg: 0 8px 32px rgba(14,42,28,0.12), 0 4px 8px rgba(14,42,28,0.06);

    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 9999px;

    --font-display: 'Amiri', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;

    --nav-h: 64px;
    --sidebar-w: 240px;
    --transition: 200ms cubic-bezier(0.4,0,0.2,1);
  }

  html { font-size: 16px; scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--surface-bg);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--green-200); border-radius: 3px; }

  /* ── Layout ── */
  .app-shell { display: flex; min-height: 100vh; }

  .sidebar {
    width: var(--sidebar-w);
    background: var(--green-900);
    position: fixed; left: 0; top: 0; bottom: 0;
    display: flex; flex-direction: column;
    z-index: 100;
    transition: transform var(--transition);
  }

  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .logo-mark {
    display: flex; align-items: center; gap: 10px;
  }

  .logo-icon {
    width: 36px; height: 36px;
    background: var(--green-400);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }

  .logo-text {
    font-family: var(--font-display);
    font-size: 22px; font-weight: 700;
    color: #fff;
    letter-spacing: 0.3px;
  }

  .logo-sub {
    font-size: 11px; color: var(--green-300);
    letter-spacing: 1.5px; text-transform: uppercase;
    margin-top: 2px; margin-left: 46px;
  }

  .sidebar-nav {
    flex: 1; padding: 16px 12px;
    display: flex; flex-direction: column; gap: 2px;
    overflow-y: auto;
  }

  .nav-section-label {
    font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--green-500);
    padding: 12px 8px 6px;
  }

  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: var(--green-200);
    font-size: 14px; font-weight: 400;
    transition: background var(--transition), color var(--transition);
    border: none; background: transparent; width: 100%; text-align: left;
  }

  .nav-item:hover {
    background: rgba(255,255,255,0.06);
    color: #fff;
  }

  .nav-item.active {
    background: var(--green-700);
    color: #fff;
    font-weight: 500;
  }

  .nav-item .nav-icon { font-size: 18px; flex-shrink: 0; }
  .nav-item .nav-badge {
    margin-left: auto;
    background: var(--green-400); color: #fff;
    font-size: 11px; font-weight: 600;
    padding: 1px 7px; border-radius: var(--radius-full);
  }

  .sidebar-footer {
    padding: 16px 12px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .user-chip {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background var(--transition);
  }
  .user-chip:hover { background: rgba(255,255,255,0.06); }

  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--green-600);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 600; color: #fff;
    flex-shrink: 0;
  }

  .user-name { font-size: 13px; color: #fff; font-weight: 500; flex: 1; min-width: 0; }
  .user-email { font-size: 11px; color: var(--green-300); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── Main Content ── */
  .main-content {
    margin-left: var(--sidebar-w);
    flex: 1;
    display: flex; flex-direction: column;
    min-height: 100vh;
  }

  .topbar {
    height: var(--nav-h);
    background: var(--surface-card);
    border-bottom: 1px solid var(--border-light);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px;
    position: sticky; top: 0; z-index: 50;
    gap: 16px;
  }

  .topbar-left { display: flex; align-items: center; gap: 12px; }

  .page-title {
    font-size: 17px; font-weight: 600;
    color: var(--text-primary);
  }

  .topbar-right { display: flex; align-items: center; gap: 10px; }

  .topbar-btn {
    width: 36px; height: 36px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-light);
    background: transparent;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--text-secondary);
    transition: background var(--transition), border-color var(--transition);
  }
  .topbar-btn:hover {
    background: var(--surface-hover);
    border-color: var(--border-medium);
  }

  .date-chip {
    font-size: 13px; color: var(--text-secondary);
    background: var(--sand-100);
    border: 1px solid var(--sand-300);
    padding: 5px 12px;
    border-radius: var(--radius-full);
  }

  .page-body {
    flex: 1;
    padding: 28px;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
  }

  /* ── Cards ── */
  .card {
    background: var(--surface-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .card-header {
    padding: 20px 24px 0;
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px;
  }

  .card-title {
    font-size: 15px; font-weight: 600;
    color: var(--text-primary);
  }

  .card-subtitle {
    font-size: 13px; color: var(--text-muted);
    margin-top: 2px;
  }

  .card-body { padding: 20px 24px; }

  /* ── Stat Cards ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }

  .stat-card {
    background: var(--surface-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 20px;
    box-shadow: var(--shadow-sm);
    display: flex; flex-direction: column; gap: 8px;
    position: relative; overflow: hidden;
    transition: box-shadow var(--transition), border-color var(--transition);
    cursor: default;
  }

  .stat-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--border-medium);
  }

  .stat-card.accent {
    background: linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%);
    border-color: var(--green-600);
    color: #fff;
  }

  .stat-card::after {
    content: '';
    position: absolute;
    top: -20px; right: -20px;
    width: 80px; height: 80px;
    border-radius: 50%;
    background: rgba(37,140,86,0.06);
    pointer-events: none;
  }

  .stat-card.accent::after { background: rgba(255,255,255,0.05); }

  .stat-label {
    font-size: 12px; font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .stat-card.accent .stat-label { color: var(--green-200); }

  .stat-value {
    font-size: 32px; font-weight: 600;
    color: var(--text-primary);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .stat-card.accent .stat-value { color: #fff; }

  .stat-trend {
    font-size: 12px; color: var(--green-500);
    display: flex; align-items: center; gap: 4px;
  }

  .stat-card.accent .stat-trend { color: var(--green-200); }

  .stat-icon {
    position: absolute;
    top: 18px; right: 18px;
    font-size: 22px; opacity: 0.4;
  }

  /* ── Prayer Cards ── */
  .prayer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
  }

  .prayer-card {
    background: var(--surface-card);
    border: 2px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 20px 16px;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
    cursor: pointer;
    transition: all var(--transition);
    position: relative;
    text-align: center;
    user-select: none;
  }

  .prayer-card:hover:not(.completed) {
    border-color: var(--green-300);
    background: var(--green-25);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .prayer-card.completed {
    background: linear-gradient(135deg, var(--green-25) 0%, #f0fbf5 100%);
    border-color: var(--green-300);
  }

  .prayer-card.missed {
    background: #fdf9f8;
    border-color: #e8cfc9;
  }

  .prayer-icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    transition: all var(--transition);
  }

  .prayer-card .prayer-icon { background: var(--sand-200); }
  .prayer-card.completed .prayer-icon { background: var(--green-100); }
  .prayer-card.missed .prayer-icon { background: #fceae7; }

  .prayer-name {
    font-size: 15px; font-weight: 600;
    color: var(--text-primary);
    font-family: var(--font-display);
  }

  .prayer-time {
    font-size: 12px; color: var(--text-muted);
    background: var(--sand-100);
    border: 1px solid var(--sand-300);
    padding: 2px 8px; border-radius: var(--radius-full);
  }

  .prayer-card.completed .prayer-time {
    background: var(--green-50);
    border-color: var(--green-200);
    color: var(--green-600);
  }

  .prayer-status-btn {
    width: 100%;
    padding: 8px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-medium);
    background: transparent;
    font-size: 13px; font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition);
    font-family: var(--font-body);
  }

  .prayer-status-btn:hover {
    background: var(--green-700);
    color: #fff;
    border-color: var(--green-700);
  }

  .prayer-card.completed .prayer-status-btn {
    background: var(--green-600);
    border-color: var(--green-600);
    color: #fff;
  }

  .prayer-card.completed .prayer-status-btn:hover {
    background: var(--green-700);
    border-color: var(--green-700);
  }

  .prayer-card .check-badge {
    position: absolute; top: -6px; right: -6px;
    width: 22px; height: 22px;
    background: var(--green-500); color: #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    border: 2px solid var(--surface-card);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--transition);
  }

  .prayer-card.completed .check-badge {
    opacity: 1; transform: scale(1);
  }

  /* ── Streak Ring ── */
  .streak-ring-container {
    display: flex; align-items: center; gap: 24px;
    padding: 24px;
  }

  .streak-ring {
    position: relative;
    width: 110px; height: 110px; flex-shrink: 0;
  }

  .streak-ring svg { transform: rotate(-90deg); }

  .streak-ring .ring-bg { stroke: var(--sand-200); }
  .streak-ring .ring-fill {
    stroke: var(--green-500);
    stroke-linecap: round;
    transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1);
  }

  .streak-ring-label {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }

  .streak-number {
    font-size: 26px; font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .streak-unit {
    font-size: 11px; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.8px;
  }

  .streak-info { flex: 1; }

  .streak-title {
    font-size: 18px; font-weight: 600;
    font-family: var(--font-display);
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .streak-desc { font-size: 14px; color: var(--text-secondary); margin-bottom: 12px; }

  .streak-best {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; color: var(--gold-500);
    background: var(--gold-100);
    border: 1px solid #f0d9a0;
    padding: 4px 12px; border-radius: var(--radius-full);
  }

  /* ── Week Bars ── */
  .week-bars {
    display: flex; align-items: flex-end; gap: 8px;
    height: 80px;
    padding: 0 4px;
  }

  .week-day {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 4px;
  }

  .week-bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; min-height: 60px; }

  .week-bar {
    width: 100%;
    border-radius: 4px 4px 0 0;
    transition: height 0.8s cubic-bezier(0.4,0,0.2,1);
    cursor: pointer;
    position: relative;
  }

  .week-bar.full { background: var(--green-500); }
  .week-bar.partial { background: var(--green-300); }
  .week-bar.empty { background: var(--sand-300); }
  .week-bar.today { background: var(--green-700); box-shadow: 0 0 0 2px var(--green-300); }

  .week-day-label {
    font-size: 11px; color: var(--text-muted);
    font-weight: 500; text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .week-day-label.today { color: var(--green-600); font-weight: 600; }

  /* ── Monthly Heatmap ── */
  .heatmap-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .heatmap-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    cursor: pointer;
    transition: all var(--transition);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 500;
  }

  .heatmap-cell:hover { transform: scale(1.15); }
  .heatmap-cell.level-0 { background: var(--sand-200); color: var(--sand-400); }
  .heatmap-cell.level-1 { background: var(--green-100); color: var(--green-700); }
  .heatmap-cell.level-2 { background: var(--green-200); color: var(--green-800); }
  .heatmap-cell.level-3 { background: var(--green-400); color: #fff; }
  .heatmap-cell.level-4 { background: var(--green-600); color: #fff; }
  .heatmap-cell.today-cell { outline: 2px solid var(--green-500); outline-offset: 1px; }
  .heatmap-cell.future { background: transparent; cursor: default; }

  /* ── Badge Cards ── */
  .badge-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }

  .badge-item {
    background: var(--surface-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    padding: 16px 12px;
    text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    transition: all var(--transition);
  }

  .badge-item.earned {
    border-color: var(--gold-300);
    background: var(--gold-100);
  }

  .badge-item:not(.earned) { opacity: 0.5; filter: grayscale(1); }

  .badge-emoji { font-size: 32px; }

  .badge-name {
    font-size: 13px; font-weight: 600;
    color: var(--text-primary);
  }

  .badge-item.earned .badge-name { color: #8a6a1a; }

  .badge-desc { font-size: 11px; color: var(--text-muted); line-height: 1.4; }

  /* ── Leaderboard ── */
  .leaderboard-table { width: 100%; border-collapse: collapse; }

  .leaderboard-table th {
    font-size: 11px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; color: var(--text-muted);
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-light);
    text-align: left;
  }

  .leaderboard-table th:last-child { text-align: right; }

  .leaderboard-table tr:hover td { background: var(--surface-hover); }

  .leaderboard-table td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-light);
    font-size: 14px; color: var(--text-primary);
    transition: background var(--transition);
  }

  .leaderboard-table td:last-child { text-align: right; }

  .rank-badge {
    width: 28px; height: 28px;
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    background: var(--sand-200); color: var(--text-secondary);
  }

  .rank-badge.gold { background: #fef3c7; color: #92400e; }
  .rank-badge.silver { background: #f1f5f9; color: #475569; }
  .rank-badge.bronze { background: #fdf4ef; color: #92400e; }

  .score-pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: var(--radius-full);
    font-size: 13px; font-weight: 600;
    background: var(--green-50); color: var(--green-700);
    border: 1px solid var(--green-200);
  }

  /* ── Tabs ── */
  .tabs {
    display: flex; gap: 2px;
    background: var(--sand-200);
    border-radius: var(--radius-sm);
    padding: 3px;
    width: fit-content;
  }

  .tab-btn {
    padding: 7px 16px;
    border-radius: 6px;
    border: none;
    background: transparent;
    font-size: 13px; font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--transition);
    font-family: var(--font-body);
  }

  .tab-btn.active {
    background: var(--surface-card);
    color: var(--text-primary);
    box-shadow: var(--shadow-sm);
  }

  /* ── Progress Bar ── */
  .progress-wrap {
    height: 8px;
    background: var(--sand-200);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: var(--radius-full);
    transition: width 1s cubic-bezier(0.4,0,0.2,1);
  }

  .progress-fill.green { background: var(--green-500); }
  .progress-fill.gold { background: var(--gold-400); }

  /* ── Community Banner ── */
  .community-banner {
    background: linear-gradient(135deg, var(--green-800) 0%, var(--green-900) 100%);
    border-radius: var(--radius-lg);
    padding: 24px;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }

  .community-banner::before {
    content: 'الله أكبر';
    font-family: var(--font-display);
    position: absolute; top: 10px; right: 24px;
    font-size: 36px; opacity: 0.06;
    color: #fff; white-space: nowrap;
    letter-spacing: 2px;
  }

  .community-stat-label {
    font-size: 11px; font-weight: 500;
    color: var(--green-200); text-transform: uppercase;
    letter-spacing: 0.8px; margin-bottom: 6px;
  }

  .community-stat-value {
    font-size: 26px; font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .community-stat-sub {
    font-size: 12px; color: var(--green-300); margin-top: 4px;
  }

  /* ── Prayer Times Panel ── */
  .prayer-times-panel {
    background: var(--surface-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .prayer-times-header {
    background: var(--green-700);
    padding: 16px 20px;
    color: #fff;
    display: flex; align-items: center; justify-content: space-between;
  }

  .prayer-times-header h3 {
    font-family: var(--font-display);
    font-size: 17px; font-weight: 700;
  }

  .next-prayer-chip {
    background: rgba(255,255,255,0.15);
    padding: 4px 10px; border-radius: var(--radius-full);
    font-size: 12px; color: var(--green-100);
  }

  .prayer-time-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 20px;
    border-bottom: 1px solid var(--border-light);
    transition: background var(--transition);
  }

  .prayer-time-row:last-child { border-bottom: none; }

  .prayer-time-row:hover { background: var(--surface-hover); }

  .prayer-time-row.current-prayer {
    background: var(--green-25);
  }

  .prayer-time-name {
    font-size: 14px; font-weight: 500;
    color: var(--text-primary);
    display: flex; align-items: center; gap: 8px;
  }

  .prayer-time-name .current-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--green-500);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.3); }
  }

  .prayer-time-val {
    font-size: 14px; font-weight: 600;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }

  .prayer-time-row.current-prayer .prayer-time-val { color: var(--green-600); }

  /* ── Settings ── */
  .settings-section { margin-bottom: 28px; }

  .settings-label {
    font-size: 12px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 1px;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .settings-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border-light);
  }

  .settings-row:last-child { border-bottom: none; }

  .settings-row-label { font-size: 14px; color: var(--text-primary); }
  .settings-row-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  /* Toggle */
  .toggle-switch {
    position: relative; width: 42px; height: 24px;
    cursor: pointer; flex-shrink: 0;
  }
  .toggle-switch input { opacity: 0; width: 0; height: 0; }
  .toggle-track {
    position: absolute; inset: 0;
    background: var(--sand-300);
    border-radius: var(--radius-full);
    transition: background var(--transition);
  }
  .toggle-switch input:checked + .toggle-track { background: var(--green-500); }
  .toggle-thumb {
    position: absolute;
    top: 3px; left: 3px;
    width: 18px; height: 18px;
    border-radius: 50%; background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: transform var(--transition);
  }
  .toggle-switch input:checked ~ .toggle-thumb { transform: translateX(18px); }

  /* ── Greeting ── */
  .greeting-banner {
    margin-bottom: 24px;
    padding: 24px 28px;
    background: var(--surface-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px;
    position: relative; overflow: hidden;
  }

  .greeting-banner::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(37,140,86,0.03) 0%, transparent 60%);
    pointer-events: none;
  }

  .greeting-text h1 {
    font-family: var(--font-display);
    font-size: 24px; font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  .greeting-text p { font-size: 14px; color: var(--text-secondary); }

  .greeting-hijri {
    text-align: right;
    flex-shrink: 0;
  }

  .hijri-date {
    font-family: var(--font-display);
    font-size: 17px; font-weight: 700;
    color: var(--green-700);
    direction: rtl;
  }

  .hijri-greg { font-size: 12px; color: var(--text-muted); margin-top: 3px; }

  /* ── Section Header ── */
  .section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
    gap: 12px;
  }

  .section-title {
    font-size: 16px; font-weight: 600;
    color: var(--text-primary);
    display: flex; align-items: center; gap: 8px;
  }

  .section-title-icon { font-size: 18px; }

  .section-action {
    font-size: 13px; color: var(--green-600);
    cursor: pointer; background: none; border: none;
    font-family: var(--font-body);
    transition: color var(--transition);
    padding: 0;
  }
  .section-action:hover { color: var(--green-700); }

  /* ── Today's progress ── */
  .today-progress {
    display: flex; align-items: center; gap: 12px;
    margin-top: 16px;
  }

  .progress-label {
    font-size: 13px; color: var(--text-muted);
    white-space: nowrap;
  }

  /* ── Analytics Page ── */
  .analytics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 700px) {
    .analytics-grid { grid-template-columns: 1fr; }
  }

  .analytics-number {
    font-size: 42px; font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .analytics-label {
    font-size: 13px; color: var(--text-muted);
    margin-top: 6px;
  }

  /* ── Auth Pages ── */
  .auth-shell {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(160deg, var(--green-900) 0%, #0a2a1a 100%);
    padding: 24px;
    position: relative; overflow: hidden;
  }

  .auth-shell::before {
    content: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
    font-family: var(--font-display);
    position: absolute; top: 32px; left: 50%;
    transform: translateX(-50%);
    font-size: 18px; color: rgba(255,255,255,0.12);
    white-space: nowrap; letter-spacing: 2px;
  }

  .auth-card {
    background: var(--surface-card);
    border-radius: var(--radius-xl);
    padding: 40px;
    width: 100%; max-width: 420px;
    box-shadow: var(--shadow-lg);
  }

  .auth-logo {
    text-align: center; margin-bottom: 32px;
  }

  .auth-logo-icon {
    width: 56px; height: 56px;
    background: var(--green-700);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin: 0 auto 12px;
  }

  .auth-logo h1 {
    font-family: var(--font-display);
    font-size: 28px; font-weight: 700;
    color: var(--text-primary);
  }

  .auth-logo p { font-size: 14px; color: var(--text-muted); margin-top: 4px; }

  .auth-form { display: flex; flex-direction: column; gap: 16px; }

  .form-field { display: flex; flex-direction: column; gap: 6px; }

  .form-label {
    font-size: 13px; font-weight: 500;
    color: var(--text-secondary);
  }

  .form-input {
    padding: 11px 14px;
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-sm);
    font-size: 15px; color: var(--text-primary);
    background: var(--surface-card);
    transition: border-color var(--transition), box-shadow var(--transition);
    font-family: var(--font-body);
    width: 100%;
    outline: none;
  }

  .form-input:focus {
    border-color: var(--green-400);
    box-shadow: 0 0 0 3px rgba(37,140,86,0.1);
  }

  .btn {
    padding: 12px 24px;
    border-radius: var(--radius-sm);
    border: none;
    font-size: 15px; font-weight: 600;
    cursor: pointer;
    transition: all var(--transition);
    font-family: var(--font-body);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }

  .btn-primary {
    background: var(--green-700);
    color: #fff;
  }
  .btn-primary:hover { background: var(--green-800); }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--border-medium);
    color: var(--text-primary);
  }
  .btn-outline:hover { background: var(--surface-hover); }

  .btn-google {
    background: #fff;
    border: 1px solid var(--sand-300);
    color: var(--text-primary);
    font-weight: 500;
  }
  .btn-google:hover { background: var(--sand-100); }

  .auth-divider {
    display: flex; align-items: center; gap: 12px;
    color: var(--text-muted); font-size: 13px;
    margin: 4px 0;
  }
  .auth-divider::before, .auth-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border-light);
  }

  .auth-footer {
    text-align: center; margin-top: 20px;
    font-size: 14px; color: var(--text-muted);
  }
  .auth-footer span {
    color: var(--green-600); cursor: pointer; font-weight: 500;
  }
  .auth-footer span:hover { color: var(--green-700); }

  /* ── Toast ── */
  .toast-container {
    position: fixed; bottom: 24px; right: 24px;
    z-index: 9999; display: flex; flex-direction: column; gap: 10px;
    pointer-events: none;
  }

  .toast {
    background: var(--night-800); color: #fff;
    padding: 12px 18px;
    border-radius: var(--radius-md);
    font-size: 14px; font-weight: 500;
    box-shadow: var(--shadow-lg);
    display: flex; align-items: center; gap: 10px;
    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    pointer-events: auto;
    min-width: 220px;
  }

  .toast.success { background: var(--green-800); border-left: 3px solid var(--green-400); }
  .toast.info { background: var(--night-800); border-left: 3px solid var(--gold-400); }

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeOut {
    to { opacity: 0; transform: translateY(-6px); }
  }

  /* ── Mobile Responsive ── */
  .bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--surface-card);
    border-top: 1px solid var(--border-light);
    height: 64px;
    z-index: 100;
    align-items: stretch;
  }

  .bottom-nav-item {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 3px;
    cursor: pointer;
    border: none; background: transparent;
    color: var(--text-muted);
    font-family: var(--font-body);
    font-size: 10px; font-weight: 500;
    transition: color var(--transition);
    padding: 0;
  }

  .bottom-nav-item.active { color: var(--green-600); }
  .bottom-nav-item .nav-icon { font-size: 20px; }

  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main-content { margin-left: 0; padding-bottom: 64px; }
    .bottom-nav { display: flex; }
    .prayer-grid { grid-template-columns: repeat(3, 1fr); }
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
    .page-body { padding: 16px; }
    .greeting-banner { flex-direction: column; align-items: flex-start; }
    .greeting-hijri { text-align: left; }
    .analytics-grid { grid-template-columns: 1fr; }
    .badge-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 480px) {
    .prayer-grid { grid-template-columns: repeat(2, 1fr); }
    .badge-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── Misc ── */
  .dot-separator { color: var(--sand-400); }

  .tag {
    display: inline-flex; align-items: center;
    font-size: 11px; font-weight: 600;
    padding: 3px 8px; border-radius: var(--radius-full);
  }

  .tag-green { background: var(--green-50); color: var(--green-700); border: 1px solid var(--green-200); }
  .tag-gold { background: var(--gold-100); color: #8a6a1a; border: 1px solid #f0d9a0; }
  .tag-sand { background: var(--sand-100); color: var(--sand-500); border: 1px solid var(--sand-300); }

  .empty-state {
    text-align: center; padding: 48px 24px;
    color: var(--text-muted);
  }

  .empty-state .empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.5; }
  .empty-state p { font-size: 15px; }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 700px) { .two-col { grid-template-columns: 1fr; } }

  .info-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-light);
    font-size: 14px;
  }
  .info-row:last-child { border-bottom: none; }
  .info-row-label { color: var(--text-muted); }
  .info-row-val { color: var(--text-primary); font-weight: 500; }

  .loading-bar {
    width: 100%; height: 3px;
    background: var(--green-100);
    position: relative; overflow: hidden;
  }
  .loading-bar::after {
    content: '';
    position: absolute;
    top: 0; left: -40%;
    width: 40%; height: 100%;
    background: var(--green-500);
    animation: loading 1.2s ease infinite;
  }
  @keyframes loading {
    0% { left: -40%; }
    100% { left: 110%; }
  }
`;

// ─── DATA & STATE ─────────────────────────────────────────────────────────────

const PRAYERS = [
  { key: "fajr",    name: "Fajr",    arabic: "الفجر",    emoji: "🌙", time: "05:23" },
  { key: "dhuhr",   name: "Dhuhr",   arabic: "الظهر",    emoji: "☀️", time: "12:40" },
  { key: "asr",     name: "Asr",     arabic: "العصر",    emoji: "🌤", time: "15:55" },
  { key: "maghrib", name: "Maghrib", arabic: "المغرب",   emoji: "🌅", time: "18:32" },
  { key: "isha",    name: "Isha",    arabic: "العشاء",   emoji: "🌙", time: "20:00" },
];

const BADGES = [
  { key: "first_prayer",      emoji: "🤲", name: "First Step",        desc: "Completed your first prayer", earned: true },
  { key: "streak_7",          emoji: "🌿", name: "7-Day Consistency", desc: "7 consecutive complete days",  earned: true },
  { key: "streak_30",         emoji: "🌙", name: "30-Day Commitment", desc: "30 consecutive complete days", earned: false },
  { key: "streak_100",        emoji: "⭐", name: "Century of Faith",  desc: "100 consecutive days",         earned: false },
  { key: "perfect_week",      emoji: "✨", name: "Perfect Week",      desc: "All 35 prayers in a week",     earned: true },
  { key: "perfect_month",     emoji: "🕌", name: "Perfect Month",     desc: "All prayers in a month",       earned: false },
  { key: "fajr_champion",     emoji: "🌄", name: "Fajr Champion",     desc: "Fajr 30 days in a row",        earned: false },
  { key: "consistent_3m",     emoji: "💎", name: "Steadfast",         desc: "90%+ completion over 3 months",earned: false },
  { key: "early_adopter",     emoji: "🦅", name: "Pioneer",           desc: "One of the first 1,000 users", earned: true },
];

const INITIAL_PRAYERS = {
  fajr: "completed", dhuhr: "completed", asr: "pending", maghrib: "pending", isha: "pending"
};

const WEEKLY_DATA = [
  { day: "Mon", count: 5, label: "M" },
  { day: "Tue", count: 5, label: "T" },
  { day: "Wed", count: 4, label: "W" },
  { day: "Thu", count: 5, label: "T" },
  { day: "Fri", count: 5, label: "F" },
  { day: "Sat", count: 3, label: "S" },
  { day: "Sun", count: 2, label: "S" },
];

const LEADERBOARD = [
  { rank: 1, name: "Ahmad_R",     city: "Rawalpindi", streak: 62, score: 35 },
  { rank: 2, name: "FaizM",       city: "Karachi",    streak: 58, score: 35 },
  { rank: 3, name: "Ibrahim_K",   city: "Lahore",     streak: 47, score: 34 },
  { rank: 4, name: "You",         city: "Rawalpindi", streak: 14, score: 28, isYou: true },
  { rank: 5, name: "UmarF",       city: "Islamabad",  streak: 31, score: 33 },
  { rank: 6, name: "YusufA",      city: "Peshawar",   streak: 28, score: 32 },
  { rank: 7, name: "Bilal_M",     city: "Dubai",      streak: 25, score: 31 },
  { rank: 8, name: "SaadH",       city: "London",     streak: 22, score: 30 },
];

const TODAY = new Date();
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function formatDate(d: Date) {
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function getHijriDate() {
  return { ar: "٢١ ذو القعدة ١٤٤٦", en: "21 Dhul Qa'dah 1446 AH" };
}

function generateMonthHeatmap() {
  const year = TODAY.getFullYear(), month = TODAY.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const isFuture = d > TODAY.getDate();
    const isToday = d === TODAY.getDate();
    const level = isFuture ? -1 : isToday ? 2 : Math.floor(Math.random() * 5);
    cells.push({ day: d, level, isToday, isFuture });
  }
  return cells;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Toast({ toasts }: { toasts: any[] }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{t.emoji}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-track"></span>
      <span className="toggle-thumb"></span>
    </label>
  );
}

function StreakRing({ streak, max = 30 }: { streak: number; max?: number }) {
  const r = 44, cx = 55, cy = 55;
  const circ = 2 * Math.PI * r;
  const fill = Math.min(streak / max, 1) * circ;
  const offset = circ - fill;
  return (
    <div className="streak-ring">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth="8" className="ring-bg" />
        <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth="8"
          className="ring-fill"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ stroke: streak >= 30 ? "var(--gold-400)" : "var(--green-500)" }}
        />
      </svg>
      <div className="streak-ring-label">
        <span className="streak-number">{streak}</span>
        <span className="streak-unit">days</span>
      </div>
    </div>
  );
}

function PrayerCard({ prayer, status, onToggle }: { prayer: any; status: string; onToggle: (key: string) => void }) {
  const isCompleted = status === "completed";
  const isMissed = status === "missed";
  return (
    <div className={`prayer-card ${isCompleted ? "completed" : ""} ${isMissed ? "missed" : ""}`}
      onClick={() => onToggle(prayer.key)}>
      <div className="check-badge">✓</div>
      <div className="prayer-icon">{prayer.emoji}</div>
      <div>
        <div className="prayer-name">{prayer.name}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-display)", marginTop: 2 }}>{prayer.arabic}</div>
      </div>
      <div className="prayer-time">{prayer.time}</div>
      <button className="prayer-status-btn" onClick={e => { e.stopPropagation(); onToggle(prayer.key); }}>
        {isCompleted ? "✓ Completed" : isMissed ? "Mark missed" : "Mark done"}
      </button>
    </div>
  );
}

function WeekBars({ data }: { data: any[] }) {
  const max = 5;
  const todayIdx = 6;
  return (
    <div className="week-bars">
      {data.map((d, i) => {
        const heightPct = (d.count / max) * 100;
        const cls = d.count === max ? "full" : d.count > 0 ? "partial" : "empty";
        const isToday = i === todayIdx;
        return (
          <div className="week-day" key={d.day}>
            <div className="week-bar-wrap">
              <div className={`week-bar ${isToday ? "today" : cls}`}
                style={{ height: `${Math.max(heightPct, 6)}%` }}
                title={`${d.day}: ${d.count}/5 prayers`} />
            </div>
            <span className={`week-day-label ${isToday ? "today" : ""}`}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function MonthHeatmap() {
  const cells = useMemo(() => generateMonthHeatmap(), []);
  return (
    <div className="heatmap-grid">
      {["S","M","T","W","T","F","S"].map((d,i) => (
        <div key={i} style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textAlign: "center", paddingBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{d}</div>
      ))}
      {cells.map((c, i) => {
        if (!c) return <div key={`empty-${i}`} />;
        if (c.isFuture) return <div key={i} className="heatmap-cell future" />;
        return (
          <div key={i}
            className={`heatmap-cell level-${c.level} ${c.isToday ? "today-cell" : ""}`}
            title={`Day ${c.day}: ${["0","1–2","3–4","All 5","All 5"][c.level]} prayers`}>
            {c.isToday ? "●" : ""}
          </div>
        );
      })}
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function DashboardPage({ prayerStatuses, onToggle, addToast }: { prayerStatuses: any; onToggle: (key: string) => void; addToast: any }) {
  const hijri = getHijriDate();
  const completedToday = Object.values(prayerStatuses).filter(s => s === "completed").length;
  const weekScore = Math.round((WEEKLY_DATA.reduce((a,d) => a+d.count, 0) / 35) * 100);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="page-body">
      <div className="greeting-banner">
        <div className="greeting-text">
          <h1>{getGreeting()}, Ahmad 👋</h1>
          <p>May your prayers be accepted. Stay consistent, stay blessed.</p>
        </div>
        <div className="greeting-hijri">
          <div className="hijri-date">{hijri.ar}</div>
          <div className="hijri-greg">{hijri.en}</div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card accent">
          <div className="stat-icon">🔥</div>
          <div className="stat-label">Current Streak</div>
          <div className="stat-value">14</div>
          <div className="stat-trend">↑ Best: 21 days</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-label">Today's Prayers</div>
          <div className="stat-value">{completedToday}/5</div>
          <div className="stat-trend" style={{ color: completedToday >= 4 ? "var(--green-500)" : "var(--sand-500)" }}>
            {completedToday === 5 ? "🌟 Perfect day!" : `${5 - completedToday} remaining`}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-label">Weekly Score</div>
          <div className="stat-value">{weekScore}%</div>
          <div className="stat-trend" style={{ color: "var(--green-500)" }}>↑ +8% from last week</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🕌</div>
          <div className="stat-label">Total Prayers</div>
          <div className="stat-value">847</div>
          <div className="stat-trend" style={{ color: "var(--text-muted)" }}>Since joining</div>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title"><span className="section-title-icon">🕋</span> Today's Prayers</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {completedToday}/5 completed
          </span>
        </div>
      </div>

      <div style={{ marginBottom: 6 }}>
        <div className="progress-wrap">
          <div className="progress-fill green" style={{ width: `${(completedToday / 5) * 100}%` }} />
        </div>
      </div>

      <div className="prayer-grid" style={{ marginTop: 16 }}>
        {PRAYERS.map(p => (
          <PrayerCard key={p.key} prayer={p} status={prayerStatuses[p.key]} onToggle={onToggle} />
        ))}
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">This Week</div>
              <div className="card-subtitle">Daily completion overview</div>
            </div>
            <div className="tag tag-green">{weekScore}%</div>
          </div>
          <div className="card-body">
            <WeekBars data={WEEKLY_DATA} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Streak Progress</div>
              <div className="card-subtitle">Towards 30-day badge</div>
            </div>
          </div>
          <div className="card-body">
            <div className="streak-ring-container" style={{ padding: 0 }}>
              <StreakRing streak={14} max={30} />
              <div className="streak-info">
                <div className="streak-title">14 Days Strong</div>
                <div className="streak-desc">Keep going! 16 more days for the <strong>30-Day Commitment</strong> badge.</div>
                <span className="streak-best">⭐ Best streak: 21 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">May 2026 — Prayer Calendar</div>
            <div className="card-subtitle">Monthly completion heatmap</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[["0","0/5"],["1","1–2"],["2","3–4"],["3–4","5/5"]].map(([l, t]) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: ["var(--sand-200)","var(--green-100)","var(--green-300)","var(--green-500)"][parseInt(l)] || "var(--green-500)", display: "inline-block" }} />
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="card-body">
          <MonthHeatmap />
        </div>
      </div>
    </div>
  );
}

function TrackPage({ prayerStatuses, onToggle }: { prayerStatuses: any; onToggle: (key: string) => void }) {
  const [selectedDate, setSelectedDate] = useState("today");
  const dates = ["today", "yesterday", "2 days ago"];
  const completedToday = Object.values(prayerStatuses).filter(s => s === "completed").length;

  return (
    <div className="page-body">
      <div style={{ marginBottom: 24 }}>
        <div className="section-title" style={{ marginBottom: 8, fontSize: 22, fontFamily: "var(--font-display)" }}>
          Prayer Tracker
        </div>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          Mark your prayers with sincerity. Every act of worship counts.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {dates.map(d => (
          <button key={d} onClick={() => setSelectedDate(d)}
            style={{
              padding: "8px 18px",
              borderRadius: "var(--radius-full)",
              border: `1px solid ${selectedDate === d ? "var(--green-500)" : "var(--border-medium)"}`,
              background: selectedDate === d ? "var(--green-700)" : "var(--surface-card)",
              color: selectedDate === d ? "#fff" : "var(--text-secondary)",
              fontSize: 13, fontWeight: 500, cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all var(--transition)"
            }}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{selectedDate === "today" ? formatDate(TODAY) : selectedDate === "yesterday" ? "Yesterday" : "2 days ago"}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{completedToday} of 5 prayers completed</div>
            </div>
            <div className={`tag ${completedToday === 5 ? "tag-green" : completedToday >= 3 ? "tag-gold" : "tag-sand"}`}>
              {completedToday === 5 ? "✓ Perfect" : completedToday >= 3 ? "In Progress" : "Needs Attention"}
            </div>
          </div>
          <div className="progress-wrap">
            <div className="progress-fill green" style={{ width: `${(completedToday / 5) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="prayer-grid">
        {PRAYERS.map(p => (
          <PrayerCard key={p.key} prayer={p}
            status={selectedDate === "today" ? prayerStatuses[p.key] : (p.key === "asr" || p.key === "maghrib" ? "missed" : "completed")}
            onToggle={selectedDate === "today" ? onToggle : () => {}} />
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <div className="card-title">Prayer Times — Rawalpindi, PK</div>
          <div className="next-prayer-chip" style={{ background: "var(--green-50)", color: "var(--green-700)", border: "1px solid var(--green-200)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: 12 }}>
            Next: Asr in 1h 22m
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {PRAYERS.map((p, i) => {
            const isCurrentPrayer = p.key === "dhuhr";
            return (
              <div key={p.key} className={`prayer-time-row ${isCurrentPrayer ? "current-prayer" : ""}`}>
                <div className="prayer-time-name">
                  {isCurrentPrayer && <span className="current-dot" />}
                  <span style={{ fontFamily: "var(--font-display)", marginRight: 4 }}>{p.arabic}</span>
                  {p.name}
                </div>
                <div className="prayer-time-val">{p.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const [period, setPeriod] = useState("week");
  const monthlyRate = 82;
  const totalDone = 847;

  return (
    <div className="page-body">
      <div style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 4, fontSize: 22, fontFamily: "var(--font-display)" }}>
          Analytics
        </div>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Track your spiritual consistency over time.</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="tabs">
          {["week","month","all time"].map(p => (
            <button key={p} className={`tab-btn ${period === p ? "active" : ""}`}
              onClick={() => setPeriod(p)}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Completion Rate</div>
          <div className="stat-value" style={{ color: "var(--green-600)" }}>82%</div>
          <div className="stat-trend" style={{ color: "var(--green-500)" }}>↑ +4% vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Prayers</div>
          <div className="stat-value">{totalDone}</div>
          <div className="stat-trend" style={{ color: "var(--text-muted)" }}>Since joining</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Best Streak</div>
          <div className="stat-value">21</div>
          <div className="stat-trend" style={{ color: "var(--gold-500)" }}>⭐ Personal best</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Perfect Days</div>
          <div className="stat-value">34</div>
          <div className="stat-trend" style={{ color: "var(--text-muted)" }}>Days with all 5</div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Weekly Bars</div>
          </div>
          <div className="card-body">
            <WeekBars data={WEEKLY_DATA} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Prayer Breakdown</div>
            <div className="card-subtitle">Completion rate by prayer</div>
          </div>
          <div className="card-body">
            {PRAYERS.map((p, i) => {
              const rates = [72, 95, 88, 90, 85];
              const rate = rates[i];
              return (
                <div key={p.key} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                      {p.emoji} {p.name}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: rate >= 90 ? "var(--green-600)" : rate >= 75 ? "var(--gold-500)" : "var(--text-muted)" }}>
                      {rate}%
                    </span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-fill green" style={{ width: `${rate}%`, background: rate >= 90 ? "var(--green-500)" : rate >= 75 ? "var(--gold-400)" : "var(--sand-400)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Monthly Heatmap — May 2026</div>
        </div>
        <div className="card-body">
          <MonthHeatmap />
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header">
          <div className="card-title">Streak History</div>
        </div>
        <div className="card-body">
          {[
            { label: "Current streak", val: "14 days" },
            { label: "Longest streak", val: "21 days" },
            { label: "Streak started", val: "14 May 2026" },
            { label: "Total complete days", val: "34 days" },
            { label: "Total missed days", val: "8 days" },
            { label: "Member since", val: "March 2026" },
          ].map(r => (
            <div key={r.label} className="info-row">
              <span className="info-row-label">{r.label}</span>
              <span className="info-row-val">{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaderboardPage() {
  const [scope, setScope] = useState("global");
  const [optedIn, setOptedIn] = useState(false);

  return (
    <div className="page-body">
      <div style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 4, fontSize: 22, fontFamily: "var(--font-display)" }}>
          Community
        </div>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          Celebrate consistency together. This is not a competition — it's a community of devotion.
        </p>
      </div>

      <div className="community-banner">
        {[
          { label: "Prayers today", val: "2.4M+", sub: "Globally" },
          { label: "Active users", val: "89K", sub: "This week" },
          { label: "Avg completion", val: "74%", sub: "Global average" },
          { label: "Top country", val: "🇵🇰 Pakistan", sub: "By active users" },
        ].map(s => (
          <div key={s.label}>
            <div className="community-stat-label">{s.label}</div>
            <div className="community-stat-value">{s.val}</div>
            <div className="community-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {!optedIn && (
        <div className="card" style={{ marginBottom: 20, background: "var(--green-25)", borderColor: "var(--green-200)" }}>
          <div className="card-body" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>🔒 You're currently anonymous</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Opt in to appear on the leaderboard with a display name of your choice. No personal data is shown.
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 14 }}
              onClick={() => setOptedIn(true)}>
              Opt in
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div className="tabs">
          {["global","pakistan","rawalpindi"].map(s => (
            <button key={s} className={`tab-btn ${scope === s ? "active" : ""}`}
              onClick={() => setScope(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, background: "var(--green-400)", borderRadius: "50%", display: "inline-block" }} />
          Updated every hour
        </div>
      </div>

      <div className="card">
        <div style={{ padding: 0 }}>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: 50 }}>Rank</th>
                <th>User</th>
                <th>Location</th>
                <th>Streak</th>
                <th>Weekly</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map(row => (
                <tr key={row.rank} style={row.isYou ? { background: "var(--green-25)" } : {}}>
                  <td>
                    <span className={`rank-badge ${row.rank === 1 ? "gold" : row.rank === 2 ? "silver" : row.rank === 3 ? "bronze" : ""}`}>
                      {row.rank <= 3 ? ["🥇","🥈","🥉"][row.rank-1] : row.rank}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar" style={{ width: 28, height: 28, fontSize: 11, background: row.isYou ? "var(--green-600)" : "var(--sand-300)", color: row.isYou ? "#fff" : "var(--text-secondary)" }}>
                        {row.name.slice(0,2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: row.isYou ? 600 : 400 }}>
                        {row.name} {row.isYou && <span className="tag tag-green" style={{ fontSize: 10 }}>You</span>}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: 13 }}>{row.city}</td>
                  <td>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>🔥 {row.streak}</span>
                  </td>
                  <td>
                    <span className="score-pill">{row.score}/35</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "16px 0", fontSize: 13, color: "var(--text-muted)" }}>
        Leaderboard shows only opted-in users. Rankings reset every Sunday.
      </div>
    </div>
  );
}

function BadgesPage() {
  const earned = BADGES.filter(b => b.earned).length;
  return (
    <div className="page-body">
      <div style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 4, fontSize: 22, fontFamily: "var(--font-display)" }}>
          Badges
        </div>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          Earned through consistency and devotion. No purchases, no shortcuts.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 24, background: "var(--green-25)", borderColor: "var(--green-200)" }}>
        <div className="card-body" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40 }}>🏅</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
              {earned} of {BADGES.length} badges earned
            </div>
            <div className="progress-wrap">
              <div className="progress-fill gold" style={{ width: `${(earned / BADGES.length) * 100}%` }} />
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "var(--gold-500)" }}>{Math.round((earned / BADGES.length) * 100)}%</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Complete</div>
          </div>
        </div>
      </div>

      <div className="badge-grid">
        {BADGES.map(b => (
          <div key={b.key} className={`badge-item ${b.earned ? "earned" : ""}`}>
            <div className="badge-emoji">{b.emoji}</div>
            <div className="badge-name">{b.name}</div>
            <div className="badge-desc">{b.desc}</div>
            {b.earned && <span className="tag tag-gold" style={{ fontSize: 10 }}>Earned</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({ user, setUser }: { user?: any; setUser?: any }) {
  const [notifs, setNotifs] = useState<Record<string, boolean>>({ fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true });
  const [leaderboard, setLeaderboard] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="page-body">
      <div style={{ marginBottom: 24 }}>
        <div className="section-title" style={{ marginBottom: 4, fontSize: 22, fontFamily: "var(--font-display)" }}>Settings</div>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Manage your account and preferences.</p>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <div className="card-title">Profile</div>
        </div>
        <div className="card-body">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div className="avatar" style={{ width: 56, height: 56, fontSize: 20, background: "var(--green-600)" }}>AH</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Ahmad Hassan</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>ahmad@example.com</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>Rawalpindi, Pakistan · Member since March 2026</div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ fontSize: 13, padding: "8px 16px" }}>
            Edit Profile
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <div className="card-title">Prayer Reminders</div>
          <div className="card-subtitle">Receive push notifications before each prayer</div>
        </div>
        <div style={{ padding: 0 }}>
          {PRAYERS.map(p => (
            <div key={p.key} className="settings-row">
              <div>
                <div className="settings-row-label">{p.emoji} {p.name} — {p.time}</div>
                <div className="settings-row-sub">15 minutes before prayer time</div>
              </div>
              <ToggleSwitch checked={notifs[p.key]} onChange={v => setNotifs(n => ({ ...n, [p.key]: v }))} />
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header"><div className="card-title">Privacy & Community</div></div>
        <div style={{ padding: 0 }}>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">Leaderboard participation</div>
              <div className="settings-row-sub">Appear on public leaderboards with your display name only</div>
            </div>
            <ToggleSwitch checked={leaderboard} onChange={setLeaderboard} />
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">Dark mode</div>
              <div className="settings-row-sub">Switch to darker theme for night-time use</div>
            </div>
            <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row-label">Prayer method</div>
              <div className="settings-row-sub">Calculation method for prayer times</div>
            </div>
            <select style={{ fontSize: 13, padding: "6px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-medium)", fontFamily: "var(--font-body)", background: "var(--surface-card)", color: "var(--text-primary)", cursor: "pointer" }}>
              <option>University of Islamic Sciences, Karachi</option>
              <option>Islamic Society of North America</option>
              <option>Muslim World League</option>
              <option>Umm Al-Qura University, Makkah</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header"><div className="card-title">Account</div></div>
        <div style={{ padding: 0 }}>
          <div className="settings-row">
            <div className="settings-row-label">Export my data</div>
            <button className="btn btn-outline" style={{ fontSize: 12, padding: "6px 14px" }}>Download JSON</button>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row-label" style={{ color: "#b91c1c" }}>Delete account</div>
              <div className="settings-row-sub">Permanently removes all your data</div>
            </div>
            <button className="btn btn-outline" style={{ fontSize: 12, padding: "6px 14px", color: "#b91c1c", borderColor: "#fca5a5" }}>Delete</button>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", padding: "8px 0 32px" }}>
        SalahTrack v1.0 · Privacy-first · No ads · Open source
      </div>
    </div>
  );
}

function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("ahmad@example.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("");

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🕌</div>
          <h1>SalahTrack</h1>
          <p>Your private prayer companion</p>
        </div>

        <div className="auth-form">
          {mode === "register" && (
            <div className="form-field">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ahmad Hassan" />
            </div>
          )}
          <div className="form-field">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 4 }} onClick={onLogin}>
            {mode === "login" ? "Sign in" : "Create account"}
          </button>

          <div className="auth-divider">or</div>

          <button className="btn btn-google" style={{ width: "100%" }} onClick={onLogin}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="auth-footer">
          {mode === "login" ? (
            <>Don't have an account? <span onClick={() => setMode("register")}>Sign up</span></>
          ) : (
            <>Already have an account? <span onClick={() => setMode("login")}>Sign in</span></>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "var(--text-muted)" }}>
          🔒 Privacy-first · No ads · Your data stays yours
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: "dashboard",   label: "Dashboard",   icon: "🏠" },
  { key: "track",       label: "Track",       icon: "✅" },
  { key: "analytics",   label: "Analytics",   icon: "📊" },
  { key: "leaderboard", label: "Community",   icon: "🌍" },
  { key: "badges",      label: "Badges",      icon: "🏅" },
  { key: "settings",    label: "Settings",    icon: "⚙️" },
];

const PAGE_TITLES = {
  dashboard: "Dashboard", track: "Prayer Tracker",
  analytics: "Analytics", leaderboard: "Community",
  badges: "Badges", settings: "Settings"
};

export default function SalahTrack() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [prayerStatuses, setPrayerStatuses] = useState<Record<string, string>>(INITIAL_PRAYERS);
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = useCallback((message: string, type: string = "success", emoji: string = "✅") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type, emoji }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const handleToggle = useCallback((prayerKey: string) => {
    setPrayerStatuses(prev => {
      const current = prev[prayerKey];
      const next = current === "completed" ? "pending" : "completed";
      const p = PRAYERS.find(x => x.key === prayerKey);
      if (next === "completed") {
        addToast(`${p.name} marked as completed`, "success", p.emoji);
      }
      return { ...prev, [prayerKey]: next };
    });
  }, [addToast]);

  if (!isAuthed) {
    return (
      <>
        <style>{CSS}</style>
        <AuthPage onLogin={() => {
          setIsAuthed(true);
          addToast("Welcome back, Ahmad!", "success", "🤲");
        }} />
        <Toast toasts={toasts} />
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="app-shell">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-icon">🕌</div>
              <div className="logo-text">SalahTrack</div>
            </div>
            <div className="logo-sub">Prayer Companion</div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Main</div>
            {NAV_ITEMS.slice(0, 4).map(item => (
              <button key={item.key} className={`nav-item ${currentPage === item.key ? "active" : ""}`}
                onClick={() => setCurrentPage(item.key)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.key === "badges" && <span className="nav-badge">4</span>}
              </button>
            ))}
            <div className="nav-section-label" style={{ marginTop: 8 }}>Account</div>
            {NAV_ITEMS.slice(4).map(item => (
              <button key={item.key} className={`nav-item ${currentPage === item.key ? "active" : ""}`}
                onClick={() => setCurrentPage(item.key)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.key === "badges" && <span className="nav-badge">4</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-chip" onClick={() => setCurrentPage("settings")}>
              <div className="avatar">AH</div>
              <div>
                <div className="user-name">Ahmad Hassan</div>
                <div className="user-email">ahmad@example.com</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="main-content">
          <div className="topbar">
            <div className="topbar-left">
              <div className="page-title">{PAGE_TITLES[currentPage]}</div>
            </div>
            <div className="topbar-right">
              <div className="date-chip">📅 {formatDate(TODAY)}</div>
              <button className="topbar-btn" title="Notifications">🔔</button>
              <div className="avatar" style={{ cursor: "pointer" }} onClick={() => setCurrentPage("settings")}>AH</div>
            </div>
          </div>

          {currentPage === "dashboard"   && <DashboardPage prayerStatuses={prayerStatuses} onToggle={handleToggle} addToast={addToast} />}
          {currentPage === "track"       && <TrackPage prayerStatuses={prayerStatuses} onToggle={handleToggle} />}
          {currentPage === "analytics"   && <AnalyticsPage />}
          {currentPage === "leaderboard" && <LeaderboardPage />}
          {currentPage === "badges"      && <BadgesPage />}
          {currentPage === "settings"    && <SettingsPage />}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="bottom-nav">
          {NAV_ITEMS.slice(0, 5).map(item => (
            <button key={item.key} className={`bottom-nav-item ${currentPage === item.key ? "active" : ""}`}
              onClick={() => setCurrentPage(item.key)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <Toast toasts={toasts} />
    </>
  );
}
