import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreateTweetDTO } from './dtos/create-tweet.dto';
import { Tweet } from './entities/tweet';
import { error } from 'console';

@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];
  constructor() {
    this.users = [];
    this.tweets = [];
  }
  getHello(): string {
    return "I'm okay!";
  }

  postUsers(newUser: CreateUserDTO){
    const user = new User(newUser.username, newUser.avatar)
    return this.users.push(user);
  }

  postTweets(body: CreateTweetDTO){
    const user = this.users.find((user) => user.username === body.username)
    if(!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    
    const tweet = new Tweet(user, body.tweet);
    return this.tweets.push(tweet)

  }
}