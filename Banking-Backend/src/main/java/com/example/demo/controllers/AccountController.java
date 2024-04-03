package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Account;
import com.example.demo.repositories.AccountRepository;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin("http://localhost:3000")
public class AccountController {
	@Autowired
    private AccountRepository accountRepository;

    @PostMapping("/register")
    public Account registerAccount(@RequestBody Account account) {
        if (String.valueOf(account.getAccountNo()).length() < 6) {
            throw new IllegalArgumentException("Account number must be at least 6 digits long.");
        }
        
        return accountRepository.save(account);
    }

    @PostMapping("/deposit")
    public Account deposit(@RequestParam int accountNo, @RequestParam String IFSC, @RequestParam double amount) {
        Account account = accountRepository.findById(accountNo)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));

        if (!account.getIFSC().equals(IFSC)) {
            throw new IllegalArgumentException("Invalid IFSC code.");
        }

        account.setBalance(account.getBalance() + amount);
        return accountRepository.save(account);
    }

    @PostMapping("/withdraw")
    public Account withdraw(@RequestParam int accountNo, @RequestParam String IFSC, @RequestParam double amount) {
        Account account = accountRepository.findById(accountNo)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));

        if (!account.getIFSC().equals(IFSC) || account.getBalance() < amount) {
            throw new IllegalArgumentException("Invalid transaction.");
        }

        account.setBalance(account.getBalance() - amount);
        return accountRepository.save(account);
    }

    @PostMapping("/chequeDeposit")
    public void chequeDeposit(@RequestParam int fromAccountNo, @RequestParam String fromIFSC, @RequestParam int toAccountNo, @RequestParam String toIFSC, @RequestParam double amount) {
        Account fromAccount = accountRepository.findById(fromAccountNo)
                .orElseThrow(() -> new EntityNotFoundException("From Account not found"));
        Account toAccount = accountRepository.findById(toAccountNo)
                .orElseThrow(() -> new EntityNotFoundException("To Account not found"));

        if (!fromAccount.getIFSC().equals(fromIFSC) || !toAccount.getIFSC().equals(toIFSC) || fromAccount.getBalance() < amount) {
            throw new IllegalArgumentException("Invalid cheque deposit.");
        }

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
    }

    @GetMapping("/balance/{accountNo}")
    public double getBalance(@PathVariable int accountNo) {
        Account account = accountRepository.findById(accountNo)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));
        return account.getBalance();
    }
	

}
