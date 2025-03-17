from flask import Flask, render_template, jsonify, request
from localdb.dbmanager import DBManager


app = Flask(__name__)


db = DBManager("localdb/chats.txt")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat")
def chat():
    return render_template("chat.html")


@app.route("/get_chats", methods=["GET"])
def chats():
    return jsonify(db.get())


@app.route("/get_messages/<chat>", methods=["GET"])
def messages(chat):
    messages = db.get()[f"{chat}"]
    return jsonify(messages)

@app.route("/send_message", methods=["POST"])
def send_message():
    chat = request.json["chat"]
    message = request.json["message"]
    
    chats = db.get()
    chats[chat].append(message)
    db.add(chats)
    
    return jsonify({"status": "success"}), 200

app.run()
