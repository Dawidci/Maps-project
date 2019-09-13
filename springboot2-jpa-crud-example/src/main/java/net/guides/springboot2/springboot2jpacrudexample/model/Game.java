package net.guides.springboot2.springboot2jpacrudexample.model;

import javax.persistence.*;

@Entity
@Table(name = "games")
public class Game {

    private static int no_games = 0;

    @Id
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "metascore", nullable = false)
    private int metascore;

    @Column(name = "user_score", nullable = false)
    private int user_score;

    @Column(name = "release_date", nullable = false)
    private String release_date;

    @Column(name = "link", nullable = false)
    private String link;

    public Game(String title, int metascore, int user_score, String release_date, String link) {
        this.id = ++no_games;
        this.title = title;
        this.metascore = metascore;
        this.user_score = user_score;
        this.release_date = release_date;
        this.link = link;
    }

    public static int getNo_games() {
        return no_games;
    }

    public static void setNo_games(int no_games) {
        Game.no_games = no_games;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getMetascore() {
        return metascore;
    }

    public void setMetascore(int metascore) {
        this.metascore = metascore;
    }

    public int getUser_score() {
        return user_score;
    }

    public void setUser_score(int user_score) {
        this.user_score = user_score;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public String toString() {
        return "ID = " + id + "\n" +
                "Title: " + title + "\n" +
                "Metascore: " + metascore + "\n" +
                "User score: " + user_score + "\n" +
                "Release date: " + release_date + "\n" +
                "Link" + link;
    }
}

