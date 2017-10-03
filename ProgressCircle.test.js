import React from "react";
import renderer from "react-test-renderer";

import ProgressCircle from "./ProgressCircle";

function testProgressCircle(value: number): void {
  it(`renders for value ${value}`, () => {
    const rendered = renderer.create(<ProgressCircle value={value} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
}

testProgressCircle(0);
testProgressCircle(0.25);
testProgressCircle(0.5);
testProgressCircle(0.75);
testProgressCircle(0.99);
testProgressCircle(1);
