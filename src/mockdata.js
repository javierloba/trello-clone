const mockData = {
    lists: {
        "list-1": {
            id: "list-1",
            title: "To Do",
            cards: [{
                id: "card-1",
                title: "Comprar carne"
            },{
                id: "card-2",
                title: "Comprar pescado"
            },{
                id: "card-3",
                title: "Comprar pan"
            }]
        },
        "list-2": {
            id: "list-2",
            title: "In progress",
            cards: []
        }
    },
    listIds: ["list-1", "list-2"]
}

export default mockData;