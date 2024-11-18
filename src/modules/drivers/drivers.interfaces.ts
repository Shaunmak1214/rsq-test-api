import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IDriver {
  name: string;
  age: number;
  profileImage: string;
}

export interface IDriverDoc extends IDriver, Document {}

export interface IDriverModel extends Model<IDriverDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewCreatedDriver = IDriver;

export type UpdateDriverBody = Partial<IDriver>;
