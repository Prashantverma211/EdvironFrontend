import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";

function PieChart() {
  const edvitronState = useSelector((state) => state.edvitron);
  console.log(Chart);
  return <Pie data={edvitronState.pieData}></Pie>;
}

export default PieChart;
