// write your code here

const allRamen = document.querySelector('#ramen-menu')
const ramenForm = document.querySelector('form#ramen-rating')
const detail = document.querySelector('#ramen-detail')

function currentRamen(id) {
    fetch(`http://localhost:3000/ramens/${id}`)
        .then(r => r.json())
        .then(ramen => {
            const [image, ramenName, restaurant] = detail.children
            image.src = ramen.image
            image.alt = ramen.name
            ramenName.textContent = ramen.name
            restaurant.textContent = ramen.restaurant
            ramenForm.innerHTML = `
            <label for="rating">Rating: </label>
            <input type="text" name="rating" id="rating" value="${ramen.rating}" />
            <label for="comment">Comment: </label>
            <textarea name="comment" id="comment">${ramen.comment}</textarea>
            <input type="submit" value="Update" />`
            ramenForm.dataset.id = id
        })
    //ramenSubmitform(ramenForm, ramen)
}

//function ramenSubmitform(form, ramen) {
ramenForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const [rating, comment] = event.target

    const ramenObj = {
        rating: rating.value,
        comment: comment.value
    }

    fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
        .then(respons => respons.json())
        .then(newRamenObj => getAllRamen(newRamenObj.id))
})
//}


document.addEventListener("click", function (event) {
    if (event.target.matches(".ramen-image")) {
        currentRamen(event.target.dataset.id)
    }
})



//get list of ramen
function getAllRamen(firstId = 1) {
    fetch('http://localhost:3000/ramens')
        .then(response => response.json())
        .then(ramens => {
            currentRamen(firstId)
            ramens.forEach(ramen => {
                let image = document.createElement('img')
                image.src = ramen.image
                image.classList.add("ramen-image")
                image.dataset.id = ramen.id
                allRamen.append(image)
                // image.addEventListener('click', function(event) {
                //     currentRamen(ramen)
                // })
            })
        })
}
getAllRamen()

