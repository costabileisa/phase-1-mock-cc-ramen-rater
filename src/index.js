// write your code here
document.addEventListener("DOMContentLoaded", () => {
    fetchImages();
    addNewRamen();
})

function getElementId(id) {
    return document.getElementById(id)
}

async function fetchImages() {
    await fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => {
        data.forEach(ramen => {
            // grab the images container
            const imagesDiv = getElementId("ramen-menu");
            
            // create the tag and give it an id, src, and alt
            let ramenImage = document.createElement("img")
            ramenImage.id = ramen.id
            ramenImage.src = ramen.image
            ramenImage.alt = `Picture of ${ramen.name} from ${ramen.restaurant}`

            // add click event to each image
            ramenImage.addEventListener("click", event => displayInfo(event))

            // append the image
            imagesDiv.append(ramenImage)
        })
        displayInfo()
    })
}

async function displayInfo(image) {
    let ramenId;
    if (image) {
        ramenId = image.target.id
    } else {
        ramenId = 1
    }

    await fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramen => {
        // get the html elements to update
        const detailDiv = getElementId("ramen-detail");
        let detailImage = detailDiv.querySelector(".detail-image");
        let detailName = detailDiv.querySelector(".name");
        let detailRestaurant = detailDiv.querySelector(".restaurant");
        const rating = getElementId("rating-display")
        const comment = getElementId("comment-display")

        // change all the current info
        detailImage.src = ramen.image;
        detailName.innerHTML = ramen.name;
        detailRestaurant.innerHTML = ramen.restaurant;
        rating.innerHTML = ramen.rating;
        comment.innerHTML = ramen.comment;
    })
}

function capitalize(string) {
    const words = string.split(" ");
    const capitalizedWords = [];
    words.forEach(word => capitalizedWords.push(word.charAt(0).toUpperCase() + word.slice(1)))
    return capitalizedWords.join(" ")
}

function addNewRamen() {
    // get the form
    const createRamen = getElementId("new-ramen");
    createRamen.addEventListener("submit", async () => {
        
        // get all the form data; capitalize what's necessary
        let name = getElementId("new-name").value;
        name = capitalize(name);
        let restaurant = getElementId("new-restaurant").value;
        restaurant = capitalize(restaurant);
        const image = getElementId("new-image").value;
        const rating = getElementId("new-rating").value;
        let comment = getElementId("new-comment").value;
        comment = comment.charAt(0).toUpperCase() + comment.slice(1);
    
        // post the data to the json file
        await fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ 
                "name": name,
                "restaurant": restaurant,
                "image": image,
                "rating": rating,
                "comment": comment
            })
        })
    })
}