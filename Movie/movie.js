(function(){

    // Locating Elements

    const title=document.getElementById("film-name");
    const list=document.getElementById("list")
    const poster=document.getElementById("poster");
    const home=document.getElementById("home-button");

    // Declarations and Getting Values

    let movieArr=['Title','Released','Director','Actors','Awards','Genre','Language','imdbRating','Runtime','BoxOffice','Writer'];
    let movieName=localStorage.getItem("movieName");
    let movieID=localStorage.getItem("movieID");
    

    // Functions

    function renderlist(arr){

        while(list.firstChild) list.removeChild(list.firstChild);

        let Title=arr['Title'];
        if(Title.length>20){
            Title=Title.slice(0,20)+"..."
        }
        title.innerHTML=Title;
        poster.src=arr['Poster'];
        poster.alt="Movie Poster No Available";
        
        // Adding Elements to UL List

        for(let i=0;i<movieArr.length;i++){
                let liElement=document.createElement("li");
                liElement.innerHTML=`${movieArr[i]}  :  ${arr[movieArr[i]]}`;
                liElement.classList.add("li-item");
                list.append(liElement);
        }

        // Adding Button
        
        let liElement=document.createElement("li");
        liElement.innerHTML=`<button id="Favourites-button" data-id=${arr['imdbID']} type="button">Add to Favourites</button>`;
        liElement.classList.add("li-item");
        list.append(liElement);

        // Locating Favourites Button

        const Favourites=document.getElementById("Favourites-button");
        Favourites.addEventListener('click',addToFavourites);
    }

    // Fetching Movie from API

    async function fetchMovie(){
        if(movieID.length>0){
            const res=await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=b32dbac3`);
            const data=await res.json();
            if(data.Response==='True'){renderlist(data);}
            else{alert("No Movie Found with this Name");} 
        }
        else{
            const res=await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=b32dbac3`);
            const data=await res.json();
            if(data.Response==='True'){renderlist(data)}
            else{alert("No Movie Found with this Name")}   
        }
        
    }

    // Adding to Favourites

    function addToFavourites(e){
        let temp=localStorage.getItem("favourites");
        temp=JSON.parse(temp);
        target=e.target;
        if(temp.includes(target.dataset.id)){
            alert("Movie Already Present in Favourites")
            return;
        }
        
        
        temp.push(target.dataset.id);
        // temp.push(data['imdbID']);
        // console.log(data['imdbID']);
        localStorage.setItem("favourites",JSON.stringify(temp));
        alert("Added to Favourites");
        return;
    }


    // Initialing

    function initialize(){
        fetchMovie();
    }
    initialize();
})();
