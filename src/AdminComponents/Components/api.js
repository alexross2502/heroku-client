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

export default Api;
