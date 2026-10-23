import {Easing} from 'remotion';
import {loadFont as loadGeist} from '@remotion/google-fonts/Geist';
import {loadFont as loadSerif} from '@remotion/google-fonts/InstrumentSerif';

const geist = loadGeist('normal', {weights: ['400', '500', '600'], subsets: ['latin', 'latin-ext']});
const serif = loadSerif('italic', {weights: ['400'], subsets: ['latin', 'latin-ext']});

export const fonts = {
	sans: geist.fontFamily,
	serif: serif.fontFamily,
};

export const colors = {
	orange: '#D75625',
	ink: '#151311',
	paper: '#F3EEE7',
	sand: '#E4DACC',
	muted: '#8C847A',
};

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
