import { IsNotEmpty, IsString, IsUrl } from "class-validator";


export class CreateTweetDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  tweet: string;
}