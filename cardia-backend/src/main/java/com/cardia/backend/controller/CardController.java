package com.cardia.backend.controller;


import com.cardia.backend.model.Card;
import com.cardia.backend.service.CardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService ;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }


    @GetMapping
    public List <Card> getAllCard(){
        return cardService.getAllCard();
    }
}
