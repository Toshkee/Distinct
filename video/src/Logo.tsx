import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LOGO_PATHS, LOGO_VIEWBOX} from './logoPaths';
import {colors} from './theme';

/**
 * The Distinct wordmark. Letters rise in one after another, then the orange
 * dot drops in from above and settles with a bounce.
 */
export const AnimatedLogo: React.FC<{width: number; color: string; delay?: number}> = ({
	width,
	color,
	delay = 0,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const letters = LOGO_PATHS.filter((p) => !p.accent);
	const dot = LOGO_PATHS.find((p) => p.accent)!;

	const dotSpring = spring({
		frame: frame - delay - letters.length * 3 - 6,
		fps,
		config: {damping: 9, stiffness: 140, mass: 0.7},
	});

	return (
		<svg viewBox={LOGO_VIEWBOX} width={width} style={{overflow: 'visible'}}>
			<defs>
				<clipPath id="logo-clip">
					<rect x={859} y={48.906} width={201.44} height={41.094} />
				</clipPath>
			</defs>
			<g clipPath="url(#logo-clip)">
				{letters.map((p, i) => {
					const s = spring({frame: frame - delay - i * 3, fps, config: {damping: 200}});
					return (
						<path
							key={i}
							d={p.d}
							fill={color}
							fillRule="evenodd"
							style={{transform: `translateY(${(1 - s) * 44}px)`}}
						/>
					);
				})}
			</g>
			<path
				d={dot.d}
				fill={colors.orange}
				style={{transform: `translateY(${(1 - dotSpring) * -60}px)`, opacity: dotSpring > 0.01 ? 1 : 0}}
			/>
		</svg>
	);
};
