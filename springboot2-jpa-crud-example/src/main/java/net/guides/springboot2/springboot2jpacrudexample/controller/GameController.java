package net.guides.springboot2.springboot2jpacrudexample.controller;

import net.guides.springboot2.springboot2jpacrudexample.exception.ResourceNotFoundException;
import net.guides.springboot2.springboot2jpacrudexample.model.Game;
import net.guides.springboot2.springboot2jpacrudexample.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    private GameRepository gameRepository;

    @GetMapping("")
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable(value = "id") Integer id)
            throws ResourceNotFoundException {

        Game game = gameRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found for this id :: " + id));

        return ResponseEntity.ok().body(game);
    }

    @PostMapping("")
    public Game createGame(@Valid @RequestBody Game game) {
        return gameRepository.save(game);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable(value = "id") Integer id,
                                           @Valid @RequestBody Game gameDetails)
            throws ResourceNotFoundException {

        Game game = gameRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found for this id: " + id));

        game.setTitle(gameDetails.getTitle());
        game.setMetascore(gameDetails.getMetascore());
        game.setUser_score(gameDetails.getUser_score());
        game.setRelease_date(gameDetails.getRelease_date());
        game.setLink(gameDetails.getLink());

        final Game updatedGame = gameRepository.save(game);
        return ResponseEntity.ok(updatedGame);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteGame(@PathVariable(value = "id") Integer id)
            throws ResourceNotFoundException {

        Game game = gameRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found for this id: " + id));

        gameRepository.delete(game);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}