import { 
  users, 
  userPreferences, 
  type User, 
  type InsertUser, 
  type UserPreferences, 
  type InsertUserPreferences 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserPreferences(userId: number): Promise<UserPreferences | undefined>;
  saveUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences>;
  updateUserPreferences(id: number, preferences: InsertUserPreferences): Promise<UserPreferences | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userPreferences: Map<number, UserPreferences>;
  private currentUserId: number;
  private currentPreferencesId: number;

  constructor() {
    this.users = new Map();
    this.userPreferences = new Map();
    this.currentUserId = 1;
    this.currentPreferencesId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserPreferences(userId: number): Promise<UserPreferences | undefined> {
    return Array.from(this.userPreferences.values()).find(
      (prefs) => prefs.userId === userId,
    );
  }

  async saveUserPreferences(insertPreferences: InsertUserPreferences): Promise<UserPreferences> {
    const id = this.currentPreferencesId++;
    // Ensure we have non-undefined values for userId and darkMode
    const preferences: UserPreferences = { 
      ...insertPreferences, 
      id,
      userId: insertPreferences.userId ?? null,
      darkMode: insertPreferences.darkMode ?? null
    };
    this.userPreferences.set(id, preferences);
    return preferences;
  }

  async updateUserPreferences(
    id: number,
    updateData: InsertUserPreferences
  ): Promise<UserPreferences | undefined> {
    const preferences = this.userPreferences.get(id);
    
    if (!preferences) {
      return undefined;
    }
    
    const updatedPreferences: UserPreferences = { 
      ...preferences, 
      ...updateData,
      userId: updateData.userId ?? preferences.userId,
      darkMode: updateData.darkMode ?? preferences.darkMode
    };
    this.userPreferences.set(id, updatedPreferences);
    
    return updatedPreferences;
  }
}

export const storage = new MemStorage();
