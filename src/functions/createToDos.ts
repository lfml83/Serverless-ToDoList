
import { v4 as uuidv4 } from "uuid";
import { document } from "../utils/dynamodbCliente";


interface ICreateTodo{
  user_id: string;
  title: string;
  deadline: Date;
}

export const handle = async (event) =>{

  const id = uuidv4();
  const { user_id } = event.pathParameters as ICreateTodo;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
  console.log(user_id)
 
 
  await document.put({
  TableName: "users_todos",
  Item: {
    id,
    user_id,
    title,
    done: false,
    deadline
  }
}).promise()

return {
  statusCode: 201,
  body: JSON.stringify({
    message: "TODO created!",
  }),
  headers: {
    "content-Type": "application/json",
  }
}
}