# CS50W Capstone Projekct - eLearning

This is my final project for the CS50W course on edx.org by Havard University. Since I did not completly read the requirements, I first completely build the backend using appwrite, since I wanted to familiarize myself with this new project. After then reading the requirements I wrote the whole backend again using Django and Django Rest Framework. This also made me to refactor the react frontend again. Leasson learned: first read the requirements completly :)
## eLearning App
The idea behind this app is that admins can add online video courses in the django admin interface. Students can register at the react frontend, upload a profile picture, enter in which grade they are in school, enter their name and earn experiance points for watching lectures. After every 1000 experiance points they level up their profile. This is to further increase the engagement and motivation of the students.

## Technology Choice and Justification

During cs50 I learned a lot about django but I already had some understanding and experiance using the react library. I wanted to lear new things in my capstone project. Hence, I used vite instead of create react app and axios on the frontend. In the backend I use Django Rest Framework and Simple JWT to implement my own authentication provider with handling access and refresh tokens. I also wanted to play around with gamification elements and implemented a simple system to gain experiance points if lecture videos are watched for the first time.

Using the tailwind css library I also made sure the app is fully responsive and optimized for mobile view.

## Distinctiveness and Complexity
This app is very distinctive from all other projects done in CS50W. Next to the destinctive content type of the app (consuming video lectures), I also implemented the authentication myself which with all that frontend state and edge case handling in combination with using Typescript consumed the majority of the time and added a lot of complexity to the project. Before refactoring the backend from appwrite to django, I also learned a lot on how to build a backend with cloud functions and using a document NoSQL database.


# Setup of development environment

create a .env file in the root directory with the following 2 variables:
VITE_API_BASE_URL=http://localhost:8000/api
DJANGO_SECRET_KEY="YOUR_DJANGO_SECRET_KEY_HERE"

## Backend (Server folder)
1. Create a python venv
2. Install the packages from the requirements.txt by using pip
3. Make and run migrations
4. Create a superuser on the django cli
5. Starte the backend
6. Create courses and lectures in the admin panel


## Frontend (Root folder)
1. run `npm install`
2. run `npm run dev`

# Backend Description
I created a custom user model to use the email address as login username and add custom fields in a profile model.

For the backend I created several django apps.
- Core: main handling of django
- Identity: handling authentication and user/profile updates
- Courses: managing the course content of the app
- Gamification: managing gamification elements like granting xp for watched lectures

# Frontend Description
The app was setup with vite. A main challenge was to implement the custom token auth handling and its edge cases while using typescript (I am still very new to typescript). For convenience I used the tailwind css library for building my components.

# Used External Sources
- Youtube tutorial for django rest framework: https://www.youtube.com/watch?v=c708Nf0cHrs
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Django Rest Framework docs: https://www.django-rest-framework.org/
- Django docs: https://docs.djangoproject.com
- Youtube tutorial on using axios for refreshing access tokens: https://youtu.be/16-1mTdGBoM
- Lots and lots of https://stackoverflow.com