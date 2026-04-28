from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str

class Token(BaseModel):
    access_token: str
    token_type: str

class CategoryCreate(BaseModel):
    name: str
    icon: Optional[str] = "📁"

class CategoryResponse(BaseModel):
    id: str
    user_id: str
    name: str
    icon: str
    order: int

class LinkCreate(BaseModel):
    title: str
    url: str
    category_id: str
    description: Optional[str] = ""

class LinkResponse(BaseModel):
    id: str
    user_id: str
    category_id: str
    title: str
    url: str
    description: str
    favicon: str
    is_valid: bool
    click_count: int