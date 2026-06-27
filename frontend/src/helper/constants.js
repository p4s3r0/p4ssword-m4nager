export const DIALOG_DEFAULT_PROPS = {
  position: window.innerWidth < 1024 ? "bottom" : "center",
  draggable: false,
  dismissableMask: true,
  modal: true,
  style: {
    width: window.innerWidth < 1024 ? "98vw" : "800px"
  }
};

export const TOAST_LIFESPAN = 2000;