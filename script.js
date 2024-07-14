const userInput = document.querySelector("#search-box")
const searchBtn = document.querySelector("#search-button")
const main = document.querySelector("main")
const profileContainer = document.querySelector("#profile-container")


searchBtn.addEventListener("click", () => {
    const userId = String((userInput.value)).toLowerCase();
    console.log(userId);
    if(userId){
        makeRequest('GET', apiUrl + userId)
        .then(data => {
            const card = document.createElement("section")
            profileContainer.innerHTML = ""
            card.className = "profile-card"
            card.innerHTML = `
            <button class = "close-button">&times;</button>
            <img src=${data.avatar_url} alt="Profile Image">
            <div class="profile-details">
                <h2>${data.name}</h2>
                <p>Followers: ${data.followers}</p>
            </div>
            `
            profileContainer.appendChild(card)

            document.querySelector(".close-button").addEventListener("click" , () => {
                profileContainer.innerHTML = ""
                userInput.value = ""
            })
        }
               
        )
        .catch(error => {
            console.log(error);
            alert("Error fetching user data. Please try again later.")
        })
    }else{
        alert("Please enter a username")
    }
    
})

const apiUrl = "https://api.github.com/users/"

const makeRequest = (method, url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.send()
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const data = JSON.parse(xhr.responseText)
                    resolve(data);
                } else{
                    reject("Error: " + xhr.status)
                }
                
            }
        }
    })
}