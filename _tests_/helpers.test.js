const {formatPlural, formatDate, projectOpen} = require('../utils/helpers');

// Test for formatPlural
test('formatPlural() returns a pluralized word', () => {
  const word1 = formatPlural('comment', 1);
  const word2 = formatPlural('comment', 2);

  expect(word1).toBe('comment');
  expect(word2).toBe('comments');
});

// Test for formatDate
test('formatDate() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(formatDate(date)).toBe('3/20/2020');
});

// Test for projectOpen
test('projectOpen() returns a string', () => {
    const value0 = 0;
    const value1 = 1;

    expect(projectOpen(value0)).toBe('Closed');
    expect(projectOpen(value1)).toBe('Open');
});
