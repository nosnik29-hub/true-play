import { createPopper } from "@popperjs/core";

interface PopperOptions {
  width: string; // Adjust the type according to your needs
}

const withPopper = (
  dropdownList: HTMLElement,
  component: VueComponent, // Replace 'VueComponent' with the actual type of your component
  { width }: PopperOptions
) => {
  // Explicitly set the dropdown width
  dropdownList.style.width = width;

  // Create Popper instance
  const popper = createPopper(component.$refs.toggle, dropdownList, {
    placement: "bottom", // Adjust as needed
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -1],
        },
      },
      {
        name: "toggleClass",
        enabled: true,
        phase: "write",
        fn({ state }) {
          // Toggle 'drop-up' class based on placement
          component.$el.classList.toggle("drop-up", state.placement === "top");
        },
      },
    ],
  });

  // Cleanup function to destroy Popper instance
  const destroyPopper = () => popper.destroy();

  // Return an object with destroyPopper function
  return { destroyPopper };
};

export default withPopper;

// Example of a Vue component type (replace with your actual type):
interface VueComponent {
  $refs: {
    toggle: HTMLElement;
  };
  $el: HTMLElement;
  // Add other properties as needed
}
