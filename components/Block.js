import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { COLORS, SIZES } from '../constants';

const Block = ({
  flex,
  row,
  column,
  center,
  middle,
  left,
  right,
  top,
  bottom,
  card,
  shadow,
  color,
  space,
  padding,
  margin,
  animated,
  wrap,
  style,
  children,
  ...props
}) => {

  const handleMargins = () => {
    if (typeof margin === 'number') {
      const intMargin = Math.round(margin);
      return {
        marginTop: intMargin,
        marginRight: intMargin,
        marginBottom: intMargin,
        marginLeft: intMargin,
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          const intMargin1 = Math.round(margin[0]);
          return {
            marginTop: intMargin1,
            marginRight: intMargin1,
            marginBottom: intMargin1,
            marginLeft: intMargin1,
          };
        case 2:
          return {
            marginTop: Math.round(margin[0]),
            marginRight: Math.round(margin[1]),
            marginBottom: Math.round(margin[0]),
            marginLeft: Math.round(margin[1]),
          };
        case 3:
          return {
            marginTop: Math.round(margin[0]),
            marginRight: Math.round(margin[1]),
            marginBottom: Math.round(margin[2]),
            marginLeft: Math.round(margin[1]),
          };
        default:
          return {
            marginTop: Math.round(margin[0]),
            marginRight: Math.round(margin[1]),
            marginBottom: Math.round(margin[2]),
            marginLeft: Math.round(margin[3]),
          };
      }
    }
  };

  const handlePaddings = () => {
    if (typeof padding === 'number') {
      const intPadding = Math.round(padding);
      return {
        paddingTop: intPadding,
        paddingRight: intPadding,
        paddingBottom: intPadding,
        paddingLeft: intPadding,
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          const intPadding1 = Math.round(padding[0]);
          return {
            paddingTop: intPadding1,
            paddingRight: intPadding1,
            paddingBottom: intPadding1,
            paddingLeft: intPadding1,
          };
        case 2:
          return {
            paddingTop: Math.round(padding[0]),
            paddingRight: Math.round(padding[1]),
            paddingBottom: Math.round(padding[0]),
            paddingLeft: Math.round(padding[1]),
          };
        case 3:
          return {
            paddingTop: Math.round(padding[0]),
            paddingRight: Math.round(padding[1]),
            paddingBottom: Math.round(padding[2]),
            paddingLeft: Math.round(padding[1]),
          };
        default:
          return {
            paddingTop: Math.round(padding[0]),
            paddingRight: Math.round(padding[1]),
            paddingBottom: Math.round(padding[2]),
            paddingLeft: Math.round(padding[3]),
          };
      }
    }
  };

  const blockStyles = [
    styles.block,
    flex && { flex },
    flex === false && { flex: 0 }, // reset / disable flex
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    margin && { ...handleMargins() },
    padding && { ...handlePaddings() },
    card && styles.card,
    shadow && styles.shadow,
    space && { justifyContent: `space-${space}` },
    wrap && { flexWrap: 'wrap' },
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style, // rewrite predefined styles
  ];

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...props}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: SIZES.radius,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
  accent: { backgroundColor: COLORS.peach },
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.secondary },
  tertiary: { backgroundColor: COLORS.tertiary },
  black: { backgroundColor: COLORS.black },
  white: { backgroundColor: COLORS.white },
  gray: { backgroundColor: COLORS.gray },
  lightGray: { backgroundColor: COLORS.lightGray },
});

export default Block;
// export { default as Block } from './Block';
