const Api = {};

Api.getAll = async function (url) {
  const response = await fetch(`http://localhost:8080/api/${url}`);
  let answer = await response.json();
  return answer;
};

Api.delete = async function (url, id) {
  const response = await fetch(`http://localhost:8080/api/${url}/${id}`, {
    method: "DELETE",
  });
  return await response.json().then((answer) => {
    return answer;
  });
};

export default Api;
