import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeTable from '../components/Table/EmployeeTable';
import BarGraph from '../components/BarGraph/BarGraph';
import ChartTiles from '../components/ChartTiles/ChartTiles';
import PieChart from '../components/PieChart/PieChart';
import { getPieChartData, getBarGraphData } from '../utility/employeeDetail';
import { ProgressSpinner } from 'primereact/progressspinner';
import './Dashboard.css';


function Dashboard() {
  const navigate = useNavigate();
  const { employees, isLoading } = useContext(EmployeeContext);
  const pieChartResult = getPieChartData(employees, "jobTitle");
  const barGraphData = getBarGraphData(employees, "gender");

  return (
    <>
      <h2 className="heading">Corporate Employees</h2>
      {!isLoading ?
        <>
          <div className="add-employee-button" ><button onClick={() => navigate('/add-employee')}>Add Employee</button></div>
          <div>
            <EmployeeTable />
            <div className='charts-container'>
              <ChartTiles label="Employees By Job Title">
                <PieChart
                  labels={pieChartResult.labels}
                  data={pieChartResult.data}
                />
              </ChartTiles>
              <ChartTiles label="Employees By Gender">
                <BarGraph labels={["Gender"]} datasets={barGraphData} />
              </ChartTiles>
            </div>
          </div></> :
        <div className='spinner'>
          <ProgressSpinner />
        </div>
      }
    </>
  )
}

export default Dashboard;