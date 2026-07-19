# WORK IN PROGRESS

# P4ssword-M4nager

This project is a Password Manager designed to work on every Platform (Windows, Linux, Macos, Android, iOs, ...). It can be installed as PWA (**P**rogressive **W**eb **A**pp) or used directly in the browser. The Database is selfhosted and managed through an API. Everything is encrypted using the users password to ensure security even if the database gets leaked. 

## 🎭 Features

- Unrestricted User registrations
- Storing encrypted Login Credentials (Name, Username, Password, Note)
- Wrap the Credentials within Folders to sort them
- Adding 2FA Credentials to generate OTP Codes.
- Global Accessible Data
- Copy Username/Password/OTP-Code Directly into Clipboard without exposing it

## 🔱 Host locally

We added a `docker-compose` file on the root project to easyily set it up. Make sure you installed **Docker** and **docker-compose**.

### 1) Install Docker and Docker-Compose
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 2) Setup the .env Files

Locate both `.env` files. the first one is in project root, rename the `.env.example` to `.env` and fill out the missing variables.
The other `.env` is in `/frontend`, rename the `.env.example` to `.env` and fill out the missing variables.

### 3) Run it
```bash
sudo docker-compose up --build --force-recreate --no-deps
```

### 4) Install PWA

PWAs can only be installed on Chrome (for Android and Desktop) and on Safari (for iOS). In Chrome, press the three dots and click on `Install App` or `Add to Home Screen`. In Safari you have to click the share button and then `Add to Home Screen`. Now you are all set up and ready to use the App.




## 📷 Screenshots
| Login | Register |
|----------|------------|
|![](images/login.png)|![](images/register.png)|

| Home Folders | Home Passwords | Home 2FA | 
|----------|------------|------------|
|![](images/homeFolder.png)|![](images/homePassword.png)| ![](images/homeTwofa.png)|

| Add Folders | Add Passwords | Add 2FA | 
|----------|------------|------------|
|![](images/addFolder.png)|![](images/addPassword.png)| ![](images/addTwofa.png)|

| Folder Inspection | Password Inspection | Password Generator
|----------|------------|------------|
|![](images/FolderPassword.png)|![](images/passwordView.png)|![](images/passwordGenerator.png)|

