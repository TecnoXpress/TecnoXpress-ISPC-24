import os

if __name__ == "__main__":
    os.system("python manage.py makemigrations")
    os.system("python manage.py migrate")