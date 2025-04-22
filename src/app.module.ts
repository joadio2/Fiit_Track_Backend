import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { EmailModule } from './email/email.module';
import { RutineModule } from './rutine/rutine.module';
import { GoalModule } from './goal/goal.module';
@Module({
  imports: [UserModule, AuthModule, LoginModule, EmailModule, RutineModule, GoalModule],
})
export class AppModule {}
