// Load the progress from the server and update the checkboxes
async function fetchProgress() {
  const res = await fetch('http://localhost:3001/progress');
  const data = await res.json();
  data.forEach(row => {
    const cb = document.getElementById(row.id);
    if (cb) cb.checked = !!row.checked;
  });
}

// Update the progress in the database
async function updateProgress(id, checked) {
  await fetch('http://localhost:3001/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, checked })
  });
}

// Initialize the progress tracking system
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      updateProgress(cb.id, cb.checked);
    });
  });
  fetchProgress();
});