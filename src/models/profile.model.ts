import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Profile extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'number',
  })
  age?: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  history?: string[];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Profile>) {
    super(data);
  }
}

export interface ProfileRelations {
  // describe navigational properties here
}

export type ProfileWithRelations = Profile & ProfileRelations;
