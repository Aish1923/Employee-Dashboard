export interface ChartTitleProps {
    children: React.ReactNode;
    label: string
}

export interface PieChartProps {
    labels: string[];
    data: number[];
    backgroundColors?: string[];
    hoverBackgroundColors?: string[];
    legendLabelColor?: string;
    chartStyle?: React.CSSProperties;
}

export interface PieChartData {
    labels: string[];
    data: number[];
}

export interface BarGraphProps {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor?: string;
        borderColor?: string;
        data: number[];
    }[];
    maintainAspectRatio?: boolean;
    aspectRatio?: number;
    legendFontColor?: string;
    xAxisTickColor?: string;
    xAxisTickFontWeight?: number;
    yAxisTickColor?: string;
    yAxisGridColor?: string;
    yAxisGridBorder?: boolean;
}

export interface BarGraphData {
    label: string;
    data: number[];
}




