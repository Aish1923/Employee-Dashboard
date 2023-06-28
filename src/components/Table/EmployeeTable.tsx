import { useContext } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./EmployeeTable.css";

export default function EmployeeTable(): JSX.Element {
  const { employees } = useContext(EmployeeContext);
  return (
    <DataTable scrollable scrollHeight="400px" value={employees} showGridlines tableStyle={{ minWidth: "50rem" }}>
      <Column field="name" header="Name" sortable></Column>
      <Column field="jobTitle" header="Job Title" sortable></Column>
      <Column field="tenure" header="Tenure" sortable></Column>
      <Column field="gender" header="Gender" sortable></Column>
    </DataTable>
  );
}