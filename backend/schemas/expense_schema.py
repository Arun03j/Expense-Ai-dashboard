from pydantic import BaseModel


class ExpenseCreate(BaseModel):

    amount: float

    category: str

    purpose: str

    date: str


class ExpenseResponse(ExpenseCreate):

    id: int

    class Config:
        from_attributes = True