/**
 * @flow
 */

import React from "react";
import { Svg } from "expo";
import { View } from "react-native";

type Props = {
  value: number,
  content?: any,
};

export default class ProgressCircle extends React.PureComponent {
  props: Props;

  render() {
    const { value } = this.props;
    const ang = 2 * Math.PI * value + Math.PI;
    const arc =
      Math.abs(value - 1) > 1e-6 ? (
        <Svg.Path
          d={`
              M 32 3
              A 29 29 0 ${value > 0.5 ? 1 : 0} 0
                ${Math.sin(ang) * 29 + 32} ${Math.cos(ang) * 29 + 32}`}
          strokeWidth={6}
          stroke="#427AA1"
          fillOpacity={0}
        />
      ) : (
        <Svg.Circle
          cx={32}
          cy={32}
          r={29}
          strokeWidth={6}
          stroke="#427AA1"
          fillOpacity={0}
        />
      );

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <Svg height={64} width={64}>
          <Svg.Circle
            cx={32}
            cy={32}
            r={31}
            strokeWidth={1}
            stroke="#427AA1"
            fillOpacity={0}
          />
          {arc}
        </Svg>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.content}
        </View>
      </View>
    );
  }
}
