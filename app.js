const departments = ["American Decorative Arts","Ancient Near Eastern Art","Arms and Armor","Arts of Africa, Oceania, and the Americas","Asian Art","The Cloisters","The Costume Institute","Drawings and Prints","Egyptian Art","European Paintings","European Sculpture and Decorative Arts","Greek and Roman Art","Islamic Art","The Robert Lehman Collection","The Libraries","Medieval Art","Musical Instruments","Photographs","Modern Art"]

const getFrontPageArt =async e =>{
    const number = getRandomNumber(departments.length)
    document.getElementById('showDataTitle').innerText = `Category: ${e?e:departments[number]}`
    document.getElementById('data').innerHTML = `<img src="./imgs/loading.gif" style="width:50px;" />`
    try{
        const req = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${e?e:departments[number]}`)
        const resp = await req.json()
        findData(resp.objectIDs)
    }catch(e){
        console.log(e)
    }
}

const findData = async (e)=>{
    const data = []
    
    for (let i = 1; i<20; i++) {
        const number = getRandomNumber(e.length)
        try{
            const req = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${number}`)
            const resp = await req.json()
            data.push(resp)
        }catch(e){
            console.log(e)
        }
    }
    placeData(data)

}

const placeData = (e) =>{
    let data = document.getElementById('data')
    data.innerHTML = "" 
    
    e.forEach(art => {
        if(!art.primaryImageSmall)return
        data.innerHTML += `
        <div class="artPeace">
        <img src="${art.primaryImageSmall}"/>
        <div>${art.title}</div>
        </div>`
    });
}

 const parameters = document.getElementById('params')
 parameters.addEventListener('change', (e) =>{
    if(e.target.value === 'Department')return
    getFrontPageArt(e.target.value)
})
const getRandomNumber = (e) =>{
    return Math.floor(Math.random() * (e - 0 + 1) + 0)
}

getFrontPageArt()