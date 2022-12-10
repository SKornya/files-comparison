export default (diffObj) => {
  const diffQuoted = JSON.stringify(diffObj, null, '  ');
  const diff = diffQuoted.replace(/"|,/g, '');
  return diff;
};
