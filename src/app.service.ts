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
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    
    const tweet = new Tweet(user, body.tweet);
    return this.tweets.push(tweet)

  }

  getTweets(page: number){
    const tweetInScreen = []
    if(page < 1){
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    if(!page || page===1){
      const last15tweetrs = this.tweets.slice(-15);
      last15tweetrs.forEach((tweeter) =>{
          const username = tweeter.user.username
          const avatar = tweeter.user.avatar
          const tweet = tweeter.tweet;
          tweetInScreen.push({username, avatar, tweet});
      })
      
      return tweetInScreen
    }

    const begin = (page - 1) * 15 + 1;
    const end = begin + 14;

    const last15tweets = this.tweets.slice(-end, -begin + 1);

    last15tweets.forEach((tweeter) => {
      const username = tweeter.user.username
      const avatar = tweeter.user.avatar
      const tweet = tweeter.tweet;
      tweetInScreen.push({ username, avatar, tweet });
    });
    return tweetInScreen;
  }
}