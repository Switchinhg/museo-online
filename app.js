/* Bring Some art peaces with offset */
let URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/7000"
/* Specific art peace */
let URLSpecific = "https://collectionapi.metmuseum.org/public/collection/v1/objects/7000"
const departments = ["American Decorative Arts","Ancient Near Eastern Art","Arms and Armor","Arts of Africa, Oceania, and the Americas","Asian Art","The Cloisters","The Costume Institute","Drawings and Prints","Egyptian Art","European Paintings","European Sculpture and Decorative Arts","Greek and Roman Art","Islamic Art","The Robert Lehman Collection","The Libraries","Medieval Art","Musical Instruments","Photographs","Modern Art"]
/*
    Link
    https://metmuseum.github.io/

    Link DOCS - https://docs.google.com/document/d/1Xn4bbE-p7nBdwzr7fbaYE2159rLTbsWaiqf9IxFB11I/edit

    
    Metadata
    https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=2018-10-22

    Departments 
    https://collectionapi.metmuseum.org/public/collection/v1/departments

    Highlifhts 
    https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=European%20Paintings

    after time and nacionality

    https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=2000&q=african
    
    range between and nacionality
    https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&q=African

    nationality is in english eg : Peruvian, uruguayan, mexican etc 
*/

const getFrontPageArt =async e =>{
    const number = Math.floor(Math.random() * (departments.length - 0 + 1) + 0)
    console.log(number)
    console.log(departments[number])
    const req = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${departments[number]}`)
    const resp = await req.json()
    console.log(resp.objectIDs)
    findData(resp.objectIDs)
}

const findData = async (e)=>{
    const data = []
    for (const i of e) {
        // console.log('entre')
        if(e[10]==i)break
        const req = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${i}`)
        const resp = await req.json()
        data.push(resp)
        console.log(await resp)
        placeData(data)
    }

}

const placeData = (e) =>{
    let data = document.getElementById('data')
    document.getElementById('data').innerHTML =""
    console.log(e)
    e.forEach(art => {
        data.innerHTML += `<div>
        <div><img src="${art.primaryImageSmall}"/></div>
        <div>${art.title}</div>
        </div>`
    });
}

getFrontPageArt()