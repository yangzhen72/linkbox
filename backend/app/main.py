from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .database import get_db, engine, Base
from .models import User, Category, Link
from .schemas import UserCreate, UserResponse, Token, CategoryCreate, CategoryResponse, LinkCreate, LinkResponse
from .auth import verify_password, get_password_hash, create_access_token, get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI(title="LinkBox API")

@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_pw = get_password_hash(user.password)
    db_user = User(username=user.username, password=hashed_pw)
    db.add(db_user)
    db.commit()
    return db_user

@app.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/categories", response_model=list[CategoryResponse])
def get_categories(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.user_id == current_user.id).all()

@app.post("/categories", response_model=CategoryResponse)
def create_category(category: CategoryCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_category = Category(user_id=current_user.id, name=category.name, icon=category.icon)
    db.add(db_category)
    db.commit()
    return db_category

@app.get("/links", response_model=list[LinkResponse])
def get_links(category_id: str = None, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Link).filter(Link.user_id == current_user.id)
    if category_id:
        query = query.filter(Link.category_id == category_id)
    return query.all()

@app.post("/links", response_model=LinkResponse)
def create_link(link: LinkCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_link = Link(user_id=current_user.id, **link.model_dump())
    db.add(db_link)
    db.commit()
    return db_link