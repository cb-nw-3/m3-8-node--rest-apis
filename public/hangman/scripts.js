const userIdInput = document.querySelector(".userIdInput");

function handleSubmit(event) {
  event.preventDefault();
  const data = { userId: userIdInput.value };
  console.log("scripts.js", data);

  fetch("/getUser", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        console.log(res.user);
      } else {
        console.log(res);
      }
    });
}
