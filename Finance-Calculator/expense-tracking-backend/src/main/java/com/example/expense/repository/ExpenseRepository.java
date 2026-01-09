package com.example.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.expense.entity.*;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE MONTH(e.expenseDate) = :month AND YEAR(e.expenseDate) = :year")
    Double sumByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.expenseDate = CURRENT_DATE")
    Double sumDailyExpenses();
    
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE YEARWEEK(e.expenseDate, 0) = YEARWEEK(CURDATE(), 0)")
    Double sumWeeklyExpenses();
}
