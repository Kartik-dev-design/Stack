import { db } from "../name";
import  createQuestionCollection from "./question.collection"
import  createAnswerCollection from "./answer.collection"
import  createCommentCollection from "./comment.collection"
import  getOrCreateStorage    from "./storage.collection"
import  createvotecollection from "./vote.collection"
import { databases } from "./config";
export default async function  getOrCreatedb(){
  try{
     await databases.get(db)
     console.log("data base connected successfully")
  }catch(error){
    try {
         await databases.create(db,db)
         console.log("database created")
         await Promise.all([
            createAnswerCollection(),
            createQuestionCollection(),
            createCommentCollection(),
            getOrCreateStorage(),
            createvotecollection(),
         ])
         console.log("all collections created")
         console.log("data base conncted successfully")
    }catch (error) {
        console.log("Error creating databases or collections",error)
    }
  }
  return databases
}
