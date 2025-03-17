import json


class DBManager():
    def __init__(self, path):
        self.path = path
    
   
    def get(self):
        data = {}
        with open(self.path, "r") as file:
            data = json.loads(file.read())
        return data
    
    def add(self, data):
        with open(self.path, "w") as file:
            file.write(json.dumps(data))
