import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllTodo = async (req, res) => {
    try {

        const listTodo = await prisma.todo.findMany();
        return res.json({ listTodo });

    } catch (error) {
        return res.json({ error });
    }
};

export const createTodo = async (req, res) => {

    try {

        if (!req.body.title) return res.json({ error: 'Dados não enviados' });
        const todo = await prisma.todo.create({
            data: {
                title: req.body.title,
                done: req.body.done ? true : false
            }
        });
        return res.json({ todo });

    } catch (error) {
        return res.json({ error });
    }
};

export const updateTodo = async (req, res) => {
    try {

        const id = req.params.id;
        let data = {};
        let todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
        if (!todo) return res.json({ error: 'Dados não encontrado' });
        if (req.body.title) data.title = req.body.title;
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    data.done = true;
                    break;
                case 'false':
                case '0':
                    data.done = false;
                    break;
            }
        };
        todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: data
        })
        return res.json({ todo });

    } catch (error) {
        return res.json({ error });
    }
};

export const deleteTodo = async (req, res) => {
    try {

        const id = req.params.id;
        let todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
        if (todo) {
            await prisma.todo.delete({ where: { id: Number(id) } });
        }
        return res.json({});

    } catch (error) {
        return res.json({ error });
    }
};
