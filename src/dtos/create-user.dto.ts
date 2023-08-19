import { IsNotEmpty, IsString, IsUrl } from "class-validator";


export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  avatar: string;
}