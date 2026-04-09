import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Turno } from "./Turno";
import { Credential } from "./Credential";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToOne(() => Credential, (credential) => credential.user)
  credential!: Credential;

  @OneToMany(() => Turno, (turno) => turno.user)
  turnos!: Turno[];
}
