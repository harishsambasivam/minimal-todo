
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class TodoDAO {
    constructor(db){
        this.db = db;
    }

    create = async (todo) => {
        logger.debug({todo}, "invoking todo DAO");
        const data = await this.db.todo.create({
            data: {
                ...todo
            }
        });
        logger.debug({data});
        return data;
    }
}

