import { Either, left, right } from './either';

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  } else {
    return left('error');
  }
}

it('Success result', () => {
  const result = doSomething(true);

  expect(result.isRight()).toBe(true);
  expect(result.isLeft()).toBe(false);
});

it('Error result', () => {
  const result = doSomething(false);

  expect(result.isRight()).toBe(false);
  expect(result.isLeft()).toBe(true);
});
