import React from 'react';
import {Composition} from 'remotion';
import {SHOWREEL_DURATION, Showreel} from './Showreel';
import {ConsultingLoop, FinanceLoop, MarketingLoop} from './loops/Loops';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition id="Showreel" component={Showreel} durationInFrames={SHOWREEL_DURATION} fps={30} width={1920} height={1080} />
			<Composition id="FinanceLoop" component={FinanceLoop} durationInFrames={180} fps={30} width={800} height={800} />
			<Composition id="MarketingLoop" component={MarketingLoop} durationInFrames={180} fps={30} width={800} height={800} />
			<Composition id="ConsultingLoop" component={ConsultingLoop} durationInFrames={180} fps={30} width={800} height={800} />
		</>
	);
};
