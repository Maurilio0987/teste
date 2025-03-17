var host = "https://teste-q2g3.onrender.com";
var chat = localStorage.getItem("chat");


async function get_messages(chat) {
	let response = await fetch(host + "/get_messages/" + chat);
	let data = await response.json();
	return data;
}

async function update_chat(chat) {
	let messages_section = document.getElementById("messages");
	let messages = await get_messages(chat);
	messages_section.innerHTML = "";
	for (let message of messages) {
		let div = document.createElement("div");
		div.innerHTML = `<p>${message}</p>`;
		messages_section.appendChild(div);
	}
}

function send_message() {
	message = document.getElementById("message").value;
	fetch("http://" + host + "/send_message", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({"chat": chat, "message": message})
	});
	
	update_chat(chat);
}


update_chat(chat);
setInterval(update_chat(chat), 2000);


