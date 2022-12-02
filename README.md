# IMDBMovies

This project conatins 3 webpages named Home,Movies and Favourites. Home Page to search the Movie, Movie page which displays the details of the movie searched And Favourites pages where all the favourite movies of the user are displayed

Link : https://siddheshd91.github.io/IMDBMovies/

Acknowledgements
https://www.omdbapi.com/
Awesome README
API Reference
Get all items
  GET /api/items: https://www.omdbapi.com/

Takes MovieName or ImdbID of movie and returns all the Information of the Movie.


## Tech Stack
**Client:** HTML,CSS

**Server:** JavaScript


## Appendix

Any additional information goes here

Searching by movieName would give only 1 movie but what if there are 2 movies with same name for eg: Drishyam(Hindi) and Drishyam(Malyalam).
So to tackle this made an API call using imdbID of the movie selected from suggestions List.

Add to Favourites button to add movie to favourite on Movies Page

Remov Button to remove movie from Favourites List.
