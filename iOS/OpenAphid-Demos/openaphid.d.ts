module aphid.g2d {
	export class Action {
		baseType: number;
		typeName: string;
		isTimeReversed: boolean;
		copy: () => aphid.g2d.Action;
	}
}