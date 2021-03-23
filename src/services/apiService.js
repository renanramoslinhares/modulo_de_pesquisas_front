const URL_API = "http://localhost:8000";

const request = (path = "/", method = "GET", body) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  return fetch(URL_API + path, {
    method,
    headers,
    body,
  }).then((response) => response.json());
};

const normalizeBody = (objectBody) =>
  Object.entries(objectBody)
    .reduce((accumulator, current) => {
      accumulator.push(current[0] + "=" + current[1]);
      return accumulator;
    }, [])
    .join("&");

export const create = (type, bodyObject) => request(`/${type}`, "POST", normalizeBody(bodyObject));

export const readAll = (type) =>
  request(`/${type}s`).then(
    (resp) =>
      {
        return {
        task: resp.map((element) => ({
          id: element.TaskID,
          text: element.TaskText,
          dimensionId: element.DimensionID,
          dimensionName: element.DimensionName,
          status: element.TaskStatus,          
        })),
        dimension: resp.map((element) => ({
          id: element.DimensionID,
          name: element.Name,
        })),
      }[type]}
  );

export const readById = (type, id) =>
  request(`/${type}/${id}`).then(
    (resp) =>
      ({
        task: {
          id: resp.TaskID,
          text: resp.Text,
          dimensionId: resp.DimensionID,
        },
        dimension: {
          id: resp.DimensionID,
          name: resp.Name,
        },
      }[type])
  );

export const updateById = (type, id, bodyObject) =>
  request(`/${type}/${id}`, "POST", normalizeBody(bodyObject));

export const deleteById = (type, id) => request(`/${type}/${id}`, "DELETE");
