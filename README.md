<p align="center">
  <img alt="FoodVille" width="400px" src="./src/images/FoodVille.png" />
</p>

### 📖 Table of Contents

- [❓ About](#-about-)
- [✨ Features](#-features-)
- [💻 Getting Started](#-getting-started-)
- [⚙️ Setup](#-setup-)

### ❓ About

Foodville is full-stack web application which allows users to save their own recipes and browse recipes from a third-party API.

### ✨ Features

- Uses Tasty API to browse for recipes. Click [here](https://rapidapi.com/apidojo/api/tasty) for more info about the API.
- Users can save their own recipes.
- Grants users to browse and save recipes from an API.
- Allows users to edit saved recipes ingredients, descriptions, etc.

### 💻 Getting Started

Make sure you have: -[postgresql] (https://www.postgresql.org/) installed -[Tasty] (https://rapidapi.com/apidojo/api/tasty) API Key

## ⚙️ Setup

# - Creating/Updating Database

1. You will need to add `.env.local` file in the root folder containing:

```bash
SECRET_KEY=<your_tasty_api_key>
DB_NAME=<your_db_name>
DB_USER=<your_db_username>
NODE_ENV=development
```

2. Then create a postgresql database by running this command:

```bash
psql
CREATE DATABASE <db_name>;
```

3. Quit 'psql' and update database

```bash
npm run migrate:latest
```

# - Running the server (backend) and React app (frontend)

1. Install all the independencies in the root folder.

```bash
npm install
```

2. To start server

```bash
npm run server
```

3. To start React App

```bash
npm run react-app
```

<!-- ### 🛠 Contributors
Feel free to check out our github pages and see what other projects I have worked on! 😎
<table>
  <tr>
    <td align="center"><a href="https://github.com/iAmKenKinoshita"><img src="https://avatars.githubusercontent.com/u/89846582?s=400&u=b052bbb5e3d39e2d2645d0aa61c2c06ce0fe92c2&v=4" width="200px;" alt=""/><br /><sub><b>Ken Kinoshita</b></sub></a></td>
  </tr>
</table> -->
