import bcrypt from 'bcrypt';

import prisma from '../prisma';

class UserController {
    static async createUser(req: any, res: any) {
        console.log(1111)
        const { name, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            res.status(201).json({
                message: 'User created successfully',
                user,
            });
        } catch (error) {
            console.log(333333, error)
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    // Get all users
    static async getUsers(req: any, res: any) {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    // Get a user by email
    static async getUserByEmail(req: any, res: any) {
        const { email } = req.params;
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }
}

export default UserController;
