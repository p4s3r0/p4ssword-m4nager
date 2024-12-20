import DbHandler
from dotenv import load_dotenv
import os

import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import subprocess

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


from Crypto.Hash import keccak

app = FastAPI()

origins = ["*"]
app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)

load_dotenv()

def HASH(val):
    keccak_hash = keccak.new(digest_bits=512)
    keccak_hash.update(bytes(val, 'utf-8'))
    return keccak_hash.hexdigest()

def decrypt(enc):
    key = os.getenv("P4SSWORD_M4NAGER_KEY")
    iv =  os.getenv("P4SSWORD_M4NAGER_IV").encode('utf-8')
    enc = base64.b64decode(enc)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(enc),16).decode()


# USER ########################################################################
@app.get("/add_user")
def add_user(username: str = "", email: str = "", password: str = ""):
    if username == "" or email == "" or password == "":
        return JSONResponse(
                status_code=400,
                content={"message": "Atleast one Parameter is empty"}
            )
    return DbHandler.add_User(username, email, password)



@app.get("/login_user")
def login_user(username: str = "", password: str = ""):
    if username == "" or password == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )
    return DbHandler.login_User(username, password)


@app.get("/logout_user")
def logout_user(api_key: str = ""):
    try:
        return DbHandler.logout_User(api_key)
    except:
        return JSONResponse(
            status_code=401,
            content={"message": "API-key could not be removed"}
        )




# PASSWORD ####################################################################
@app.get("/add_password")
def add_password(api_key: str = "", name: str = "", starred: bool = False, password: str = "", folder: str = "", note: str = "", user: str = "", username: str = ""):
    if api_key == "" or name == "" or folder == "" or username == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    if DbHandler.add_password(name, starred, password, folder, note, user, username):
        return JSONResponse(
            status_code=201,
            content={"message": "Password added"}
        )
    else:
        return JSONResponse(
            status_code=503,
            content={"message": "Something went wrong"}
        )




@app.get("/del_password")
def del_password(api_key: str = "", user: str = "", id: int = -1):
    if user == "" or id == -1 or api_key == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    if DbHandler.del_password(user, id):
        return JSONResponse(
            status_code=201,
            content={"message": "Password deleted"}
        )
    else:
        return JSONResponse(
            status_code=503,
            content={"message": "Something went wrong"}
        )


@app.get("/get_passwords")
def get_passwords(api_key: str = "", user: str = ""):
    if user == "" or api_key == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    return DbHandler.get_Passwords(user)


@app.get("/update_password")
def update_password(api_key: str = "", id: int = -1, user: str = "", name: str = "", starred: bool = False, password: str = "", folder: str = "", note: str = "", username: str = ""):
    if api_key == "" or id == -1 or user == "" or name == "" or folder == "" or username == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    if DbHandler.update_Password(id, name, starred, password, folder, note, user, username):
        return JSONResponse(
            status_code=202,
            content={"message": "Password updated"}
        )
    else:
        return JSONResponse(
            status_code=503,
            content={"message": "Something went wrong"}
        )




# FOLDER ######################################################################
@app.get("/add_folder")
def add_folder(api_key: str = "", folder: str = "", starred: bool = False, user: str = "", color: str = ""):
    if folder == "" or user == "" or color == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    if DbHandler.add_folder(folder, starred, user, color):
        return JSONResponse(
            status_code=202,
            content={"message": "folder added"}
        )
    else:
        return JSONResponse(
            status_code=503,
            content={"message": "Something went wrong"}
        )



@app.get("/del_folder")
def del_folder(api_key: str = "", user: str = "", id: int = -1,):
    if api_key == "" or user == "" or id == -1:
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    if DbHandler.del_Folder(user, id):
        return JSONResponse(
            status_code=201,
            content={"message": "folder deleted"}
        )
    else:
        return JSONResponse(
            status_code=503,
            content={"message": "Internal API Error"}
        )


@app.get("/update_folder")
def update_folder(api_key: str = "", user: str = "", id: int = -1, folder: str = "", starred: bool = False, color: str = ""):
    if api_key == "" or user == "" or id == -1 or folder == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    if DbHandler.update_Folder(id, folder, starred, user, color):
        return JSONResponse(
            status_code=202,
            content={"message": "folder updated"}
        )
    else:
        return JSONResponse(
            status_code=503,
            content={"message": "Something went wrong"}
        )


@app.get("/get_folders")
def get_folders(api_key: str = "", user: str = ""):
    if user == "" or api_key == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    return DbHandler.get_Folders(user)


@app.get("/get_folders_passwords")
def get_folders_passwords(api_key: str = "", user: str = "", folder: str = ""):
    if user == "" or api_key == "" or folder == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    return DbHandler.get_FoldersPasswords(user, folder)




# 2 FA ########################################################################
@app.get("/add_2fa")
def add_2fa(api_key: str = "", user: str = "", name: str = "", secret: str = ""):
    if user == "" or api_key == "" or name == "" or secret == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    return DbHandler.add_twoFa(user, secret, name)


@app.get("/del_2fa")
def del_2fa(api_key: str = "", user: str = "", id: int = -1):
    if user == "" or api_key == "" or id == -1:
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    return DbHandler.del_twoFa(id, user)



@app.get("/get_2fa")
def get_2fa(api_key: str = "", user: str = ""):
    if user == "" or api_key == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    return DbHandler.get_twoFas(user)



@app.get("/update_2fa")
def update_2fa(api_key: str = "", id: int = -1, user: str = "", name: str = "", secret: str = ""):
    if user == "" or api_key == "" or name == "" or secret == "" or id == -1:
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    return DbHandler.update_twoFa(user, id, name, secret)


@app.get("/get_otp")
def get_otp(api_key: str = "", user: str = "", id: int = -1):
    if api_key == "" or user == "" or id == -1:
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )

    secret = decrypt(DbHandler.getTwoFaSecret(user, id))

    if not secret:
        return JSONResponse(
            status_code=417,
            content={"message": "secret not present"}
        )

    try:
        algorithm = DbHandler.getTwoFaAlgorithm(user, id)
        otp_code = "error"
        if algorithm == "SHA256":
            otp_code = subprocess.check_output(f'oathtool -b --totp=sha256 "{secret}" -s 60', shell=True).decode('utf-8').replace('\n', '')
        else:
            otp_code = subprocess.check_output(f'oathtool -b --totp "{secret}"', shell=True).decode('utf-8').replace('\n', '')

        return JSONResponse(
            status_code=200,
            content={"data": otp_code}
        )
    except:
        return JSONResponse(
            status_code=200,
            content={"data": otp_code}
        )


@app.get("/get_api_keys")
def get_api_keys(api_key: str = "", user: str = ""):
    if api_key == "" or user == "":
        return JSONResponse(
            status_code=400,
            content={"message": "Atleast one Parameter is empty"}
        )

    if not DbHandler.checkApiKey(api_key, user):
        return JSONResponse(
            status_code=401,
            content={"message": "Not authorized, invalid API key"}
        )


    return DbHandler.getApiKeys(user)


# GLOBAL ######################################################################
@app.get("/get_app_version")
def get_app_version():
    return DbHandler.getAppVersion()



def main():
    print("[INFO] Starting Main Script")

if __name__ == "__main__":
    main()