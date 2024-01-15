//!native
//!optimize 2

import Signal from "@rbxts/signal";
import { t } from "@rbxts/t";

export default class SocialConfiguration<T extends object> {
	public readonly changed = new Signal<(configuration: T) => void>();

	public constructor(
		private readonly initialValues: T,
		private readonly validate: t.check<Partial<T>> = ((value: unknown) => true) as t.check<T>,
	) {
		this.values = initialValues;
	}

	/**
	 * Configures the configuration with a new set of values.
	 * @param configuration
	 */
	public configure(configuration: Partial<T>) {
		if (!this.validate(configuration)) throw "Invalid configuration passed to SocialConfiguration!";
		this.values = { ...this.values, ...configuration };
		this.changed.Fire(this.values);
	}

	/**
	 * Gets the current configuration values.
	 * @returns
	 */
	public getValues() {
		return this.values;
	}

	/**
	 * Resets the configuration to its initial values.
	 */
	public reset() {
		this.values = table.clone(this.initialValues);
		this.changed.Fire(this.values);
	}

	/**
	 * Destroys the configuration.
	 */
	public Destroy() {
		this.changed.Destroy();
		table.clear(this);
		setmetatable(this, undefined!);
	}

	public destroy() {
		this.Destroy();
	}

	private values: T;
}
