import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Turno } from "./Turno";
import { Credential } from "./Credential";
import { IUser } from "../interfaces/IUser";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "date", nullable: true })
  birthdate!: string | null;

  @Column({ type: "int", nullable: true })
  nDni!: number | null;

  @Column({ type: "int" })
  credentialsId!: number;

  @OneToOne(() => Credential, (credential) => credential.user)
  @JoinColumn({ name: "credentialsId" })
  credential!: Credential;

  @OneToMany(() => Turno, (turno) => turno.user)
  turnos!: Turno[];
}