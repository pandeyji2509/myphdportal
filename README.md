# Ph.D Portal

This project is a web-based PhD portal designed for Panjab University.

## Installation

1. Clone this repository to your local machine.
    ```bash
    git clone <repo url>
    ```
2. Install the necessary dependencies
    ```bash
    cd web
    npm i
    ```
    ```bash
    cd server
    npm i
    ```

## Setup

1. Setup MongoDB database, connect and copy the url
2. Setup .env file
    * Create .env files in both server and web folders
    * Paste the following in web/.env
        ```bash
        REACT_APP_SERVER_ENDPOINT = http://localhost:8000
        REACT_APP_WEB_ENDPOINT = http://localhost:3000
        ```
    * Paste the following in server/.env
        ```bash
        MONGO_URI = <mongodb url>
        PORT = 8000
        ACCESS_TOKEN_TTL = 2d
        REFRESH_TOKEN_TTL = 15d

        AUTH_USER = <contact admin>
        AUTH_PASS = <contact admin>

        JWT_SECRET= "z0B0WWiUlXOdQI2VG5gDpWdb6UlDAgdsafaeffse6v6VZeSnopGIP1jNaR8TPn7"

        RNS_EMAIL = "rns@pu.ac.in"
        DUI_EMAIL = "dui@pu.ac.in"
        PASSWORD = "123456"
        ```

## Usage

1. Run the project
    ```bash
    cd server
    npm run dev
    ```

## Contributing

Contributions are welcome! If you find any issues or want to contribute to the project, please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
