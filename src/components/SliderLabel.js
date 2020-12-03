// copied from https://github.com/ptomasroos/react-native-multi-slider/blob/master/DefaultLabel.js

import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

const sliderRadius = 0;
const width = 50;
export default class DefaultLabel extends React.Component {
  static propTypes = {
    oneMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    twoMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    oneMarkerLeftPosition: PropTypes.number,
    twoMarkerLeftPosition: PropTypes.number,

    oneMarkerPressed: PropTypes.bool,
    twoMarkerPressed: PropTypes.bool,
  };

  render() {
    const {
      oneMarkerValue,
      twoMarkerValue,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
      oneMarkerPressed,
      twoMarkerPressed,
    } = this.props;

    return (
      <View style={{ position: 'relative' }}>
        {Number.isFinite(oneMarkerLeftPosition) &&
          Number.isFinite(oneMarkerValue) && (
            <View
              style={[
                styles.sliderContainer,
                { left: oneMarkerLeftPosition - width / 2 + sliderRadius },
              ]}
            >
              <View
                style={[
                  styles.sliderLabel,
                  oneMarkerPressed && styles.markerPressed,
                ]}
              >
                <Text style={styles.sliderLabelText}>{oneMarkerValue}</Text>
              </View>
            </View>
          )}

        {Number.isFinite(twoMarkerLeftPosition) &&
          Number.isFinite(twoMarkerValue) && (
            <View
              style={[
                styles.sliderContainer,
                { left: twoMarkerLeftPosition - width / 2 + sliderRadius },
              ]}
            >
              <View
                style={[
                  styles.sliderLabel,
                  twoMarkerPressed && styles.markerPressed,
                ]}
              >
                <Text style={styles.sliderLabelText}>{twoMarkerValue}</Text>
              </View>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'absolute',
    bottom: -10,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderLabel: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  sliderLabelText: {
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 10,
  },
  markerPressed: {
    borderWidth: 2,
  },
});
