import { Entity, Fields } from "remult";

@Entity("users", {
    allowApiCrud: true
})
export class User {
    @Fields.string()
    name = '';
    
    @Fields.string()
    email = '';

    @Fields.string()
    password = '';
}