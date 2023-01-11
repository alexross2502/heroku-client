import { getToken } from "../../token";

export async function masterSave(name, surname, rating, town) {
  let data = {};
  data.name = name;
  data.surname = surname;
  data.rating = rating;
  data.townName = town;
  const token = getToken()
  const response = await fetch("https://mysqltest.herokuapp.com/api/masters", {
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
