import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedLogo} from './Logo';
import {MaskedLine, Wipe, progress} from './helpers';
import {colors, easeInOut, fonts} from './theme';

// Scene boundaries (frames @ 30fps)
const T = {dot: 0, words: 75, pillars: 180, approach: 336, clients: 456, logo: 534, end: 600};

const base: React.CSSProperties = {fontFamily: fonts.sans, letterSpacing: '-0.035em'};

const Label: React.FC<{children: React.ReactNode; color: string; delay?: number}> = ({children, color, delay = 0}) => {
	const frame = useCurrentFrame();
	const o = progress(frame, delay, 20);
	return (
		<div
			style={{
				...base,
				letterSpacing: '0.14em',
				textTransform: 'uppercase',
				fontSize: 22,
				fontWeight: 500,
				color,
				opacity: o,
				display: 'flex',
				alignItems: 'center',
				gap: 14,
			}}
		>
			<span style={{width: 10, height: 10, borderRadius: 10, background: colors.orange}} />
			{children}
		</div>
	);
};

/** 1 — A single orange dot appears, breathes, then swallows the frame. */
const DotScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const pop = spring({frame: frame - 6, fps, config: {damping: 12, stiffness: 120}});
	const pulse = 1 + Math.sin(frame / 5) * 0.06 * progress(frame, 18, 10);
	const grow = interpolate(frame, [44, 75], [1, 120], {
		easing: easeInOut,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const ring = progress(frame, 16, 30);
	return (
		<AbsoluteFill style={{background: colors.ink, alignItems: 'center', justifyContent: 'center'}}>
			<div
				style={{
					position: 'absolute',
					width: 40,
					height: 40,
					borderRadius: '50%',
					border: `2px solid ${colors.orange}`,
					transform: `scale(${1 + ring * 6})`,
					opacity: (1 - ring) * 0.8 * (frame > 16 ? 1 : 0),
				}}
			/>
			<div
				style={{
					width: 40,
					height: 40,
					borderRadius: '50%',
					background: colors.orange,
					transform: `scale(${pop * pulse * grow})`,
				}}
			/>
		</AbsoluteFill>
	);
};

/** 2 — Kinetic type: Design / your / future. */
const WordsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const exitAt = 74;
	const dotS = progress(frame, 34, 18);
	const big: React.CSSProperties = {...base, fontSize: 250, fontWeight: 600, lineHeight: 0.92, color: colors.ink};
	return (
		<AbsoluteFill style={{background: colors.orange, padding: '110px 140px', justifyContent: 'space-between'}}>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<Label color={colors.ink} delay={4}>
					Distinct — Business design consulting
				</Label>
				<Label color={colors.ink} delay={10}>
					Podgorica, Montenegro
				</Label>
			</div>
			<div>
				<MaskedLine delay={4} exitAt={exitAt} style={big}>
					Design
				</MaskedLine>
				<MaskedLine delay={10} exitAt={exitAt + 3} style={big}>
					your
				</MaskedLine>
				<MaskedLine delay={16} exitAt={exitAt + 6} style={{...big, display: 'flex', alignItems: 'baseline'}}>
					<span style={{fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', fontSize: 280}}>
						future
					</span>
					<span
						style={{
							display: 'inline-block',
							width: 52,
							height: 52,
							marginLeft: 14,
							borderRadius: '50%',
							background: colors.ink,
							transform: `scale(${dotS})`,
						}}
					/>
				</MaskedLine>
			</div>
		</AbsoluteFill>
	);
};

const PILLARS = [
	{
		n: '01',
		title: ['Finance &', 'Accounting'],
		items: ['Financial modeling', 'Reporting & analytics', 'Bookkeeping', 'Tax advisory', 'Work & residence permits'],
		bg: colors.ink,
		fg: colors.paper,
	},
	{
		n: '02',
		title: ['Marketing &', 'Branding'],
		items: ['Visual identity', 'Marketing strategy', 'Digital marketing', 'Photography', 'Graphic design'],
		bg: colors.paper,
		fg: colors.ink,
	},
	{
		n: '03',
		title: ['Business', 'Consulting'],
		items: ['Business analysis', 'Strategic management', 'Organisational design', 'Operations', 'Digital transformation'],
		bg: colors.sand,
		fg: colors.ink,
	},
];

/** 3 — Three practice panels rise one after another. */
const PillarsScene: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{background: colors.orange, flexDirection: "row"}}>
			{PILLARS.map((p, i) => {
				const d = i * 8;
				const rise = progress(frame, d, 30, easeInOut);
				return (
					<div
						key={p.n}
						style={{
							flex: 1,
							background: p.bg,
							color: p.fg,
							padding: '96px 64px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							clipPath: `inset(${(1 - rise) * 100}% 0 0 0)`,
							borderLeft: i === 0 ? 'none' : `1px solid ${colors.muted}44`,
						}}
					>
						<div style={{...base, fontSize: 26, fontWeight: 500, color: colors.orange}}>
							<MaskedLine delay={d + 16}>{p.n}</MaskedLine>
						</div>
						<div>
							{p.title.map((t, j) => (
								<MaskedLine key={t} delay={d + 20 + j * 4} style={{...base, fontSize: 84, fontWeight: 600, lineHeight: 1}}>
									{t}
								</MaskedLine>
							))}
							<div style={{marginTop: 56}}>
								{p.items.map((it, j) => {
									const o = progress(frame, d + 40 + j * 6, 18);
									return (
										<div
											key={it}
											style={{
												...base,
												letterSpacing: '-0.01em',
												fontSize: 30,
												padding: '14px 0',
												borderTop: `1px solid ${p.fg}22`,
												opacity: o,
												transform: `translateX(${(1 - o) * 30}px)`,
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<span>{it}</span>
											<span style={{color: colors.orange}}>→</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};

const STEPS = ['Understand the problem', 'Design a solution', 'Solve', 'Create new value'];

/** 4 — Approach: a line draws through four milestones. */
const ApproachScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const draw = progress(frame, 18, 70, easeInOut);
	const left = 160;
	const width = 1600;
	return (
		<AbsoluteFill style={{background: colors.ink, color: colors.paper, padding: '110px 160px'}}>
			<Label color={colors.paper}>Our approach</Label>
			<div style={{marginTop: 40}}>
				<MaskedLine delay={4} style={{...base, fontSize: 120, fontWeight: 600, lineHeight: 1}}>
					From problem
				</MaskedLine>
				<MaskedLine delay={9} style={{...base, fontSize: 120, lineHeight: 1}}>
					to{' '}
					<span style={{fontFamily: fonts.serif, fontStyle: 'italic', color: colors.orange, letterSpacing: '-0.01em'}}>
						new value.
					</span>
				</MaskedLine>
			</div>
			<div style={{position: 'absolute', left, top: 720, width, height: 2, background: `${colors.paper}22`}} />
			<div style={{position: 'absolute', left, top: 720, width: width * draw, height: 2, background: colors.orange}} />
			{STEPS.map((s, i) => {
				const at = i / (STEPS.length - 1);
				const hitFrame = 18 + 70 * at * 0.85;
				const pop = spring({frame: frame - hitFrame, fps, config: {damping: 11}});
				const last = i === STEPS.length - 1;
				const pulse = last ? 1 + Math.max(0, Math.sin((frame - hitFrame) / 6)) * 0.25 * progress(frame, hitFrame + 10, 10) : 1;
				return (
					<div key={s} style={{position: 'absolute', left: left + width * at, top: 720}}>
						<div
							style={{
								position: 'absolute',
								width: last ? 34 : 22,
								height: last ? 34 : 22,
								borderRadius: '50%',
								background: last ? colors.orange : colors.paper,
								transform: `translate(-50%, -50%) scale(${pop * pulse})`,
							}}
						/>
						<div
							style={{
								...base,
								letterSpacing: '-0.01em',
								position: 'absolute',
								top: 44,
								left: i === STEPS.length - 1 ? undefined : -11,
								right: i === STEPS.length - 1 ? -17 : undefined,
								whiteSpace: 'nowrap',
								fontSize: 30,
								opacity: pop,
								transform: `translateY(${(1 - pop) * 20}px)`,
							}}
						>
							<div style={{color: colors.muted, fontSize: 20, marginBottom: 8}}>0{i + 1}</div>
							{s}
						</div>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};

const CLIENTS = [
	'one-and-only',
	'jumeirah',
	'habitat',
	'oblun',
	'forza-porto',
	'doding',
	'asys',
	'icentar',
	'sofa-bed',
	'habitat-flowers',
];

/** 5 — Client wall. */
const ClientsScene: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{background: colors.paper, padding: '100px 140px'}}>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
				<MaskedLine delay={2} style={{...base, fontSize: 92, fontWeight: 600, lineHeight: 1, color: colors.ink}}>
					Trusted by{' '}
					<span style={{fontFamily: fonts.serif, fontStyle: 'italic', fontWeight: 400, color: colors.orange}}>
						leading
					</span>{' '}
					brands
				</MaskedLine>
			</div>
			<div
				style={{
					marginTop: 70,
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
					gridAutoRows: 350,
					borderTop: `1px solid ${colors.ink}22`,
					borderLeft: `1px solid ${colors.ink}22`,
				}}
			>
				{CLIENTS.map((c, i) => {
					const o = progress(frame, 6 + i * 3, 22);
					return (
						<div
							key={c}
							style={{
								borderRight: `1px solid ${colors.ink}22`,
								borderBottom: `1px solid ${colors.ink}22`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: 46,
							}}
						>
							<Img
								src={staticFile(`clients/${c}.png`)}
								style={{
									maxWidth: '100%',
									maxHeight: 110,
									objectFit: 'contain',
									opacity: o * 0.9,
									transform: `translateY(${(1 - o) * 30}px)`,
								}}
							/>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

/** 6 — Logo lockup. */
const LogoScene: React.FC = () => {
	const frame = useCurrentFrame();
	const tag = progress(frame, 34, 24);
	return (
		<AbsoluteFill style={{background: colors.ink, alignItems: 'center', justifyContent: 'center'}}>
			<AnimatedLogo width={900} color={colors.paper} delay={4} />
			<div
				style={{
					...base,
					marginTop: 60,
					fontSize: 34,
					color: colors.paper,
					opacity: tag,
					letterSpacing: '-0.01em',
					transform: `translateY(${(1 - tag) * 16}px)`,
				}}
			>
				Design your{' '}
				<span style={{fontFamily: fonts.serif, fontStyle: 'italic', color: colors.orange, fontSize: 40}}>future</span>
			</div>
		</AbsoluteFill>
	);
};

export const SHOWREEL_DURATION = T.end;

export const Showreel: React.FC = () => {
	return (
		<AbsoluteFill style={{background: colors.ink}}>
			<Sequence from={T.dot} durationInFrames={T.words - T.dot}>
				<DotScene />
			</Sequence>
			<Sequence from={T.words} durationInFrames={T.pillars - T.words}>
				<WordsScene />
			</Sequence>
			<Sequence from={T.pillars} durationInFrames={T.approach - T.pillars}>
				<PillarsScene />
			</Sequence>
			<Sequence from={T.approach} durationInFrames={T.clients - T.approach}>
				<ApproachScene />
			</Sequence>
			<Sequence from={T.clients} durationInFrames={T.logo - T.clients}>
				<ClientsScene />
			</Sequence>
			<Sequence from={T.logo} durationInFrames={T.end - T.logo}>
				<LogoScene />
			</Sequence>
			<Wipe at={T.approach} color={colors.orange} />
			<Wipe at={T.clients} color={colors.orange} />
			<Wipe at={T.logo} color={colors.orange} />
		</AbsoluteFill>
	);
};
