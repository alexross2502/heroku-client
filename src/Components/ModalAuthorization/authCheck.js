export async function authCheck(formData) {
  let data = {};
  data.password = formData.password;
  data.login = formData.email;
 // const response = await fetch("https://mysqltest.herokuapp.com/api/admin", {
  const response = await fetch("http://localhost:3306/api/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json().then((answer) => {
    localStorage.setItem('token', answer.token)
    return answer;
  });
}
