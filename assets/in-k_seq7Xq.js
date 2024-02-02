import { r as ref, _ as _export_sfc, o as openBlock, c as createElementBlock, t as toDisplayString, u as unref } from "./app-CzfYzbQ0.js";
const a = ref(1);
const _hoisted_1 = { style: { "width": "100px" } };
const _sfc_main = {
  __name: "in",
  setup(__props) {
    const b = ref(2);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        _hoisted_1,
        "vue preview " + toDisplayString(unref(a)) + " " + toDisplayString(b.value),
        1
        /* TEXT */
      );
    };
  }
};
const _in = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "in.vue"]]);
export {
  _in as default
};
