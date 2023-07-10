from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from typing import Optional
from supabase import create_client, Client
import subprocess
import json
import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

from dotenv import load_dotenv

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)


def decrypt(enc):
    key = os.getenv("P4SSWORD_M4NAGER_KEY")
    iv =  os.getenv("P4SSWORD_M4NAGER_IV").encode('utf-8')
    enc = base64.b64decode(enc)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(enc),16).decode()


app = FastAPI()

origins = ["*"]
app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)



def getSecret(user, name):
    for _ in range(5):
        response = supabase.table('2fa').select("secret", "authorized").eq("user", user).eq("name", name).execute()
        if len(response.data) == 0:
            continue
        
        if response.data[0]["authorized"] == True:
            break

    if response.data[0]["authorized"] == False:
        return False
    
    return decrypt(response.data[0]["secret"])



@app.get("/getotp")
def get_gimme(user: str = "", name: str = ""):
    if user == "" or name == "":
        return f"INVALID PARAMS user:{user}, name:{name}"
    
    secret = getSecret(user, name)
    if not secret:
        return f"[ERROR] OTP token not there for user:{user}, name:{name} or not authorized"
    
    otp_code = subprocess.check_output(f'oathtool -b --totp=sha256 "{secret}" -s 60', shell=True).decode('utf-8').replace('\n', '')

    return otp_code



