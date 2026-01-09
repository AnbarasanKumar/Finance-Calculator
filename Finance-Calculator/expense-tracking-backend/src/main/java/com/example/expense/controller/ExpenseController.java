package com.example.expense.controller;

import com.example.expense.dto.*;
import com.example.expense.service.ExpenseService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    @PostMapping
    public ResponseEntity<ExpenseDTO> save(@RequestBody ExpenseDTO dto) {
        return ResponseEntity.ok(service.createExpense(dto));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> fetchAll() {
        return ResponseEntity.ok(service.getAllExpenses());
    }

    @GetMapping("/total")
    public ResponseEntity<Double> fetchTotal(@RequestParam int month, @RequestParam int year) {
        return ResponseEntity.ok(service.getMonthlyTotal(month, year));
    }
    
    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        service.deleteExpense(id);
        return ResponseEntity.noContent().build(); 
    }
    @GetMapping("/daily-total")
    public ResponseEntity<Double> getDailyTotal() {
        return ResponseEntity.ok(service.getDailyTotal());
    }
    
    @GetMapping("/weekly-total")
    public ResponseEntity<Double> getWeeklyTotal() {
        return ResponseEntity.ok(service.getWeeklyTotal());
    }
}
