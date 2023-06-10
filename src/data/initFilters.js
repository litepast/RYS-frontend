const all = {
    selected: true,
    hover: false
};

const oTypes= [
    {id: 1, name: 'Album', selected: false, hover: false},
    {id: 2, name: 'Single', selected: false, hover: false},
    {id: 3, name: 'Compilation', selected: false, hover: false},
    {id: 4, name: 'EP', selected: false, hover:false}
];

function initOptionsYears(){ 
    const start = 1940;
    const end = new Date().getFullYear()
    const limit = end-start
    const years = []      
    for(let i=0; i<=limit; i++){
        years.push({
            id: i, 
            name: end-i, 
            selected: false, 
            hover: false
        })
    } 
    return years       
}

const oYears = initOptionsYears()


function initOptionsRatings(){   
    const ratings = []    
    for(let i=0; i<=9; i++){
        ratings.push({
            id: i, 
            name: 5-(i*0.5), 
            selected: false, 
            hover: false
        })
    } 
    ratings.push({
            id: 10, 
            name: 'Unrated', 
            selected: false, 
            hover: false
        })
    return ratings       
}

const oRatings = initOptionsRatings()


export { all, oYears, oTypes, oRatings };