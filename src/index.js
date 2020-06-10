document.addEventListener('DOMContentLoaded', () => {

    let saveDog = {
        dogId: null
    }

    const dogURL = "http://localhost:3000/dogs"
    const tableBody = document.getElementById("table-body")
    const dogForm = document.getElementById('dog-form')
    console.log(dogForm)


    function getDogInfo(){
        fetch(dogURL)
        .then(resp => resp.json())
        .then(allDogs => renderDogs(allDogs))
    }

    getDogInfo()

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

            saveDog.dogId = e.target.getAttribute('data-dog-id')
            
        }//end of if (edit)
        if (e.target.value === 'Submit') {
            e.preventDefault()
            const id = saveDog.dogId
            const updatedDogObj = {
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value
            }
            fetch(`http://localhost:3000/dogs/${id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updatedDogObj)
            })
            .then(resp => resp.json())
            .then(console.log)
            
            // (data => updateDogRow(data))
            
            //new get request for all the dogs + updated dog and render again
                //AFTER the patch 

        }//end of if (submit)

        // function updateDogRow(dog) {

        // }


    })//end of eventlistener 

})//end of DOMLOAD