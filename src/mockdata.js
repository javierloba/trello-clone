const mockData = {
    lists: {
        "01list": {
            id: "1",
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
            id: "2",
            title: "In progress",
            cards: []
        }
    },
    listIds: ["01list", "02list"]
}

export default mockData;