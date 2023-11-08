import { Console, Random } from '@woowacourse/mission-utils';

class App {
  constructor() {
    // 게임 진행 여부를 판별하는 상태 값
    this.status = true;
    this.computer = [];
  }

  // 랜덤 숫자 생성
  createRandomNumbers() {
    while (this.computer.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!this.computer.includes(number)) {
        this.computer.push(number);
      }
    }
  }

  // 유저가 입력한 값 유효성 판단
  validateUserInput(userInput) {
    if (userInput.length === 0) {
      throw new Error('[ERROR] 입력값이 없습니다.');
    }
    if (isNaN(userInput) || [...userInput].includes('0')) {
      throw new Error('[ERROR] 1~9 사이의 숫자를 입력하시오.');
    }
    if (userInput.length !== 3) {
      throw new Error('[ERROR] 3자리 숫자를 입력하시오.');
    }
    if (new Set(userInput).size !== 3) {
      throw new Error('[ERROR] 서로 다른 숫자를 입력하시오.');
    }

    return true;
  }

  // Strike & Ball 카운팅
  countBallAndStrike(computerInput, userInput) {
    let strike = 0;
    let ball = 0;

    computerInput.forEach((number, index) => {
      let check = 0;

      if (userInput.includes(String(number))) {
        check++;
      }
      if (String(number) === userInput[index]) {
        check++;
      }

      if (check === 2) {
        strike++;
      }
      if (check === 1) {
        ball++;
      }
    });
    return [strike, ball];
  }

  // 두 값 비교 결과 출력
  printResult([strike, ball]) {
    if (strike === 0 && ball === 0) {
      Console.print('낫싱');
    }
    if (strike !== 0 || ball !== 0) {
      Console.print(`${ball ? ball + '볼' : ''} ${strike ? strike + '스트라이크' : ''}`);
    }
    if (strike === 3) {
      Console.print(`3개의 숫자를 모두 맞히셨습니다! 게임 종료`);
    }
  }

  // 게임 진행 여부 확인
  gameContinueOrExit(userResponse) {
    if (userResponse === '1') {
      this.computer = [];
      this.createRandomNumbers();
    } else if (userResponse === '2') {
      this.status = false;
    } else {
      throw new Error('[ERROR] 1 또는 2를 입력해야 합니다.');
    }
  }

  async play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    this.createRandomNumbers();
    while (this.status) {
      const userInput = await Console.readLineAsync('숫자를 입력해 주세요 : ');
      if (this.validateUserInput(userInput)) {
        const userInputResult = this.countBallAndStrike(this.computer, userInput);
        this.printResult(userInputResult);
        if (userInputResult[0] === 3) {
          const userResponse = await Console.readLineAsync('새로운 게임을 시작하려면 1, 종료하려면 2를 입력하시오 ');
          this.gameContinueOrExit(userResponse);
        }
      }
    }
  }
}

const app = new App();
app.play();

export default App;
