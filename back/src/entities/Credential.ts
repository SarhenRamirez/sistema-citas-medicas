import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { ICredential } from "../interfaces/ICredential";

@Entity()
export class Credential implements ICredential {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToOne(() => User, (user) => user.credential)
  user!: User;
}