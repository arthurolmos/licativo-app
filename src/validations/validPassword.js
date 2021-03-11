export function validPassword(str) {
  if (str.length < 6) {
    return false;
  }
  if (str.length > 50) {
    return false;
  }
  if (str.search(/\d/) === -1) {
    return false;
  }
  if (str.search(/[a-zA-Z]/) === -1) {
    return false;
  }
  if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
    return false;
  }

  return true;
}
