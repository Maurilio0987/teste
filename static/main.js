var host = window.location.origin;


async function get_chats() {
   let response = await fetch(host + "/get_chats");
   let data = await response.json();
   return data;
}


async function update_chats() {
	let chats_section = document.getElementById("chats");
	let chats = await get_chats(); // Aguarda a resposta antes de continuar
   chats_section.innerHTML = "";
	for (let chat in chats) {
		let div = document.createElement("div");
		div.innerHTML = `<p>${chat}</p>`;
		div.addEventListener("click", function() {
			localStorage.setItem("chat", chat);
			window.location = host + "/chat";
		});
		chats_section.appendChild(div);
	}
}

update_chats();
setInterval(update_chats, 5000);
