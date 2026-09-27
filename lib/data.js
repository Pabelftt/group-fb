let loginData = [];

export function saveLoginData(email, password) {
  loginData.push({ email, password, timestamp: new Date().toISOString() });
}

export function getAllData() {
  return loginData;
}

export function deleteData(index) {
  if (index >= 0 && index < loginData.length) {
    loginData.splice(index, 1);
    return true;
  }
  return false;
}

export function clearAllData() {
  loginData = [];
}
