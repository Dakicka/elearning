from appwrite.client import Client

# You can remove imports of services you don't use
from appwrite.services.database import Database

import json
"""
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
"""


def main(req, res):
    client = Client()
    # You can remove services you don't use
    database = Database(client)

    if not req.env.get('APPWRITE_FUNCTION_ENDPOINT') or not req.env.get('APPWRITE_FUNCTION_API_KEY'):
        print('Environment variables are not set. Function cannot use Appwrite SDK.')
    else:
        (
            client
            .set_endpoint(req.env.get('APPWRITE_FUNCTION_ENDPOINT', None))
            .set_project(req.env.get('APPWRITE_FUNCTION_PROJECT_ID', None))
            .set_key(req.env.get('APPWRITE_FUNCTION_API_KEY', None))
            .set_self_signed(True)
        )

    env = req.env
    event_data = env["APPWRITE_FUNCTION_EVENT_DATA"]
    payload = json.loads(event_data or '{}')

    userId = payload["$id"]
    permissionString = "user:{}".format(userId)
    permissionArray = []
    permissionArray.append(permissionString)
    database.create_document("profiles", "unique()", {
                             "userId": userId}, permissionArray, permissionArray)

    return res.send("Profile for new user successfully created")
