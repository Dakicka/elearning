import smtplib
import ssl
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def main(request, response):
    env = request.env
    event_data = env["APPWRITE_FUNCTION_EVENT_DATA"]
    payload = json.loads(event_data or '{}')

    def sendWelcomeEmail():
        receiver_name = payload["name"]
        receiver_email = payload["email"]
        sender_email = env["SMTP_USERNAME"]

        message = MIMEMultipart("alternative")
        message["Subject"] = "Willkommen bei Life Hackers"
        message["From"] = sender_email
        message["To"] = receiver_email

        # Create the plain-text and HTML version of your message
        text = """\
    Hi {receiver_name},
    Willkommen bei Life Hackers.
    Wir freuen uns schon darauf mit dir eine tolle Reise zu starten!""".format(receiver_name=receiver_name)
        html = """\
    <html>
      <body>
        <p>Hi {receiver_name},<br>
          Willkommen bei <a href="http://www.google.com">Life Hackers.</a><br>
          Wir freuen uns schon darauf mit dir eine tolle Reise zu starten!
        </p>
      </body>
    </html>
    """.format(receiver_name=receiver_name)

        # Turn these into plain/html MIMEText objects
        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part1)
        message.attach(part2)

        # Create secure connection with server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(env["SMTP_HOST"], env["SMTP_PORT"], context=context) as server:
            server.login(env["SMTP_USERNAME"], env["SMTP_PASSWORD"])
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )
            # Terminating the session
            server.quit()

    try:
        response = sendWelcomeEmail()
        print("response code: ", response.status_code)
    except Exception as e:
        print(e)
