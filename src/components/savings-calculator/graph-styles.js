const styles = {
  stroke: {
    small: 1,
    medium: 3,
    large: 5,
  },
  font: {
    family: "'Muli', sans-serif",
    size: {
      small: 14,
      large: 18,
    },
    weight: {
      bold: 700,
      extraBold: 900,
    },
    letterSpacing: 1.5,
  },
  colors: {
    offWhite: '#fafafa',
    lightGray: '#ccc',
    darkGray: '#333',
    lightPrimary: '#8DB2F3',
    primary: '#518aee',
    darkPrimary: '#3C67B2',
  },
  other: {
    borderRadius: 5,
  },
}

export const animationStyles = {
  duration: 500,
  onLoad: {duration: 0},
}

export const likelyRangeStyles = {
  data: {
    fill: styles.colors.primary,
  },
}

export const unlikelyRangeStyles = {
  data: {
    fill: styles.colors.lightPrimary,
  },
}

export const projectedAmountStyles = {
  line: {
    data: {
      stroke: styles.colors.darkPrimary,
      strokeWidth: styles.stroke.large,
    },
  },
  scatter: {
    data: {
      fill: styles.colors.darkPrimary,
    },
  },
}

export const projectedSavingsAmountStyles = {
  line: {
    data: {
      stroke: styles.colors.lightGray,
      strokeWidth: styles.stroke.large,
    },
  },
  scatter: {
    data: {
      fill: styles.colors.lightGray,
    },
  },
}

export const hoverLineStyles = {
  stroke: styles.colors.lightGray,
  strokeWidth: styles.stroke.medium,
}

const axisLabelStyles = {
  stroke: styles.colors.lightGray,
  strokeWidth: styles.stroke.small,
}

const tickLabelStyles = {
  fontFamily: styles.font.family,
  fontSize: styles.font.size.small,
  fontWeight: styles.font.weight.extraBold,
  letterSpacing: styles.font.letterSpacing,
  fill: styles.colors.lightGray,
}

export const axisStyles = {
  x: {
    axis: axisLabelStyles,
    grid: {
      stroke: styles.colors.lightGray,
      strokeWidth: styles.stroke.small,
    },
    tickLabels: tickLabelStyles,
  },
  y: {
    axis: axisLabelStyles,
    grid: {
      stroke: styles.colors.lightGray,
      strokeWidth: styles.stroke.small,
    },
    tickLabels: tickLabelStyles,
  },
}

export const legendStyles = {
  border: {
    fill: styles.colors.offWhite,
    stroke: styles.colors.lightGray,
    strokeWidth: styles.stroke.small,
    rx: styles.other.borderRadius,
    ry: styles.other.borderRadius,
  },
  data: {
    type: 'square',
    size: 10,
  },
  labels: {
    fontFamily: styles.font.family,
  },
  title: {
    fontSize: styles.font.size.large,
    fontFamily: styles.font.family,
    fontWeight: styles.font.weight.bold,
  },
}

export const legendLabelStyles = {
  top: {
    fontFamily: styles.font.family,
    fontWeight: styles.font.weight.bold,
  },
  bottom: {fontFamily: styles.font.family},
}

export const legendDataStyles = {
  account529: {fill: styles.colors.primary},
  accountSavings: {fill: styles.colors.lightGray},
}
