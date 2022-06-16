export async function clientSave(name, email) {
  let data = {};
  data.name = name;
  data.email = email;
  const response = await fetch("http://localhost:8080/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json().then((answer) => {
    return answer;
  });
}
