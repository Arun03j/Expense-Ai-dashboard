from pydantic import BaseModel

class ExpenseBase(BaseModel):

    amount: float

    category: str

    purpose: str

    date: str


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseResponse(ExpenseBase):

    id: int

    class Config:
        from_attributes = True