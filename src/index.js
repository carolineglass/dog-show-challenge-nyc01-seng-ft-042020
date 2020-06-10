document.addEventListener('DOMContentLoaded', () => {
    
    const dogURL = "http://localhost:3000/dogs"
    const tableBody = document.getElementById("table-body")
    const dogForm = document.getElementById('dog-form')
    console.log(dogForm)


    fetch(dogURL)
    .then(resp => resp.json())
    .then(allDogs => renderDogs(allDogs))

    function renderDogs(allDogs) {
        allDogs.forEach(dog => renderDog(dog))
    }

    function renderDog(dog) {
        tableBody.innerHTML += 
        `<tr>
            <td>${dog.name}</td> 
            <td>${dog.breed}</td> 
            <td>${dog.sex}</td> 
            <td><button data-dog-id="${dog.id}">Edit</button></td>
        </tr>`
    }
    
    document.addEventListener('click', e => {
        if (e.target.textContent === "Edit") {
            const dogTableRow = e.target.parentNode.parentNode
            const getName = dogTableRow.children[0].innerText
            const getBreed = dogTableRow.children[1].innerText
            const getSex = dogTableRow.children[2].innerText

            dogForm.name.value = getName
            dogForm.breed.value = getBreed
            dogForm.sex.value = getSex
            
        }//end of if (edit)
        if (e.target.value === 'Submit') {

            //on submit --- patch request the new form values! 
            e.preventDefault()


        }//end of if (submit)
    })//end of eventlistener 

})//end of DOMLOAD