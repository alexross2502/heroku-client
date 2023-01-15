import { getToken } from "../token";

const Api = {};

Api.getAll = async function (url) {
  const token = getToken()
  const response = await fetch(`https://mysqltest.herokuapp.com/api/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`${token}`,
    },
  });
  let answer = await response.json();
  return answer;
};

Api.delete = async function (url, id) {
  const token = getToken()
  const response = await fetch(
    `https://mysqltest.herokuapp.com/api/${url}/${id}`,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`${token}`,
      },
    }
  );
  return await response.json().then((answer) => {
    return answer;
  });
};

Api.getAvailable = async function (url, id) {
  const token = getToken()
  const response = await fetch(
    `https://mysqltest.herokuapp.com/api/${url}/${id}`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`${token}`,
      },
    }
  );
  return await response.json().then((answer) => {
    return answer;
  });
};

Api.checkClient = async function clientCheck(name, email) {
  let data = {};
  data.name = name;
  data.email = email;
  const token = getToken()
  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/clients/check",
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
};

Api.mastersCheck = async function checkMasters(date, town, townName) {
  let data = {};
  data.date = date;
  data.town = town;
  data.townName = townName;
  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/reservation/available",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json().then((answer) => {
    return answer;
  });
};

Api.makeOrder = async function orderMake(town, master, date, recipient, name, surname, rating) {
  let data = {};
  data.recipient = recipient;
  data.name = name;
  data.surname = surname;
  data.rating = rating;
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

  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/reservation/order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json().then((answer) => {
    return answer;
  });
};

export default Api;
