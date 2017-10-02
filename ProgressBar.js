/**
 * @flow
 */

import React from "react";
import { View } from "react-native";
import { Svg } from "expo";

type Props = {
  value: number,
};

export default class ProgressCircle extends React.PureComponent {
  props: Props;

  render() {
    const { value } = this.props;
    return (
      <Svg height={3} width={95}>
        <Svg.Rect
          cx={0}
          cy={0}
          width={95}
          height={3}
          strokeWidth={1}
          stroke="#A9C2D4"
          fillOpacity={0}
        />
        <Svg.Rect
          cx={0}
          cy={0}
          width={95 * value}
          height={3}
          strokeWidth={1}
          stroke="#A9C2D4"
          fill="#A9C2D4"
        />
      </Svg>
    );
  }
}
