const socket = io();
const button = document.getElementById("buttonSend");

const sendMessage = (e) => {
    e.preventDefault();
    const inputMessage = document.getElementById("message");
    const date = new Date();
    const message = {
        email: document.getElementById("email").value,
        year: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).split('-').reverse().join('/'),
        time: date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds(),
        message: inputMessage.value,
    };
    socket.emit("message", message);
    inputMessage.value = "";
    inputMessage.focus();
};

button.addEventListener("click", sendMessage);

socket.on("products", (products) => {
    fetch("http://localhost:3000/template/products.tpl")
    .then((res) => res.text())
    .then((data) => {
        const template = Handlebars.compile(data);
        const html = template({ products });
        document.getElementById("products").innerHTML = html;
    });
});

socket.on("messages", (messages) => {
    const html = messages.map((mensaje) => {
        return `<p class="mt-3">
                    <span class="text-primary fw-bold">${mensaje.email}</span> 
                    [<span class="text-danger">${mensaje.year} ${mensaje.time}</span>]: 
                    <span class="text-success">${mensaje.message}</span>
                </p>`;
    })
    .join("");

    document.getElementById("messages").innerHTML = html;
});
