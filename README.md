# DONATION-MANAGEMENT SYSTEM
The **Donation Management System** is a powerful platform designed to connect generous donors with those in need, especially during natural disasters. With a seamless process for donating supplies or funds to local centers, this system ensures that resources reach the right people at the right time, transforming acts of kindness into life-changing support.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Directory Structure](#project-directory-structure)
- [Built with](#built-with)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/elhanbthomas/DONATION-MANAGEMENT.git
    ```
2. Create and run Virtual Environment
   ```bash
   python -m venv venv
   ``` 
   ```bash
   .\venv\Scripts\activate
   ```
    *Make sure to enable scripts through powershell to run virtual environment*
    
3. Installations for Django
 
    Install dependencies
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

4. Run Django 

   ```bash
   python manage.py migrate
   pyhton manage.py runserver
   ```  

5. Installation for react

    ```bash
    cd frontend
    npm install
    npm run dev
    ```
*Please refer to Django documenteation to better understand the creation of superusers and inserting table values*

https://docs.djangoproject.com/en/5.1/

## Usage

After installation visit [localhost](http://localhost:3000/) to access the app. (check port number)
### Screenshot
[Click here](./landing_page.png) to view landing page

## Features
- User authentication (SimpleJWT)
- Location access
- Pickup from donor
- Shipment between centers
- User friendly design
- Responsive design

## Project Directory Structure

```plaintext
DONATION-MANAGEMENT/
├── backend/
│   ├── api/
│   ├── beneficiary/
│   ├── center/
│   ├── donation/
│   ├── donor/
│   ├── item/
│   ├── media/
│   ├── .gitignore
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
```

## Built with
- React.js
- Material UI
- Django
- Rest Framework


## Our Team
- Ashwin S
    - [LinkedIn](https://www.linkedin.com/in/ashwin-s-67877728a/)
    - [GitHub](https://github.com/Shanwis) 
- Tarun Varier
    - [GitHub](https://github.com/tarun-varier)
- Sanjay R
    - [GitHub](https://github.com/Sanju-afk)
- Madhav
    - [GitHub](https://github.com/Madhav-000-s)
- Elhan B Thomas
    - [LinkedIn](https://www.linkedin.com/in/elhanbthomas/)
    - [Github](https://github.com/elhanbthomas)