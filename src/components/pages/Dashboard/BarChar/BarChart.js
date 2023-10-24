import { useState } from "react";
import styles from "./_barChart.module.scss";

const BarChart = (props) => {
  const [changeHandler, setChangeHandler] = useState("");

  const leaveHandler = (id) => {
    setChangeHandler("");
  };
  const enterHandler = (id) => {
    setChangeHandler(id);
  };

  return (
    <div className={styles.chart}>
      {props.barData.map((chart) => {
        return (
          <div key={chart.month} className={styles.chart_bar}>
            <div
              className={`${styles.chart_spent} ${
                changeHandler === chart.month ? "" : styles.hidden
              }`}
              id={chart.month}
            >{`${((chart.spent / props.total) * 100).toFixed(2)}%`}</div>
            <span
              onMouseLeave={leaveHandler.bind(null, chart.month)}
              onMouseEnter={enterHandler.bind(null, chart.month)}
              className={`${
                changeHandler === chart.month ? styles.light : styles.darken
              }`}
              style={{
                height: `${(chart.spent / props.total) * 100 * 2}%`,
              }}
            ></span>
            <p>{chart.month}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
