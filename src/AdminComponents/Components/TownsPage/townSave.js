import { getToken } from "../../token";

export async function townSave(name) {
  let data = {};
  data.name = name;
  const token = getToken()
  const response = await fetch("https://mysqltest.herokuapp.com/api/towns", {
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
