package com.example.expense.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ExpenseDTO {
    private Long id;
    private String description;
    private Double amount;
    private String category;
    private LocalDate expenseDate;
}