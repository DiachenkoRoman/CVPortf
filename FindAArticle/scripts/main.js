let inputKeywords = document.querySelector(".placeholder");
let list = document.querySelector(".articlesList");

//Постарался написать дебаунсер, как утилитку, чтобы можно было использовать теперь где угодно
//КД - одна секунда
const debounce = (fun) =>{
    let coolDown;
    return function(){
        const callFinder = () => {fun()}
        clearTimeout(coolDown)
        coolDown= setTimeout(callFinder, 1000)
    }
}

function findArticle(){
    let request = inputKeywords.value;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${request}&api-key=bAKwIGZTWdhkk9svEuwazvaGhoouOKxt`
    fetch(url).then((response) =>{
        return response.json()
    }).then((data) =>{
        list.innerHTML = data.response.docs.map(elem =>{
            console.log(elem);
            return `
                    <div>
                            <h3>${elem.abstract}</h3>
                            ${elem.lead_paragraph}
                            <p>${elem.byline.original}</p>
                    </div>
            `
        }).join("")
    })
}

findArticle = debounce(findArticle)

inputKeywords.addEventListener("keyup", findArticle)
