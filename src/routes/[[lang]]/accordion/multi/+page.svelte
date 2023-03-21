<script lang="ts">
	const list = [
		{ title: "First", disabled: true },
		{ title: "Second", disabled: false },
		{ title: "Third", disabled: false },
	]
</script>

{#each list as { title, disabled }, index}
	<!-- svelte-ignore missing-declaration -->
	<AccordionMulti id="{index + 1}" disabled="{disabled}" let:opened>
		<div class:text-gray-400="{disabled}" slot="title">
			{title}
		</div>

		<svg
			slot="p-icon"
			class="h-4 fill-current transform transition-transform w-4 duration-550 rtl:rotate-180"
			class:rotate-90="{opened}"
			class:rtl:rotate-90="{opened}"
			class:text-gray-400="{disabled}"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			><path fill="currentColor" d="m6 15l5-5l-5-5l1-2l7 7l-7 7z"></path
			></svg>
		<svg
			slot="a-icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			class="h-4 fill-current transform transition-transform w-4 duration-550"
			class:rotate-180="{opened}"
			class:text-gray-400="{opened}">
			<path d="m5 6l5 5l5-5l2 1l-7 7l-7-7z"></path>
		</svg>

		<div slot="content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
			ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
			aliquip ex ea commodo consequat.
		</div>
	</AccordionMulti>
{/each}
