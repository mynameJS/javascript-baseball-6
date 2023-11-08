import { Console ,Random } from "@woowacourse/mission-utils";

const computer2 = Random.pickUniqueNumbersInRange(1, 3, 3);

async function getUsername() {
  try {
    const userInput = await Console.readLineAsync('번호을 입력해주세요.');
 
    const st = (com,userInput) => [...userInput].map(Number).filter((v,i)=>v===com[i]).length
    const stCount = st(computer2 ,userInput)

    const ball = (com,userInput) => 6 - new Set([...[...userInput].map((v) => +v), ...com]).size -stCount;
    const ballcount = ball(computer2 ,userInput)
  
    console.log(computer2,ballcount)
    stCount||ballcount? Console.print(`${stCount}스크라이크 ${ballcount}볼`):Console.print('낫싱');
   

  } catch (error) {
    // reject 되는 경우
  }
}
 getUsername();



// const st = (com,user) => [...user].map(Number).filter((v,i)=>v===com[i]).length

// console.log(st(computer2,input))

// console.log(getUsername())

class App {
  async play() {
    // const computer = [];
    // while (computer.length < 3) {
    //   const number = MissionUtils.Random.pickNumberInRange(1, 9);
    //   if (!computer.includes(number)) {
    //     computer.push(number);
    //   }
    // }

  }
}

export default App;