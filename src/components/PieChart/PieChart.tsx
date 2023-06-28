import { Chart } from "primereact/chart";
import { PieChartProps } from "../../types/ChartPropTypes";

const PieChart = ({
    labels,
    data,
    backgroundColors,
    hoverBackgroundColors,
    legendLabelColor,
    chartStyle,
}: PieChartProps) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: legendLabelColor || "#495057",
                },
            },
        },
    };

    return (
        <div className="card">
            <Chart type="pie" data={chartData} options={chartOptions} style={chartStyle} className="w-full md:w-40rem" />
        </div>
    );
};

export default PieChart;
