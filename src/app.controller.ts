import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreateTweetDTO } from './dtos/create-tweet.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/sign-up")
  postUsers(@Body() body: CreateUserDTO, @Res() res: Response){
    //fazer retorno de 200
    const user = this.appService.postUsers(body);
    res.status(200).json(user);
  }

  @Post("/tweets")
  postTweets(@Body() body: CreateTweetDTO){
    return this.appService.postTweets(body);
  }

  @Get("/tweets")
  getTweets(@Query('page') pageParam:string){
    const page = parseInt(pageParam);
    return this.appService.getTweets(page);
  }

  @Get("/tweets/:username")
  getTweetsFromUser(@Param('username') username: string){
    return this.appService.getTweetsFromUser(username);
  }
}
