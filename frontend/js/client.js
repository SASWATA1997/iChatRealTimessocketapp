const socket = io("http://localhost:5000", { transports: ["websocket"] });

const form = document.getElementById("send-container");

const messageInput = document.getElementById("messageInp");

const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3')

const append = (message, position) => {
  const messageElem = document.createElement("div");
  messageElem.innerText = message;
  messageElem.classList.add("message");
  messageElem.classList.add(position);

  messageContainer.append(messageElem);

  if(position == 'left'){

      audio.play();
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`you:${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
const uName = prompt("enter your name to join");

socket.emit("new-user-joined", uName);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message} `, "left");
});

socket.on('left', name =>{
    append(`${name} left the chat`,'left')
})