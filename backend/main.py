from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import (
    engine,
    get_db,
    Base
)

from models.expense_model import Expense

from schemas.expense_schema import (
    ExpenseCreate,
    ExpenseResponse
)

# Create Database Tables
Base.metadata.create_all(
    bind=engine
)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():

    return {
        "message":
        "Expense AI Backend Running"
    }

# GET Expenses
@app.get(
    "/expenses",
    response_model=list[ExpenseResponse]
)
def get_expenses(
    db: Session = Depends(get_db)
):

    expenses = db.query(
        Expense
    ).all()

    return expenses

# POST Expense
@app.post(
    "/expenses",
    response_model=ExpenseResponse
)
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):

    new_expense = Expense(

        amount=expense.amount,

        category=expense.category,

        purpose=expense.purpose,

        date=expense.date
    )

    db.add(new_expense)

    db.commit()

    db.refresh(new_expense)

    return new_expense

# DELETE Expense
@app.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):

    expense = db.query(
        Expense
    ).filter(
        Expense.id == expense_id
    ).first()

    if not expense:

        return {
            "message":
            "Expense not found"
        }

    db.delete(expense)

    db.commit()

    return {
        "message":
        "Expense deleted successfully"
    }