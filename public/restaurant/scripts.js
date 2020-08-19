let customerID = document.getElementById("customerID");
const returnCustomer = (event) => {
  event.preventDefault();
  let id = customerID.value;
  fetch(`/restaurant/customerProfile/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      const { found, error } = response;
      if (error) {
        displayError(error);
      } else {
        displayInfo(found);
      }
    })
    .catch((err) => console.log(err));
};

function displayInfo(foundCustomer) {
  let custInfo = document.getElementById("customerInfo");
  custInfo.innerHTML = "";
  console.log("custInfo: ", custInfo);
  for (let key in foundCustomer) {
    if (foundCustomer.hasOwnProperty(key)) {
      let info1 = document.createElement("span");
      info1.innerHTML = `${key}: ${foundCustomer[key]}`;
      custInfo.appendChild(info1);
      let breakStatement = document.createElement("br");
      custInfo.appendChild(breakStatement);
    }
  }
}

function displayError(error) {
  let custInfo = document.getElementById("customerInfo");
  custInfo.innerHTML = "";
  let errorMessage = document.createElement("span");
  errorMessage.innerHTML = error;
  custInfo.appendChild(errorMessage);
}
