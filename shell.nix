{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = with pkgs.buildPackages; [
      pnpm
      steam-run-free
    ];

    shellHook = ''
      alias deno="steam-run ./node_modules/deno/deno"
    '';
}