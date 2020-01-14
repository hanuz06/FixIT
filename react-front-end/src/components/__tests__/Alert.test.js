import React from "react";
import render from "react-test-renderer";
import {Alert} from "../../components/Alert";

// afterEach(cleanup);

it("renders without crashing", () => {
  render.create(<Alert />);
});