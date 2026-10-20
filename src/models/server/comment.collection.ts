import { Permission } from "node-appwrite";
import { commentsCollections, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    // Creating Collection
    await databases.createCollection(db, commentsCollections, commentsCollections, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Comment Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, commentsCollections, "content", 10000, true),
        databases.createEnumAttribute(db, commentsCollections, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, commentsCollections, "typeId", 50, true),
        databases.createStringAttribute(db, commentsCollections, "authorId", 50, true),
    ]);
    console.log("Comment Attributes Created");
}