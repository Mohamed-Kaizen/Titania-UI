<script lang="ts">
	import { browser } from "@sveu/shared"

	import { slide } from "svelte/transition"

	export let id = 0

	export let disabled = false

	interface $$Slots {
		title: unknown

		content: unknown

		"p-icon": { opened: boolean }

		"a-icon": { opened: boolean }

		default: { opened: boolean }
	}

	let opened = false

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

			buttons = buttons.filter(function (button) {
				return !button.disabled
			})

			const index = buttons.findIndex((button) => button === event.target)

			if (is_right) opened = true

			if (is_left) opened = false

			if (is_up) buttons.at(index - 1)?.focus()

			if (is_home) buttons[0]?.focus()

			if (is_end) buttons.at(-1)?.focus()

			if (is_down)
				buttons[index + 1]
					? buttons[index + 1].focus()
					: buttons[0]?.focus()
		}
	}

	let no_js = true

	if (browser) no_js = false
</script>

<div
	class="bg-white shadow grid px-2 transition transition-all gap-0.5 duration-650 dark:bg-gray-700"
	class:my-4="{opened}"
	class:mx-4="{opened}">
	{#if no_js}
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
				aria-expanded="{opened}"
				aria-disabled="{disabled}"
				class="flex h-full  w-full items-center justify-between focus:outline-none focus-visible:(ring-3 rounded-xl ring-violet-700) disabled:red-bg-500 "
				class:cursor-not-allowed="{disabled}"
				on:click="{() => (opened = !opened)}">
				<div class="flex space-x-2 items-center">
					<slot opened="{opened}" name="p-icon" />
					<slot name="title" />
				</div>

				<slot opened="{opened}" name="a-icon" />
			</button>
		</h3>
		{#if opened}
			<section
				id="accordion-header-{id}"
				aria-labelledby="accordion-content-{id}"
				aria-hidden="{opened}"
				class="p-2"
				transition:slide>
				<slot name="content" />
			</section>
		{/if}
	{/if}
</div>
