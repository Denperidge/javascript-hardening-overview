{ pkgs ? import <nixpkgs> {} }:
  
pkgs.mkShell {
  buildInputs = with pkgs; [
    corepack
    steam-run-free
  ];
  shellHook = ''
    alias pnpm="steam-run pnpm"
    alias deno="steam-run pnpm deno"
  '';
}
