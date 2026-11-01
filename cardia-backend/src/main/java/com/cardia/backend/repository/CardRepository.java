package com.cardia.backend.repository;


import com.cardia.backend.model.Card;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CardRepository {
    public List <Card> findall(){
        return List.of(
                new Card(1L , "Visa", "BANCAIRE"),
                new Card(2L, "carte d'indentite ", "IDENTITE"),
                new Card(3L , "Carte d'etudiant", "ETUDIANT CARTE")
        );

    };
}

