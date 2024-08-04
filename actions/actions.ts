"use server";

import { adminDb } from "@/firebase-admin";
import {auth} from "@clerk/nextjs/server";
import { title } from "process";

export async function createNewDocument(){
    auth().protect(); //protecting the route using clerk --> only auth users can create a new doc
    // if not logged in --> it will throw the signin screen
    console.log("creating new document");

    const {sessionClaims} = await auth();

    // acces the documents table form firebase
    const docCollectionRef = adminDb.collection("documents");
    // create a new entry in documents
    const docRef = await docCollectionRef.add({
        title:"New Document",
    });

    // add the curr new document to the current user
    await adminDb.collection("users").doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId:sessionClaims?.email!,
        role:"owner",
        createdAt:new Date(),
        roomId:docRef.id,
    });

    return {docId:docRef.id};

}