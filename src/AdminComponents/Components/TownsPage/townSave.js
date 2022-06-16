export async function townSave(name) {
  let data = {};
  data.name = name;
  const response = await fetch("http://localhost:8080/api/towns", {
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
