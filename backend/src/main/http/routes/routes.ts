import { Router, Request, Response } from "express";

import {v4 as uuidv4} from 'uuid'

const routes = Router();

type Card = {
    title:String,
    create_at:Date,
    estimation:Date
}

type Colunm ={
    name:String,
    color?:String,
    cards: Array<Card>
}

type Board = {
    name:String, 
    description: String
    colunms:Array<Colunm>
}

const boards = new Map<String, Board>();

routes.post('/board', (request:Request, response:Response)=>{
    const {name, description} = request.body as Board
    
    if(!name || !description){
        return response.status(422).json({
            statusCode: 422,
            message: "Fields are required."
        })
    }
    
    const uuid = uuidv4();

    //chamar um controle para criar o board
    boards.set(uuid,{
        name,
        description,
        colunms: []
    })
    response.json({id: uuid});
});

routes.post('/board/:id/column', (request:Request, response:Response)=>{
    const id = request.params.id
    const {name} = request.body as Colunm
    
    if(!name){
        return response.status(422).json({
            statusCode: 422,
            message: "Field are required."
        })
    }

    if(!boards.has(`${id}`)){
        return response.status(422).json({
            statusCode: 422,
            message: "Id board not found"
        })
    }
        const board = boards.get(id)
        if(board){
            boards.delete(id)
            board.colunms.push({name, cards: []})
            boards.set(id, board);
        }
    
    response.json(board);
});

routes.post('/board/:id/column/card', (request:Request, response:Response)=>{
    const id = request.params.id
    const column = request.query.column as String
    const {title, estimation } = request.body as Card
    
    if(!title || !estimation || !column){
        return response.status(422).json({
            statusCode: 422,
            message: "Field are required."
        })
    }

    if(!boards.has(`${id}`)){
        return response.status(422).json({
            statusCode: 422,
            message: "Id board not found"
        })
    }
        const board = boards.get(id)

        if(board){
            boards.delete(id)
           
            board.colunms.forEach(c =>{
                const {name, cards} = c
                if(name === column){
                    const card: Card ={
                        create_at: new Date(),
                        estimation: new Date(),
                        title
                    }
                    cards.push(card)
                }
            })
            boards.set(id,board)
        }
        console.log(board)
    
    response.json(board);
});

routes.get("/board/column/estimation", (request, response)=>{
    return response.json()
});
routes.patch("/card/column", (request, response)=>{
    return response.json()
});


export default routes;