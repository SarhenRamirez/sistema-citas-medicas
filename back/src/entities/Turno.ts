import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

export type EstadoTurno = "agendado" | "cancelado";

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fecha!: string; 

  @Column()
  hora!: string; 

  @Column({
    type: "varchar",
    default: "agendado",
  })
  estado!: EstadoTurno;

  @CreateDateColumn()
  creadoEn!: Date;

  @ManyToOne(() => User, (user) => user.turnos, { eager: true })
  user!: User;
}
