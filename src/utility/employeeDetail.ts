import { Employee } from "../types/EmployeeTypes";
import { BarGraphData, PieChartData } from "../types/ChartPropTypes";

/*!
* To return an object which contains the values and counts of grouped values
* 
* @param input:array of Objects ; label:key against which the count of the values has to be done
* @returns {type} - object with values and their counts grouped together eg:{label1:2,label2:3}
*/
function countItems(input: Employee[], label: keyof Employee): Record<string, number> {
    const countMap: Record<string, number> = {};

    input.forEach((item) => {
        const value = item[label];
        countMap[String(value)] = (countMap[String(value)] || 0) + 1;
    });

    return countMap;
}

/*!
* To return an object in the required structure for the barGraph to display data
* 
* @param input:array of Employee Objects which is used to display barGraph; label:key against which the pie chart has to be displayed
* @returns {type} - object {label:[],data:[]} where the label contains array of possible values and data contains the count against each value
*/
export function getBarGraphData(input: Employee[], label: keyof Employee): BarGraphData[] {
    const countMap = countItems(input, label);

    const result: BarGraphData[] = Object.entries(countMap).map(([label, data]) => ({
        label,
        data: [data],
    }));

    return result;
}


/*!
* To return an object in the required structure for the pieChart to display data
* 
* @param input:array of Employee Objects which is used to display PieChart; label:key against which the pie chart has to be displayed
* @returns {type} - object {label:[],data:[]} where the label contains array of possible values and data contains the count against each value
*/
export function getPieChartData(input: Employee[], label: keyof Employee): PieChartData {
    const countMap = countItems(input, label);

    const values: string[] = Object.keys(countMap);
    const counts: number[] = Object.values(countMap);

    return { labels: values, data: counts };
}