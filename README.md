# Back-of-the-Envelope Estimator

This web-based utility helps you perform quick, "back-of-the-envelope" calculations for both general estimation problems and common system design interview topics. It lets you break down complex problems, document assumptions, and get instant results. Perfect for engineers, product managers, students, and anyone needing fast, reasonable estimates.
<img width="1539" height="1013" alt="Screenshot 2025-08-16 at 22 33 37" src="https://github.com/user-attachments/assets/0cbd845e-307a-4b57-a065-ee4fbd7c10c9" />

## Features

- **Custom Formula Estimator:** Define your own estimation problem, add parameters, and write formulas for Fermi problems or any rough calculation.
- **System Design Use Case Estimator:** Select from common system design topics (Requests Per Second, Storage, Bandwidth, Latency) and get instant calculations with pre-filled examples (e.g., Twitter QPS).
- **Dynamic Inputs:** Add/remove parameters and assumptions on the fly.
- **Real-time Calculation:** Results update instantly as you change values.
- **Clear Breakdown:** See the full calculation and trace your steps.
- **No Backend Needed:** Runs entirely in the browser using HTML, CSS, and JavaScript.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

git clone https://github.com/angga-22/BTEE.git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/angga-22/BTEE.git
   ```
2. Navigate to the project directory:
   ```bash
   cd back-of-the-envelope-estimator
   ```
3. Open `index.html` in your web browser.
   - No dependencies or build steps required.

## How to Use

### Custom Formula Estimator

1. **Define the Goal:** Clearly state what you are trying to estimate (e.g., "Number of piano tuners in Chicago").
2. **Add Parameters:** Click the "Add Parameter" button for each variable or assumption.
   - **Name:** Descriptive name (e.g., "Population of Chicago").
   - **Value:** Numeric value.
   - **Notes:** Brief explanation or source.
3. **Define the Formula:** Write the calculation using parameter names. Use standard math operators (+, -, \*, /).
4. **View the Result:** The estimated result and calculation steps will appear instantly.

### System Design Use Case Estimator

1. **Select Topic:** Choose a system design topic (e.g., Requests Per Second).
2. **Fill Inputs:** Enter values or use pre-filled examples.
   - **Example: Twitter QPS**
     - Number of Users: `300,000,000` (monthly active users)
     - Requests per User per Day: `40`
     - Formula: `QPS = (users * requests per user per day) / 86400`
     - Result: ~139,000 requests/sec
3. **Estimate:** Click "Estimate" to see the result.

## Project Structure

```
back-of-the-envelope-estimator/
├── index.html   # Main HTML file
├── style.css    # CSS for styling
├── script.js    # JavaScript logic
└── README.md    # Documentation
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License.

