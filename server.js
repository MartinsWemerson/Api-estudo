const express = require( 'express' );
const app = express();
const data = require("./data.json");
app.use(express.json());

app.get("/clients", function(request, response){
        response.json(data);
});

app.get("/clients/:id", function(require, response){
    const { id } = require.params;
    const client = data.find(cli => cli.id == id) 
    if(!client){
        return response.status(204).json();
    }
    response.json(client);
})
app.post("/clients", (req, res)=> {
    const { name, lastname, user, fone, id } = req.body;

    // Retornar os dados recebidos
    res.json({ name, lastname, user, fone, id });
});
app.put("/clients/:id", (req, res) =>{
    const { id } = req.params;
    const Client = data.find(cli => cli.id == id);
    
    if(!Client) return res.status(204).json();
    const { name} = req.body;
    Client.name = name
    res.json(Client);
});
app.delete("/clients/:id" , (req, res)=>{
    const { id } = req.params;
    const clientFiltered = data.filter(client =>client.id != id);
    res.json(clientFiltered);
})




app.listen(3000, function(){
    console.log("Server is running");
});