<script lang="ts">
	const links = [
		{
			name: "Accordion",
			sub_links: [
				{ name: "single", link: "/accordion" },
				{ name: "multi", link: "/accordion/multi" },
			],
		},
	]
</script>

<ul>
	{#each links as { name, sub_links }}
		<h1 class="font-bold text-lx uppercase">{name}</h1>
		<ul class="space-y-2 mt-2  px-8 uppercase">
			{#each sub_links as { name: _name, link }}
				<li><a href="{link}">{_name}</a></li>
			{/each}
		</ul>
	{/each}
</ul>
