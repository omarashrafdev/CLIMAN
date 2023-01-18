## Required tech
- Python 3.11.1
- Node js

## Steps
cd api
pip install virtualenv
python -m venv climanenv
climanenv\Scripts\activate.bat
python -m pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver