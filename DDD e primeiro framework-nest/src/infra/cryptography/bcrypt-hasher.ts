import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 10;

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.HASH_SALT_LENGTH);
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash);
  }
}
