/*
 * @Author: laoqiren 
 * @Date: 2018-07-09 16:17:53 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-11 17:20:19
 */


class Maths {
    static factorial(num: number, total: number = 1): number {
        if(num === 1) {
            return total;
        }
        return Maths.factorial(num - 1, num * total);
    }
    static * fibonacci(n: number, ac1: number = 0, ac2: number = 1) {
        if(n <= 0) {
            return;
        }
        yield ac1;
        yield * Maths.fibonacci(n - 1, ac2, ac1 + ac2);
    }
    static GCD(num1: number, num2: number): number {
        const a = Math.abs(Math.max(num1, num2)),
            b = Math.abs(Math.min(num1, num2));
        return b === 0 ? a : Maths.GCD(b, a % b);
    }
    static LCM(num1: number, num2: number): number {
        return (num1 === 0 || num2 === 0) ? 0 : Math.abs(num1 * num2) / Maths.GCD(num1, num2);
    }
}

export default Maths;