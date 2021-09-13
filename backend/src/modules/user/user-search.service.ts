import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { ApiResponse } from '@elastic/elasticsearch';
import { UserSearchBody, UserSearchResult } from './types/user-search';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class UserSearchService {
  private readonly index = 'user';

  constructor(private readonly elasticService: ElasticsearchService) {}

  async indexUser(user: UserEntity): Promise<ApiResponse> {
    return this.elasticService.index<UserSearchResult, UserSearchBody>({
      index: this.index,
      body: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  }

  async search(searchText: string): Promise<UserSearchBody[]> {
    const { body } = await this.elasticService.search<UserSearchResult>({
      index: this.index,
      body: {
        query: {
          query_string: {
            query: searchText + '*',
            fields: ['username^2', 'name', 'email'],
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async update(user: UserEntity): Promise<ApiResponse> {
    const body: UserSearchBody = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };
    const script = Object.entries(body).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: user.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
  }

  async remove(id: number): Promise<void> {
    this.elasticService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id,
          },
        },
      },
    });
  }
}
