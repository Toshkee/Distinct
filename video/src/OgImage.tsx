import React from 'react';
import {AbsoluteFill} from 'remotion';
import {LOGO_PATHS, LOGO_VIEWBOX} from './logoPaths';
import {colors, fonts} from './theme';

/** Static 1200×630 link-preview card (Open Graph / WhatsApp / LinkedIn). */
export const OgImage: React.FC = () => {
	const base: React.CSSProperties = {fontFamily: fonts.sans, letterSpacing: '-0.045em', color: colors.ink};
	return (
		<AbsoluteFill style={{background: colors.orange, padding: '64px 72px', justifyContent: 'space-between'}}>
			<div
				style={{
					...base,
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: 18,
					fontWeight: 500,
					letterSpacing: '0.14em',
					textTransform: 'uppercase',
				}}
			>
				<span>Business design consulting</span>
				<span>Podgorica, Montenegro</span>
			</div>

			<div style={{...base, fontSize: 132, fontWeight: 600, lineHeight: 0.92}}>
				<div>Design your</div>
				<div style={{display: 'flex', alignItems: 'baseline'}}>
					<span style={{fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', fontSize: 150}}>
						future
					</span>
					<span style={{width: 26, height: 26, marginLeft: 8, borderRadius: '50%', background: colors.ink}} />
				</div>
			</div>

			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
				<div style={{...base, fontSize: 22, letterSpacing: '-0.01em', maxWidth: 720, lineHeight: 1.3}}>
					Konsalting · Finansije i računovodstvo · Brending i marketing
				</div>
				<svg viewBox={LOGO_VIEWBOX} width={300}>
					{LOGO_PATHS.map((p, i) => (
						<path key={i} d={p.d} fill={p.accent ? colors.paper : colors.ink} fillRule="evenodd" />
					))}
				</svg>
			</div>
		</AbsoluteFill>
	);
};
