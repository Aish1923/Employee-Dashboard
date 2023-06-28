import "./ChartTiles.css";
import { ChartTitleProps } from "../../types/ChartPropTypes";

function ChartTiles({ label, children }: ChartTitleProps): JSX.Element {

    return (
        <fieldset className="chart-detail-tile">
            <legend>{label}</legend>
            {children}
        </fieldset>
    );

}

export default ChartTiles;
