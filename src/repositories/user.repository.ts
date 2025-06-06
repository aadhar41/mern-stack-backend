import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {User, UserRelations, Post, Profile} from '../models';
import {PostRepository} from './post.repository';
import {ProfileRepository} from './profile.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly posts: HasManyRepositoryFactory<Post, typeof User.prototype.id>;

  public readonly profile: HasOneRepositoryFactory<Profile, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PostRepository') protected postRepositoryGetter: Getter<PostRepository>, @repository.getter('ProfileRepository') protected profileRepositoryGetter: Getter<ProfileRepository>,
  ) {
    super(User, dataSource);
    this.profile = this.createHasOneRepositoryFactoryFor('profile', profileRepositoryGetter);
    this.registerInclusionResolver('profile', this.profile.inclusionResolver);
    this.posts = this.createHasManyRepositoryFactoryFor('posts', postRepositoryGetter,);
    this.registerInclusionResolver('posts', this.posts.inclusionResolver);
  }

  async create(user: Partial<User>, options?: import('@loopback/repository').Options): Promise<User> {
    console.log('🚀 UserRepository: Before creating user', user);
    if (!user.phone || user.phone.trim() === '') {
      console.warn('UserRepository: phone is empty, setting default value');
      user.phone = 'N/A'; // Set a default value for phone if it's empty
    }
    const result = await super.create(user, options);
    console.log('✅ UserRepository: After creating user', result);
    return result;
  }
}
