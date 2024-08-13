"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import {auth} from "@clerk/nextjs/server";

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



// delete document server action

export async function deleteDocument(roomId:string) {
    auth().protect(); //protect the route 
    console.log("Deleting the document : "+roomId);

    try {
        // deleting the document reference itself
        await adminDb.collection("documents").doc(roomId).delete();
        // deleting all rooms with id == currRoomId
        // delete the room reference in all of the users in the room
        const query = await adminDb.collectionGroup("rooms").where("roomId","==",roomId).get();

        const batch = adminDb.batch();
        query.docs.forEach((doc)=>{
            batch.delete(doc.ref);
        })

        await batch.commit();
        // delete the room form liveblocks
        await liveblocks.deleteRoom(roomId);

        return {success:true};
        
    } catch (error) {
        console.error(error);
        return {success:false};
        
    }
}

export async function inviteUserToDocument(roomId:string,email:string){
    auth().protect(); //protect the route
    console.log("Inviting user to document : "+roomId+" for user : "+email);
    try {
        await adminDb.collection("users").doc(email).collection("rooms").doc(roomId).set({
            userId:email,
            role:"editor",
            createdAt:new Date(),
            roomId:roomId,
        });

        return {success:true};
        
    } catch (error) {
        console.error(error);
        return {success:false};
    }
}

export async function getRoomOwner(roomId: string) {
    auth().protect(); // Protecting the route
  
    try {
      // Query Firestore to find the document where the role is 'owner' and roomId matches
      const querySnapshot = await adminDb
        .collectionGroup("rooms")
        .where("roomId", "==", roomId)
        .where("role", "==", "owner")
        .limit(1)
        .get();
  
      // Extract the owner’s email from the query result
      if (!querySnapshot.empty) {
        const ownerDoc = querySnapshot.docs[0];
        const ownerData = ownerDoc.data();
        return { success: true, owner: ownerData.userId };
      } else {
        return { success: false, message: "No owner found for this room." };
      }
    } catch (error) {
      console.error("Error fetching room owner:", error);
      return { success: false, message: "Failed to fetch room owner." };
    }
  }


// remove the user from the room
export async function removeUserFromDocument(roomId: string, email: string) {
    auth().protect(); // Protecting the route
    console.log("Removing user from room : "+roomId+" for user : "+email);
    try {
        await adminDb.collection("users").doc(email).collection("rooms").doc(roomId).delete();
           
        return {success:true};
        
    } catch (error) {
        console.error(error);
        return {sucess:false};
        
    }
}