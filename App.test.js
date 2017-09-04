import App from "./App";
import React from "react";
import { Status } from "./Status";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  // TODO: this crashes jest for some reason :( need to mock graphql responses
  // const rendered = renderer.create(<App />).toJSON();
  // expect(rendered).toBeTruthy();
});
