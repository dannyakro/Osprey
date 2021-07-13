FROM python:3.8-buster

# set env variables
EXPOSE 8000

# install dependencies
COPY ./osprey_admin/requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir
RUN [ "python", "-c", "import nltk; nltk.download('punkt')" ]
RUN [ "python", "-c", "import nltk; nltk.download('wordnet')" ]

# copy project
COPY . .

WORKDIR "/osprey_admin"

RUN ["python", "manage.py", "makemigrations"]

RUN ["python", "manage.py", "migrate"]

ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
