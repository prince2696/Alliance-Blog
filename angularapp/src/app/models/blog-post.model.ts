import { User } from "./user.model";

export class BlogPost {
    BlogPostId? : number;
    UserId : number;
    Title : string;
    Content : string;
    Status : string;
    PublishedDate : Date;
    User?: User;
}