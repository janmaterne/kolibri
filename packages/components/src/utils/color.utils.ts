import colorConvert from 'color-convert';
import { CMYK } from 'color-convert/conversions';
import { hex as hexContrast, score } from 'wcag-contrast';

export const cmykSaturation = (cmyk: number[], saturation = 1): CMYK => {
	return [cmyk[0] * saturation, cmyk[1] * saturation, cmyk[2] * saturation, cmyk[3] * saturation];
};

export const getHexBySat = (hex: string, saturation = 1): string => {
	return colorConvert.cmyk.hex(cmykSaturation(colorConvert.hex.cmyk(hex), saturation));
};

interface KoliBriContrast {
	color: {
		background: string;
		text: string;
	};
	contrast: {
		value: number;
		score: string;
	};
}

export const getValues = (hex: string, saturation = 1): KoliBriContrast => {
	const bgColor = getHexBySat(hex, saturation);
	let fgColor = null;
	let bgFgScore = null;
	let bgFgValue = null;
	const black = hexContrast(bgColor, '000');
	const white = hexContrast(bgColor, 'fff');
	if (black >= white) {
		fgColor = '000';
		bgFgScore = score(black);
		bgFgValue = black;
	} else {
		fgColor = 'fff';
		bgFgScore = score(white);
		bgFgValue = white;
	}
	return {
		color: {
			background: bgColor,
			text: fgColor,
		},
		contrast: {
			value: bgFgValue,
			score: bgFgScore,
		},
	};
};
