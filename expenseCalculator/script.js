/**
 * Expense Calculator App Logic
 */

/**
 * @typedef {Object} Expense
 * @property {string} category
 * @property {number} amount
 */

/** @type {Expense[]} */
const expenses = [];

const form = document.getElementById("expense-form");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const tableBody = document.querySelector("#expenses-table tbody");
const resultDiv = document.getElementById("result");
const calculateBtn = document.getElementById("calculate-btn");

/**
 * Add a new expense to the list and update the table.
 * @param {Expense} expense
 */
function executeAddExpense(expense) {
  expenses.push(expense);
  renderExpensesTable();
  resultDiv.innerHTML = "";
}

/**
 * Render the expenses table.
 */
function renderExpensesTable() {
  tableBody.innerHTML = "";
  expenses.forEach(function (expense) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${
      expense.category
    }</td><td>$${expense.amount.toLocaleString()}</td>`;
    tableBody.appendChild(row);
  });
}

/**
 * Calculate main indicators of monthly expenses.
 * @returns {{ totalAmount: number, averageDailyExpense: number, topThreeExpenses: Expense[] }}
 */
function calculateIndicators() {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const averageDailyExpense = totalAmount / 30;
  const topThreeExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
  return { totalAmount, averageDailyExpense, topThreeExpenses };
}

/**
 * Display the calculated results.
 * @param {{ totalAmount: number, averageDailyExpense: number, topThreeExpenses: Expense[] }} indicators
 */
function displayResults(indicators) {
  resultDiv.innerHTML = `
    <strong>Total amount of expenses:</strong> $${indicators.totalAmount.toLocaleString()}<br>
    <strong>Average daily expense:</strong> $${indicators.averageDailyExpense.toLocaleString(
      undefined,
      { maximumFractionDigits: 2 }
    )}<br>
    <div class="top3">
      <strong>Top 3 expenses:</strong>
      <ol>
        ${indicators.topThreeExpenses
          .map((e) => `<li>${e.category} ($${e.amount.toLocaleString()})</li>`)
          .join("")}
      </ol>
    </div>
  `;
}

form.onsubmit = function (event) {
  event.preventDefault();
  const category = categoryInput.value.trim();
  const amount = parseFloat(amountInput.value);
  if (!category || isNaN(amount) || amount < 0) {
    return;
  }
  executeAddExpense({ category, amount });
  form.reset();
};

calculateBtn.onclick = function () {
  if (expenses.length === 0) {
    resultDiv.innerHTML = "<em>No expenses to calculate.</em>";
    return;
  }
  const indicators = calculateIndicators();
  displayResults(indicators);
};
