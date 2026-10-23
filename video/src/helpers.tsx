import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {easeInOut, easeOut} from './theme';

/** 0 → 1 progress between `start` and `start + duration`, eased. */
export const progress = (frame: number, start: number, duration: number, easing = easeOut) =>
	interpolate(frame, [start, start + duration], [0, 1], {
		easing,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

/** A line of text that slides up from behind a mask, and optionally out again. */
export const MaskedLine: React.FC<{
	children: React.ReactNode;
	delay?: number;
	exitAt?: number;
	style?: React.CSSProperties;
}> = ({children, delay = 0, exitAt, style}) => {
	const frame = useCurrentFrame();
	const enter = progress(frame, delay, 24);
	const exit = exitAt === undefined ? 0 : progress(frame, exitAt, 18, easeInOut);
	const y = (1 - enter) * 110 - exit * 110;
	return (
		<div
			style={{
				// sized like the text so the em-based room below fits its descenders
				fontSize: style?.fontSize,
				overflow: 'hidden',
				paddingBottom: '0.24em',
				marginBottom: '-0.24em',
				paddingRight: '0.1em',
				marginRight: '-0.1em',
			}}
		>
			<div style={{transform: `translateY(${y}%)`, ...style}}>{children}</div>
		</div>
	);
};

/** Full-screen colour panel that sweeps up over the cut at `at`, then off the top. */
export const Wipe: React.FC<{at: number; color: string; length?: number}> = ({at, color, length = 14}) => {
	const frame = useCurrentFrame();
	const inP = progress(frame, at - length, length, easeInOut);
	const outP = progress(frame, at, length, easeInOut);
	if (frame < at - length || frame > at + length) return null;
	const top = (1 - inP) * 100;
	const bottom = outP * 100;
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				top: `${top}%`,
				bottom: `${bottom}%`,
				background: color,
				zIndex: 50,
			}}
		/>
	);
};
