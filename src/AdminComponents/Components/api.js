const Api = {};

Api.getAll = async function (url) {
  const response = await fetch(`https://mysqltest.herokuapp.com/api/${url}`);
  let answer = await response.json();
  return answer;
};

Api.delete = async function (url, id) {
  const response = await fetch(
    `https://mysqltest.herokuapp.com/api/${url}/${id}`,
    {
      method: "DELETE",
    }
  );
  return await response.json().then((answer) => {
    return answer;
  });
};

Api.getAvailable = async function (url, id) {
  const response = await fetch(
    `https://mysqltest.herokuapp.com/api/${url}/${id}`,
    {
      method: "GET",
    }
  );
  return await response.json().then((answer) => {
    return answer;
  });
};

Api.addConfirmation = async function confirmationSave(
  id,
  masterName,
  masterSurname,
  clientEmail,
  townName,
  masterRating,
  day,
  hours
) {
  let data = {};
  data.id = id;
  data.masterName = masterName;
  data.masterSurname = masterSurname;
  data.clientEmail = clientEmail;
  data.townName = townName;
  data.masterRating = masterRating;
  data.day = day;
  data.hours = hours;
  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/confirmation",
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

Api.checkConfirmation = async function confirmationCheck(id) {
  let data = {};
  data.id = id;

  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/confirmation/check",
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

Api.sendMail = async function mailSend(recipient, name, surname, rating, link) {
  let data = {};
  data.recipient = recipient;
  data.name = name;
  data.surname = surname;
  data.rating = rating;
  data.link = link;

  const response = await fetch(
    "https://mysqltest.herokuapp.com/api/confirmation/mail",
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
