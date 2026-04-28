from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from .database import Base
import uuid
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True)
    password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    name = Column(String)
    icon = Column(String, default="📁")
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Link(Base):
    __tablename__ = "links"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    category_id = Column(String, ForeignKey("categories.id"))
    title = Column(String)
    url = Column(String)
    description = Column(String, default="")
    favicon = Column(String, default="")
    is_valid = Column(Boolean, default=True)
    click_count = Column(Integer, default=0)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)