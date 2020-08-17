import { dateStringComparator } from "./helpers/comparator";

export const API_URL = "http://localhost:9000/";

export const getUserData = () => {
  return fetch(API_URL + "user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
    },
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
};

export const getSpendingData = () => {
  return fetch(API_URL + "spending", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
    },
    redirect: "follow",
  })
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((result) => {
      const parsed = JSON.parse(result);
      parsed.sort((a, b) => {
        return dateStringComparator(a.date, b.date);
      });
      return parsed;
    })
    .catch((error) => console.log("error", error));
};

export const deleteSpendingEntry = (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify({ transaction_id: id }),
    redirect: "follow",
  };

  return fetch(API_URL + "spending", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

export const submitSpendingEntries = (IntermediarySpendingData) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );
  console.log(JSON.stringify(IntermediarySpendingData));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(IntermediarySpendingData),
    redirect: "follow",
  };

  return fetch(API_URL + "spending", requestOptions)
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

export const submitRecurringSpendingEntries = (recurringSpendingEntries) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({newItem : recurringSpendingEntries}),
    redirect: "follow",
  };

  return fetch(API_URL + "spending/recurring", requestOptions)
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

export const deleteRecurringSpendingEntry = (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify({ transaction_id: id }),
    redirect: "follow",
  };

  return fetch(API_URL + "spending/recurring", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

export const getSavingsData = () => {
  return fetch(API_URL + "savings", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
    },
    redirect: "follow",
  })
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((result) => {
      const parsed = JSON.parse(result);
      parsed.sort((a, b) => {
        return dateStringComparator(a.date, b.date);
      });
      return parsed;
    })
    .catch((error) => console.log("error", error));
};

export const deleteSavingsEntry = (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify({ transaction_id: id }),
    redirect: "follow",
  };

  return fetch(API_URL + "savings", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

export const submitSavingsEntries = (IntermediarySavingsData) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );
  console.log(JSON.stringify(IntermediarySavingsData));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(IntermediarySavingsData),
    redirect: "follow",
  };

  return fetch(API_URL + "savings", requestOptions)
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

export const submitRecurringSavingsEntries = (recurringSavingsEntries) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({newItem : recurringSavingsEntries}),
    redirect: "follow",
  };

  return fetch(API_URL + "savings/recurring", requestOptions)
    .then((response) => response.text())
    .catch((error) => console.log("error", error));
};

export const deleteRecurringSavingsEntry = (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("jwtToken")}`
  );

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify({ transaction_id: id }),
    redirect: "follow",
  };

  return fetch(API_URL + "savings/recurring", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};