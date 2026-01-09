package com.example.expense.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.expense.dto.*;
import com.example.expense.entity.Expense;
import com.example.expense.repository.ExpenseRepository;
import com.example.expense.service.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    @Override
    public ExpenseDTO createExpense(ExpenseDTO dto) {
        // Map DTO to Entity
        Expense entity = new Expense();
        entity.setDescription(dto.getDescription());
        entity.setAmount(dto.getAmount());
        entity.setCategory(dto.getCategory());
        entity.setExpenseDate(dto.getExpenseDate());

        Expense saved = repository.save(entity);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<ExpenseDTO> getAllExpenses() {
        return repository.findAll().stream().map(expense -> {
            ExpenseDTO dto = new ExpenseDTO();
            dto.setId(expense.getId());
            dto.setDescription(expense.getDescription());
            dto.setAmount(expense.getAmount());
            dto.setCategory(expense.getCategory());
            dto.setExpenseDate(expense.getExpenseDate());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Double getMonthlyTotal(int month, int year) {
        Double total = repository.sumByMonthAndYear(month, year);
        return (total != null) ? total : 0.0;
    }
    
    @Override
    public void deleteExpense(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Expense not found with id: " + id);
        }
    }
    
    public Double getDailyTotal() {
        Double total = repository.sumDailyExpenses();
        return (total != null) ? total : 0.0;
    }
    
    @Override
    public Double getWeeklyTotal() {
        Double total = repository.sumWeeklyExpenses();
        return (total != null) ? total : 0.0;
    }
}
