import CryptoJS from 'crypto-js';

interface User {
  username: string;
  password: string;
  isAdmin?: boolean;
}

class UserService {
  private readonly STORAGE_KEY = 'adapt_users';
  private readonly ENCRYPTION_KEY = 'adapt_secure_key_2024';

  constructor() {
    this.initializeUsers();
  }

  private initializeUsers() {
    const users = this.getUsers();
    if (users.length === 0) {
      this.saveUsers([{
        username: 'admin.OmerKurtulus',
        password: 'admin.OmerKurtulus',
        isAdmin: true
      }]);
    }
  }

  private encrypt(data: User[]): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.ENCRYPTION_KEY).toString();
  }

  private decrypt(encryptedData: string): User[] {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.ENCRYPTION_KEY);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Error decrypting data:', error);
      return [];
    }
  }

  getUsers(): User[] {
    try {
      const encryptedUsers = localStorage.getItem(this.STORAGE_KEY);
      if (!encryptedUsers) return [];
      
      const users = this.decrypt(encryptedUsers);
      if (!Array.isArray(users)) return [];
      
      return users.filter(user => 
        user && 
        typeof user === 'object' && 
        typeof user.username === 'string' && 
        typeof user.password === 'string'
      );
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  private saveUsers(users: User[]) {
    try {
      const encryptedUsers = this.encrypt(users);
      localStorage.setItem(this.STORAGE_KEY, encryptedUsers);
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  addUser(username: string, password: string): boolean {
    if (!username || !password) return false;
    
    try {
      const users = this.getUsers();
      if (users.some(user => user.username === username)) {
        return false;
      }

      users.push({ username, password, isAdmin: false });
      this.saveUsers(users);
      return true;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  }

  removeUser(username: string): boolean {
    if (!username) return false;
    
    try {
      const users = this.getUsers();
      const filteredUsers = users.filter(user => user.username !== username);
      
      if (filteredUsers.length === users.length) {
        return false;
      }

      this.saveUsers(filteredUsers);
      return true;
    } catch (error) {
      console.error('Error removing user:', error);
      return false;
    }
  }

  validateUser(username: string, password: string): { isValid: boolean; isAdmin: boolean } {
    if (!username || !password) {
      return { isValid: false, isAdmin: false };
    }

    try {
      const users = this.getUsers();
      const user = users.find(u => u.username === username && u.password === password);
      
      return {
        isValid: !!user,
        isAdmin: !!user?.isAdmin
      };
    } catch (error) {
      console.error('Error validating user:', error);
      return { isValid: false, isAdmin: false };
    }
  }
}

export const userService = new UserService();
export type { User };