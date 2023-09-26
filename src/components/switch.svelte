<script lang="ts">
	import { slug } from "@sveu/shared"

	/**
	 * Whether the switch is required or not.
	 */
	export let required: boolean = false

	/**
	 * Whether the switch is disabled or not.
	 */
	export let disabled: boolean = false

	/**
	 * The name of the switch.
	 */
	export let name: string = ""

	/**
	 * The value of the switch.
	 */
	export let value: string | boolean = ""

	/**
	 * Either the switch is checked or not.
	 */
	export let checked: boolean = false

	/**
	 * The id of the switch.
	 */
	export let id: string = slug()

	/**
	 * The shape of the switch.
	 */
	export let shape: "square" | "round" = "round"
</script>

<button
	{disabled}
	on:click="{() => (checked = !checked)}"
	role="switch"
	aria-checked="{checked}"
	tabindex="0"
	class:square="{shape === 'square'}"
	class="switch">
	<input
		{id}
		{name}
		{value}
		{required}
		{disabled}
		type="checkbox"
		role="switch"
		tabindex="-1"
		bind:checked
		class="input" />
	<div class="circle">
		<slot name="icon" />
	</div>
	<div class="text_area on" aria-hidden="{!checked}">
		<slot name="on" />
	</div>
	<div class="text_area off" aria-hidden="{checked}">
		<slot name="off" />
	</div>
	<div class="background"></div>
</button>

<style>
	:global(.dark) {
		--switch-bg-color: 15, 16, 19;
		--switch-off-text-color: 255, 255, 255;
	}

	.switch {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		padding: 5px;
		border-radius: 20px;
		min-width: 48px;
		height: 28px;
		border: 0;
		position: relative;
		background: rgba(var(--switch-bg-color, 240, 243, 244), 1);
		transition: all 0.25s ease;
		overflow: hidden;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.switch:focus-visible {
		outline: 4px solid rgba(var(--switch-color, 255, 91, 255), 0.5);
		outline-offset: 1px;
		border-radius: 0.5rem;
	}

	.switch.square {
		border-radius: 5px;
	}

	.switch.square .background {
		border-radius: 5px !important;
	}

	.switch.square .circle {
		border-radius: 5px !important;
	}

	.switch:active {
		transform: scale(0.9);
	}

	.background {
		width: 100%;
		height: auto;
		position: absolute;
		background: rgba(var(--switch-color, 255, 91, 255), 1);
		border-radius: inherit;
		z-index: 2;
		transition: all 0.25s ease-out;
		transform: scale(1);
		left: -100%;
		border-radius: 50%;
		padding-bottom: 100%;
	}

	.text_area {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.7rem;
		padding: 5px;
		padding-left: 25px;
		transition: all 0.65s ease 50ms;
		color: rgba(var(--switch-off-text-color, 44, 62, 80), 1);
		z-index: 9;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.text_area.on {
		transform: translate(-100%);
		position: absolute;
		opacity: 0;
	}

	.circle {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		background: rgba(var(--switch-circle-bg, 255, 255, 255), 1);
		border-radius: 20px;
		transition: all 0.25s ease;
		position: absolute;
		z-index: 10;
		left: 4px;
		color: rgba(var(--switch-circle-color, 44, 62, 80), 1);
	}

	.input {
		position: absolute;
		width: 100%;
		opacity: 0 !important;
		z-index: -1;
		height: 100%;
		border-radius: inherit;
		top: 0;
		left: 0;
		margin: 0;
		cursor: pointer;
	}

	.input:active:checked ~ .circle {
		left: calc(100% - 30px);
	}

	.input:active ~ .circle {
		width: 25px;
	}

	.input:checked ~ .background {
		opacity: 1;
		transform: scale(1);
		width: 100%;
		padding-bottom: 100%;
		left: 0;
		border-radius: 50%;
		transition: all 0.25s ease;
	}

	.input:checked ~ .text_area {
		padding-left: 5px;
		padding-right: 25px;
		color: rgba(var(--switch-on-text-color, 255, 255, 255), 1);
	}

	.input:checked ~ .text_area.on {
		transform: translate(0);
		position: relative;
		opacity: 1;
	}

	.input:checked ~ .text_area.off {
		transform: translate(100%);
		position: absolute;
		opacity: 0;
	}

	.input:checked ~ .circle {
		left: calc(100% - 24px);
		box-shadow: -5px 0 25px 0 rgba(var(--switch-circle-shadow-bg, 255, 255, 255), 0.6);
		color: rgba(var(--switch-circle-color, 44, 62, 80), 1);
		transition: 0.5s;
	}
</style>
