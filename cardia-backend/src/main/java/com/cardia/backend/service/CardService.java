package com.cardia.backend.service;

import com.cardia.backend.model.Card;
import com.cardia.backend.repository.CardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository ;

    public CardService(CardRepository cardRepository)
    {
        this.cardRepository = cardRepository;
    }
    public List <Card> getAllCard(){
        return cardRepository.findall();
    }
}
