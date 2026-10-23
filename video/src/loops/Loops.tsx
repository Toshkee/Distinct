import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';

// Every loop is driven by `phase` (0 → 2π over the composition), so the
// first and last frames match and the video loops seamlessly on the site.
const usePhase = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	return (frame / durationInFrames) * Math.PI * 2;
};

/** Finance — breathing bar chart with a trend line and a travelling dot. */
export const FinanceLoop: React.FC = () => {
	const phase = usePhase();
	const bars = 9;
	const W = 800;
	const chartL = 110;
	const chartR = 690;
	const base = 610;
	const step = (chartR - chartL) / bars;
	const heights = Array.from({length: bars}, (_, i) => {
		const trend = 120 + i * 34;
		return trend + Math.sin(phase + i * 0.7) * 38 + Math.sin(phase * 2 + i) * 14;
	});
	const pts = heights.map((h, i) => [chartL + step * i + step / 2, base - h - 46] as const);
	const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
	// travelling dot along the polyline
	const t = ((1 - Math.cos(phase)) / 2) * (pts.length - 1); // ping-pong keeps it seamless
	const k = Math.min(Math.floor(t), pts.length - 2);
	const f = t - k;
	const dot = [pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f, pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f];
	return (
		<AbsoluteFill style={{background: colors.ink}}>
			<svg viewBox={`0 0 ${W} ${W}`} width="100%" height="100%">
				{[0, 1, 2, 3, 4].map((g) => (
					<line key={g} x1={chartL} x2={chartR} y1={base - g * 110} y2={base - g * 110} stroke={colors.paper} strokeOpacity={0.08} strokeWidth={2} />
				))}
				{heights.map((h, i) => (
					<rect
						key={i}
						x={chartL + step * i + step * 0.22}
						y={base - h}
						width={step * 0.56}
						height={h}
						rx={6}
						fill={i === bars - 1 ? colors.orange : colors.paper}
						fillOpacity={i === bars - 1 ? 1 : 0.14 + i * 0.03}
					/>
				))}
				<path d={line} fill="none" stroke={colors.orange} strokeWidth={4} strokeLinejoin="round" />
				<circle cx={dot[0]} cy={dot[1]} r={26 + Math.sin(phase * 4) * 4} fill={colors.orange} fillOpacity={0.18} />
				<circle cx={dot[0]} cy={dot[1]} r={12} fill={colors.orange} />
			</svg>
		</AbsoluteFill>
	);
};

/** Marketing — a grid of shapes that morph between circle, pill and square. */
export const MarketingLoop: React.FC = () => {
	const phase = usePhase();
	const n = 3;
	const cell = 200;
	const offset = 100;
	return (
		<AbsoluteFill style={{background: colors.orange}}>
			{Array.from({length: n * n}, (_, i) => {
				const r = Math.floor(i / n);
				const c = i % n;
				const p = phase + (r + c) * 0.7;
				const radius = 50 + Math.sin(p) * 50; // % — circle ↔ square
				const rot = Math.sin(p) * 45 + 45;
				const scale = 0.78 + Math.cos(p) * 0.12;
				const filled = (r + c) % 2 === 0;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: offset + c * cell + 20,
							top: offset + r * cell + 20,
							width: cell - 40,
							height: cell - 40,
							borderRadius: `${radius}%`,
							background: filled ? colors.ink : 'transparent',
							border: filled ? 'none' : `6px solid ${colors.paper}`,
							transform: `rotate(${rot}deg) scale(${scale})`,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

/** Consulting — an orbiting network around a single focused point. */
export const ConsultingLoop: React.FC = () => {
	const phase = usePhase();
	const nodes = 8;
	const cx = 400;
	const cy = 400;
	// rotate by exactly one node spacing per loop so it stays seamless
	const rot = (phase / (Math.PI * 2)) * ((Math.PI * 2) / nodes);
	const outer = Array.from({length: nodes}, (_, i) => {
		const a = (i / nodes) * Math.PI * 2 + rot;
		const rr = 270 + Math.sin(phase * 2 + i) * 18;
		return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const;
	});
	const inner = Array.from({length: 4}, (_, i) => {
		const a = (i / 4) * Math.PI * 2 - rot * 2 + Math.PI / 4;
		return [cx + Math.cos(a) * 140, cy + Math.sin(a) * 140] as const;
	});
	return (
		<AbsoluteFill style={{background: colors.sand}}>
			<svg viewBox="0 0 800 800" width="100%" height="100%">
				<circle cx={cx} cy={cy} r={270} fill="none" stroke={colors.ink} strokeOpacity={0.1} strokeWidth={2} strokeDasharray="4 10" />
				<circle cx={cx} cy={cy} r={140} fill="none" stroke={colors.ink} strokeOpacity={0.12} strokeWidth={2} />
				{outer.map((p, i) => {
					const q = inner[i % 4];
					const o = 0.15 + (Math.sin(phase + i * 0.8) + 1) * 0.25;
					return <line key={`l${i}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={colors.ink} strokeOpacity={o} strokeWidth={2} />;
				})}
				{inner.map((q, i) => (
					<line key={`c${i}`} x1={q[0]} y1={q[1]} x2={cx} y2={cy} stroke={colors.orange} strokeWidth={3} strokeOpacity={0.7} />
				))}
				{outer.map((p, i) => (
					<circle key={`o${i}`} cx={p[0]} cy={p[1]} r={14} fill={colors.ink} />
				))}
				{inner.map((q, i) => (
					<circle key={`i${i}`} cx={q[0]} cy={q[1]} r={18} fill={colors.paper} stroke={colors.ink} strokeWidth={3} />
				))}
				<circle cx={cx} cy={cy} r={58 + Math.sin(phase * 2) * 10} fill={colors.orange} fillOpacity={0.2} />
				<circle cx={cx} cy={cy} r={34} fill={colors.orange} />
			</svg>
		</AbsoluteFill>
	);
};
