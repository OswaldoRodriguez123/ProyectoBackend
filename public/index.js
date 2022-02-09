const socket = io();
const button = document.getElementById("buttonSend");

const sendMessage = (e) => {
  e.preventDefault();
  const inputMessage = document.getElementById("message");
  const inputMail = document.getElementById("email");
  const message = {
    email: inputMail.value,
    year: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).split('-').reverse().join('/'),
    time:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
    message: inputMessage.value,
  };
  socket.emit("message", message);
  inputMessage.value = "";
  inputMessage.focus();
};

button.addEventListener("click", sendMessage);

socket.on("chat", (messages) => {
  const html = messages.map((message) => {
      return `<p class="mt-3">
                  <span class="text-primary fw-bold">${message.email}</span> 
                  [<span class="text-danger">${message.year} ${message.time}</span>]: 
                  <span class="text-success">${message.message}</span>
              </p>`;
  })
  .join("");

  document.getElementById("messages").innerHTML = html;
});

(async () => {
  const response = await fetch("http://localhost:3000/api/products", {
    headers: {"Content-Type": "application/json"},
  });

  if (response.status === 200) {
    const products = await response.json();

    fetch("http://localhost:3000/template/products.tpl")
      .then((res) => res.text())
      .then((data) => {
        const template = Handlebars.compile(data);
        const html = template({ products });
        document.getElementById("products").innerHTML = html;
      });
  }
})();
