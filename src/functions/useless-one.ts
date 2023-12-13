export default function uselessFunc(x: number): number {
	if (x < 100) throw new Error("x is lower than 100");
	if (x > 200) throw new Error("x is higher than 200");
	return x;
}
