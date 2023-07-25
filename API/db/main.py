import DbHandler
from dotenv import load_dotenv
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

SECRET_PASSWORD = os.getenv("SECRET_PASSWORD")

def HASH(val):
    keccak_hash = keccak.new(digest_bits=512)
    keccak_hash.update(bytes(val, 'utf-8'))
    return keccak_hash.hexdigest()





# /add_user?username=a&email=b&password=c
@app.get("/add_user")
def add_user(username: str = "", email: str = "", password: str = ""):
    if username == "" or email == "" or password == "":
        return f"[ERROR] Invalid Params"

    ret = DbHandler.add_User(username, email, password)

    if ret == True:
        return f"OK"
    elif ret == "[ERROR]-UsernameTaken":
        return ret
    else: 
        return f"[ERROR] Something went wrong"
    

@app.get("/login_user")
def login_user(username: str = "", password: str = ""):
    if username == "" or password == "":
        return f"[ERROR] Invalid Params"
    return DbHandler.login_User(username, password)




@app.get("/add_twoFa")
def add_twoFa(user: str = "", secret: str = "", name: str = ""):
    if user == "" or secret == "" or name == "":
        return f"[ERROR] Invalid Params"

    if DbHandler.add_twoFa(user, secret, name):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"



@app.get("/del_twoFa")
def del_twoFa(user: str = "", name: str = ""):
    if user == "" or name == "":
        return f"[ERROR] Invalid Params"

    if DbHandler.del_twoFa(user, name):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/update_twoFa")
def update_twoFa(user: str = "", old_name: str = "", new_name: str = "", secret: str = ""):
    if user == "" or old_name == "" or new_name == "" or secret == "":
        return f"[ERROR] Invalid Params"
    
    if DbHandler.update_twoFa(user, old_name, new_name, secret):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/update_twoFa_authorization")
def update_twoFa_authorization(user: str = "", name: str = "", to: bool = False):
    if user == "" or name == "" or to == "":
        return f"[ERROR] Invalid Params"
    
    if DbHandler.update_set_authorization(user, name, to):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"



@app.get("/add_password")
def add_password(api_key: str = "", name: str = "", starred: bool = False, password: str = "", folder: str = "", note: str = "", user: str = "", username: str = ""):
    if api_key == "" or name == "" or folder == "" or username == "":
        return f"[ERROR] Invalid Params"

    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    if DbHandler.add_password(name, starred, password, folder, note, user, username):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/del_password")
def del_password(api_key: str = "", user: str = "", id: int = -1):
    if user == "" or id == -1 or api_key == "":
        return f"[ERROR] Invalid Params"
    
    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    if DbHandler.del_password(user, id):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"



@app.get("/get_passwords")
def get_passwords(api_key: str = "", user: str = ""):
    if user == "" or api_key == "":
        return f"[ERROR] Invalid Params"
    
    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    return DbHandler.get_Passwords(user)

    


@app.get("/update_password")
def update_password(api_key: str = "", id: int = -1, user: str = "", name: str = "", starred: bool = False, password: str = "", folder: str = "", note: str = "", username: str = ""):
    if api_key == "" or id == -1 or user == "" or name == "" or folder == "" or username == "":
        return f"[ERROR] Invalid Params"

    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    if DbHandler.update_Password(id, name, starred, password, folder, note, user, username):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/add_folder")
def add_folder(api_key: str = "", folder: str = "", starred: bool = False, user: str = "", pass_amount: int = 0, color: str = ""):
    if folder == "" or user == "" or color == "":
        return f"[ERROR] Invalid Params"

    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    if DbHandler.add_folder(folder, starred, user, pass_amount, color):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"



@app.get("/del_folder")
def del_folder(api_key: str = "", user: str = "", id: int = -1,):
    if api_key == "" or user == "" or id == -1:
        return f"[ERROR] Invalid Params"

    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    if DbHandler.del_Folder(user, id):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/update_folder")
def update_folder(api_key: str = "", user: str = "", id: int = -1, folder: str = "", starred: bool = False, color: str = ""):
    if api_key == "" or user == "" or id == -1 or folder == "":
        return f"[ERROR] Invalid Params"

    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user
    
    if DbHandler.update_Folder(id, folder, starred, user, color):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"




@app.get("/get_folders")
def get_folders(api_key: str = "", user: str = ""):
    if user == "" or api_key == "":
        return f"[ERROR] Invalid Params"
    
    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    return DbHandler.get_Folders(user)



@app.get("/get_folders_passwords")
def get_folders_passwords(api_key: str = "", user: str = "", folder: str = ""):
    if user == "" or api_key == "" or folder == "":
        return f"[ERROR] Invalid Params"
    
    if not DbHandler.checkApiKey(api_key, user):
        return f"Not authorized with this API key", api_key, user

    return DbHandler.get_FoldersPasswords(user, folder)

def main():
    print("[INFO] Starting Main Script")
    # DbHandler.add_User("hey2", "email2", "pssw2")
    # DbHandler.del_User("hey2")
    # DbHandler.add_twoFa("test_user", "secret2", False, "name2")
    # DbHandler.del_twoFa("test_user2", "name2")
    # DbHandler.update_twoFa("test_user", "name2", "name_ok", "secret_ok")
    # DbHandler.update_set_authorization("test_user", "name_ok", True)
    # DbHandler.update_set_authorization("test_user", "name_ok", False)
    # DbHandler.add_password("test_name", False, "pssw", "folder", "note", "p4s3r0", "username")
    # DbHandler.del_password("p4s3r0", "test_name")
    # DbHandler.update_Password("test_name", "updated_name", True, "updated_pssw", "updated_fodler", "updated_note", "p4s3r0", "updated_username")
    # DbHandler.add_folder("folder_name", False, "root", 0, "black")
    # DbHandler.del_folder("updated_name", "root")
    # DbHandler.update_folder("folder_name", "updated_name", True, "upd_user", 2, "white")
    print("[INFO] Ending Main Script")

if __name__ == "__main__":
    main()