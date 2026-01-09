package com.example.expense.service;

import com.example.expense.dto.*;
import java.util.*;

public interface ExpenseService {
    ExpenseDTO createExpense(ExpenseDTO expenseDTO);
    List<ExpenseDTO> getAllExpenses();
    Double getMonthlyTotal(int month, int year);
    Double getDailyTotal();
    void deleteExpense(Long id);
	Double getWeeklyTotal();
}
