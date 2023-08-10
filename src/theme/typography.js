// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const primaryFont = 'Satoshi, sans-serif';
const secondaryFont = 'ITC Souvenir, sans-serif';

// ----------------------------------------------------------------------

const typography = {
  fontFamily: primaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 400,
    lineHeight: 80 / 64,
    fontSize: pxToRem(64),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 400,
    lineHeight: 64 / 48,
    fontSize: pxToRem(48),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(18),
    fontFamily: primaryFont,
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
    letterSpacing: '1px', // Adjust the value as needed
  },
  button: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
  answer: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(14),
    fontFamily: primaryFont,
    ...responsiveFontSizes({ sm: 14, md: 14, lg: 14 }),
  },
};

export default typography;
