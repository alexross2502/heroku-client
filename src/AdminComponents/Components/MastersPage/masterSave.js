export async function masterSave(name, surname, rating, town) {
  let data = {};
  data.name = name;
  data.surname = surname;
  data.rating = rating;
  data.townName = town;
  const response = await fetch(
    "https://heroku-server-intership.herokuapp.com/api/masters",
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
}
