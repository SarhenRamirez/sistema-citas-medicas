import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  RelationId,
} from "typeorm";
import { User } from "./User";
import { IAppointment, AppointmentStatus } from "../interfaces/IAppointment";

@Entity()
export class Turno implements IAppointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  time!: string;

  @Column({ type: "varchar", default: "active" })
  status!: AppointmentStatus;

  @CreateDateColumn()
  creadoEn!: Date;

  @ManyToOne(() => User, (user) => user.turnos, { eager: true })
  user!: User;

  @RelationId((turno: Turno) => turno.user)
  userId!: number;
}
