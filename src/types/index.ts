export interface Albums{
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    releaseYear:number,
    songs:Song[],
}

export interface Song{
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    albumId:string | null,
    audioUrl:string,
    duration:number,
    createdAt:string,
    updatedAt:string
}

export interface Stats{
    totalSongs:number,
    totalAlbums:number,
    totalUsers:number,
    totalArtist:number
}

export interface Message{
    _id:string,
    receiverId:string,
    senderId:string,
    content:string,
    createdAt:string,
    updatedAt:string
}

export interface User{
    _id:string,
    clerkId:string,
    fullName:string,
    imageUrl:string,
}