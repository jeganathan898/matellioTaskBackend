import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  gender: string;

  @Column()
  phoneNo: string;

  @Column()
  dob: string;

  @Column('simple-json', { nullable: true })
  address: {
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  }[];

  @Column({ type: 'text', nullable: true })
  refreshToken:string

  @Column({ type: 'boolean', default: false })
  isLogin: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
      if (this.password) {
          this.password = await bcrypt.hash(this.password, 10);
      }
  }

  async comparePassword(enteredPassword: string): Promise<boolean> {
      return bcrypt.compare(enteredPassword, this.password);
  }

}