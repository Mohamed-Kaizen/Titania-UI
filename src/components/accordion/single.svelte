<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import { browser } from "@sveu/shared"

	import { slide } from "svelte/transition"

	export let id = 0

	export let opened = 0

	export let disabled = false

	function keyDown(event: KeyboardEvent) {
		if (
			[
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				"PageUp",
				"PageDown",
				"End",
				"Home",
			].includes(event.code)
		) {
			event.preventDefault()

			const is_up = event.code === "ArrowUp" || event.code === "PageUp"

			const is_down =
				event.code === "ArrowDown" || event.code === "PageDown"

			const is_home = event.code === "Home"

			const is_end = event.code === "End"

			const is_right = event.code === "ArrowRight"

			const is_left = event.code === "ArrowLeft"

			let buttons = [
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				...event.target.parentNode.parentNode.parentNode.querySelectorAll(
					"button"
				),
			]

			buttons = buttons.filter((button) => !button.disabled)

			const index = buttons.findIndex((button) => button === event.target)

			if (is_right) dispatch("selected", id)

			if (is_left) dispatch("selected", 0)

			if (is_up) buttons.at(index - 1)?.focus()

			if (is_home) buttons[0]?.focus()

			if (is_end) buttons.at(-1)?.focus()

			if (is_down)
				buttons[index + 1]
					? buttons[index + 1].focus()
					: buttons[0]?.focus()
		}
	}

	let no_jS = true

	if (browser) no_jS = false

	const dispatch = createEventDispatcher()
</script>

<div
	class="border-l rounded-xl bg-purple-100 border-l-6 border-purple-400 grid px-2 transition transition-all gap-0.5 duration-650 rtl:(border-r border-r-6 border-l-0) "
	class:my-4="{id === opened}"
	class:-mx-4="{id === opened}"
	class:bg-purple-50="{disabled}"
	class:border-purple-200="{disabled}">
	{#if no_jS}
		<h2 class="ml-4 rtl:mr-4">
			<slot name="title" />
		</h2>
		<p>
			<slot name="content" />
		</p>
		<br />
	{:else}
		<h3 class="h-10 w-full px-2">
			<button
				id="accordion-header-{id}"
				disabled="{disabled}"
				on:keydown="{keyDown}"
				type="button"
				aria-controls="accordion-content-{id}"
				aria-expanded="{id == opened}"
				aria-disabled="{disabled}"
				class="flex h-full  w-full items-center justify-between focus:outline-none focus-visible:(ring-3 rounded-xl ring-violet-700) disabled:red-bg-500 "
				class:cursor-not-allowed="{disabled}"
				on:click="{() => dispatch('selected', id)}">
				<div class="flex space-x-2 items-center">
					<slot name="p-icon" />
					<slot name="title" />
				</div>

				<slot name="a-icon" />
			</button>
		</h3>
		{#if id == opened}
			<section
				id="accordion-header-{id}"
				aria-labelledby="accordion-content-{id}"
				aria-hidden="{id !== opened}"
				class="p-2"
				transition:slide>
				<slot name="content" />
			</section>
		{/if}
	{/if}
</div>
