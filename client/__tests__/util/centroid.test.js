import _ from "lodash";

import calcCentroid from "../../src/util/centroid";

import quantile from "../../src/util/quantile";
import * as Universe from "../../src/util/stateManager/universe";
import { matrixFBSToDataframe } from "../../src/util/stateManager/matrix";
import * as World from "../../src/util/stateManager/world";
import * as REST from "./stateManager/sampleResponses";

describe("centroid", () => {
  let world;

  beforeAll(() => {
    // Create world + universe
    let universe = Universe.createUniverseFromResponse(
      _.cloneDeep(REST.config),
      _.cloneDeep(REST.schema)
    );

    universe = {
      ...universe,
      ...Universe.addObsAnnotations(
        universe,
        matrixFBSToDataframe(REST.annotationsObs)
      ),
      ...Universe.addVarAnnotations(
        universe,
        matrixFBSToDataframe(REST.annotationsVar)
      ),
      ...Universe.addObsLayout(universe, matrixFBSToDataframe(REST.layoutObs)),
    };
    world = World.createWorldFromEntireUniverse(universe);
  });

  test("field4 (categorical obsAnnotation)", () => {
    const centroidResult = calcCentroid(world, "field4", ["umap_0", "umap_1"]);

    // Check to see that a centroid has been calculated for every categorical value
    const keysAsArray = Array.from(centroidResult.keys());
    expect(keysAsArray).toEqual(
      expect.arrayContaining([83, true, "foo", 2.222222])
    );

    // This expected result assumes that all cells belong in all categorical values inside of sample response
    const expectedResult = [
      quantile([0.5], world.obsLayout.col("umap_0").asArray())[0],
      quantile([0.5], world.obsLayout.col("umap_1").asArray())[0],
    ];

    centroidResult.forEach((coordinate) => {
      expect(coordinate).toEqual(expectedResult);
    });
  });

  test("field3 (boolean obsAnnotation)", () => {
    const centroidResult = calcCentroid(world, "field3", ["umap_0", "umap_1"]);

    // Check to see that a centroid has been calculated for every categorical value
    const keysAsArray = Array.from(centroidResult.keys());
    expect(keysAsArray).toEqual(expect.arrayContaining([false, true]));

    // This expected result assumes that all cells belong in all categorical values inside of sample response
    const expectedResult = [
      quantile([0.5], world.obsLayout.col("umap_0").asArray())[0],
      quantile([0.5], world.obsLayout.col("umap_1").asArray())[0],
    ];

    centroidResult.forEach((coordinate) => {
      expect(coordinate).toEqual(expectedResult);
    });
  });
});
