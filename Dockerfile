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

RUN ["python", "manage.py", "collectstatic", "--noinput"]

ENTRYPOINT ["uvicorn", "osprey_admin.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
