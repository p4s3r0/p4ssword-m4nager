from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy import select
import uuid
from fastapi.responses import JSONResponse

# load environment variables
load_dotenv()
SQL_DATABASE_CLIENT = os.getenv("SQL_DATABASE_CLIENT")
SQL_USER = os.getenv("SQL_USER")
SQL_PASSWORD = os.getenv("SQL_PASSWORD")
SQL_URL = os.getenv("SQL_URL")
SQL_PORT = os.getenv("SQL_PORT")
SQL_DB_NAME = os.getenv("SQL_DB_NAME")
# connect to database

engine = create_engine(f"{SQL_DATABASE_CLIENT}://{SQL_USER}:{SQL_PASSWORD}@{SQL_URL}:{SQL_PORT}/{SQL_DB_NAME}", echo=True)


class Base(DeclarativeBase):
    pass

# users
class User(Base):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String(255), primary_key=True)
    email: Mapped[str] = mapped_column(String(255))
    password: Mapped[str] = mapped_column(String(255))

    def __repr__(self) -> str:
        return f"Users[{self.username!r}] = {{ username={self.username}, email={self.email}, password={self.password} }}"


# two_fa
class TwoFa(Base):
    __tablename__ = "two_fa"

    id: Mapped[int] = mapped_column(primary_key=True)
    user: Mapped[str] = mapped_column(String(255), nullable=False)
    secret: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    algo: Mapped[str] = mapped_column(String(6), nullable=True)

    def __repr__(self) -> str:
        return f"2fa[{self.id}] = {{ id={self.id}, user={self.user}, secret={self.secret}, name={self.name} }}"


# passwords
class Password(Base):
    __tablename__ = "passwords"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    starred: Mapped[bool] = mapped_column(Boolean, nullable=True)
    password: Mapped[str] = mapped_column(String(1025), nullable=True)
    folder: Mapped[str] = mapped_column(String(255), nullable=True)
    note: Mapped[str] = mapped_column(String(1024), nullable=True)
    user: Mapped[str] = mapped_column(String(255), nullable=False)
    username: Mapped[str] = mapped_column(String(255), nullable=False)

    def __repr__(self) -> str:
        return f"""password[{self.id}] = {{ 
                                id={self.id}, 
                                name={self.name}, 
                                starred={self.starred}, 
                                folder={self.folder}, 
                                note={self.note},
                                user={self.user},
                                username={self.username} }}"""
    

# folders
class Folder(Base):
    __tablename__ = "folders"

    id: Mapped[int] = mapped_column(primary_key=True)
    folder: Mapped[str] = mapped_column(String(255), nullable=False)
    starred: Mapped[bool] = mapped_column(Boolean, nullable=True)
    user: Mapped[str] = mapped_column(String(255), nullable=False)
    color: Mapped[str] = mapped_column(String(255), nullable=False)

    def __repr__(self) -> str:
        return f"""folder[{self.id}] = {{ 
                                id={self.id}, 
                                folder={self.folder}, 
                                starred={self.starred}, 
                                user={self.user}, 
                                color={self.color} }}"""
    
# Global
class Global(Base):
    __tablename__ = "global"

    version: Mapped[str] = mapped_column(String(255), primary_key=True)


# api_keys
class ApiKey(Base):
    __tablename__ = "api_keys"

    api_key: Mapped[str] = mapped_column(String(255), primary_key=True)
    user: Mapped[str] = mapped_column(String(255))


Base.metadata.create_all(bind=engine)

###############################################################################
# MUTATIONS
###############################################################################
def checkApiKey(key, user):
    with engine.connect() as conn:
        query = select(ApiKey).where(ApiKey.api_key == key, ApiKey.user == user)
        for _ in conn.execute(query):
            return True
        return False



# USERS -----------------------------------------------------------------------
def add_User(username: str, email: str, password: str):
    with engine.connect() as conn:
        query = select(User).where(User.username == username)
        for _ in conn.execute(query):
            return JSONResponse(
                status_code=401,
                content={"message": "Username already taken"}
            )

    with Session(engine) as session:
        user = User(
            username=username,
            email=email,
            password=password,
        )
        session.add(user)
        session.commit()
    return JSONResponse(
        status_code=201,
        content={"message": "User added to Database"}
    )


def del_User(username: str):
    with Session(engine) as session:
        session.delete(session.get(User, username))
        session.commit()
    return True


def login_User(username: str, password: str):
    with engine.connect() as conn:
        query = select(User).where(User.username == username, User.password == password)
        for row in conn.execute(query):
            uuid_key = addApiKey(username)
            ret = {
                "email": row.email,
                "api_key": uuid_key
            }
            return JSONResponse(
                status_code=202,
                content={"data": ret}
            )
        return JSONResponse(
            status_code=401,
            content={"message": "Invalid Credentials"}
        )


def logout_User(api_key: str):
    with Session(engine) as session:
        session.delete(session.get(ApiKey, api_key))
        session.commit()
    return JSONResponse(
        status_code=200,
        content={"message": "Correctly logged out user"}
    )


# TWO_FA -------------------------------------------------------------------------
def get_ObjectTwoFa(user: str, name: str):
    stmt = select(TwoFa).where(TwoFa.name == name, TwoFa.user == user)
    two_fa = None
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            two_fa = row
    return two_fa



def add_twoFa(user: str, secret: str, name:str):
    with Session(engine) as session:
        twoFa = TwoFa(
            user=user,
            secret=secret,
            name=name
        )
        session.add(twoFa)
        session.commit()
    return JSONResponse(
            status_code=202,
            content={"message": "Two FA added"}
        )



def del_twoFa(id: int, user: str):
    stmt = select(TwoFa).where(TwoFa.user == user, TwoFa.id == id)
    two_fa = None
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            two_fa = row

    if two_fa == None:
        return JSONResponse(
            status_code=400,
            content={"message": "Cant delete 2FA"}
        )

    with Session(engine) as session:
        session.delete(session.get(TwoFa, two_fa.id))
        session.commit()
    return JSONResponse(
        status_code=201,
        content={"message": "2FA deleted"}
    )



def get_twoFas(user: str):
    stmt = select(TwoFa).where(TwoFa.user == user)
    two_fas = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            two_fas.append({
                "id": row.id,
                "user": row.user,
                "secret": row.secret,
                "name": row.name,
                "algo": row.algo
            })
    return JSONResponse(
        status_code=202,
        content={"data": two_fas}
    )



def update_twoFa(user: str, id: str, name: str, secret: str):
    with Session(engine) as session:
        session.query(TwoFa).filter(TwoFa.id == id, TwoFa.user == user).update({  
                                                                            'name': name, 
                                                                            'secret': secret})
        session.commit()
    return JSONResponse(
            status_code=202,
            content={"message": "2FA edited"}
        )



def getTwoFaSecret(user: str, id: int):
    stmt = select(TwoFa).where(TwoFa.user == user, TwoFa.id == id)
    two_fa_secret = ""
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            two_fa_secret = row.secret 
    return two_fa_secret

def getTwoFaAlgorithm(user: str, id: int):
    stmt = select(TwoFa).where(TwoFa.user == user, TwoFa.id == id)
    two_fa_algo = ""
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            two_fa_algo = row.algo 
    return two_fa_algo


# PASSWORDS -------------------------------------------------------------------
def get_ObjectPassword(user: str, name: str):
    stmt = select(Password).where(Password.name == name, Password.user == user)
    password = None
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            password = row
    return password


def add_password(name: str, starred: bool, password: str, folder: str, note: str, user: str, username: str):
    with Session(engine) as session:
            password = Password(
                name=name,
                starred=starred,
                password=password,
                folder=folder,
                note=note,
                user=user,
                username=username
            )

            session.add(password)
            session.commit()
    return True



def del_password(user: str, id: int):
    stmt = select(Password).where(Password.user == user, Password.id == id)
    password = None
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            password = row

    if password == None:
        return False

    with Session(engine) as session:
        session.delete(session.get(Password, password.id))
        session.commit()
    return True



def get_Passwords(user: str):
    stmt = select(Password).where(Password.user == user)
    passwords = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            passwords.append({
                "id": row.id,
                "name": row.name,
                "starred": row.starred,
                "password": row.password,
                "folder": row.folder,
                "note": row.note,
                "user": row.user,
                "username": row.username
            })
    return JSONResponse(
        status_code=200,
        content={"data": passwords}
    )



def update_Password(id: int, name: str, starred: str, password: str, folder: str, note: str, user: str, username: str):
    with Session(engine) as session:
        session.query(Password).filter(Password.id == id, Password.user == user).update({  
                                                                            'name': name, 
                                                                            'starred': starred,
                                                                            'password': password,
                                                                            'folder': folder,
                                                                            'note': note,
                                                                            'user': user,
                                                                            'username': username})
        session.commit()
    return True



# Folders -------------------------------------------------------------------
def get_ObjectFolder(user: str, name: str):
    stmt = select(Folder).where(Folder.folder == name, Folder.user == user)
    folder = None
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            folder = row
    return folder


def add_folder(folder: str, starred: bool, user: str, color: str):
    with Session(engine) as session:
        folder = Folder(
            folder=folder,
            starred=starred,
            user=user,
            color=color,
        )
        session.add(folder)
        session.commit()
    return True


def del_Folder(user: str, id: int):
    stmt = select(Folder).where(Folder.user == user, Folder.id == id)
    folder = None
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            folder = row

    if folder == None:
        return False

    stmt = select(Password).where(Password.user == user, Password.folder == folder.folder)
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            update_Password(row.id, row.name, row.starred, row.password, "NO FOLDER", row.note, row.user, row.username)

    with Session(engine) as session:
        session.delete(session.get(Folder, folder.id))
        session.commit()
    return True



def update_Folder(id: int, folder: str, starred: str, user: str, color: str):
    old_folder_name = ""
    stmt = select(Folder).where(Folder.user == user, Folder.id == id)
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            old_folder_name = row.folder


    with Session(engine) as session:
        session.query(Folder).filter(Folder.id == id, Folder.user == user).update({  
                                                                            'folder': folder, 
                                                                            'starred': starred,
                                                                            'color': color,
                                                                            'user': user })
        session.commit()


    stmt = select(Password).where(Password.user == user, Password.folder == old_folder_name)
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            update_Password(row.id, row.name, row.starred, row.password, folder, row.note, row.user, row.username)
    return True



def get_Folders(user: str):
    stmt = select(Folder).where(Folder.user == user)
    folders = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            folders.append({
                "id": row.id,
                "folder": row.folder,
                "user": row.user,
                "starred": row.starred,
                "color": row.color
            })
    return folders



def get_FoldersPasswords(user: str, folder: str):
    with Session(engine) as session:
        rows = session.query(Password).filter(Password.user == user, Password.folder == folder)

        passwords = []
        for row in rows:
            passwords.append({
                "id": row.id,
                "name": row.name,
                "starred": row.starred,
                "password": row.password,
                "folder": row.folder,
                "note": row.note,
                "user": row.user,
                "username": row.username
            })
        return JSONResponse(
            status_code=200,
            content={"data": passwords}
        )



# api_keys
def addApiKey(user):
    uuid_value = str(uuid.uuid4())
    with Session(engine) as session:
        api_key = ApiKey(
            user=user,
            api_key=uuid_value
        )
        session.add(api_key)
        session.commit()
    return uuid_value



def getAppVersion():
    stmt = select(Global)
    version = None
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            version = row.version
    return version


def getApiKeys(user):
    with Session(engine) as session:
        rows = session.query(ApiKey).filter(ApiKey.user == user)

        api_keys = []
        for row in rows:
            api_keys.append({
                "user": row.user,
                "key": row.api_key
            })
        return JSONResponse(
            status_code=200,
            content={"data": api_keys}
        )



if __name__ == "__main__":
    print("[ERROR] Running Library as main")
    exit()