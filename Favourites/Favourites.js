(function(){

    // Locating Element 

    const fav_list=document.getElementById("fav-list");

    // Declarations and Getting value from localStorage

    let val=(localStorage.getItem("favourites"))
    let movies=(JSON.parse(val));
    movies=Array.from(new Set(movies));


    function renderlist(arr){

        let liElement=document.createElement("li");

        let Title=arr['Title']
        if(Title.length>20){
            Title=Title.slice(0,20)+"..."
        }
        liElement.innerHTML=`<div class="container">
                                <div class="box">
                                     <span></span>
                                        <div class="content">
                                            <div>
                                                <img src="${arr['Poster']}">
                                                <h1>${Title}</h1>
                                            </div>
                                            <button type="button" class="delete" data-id="${arr['imdbID']}"> Remove</button>
                                        </div>

                                </div>
                            </div>`
        fav_list.append(liElement);
    }

    
    function fetchFavMovies(){
        
        fav_list.innerHTML='';


        for(let i=0;i<movies.length;i++){
            // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=b32dbac3&t=${movies[i]}`)
            fetch(`http://www.omdbapi.com/?i=${movies[i]}&apikey=b32dbac3`)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                if(data.Response==="True"){
                    renderlist(data);
                }
                else{
                    alert("Movie Not Found");
                    home.click();
                }
            })
        }

        localStorage.setItem("favourites",JSON.stringify(movies));

    }


    function removeFromFavourites(e){
        if(e.target.className==='delete'){
            const taskId=e.target.dataset.id.toLowerCase();

            movies=movies.filter(function(task){
                
                return task.toLowerCase()!=taskId;
            })
            fetchFavMovies();
            alert("Removed from Favourites")
            
            return;
        }
    }   

    document.addEventListener('click',removeFromFavourites);


function initialize(){
    fetchFavMovies()
}
initialize();

})();