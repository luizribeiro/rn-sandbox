import React from "react";
import renderer from "react-test-renderer";

import { Status } from "./Status";

it("renders loading spinner while loading", () => {
  const rendered = renderer
    .create(
      <Status
        data={{
          loading: true,
        }}
      />,
    )
    .toJSON();
  expect(rendered).toMatchSnapshot();
});

it("renders thermostat and vacuum status", () => {
  const rendered = renderer
    .create(
      <Status
        data={{
          loading: false,
          thermostat: {
            mode: "OFF",
            currentTemperature: 24,
            targetTemperature: 23,
          },
          vacuum: {
            state: "CHARGING",
            battery: 100,
          },
        }}
      />,
    )
    .toJSON();
  expect(rendered).toMatchSnapshot();
});
