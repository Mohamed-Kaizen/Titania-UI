---
title: Checkbox
---

## Default

<Tabs activeName="Svelte">
  <TabPanel name="Svelte">

```svelte live ln
<script>
    import Checkbox from "$components/checkbox.svelte"
</script>
<div class='flex items-center justify-center'>
<Checkbox> 
Checkbox
</Checkbox>

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
| **Space** | Toggles the checkbox.                                                     |
| **Enter** | Toggles the checkbox.                                                     |

<br/>
<br/>

## API

<br/>
<br/>

### Props

<br/>

| Prop           | Type      | Default | Description                                                    |
| -------------- | --------- | ------- | -------------------------------------------------------------- |
| **id**         | `string`  |`slug()` | The id of the checkbox.                                        |
| **name**       | `string`  | `""`    | The name of the checkbox.                                      |
| **value**      | `string`  | `""`    | The value of the checkbox.                                     |
| **group**      | `any[]`   | `[]`    | The group of the checkbox.                                     |
| **checked**    | `boolean` | `false` | Either the checkbox is checked or not.                         |
| **disabled**   | `boolean` | `false` | Whether the checkbox is disabled or not.                       |
| **required**   | `boolean` | `false` | Whether the checkbox is required or not.                       |
| **strikethrough** | `boolean` | `false` | Whether the checkbox should have a strikethrough on the label when checked. |
| **indeterminate** | `boolean` | `false` | Whether the checkbox is indeterminate or not. |
| **loading**    | `boolean` | `false` | Whether the checkbox is loading or not.                        |

<br/>
<br/>

### CSS Variables

<br/>

| Variable                             | Default       | Description                                     |
| ------------------------------------ | ------------- | ----------------------------------------------- |
| **--checkbox-width**                 | `23px`        | The width of the checkbox.                      |
| **--checkbox-height**                | `23px`        | The height of the checkbox.                     |
| **--checkbox-color**                 |`255, 91, 255` | The color of the checkbox.                      |
| **--checkbox-box-bg-color**          |`192, 189, 189`| The background color of the checkbox box.       |
| **--checkbox-box-border-color**      |`192, 189, 189`| The border color of the checkbox box.           |
| **--checkbox-mark-color**            | `#fff`        | The color of the checkbox mark.                 |
| **--checkbox-disabled-opacity**      | `0.5`         | The opacity of the checkbox when disabled.      |
| **--checkbox-loading-border-radius** | `9999px`      | The border radius of the checkbox when loading. |

<br/>
<br/>

## Source code

<br/>

<Tabs activeName="Svelte">
  <TabPanel name="Svelte">

```svelte
<script lang="ts">
    import { on } from "@sveu/browser"

    import { browser, slug } from "@sveu/shared"

    /**
     * Whether the checkbox should have a strikethrough on the label when checked.
     */
    export let strikethrough: boolean = false

    /**
     * Whether the checkbox is indeterminate or not.
     */
    export let indeterminate: boolean = false

    /**
     * Whether the checkbox is loading or not.
     */
    export let loading: boolean = false

    /**
     * Whether the checkbox is required or not.
     */
    export let required: boolean = false

    /**
     * Whether the checkbox is disabled or not.
     */
    export let disabled: boolean = false

    /**
     * The name of the checkbox.
     */
    export let name: string = ""

    /**
     * The value of the checkbox.
     */
    export let value: string | boolean = ""

    /**
     * The group of the checkbox.
     */
    export let group: any[] = []

    /**
     * Either the checkbox is checked or not.
     */
    export let checked: boolean = group.includes(value)

    /**
     * The id of the checkbox.
     */
    export let id: string = slug()

    let js = false

    if (browser) js = true

    /**
     * A function that prevents the default behavior of an event.
     *
     * @param node - The node to prevent the default behavior of.
     *
     * @returns A cleanup function that removes the event listener.
     */
    function prevent_default<T extends HTMLElement>(node: T) {
        const cleanup = on(node, "click", (e: Event) => e.preventDefault())

        return {
            destroy() {
                cleanup()
            },
        }
    }

    function change_checkbox_state() {
        if (indeterminate && checked) indeterminate = false
        else checked = !checked

        // If the checkbox is not indeterminate, update the group
        if (!indeterminate) {
            // If the checkbox is not checked, remove its value from the group
            if (!checked && group.includes(value)) group = group.filter((v) => v !== value)
            // If the checkbox is checked, add its value to the group
            if (checked && !group.includes(value)) group = [...group, value]
        }
    }
</script>

<button
    {disabled}
    on:click="{change_checkbox_state}"
    class:loading
    class:checked
    class:disable="{disabled}"
    class="checkbox"
    role="checkbox"
    aria-checked="{indeterminate ? 'mixed' : checked}"
    aria-disabled="{disabled}"
    tabindex="{js ? 0 : -1}">
    <div class="checkbox_container">
        <input
            {id}
            {name}
            {value}
            {required}
            {disabled}
            type="checkbox"
            tabindex="{js ? -1 : 0}"
            aria-disabled="{disabled}"
            use:prevent_default
            bind:checked
            bind:group
            class:invisible="{js}"
            class="checkbox_input" />
        <div class="checkbox_box">
            <i class:indeterminate>
                <span class="checkbox_mark">
                    <div class="checkbox_mark_line1"></div>
                    <div class="checkbox_mark_line2"></div>
                </span>
            </i>
        </div>
        {#if loading}
            <div class="loading_container">
                <svg viewBox="0 0 50 50" class="loading_item loading_1">
                    <circle style="stroke-dasharray: 60 150;" class="path" cx="25" cy="25" r="25">
                    </circle>
                </svg>
                <svg viewBox="0 0 50 50" class="loading_item loading_2">
                    <circle style="stroke-dasharray: 5 130;" class="path" cx="25" cy="25" r="25">
                    </circle>
                </svg>
            </div>
        {/if}
    </div>
    <label
        use:prevent_default
        for="{id}"
        class:label_through="{checked && strikethrough}"
        class="label">
        <slot />
    </label>
</button>

<style>
    :global(.dark) {
        --checkbox-box-bg-color: 15, 16, 19;
        --checkbox-box-border-color: 0, 11, 14;
    }

    .disable {
        pointer-events: none;
        opacity: var(--checkbox-disabled-opacity, 0.5);
    }

    .invisible {
        opacity: 0;
    }

    .indeterminate span {
        transform: rotate(0);
        height: auto;
        margin: 0;
        width: 0;
    }

    .indeterminate span:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 2px;
        border-radius: 2px;
        background: #fff;
        display: block;
        transition: all 0.25s ease;
    }

    .indeterminate span .checkbox_mark_line1 {
        transform: rotate(-45deg);
        bottom: 0;
        right: -1px;
        opacity: 0;
        display: none;
    }

    .indeterminate span .checkbox_mark_line2 {
        right: 0 !important;
        bottom: -14px !important;
        transform: rotate(45deg) !important;
        transition: all 0.25s ease !important;
        height: 11px !important;
        display: none;
    }

    .loading {
        pointer-events: none;
    }

    .loading.checked .checkbox_box {
        opacity: 0;
        transition: all 0.2s linear;
        background: 0 0 !important;
    }

    .loading.checked .checkbox_box:after {
        transition:
            all 0.2s linear,
            opacity 0.6s linear;
        transform: scale(0.5);
    }

    .loading .checkbox_box {
        background: 0 0 !important;
    }

    .loading .checkbox_box:before {
        opacity: 0 !important;
        border-radius: 50%;
    }

    .loading .checkbox_box:after {
        opacity: 0 !important;
        border-radius: 50%;
        transform: scale(0.5);
    }

    .path {
        stroke: currentColor;
        stroke-width: 10;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
    }

    .loading_1 {
        animation: rotating 0.88s ease infinite 0.11s;
    }

    .loading_2 {
        opacity: 0.6;
        animation: rotating 0.88s linear infinite;
    }

    .checkbox {
        display: flex;
        position: relative;
        justify-content: flex-start;
        align-items: center;
    }

    .checkbox:focus-visible {
        outline: 4px solid rgba(var(--checkbox-color, 255, 91, 255), 0.5);
        outline-offset: 2px;
        border-radius: 0.5rem;
    }

    .checkbox:hover .checkbox_box {
        background: rgba(var(--checkbox-box-bg-color, 192, 189, 189), 1);
    }

    .checkbox:hover .checkbox_box:before {
        border: 2px solid rgba(var(--checkbox-box-border-color), 0);
    }

    .checkbox.checked:hover .checkbox_box {
        box-shadow: 0 3px 15px 0 rgba(var(--checkbox-color, 255, 91, 255), 1);
    }

    .checkbox.checked .checkbox_box {
        box-shadow: 0 0 0 0 rgba(var(--checkbox-color, 255, 91, 255), 1);
    }

    .checkbox.checked .checkbox_box:after {
        opacity: 1;
        transform: scale(1);
    }

    .checkbox.checked .checkbox_box:before {
        opacity: 0;
        transform: scale(1.2);
    }

    .checkbox_container {
        position: relative;
        width: var(--checkbox-width, 23px);
        height: var(--checkbox-height, 23px);
    }

    .checkbox_input {
        cursor: pointer;
        accent-color: rgba(var(--checkbox-color, 255, 91, 255), 1);
        margin: 0px;
        padding: 0px;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        position: absolute;
    }

    .checkbox_box {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        border-radius: 32%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        pointer-events: none;
        transition: all 0.25s ease;
    }

    .checkbox_box:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(var(--checkbox-color, 255, 91, 255), 1);
        transform: scale(0.5);
        border-radius: inherit;
        opacity: 0;
        transition: all 0.25s ease;
        z-index: -1;
    }

    .checkbox_box:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: inherit;
        transition: all 0.25s ease;
        z-index: -1;
        border: 2px solid rgba(var(--checkbox-box-border-color, 192, 189, 189), 1);
    }

    .checkbox_mark {
        height: 0.8125rem;
        margin-top: -0.25rem;
        width: 0.5rem;
        rotate: 45deg;
        display: block;
        position: relative;
    }

    .checkbox_mark_line1 {
        content: "";
        position: absolute;
        height: 2px;
        transition: all 0.2s ease;
        z-index: 100;
        width: 8px;
        bottom: 0;
    }

    .checkbox_mark_line1:after {
        content: "";
        position: absolute;
        width: 0;
        height: 2px;
        background: var(--checkbox-mark-color, #fff);
        transition: all 0.25s ease;
        left: auto;
        right: 0;
    }

    .checked .checkbox_mark_line1:after {
        width: 100%;
        transition: all 0.2s ease 0.1s;
        left: 0;
        right: auto;
    }

    .checkbox_mark_line2 {
        bottom: 0;
        right: 0;
        z-index: 100;
        content: "";
        position: absolute;
        height: 13px;
        transition: all 0.2s ease;
        width: 2px;
    }

    .checkbox_mark_line2:after {
        content: "";
        position: absolute;
        width: 2px;
        height: 0;
        background: var(--checkbox-mark-color, #fff);
        transition: all 0.25s ease;
        bottom: 0;
    }

    .checked .checkbox_mark_line2:after {
        transition: all 0.2s ease 0.25s;
        height: 100%;
    }

    .loading_container {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        max-width: 3.125rem;
        max-height: 3.125rem;
        margin: auto;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: var(--checkbox-loading-border-radius, 9999px);
        color: rgba(var(--checkbox-color, 255, 91, 255), 1);
    }

    .loading_item {
        border-radius: var(--checkbox-loading-border-radius, 9999px);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
    }

    .label {
        cursor: pointer;
        user-select: none;
        padding: 0.5rem;
        position: relative;
        font-size: 0.9rem;
    }

    .label_through {
        text-decoration-line: line-through;
        opacity: 0.4;
    }

    @keyframes rotating {
        100% {
            transform: rotate(360deg);
        }
    }
    </style>
```

  </TabPanel>

  <TabPanel name="Vue">
    <h1>Coming Soon</h1>
  </TabPanel>
</Tabs>
