const mockData = {
    lists: {
        "01list": {
            id: "01list",
            title: "To Do",
            cards: [{
                id: "01card",
                title: "Comprar carne"
            },{
                id: "02card",
                title: "Comprar pescado"
            },{
                id: "03card",
                title: "Comprar pan"
            }]
        },
        "02list": {
            id: "02list",
            title: "In progress",
            cards: []
        }
    },
    listIds: ["01list", "02list"]
}

export default mockData;