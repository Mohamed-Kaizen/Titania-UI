---
title: Radio
---

## Default

<Tabs activeName="Svelte">
  <TabPanel name="Svelte">

```svelte live ln
<script>
    import Radio from "$components/radio.svelte"

    let selected = ""
</script>

<div class='flex flex-col space-y-5'>

<Radio value="cat" bind:group="{selected}">Cat</Radio>

<Radio value="dog" bind:group="{selected}">Dog</Radio>

<Radio value="bird" bind:group="{selected}">Bird</Radio>

</div>
```

  </TabPanel>

  <TabPanel name="Vue">
<h1>Coming Soon</h1>
  </TabPanel>
</Tabs>

<br/>
<br/>

## Accessibility

<br/>
<br/>

### Keyboard Interaction

<br/>

| Key       | Function                                                                  |
| --------- | ------------------------------------------------------------------------- |
| **Space** | Toggles the radio.                                                        |
| **Enter** | Toggles the radio.                                                        |

<br/>
<br/>

## API

<br/>
<br/>

### Props

<br/>

| Prop           | Type      | Default | Description                                                    |
| -------------- | --------- | ------- | -------------------------------------------------------------- |
| **required**   | `boolean` | `false` | Whether the radio is required or not.                          |
| **disabled**   | `boolean` | `false` | Whether the radio is disabled or not.                          |
| **name**       | `string`  | `""`    | The name of the radio.                                         |
| **value**      | `string`  | `""`    | The value of the radio.                                        |
| **group**      | `unknown` | `""`    | The group of the radio.                                        |
| **id**         | `string`  | `""`    | The id of the radio.                                           |

<br/>
<br/>

### CSS Variables

<br/>

| Variable                             | Default       | Description                                     |
| ------------------------------------ | ------------- | ----------------------------------------------- |
| **--radio-color**                    | `255, 112, 0` | The color of the radio.                         |
| **--radio-box-border-color**         | `44, 62, 80`  | The border color of the radio.                  |
| **--radio-width**                    | `20px`        | The width of the radio.                         |
| **--radio-height**                   | `20px`        | The height of the radio.                        |
| **--radio-min-width**                | `20px`        | The min width of the radio.                     |
| **--radio-min-height**               | `20px`        | The min height of the radio.                    |
| **--radio-border-radius**            | `50%`         | The border radius of the radio.                 |

<br/>
<br/>

## Source code

<br/>

<Tabs activeName="Svelte">
  <TabPanel name="Svelte">

```svelte
<script lang="ts">
    import { slug } from "@sveu/shared"

    /**
     * Whether the radio is required or not.
     */
    export let required: boolean = false

    /**
     * Whether the radio is disabled or not.
     */
    export let disabled: boolean = false

    /**
     * The name of the radio.
     */
    export let name: string = ""

    /**
     * The value of the radio.
     */
    export let value: string | boolean = ""

    /**
     * The group of the radio.
     */
    export let group: unknown

    /**
     * The id of the radio.
     */
    export let id: string = slug()
</script>

<button
    {disabled}
    on:click="{() => (group = value)}"
    class="wrapper"
    role="radio"
    aria-checked="{group === value}"
    aria-disabled="{disabled}">
    <div class="radio">
        <input
            {value}
            {id}
            {name}
            {required}
            {disabled}
            type="radio"
            tabindex="-1"
            aria-disabled="{disabled}"
            bind:group />
        <span class="box"></span>
    </div>
    <label for="{id}" class="label">
        <slot />
    </label>
</button>

<style>
    :global(.dark) {
        --radio-box-border-color: 255, 255, 255;
    }

    .label {
        cursor: pointer;
        user-select: none;
    }

    .wrapper {
        display: flex;
        align-items: center;
        position: relative;
        gap: 6px;
    }

    .wrapper:focus-visible {
        outline: 4px solid rgba(var(--radio-color, 255, 112, 0), 0.5);
        outline-offset: 2px;
        border-radius: 0.5rem;
    }

    .radio {
        width: var(--radio-width, 20px);
        height: var(--radio-height, 20px);
        min-width: var(--radio-min-width, 20px);
        min-height: var(--radio-min-height, 20px);
        border-radius: var(--radio-border-radius, 50%);
        position: relative;
        z-index: 10;
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        left: 0;
        top: 0;
        transition: all 0.25s ease;
        box-sizing: border-box;
        z-index: 10;
    }

    .box:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        border: 2px solid rgba(var(--radio-box-border-color, 44, 62, 80), 0.35);
        box-sizing: border-box;
        transition: all 0.25s ease;
        display: block;
        box-shadow: 0 0 0 0 rgba(var(--radio-color, 255, 112, 0), 0.4);
    }

    .radio input {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 100;
        opacity: 0;
        cursor: pointer;
    }

    .radio input:active ~ .box:after {
        transform: scale(0.9);
    }

    .radio input:checked ~ .box:after {
        border: 7px solid rgba(var(--radio-color, 255, 112, 0), 1);
        animation-name: radio;
        animation-duration: 4s;
        animation-play-state: paused;
        animation-iteration-count: infinite;
        box-shadow: 0 3px 10px 0 rgba(var(--radio-color, 255, 112, 0), 1);
    }
</style>
```

  </TabPanel>

  <TabPanel name="Vue">
    <h1>Coming Soon</h1>
  </TabPanel>
</Tabs>
