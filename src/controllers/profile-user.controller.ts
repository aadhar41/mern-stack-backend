import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Profile,
  User,
} from '../models';
import {ProfileRepository} from '../repositories';

export class ProfileUserController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
  ) { }

  @get('/profiles/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Profile',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Profile.prototype.id,
  ): Promise<User> {
    return this.profileRepository.user(id);
  }
}
