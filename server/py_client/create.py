import requests

endpoint = "http://localhost:8000/api/courses/"

data = {"title": "Python 101", "description": "Learn Python"}

get_response = requests.post(endpoint, json=data)
print(get_response.json())
