const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const summary = {};

expenses.forEach(exp => {
  exp.participants.forEach(name => {
    if (!summary[name]) summary[name] = { paid: 0, owed: 0 };
    summary[name].owed += parseFloat(exp.share);
  });
  if (!summary[exp.paidBy]) summary[exp.paidBy] = { paid: 0, owed: 0 };
  summary[exp.paidBy].paid += parseFloat(exp.amount);
});

const container = document.getElementById('summary');
for (const [name, data] of Object.entries(summary)) {
  const net = data.paid - data.owed;
  container.innerHTML += `<p><strong>${name}</strong> → Paid: ₹${data.paid.toFixed(2)}, Owed: ₹${data.owed.toFixed(2)}, Net: ₹${net.toFixed(2)}</p>`;
}

function downloadCSV() {
  let csv = 'Name,Paid,Owed,Net\n';
  for (const [name, data] of Object.entries(summary)) {
    const net = data.paid - data.owed;
    csv += `${name},${data.paid.toFixed(2)},${data.owed.toFixed(2)},${net.toFixed(2)}\n`;
  }
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'split_summary.csv';
  a.click();
}
