document.addEventListener("DOMContentLoaded", () => {
  // --- Custom Formula Estimator ---
  const addParamBtn = document.getElementById("add-parameter-btn");
  const paramsContainer = document.getElementById("parameters-container");
  const formulaInput = document.getElementById("formula-input");
  const resultOutput = document.getElementById("result-output");
  const stepsOutput = document.getElementById("calculation-steps");

  let paramCount = 0;
  const addParameterRow = () => {
    paramCount++;
    const row = document.createElement("div");
    row.classList.add("parameter-row");
    row.innerHTML = `
      <input type="text" class="param-name" placeholder="Parameter Name (e.g., population)">
      <input type="text" class="param-value" placeholder="Value (e.g., 2700000)">
      <input type="text" class="param-notes" placeholder="Notes/Assumptions">
      <button class="delete-btn">&times;</button>
    `;
    paramsContainer.appendChild(row);
    row.querySelector(".delete-btn").addEventListener("click", () => {
      row.remove();
      calculate();
    });
    row.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", calculate);
    });
  };

  const sanitizeName = (name) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "_");
  };

  const calculate = () => {
    const params = {};
    let calculationSteps = "";
    document.querySelectorAll(".parameter-row").forEach((row) => {
      const nameInput = row.querySelector(".param-name");
      const valueInput = row.querySelector(".param-value");
      if (nameInput.value) {
        const saneName = sanitizeName(nameInput.value);
        const value = parseFloat(valueInput.value) || 0;
        params[saneName] = value;
      }
    });
    const formula = formulaInput.value;
    let formulaWithValues = formula;
    for (const key in params) {
      const regex = new RegExp(`\\b${key}\\b`, "g");
      formulaWithValues = formulaWithValues.replace(regex, params[key]);
    }
    calculationSteps = `Formula: ${formula}\n`;
    calculationSteps += `Substituted: ${formulaWithValues}\n\nParameters:\n`;
    for (const key in params) {
      calculationSteps += `- ${key}: ${params[key]}\n`;
    }
    try {
      const result = eval(formulaWithValues.replace(/[^0-9+\-*/(). ]/g, ""));
      if (isNaN(result) || !isFinite(result)) {
        resultOutput.textContent = "Invalid";
        stepsOutput.textContent =
          calculationSteps + "\nError: Invalid formula or division by zero.";
      } else {
        resultOutput.textContent = result.toLocaleString();
        stepsOutput.textContent = calculationSteps;
      }
    } catch (error) {
      resultOutput.textContent = "Error";
      stepsOutput.textContent = calculationSteps + `\nError: ${error.message}`;
    }
  };

  addParamBtn.addEventListener("click", addParameterRow);
  formulaInput.addEventListener("input", calculate);
  addParameterRow();
  addParameterRow();

  // --- System Design Use Case Estimator ---
  const caseSelect = document.getElementById("caseSelect");
  const inputsDiv = document.getElementById("inputs");
  const estimateBtn = document.getElementById("estimateBtn");
  const resultDiv = document.getElementById("result");

  const cases = {
    rps: {
      label: "Requests Per Second",
      fields: [
        { id: "users", label: "Number of Users", type: "number", min: 1 },
        {
          id: "reqPerUser",
          label: "Requests per User per Day",
          type: "number",
          min: 1,
        },
      ],
      calc: ({ users, reqPerUser }) => {
        const totalReq = users * reqPerUser;
        return `Estimated RPS: ${(totalReq / 86400).toFixed(2)} req/sec`;
      },
    },
    storage: {
      label: "Storage Needs",
      fields: [
        { id: "objects", label: "Number of Objects", type: "number", min: 1 },
        {
          id: "sizePerObject",
          label: "Size per Object (MB)",
          type: "number",
          min: 0.01,
        },
      ],
      calc: ({ objects, sizePerObject }) => {
        const totalMB = objects * sizePerObject;
        const totalGB = totalMB / 1024;
        return `Estimated Storage: ${totalGB.toFixed(2)} GB (${totalMB.toFixed(
          2
        )} MB)`;
      },
    },
    bandwidth: {
      label: "Bandwidth",
      fields: [
        {
          id: "reqPerSec",
          label: "Requests per Second",
          type: "number",
          min: 1,
        },
        {
          id: "respSize",
          label: "Response Size (KB)",
          type: "number",
          min: 0.01,
        },
      ],
      calc: ({ reqPerSec, respSize }) => {
        const kbps = reqPerSec * respSize;
        const mbps = kbps / 1024;
        return `Estimated Bandwidth: ${mbps.toFixed(2)} MB/s (${kbps.toFixed(
          2
        )} KB/s)`;
      },
    },
    latency: {
      label: "Latency",
      fields: [
        { id: "distance", label: "Distance (km)", type: "number", min: 1 },
        {
          id: "speed",
          label: "Speed (km/ms)",
          type: "number",
          min: 0.01,
          default: 0.2,
        },
      ],
      calc: ({ distance, speed }) => {
        const latency = distance / speed;
        return `Estimated Latency: ${latency.toFixed(2)} ms`;
      },
    },
  };

  function renderInputs(caseKey) {
    if (!inputsDiv) return;
    inputsDiv.innerHTML = "";
    cases[caseKey].fields.forEach((field) => {
      const label = document.createElement("label");
      label.htmlFor = field.id;
      label.textContent = field.label + ": ";
      const input = document.createElement("input");
      input.type = field.type;
      input.id = field.id;
      input.min = field.min;
      if (field.default !== undefined) input.value = field.default;
      inputsDiv.appendChild(label);
      inputsDiv.appendChild(input);
      inputsDiv.appendChild(document.createElement("br"));
    });
  }

  if (caseSelect && inputsDiv && estimateBtn && resultDiv) {
    caseSelect.addEventListener("change", function () {
      renderInputs(caseSelect.value);
      resultDiv.textContent = "";
    });
    estimateBtn.addEventListener("click", function () {
      const caseKey = caseSelect.value;
      const fieldValues = {};
      let valid = true;
      cases[caseKey].fields.forEach((field) => {
        const val = parseFloat(document.getElementById(field.id).value);
        if (isNaN(val) || val < field.min) {
          valid = false;
        }
        fieldValues[field.id] = val;
      });
      if (!valid) {
        resultDiv.textContent = "Please enter valid values for all fields.";
        return;
      }
      resultDiv.textContent = cases[caseKey].calc(fieldValues);
    });
    renderInputs(caseSelect.value);
  }
});
