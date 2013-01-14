module aphid.g2d {
	export class Action {
		baseType: number;
		typeName: string;
		isTimeReversed: bool;
		copy: () => aphid.g2d.Action;
		reverse: () => aphid.g2d.Action;
	}

	export class FiniteTimeAction extends aphid.g2d.Action {
		duration: number;
	}
}