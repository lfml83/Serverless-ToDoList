import { document } from "src/utils/dynamodbCliente";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handle : APIGatewayProxyHandler= async (event) => {

  const { userid } = event.pathParameters;


  const response = await document.query({
    TableName: "users_todos",
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid": userid,
    },
  }).promise();

  const listTodos = response.Items;
 

if(response.Items[0]){
    return {
      statusCode: 200,
      body: JSON.stringify({
        content: listTodos
      }),
      headers: {
        "Content-type": "application/json",
      }
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "There is no user registered with this Id"
    }),
    headers: {
      "Content-type": "application/json",
    }
  }
}
