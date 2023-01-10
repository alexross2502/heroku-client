import { getToken } from "../../token";

export async function reservationSave(town, master, date) {
  let data = {};
  data.towns_id = String(town);
  data.master_id = String(master);
  data.day = date.date;
  let hours;
  if (date.time[1] - date.time[0] == 1) {
    hours = String(date.time[0]);
  } else if (date.time[1] - date.time[0] == 2) {
    hours = `${date.time[0]}-${+date.time[0] + 1}`;
  } else if (date.time[1] - date.time[0] == 3) {
    hours = `${date.time[0]}-${+date.time[0] + 1}-${+date.time[0] + 2}`;
  }
  data.hours = hours;
  const token = getToken()

  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/reservation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':`${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json().then((answer) => {
    return answer;
  });
}
