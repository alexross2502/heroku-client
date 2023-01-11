import { getToken } from "../../token";

export async function clientSave(name, email) {
  let data = {};
  data.name = name;
  data.email = email;
  const token = getToken()
  const response = await fetch("https://mysqltest.herokuapp.com/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization':`${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json().then((answer) => {
    return answer;
  });
}
