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



@app.get("/add_user")
def add_user(nonce: str = "", digest: str = "", username: str = "", email: str = "", password: str = ""):
    if username == "" or email == "" or password == "" or nonce == "" or digest == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.add_User(username, email, password):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/del_user")
def del_user(nonce: str = "", digest: str = "", username: str = ""):
    if username == "" or  nonce == "" or digest == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.del_User(username):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/add_twoFa")
def add_twoFa(nonce: str = "", digest: str = "", user: str = "", secret: str = "", name: str = ""):
    if nonce == "" or digest == "" or user == "" or secret == "" or name == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.add_twoFa(user, secret, name):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"



@app.get("/del_twoFa")
def del_twoFa(nonce: str = "", digest: str = "", user: str = "", name: str = ""):
    if nonce == "" or digest == "" or user == "" or name == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.del_twoFa(user, name):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/update_twoFa")
def update_twoFa(nonce: str = "", digest: str = "", user: str = "", old_name: str = "", new_name: str = "", secret: str = ""):
    if nonce == "" or digest == "" or user == "" or old_name == "" or new_name == "" or secret == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.update_twoFa(user, old_name, new_name, secret):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/update_twoFa_authorization")
def update_twoFa_authorization(nonce: str = "", digest: str = "", user: str = "", name: str = "", to: bool = False):
    if nonce == "" or digest == "" or user == "" or name == "" or to == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.update_set_authorization(user, name, to):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"



@app.get("/add_password")
def add_password(nonce: str = "", digest: str = "", name: str = "", starred: bool = False, password: str = "", folder: str = "", note: str = "", user: str = "", username: str = ""):
    if nonce == "" or digest == "" or name == "" or starred == "" or password == "" or folder == "" or note == "" or username == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.add_password(name, starred, password, folder, note, user, username):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/del_password")
def del_password(nonce: str = "", digest: str = "", user: str = "", name: str = ""):
    if nonce == "" or digest == "" or user == "" or name == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.del_password(user, name):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/update_password")
def update_password(nonce: str = "", digest: str = "", user: str = "", old_name: str = "", new_name: str = "", starred: str = "", password: str = "", folder: str = "", note: str = "", username: str = ""):
    if nonce == "" or digest == "" or user == "" or old_name == "" or new_name == "" or starred == "" or password == "" or folder == "" or note == "" or user == "" or username == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.update_Password(old_name, new_name, starred, password, folder, note, user, username):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/add_folder")
def add_folder(nonce: str = "", digest: str = "", folder: str = "", starred: bool = False, user: str = "", pass_amount: int = 0, color: str = ""):
    if nonce == "" or digest == "" or folder == "" or user == "" or color == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.add_folder(folder, starred, user, pass_amount, color):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"



@app.get("/del_folder")
def del_folder(nonce: str = "", digest: str = "", name: str = "", user: str = ""):
    if nonce == "" or digest == "" or name == "" or user == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.del_folder(name, user):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"
    


@app.get("/update_folder")
def update_folder(nonce: str = "", digest: str = "",old_folder: str = "", folder: str = "", starred: bool = False, user: str = "", pass_amount: int = 0, color: str = ""):
    if nonce == "" or digest == "" or old_folder == "" or folder == "" or user == "" or color == "":
        return f"[ERROR] Invalid Params"
    
    if HASH(f"{nonce}{SECRET_PASSWORD}") != digest:
        return f"[ERROR] Invalid Authorization Digest"

    if DbHandler.update_folder(old_folder, folder, starred, user, pass_amount, color):
        return f"OK"
    else: 
        return f"[ERROR] Something went wrong"




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