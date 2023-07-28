# P4ssword-M4nager

This project is a Password Manager designed to work on every Platform (Windows, Linux, Macos, Android, iOs, ...). It can be installed as PWA (**P**rogressive **W**eb **A**pp) or used directly in the browser. The Database is selfhosted and managed through an API. Everything is encrypted using the users password to ensure security even if the database gets leaked. 

## 🎭 Features

- Unrestricted User registrations
- Storing encrypted Login Credentials (Name, Username, Password, Note)
- Wrap the Credentials within Folders to sort them
- Adding 2FA Credentials to generate OTP Codes.
- Global Accessible Data
- Offline Modus

## 🔱 Install as PWA

To be able to install the `P4ssword M4nager`, simply head to [p4ss.p4s3r0.com](p4ss.p4s3r0.com) and a installation prompt should be shown. If no installation hint appears, click `More` (3 dots on the right top) and press on `Install App`. For further instructions get help [here](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DDesktop&sjid=2917438543024608580-EU)

## 📷 Screenshots

## 🃏 API Connection
The API calls are protected with Session like API keys. Everytime a User logs in, a new API-Key is generated and mapped to the current device. Once the user logs out, The API-Key is deleted and no further communicatino is authorized with the old API-Key. 

Every sensitive data passed to the API is encrypted with the users password. 

| Function | Attributes | Explanation |
|----------|------------|-------------|
|`get_app_version`|-|Returns the current app version|
|`add_user`  | `username`, `email`, `password`  | Register user to the database |
|`login_user`| `username`, `password`| Checks if login Credentials are correct  |
|  `logout_user` | `api_key`  | Deletes the API Session Key connected to the device  |
|`add_password`|`api_key`, `user`, `name`, `password`, `folder`, `note`, `username`, `starred`| Adds a Password to the database |
|`get_passwords`|`api_key`, `user`| Returns an array of the users Passwords|
|`del_password`|`api_key`, `user`, `id`| Deletes the Password from the database|
|`update_password`|`api_key`, `user`, `id`, `name`, `password`, `folder`, `note`, `username`| Updates the Passwords data accordingly|
|`add_folder`|`api_key`, `user`, `folder`, `color`, `starred`| Adds a Folder to the database|
|`get_folders`|`api_key`, `user`| Returns an array of the users Folders|
|`del_folder`|`api_key`, `user`, `id`|Deletes the Folder from the database|
|`get_folders_passwords`|`api_key`, `user`, `folder`|This API Call will be deleted in future versions. Returns an array of Passwords within the folder|
|`update_folder`|`api_key`, `user`, `id`, `folder`, `color`, `starred`| Updates the Folders data accordingly|
|`add_2fa`|`api_key`, `user`, `name`, `secret`|Adds a 2FA to the database|
|`update_2fa`|`api_key`, `user`, `id`, `name`, `secret`|Updates the 2FAs data accordingly|
|`get_2fa`|`api_key`, `user`|Returns an array of the users 2FA Codes|
|`del_2fa`|`api_key`, `user`, `id`|Deletes the 2FA from the database|
|`get_otp`|`api_key`, `user`, `id`|Returns a valid OTP Code produced with the 2FA secret|