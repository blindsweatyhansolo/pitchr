// Function to display date as (MM/DD/YYYY)
const formatDate = (date) => {
  return `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
};

// Function to display template literals with correct plural grammar
const formatPlural = (word, amount) => {
  if (amount !== 1) {
    return `${word}s`;
  }
};

// Function to convert project.value to string
const projectOpen = (value) => {
  if (value === 0) {
    return "Closed";
  } else {
    return "Open";
  }
};

module.exports = { formatPlural, formatDate, projectOpen };
