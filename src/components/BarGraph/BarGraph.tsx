import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { BarGraphProps } from "../../types/ChartPropTypes";

const BarGraph = ({
    labels,
    datasets,
    maintainAspectRatio = false,
    aspectRatio = 0.8,
    legendFontColor,
    xAxisTickColor,
    xAxisTickFontWeight,
    yAxisTickColor,
    yAxisGridColor,
    yAxisGridBorder,
}: BarGraphProps) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
        const data = {
            labels: labels,
            datasets: datasets.map((dataset) => ({
                label: dataset.label,
                backgroundColor: dataset.backgroundColor,
                borderColor: dataset.borderColor,
                data: dataset.data,
            })),
        };
        const options = {
            maintainAspectRatio: maintainAspectRatio,
            aspectRatio: aspectRatio,
            plugins: {
                legend: {
                    labels: {
                        fontColor: legendFontColor || textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: xAxisTickColor || textColorSecondary,
                        font: {
                            weight: xAxisTickFontWeight || 500,
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: yAxisTickColor || textColorSecondary,
                    },
                    grid: {
                        color: yAxisGridColor || surfaceBorder,
                        drawBorder: yAxisGridBorder !== undefined ? yAxisGridBorder : false,
                    },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, [labels, datasets, maintainAspectRatio, aspectRatio, legendFontColor, xAxisTickColor, xAxisTickFontWeight, yAxisTickColor, yAxisGridColor, yAxisGridBorder]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarGraph;
