// write your code here

const allRamen = document.querySelector('#ramen-menu')

function currentRamen(ramen) {
    let detail = document.querySelector('#ramen-detail')
    const [image, ramenName, restaurant] = detail.children
    image.src = ramen.image 
    image.alt = ramen.name
    ramenName.textContent = ramen.name
    restaurant.textContent = ramen.restaurant  
    const ramenForm = document.querySelector('form#ramen-rating')
    ramenForm.innerHTML = `
    <form id="ramen-rating" data-id="insert ramen ID">
    <label for="rating">Rating: </label>
    <input type="text" name="rating" id="rating" value="${ramen.rating}" />
    <label for="comment">Comment: </label>
    <textarea name="comment" id="comment">${ramen.comment}</textarea>
    <input type="submit" value="Update" />
  </form>
    `
    ramenSubmitform(ramenForm, ramen)
}

function ramenSubmitform(form, ramen) {
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        const [rating, comment] = event.target

        const ramenObj = {
            rating: rating.value,
            comment: comment.value
        }

        fetch(`http://localhost:3000/ramens/${ramen.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ramenObj)
        })
        .then(respons => respons.json())
        .then(newRamenObj => getAllRamen())
        //     const ramenForm = document.querySelector('form#ramen-rating')
        //     ramenForm.innerHTML = `
        //     <form id="ramen-rating" data-id="insert ramen ID">
        //     <label for="rating">Rating: </label>
        //     <input type="text" name="rating" id="rating" value="${newRamenObj.rating}" />
        //     <label for="comment">Comment: </label>
        //     <textarea name="comment" id="comment">${newRamenObj.comment}</textarea>
        //     <input type="submit" value="Update" />
        //   </form>
            // ` 
        
        })
}






//get list of ramen
function getAllRamen () {
    fetch('http://localhost:3000/ramens') 
        .then(response => response.json())
        .then(ramens => {
            ramens.forEach(ramen => {
                let image = document.createElement('img')
                image.src = ramen.image
                allRamen.append(image)
                image.addEventListener('click', function(event) {
                    currentRamen(ramen)

                })
        })})
}
getAllRamen()

