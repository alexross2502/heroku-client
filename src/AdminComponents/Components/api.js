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

Api.sendMail = async function mailSend(recipient, name, surname, rating) {
  let data = {};
  data.recipient = recipient;
  data.name = name;
  data.surname = surname;
  data.rating = rating;

  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/reservation/mail",
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
  const token = getToken()
  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/reservation/available",
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

export default Api;
