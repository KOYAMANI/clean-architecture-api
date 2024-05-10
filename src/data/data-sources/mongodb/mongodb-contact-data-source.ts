import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { DatabaseWrapper } from "../../interfaces/data-sources/database-wrapper";
import { Contact } from "../../../domain/entities/contact";

export class MongoDBContactDataSource implements ContactDataSource {
    private database: DatabaseWrapper;
    constructor(database: DatabaseWrapper) {
        this.database = database;
    }
    async create(cotnact: Contact): Promise<boolean> {
        const result = await this.database.insertOne(cotnact);
        return result;
    }

    async getAll(): Promise<Contact[]> {
        const result = await this.database.find({});
        return result.map(item => ({
            id: item._id.toString(),
            surname: item.sirname,
            firstName: item.firstName,
            email: item.email
        }));
    }
}