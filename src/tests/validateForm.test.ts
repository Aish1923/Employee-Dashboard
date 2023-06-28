import { validateForm } from "../utility/validateForm";

describe("validateForm", () => {
  it("should return an error message when name is left empty", () => {
    const fieldName = "name";
    const value = "";
    const result = validateForm(fieldName, value);
    expect(result).toBe("Name is required");
  });

  it("should return an error message when the tenure field is empty", () => {
    const fieldName = "jobTitle";
    const value = "";
    const result = validateForm(fieldName, value);
    expect(result).toBe("Job Title is required");
  });

  it("should return an error message when the tenure field is not numeric", () => {
    const fieldName = "tenure";
    const value = "tenure";
    const result = validateForm(fieldName, value);
    expect(result).toBe("Tenure must be a numeric value");
  });

  it("should return an error message when the tenure field is not numeric", () => {
    const fieldName = "tenure";
    const value = "";
    const result = validateForm(fieldName, value);
    expect(result).toBe("Tenure is required");
  });
});
