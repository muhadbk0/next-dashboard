import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { AutoSizer } from "react-virtualized";
import {
  VictoryChart,
  VictoryContainer,
  VictoryAxis,
  VictoryStack,
  VictoryArea
} from "victory";
import { useTheme } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import theme from "./theme";

function Chart5(props) {
  const materialTheme = useTheme();

  const data = useMemo(
    () =>
      _.times(7, () => {
        return [
          { x: 1, y: _.random(1, 5) },
          { x: 2, y: _.random(1, 10) },
          { x: 3, y: _.random(2, 10) },
          { x: 4, y: _.random(2, 10) },
          { x: 5, y: _.random(2, 15) }
        ];
      }),
    []
  );

  const renderChart = useCallback(
    ({ width }) => {
      if (!width) return null;
      const height = 0.8 * width;

      return (
        <svg width={width} height={height}>
          <VictoryChart
            width={width}
            height={height}
            standalone={false}
            containerComponent={<VictoryContainer responsive={false} />}
            theme={theme({
              theme: materialTheme,
              withGrid: true,
              withAxis: true,
              withArea: true
            })}
          >
            <VictoryStack colorScale={"blue"}>
              {_.map(data, (item, i) => (
                <VictoryArea key={i} data={item} interpolation={"basis"} />
              ))}
            </VictoryStack>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </svg>
      );
    },
    [data, materialTheme]
  );

  return (
    <Paper className={props.className}>
      <AutoSizer disableHeight>{renderChart}</AutoSizer>
    </Paper>
  );
}

Chart5.propTypes = {
  className: PropTypes.string
};

export default Chart5;
