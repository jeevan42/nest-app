import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        { _id: 1, name: 'Jeevan' },
        { _id: 2, name: 'Ron' },
    ];

    findAllUsers() {
        return this.users;
    }
}
