import mongoose from 'mongoose';

/*export interface User {
    id: number;
    name: string;
    age: number;
    email: string;
  }
export class User implements User {
    constructor(     
      
    ) {}
}
*/
  

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  password?: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: {type: Number, required:true},
  email: { type: String, required: true },
  password: { type: String, required: false },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel