/**
 * @fileoverview GitHub Linguist language color mappings.
 * Provides hex color codes for various programming languages to maintain
 * consistency with GitHub's visual representation.
 */

/**
 * Map of programming language names to their corresponding hex color codes.
 * Colors are sourced from the GitHub Linguist project for visual consistency.
 * @const {Record<string, string>}
 */
export const languageColors: Record<string, string> = {
  // Web Technologies
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#1572b6",
  SCSS: "#c6538c",
  Sass: "#a53b70",
  Less: "#1d365d",
  Vue: "#4fc08d",
  Svelte: "#ff3e00",
  Angular: "#dd0031",
  React: "#61dafb",
  "Next.js": "#000000",
  "Nuxt.js": "#00dc82",
  Astro: "#ff5d01",
  Solid: "#2c4f7c",
  Qwik: "#ac7ef4",

  // Backend Languages
  Python: "#3776ab",
  Java: "#b07219",
  "C#": "#239120",
  "C++": "#00599c",
  C: "#a8b9cc",
  Go: "#00add8",
  Rust: "#dea584",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Swift: "#fa7343",
  Kotlin: "#a97bff",
  Scala: "#c22d40",
  Dart: "#00b4ab",
  R: "#198ce7",
  MATLAB: "#e16737",
  Perl: "#39457e",
  Lua: "#000080",
  Haskell: "#5e5086",
  Clojure: "#db5855",
  Elixir: "#6e4a7e",
  Erlang: "#b83998",
  "F#": "#b845fc",
  OCaml: "#3be133",
  Reason: "#ff5847",
  D: "#ba595e",
  Nim: "#ffc200",
  Crystal: "#000100",
  Zig: "#ec915c",
  V: "#4f87c4",
  Nix: "#7e7eff",

  // Scripting & Shell
  Shell: "#89e051",
  PowerShell: "#012456",
  Batchfile: "#c1f12e",
  Dockerfile: "#384d54",
  Makefile: "#427819",
  CMake: "#da3434",

  // Data & Config
  YAML: "#cb171e",
  JSON: "#000000",
  XML: "#0050ec",
  Markdown: "#083fa1",
  TeX: "#3d6117",
  LaTeX: "#008080",
  AsciiDoc: "#73a0c5",
  reStructuredText: "#141414",

  // Assembly & Low-level
  Assembly: "#6e4c13",
  WebAssembly: "#654ff0",
  LLVM: "#185619",
  Verilog: "#b2b7f8",
  SystemVerilog: "#dae1c2",
  VHDL: "#adb2cb",
  Tcl: "#e4cc98",

  // Infrastructure & DevOps
  Terraform: "#7b42bc",
  HCL: "#844fba",
  Pulumi: "#8a3263",
  Ansible: "#ee0000",
  Salt: "#44e2d8",
  Puppet: "#ffa500",
  Chef: "#f09820",
  Vagrant: "#1563ff",
  Packer: "#02a8ef",

  // Jupyter & Notebooks
  "Jupyter Notebook": "#da5b0b",
  "R Markdown": "#198ce7",

  // Functional Programming
  Elm: "#60b5cc",
  PureScript: "#1b222c",
  Idris: "#b30000",
  Agda: "#315665",
  Coq: "#d0b68c",
  Lean: "#000000",
  Isabelle: "#fefe00",
  "TLA+": "#4b0076",
  Alloy: "#cc5c24",

  // Other Languages
  Ballerina: "#ff5000",
  Pony: "#e2c4a0",
  Ceylon: "#832790",
  Fantom: "#14253c",
  Io: "#a9188d",
  Ioke: "#078193",
  J: "#9e6673",
  K: "#00539c",
  Q: "#0040ca",
  APL: "#5a8164",
  BQN: "#ff6b6b",
};
