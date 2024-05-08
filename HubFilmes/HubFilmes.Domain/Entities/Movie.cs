using HubFilmes.Domain.Entities;

public class Movie
{
    public int Id { get; set; }
    public bool Adult { get; set; }
    public string BackdropPath { get; set; }
    public List<int> GenreIds { get; set; }
    public string OriginalTitle { get; set; }
    public string Overview { get; set; }
    public string PosterPath { get; set; }
    public DateTime ReleaseDate { get; set; }
    public decimal VoteAverage { get; set; }
    public int VoteCount { get; set; }
    public string Duration { get; set; }
    public decimal Budget { get; set; }
    public decimal BoxOffice { get; set; }
    public decimal Liked { get; set; }
    public decimal DidNotLike { get; set; }
    public string Synopsis { get; set; }
    public List<string> Producers { get; set; }
}
