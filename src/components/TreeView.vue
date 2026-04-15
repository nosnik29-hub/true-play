<template>
  <Listbox
    v-model="selected"
    as="div"
    class="w-[200px]"
  >
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      Assigned to
    </ListboxLabel>
    <div class="relative mt-2">
      <div class="relative mt-2 rounded-md shadow-sm">
        <input
          id="price"
          class="block w-full rounded-md border-0 py-1.5 pl-1 pr-20 text-gray-900 sm:text-sm sm:leading-6"
          name="price"
          placeholder="0.00"
          type="text"
        />
        <div class="absolute inset-y-0 right-0 flex items-center">
          <label
            class="sr-only"
            for="currency"
          >
            Currency
          </label>
          <ListboxButton
            class="relative cursor-default rounded-md bg-white text-left mr-2 h-full text-gray-900 focus:outline-none sm:text-sm sm:leading-6"
          >
            <ChevronUpDownIcon
              aria-hidden="true"
              class="h-5 w-5 text-gray-400"
            />
          </ListboxButton>
        </div>
      </div>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="person in people"
            :key="person.id"
            v-slot="{ active, selected }"
            as="template"
            :value="person"
          >
            <li
              :class="[
                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-8 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ person.name }}
              </span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
                ]"
              >
                <CheckIcon
                  aria-hidden="true"
                  class="h-5 w-5"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

const selected = ref(people[3]);
</script>
