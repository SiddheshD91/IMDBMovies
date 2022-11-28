(function(){

    // Locating

    const searchBox= document.getElementById("search-box");
    const searchButton=document.getElementById("search-button");
    const suggestions_list=document.querySelector(".suggestions-list");
    
    // Function Declaration
    localStorage.setItem("movieID","");

    function testJS(){
        let b=searchBox.value;
        localStorage.setItem("movieName",b);
        return false;
    }

    // Adding EventListener

    searchButton.addEventListener('click',testJS);
    document.addEventListener('keyup',function(e){
        if(e.key==='Enter'){
            testJS();
        }
    })

    function addSuggestions(data){

        suggestions_list.innerHTML='';
        data=data.slice(0,5);
        suggestions_list.classList.add('.suggestions-list-later');
        data.forEach(element => {
            let liElement=document.createElement('li');
            liElement.innerHTML=`${element['Title']}`;
            liElement.setAttribute('data-id',element['imdbID']);
            liElement.setAttribute('class','list-element');
            suggestions_list.append(liElement);
        });

        suggestions_list.classList.add('suggestions-list-later');
    }
    async function displaySuggestions(e){
        let movieName=searchBox.value;
        const res=await fetch(`https://www.omdbapi.com/?s=${movieName}&page=1&apikey=b32dbac3`);
        let data=await res.json();
        if(data["Response"]==='True'){
            data=data['Search'].slice(0,10);
            addSuggestions(data);
        }
        
    }


    function addToSearchBar(e){
        let target=e.target;
        if(target.className==='list-element'){
            taskID=target.dataset.id;
            searchBox.value=target.innerHTML;
            suggestions_list.innerHTML=``;
            suggestions_list.classList.remove('suggestions-list-later');
            localStorage.setItem("movieID",target.dataset.id);

        }
    }
    searchBox.addEventListener('keyup',displaySuggestions);
    document.addEventListener('click',addToSearchBar);

})();